import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin accent progress bar pinned to the very top of the viewport that tracks
 * overall page scroll. Sits above the nav.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-accent-500 origin-left z-[60]"
    />
  );
}
