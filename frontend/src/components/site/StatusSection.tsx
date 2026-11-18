import type { CSSProperties } from "react";

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
    <section id="status" className="site-wrap site-section grid items-center gap-14 lg:grid-cols-2">
      <div className="flex flex-col gap-[22px]">
        <p className="section-label" data-reveal>
          Where we are today
        </p>
        <h2 className="h-display" data-reveal style={step(1)}>
          Not a render. Real hardware, on a real wrist.
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
        {/* The photo sits slightly oversized in its frame and drifts as the page
            scrolls, where the browser supports it. */}
        <div className="parallax-frame rounded-[26px] shadow-photo">
          <img
            src="/img/sensor-worn-800.webp"
            srcSet="/img/sensor-worn-800.webp 800w, /img/sensor-worn-1400.webp 1400w"
            sizes="(min-width: 1024px) 560px, 92vw"
            alt="Triksha’s first sensor circuit board worn on a wrist"
            width={1400}
            height={689}
            loading="lazy"
            className="h-auto w-full"
          />
        </div>
        <figcaption className="text-sm text-muted">
          Sensor v1. Designed, fabricated and assembled in-house.
        </figcaption>
      </figure>
    </section>
  );
}
