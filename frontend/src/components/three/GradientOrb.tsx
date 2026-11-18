import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Orb() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.18;
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.2;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.4, 96, 96]} />
      <MeshDistortMaterial
        color="#0571D3"
        distort={0.42}
        speed={1.4}
        roughness={0.15}
        metalness={0.25}
      />
    </mesh>
  );
}

export default function GradientOrb({ className }: { className?: string }) {
  return (
    <div className={`relative w-full h-full canvas-fade ${className ?? ""}`}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 4.5], fov: 38 }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 3, 3]} intensity={0.9} />
        <Suspense fallback={null}>
          <Orb />
        </Suspense>
      </Canvas>
    </div>
  );
}
