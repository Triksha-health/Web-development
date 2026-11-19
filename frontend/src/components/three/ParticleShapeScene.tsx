import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Small particle scenes that are deliberately NOT the digital twin, so the
 * figure is not repeated down the page.
 *
 *  - shape "heart": a beating human heart (anatomical, not the heart symbol).
 *    `mix` 0 = calm (teal, resting pace),
 *    1 = drifted (amber, faster). Used beside the alert slider.
 *  - shape "cloud": a soft drifting cloud of dots that gathers into the eye
 *    of the logo. `mix` 0 = the cloud, 1 = the eye. Used by the waitlist form.
 *
 * Same house rules as the twin: paused when off screen, capped pixel ratio,
 * and never mounted at all when the visitor asks for reduced motion (the
 * parent components decide that).
 */
interface Props {
  shape: "heart" | "cloud";
  /** 0..1, see above. Followed closely, with a short ease. */
  mix?: number;
  /** Logo image the eye shape is read from (shape "cloud"). */
  logoSrc?: string;
  /** Called once, after the first frame has been drawn. */
  onReady?: () => void;
  className?: string;
}

/** Double bump of a heartbeat, 0..1, for a phase 0..1. */
function beat(ph: number) {
  const p = Math.exp(-Math.pow((ph - 0.07) * 10.5, 2)) + 0.45 * Math.exp(-Math.pow((ph - 0.3) * 9.0, 2));
  return Math.min(p, 1);
}

/**
 * Points on the surface of an anatomical human heart (not a heart symbol):
 * the two ventricles tapering to the apex, both atria, the aorta with its
 * arch and three branches, the pulmonary trunk and its two arteries, and the
 * superior vena cava. Built the same way as the twin's body: rounded tubes
 * blended into one surface, then sampled.
 *
 * Seen from the front, y up, about 2 units tall. `pulse` says how much each
 * point moves with the beat (the chambers contract, the vessels barely move).
 */
