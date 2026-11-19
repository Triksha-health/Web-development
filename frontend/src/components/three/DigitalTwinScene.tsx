import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * TRIKSHA DIGITAL TWIN — anatomical particle human.
 *
 * The body is an SDF-blended figure surface-sampled into ~24k particles drawn
 * as THREE.Points with a custom shader (normal-based lighting, rim glow, 72 BPM
 * heart glow, and an upward scan sweep). When the scene first appears the
 * figure is created dot by dot, from the feet up, out of a loose cloud; and a
 * faint ripple travels out from the heart with every beat. The figure is wrapped in tilted,
 * slowly-precessing perspective rings, a soft platform glow, and sparse ambient
 * drift. Imperative three.js; mounts into a ref; cleans up on unmount.
 *
 * Performance/a11y: rAF-driven, pixel-ratio capped, paused offscreen via
 * IntersectionObserver, motion frozen under prefers-reduced-motion, and
 * degraded (fewer rings, no scan/particles) below ~768px.
 */

interface Props {
  className?: string;
  /** "dark" tunes the colours for a dark background (the homepage hero). */
  variant?: "light" | "dark";
  /**
   * 0 = the heart glows calm blue at a resting pace; 1 = it has drifted:
   * amber, and beating faster. The scene eases between the two.
   */
  drift?: number;
  /** Turn and recede as the container scrolls up out of view. */
  scrollLinked?: boolean;
  /** Draw the orbiting rings around the figure (off in the homepage hero). */
  showRings?: boolean;
  /** Called once, after the first frame has been drawn. */
  onReady?: () => void;
  /**
   * Story mode, used by the How it works stage. Off by default (the hero).
   * When on, `focus` moves the camera: "wrist" flies in to the wrist and makes
   * it glow; "records" shows small report pages drifting into the figure;
   * "future" pulls back and shows a second, fainter twin whose heart has drifted.
   */
  journey?: boolean;
  focus?: "body" | "wrist" | "records" | "future";
}

const SETTINGS = {
  rotationSpeed: 0.14, // ~45s per revolution
  particleSize: 1,
  heartbeat: true,
  twinTone: "#2f4fa8",
};

