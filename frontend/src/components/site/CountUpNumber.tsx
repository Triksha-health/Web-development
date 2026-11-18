import { useEffect, useRef, useState } from "react";

interface Props {
  value: number;
  prefix?: string;
  /** seconds */
  duration?: number;
  className?: string;
}

const format = (n: number) => Math.round(n).toLocaleString("en-IN");

/**
 * Counts up to `value` the first time it scrolls into view.
 *
 * The real value is what gets rendered on the server and before the script
 * runs, so the price is always in the HTML. The count only starts once the
 * number is on screen, and is skipped entirely when motion is off.
 * (Easing borrowed from components/util/CountUp.tsx.)
 */
export default function CountUpNumber({ value, prefix = "", duration = 1.4, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !document.documentElement.classList.contains("js-motion")) return;
    if (!("IntersectionObserver" in window)) return;

    let raf = 0;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / (duration * 1000), 1);
          setDisplay(value * (1 - Math.pow(1 - t, 3)));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {/* The exact figure for screen readers; the animated one is decorative. */}
      <span className="sr-only">{prefix + format(value)}</span>
      <span aria-hidden="true">{prefix + format(display)}</span>
    </span>
  );
}