function heartPoints(count: number) {
  interface Tube {
    a: THREE.Vector3;
    b: THREE.Vector3;
    r1: number;
    r2: number;
    vessel: boolean;
  }
  const tube = (a: number[], b: number[], r1: number, r2: number, vessel = false): Tube => ({
    a: new THREE.Vector3(a[0], a[1], a[2]),
    b: new THREE.Vector3(b[0], b[1], b[2]),
    r1,
    r2,
    vessel,
  });
  const tubes: Tube[] = [
    // chambers
    tube([0.04, 0.2, 0.0], [0.34, -0.74, 0.1], 0.66, 0.17), // left ventricle down to the apex
    tube([-0.3, 0.14, 0.2], [0.04, -0.5, 0.22], 0.47, 0.2), // right ventricle, in front
    tube([-0.56, 0.5, 0.0], [-0.52, 0.6, 0.0], 0.36, 0.33), // right atrium
    tube([-0.36, 0.66, 0.26], [-0.26, 0.74, 0.3], 0.17, 0.13), // right auricle
    tube([0.42, 0.56, -0.24], [0.5, 0.64, -0.24], 0.34, 0.31), // left atrium, behind
    // aorta: up, over the arch, and down behind
    tube([0.02, 0.56, 0.04], [0.0, 1.14, 0.0], 0.18, 0.17, true),
    tube([0.0, 1.14, 0.0], [0.3, 1.42, -0.1], 0.17, 0.16, true),
    tube([0.3, 1.42, -0.1], [0.64, 1.2, -0.22], 0.16, 0.15, true),
    tube([0.64, 1.2, -0.22], [0.72, 0.66, -0.3], 0.15, 0.13, true),
    // the three branches off the arch
    tube([0.08, 1.3, -0.03], [0.0, 1.7, 0.0], 0.068, 0.056, true),
    tube([0.3, 1.46, -0.1], [0.32, 1.78, -0.1], 0.062, 0.05, true),
    tube([0.5, 1.36, -0.17], [0.6, 1.68, -0.18], 0.058, 0.046, true),
    // pulmonary trunk and its two arteries
    tube([-0.12, 0.48, 0.28], [0.16, 0.94, 0.12], 0.17, 0.14, true),
    tube([0.16, 0.94, 0.12], [0.86, 0.98, -0.02], 0.11, 0.085, true),
    tube([0.16, 0.94, 0.12], [-0.36, 1.04, -0.2], 0.11, 0.09, true),
    // superior vena cava
    tube([-0.56, 0.74, -0.05], [-0.52, 1.5, -0.05], 0.125, 0.115, true),
  ];
  const _pa = new THREE.Vector3();
  const _ba = new THREE.Vector3();
  const tubeSdf = (p: THREE.Vector3, t: Tube) => {
    _pa.subVectors(p, t.a);
    _ba.subVectors(t.b, t.a);
    const h = THREE.MathUtils.clamp(_pa.dot(_ba) / _ba.lengthSq(), 0, 1);
    _pa.addScaledVector(_ba, -h);
    return _pa.length() - (t.r1 + (t.r2 - t.r1) * h);
  };
  const smin = (a: number, b: number, k: number) => {
    const h = Math.max(k - Math.abs(a - b), 0) / k;
    return Math.min(a, b) - h * h * k * 0.25;
  };
  // chambers melt together; vessels keep a crisper join
  const sdf = (p: THREE.Vector3) => {
    let d = 1e9;
    for (let i = 0; i < tubes.length; i++) d = smin(d, tubeSdf(p, tubes[i]), tubes[i].vessel ? 0.07 : 0.16);
    return d;
  };
  const _g = new THREE.Vector3();
  const normalAt = (p: THREE.Vector3, out: THREE.Vector3) => {
    const e = 0.006;
    _g.copy(p);
    _g.x = p.x + e;
    let dx = sdf(_g);
    _g.x = p.x - e;
    dx -= sdf(_g);
    _g.x = p.x;
    _g.y = p.y + e;
    let dy = sdf(_g);
    _g.y = p.y - e;
    dy -= sdf(_g);
    _g.y = p.y;
    _g.z = p.z + e;
    let dz = sdf(_g);
    _g.z = p.z - e;
    dz -= sdf(_g);
    out.set(dx, dy, dz);
    if (out.lengthSq() < 1e-9) out.set(0, 0, 1);
    else out.normalize();
    return out;
  };

  const weights = tubes.map((t) => {
    const len = t.a.distanceTo(t.b);
    const rm = (t.r1 + t.r2) * 0.5;
    return 6.283 * rm * len + 6.283 * (t.r1 * t.r1 + t.r2 * t.r2);
  });
  const totalW = weights.reduce((a, b) => a + b, 0);

  const pos = new Float32Array(count * 3);
  const shade = new Float32Array(count);
  const pulse = new Float32Array(count);
  const p = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const n = new THREE.Vector3();
  const light = new THREE.Vector3(0.42, 0.5, 0.76).normalize();
  const SCALE = 0.72;
  const LIFT = -0.42; // centres the whole organ on the origin
  let made = 0;
  for (let tries = 0; tries < count * 6 && made < count; tries++) {
    let w = Math.random() * totalW;
    let ti = 0;
    while (w > weights[ti]) {
      w -= weights[ti];
      ti++;
    }
    const t = tubes[ti];
    const u = THREE.MathUtils.clamp(-0.12 + Math.random() * 1.24, 0, 1);
    p.lerpVectors(t.a, t.b, u);
    dir.randomDirection();
    p.addScaledVector(dir, t.r1 + (t.r2 - t.r1) * u);
    if (sdf(p) < -0.025) continue; // buried inside a neighbouring part
    normalAt(p, n);
    const lit = Math.max(0, n.dot(light));
    shade[made] = (0.34 + 0.66 * lit) * (t.vessel ? 1.12 : 1);
    pulse[made] = t.vessel ? 0.2 : 1;
    pos[made * 3] = p.x * SCALE + (Math.random() - 0.5) * 0.012;
    pos[made * 3 + 1] = (p.y + LIFT) * SCALE + (Math.random() - 0.5) * 0.012;
    pos[made * 3 + 2] = p.z * SCALE + (Math.random() - 0.5) * 0.012;
    made++;
  }
  // if a few samples were rejected, reuse earlier points so none sit at the origin
  for (let i = made; i < count; i++) {
    const j = Math.floor(Math.random() * Math.max(made, 1));
    pos[i * 3] = pos[j * 3];
    pos[i * 3 + 1] = pos[j * 3 + 1];
    pos[i * 3 + 2] = pos[j * 3 + 2];
    shade[i] = shade[j];
    pulse[i] = pulse[j];
  }
  return { pos, shade, pulse };
}

/** A soft, loose cloud of points, denser toward the middle. */
function cloudPoints(count: number) {
  const pos = new Float32Array(count * 3);
  const d = new THREE.Vector3();
  for (let i = 0; i < count; i++) {
    d.randomDirection();
    const r = Math.pow(Math.random(), 0.75) * 1.35;
    pos[i * 3] = d.x * r * 1.25;
    pos[i * 3 + 1] = d.y * r * 0.9;
    pos[i * 3 + 2] = d.z * r * 0.6;
  }
  return pos;
}

