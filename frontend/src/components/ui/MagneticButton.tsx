import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { prefersReducedMotion } from "../../lib/motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  /** How strongly the element follows the cursor (0–1). */
  strength?: number;
}

/**
 * Wraps an interactive element (button / link) so it subtly pulls toward the
 * cursor on hover, then springs back. No-op under reduced motion.
 */
export default function MagneticButton({ children, className, strength = 0.35 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });
  // Compose a full transform string so it's GPU-accelerated (FM x/y shorthands
  // run on the main thread and can drop frames under load).
  const transform = useTransform([sx, sy], ([vx, vy]) => `translate(${vx}px, ${vy}px)`);
  const reduce = prefersReducedMotion();

  function handleMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-flex ${className ?? ""}`}
      style={{ transform }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}
