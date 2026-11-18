import type { Variants } from "framer-motion";

/**
 * Shared motion system. Import these instead of redefining fadeUp/stagger
 * inline per component, so timing/easing stays consistent across the site.
 */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DUR = { fast: 0.4, base: 0.7, slow: 0.9 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DUR.base, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: DUR.base, ease: EASE } },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

/** Standard whileInView viewport config — reveal once, when 20% on screen. */
export const viewportOnce = { once: true, amount: 0.2 } as const;

/** True when the user prefers reduced motion (SSR-safe). */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