export default function ParticleShapeScene({ shape, mix = 0, logoSrc, onReady, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mixRef = useRef(mix);
  mixRef.current = mix;
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const isHeart = shape === "heart";
    const compact = window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
    camera.position.set(0, 0, isHeart ? 4.6 : 5.6);
    camera.lookAt(0, 0, 0);

    const COUNT = isHeart ? (compact ? 9000 : 15000) : compact ? 4500 : 7000;
    let positions: Float32Array;
    const shades = new Float32Array(COUNT);
    const pulses = new Float32Array(COUNT); // how much each point moves with the beat
    if (isHeart) {
      const h = heartPoints(COUNT);
      positions = h.pos;
      shades.set(h.shade);
      pulses.set(h.pulse);
    } else {
      positions = cloudPoints(COUNT);
      for (let i = 0; i < COUNT; i++) shades[i] = 0.75 + Math.random() * 0.25;
    }
    const sizes = new Float32Array(COUNT);
    const phases = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      sizes[i] = (0.8 + Math.random() * 1.2) * (Math.random() < 0.06 ? 1.8 : 1);
      phases[i] = Math.random();
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const targetAttr = new THREE.BufferAttribute(positions.slice(), 3);
    geo.setAttribute("aTarget", targetAttr);
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    geo.setAttribute("aShade", new THREE.BufferAttribute(shades, 1));
    geo.setAttribute("aPulse", new THREE.BufferAttribute(pulses, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMix: { value: 0 }, // colour blend A to B
        uMorph: { value: 0 }, // position blend start to target
        uBeat: { value: 0 },
        uScale: { value: 6 },
        uSize: { value: isHeart ? 1.35 : 2.3 },
        uColorA: { value: new THREE.Color(isHeart ? "#58d6c0" : "#3d7fd0") },
        uColorB: { value: new THREE.Color(isHeart ? "#ffab4d" : "#14202e") },
        uAlpha: { value: isHeart ? 0.9 : 0.92 },
      },
      vertexShader: [
        "attribute vec3 aTarget; attribute float aSize; attribute float aPhase; attribute float aShade; attribute float aPulse;",
        "uniform float uTime, uMorph, uBeat, uScale, uSize;",
        "varying float vShade; varying float vTw;",
        "void main(){",
        "  float mt = clamp(uMorph * 1.6 - aPhase * 0.6, 0.0, 1.0); mt = mt * mt * (3.0 - 2.0 * mt);",
        // while loose, each dot wanders a little on its own
        "  vec3 wander = vec3(sin(uTime * 0.7 + aPhase * 31.0), cos(uTime * 0.6 + aPhase * 17.0), sin(uTime * 0.5 + aPhase * 23.0)) * 0.07;",
        "  vec3 pos = mix(position + wander, aTarget, mt);",
        // particles lift off their path a little while travelling
        "  float fly = sin(mt * 3.14159);",
        "  pos.z += fly * (aPhase - 0.5) * 0.9; pos.y += fly * sin(aPhase * 40.0) * 0.12;",
        // the chambers squeeze with each beat; the vessels only stir
        "  pos *= 1.0 - uBeat * 0.06 * aPulse;",
        "  vTw = 0.82 + 0.3 * sin(uTime * 1.7 + aPhase * 6.283);",
        "  vShade = aShade;",
        "  vec4 mv = modelViewMatrix * vec4(pos, 1.0);",
        "  gl_PointSize = aSize * uSize * vTw * (uScale / -mv.z);",
        "  gl_Position = projectionMatrix * mv;",
        "}",
      ].join("\n"),
      fragmentShader: [
        "uniform vec3 uColorA, uColorB; uniform float uMix, uAlpha, uBeat;",
        "varying float vShade; varying float vTw;",
        "void main(){",
        "  float d = length(gl_PointCoord - 0.5);",
        "  if (d > 0.5) discard;",
        "  float a = smoothstep(0.5, 0.14, d);",
        "  vec3 col = mix(uColorA, uColorB, uMix) * vShade * (1.0 + uBeat * 0.35);",
        "  gl_FragColor = vec4(col, a * uAlpha * vTw);",
        "}",
      ].join("\n"),
      transparent: true,
      depthWrite: false,
      blending: isHeart ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const group = new THREE.Group();
    group.add(new THREE.Points(geo, mat));
    scene.add(group);

    // Soft glow behind the heart, in the same colour as the heart.
    let glow: THREE.Sprite | null = null;
    if (isHeart) {
      const cv = document.createElement("canvas");
      cv.width = cv.height = 128;
      const ctx = cv.getContext("2d")!;
      const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, "rgba(255,255,255,0.55)");
      g.addColorStop(0.4, "rgba(255,255,255,0.16)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 128, 128);
      glow = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(cv), transparent: true, depthWrite: false, opacity: 0.5 }),
      );
      glow.scale.setScalar(3.4);
      glow.position.z = -0.6;
      scene.add(glow);
    }

    // The eye of the logo: the light-coloured part of the logo image.
    let logoReady = false;
    if (!isHeart && logoSrc) {
      const img = new Image();
      img.onload = function () {
        const cv = document.createElement("canvas");
        cv.width = img.naturalWidth;
        cv.height = img.naturalHeight;
        const ctx = cv.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        const px = ctx.getImageData(0, 0, cv.width, cv.height).data;
        const pts: number[] = [];
        let x0 = cv.width, x1 = 0, y0 = cv.height, y1 = 0;
        for (let y = 0; y < cv.height; y++) {
          for (let x = 0; x < cv.width; x++) {
            const o = (y * cv.width + x) * 4;
            if (!(px[o + 3] > 140 && px[o] > 170 && px[o + 1] > 160 && px[o + 2] - px[o] < 60)) continue;
            pts.push(x, y);
            if (x < x0) x0 = x;
            if (x > x1) x1 = x;
            if (y < y0) y0 = y;
            if (y > y1) y1 = y;
          }
        }
        if (pts.length < 200) return;
        const cx = (x0 + x1) / 2;
        const cy = (y0 + y1) / 2;
        const k = 2.3 / (y1 - y0);
        const arr = targetAttr.array as Float32Array;
        for (let i = 0; i < COUNT; i++) {
          const j = Math.floor(Math.random() * (pts.length / 2)) * 2;
          arr[i * 3] = (pts[j] + Math.random() - 0.5 - cx) * k;
          arr[i * 3 + 1] = -(pts[j + 1] + Math.random() - 0.5 - cy) * k;
          arr[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
        }
        targetAttr.needsUpdate = true;
        logoReady = true;
      };
      img.src = logoSrc;
    }

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
      // keep the whole shape in view in a narrow panel
      camera.position.z = (isHeart ? 4.6 : 5.6) * Math.max(1, (isHeart ? 0.95 : 1.55) / camera.aspect);
      camera.updateProjectionMatrix();
      mat.uniforms.uScale.value = (h * Math.min(window.devicePixelRatio, 2)) / 105;
    }
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    let last = performance.now();
    let t = 0;
    let mixNow = mixRef.current;
    let phase = 0;
    let announced = false;
    let rafId = 0;
    let running = false;

    function frame(now: number) {
      if (container!.clientWidth !== appliedW || container!.clientHeight !== appliedH) resize();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;
      const target = isHeart || logoReady ? Math.min(1, Math.max(0, mixRef.current)) : 0;
      mixNow += (target - mixNow) * (1 - Math.exp(-dt * 6));

      mat.uniforms.uTime.value = t;
      mat.uniforms.uMix.value = mixNow;
      if (isHeart) {
        // 72 beats a minute when calm, about 98 when drifted
        phase = (phase + (dt * (72 + 26 * mixNow)) / 60) % 1;
        const b = beat(phase);
        mat.uniforms.uBeat.value = b;
        group.rotation.y = Math.sin(t * 0.45) * 0.55;
        if (glow) {
          const m = glow.material as THREE.SpriteMaterial;
          m.color.copy(mat.uniforms.uColorA.value as THREE.Color).lerp(mat.uniforms.uColorB.value as THREE.Color, mixNow);
          m.opacity = 0.32 + b * 0.3;
          glow.scale.setScalar(3.0 + b * 0.5);
        }
      } else {
        mat.uniforms.uMorph.value = mixNow;
        // the cloud turns slowly, and comes to rest facing the viewer as the eye forms
        group.rotation.y = Math.sin(t * 0.35) * 0.9 * (1 - mixNow);
        group.rotation.z = Math.sin(t * 0.22) * 0.25 * (1 - mixNow);
      }

      renderer.render(scene, camera);
      if (!announced) {
        announced = true;
        onReadyRef.current?.();
      }
      if (running) rafId = requestAnimationFrame(frame);
    }
    function start() {
      if (running) return;
      running = true;
      last = performance.now(); // drop the idle gap so nothing jumps
      rafId = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(rafId);
    }
    // Pause when off screen.
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
      scene.traverse((obj) => {
        const o = obj as unknown as { geometry?: THREE.BufferGeometry; material?: THREE.Material };
        o.geometry?.dispose();
        o.material?.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, [shape, logoSrc]);

  return <div ref={containerRef} className={`absolute inset-0 ${className ?? ""}`} />;
}
