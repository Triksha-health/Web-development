import { useEffect, useRef, useState } from "react";

/**
 * "What an alert looks like" — an interactive illustration.
 * Dragging the slider walks through 30 example days: the signals sit
 * inside the person's normal, start to drift, and the alert appears on
 * the day Triksha would warn. Day 30 matches the approved static design,
 * and is what the page shows before any script runs.
 *
 * All numbers are made up for illustration. Nothing here is patient data
 * or a claim about how the finished engine performs.
 */
const DAYS = 30;
const DRIFT_START = 16; // last day inside normal
const ALERT_DAY = 24; // day the twin would warn

const drift = (day: number) => Math.min(1, Math.max(0, (day - DRIFT_START) / (DAYS - DRIFT_START)));

// Chart geometry
const CW = 320;
const CH = 96;
const xOf = (day: number) => ((day - 1) / (DAYS - 1)) * CW;
// A little day-to-day movement so the line reads as a signal, not a ruler.
const jitter = (day: number) => Math.sin(day * 2.3) * 2.2 + Math.cos(day * 1.1) * 1.4;
const yOf = (day: number) => 70 - drift(day) * 52 + jitter(day);
const linePath = (from: number, to: number) => {
  let d = "";
  for (let day = from; day <= to; day++) {
    d += `${day === from ? "M" : "L"}${xOf(day).toFixed(1)} ${yOf(day).toFixed(1)} `;
  }
  return d.trim();
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function TwinDemo() {
  const [day, setDay] = useState(DAYS);
  const [playing, setPlaying] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number>();
  const autoPlayed = useRef(false);

  const stop = () => {
    window.clearInterval(timer.current);
    setPlaying(false);
  };

  const play = () => {
    window.clearInterval(timer.current);
    if (prefersReducedMotion()) {
      setDay(1);
      return;
    }
    setPlaying(true);
    setDay(1);
    timer.current = window.setInterval(() => {
      setDay((d) => {
        if (d >= DAYS) {
          window.clearInterval(timer.current);
          setPlaying(false);
          return DAYS;
        }
        return d + 1;
      });
    }, 170);
  };

  // Play the 30 days once, the first time the card is properly on screen.
  useEffect(() => {
    const el = cardRef.current;
    if (!el || prefersReducedMotion()) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !autoPlayed.current) {
          autoPlayed.current = true;
          obs.disconnect();
          play();
        }
      },
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      window.clearInterval(timer.current);
    };
  }, []);

  const p = drift(day);
  const driftDays = Math.max(0, day - DRIFT_START);
  const stress = Math.round(38 * p);
  const rhr = Math.round(5 * p);
  const alerted = day >= ALERT_DAY;
  const watching = day > DRIFT_START && !alerted;

  const headline = alerted
    ? "Your heart is working harder than your normal."
    : watching
      ? "Something small is shifting. Your twin is watching it."
      : "Your heart is steady, inside your normal.";

  const stressText =
    stress > 0 ? `+${stress}% over ${driftDays} ${driftDays === 1 ? "day" : "days"}` : "Within your normal";
  const sleepText = p >= 0.5 ? "Less deep sleep" : p > 0.12 ? "Slightly less deep sleep" : "Within your normal";
  const rhrText = rhr > 0 ? `+${rhr} bpm` : "Within your normal";

  const rows = [
    { label: "Stress markers", value: stressText, moved: stress > 0 },
    { label: "Sleep pattern", value: sleepText, moved: p > 0.12 },
    { label: "Resting heart rate", value: rhrText, moved: rhr > 0 },
  ];

  const lineColor = alerted ? "#8A4B0A" : watching ? "#C9781E" : "#1B6BC9";

  return (
    <div
      ref={cardRef}
      className="flex flex-col gap-5 rounded-[26px] border border-line bg-canvas p-[clamp(24px,3vw,40px)]"
    >
      <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
        Illustrative alert · Engine in development
      </span>

      <div className="flex flex-col gap-1.5" aria-live="polite">
        <span className="text-[15px] text-body">You, 38 · day {day} of 30</span>
        <p className="min-h-[2.3em] font-display text-[clamp(26px,2.6vw,32px)] font-semibold leading-[1.15]">
          {headline}
        </p>
      </div>

      {/* Drift chart */}
      <div>
        <svg
          viewBox={`0 0 ${CW} ${CH}`}
          className="block h-24 w-full overflow-visible"
          preserveAspectRatio="none"
          role="img"
          aria-label="Chart of an example signal staying inside a normal band for 16 days, then drifting above it."
        >
          {/* the person's normal band */}
          <rect x="0" y="58" width={CW} height="24" rx="4" fill="#E4ECF6" />
          {/* days not reached yet */}
          <path
            d={linePath(1, DAYS)}
            fill="none"
            stroke="#D8CDB6"
            strokeWidth="1.5"
            strokeDasharray="3 4"
            vectorEffect="non-scaling-stroke"
          />
          {/* days so far */}
          <path
            d={linePath(1, day)}
            fill="none"
            stroke={lineColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* the day the twin would warn */}
          <line
            x1={xOf(ALERT_DAY)}
            x2={xOf(ALERT_DAY)}
            y1="6"
            y2={CH}
            stroke={alerted ? "#8A4B0A" : "#B9AE97"}
            strokeWidth="1.5"
            strokeDasharray="2 3"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="mt-1 flex justify-between font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
          <span>Shaded band: your normal</span>
          <span className={alerted ? "text-status-wip" : ""}>Day {ALERT_DAY}: twin warns</span>
        </div>
      </div>

      <dl className="flex flex-col border-t border-line">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-baseline justify-between gap-4 border-b border-line py-3.5"
          >
            <dt className="text-body">{r.label}</dt>
            <dd className={`text-right font-semibold ${r.moved ? "text-ink-900" : "text-muted"}`}>
              {r.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="flex min-h-[34px] flex-wrap gap-2">
        {alerted ? (
          ["Shared with your cardiologist", "Family notified on high risk", "30-day report"].map(
            (chip) => (
              <span
                key={chip}
                className="rounded-full bg-accent-100 px-3 py-[7px] text-[13px] font-semibold text-navy"
              >
                {chip}
              </span>
            )
          )
        ) : (
          <span className="rounded-full border border-line px-3 py-[6px] text-[13px] font-semibold text-muted">
            {watching ? "No alert yet · still watching" : "No alert · nothing to share"}
          </span>
        )}
      </div>

      {/* Slider */}
      <div className="flex flex-col gap-1 border-t border-line pt-5">
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="twin-day" className="text-sm font-semibold">
            Drag through 30 days
          </label>
          <button
            type="button"
            onClick={playing ? stop : play}
            className="rounded-full border border-ink-900 px-3.5 py-1.5 text-[13px] font-semibold transition-colors hover:bg-ink-900 hover:text-canvas-paper active:scale-[0.97]"
          >
            {playing ? "Pause" : "Replay"}
          </button>
        </div>
        <input
          id="twin-day"
          type="range"
          className="twin-range"
          min={1}
          max={DAYS}
          step={1}
          value={day}
          style={{ "--fill": `${((day - 1) / (DAYS - 1)) * 100}%` } as React.CSSProperties}
          onChange={(e) => {
            stop();
            setDay(Number(e.target.value));
          }}
          aria-valuetext={`Day ${day} of 30. ${headline}`}
        />
        <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
          <span>Day 1</span>
          <span>Day 30</span>
        </div>
        <p className="pt-2 text-[13px] text-muted">
          This is an illustration with example numbers, not real patient data or a
          measurement of how Triksha performs.
        </p>
      </div>
    </div>
  );
}
