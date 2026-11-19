import { lazy, Suspense, useEffect, useRef, useState } from "react";

// Same 3D scene as the hero, in its own chunk (shared with the hero's).
const DigitalTwinScene = lazy(() => import("../three/DigitalTwinScene"));

export type TwinFocus = "body" | "wrist" | "records" | "future";

/** Should this visitor get the live scene? Mirrors the hero's rules. */
export function canRunScene(): boolean {
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
 * The twin that accompanies the How it works steps. A still image
 * is shown first (and stays, where the live scene would be unwelcome); the
 * live scene is only fetched once this part of the page is near the screen.
 */
interface JourneyTwinProps {
  focus: TwinFocus;
  /** Still image of this state: shown first, and kept where the live scene is not used. */
  poster: string;
}

export default function JourneyTwin({ focus, poster }: JourneyTwinProps) {
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

  return (
    <div ref={ref} className={`journey absolute inset-0 ${live ? "is-live" : ""}`} aria-hidden="true">
      <div className="journey-poster">
        <img
          src={poster}
          alt=""
          width={900}
          height={900}
          loading="lazy"
          className="h-full w-full object-contain"
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