export default function DigitalTwinScene({
  className,
  variant = "light",
  drift = 0,
  scrollLinked = false,
  showRings = true,
  onReady,
  journey = false,
  focus = "body",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Read inside the animation loop, so changing these never rebuilds the scene.
  const driftRef = useRef(drift);
  driftRef.current = drift;
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;
  const focusRef = useRef(focus);
  focusRef.current = focus;
  const dark = variant === "dark";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
    // Frame the figure head-to-toe, aimed a little lower so it rides higher in
    // the column with more breathing room beneath the feet.
    camera.position.set(0, 1.05, 4.35);
    camera.lookAt(0, 1.05, 0);

    const FIGURE_Y = 1.1; // world height of the figure's mid-line (ring centre)
    const HEART = new THREE.Vector3(0.035, 1.255, 0.075);
    const WRIST = new THREE.Vector3(0.287, 0.9, 0.054); // where a wristband sits

    /* ── Anatomy: tapered capsules, z-flattened, smooth-blended ── */
    interface Prim {
      a: THREE.Vector3;
      b: THREE.Vector3;
      r1: number;
      r2: number;
      zs: number;
    }
    function prim(a: number[], b: number[], r1: number, r2: number, zs?: number): Prim {
      return {
        a: new THREE.Vector3(a[0], a[1], a[2]),
        b: new THREE.Vector3(b[0], b[1], b[2]),
        r1,
        r2,
        zs: zs || 1,
      };
    }
    // A standing adult, about 1.76 units tall and seven and a half heads high.
    // Each line is one rounded, tapering volume; neighbours melt into each other.
    const prims: Prim[] = [
      // head and neck
      prim([0, 1.652, -0.012], [0, 1.688, -0.014], 0.08, 0.074, 0.9), // cranium, deeper than it is wide
      prim([0, 1.585, 0.02], [0, 1.635, 0.018], 0.05, 0.066, 1.08), // face
      prim([0, 1.553, 0.03], [0, 1.57, 0.028], 0.036, 0.042, 1.1), // jaw and chin
      prim([0, 1.455, 0.0], [0, 1.552, 0.008], 0.047, 0.042, 1.0), // neck
      // shoulders and torso
      prim([0, 1.505, -0.02], [-0.135, 1.44, -0.012], 0.034, 0.04, 1.2), // trapezius
      prim([0, 1.505, -0.02], [0.135, 1.44, -0.012], 0.034, 0.04, 1.2),
      prim([0, 1.21, 0.0], [0, 1.375, 0.006], 0.116, 0.142, 1.5), // ribcage
      prim([-0.052, 1.318, 0.046], [-0.092, 1.322, 0.04], 0.06, 0.058, 1.3), // chest
      prim([0.052, 1.318, 0.046], [0.092, 1.322, 0.04], 0.06, 0.058, 1.3),
      prim([-0.128, 1.3, -0.03], [-0.104, 1.13, -0.018], 0.05, 0.036, 1.3), // back, tapering to the waist
      prim([0.128, 1.3, -0.03], [0.104, 1.13, -0.018], 0.05, 0.036, 1.3),
      prim([0, 1.02, 0.004], [0, 1.2, 0.004], 0.1, 0.112, 1.45), // abdomen and waist
      prim([-0.068, 0.96, 0], [0.068, 0.96, 0], 0.094, 0.094, 1.3), // pelvis
      prim([-0.058, 0.94, -0.05], [-0.054, 0.978, -0.044], 0.07, 0.068, 1.0), // seat
      prim([0.058, 0.94, -0.05], [0.054, 0.978, -0.044], 0.07, 0.068, 1.0),
    ];
    [1, -1].forEach(function (s) {
      // arm
      prims.push(prim([0.192 * s, 1.404, 0.0], [0.204 * s, 1.36, 0.0], 0.057, 0.052, 1.05)); // shoulder
      prims.push(prim([0.212 * s, 1.385, 0.0], [0.248 * s, 1.13, 0.016], 0.049, 0.039, 1.0)); // upper arm
      prims.push(prim([0.222 * s, 1.31, 0.02], [0.238 * s, 1.2, 0.024], 0.041, 0.039, 1.0)); // biceps
      prims.push(prim([0.248 * s, 1.13, 0.016], [0.266 * s, 1.04, 0.03], 0.04, 0.041, 1.0)); // elbow into forearm
      prims.push(prim([0.266 * s, 1.04, 0.03], [0.288 * s, 0.885, 0.055], 0.041, 0.026, 1.0)); // forearm
      prims.push(prim([0.291 * s, 0.866, 0.058], [0.299 * s, 0.795, 0.067], 0.033, 0.03, 1.7)); // palm, flat
      prims.push(prim([0.299 * s, 0.795, 0.067], [0.303 * s, 0.728, 0.074], 0.027, 0.016, 1.8)); // fingers
      prims.push(prim([0.284 * s, 0.852, 0.076], [0.268 * s, 0.795, 0.096], 0.014, 0.01, 1.0)); // thumb
      // leg
      prims.push(prim([0.085 * s, 0.95, 0.0], [0.098 * s, 0.53, 0.01], 0.077, 0.052, 1.0)); // thigh
      prims.push(prim([0.09 * s, 0.86, 0.026], [0.096 * s, 0.66, 0.03], 0.057, 0.05, 1.0)); // front of thigh
      prims.push(prim([0.099 * s, 0.515, 0.014], [0.1 * s, 0.475, 0.012], 0.05, 0.047, 1.0)); // knee
      prims.push(prim([0.1 * s, 0.47, 0.006], [0.104 * s, 0.12, -0.008], 0.044, 0.027, 1.0)); // shin
      prims.push(prim([0.102 * s, 0.43, -0.026], [0.104 * s, 0.27, -0.022], 0.05, 0.035, 1.0)); // calf
      prims.push(prim([0.104 * s, 0.12, -0.008], [0.105 * s, 0.07, -0.004], 0.028, 0.03, 1.0)); // ankle
      prims.push(prim([0.105 * s, 0.047, -0.03], [0.105 * s, 0.043, -0.026], 0.034, 0.034, 1.0)); // heel
      prims.push(prim([0.105 * s, 0.042, 0.0], [0.108 * s, 0.032, 0.15], 0.036, 0.025, 1.0)); // foot
    });

    const _q = new THREE.Vector3();
    const _pa = new THREE.Vector3();
    const _ba = new THREE.Vector3();
    function primSdf(p: THREE.Vector3, pr: Prim) {
      const zm = (pr.a.z + pr.b.z) * 0.5;
      _q.set(p.x, p.y, zm + (p.z - zm) * pr.zs);
      _pa.subVectors(_q, pr.a);
      _ba.subVectors(pr.b, pr.a);
      const h = THREE.MathUtils.clamp(_pa.dot(_ba) / _ba.lengthSq(), 0, 1);
      _pa.addScaledVector(_ba, -h);
      return _pa.length() - (pr.r1 + (pr.r2 - pr.r1) * h);
    }
    function smin(a: number, b: number, k: number) {
      const h = Math.max(k - Math.abs(a - b), 0) / k;
      return Math.min(a, b) - h * h * k * 0.25;
    }
    function bodySdf(p: THREE.Vector3) {
      let d = 1e9;
      for (let i = 0; i < prims.length; i++) d = smin(d, primSdf(p, prims[i]), 0.05);
      return d;
    }
    const _g1 = new THREE.Vector3();
    function bodyNormal(p: THREE.Vector3, out: THREE.Vector3) {
      const e = 0.0045;
      _g1.copy(p);
      _g1.x = p.x + e;
      let dx = bodySdf(_g1);
      _g1.x = p.x - e;
      dx -= bodySdf(_g1);
      _g1.x = p.x;
      _g1.y = p.y + e;
      let dy = bodySdf(_g1);
      _g1.y = p.y - e;
      dy -= bodySdf(_g1);
      _g1.y = p.y;
      _g1.z = p.z + e;
      let dz = bodySdf(_g1);
      _g1.z = p.z - e;
      dz -= bodySdf(_g1);
      out.set(dx, dy, dz);
      if (out.lengthSq() < 1e-9) out.set(0, 0, 1);
      else out.normalize();
      return out;
    }

    /* ── Sample particles on the blended surface ── */
    const positions: number[] = [];
    const sizes: number[] = [];
    const phases: number[] = [];
    const shades: number[] = [];
    const hearts: number[] = [];
    const wrists: number[] = [];
    const seeds: number[] = []; // where each dot starts before the figure forms
    const dists: number[] = []; // distance from the heart, for the beat ripple
    const normals: number[] = [];
    (function sample() {
      const weights = prims.map(function (pr) {
        const len = pr.a.distanceTo(pr.b);
        const rm = (pr.r1 + pr.r2) * 0.5;
        return 6.283 * rm * len + 6.283 * (pr.r1 * pr.r1 + pr.r2 * pr.r2);
      });
      const totalW = weights.reduce((a, b) => a + b, 0);
      const ATTEMPTS = compact ? 64000 : 96000;
      const MAXPTS = compact ? 14000 : 34000; // lighter on small screens
      const pos = new THREE.Vector3();
      const dir = new THREE.Vector3();
      const nrm = new THREE.Vector3();
      for (let i = 0; i < ATTEMPTS && positions.length / 3 < MAXPTS; i++) {
        let w = Math.random() * totalW;
        let pi = 0;
        while (w > weights[pi]) {
          w -= weights[pi];
          pi++;
        }
        const pr = prims[pi];
        const t = THREE.MathUtils.clamp(-0.14 + Math.random() * 1.28, 0, 1);
        const rr = pr.r1 + (pr.r2 - pr.r1) * t;
        pos.lerpVectors(pr.a, pr.b, t);
        dir.randomDirection();
        pos.addScaledVector(dir, rr);
        const zm = (pr.a.z + pr.b.z) * 0.5;
        pos.z = zm + (pos.z - zm) / pr.zs;
        if (bodySdf(pos) < -0.02) continue;
        bodyNormal(pos, nrm);
        normals.push(nrm.x, nrm.y, nrm.z);
        // (a small scatter only, so hands, jaw and calves keep their outline)
        pos.x += (Math.random() - 0.5) * 0.008;
        pos.y += (Math.random() - 0.5) * 0.008;
        pos.z += (Math.random() - 0.5) * 0.008;
        positions.push(pos.x, pos.y, pos.z);
        const big = Math.random() < 0.06;
        sizes.push((0.8 + Math.random() * 1.3) * (big ? 1.9 : 1));
        phases.push(Math.random() * 6.283);
        shades.push(Math.random());
        const hd = pos.distanceTo(HEART);
        dists.push(hd);
        // a loose cloud around the figure: wide to the sides, a little below
        seeds.push((Math.random() - 0.5) * 1.5, -0.15 + (Math.random() - 0.5) * 0.7, (Math.random() - 0.5) * 1.2);
        const hw = THREE.MathUtils.clamp(1 - hd / 0.26, 0, 1);
        hearts.push(hw * hw);
        wrists.push(THREE.MathUtils.clamp(1 - pos.distanceTo(WRIST) / 0.075, 0, 1));
      }
    })();
    const COUNT = positions.length / 3;

    /* ── Shimmering point shader (with depth cueing + scan sweep) ── */
    const pointVert = [
      "attribute float aSize; attribute float aPhase; attribute float aHeart; attribute float aWrist; attribute float aDist; attribute vec3 aSeed; attribute vec3 aColor; attribute vec3 aNormal;",
      "uniform float uTime, uPulse, uSize, uScale, uFlat, uWrist, uForm, uWaveR;",
      "varying vec3 vColor; varying float vAlpha; varying float vHeart; varying float vLight; varying float vRim; varying float vY; varying float vWrist; varying float vRipple;",
      "void main(){",
      "  vWrist = aWrist * uWrist * (0.62 + 0.38 * sin(uTime * 4.2 - position.y * 40.0));",
      "  float tw = 0.80 + 0.34 * sin(uTime * 1.7 + aPhase);",
      "  vColor = aColor; vHeart = aHeart; vY = position.y;",
      "  vec3 vn = normalize(normalMatrix * aNormal);",
      "  float keyL  = clamp(dot(vn, normalize(vec3(0.45, 0.55, 0.80))), 0.0, 1.0);",
      "  float fillL = clamp(dot(vn, normalize(vec3(-0.55, 0.10, 0.35))), 0.0, 1.0);",
      "  float lambert = 0.42 + 0.52 * keyL + 0.18 * fillL;",
      "  vLight = mix(lambert, 1.0, uFlat);",
      "  vRim = pow(1.0 - abs(vn.z), 1.9) * (1.0 - uFlat);",
      "  float facing = mix(smoothstep(-0.9, 0.35, vn.z), 1.0, uFlat);",
      // creation: each dot arrives from the cloud, lowest ones first
      "  float fp = clamp(uForm * 1.55 - position.y * 0.3, 0.0, 1.0);",
      "  float fe = 1.0 - pow(1.0 - fp, 3.0);",
      "  vec3 pos = mix(position + aSeed, position, fe);",
      "  vAlpha = tw * mix(0.38, 1.0, facing) * smoothstep(0.0, 0.35, fp);",
      // a ring of light that leaves the heart on each beat and fades as it spreads
      "  vRipple = exp(-pow((aDist - uWaveR) / 0.065, 2.0)) * (1.0 - smoothstep(0.25, 1.25, uWaveR)) * fe;",
      "  vec4 mv = modelViewMatrix * vec4(pos, 1.0);",
      "  float s = aSize * uSize * tw * (1.0 + aHeart * uPulse * 1.1) * mix(0.78, 1.0, facing) * (1.0 + vWrist * 0.9) * mix(1.9, 1.0, fe) * (1.0 + vRipple * 0.55);",
      "  gl_PointSize = s * (uScale / -mv.z);", // perspective depth cueing
      "  gl_Position = projectionMatrix * mv;",
      "}",
    ].join("\n");
    const pointFrag = [
      "uniform float uPulse; uniform vec3 uHeartColor; uniform vec3 uRimColor;",
      "uniform float uScanY, uScanBand, uScanOn; uniform vec3 uScanColor;",
      "uniform vec3 uWristColor; uniform float uFade;",
      "varying vec3 vColor; varying float vAlpha; varying float vHeart; varying float vLight; varying float vRim; varying float vY; varying float vWrist; varying float vRipple;",
      "void main(){",
      "  vec2 c = gl_PointCoord - 0.5;",
      "  float d = length(c);",
      "  if (d > 0.5) discard;",
      "  float a = smoothstep(0.5, 0.14, d);",
      "  vec3 col = vColor * vLight;",
      "  col = mix(col, uRimColor, vRim * 0.5);",
      "  col = mix(col, uHeartColor, vHeart * (0.35 + 0.65 * uPulse));",
      "  float scan = uScanOn * smoothstep(uScanBand, 0.0, abs(vY - uScanY));",
      "  col += uScanColor * scan * 0.7;",
      "  col += uRimColor * vRipple * 0.6;",
      "  col = mix(col, uWristColor, clamp(vWrist, 0.0, 1.0));",
      "  float alpha = a * vAlpha * 0.95 + scan * a * 0.5;",
      "  gl_FragColor = vec4(col, alpha * uFade);",
      "}",
    ].join("\n");

    const bodyMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPulse: { value: 0 },
        uSize: { value: compact ? 1 : 0.9 }, // slightly finer dots now that there are more of them
        uScale: { value: 900 },
        uFlat: { value: 0 },
        uHeartColor: { value: new THREE.Color("#9fd4ff") },
        uRimColor: { value: new THREE.Color("#bcd9ff") },
        uScanY: { value: 0 },
        uScanBand: { value: 0.13 },
        uScanOn: { value: compact || reduceMotion ? 0 : 1 },
        uScanColor: { value: new THREE.Color("#d4ebff") },
        uWrist: { value: 0 },
        uForm: { value: reduceMotion ? 1 : 0 },
        uWaveR: { value: 9 },
        uWristColor: { value: new THREE.Color("#eaf6ff") },
        uFade: { value: 1 },
      },
      vertexShader: pointVert,
      fragmentShader: pointFrag,
      transparent: true,
      depthWrite: false,
    });

    const bodyGeo = new THREE.BufferGeometry();
    bodyGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    bodyGeo.setAttribute("aSize", new THREE.Float32BufferAttribute(sizes, 1));
    bodyGeo.setAttribute("aPhase", new THREE.Float32BufferAttribute(phases, 1));
    bodyGeo.setAttribute("aHeart", new THREE.Float32BufferAttribute(hearts, 1));
    bodyGeo.setAttribute("aWrist", new THREE.Float32BufferAttribute(wrists, 1));
    bodyGeo.setAttribute("aSeed", new THREE.Float32BufferAttribute(seeds, 3));
    bodyGeo.setAttribute("aDist", new THREE.Float32BufferAttribute(dists, 1));
    bodyGeo.setAttribute("aNormal", new THREE.Float32BufferAttribute(normals, 3));
    const bodyColors = new Float32Array(COUNT * 3);
    const colorAttr = new THREE.BufferAttribute(bodyColors, 3);
    bodyGeo.setAttribute("aColor", colorAttr);
    (function applyTwinTone(hex: string) {
      const base = new THREE.Color(hex);
      const deep = base.clone().multiplyScalar(0.62);
      const lite = base.clone().lerp(new THREE.Color("#ffffff"), 0.42);
      const c = new THREE.Color();
      for (let i = 0; i < COUNT; i++) {
        c.copy(deep).lerp(lite, shades[i]);
        bodyColors[i * 3] = c.r;
        bodyColors[i * 3 + 1] = c.g;
        bodyColors[i * 3 + 2] = c.b;
      }
      colorAttr.needsUpdate = true;
    })(dark ? "#5c9df2" : SETTINGS.twinTone);

    const bodyPoints = new THREE.Points(bodyGeo, bodyMat);

    /* ── Heart glow sprites ── */
    function glowTexture(inner: string, outer: string) {
      const cv = document.createElement("canvas");
      cv.width = cv.height = 128;
      const ctx = cv.getContext("2d")!;
      const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, inner);
      g.addColorStop(0.35, outer);
      g.addColorStop(1, "rgba(120,170,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(cv);
    }
    const heartCore = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture("rgba(255,255,255,0.95)", "rgba(140,200,255,0.55)"),
        transparent: true,
        depthWrite: false,
      }),
    );
    heartCore.position.copy(HEART);
    heartCore.scale.setScalar(0.22);
    const heartHalo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture("rgba(170,212,255,0.40)", "rgba(140,185,255,0.16)"),
        transparent: true,
        depthWrite: false,
      }),
    );
    heartHalo.position.copy(HEART);
    heartHalo.scale.setScalar(0.6);

    const figure = new THREE.Group();
    figure.add(bodyPoints, heartCore, heartHalo);
    figure.scale.setScalar(1.28);
    scene.add(figure);

    /* ── Story mode only: a second, fainter twin for the "possible future" ──
       Same particles, drawn again beside the first with a drifted (amber) heart.
       Not created at all for the hero. */
    let ghost: THREE.Group | null = null;
    let ghostMat: THREE.ShaderMaterial | null = null;
    let ghostHeart: THREE.Sprite | null = null;
    let wristGlow: THREE.Sprite | null = null;
    let wristBand: THREE.Points | null = null;
    interface RecordPage {
      mesh: THREE.Mesh;
      from: THREE.Vector3;
      offset: number;
      tilt: number;
    }
    const recordPages: RecordPage[] = [];
    if (journey) {
      ghostMat = bodyMat.clone();
      ghostMat.uniforms.uHeartColor.value = new THREE.Color("#ffab4d");
      ghostMat.uniforms.uScanOn.value = 0;
      ghostMat.uniforms.uFade.value = 0;
      ghostHeart = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTexture("rgba(255,236,205,0.95)", "rgba(255,171,77,0.5)"),
          transparent: true,
          depthWrite: false,
          opacity: 0,
        }),
      );
      ghostHeart.position.copy(HEART);
      ghost = new THREE.Group();
      ghost.add(new THREE.Points(bodyGeo, ghostMat), ghostHeart);
      ghost.scale.setScalar(1.28);
      ghost.visible = false;
      scene.add(ghost);

      // Step 1: a soft glow at one wrist and a denser band of brighter points
      // around it, where a wristband would sit.
      wristGlow = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTexture("rgba(255,255,255,0.9)", "rgba(150,205,255,0.45)"),
          transparent: true,
          depthWrite: false,
          opacity: 0,
        }),
      );
      wristGlow.position.copy(WRIST);
      wristGlow.scale.setScalar(0.18);
      const BAND = compact ? 260 : 420;
      const bandPos = new Float32Array(BAND * 3);
      for (let i = 0; i < BAND; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = 0.034 + Math.random() * 0.007;
        bandPos[i * 3] = WRIST.x + Math.cos(a) * r;
        bandPos[i * 3 + 1] = WRIST.y + (Math.random() - 0.5) * 0.05;
        bandPos[i * 3 + 2] = WRIST.z + Math.sin(a) * r * 0.9;
      }
      const bandGeo = new THREE.BufferGeometry();
      bandGeo.setAttribute("position", new THREE.BufferAttribute(bandPos, 3));
      wristBand = new THREE.Points(
        bandGeo,
        new THREE.PointsMaterial({
          size: 0.013,
          map: glowTexture("rgba(255,255,255,1)", "rgba(190,225,255,0.6)"),
          transparent: true,
          opacity: 0,
          color: 0xe6f4ff,
          depthWrite: false,
        }),
      );
      figure.add(wristGlow, wristBand);

      // Step 2: a few small report pages that drift in to the figure and fade,
      // as if being added to its memory.
      const pageTexture = (function () {
        const cv = document.createElement("canvas");
        cv.width = 64;
        cv.height = 80;
        const ctx = cv.getContext("2d")!;
        ctx.fillStyle = "rgba(120,170,240,0.20)";
        ctx.strokeStyle = "rgba(200,226,255,0.95)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(4, 4, 56, 72, 7);
        ctx.fill();
        ctx.stroke();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "rgba(200,226,255,0.7)";
        [22, 34, 46, 58].forEach(function (y, i) {
          ctx.beginPath();
          ctx.moveTo(14, y);
          ctx.lineTo(i === 3 ? 36 : 50, y);
          ctx.stroke();
        });
        return new THREE.CanvasTexture(cv);
      })();
      const PAGES = compact ? 5 : 7;
      for (let i = 0; i < PAGES; i++) {
        const mesh = new THREE.Mesh(
          new THREE.PlaneGeometry(0.105, 0.131),
          new THREE.MeshBasicMaterial({ map: pageTexture, transparent: true, opacity: 0, depthWrite: false }),
        );
        mesh.visible = false;
        scene.add(mesh);
        const side = i % 2 === 0 ? 1 : -1;
        recordPages.push({
          mesh,
          from: new THREE.Vector3(side * (0.8 + Math.random() * 0.4), 0.8 + Math.random() * 1.0, 0.25 + Math.random() * 0.45),
          offset: i / PAGES,
          tilt: (Math.random() - 0.5) * 0.7,
        });
      }
    }

    /* ── Tilted, depth-faded perspective rings ── */
    const ringVert =
      "varying float vZ; void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vZ = -mv.z; gl_Position = projectionMatrix * mv; }";
    const ringFrag =
      "uniform vec3 uColor; uniform float uOpacity, uNear, uFar; varying float vZ;" +
      "void main(){ float f = smoothstep(uFar, uNear, vZ); gl_FragColor = vec4(uColor, uOpacity * mix(0.12, 1.0, f)); }";
    function makeRingMat(color: string, opacity: number) {
      return new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uOpacity: { value: opacity },
          uNear: { value: 3.2 },
          uFar: { value: 5.4 },
        },
        vertexShader: ringVert,
        fragmentShader: ringFrag,
        transparent: true,
        depthWrite: false,
      });
    }
    const DEG = Math.PI / 180;
    interface OrbitRing {
      pivot: THREE.Group;
      speed: number;
    }
    const rings: OrbitRing[] = [];
    function addRing(
      radius: number,
      inclDeg: number,
      tiltZ: number,
      color: string,
      opacity: number,
      speed: number,
      cy: number,
    ) {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 180; i++) {
        const a = (i / 180) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
      }
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), makeRingMat(color, opacity));
      line.rotation.x = inclDeg * DEG;
      line.rotation.z = tiltZ;
      const pivot = new THREE.Group();
      pivot.position.y = cy;
      pivot.add(line);
      scene.add(pivot);
      rings.push({ pivot, speed });
    }
    // Gently-tilted, nested orbital rings that clearly encircle the figure
    // (their arcs stay well off the body axis, so they never cut through it).
    if (showRings) {
      addRing(1.04, 18, 0.06, "#3f7fd6", 0.62, 0.09, FIGURE_Y);
      addRing(1.18, 22, -0.1, "#5a8fd8", 0.44, -0.06, FIGURE_Y);
      if (!compact) addRing(1.32, 26, 0.03, "#82a9de", 0.3, 0.045, FIGURE_Y);
    }

    /* ── Soft platform glow (replaces the flat disc/ring) ── */
    function platformGlow(radius: number, opacity: number, inner: string, mid: string) {
      const cv = document.createElement("canvas");
      cv.width = cv.height = 256;
      const ctx = cv.getContext("2d")!;
      const g = ctx.createRadialGradient(128, 128, 8, 128, 128, 128);
      g.addColorStop(0, inner);
      g.addColorStop(0.55, mid);
      g.addColorStop(1, "rgba(90,115,170,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 256, 256);
      const mesh = new THREE.Mesh(
        new THREE.CircleGeometry(radius, 56),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cv), transparent: true, opacity, depthWrite: false }),
      );
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y = 0.004;
      mesh.scale.y = 0.62; // elliptical footprint in perspective
      scene.add(mesh);
    }
    platformGlow(1.25, 0.6, "rgba(120,150,210,0.10)", "rgba(110,140,200,0.05)"); // wide ambient base
    platformGlow(0.78, 0.95, "rgba(70,100,165,0.32)", "rgba(90,115,175,0.12)"); // tighter core

    /* ── Ambient particle drift ── */
    let ambient: THREE.Points | null = null;
    let ambBase: Float32Array | null = null;
    let ambPhase: Float32Array | null = null;
    if (!compact) {
      const AMB = 28;
      const ap = new Float32Array(AMB * 3);
      ambBase = new Float32Array(AMB * 3);
      ambPhase = new Float32Array(AMB);
      for (let i = 0; i < AMB; i++) {
        const x = (Math.random() - 0.5) * 3.2;
        const y = 0.3 + Math.random() * 1.9;
        const z = (Math.random() - 0.5) * 2.2;
        ap[i * 3] = ambBase[i * 3] = x;
        ap[i * 3 + 1] = ambBase[i * 3 + 1] = y;
        ap[i * 3 + 2] = ambBase[i * 3 + 2] = z;
        ambPhase[i] = Math.random() * 6.283;
      }
      const ag = new THREE.BufferGeometry();
      ag.setAttribute("position", new THREE.BufferAttribute(ap, 3));
      ambient = new THREE.Points(
        ag,
        new THREE.PointsMaterial({
          size: 0.045,
          map: glowTexture("rgba(255,255,255,0.9)", "rgba(150,195,255,0.5)"),
          transparent: true,
          opacity: 0.45,
          color: 0x9bc0ef,
          depthWrite: false,
        }),
      );
      scene.add(ambient);
    }

    /* ── Resize ── */
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
      camera.updateProjectionMatrix();
      bodyMat.uniforms.uScale.value = (h * Math.min(window.devicePixelRatio, 2)) / 105;
      if (ghostMat) ghostMat.uniforms.uScale.value = bodyMat.uniforms.uScale.value;
    }
    const twinResizeObserver = new ResizeObserver(resize);
    twinResizeObserver.observe(container);
    window.addEventListener("resize", resize);
    resize();
    requestAnimationFrame(resize);
    const firstPaints = [0, 100, 400, 1000].map((ms) =>
      window.setTimeout(() => {
        resize();
        renderer.render(scene, camera);
      }, ms),
    );

    /* ── Animate ── */
    const clock = new THREE.Clock();
    let elapsed = 0;
    function heartbeat(ph: number) {
      const p =
        Math.exp(-Math.pow((ph - 0.07) * 10.5, 2)) + 0.45 * Math.exp(-Math.pow((ph - 0.3) * 9.0, 2));
      return Math.min(p, 1);
    }
    const SCAN_LO = 0.05, SCAN_HI = 1.78, SCAN_PERIOD = 8;
    let beatPhase = 0;
    let driftNow = driftRef.current;
    let scrollNow = 0;
    let announced = false;
    const CALM = new THREE.Color("#9fd4ff");
    const DRIFTED = new THREE.Color("#ffab4d");
    const WHITE = new THREE.Color("#ffffff");
    const SPRITE_DRIFTED = new THREE.Color("#ffc27a");
    let rafId = 0;
    let running = false;
    let formT = 0; // seconds of on-screen time since the figure began to form
    const FORM_SECONDS = 2.4;

    // Story mode state (all stay at zero for the hero).
    let wWrist = 0; // 0..1, how far the camera has moved in to the wrist
    let wFuture = 0; // 0..1, how far the "future" twin has appeared
    let wRecords = 0; // 0..1, how strongly the drifting report pages show
    let recT = 0; // their own clock
    const CHEST = new THREE.Vector3(0.04, 1.56, 0.14); // where the pages arrive
    let spin = 0; // the figure's own slow turn, which settles while focused
    let ghostBeat = 0;
    const CAM_BODY = new THREE.Vector3(0, 1.05, 4.35);
    const LOOK_BODY = new THREE.Vector3(0, 1.05, 0);
    const CAM_WRIST = new THREE.Vector3(0.7, 1.2, 2.0);
    const LOOK_WRIST = new THREE.Vector3(0.37, 1.15, 0.06);
    const CAM_FUTURE = new THREE.Vector3(0.12, 1.08, 4.95);
    const LOOK_FUTURE = new THREE.Vector3(0.12, 1.05, 0);
    const _cam = new THREE.Vector3();
    const _look = new THREE.Vector3();

    /* ── Pointer interactivity: the twin turns toward the cursor ──
       Damped follow (no snap), hover-capable devices only, off under
       reduced motion. Listens on window so the floating cards overlaying
       the canvas don't create dead zones. */
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let targetYaw = 0;
    let targetPitch = 0;
    let yaw = 0;
    let pitch = 0;
    function onPointerMove(e: MouseEvent) {
      const r = container!.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const nx = THREE.MathUtils.clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2), -1.4, 1.4);
      const ny = THREE.MathUtils.clamp((e.clientY - (r.top + r.height / 2)) / (r.height / 2), -1.4, 1.4);
      targetYaw = nx * 0.34; // turn toward cursor
      targetPitch = ny * 0.08; // subtle nod
    }
    function onPointerLeave() {
      targetYaw = 0;
      targetPitch = 0;
    }
    const pointerOn = canHover && !reduceMotion;
    if (pointerOn) {
      window.addEventListener("mousemove", onPointerMove, { passive: true });
      document.addEventListener("mouseleave", onPointerLeave);
    }

    function frame() {
      if (container!.clientWidth !== appliedW || container!.clientHeight !== appliedH) resize();
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!reduceMotion) elapsed += dt;
      const t = elapsed;

      // damped pointer follow (~200ms settle)
      const k = 1 - Math.exp(-dt * 5);
      yaw += (targetYaw - yaw) * k;
      pitch += (targetPitch - pitch) * k;

      // ease toward the requested drift state (~1.5s)
      driftNow += (driftRef.current - driftNow) * (1 - Math.exp(-dt * 1.6));

      // how far the container has scrolled up out of view, 0..1
      if (scrollLinked && !reduceMotion) {
        const r = container!.getBoundingClientRect();
        const target = r.height ? THREE.MathUtils.clamp(-r.top / r.height, 0, 1) : 0;
        scrollNow += (target - scrollNow) * (1 - Math.exp(-dt * 8));
      }

      if (journey) {
        // ease toward the requested focus (~0.6s)
        const f = focusRef.current;
        const kf = 1 - Math.exp(-dt * 3.2);
        wWrist += ((f === "wrist" ? 1 : 0) - wWrist) * kf;
        wFuture += ((f === "future" ? 1 : 0) - wFuture) * kf;
        wRecords += ((f === "records" ? 1 : 0) - wRecords) * kf;
        // The slow turn carries on while looking at the whole body, and settles
        // to face the viewer while a detail is in focus.
        const hold = Math.max(wWrist, wFuture);
        if (!reduceMotion) spin += dt * SETTINGS.rotationSpeed * (1 - hold);
        const facing = Math.round(spin / (Math.PI * 2)) * Math.PI * 2;
        spin += (facing - spin) * (1 - Math.exp(-dt * 3)) * hold;
      }

      figure.rotation.y =
        (journey ? spin : reduceMotion ? 0 : t * SETTINGS.rotationSpeed) + yaw * (1 - wWrist) + scrollNow * 1.5;
      figure.rotation.x = pitch;
      figure.position.y = reduceMotion ? 0 : Math.sin(t * 0.6) * 0.012;

      // slight opposing camera sway for parallax depth; pull back on scroll
      camera.position.x = -yaw * 0.22;
      camera.position.z = 4.35 + scrollNow * 1.4;
      camera.lookAt(0, 1.05, 0);

      if (journey) {
        _cam.copy(CAM_BODY).lerp(CAM_WRIST, wWrist).lerp(CAM_FUTURE, wFuture);
        _look.copy(LOOK_BODY).lerp(LOOK_WRIST, wWrist).lerp(LOOK_FUTURE, wFuture);
        camera.position.set(_cam.x - yaw * 0.22 * (1 - wWrist), _cam.y, _cam.z);
        camera.lookAt(_look);
        figure.position.x = -0.36 * wFuture;
        bodyMat.uniforms.uWrist.value = wWrist;
        if (wristGlow && wristBand) {
          const wp = reduceMotion ? 0.7 : 0.6 + 0.4 * Math.sin(t * 4.2);
          (wristGlow.material as THREE.SpriteMaterial).opacity = wWrist * (0.2 + 0.5 * wp);
          wristGlow.scale.setScalar(0.15 + 0.05 * wp);
          (wristBand.material as THREE.PointsMaterial).opacity = wWrist * 0.95;
          wristGlow.visible = wristBand.visible = wWrist > 0.01;
        }
        if (recordPages.length) {
          if (!reduceMotion) recT += dt;
          for (let i = 0; i < recordPages.length; i++) {
            const r = recordPages[i];
            const c = (recT / 3.8 + r.offset) % 1; // 0 = far out, 1 = arrived
            const e = c * c * (3 - 2 * c);
            const op = wRecords * Math.min(c / 0.18, 1) * Math.min((1 - c) / 0.3, 1) * 0.9;
            r.mesh.visible = op > 0.01;
            if (!r.mesh.visible) continue;
            r.mesh.position.copy(r.from).lerp(CHEST, e);
            r.mesh.rotation.z = r.tilt * (1 - e);
            r.mesh.scale.setScalar(1 - 0.6 * e);
            (r.mesh.material as THREE.MeshBasicMaterial).opacity = op;
          }
        }
        if (ghost && ghostMat && ghostHeart) {
          ghost.visible = wFuture > 0.01;
          if (ghost.visible) {
            ghost.position.set(0.58 * wFuture + 0.1, figure.position.y, -0.18);
            ghost.rotation.y = figure.rotation.y;
            ghostBeat = (ghostBeat + (dt * 98) / 60) % 1; // the drifted, faster pace
            const gp = reduceMotion ? 0.25 : heartbeat(ghostBeat);
            ghostMat.uniforms.uTime.value = t;
            ghostMat.uniforms.uPulse.value = gp;
            ghostMat.uniforms.uForm.value = 1;
            ghostMat.uniforms.uWaveR.value = ghostBeat * 1.5;
            ghostMat.uniforms.uFade.value = 0.5 * wFuture;
            ghostHeart.scale.setScalar(0.2 + gp * 0.1);
            (ghostHeart.material as THREE.SpriteMaterial).opacity = (0.5 + gp * 0.3) * wFuture;
          }
        }
      }

      // 72 bpm at rest, rising to ~98 when drifted
      beatPhase = (beatPhase + (dt * (72 + 26 * driftNow)) / 60) % 1;
      const pulse = SETTINGS.heartbeat && !reduceMotion ? heartbeat(beatPhase) : 0.25;
      (bodyMat.uniforms.uHeartColor.value as THREE.Color).copy(CALM).lerp(DRIFTED, driftNow);
      (heartCore.material as THREE.SpriteMaterial).color.copy(WHITE).lerp(SPRITE_DRIFTED, driftNow);
      (heartHalo.material as THREE.SpriteMaterial).color.copy(WHITE).lerp(DRIFTED, driftNow);
      bodyMat.uniforms.uTime.value = t;
      bodyMat.uniforms.uPulse.value = pulse;
      if (!reduceMotion) {
        // On a first visit the logo intro covers the page for a moment (see
        // index.html). The figure waits for it, so the name comes first and
        // the dots gather afterwards.
        if (!document.documentElement.classList.contains("intro-on")) formT += dt;
        bodyMat.uniforms.uForm.value = Math.min(1, formT / FORM_SECONDS);
        // the ripple starts at the heart on the beat and runs outward
        bodyMat.uniforms.uWaveR.value = beatPhase * 1.5;
      }
      if (bodyMat.uniforms.uScanOn.value > 0) {
        bodyMat.uniforms.uScanY.value = SCAN_LO + ((t % SCAN_PERIOD) / SCAN_PERIOD) * (SCAN_HI - SCAN_LO);
      }

      heartCore.scale.setScalar(0.2 + pulse * 0.1);
      heartHalo.scale.setScalar(0.52 + pulse * 0.22);
      (heartCore.material as THREE.SpriteMaterial).opacity = 0.65 + pulse * 0.35;
      (heartHalo.material as THREE.SpriteMaterial).opacity = 0.35 + pulse * 0.3;
      if (!reduceMotion && formT < FORM_SECONDS + 0.6) {
        // the heart lights up once the chest around it has formed
        const lit = THREE.MathUtils.smoothstep(formT / FORM_SECONDS, 0.6, 1.1);
        (heartCore.material as THREE.SpriteMaterial).opacity *= lit;
        (heartHalo.material as THREE.SpriteMaterial).opacity *= lit;
      }

      for (let i = 0; i < rings.length; i++) {
        rings[i].pivot.rotation.y = reduceMotion ? rings[i].speed * 8 : t * rings[i].speed;
      }

      if (ambient && ambBase && ambPhase && !reduceMotion) {
        const arr = ambient.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < ambPhase.length; i++) {
          arr[i * 3] = ambBase[i * 3] + Math.sin(t * 0.25 + ambPhase[i]) * 0.06;
          arr[i * 3 + 1] = ambBase[i * 3 + 1] + Math.sin(t * 0.32 + ambPhase[i] * 1.7) * 0.05;
          arr[i * 3 + 2] = ambBase[i * 3 + 2] + Math.cos(t * 0.22 + ambPhase[i]) * 0.06;
        }
        ambient.geometry.attributes.position.needsUpdate = true;
        (ambient.material as THREE.PointsMaterial).opacity = 0.32 + (Math.sin(t * 0.8) * 0.5 + 0.5) * 0.18;
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
      clock.getDelta(); // drop the idle gap so motion doesn't jump
      rafId = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(rafId);
    }

    /* ── Pause when offscreen ── */
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) start();
        else stop();
      },
      { threshold: 0.05 },
    );
    io.observe(container);
    start();

    /* ── Cleanup ── */
    return () => {
      stop();
      if (pointerOn) {
        window.removeEventListener("mousemove", onPointerMove);
        document.removeEventListener("mouseleave", onPointerLeave);
      }
      io.disconnect();
      firstPaints.forEach((id) => clearTimeout(id));
      twinResizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      scene.traverse((obj) => {
        const anyObj = obj as unknown as {
          geometry?: THREE.BufferGeometry;
          material?: THREE.Material | THREE.Material[];
        };
        anyObj.geometry?.dispose();
        const m = anyObj.material;
        if (Array.isArray(m)) m.forEach((mm) => mm.dispose());
        else m?.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [dark, scrollLinked, showRings, journey]);

  return (
    <div className={`relative w-full h-full ${dark ? "" : "canvas-fade"} ${className ?? ""}`}>
      {/* soft seating glow behind the twin */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: dark
            ? "radial-gradient(40% 42% at 50% 46%, rgba(64,140,236,0.26), rgba(64,140,236,0.08) 55%, rgba(64,140,236,0) 76%)"
            : "radial-gradient(44% 42% at 50% 44%, rgba(176,202,243,0.30), rgba(176,202,243,0.10) 55%, rgba(176,202,243,0) 76%)",
        }}
      />
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  );
}
