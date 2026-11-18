import { useEffect } from "react";

/**
 * Reveal-on-scroll for elements marked with `data-reveal`.
 *
 * Adds `.is-in` the first time an element enters the screen, then `.is-done`
 * once its entrance has finished (see src/motion.css). The hidden starting
 * state only exists while <html> has the `js-motion` class, so this hook is
 * purely an enhancement: if it never runs, nothing is hidden.
 *
 * Fail-safe: if the observer has not reported anything shortly after
 * mounting, everything is revealed, so a browser quirk can never leave a
 * section blank.
 *
 * @param key re-scan when this changes (pass the current pathname).
 */
export function useReveal(key: string): void {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("js-motion")) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    if (els.length === 0) return;

    const timers: number[] = [];
    const show = (el: HTMLElement) => {
      el.classList.add("is-in");
      const i = Number(el.style.getPropertyValue("--i")) || 0;
      timers.push(window.setTimeout(() => el.classList.add("is-done"), 1100 + i * 85));
    };

    if (!("IntersectionObserver" in window)) {
      els.forEach(show);
      return;
    }

    let reported = false;
    const obs = new IntersectionObserver(
      (entries) => {
        reported = true;
        entries.forEach((e) => {
          // Also reveal anything already scrolled past (e.g. arriving via /#about).
          if (e.isIntersecting || e.boundingClientRect.bottom < 0) {
            show(e.target as HTMLElement);
            obs.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));

    timers.push(
      window.setTimeout(() => {
        if (!reported) {
          obs.disconnect();
          els.forEach(show);
        }
      }, 2500)
    );

    return () => {
      obs.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [key]);
}
