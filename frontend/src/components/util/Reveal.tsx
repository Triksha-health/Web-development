import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { fadeUp, viewportOnce } from "../../lib/motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  /** Optional extra delay (seconds) before the reveal animates. */
  delay?: number;
}

/**
 * Reveal-on-scroll wrapper. Animates from `hidden` → `visible` the first time
 * it enters the viewport, using the shared motion variants. Framer Motion
 * automatically renders the final state when reduced motion is preferred.
 */
export default function Reveal({ children, className, variants = fadeUp, delay }: Props) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      {...(delay ? { transition: { delay } } : {})}
    >
      {children}
    </motion.div>
  );
}
