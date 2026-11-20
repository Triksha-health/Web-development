import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Sensor v1 in 3D: the two real circuit boards, cut out of our own photo and
 * used as the faces of two thin slabs. Assembled they sit stacked, as they do
 * on the wrist; `open` (0..1) lifts them apart so both can be seen. Moving
 * the cursor over them (or dragging with a finger) turns them in any
 * direction; they return to rest when let go.
 *
 * These are photographs of the actual hardware mapped onto flat boards, not a
 * rendered model. Same house rules as the other scenes: paused off screen,
 * capped pixel ratio, and not mounted at all under reduced motion (the parent
 * decides that and shows the plain photo).
 */
interface Props {
  /** 0 = boards stacked, 1 = lifted apart. Eased. */
  open?: number;
  onReady?: () => void;
  className?: string;
}

// Each board: its cut-out photo, and its size in scene units (photo proportions).
const BOARDS = [
  { src: "/img/board-main.webp", w: 1.5, h: 1.5 * (587 / 499) },
  { src: "/img/board-sensor.webp", w: 1.82, h: 1.82 * (490 / 601) },
];

export default function SensorScene({ open = 0, onReady, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(open);
  openRef.current = open;
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
    camera.position.set(0, 0.05, 5.1);
    camera.lookAt(0, 0, 0);

    const rig = new THREE.Group(); // turns with the pointer and over time
    scene.add(rig);

    const loader = new THREE.TextureLoader();
    const slabs: THREE.Group[] = [];
    let loaded = 0;
    BOARDS.forEach((b, i) => {
      const slab = new THREE.Group();
      const tex = loader.load(b.src, () => {
        loaded++;
      });
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      // the photographed face
      const face = new THREE.Mesh(
        new THREE.PlaneGeometry(b.w, b.h),
        new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.5, side: THREE.FrontSide }),
      );
      // a few darker copies just behind it give the board its thickness
      for (let k = 1; k <= 4; k++) {
        const edge = new THREE.Mesh(
          new THREE.PlaneGeometry(b.w, b.h),
          new THREE.MeshBasicMaterial({
            map: tex,
            transparent: true,
            alphaTest: 0.5,
            color: new THREE.Color(k === 4 ? 0x24402c : 0x16301f),
            side: THREE.DoubleSide,
          }),
        );
        edge.position.z = -k * 0.012;
        slab.add(edge);
      }
      slab.add(face);
      // soft shadow under each board
      const shadowCv = document.createElement("canvas");
      shadowCv.width = shadowCv.height = 128;
      const ctx = shadowCv.getContext("2d")!;
      const g = ctx.createRadialGradient(64, 64, 8, 64, 64, 64);
      g.addColorStop(0, "rgba(0,0,0,0.42)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 128, 128);
      const shadow = new THREE.Mesh(
        new THREE.PlaneGeometry(b.w * 1.25, b.h * 1.25),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(shadowCv), transparent: true, depthWrite: false }),
      );
      shadow.position.z = -0.12;
      slab.add(shadow);
      slab.userData.index = i;
      rig.add(slab);
      slabs.push(slab);
    });

    let appliedW = 0;
    let appliedH = 0;
    function resize() {
      const w = container!.clientWidth;
      const h = container!.clientHeight;
      if (!w || !h) return;
      appliedW = w;
      appliedH = h;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      // pull back in narrow panels so both boards stay in view when apart
      camera.position.z = 5.1 * Math.max(1, 1.2 / camera.aspect);
      camera.updateProjectionMatrix();
    }
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    // Turning the boards by hand. With a mouse, moving over the panel turns
    // them in every direction, following the cursor; with a finger, dragging
    // does the same. When the pointer leaves (or the finger lifts) they ease
    // back to their resting position.
    const MAX_YAW = 1.0; // about 57 degrees either way
    const MAX_PITCH = 0.7;
    let targetX = 0;
    let targetY = 0;
    let touching = false;
    function aim(e: PointerEvent) {
      const r = container!.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const nx = THREE.MathUtils.clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2), -1, 1);
      const ny = THREE.MathUtils.clamp((e.clientY - (r.top + r.height / 2)) / (r.height / 2), -1, 1);
      targetY = nx * MAX_YAW;
      targetX = ny * MAX_PITCH;
    }
    function rest() {
      targetX = 0;
      targetY = 0;
      touching = false;
    }
    function onPointerMove(e: PointerEvent) {
      if (e.pointerType === "mouse" || touching) aim(e);
    }
    function onPointerDown(e: PointerEvent) {
      if (e.pointerType !== "mouse") {
        touching = true;
        aim(e);
      }
    }
    container.style.touchAction = "pan-y"; // a finger can still scroll the page up and down
    container.style.cursor = "grab";
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointerleave", rest);
    container.addEventListener("pointerup", rest);
    container.addEventListener("pointercancel", rest);

    let last = performance.now();
    let t = 0;
    let openNow = openRef.current;
    let rx = 0;
    let ry = 0;
    let announced = false;
    let rafId = 0;
    let running = false;

    function frame(now: number) {
      if (container!.clientWidth !== appliedW || container!.clientHeight !== appliedH) resize();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;
      const target = Math.min(1, Math.max(0, openRef.current));
      openNow += (target - openNow) * (1 - Math.exp(-dt * 5));
      const k = 1 - Math.exp(-dt * 4);
      rx += (targetX - rx) * k;
      ry += (targetY - ry) * k;

      // Resting position: leaning back a little, as if propped on a table, so
      // the printed side faces the viewer and stays readable.
      rig.rotation.x = -0.52 + rx + openNow * 0.12;
      rig.rotation.z = Math.sin(t * 0.25) * 0.05;
      rig.rotation.y = ry;

      // stacked: almost touching. apart: lifted a little, and slid well to the
      // sides so both boards can be read at once
      const gap = 0.07 + openNow * 0.55;
      slabs.forEach((slab) => {
        const i = slab.userData.index as number;
        const side = i === 0 ? -1 : 1;
        slab.position.z = side * gap * 0.5 + Math.sin(t * 0.9 + i * 1.7) * 0.02;
        slab.position.x = side * openNow * 0.84;
        slab.position.y = -side * openNow * 0.1;
      });

      renderer.render(scene, camera);
      if (!announced && loaded === BOARDS.length) {
        announced = true;
        onReadyRef.current?.();
      }
      if (running) rafId = requestAnimationFrame(frame);
    }
    function start() {
      if (running) return;
      running = true;
      last = performance.now();
      rafId = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(rafId);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) start();
        else stop();
      },
      { threshold: 0.05 },
    );
    io.observe(container);
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointerleave", rest);
      container.removeEventListener("pointerup", rest);
      container.removeEventListener("pointercancel", rest);
      scene.traverse((obj) => {
        const o = obj as unknown as { geometry?: THREE.BufferGeometry; material?: THREE.Material & { map?: THREE.Texture } };
        o.geometry?.dispose();
        o.material?.map?.dispose();
        o.material?.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className={`absolute inset-0 ${className ?? ""}`} />;
}
