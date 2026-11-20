import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { canRunScene } from "./JourneyTwin";

const SensorScene = lazy(() => import("../three/SensorScene"));

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * Sensor v1, shown as the real photo first. Where the browser can run it, the
 * photo gives way to the two boards in 3D: stacked as they sit on the wrist,
 * then lifting apart as this part of the page scrolls up the screen.
 *
 * The photo stays for reduced motion, data saver, low-memory devices and
 * browsers without WebGL.
 */
export default function SensorStage() {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [live, setLive] = useState(false);
  const [open, setOpen] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canRunScene()) return;
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
  }, []);

  // The boards lift apart as the panel's middle travels from 80% to 40% of
  // the way down the screen.
  useEffect(() => {
    const el = ref.current;
    if (!load || !el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const middle = (r.top + r.height / 2) / vh;
      const next = Math.round(clamp01((0.8 - middle) / 0.4) * 50) / 50;
      setOpen((prev) => (prev === next ? prev : next));
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

  return (
    <div
      ref={ref}
      className={`journey relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#0b1d3a] ${live ? "is-live" : ""}`}
    >
      <div className="journey-poster">
        <img
          src="/img/sensor-v1-800.webp"
          srcSet="/img/sensor-v1-800.webp 800w, /img/sensor-v1-1340.webp 1340w"
          sizes="(min-width: 1024px) 660px, 92vw"
          alt="Triksha’s first sensor: two green circuit boards, component side up, on a blue work mat"
          width={1340}
          height={760}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      {load && (
        <div className="journey-live" aria-hidden="true">
          <Suspense fallback={null}>
            <SensorScene open={open} onReady={() => setLive(true)} />
          </Suspense>
        </div>
      )}
      {live && (
        <p className="pointer-events-none absolute bottom-3 left-4 text-[13px] text-navy-200">
          <span className="hidden lg:inline">Move the cursor over the boards to turn them</span>
          <span className="lg:hidden">Drag to turn the boards</span>
        </p>
      )}
    </div>
  );
}
