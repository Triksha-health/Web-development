import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { canRunScene } from "./JourneyTwin";

const ParticleShapeScene = lazy(() => import("../three/ParticleShapeScene"));

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * The ending, beside the waitlist form: a soft cloud of dots that gathers
 * into the eye of the Triksha logo as this part of the page scrolls up the
 * screen, and loosens into a cloud again if the visitor scrolls away.
 *
 * Purely decorative. Where the live scene is not used (reduced motion, data
 * saver, low-memory devices, no WebGL) nothing is rendered at all.
 */
export default function EndingMark({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [load, setLoad] = useState(false);
  const [mix, setMix] = useState(0);

  useEffect(() => {
    setEnabled(canRunScene());
  }, []);

  // Fetch the scene only once this is near the screen.
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          obs.disconnect();
          setLoad(true);
        }
      },
      { rootMargin: "300px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [enabled]);

  // Scroll position drives the change: it starts as the panel's middle passes
  // 85% of the way down the screen and is complete by 45%.
  useEffect(() => {
    const el = ref.current;
    if (!load || !el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const middle = (r.top + r.height / 2) / vh;
      const next = Math.round(clamp01((0.85 - middle) / 0.4) * 50) / 50;
      setMix((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [load]);

  if (!enabled) return null;

  return (
    <div ref={ref} className={`ending-mark relative ${className}`} aria-hidden="true">
      {load && (
        <Suspense fallback={null}>
          <ParticleShapeScene shape="cloud" mix={mix} logoSrc="/img/logo-triksha-on-dark.webp" />
        </Suspense>
      )}
    </div>
  );
}
