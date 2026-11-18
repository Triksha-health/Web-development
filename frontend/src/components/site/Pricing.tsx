import type { CSSProperties } from "react";
import CountUpNumber from "./CountUpNumber";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

const priceClass =
  "font-display text-[clamp(56px,6.4vw,92px)] font-medium leading-none tracking-[-0.01em]";

const PLANS = [
  { term: "6 months, prepaid", value: 9000, highlight: false },
  { term: "12 months, prepaid", value: 18000, highlight: true },
];

export default function Pricing() {
  return (
    <section id="pricing" className="sec theme-light">
      <div className="site-wrap flex flex-col gap-11">
      <div className="flex max-w-[860px] flex-col gap-[18px]" data-reveal>
        <p className="section-label">Planned pricing</p>
        <h2 className="h-display">You subscribe to the insight. The sensor comes free.</h2>
        <p className="lede">
          One family plan. The wristband is included, never sold separately. Final pricing will
          be confirmed before launch.
        </p>
      </div>

      <div className="grid max-w-[980px] gap-5 md:grid-cols-2">
        {PLANS.map((plan, i) => (
          <div
            key={plan.term}
            data-reveal
            style={step(i)}
            className={`card-hover flex flex-col gap-3.5 rounded-2xl bg-canvas-paper p-9 ${
              plan.highlight ? "border-2 border-accent-500" : "border border-line"
            }`}
          >
            <span className="section-label">{plan.term}</span>
            <p className={priceClass}>
              <CountUpNumber value={plan.value} prefix="₹" />
            </p>
            <p className="text-body">
              ₹1,500 a month. Wristband, app and Health Book included.
            </p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
