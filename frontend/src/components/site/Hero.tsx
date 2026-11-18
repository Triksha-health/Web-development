import { Link } from "react-router-dom";

/**
 * One loop of a heartbeat trace, `count` beats wide, drawn twice so the
 * strip can slide left by exactly one loop and repeat without a seam.
 */
function tracePath(count: number, period: number, spike: number, wobble: number): string {
  const base = 34;
  const k = period / 120;
  const pts: string[] = [`M0 ${base}`];
  for (let i = 0; i < count * 2; i++) {
    const x = i * period;
    // Baseline wander repeats every `count` beats, which keeps the loop seamless.
    const b = base + Math.sin(((i % count) / count) * Math.PI * 2) * wobble;
    const at = (dx: number, dy: number) => `${(x + dx * k).toFixed(1)} ${(b + dy).toFixed(1)}`;
    pts.push(
      `L${at(38, 0)}`,
      `Q${at(46, -5)} ${at(54, 0)}`,
      `L${at(61, 0)}`,
      `L${at(65, 4)}`,
      `L${at(70, -spike)}`,
      `L${at(75, 9)}`,
      `L${at(79, 0)}`,
      `L${at(87, 0)}`,
      `Q${at(97, -8)} ${at(107, 0)}`,
      `L${at(120, 0)}`
    );
  }
  return pts.join(" ");
}

// Both traces are 480 units per loop: four calm beats, or five faster, shallower ones.
const CALM = tracePath(4, 120, 26, 0);
const DRIFT = tracePath(5, 96, 20, 3.5);

function LiveSignal() {
  return (
    <div
      role="img"
      aria-label="Illustration of a heart signal that runs steadily, then starts to drift from its normal."
      className="w-full"
    >
      <div className="flex flex-col gap-1 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.14em] sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <span className="text-muted">Live signal · Illustrative</span>
        <span className="relative flex sm:justify-end">
          <span className="sig-calm text-status-done">Within your normal</span>
          <span className="sig-drift absolute left-0 top-0 text-status-wip sm:left-auto sm:right-0">
            Drifting
          </span>
        </span>
      </div>
      <svg
        viewBox="0 0 480 56"
        preserveAspectRatio="none"
        className="mt-2 block h-14 w-full"
        fill="none"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <g className="sig-run">
          <path className="sig-calm" d={CALM} stroke="#1B6BC9" vectorEffect="non-scaling-stroke" />
          <path className="sig-drift" d={DRIFT} stroke="#C9781E" vectorEffect="non-scaling-stroke" />
        </g>
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="site-wrap grid items-center gap-14 pb-[clamp(56px,7vw,96px)] pt-[clamp(40px,6vw,88px)] lg:grid-cols-2"
    >
      <div className="flex flex-col gap-7">
        <p className="kicker flex items-center gap-3">
          <span aria-hidden="true" className="inline-block h-px w-7 flex-none bg-accent-600" />
          They whisper before they shout
        </p>
        <h1 className="text-hero font-display font-semibold">
          Know your heart’s risk <span className="text-accent-500">before symptoms do.</span>
        </h1>
        <p className="max-w-[33em] text-[clamp(18px,1.6vw,20px)] text-body [text-wrap:pretty]">
          Triksha is a personal digital twin for your heart health. A wristband senses your
          body every day, your Health Book remembers every report, and the twin warns you —
          and the people you choose — when something starts to drift.
        </p>
        <div className="flex flex-wrap items-center gap-3.5">
          <Link to="/#waitlist" className="cta cta-blue">
            Join the waitlist
          </Link>
          <Link to="/#how" className="cta cta-outline">
            See how it works
          </Link>
        </div>
        <p className="flex items-start gap-2.5 text-sm text-muted">
          <span
            aria-hidden="true"
            className="mt-[7px] h-2 w-2 flex-none rounded-full bg-status-dot"
          />
          In development · first hospital pilot being planned · not yet a certified medical
          device
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-[520px] pb-28 sm:pb-16">
        <div className="mx-[4%] flex flex-col items-center rounded-[40px] bg-canvas-soft px-6 pt-6 sm:mx-[8%] sm:rounded-[48px] sm:px-8 sm:pt-7">
          <LiveSignal />
          <img
            src="/img/phone1.webp"
            alt="Triksha app dashboard showing the twin’s daily read of vitality and risk"
            width={560}
            height={1177}
            // lowercase on purpose: React 18 passes it through as the HTML attribute
            {...{ fetchpriority: "high" }}
            className="relative -mb-8 mt-4 h-auto w-[min(290px,76%)] drop-shadow-[0_30px_40px_rgba(12,37,71,0.22)]"
          />
        </div>

        <div className="drift-card absolute bottom-0 left-0 flex w-[min(320px,92%)] flex-col gap-2.5 rounded-[18px] border border-line bg-canvas-paper px-5 py-[18px] shadow-card">
          <div className="flex items-center justify-between gap-3 font-mono text-[11px] uppercase">
            <span className="tracking-[0.14em] text-status-wip">Twin noticed a drift</span>
            <span className="tracking-[0.1em] text-muted">Illustrative</span>
          </div>
          <p className="font-display text-[19px] font-semibold leading-tight">
            Your stress and sleep have shifted over 14 days.
          </p>
          <p className="text-sm text-body">
            Resting heart rate up 5 bpm. Deep sleep down. Worth a check-in with your doctor.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="rounded-full bg-accent-100 px-2.5 py-[5px] text-xs font-semibold text-navy">
              Report ready for your cardiologist
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
