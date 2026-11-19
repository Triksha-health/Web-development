import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties } from "react";
import TwinDemo, { ALERT_ON_DAY, DRIFT_START_DAY, driftOnDay } from "./TwinDemo";
import { canRunScene } from "./JourneyTwin";

const ParticleShapeScene = lazy(() => import("../three/ParticleShapeScene"));

const step = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * The heart that answers the slider: calm and teal while the example signals
 * sit inside normal, turning amber and beating faster as they drift.
 * Decorative; the card beside it says the same thing in words.
 *
 * A still image shows first, and stays where the live scene is not used
 * (reduced motion, data saver, low-memory devices, no WebGL).
 */
function AlertHeart({ day, className }: { day: number; className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [live, setLive] = useState(false);

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

  const state = day >= ALERT_ON_DAY ? "Twin warns" : day > DRIFT_START_DAY ? "Starting to drift" : "Steady";

  return (
    <div
      ref={ref}
      className={`journey relative overflow-hidden rounded-2xl bg-[#050e1e] ${live ? "is-live" : ""} ${className}`}
      aria-hidden="true"
    >
      <div className="journey-poster">
        <img
          src="/img/heart-still.webp"
          alt=""
          width={800}
          height={800}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </div>
      {load && (
        <div className="journey-live">
          <Suspense fallback={null}>
            <ParticleShapeScene shape="heart" mix={driftOnDay(day)} onReady={() => setLive(true)} />
          </Suspense>
        </div>
      )}
      <p className="absolute left-5 top-5 z-10 font-display text-lg font-medium text-cream">
        Day {day}. {state}
      </p>
      <p className="absolute bottom-4 left-5 z-10 text-[13px] text-navy-200">Illustration</p>
    </div>
  );
}

export default function AlertSection() {
  const [day, setDay] = useState(30);

  return (
    <section id="alert" className="sec theme-light">
      <div className="site-wrap grid items-start gap-x-16 gap-y-12 lg:grid-cols-2">
        <div data-reveal="left">
          <TwinDemo onDayChange={setDay} twinSlot={<AlertHeart day={day} className="h-[250px]" />} />
        </div>
        <div className="flex flex-col gap-[22px]">
          <h2 className="h-display" data-reveal style={step(0)}>
            What an alert looks like
          </h2>
          <p className="lede" data-reveal style={step(1)}>
            Every alert says what changed, how long it has been changing, and what to do next.
            You decide who else sees it: your family, your cardiologist, or both.
          </p>
          <p className="lede" data-reveal style={step(2)}>
            We tune Triksha to avoid false alarms.
          </p>
          {/* Desktop: the heart sits here and follows the slider in the card. */}
          <AlertHeart day={day} className="mt-3 hidden h-[400px] lg:block" />
        </div>
      </div>
    </section>
  );
}
