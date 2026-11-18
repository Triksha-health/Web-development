import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { prefersReducedMotion } from "../../lib/motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max rotation in degrees */
  intensity?: number;
}

/**
 * A subtle 3D mouse-tilt wrapper: perspective tilt toward the cursor plus a
 * soft brand-blue spotlight that tracks it. Driven by spring-damped motion
 * values (no per-move React re-renders, GPU-composited transform).
 * No-op under reduced motion; hover-only so touch devices are unaffected.
 */
const TiltCard: React.FC<TiltCardProps> = ({ children, className = "", intensity = 6 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = prefersReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 260, damping: 22, mass: 0.5 });
  const sy = useSpring(ry, { stiffness: 260, damping: 22, mass: 0.5 });
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const spotOn = useMotionValue(0);

  const transform = useMotionTemplate`perspective(900px) rotateX(${sx}deg) rotateY(${sy}deg)`;
  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${spotX}% ${spotY}%, rgba(5,113,211,0.12), transparent 60%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduce) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height;
    rx.set((py - 0.5) * -intensity * 2);
    ry.set((px - 0.5) * intensity * 2);
    spotX.set(px * 100);
    spotY.set(py * 100);
    spotOn.set(1);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    spotOn.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative will-change-transform ${className}`}
      style={{ transform, transformStyle: "preserve-3d" }}
    >
      {children}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{ opacity: spotOn, background: spotlight }}
      />
    </motion.div>
  );
};

export default TiltCard;
