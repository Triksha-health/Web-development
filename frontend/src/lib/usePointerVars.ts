import { useEffect } from "react";

const SELECTOR = "[data-tilt],[data-spot],[data-magnetic]";

/**
 * Cursor-reactive depth for elements marked data-tilt, data-spot or
 * data-magnetic. One listener for the whole page writes CSS variables on the
 * element under the pointer; src/motion.css turns them into a 3D tilt, a
 * moving highlight, or a slight pull toward the cursor.
 *
 *   --px / --py   pointer position from the element's centre, -1..1
 *   --mx / --my   pointer position from its top-left corner, 0..1
 *
 * Mouse and trackpad only, and off when reduced motion is requested.
 */
export function usePointerEffects(): void {
  useEffect(() => {
    if (!document.documentElement.classList.contains("js-motion")) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let current: HTMLElement | null = null;
    let raf = 0;
    let lastX = 0;
    let lastY = 0;

    const reset = (el: HTMLElement) => {
      el.style.removeProperty("--px");
      el.style.removeProperty("--py");
    };

    const apply = () => {
      raf = 0;
      if (!current) return;
      const r = current.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const mx = (lastX - r.left) / r.width;
      const my = (lastY - r.top) / r.height;
      current.style.setProperty("--mx", mx.toFixed(3));
      current.style.setProperty("--my", my.toFixed(3));
      current.style.setProperty("--px", ((mx - 0.5) * 2).toFixed(3));
      current.style.setProperty("--py", ((my - 0.5) * 2).toFixed(3));
    };

    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>(SELECTOR) ?? null;
      if (el !== current) {
        if (current) reset(current);
        current = el;
      }
      if (!current) return;
      lastX = e.clientX;
      lastY = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      if (current) reset(current);
      current = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);
}
