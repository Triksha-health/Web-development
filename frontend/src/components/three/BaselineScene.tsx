import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * "Personal baseline" — a clean, 3D animated cardiac monitor.
 *
 * One crisp glowing ECG trace with a soft halo, flowing across a softly-faded
 * grid, sitting inside a translucent "normal range" band with a dashed mean
 * line and a pulsing leading marker. Imperative three.js; tears down on unmount;
 * reduced-motion safe.
 */

interface Props {
  className?: string;
}

const ACCENT = "#0571D3";
const HALO = "#7fb8ff";
const CREAM = "#f3ecda";
const BASE_Y = 0.55;
const BAND = 0.17;

function ecg(x: number) {
  const BEAT = 2.4;
  const p = ((x % BEAT) + BEAT) % BEAT;
  let y = 0;
  y += 0.06 * Math.exp(-Math.pow((p - 0.55) / 0.13, 2)); // P
  y += -0.09 * Math.exp(-Math.pow((p - 1.0) / 0.05, 2)); // Q
  y += 0.82 * Math.exp(-Math.pow((p - 1.15) / 0.045, 2)); // R
  y += -0.18 * Math.exp(-Math.pow((p - 1.32) / 0.06, 2)); // S
  y += 0.15 * Math.exp(-Math.pow((p - 1.8) / 0.17, 2)); // T
  return y;
}

export default function BaselineScene({ className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(new THREE.Color(CREAM), 4, 11);

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
    camera.position.set(0, 1.25, 4.0);
    camera.lookAt(0, 0.48, -1.1);

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dir = new THREE.DirectionalLight(0xffffff, 0.7);
    dir.position.set(2, 4, 3);
    scene.add(dir);

    /* ── Softly fading grid floor ── */
    (function grid() {
      const pts: number[] = [];
      const xMin = -5.5, xMax = 5.5, zMin = -9, zMax = 1.5, step = 0.7;
      for (let x = xMin; x <= xMax + 0.001; x += step) pts.push(x, 0, zMin, x, 0, zMax);
      for (let z = zMin; z <= zMax + 0.001; z += step) pts.push(xMin, 0, z, xMax, 0, z);
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
      scene.add(
        new THREE.LineSegments(
          g,
          new THREE.LineBasicMaterial({ color: new THREE.Color("#9bb6dd"), transparent: true, opacity: 0.13 }),
        ),
      );
    })();

    /* ── Soft "normal range" band + dashed mean line ── */
    (function band() {
      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(10, BAND * 2),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(ACCENT),
          transparent: true,
          opacity: 0.07,
          side: THREE.DoubleSide,
          depthWrite: false,
        }),
      );
      plane.position.set(0, BASE_Y, -0.25);
      scene.add(plane);

      const pts: number[] = [];
      for (let x = -5; x <= 5; x += 0.22) pts.push(x, BASE_Y, -0.22);
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
      const mean = new THREE.Line(
        g,
        new THREE.LineDashedMaterial({
          color: new THREE.Color(ACCENT),
          transparent: true,
          opacity: 0.28,
          dashSize: 0.16,
          gapSize: 0.13,
        }),
      );
      mean.computeLineDistances();
      scene.add(mean);
    })();

    /* ── ECG ribbons: a glowing halo behind a crisp main trace ── */
    const AMP = 0.78, SPEED = 1.4, SEG = 260;
    function makeRibbon(width: number, material: THREE.Material) {
      const positions = new Float32Array(SEG * 2 * 3);
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const indices: number[] = [];
      for (let i = 0; i < SEG - 1; i++) {
        const a = i * 2;
        indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
      }
      geo.setIndex(indices);
      const mesh = new THREE.Mesh(geo, material);
      scene.add(mesh);
      const update = (t: number) => {
        const arr = geo.attributes.position.array as Float32Array;
        for (let i = 0; i < SEG; i++) {
          const x = (i / (SEG - 1)) * 10 - 5;
          const y = BASE_Y + ecg(x * 1.05 + t * SPEED) * AMP;
          arr[i * 6 + 0] = x; arr[i * 6 + 1] = y; arr[i * 6 + 2] = width;
          arr[i * 6 + 3] = x; arr[i * 6 + 4] = y; arr[i * 6 + 5] = -width;
        }
        geo.attributes.position.needsUpdate = true;
        geo.computeVertexNormals();
      };
      update(0);
      return update;
    }

    const haloMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(HALO),
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const mainMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(ACCENT),
      emissive: new THREE.Color(ACCENT),
      emissiveIntensity: 1.5,
      metalness: 0.2,
      roughness: 0.4,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    const updateHalo = makeRibbon(0.34, haloMat);
    const updateMain = makeRibbon(0.13, mainMat);

    /* ── Pulsing leading marker ── */
    function glowTexture() {
      const cv = document.createElement("canvas");
      cv.width = cv.height = 64;
      const ctx = cv.getContext("2d")!;
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,255,255,0.95)");
      g.addColorStop(0.4, "rgba(120,180,255,0.6)");
      g.addColorStop(1, "rgba(120,180,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(cv);
    }
    const marker = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: glowTexture(), transparent: true, depthWrite: false }),
    );
    marker.scale.setScalar(0.36);
    scene.add(marker);

    /* ── Resize ── */
    let appliedW = 0, appliedH = 0;
    function resize() {
      const w = container!.clientWidth, h = container!.clientHeight;
      if (!w || !h) return;
      appliedW = w; appliedH = h;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    window.addEventListener("resize", resize);
    resize();
    const firstPaints = [0, 120, 400].map((ms) =>
      window.setTimeout(() => { resize(); renderer.render(scene, camera); }, ms),
    );

    /* ── Animate ── */
    const clock = new THREE.Clock();
    let elapsed = 0;
    let raf = 0;
    function frame() {
      raf = requestAnimationFrame(frame);
      if (container!.clientWidth !== appliedW || container!.clientHeight !== appliedH) resize();
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!reduceMotion) elapsed += dt;
      const t = elapsed;

      updateHalo(t);
      updateMain(t);

      const mx = 5;
      const my = BASE_Y + ecg(mx * 1.05 + t * SPEED) * AMP;
      marker.position.set(mx, my, 0.14);
      marker.scale.setScalar(0.3 + (Math.sin(t * 5.2) * 0.5 + 0.5) * 0.12);

      camera.position.y = 1.25 + (reduceMotion ? 0 : Math.sin(t * 0.45) * 0.03);
      camera.lookAt(0, 0.48, -1.1);
      renderer.render(scene, camera);
    }
    frame();

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(raf);
      firstPaints.forEach((id) => clearTimeout(id));
      ro.disconnect();
      window.removeEventListener("resize", resize);
      scene.traverse((obj) => {
        const o = obj as unknown as { geometry?: THREE.BufferGeometry; material?: THREE.Material | THREE.Material[] };
        o.geometry?.dispose();
        const m = o.material;
        if (Array.isArray(m)) m.forEach((mm) => mm.dispose());
        else m?.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className={`relative w-full h-full canvas-fade ${className ?? ""}`}>
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  );
}
