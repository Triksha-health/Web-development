import type { CSSProperties } from "react";
import SensorStage from "./SensorStage";

const STATUS = [
  { item: "Wristband sensor, version 1", state: "Built & tested", tone: "text-status-done", live: false },
  { item: "Health Book", state: "Working", tone: "text-status-done", live: false },
  { item: "Drift detection engine", state: "In development", tone: "text-status-wip", live: true },
  { item: "Twin simulation", state: "In development", tone: "text-status-wip", live: true },
  { item: "Hospital pilot & regulatory review", state: "Next", tone: "text-body", live: false },
];

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export default function StatusSection() {
  return (
    <section id="status" className="sec theme-light">
      <div className="site-wrap grid items-center gap-x-16 gap-y-12 lg:grid-cols-2">
      <div className="flex flex-col gap-[22px]">
        <h2 className="h-display" data-reveal style={step(1)}>
          Where Triksha is today
        </h2>
        <p className="lede" data-reveal style={step(2)}>
          We would rather tell you exactly where Triksha stands than promise too much.
        </p>
        <ol className="flex flex-col border-t border-line">
          {STATUS.map((s, i) => (
            <li
              key={s.item}
              data-reveal
              style={step(i)}
              className="flex items-baseline justify-between gap-4 border-b border-line py-4"
            >
              <span className="font-semibold">{s.item}</span>
              <span className={`flex-none text-right font-semibold ${s.tone}`}>
                {/* a soft pulse marks the parts still being built */}
                {s.live && <span className="pulse-dot" aria-hidden="true" />}
                {s.state}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <figure className="flex flex-col gap-3" data-reveal="right">
        {/* The real photo first; where the browser can, the two boards in 3D. */}
        <SensorStage />
        <figcaption className="text-sm text-muted">
          Sensor v1, its two boards. Designed, fabricated and assembled in-house.
        </figcaption>
      </figure>
      </div>
    </section>
  );
}
