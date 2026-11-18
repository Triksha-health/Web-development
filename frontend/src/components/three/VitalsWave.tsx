import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Ribbon() {
  const ref = useRef<THREE.Mesh>(null!);
  const segments = 200;
  const width = 6;

  const { positions, indices, count } = useMemo(() => {
    const positions = new Float32Array(segments * 2 * 3);
    const indices: number[] = [];
    for (let i = 0; i < segments; i++) {
      const x = (i / (segments - 1)) * width - width / 2;
      positions[i * 6 + 0] = x;
      positions[i * 6 + 1] = 0.1;
      positions[i * 6 + 2] = 0;
      positions[i * 6 + 3] = x;
      positions[i * 6 + 4] = -0.1;
      positions[i * 6 + 5] = 0;
      if (i < segments - 1) {
        const a = i * 2;
        indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
      }
    }
    return { positions, indices, count: segments };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const geom = ref.current.geometry;
    const pos = geom.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const x = (i / (count - 1)) * width - width / 2;
      // ECG-like spike pattern + soft sine
      const phase = x * 1.4 - t * 1.6;
      const spike =
        Math.exp(-Math.pow(((x + 2.5) % 3) - 1.4, 2) * 8) * 0.8 * Math.sin(phase * 4);
      const baseline = Math.sin(phase) * 0.18;
      const y = baseline + spike;
      pos[i * 6 + 1] = y + 0.06;
      pos[i * 6 + 4] = y - 0.06;
      // gentle z wobble
      const z = Math.sin(phase * 0.6) * 0.25;
      pos[i * 6 + 2] = z;
      pos[i * 6 + 5] = z;
    }
    geom.attributes.position.needsUpdate = true;
    geom.computeVertexNormals();
  });

  return (
    <mesh ref={ref} rotation={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute attach="index" array={new Uint16Array(indices)} count={indices.length} itemSize={1} />
      </bufferGeometry>
      <meshStandardMaterial
        color="#1E80DB"
        emissive="#1E80DB"
        emissiveIntensity={0.6}
        metalness={0.2}
        roughness={0.3}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}

function Pulse() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const s = 1 + (Math.sin(t * 2.4) + 1) * 0.35;
    ref.current.scale.setScalar(s);
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.opacity = 0.6 - (Math.sin(t * 2.4) + 1) * 0.25;
  });
  return (
    <mesh ref={ref} position={[2.5, 0, 0]}>
      <ringGeometry args={[0.2, 0.22, 64]} />
      <meshStandardMaterial color="#1E80DB" emissive="#1E80DB" emissiveIntensity={1.2} transparent toneMapped={false} />
    </mesh>
  );
}

export default function VitalsWave({ className }: { className?: string }) {
  return (
    <div className={`relative w-full h-full canvas-fade ${className ?? ""}`}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0.4, 4.8], fov: 35 }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 3]} intensity={0.8} />
        <Suspense fallback={null}>
          <Ribbon />
          <Pulse />
        </Suspense>
      </Canvas>
    </div>
  );
}
