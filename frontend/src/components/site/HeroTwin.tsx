import { lazy, Suspense, useEffect, useState } from "react";

// three.js is large, so the scene is its own chunk and is only requested by
// browsers that will actually run it (see canRunScene).
const DigitalTwinScene = lazy(() => import("../three/DigitalTwinScene"));

/** Seconds of calm before the twin starts to drift (the alert card follows in CSS). */
const DRIFT_AFTER_MS = 5500;

/**
 * Should this visitor get the live 3D scene, or just the still poster?
 * The poster is the answer whenever the scene would be unwelcome or risky.
 */
function canRunScene(): boolean {
  // Motion is off (reduced motion requested, or scripts were late): keep it still.
  if (!document.documentElement.classList.contains("js-motion")) return false;
  // Lets us check the poster-only path by hand: /?twin=poster
  if (new URLSearchParams(window.location.search).get("twin") === "poster") return false;

  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  if (nav.connection?.saveData) return false; // visitor asked to save data
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2) return false; // low-memory phone

  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * The hero's digital twin. A still image is in the page from the first byte;
 * the live, interactive scene fades in over it once it has loaded and drawn.
 */
export default function HeroTwin() {
  const [load, setLoad] = useState(false);
  const [live, setLive] = useState(false);
  const [drift, setDrift] = useState(0);

  useEffect(() => {
    if (!canRunScene()) return;
    // Let the page paint and settle before fetching the 3D code.
    const start = window.setTimeout(() => setLoad(true), 250);
    const drifted = window.setTimeout(() => setDrift(1), DRIFT_AFTER_MS);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(drifted);
    };
  }, []);

  return (
    <div
      className={`twin-stage absolute inset-0 ${load ? "is-loading" : ""} ${live ? "is-live" : ""}`}
      aria-hidden="true"
    >
      <div className="twin-poster flex justify-center overflow-hidden">
        <img
          src="/img/twin-poster.webp"
          alt=""
          width={743}
          height={835}
          // lowercase on purpose: React 18 passes it through as the HTML attribute
          {...{ fetchpriority: "high" }}
          className="h-full w-auto max-w-none"
        />
      </div>
      {load && (
        <div className="twin-live">
          <Suspense fallback={null}>
            <DigitalTwinScene
              variant="dark"
              showRings={false}
              drift={drift}
              scrollLinked
              onReady={() => setLive(true)}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
}
