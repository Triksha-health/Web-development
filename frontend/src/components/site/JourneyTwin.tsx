import { lazy, Suspense, useEffect, useRef, useState } from "react";

// Same 3D scene as the hero, in its own chunk (shared with the hero's).
const DigitalTwinScene = lazy(() => import("../three/DigitalTwinScene"));

export type TwinFocus = "body" | "wrist" | "future";

/** Should this visitor get the live scene? Mirrors the hero's rules. */
function canRunScene(): boolean {
  if (!document.documentElement.classList.contains("js-motion")) return false;
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  if (nav.connection?.saveData) return false;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2) return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * The twin that accompanies the How it works steps on desktop. A still image
 * is shown first (and stays, where the live scene would be unwelcome); the
 * live scene is only fetched once this part of the page is near the screen.
 */
export default function JourneyTwin({ focus }: { focus: TwinFocus }) {
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
      { rootMargin: "600px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`journey absolute inset-0 ${live ? "is-live" : ""}`} aria-hidden="true">
      <div className="journey-poster flex justify-center overflow-hidden">
        <img
          src="/img/twin-poster.webp"
          alt=""
          width={743}
          height={835}
          loading="lazy"
          className="h-full w-auto max-w-none"
        />
      </div>
      {load && (
        <div className="journey-live">
          <Suspense fallback={null}>
            <DigitalTwinScene
              variant="dark"
              showRings={false}
              journey
              focus={focus}
              onReady={() => setLive(true)}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
}
