import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  ContactShadows,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";

/**
 * Stylized "wearable" — a glass ring with a glowing core, sensor dots,
 * and a soft animated emissive sweep. We avoid relying on a GLTF asset
 * by composing primitives, which keeps the build dependency-free.
 */
function WearableDevice() {
  const group = useRef<THREE.Group>(null!);
  const core = useRef<THREE.Mesh>(null!);
  const sweepMat = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.3) * 0.35 + t * 0.05;
      group.current.rotation.x = Math.sin(t * 0.2) * 0.08;
    }
    if (core.current) {
      const s = 1 + Math.sin(t * 1.8) * 0.04;
      core.current.scale.setScalar(s);
    }
    if (sweepMat.current) {
      sweepMat.current.emissiveIntensity = 1.2 + Math.sin(t * 2.4) * 0.6;
    }
  });

  // Position six sensor dots evenly around the inner face
  const sensorPositions = useMemo(() => {
    const arr: [number, number, number][] = [];
    const r = 0.78;
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      arr.push([Math.cos(a) * r, Math.sin(a) * r, 0.12]);
    }
    return arr;
  }, []);

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Outer ring (warm brushed metal) */}
      <mesh castShadow receiveShadow>
        <torusGeometry args={[1.05, 0.18, 64, 128]} />
        <meshStandardMaterial
          color="#E8E1CE"
          metalness={0.8}
          roughness={0.28}
        />
      </mesh>

      {/* Inner face (deep navy glass) */}
      <mesh position={[0, 0, 0.02]}>
        <cylinderGeometry args={[0.92, 0.92, 0.05, 64]} />
        <meshPhysicalMaterial
          color="#0A2A52"
          metalness={0.25}
          roughness={0.06}
          transmission={0.05}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Glowing core — Triksha blue */}
      <mesh ref={core} position={[0, 0, 0.08]}>
        <sphereGeometry args={[0.32, 64, 64]} />
        <meshStandardMaterial
          color="#479FE6"
          emissive="#1E80DB"
          emissiveIntensity={1.7}
          roughness={0.1}
          metalness={0.0}
          toneMapped={false}
        />
      </mesh>

      {/* Inner halo ring (animated emissive sweep) */}
      <mesh position={[0, 0, 0.07]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.6, 0.012, 16, 128]} />
        <meshStandardMaterial
          ref={sweepMat}
          color="#1E80DB"
          emissive="#1E80DB"
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>

      {/* Sensor dots */}
      {sensorPositions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.045, 24, 24]} />
          <meshStandardMaterial
            color="#1E80DB"
            emissive="#1E80DB"
            emissiveIntensity={1.0}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Strap stubs */}
      {[1, -1].map((dir) => (
        <mesh key={dir} position={[0, dir * 1.18, 0]}>
          <boxGeometry args={[1.05, 0.35, 0.18]} />
          <meshStandardMaterial color="#16191D" roughness={0.7} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

function OrbitParticles({ count = 80 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const { positions, baseRadii, angles, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const baseRadii = new Float32Array(count);
    const angles = new Float32Array(count);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 1.7 + Math.random() * 1.3;
      const a = Math.random() * Math.PI * 2;
      baseRadii[i] = r;
      angles[i] = a;
      speeds[i] = 0.05 + Math.random() * 0.15;
      positions[i * 3 + 0] = Math.cos(a) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.6;
      positions[i * 3 + 2] = Math.sin(a) * r;
    }
    return { positions, baseRadii, angles, speeds };
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const a = angles[i] + t * speeds[i];
      const r = baseRadii[i];
      arr[i * 3 + 0] = Math.cos(a) * r;
      arr[i * 3 + 2] = Math.sin(a) * r;
      arr[i * 3 + 1] += Math.sin(t * 0.5 + i) * 0.0008;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#1E80DB"
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  );
}

interface Props {
  className?: string;
}

export default function WearableScene({ className }: Props) {
  return (
    <div className={`relative w-full h-full canvas-fade ${className ?? ""}`}>
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows
        camera={{ position: [0, 0.3, 4.6], fov: 38 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0.3, 4.6]} fov={38} />
        <color attach="background" args={[0, 0, 0]} />
        {/* alpha bg — canvas is transparent over the page */}

        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 6, 5]} intensity={1.05} castShadow />
        <directionalLight position={[-4, -2, -3]} intensity={0.35} color="#A8D2F6" />

        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>
            <WearableDevice />
          </Float>
          <OrbitParticles count={90} />
          <Environment preset="city" />
          <ContactShadows
            position={[0, -1.6, 0]}
            opacity={0.32}
            scale={6}
            blur={2.4}
            far={3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Tell Vite to treat this as a client-only module by default (no SSR issues).
