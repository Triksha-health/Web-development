export default function Pricing() {
  return (
    <section id="pricing" className="site-wrap site-section flex flex-col gap-11">
      <div className="flex max-w-[760px] flex-col gap-[18px]">
        <p className="kicker">Planned pricing</p>
        <h2 className="h-display">
          You subscribe to the insight.{" "}
          <span className="text-accent-500">The sensor comes free.</span>
        </h2>
        <p className="lede">
          One family plan. The wristband is included, never sold separately. Final pricing will
          be confirmed before launch.
        </p>
      </div>

      <div className="grid max-w-[900px] gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-3.5 rounded-[26px] border border-line bg-canvas-paper p-9">
          <span className="mono-tag text-muted">6 months · Prepaid</span>
          <p className="font-display text-[52px] font-semibold leading-none">₹9,000</p>
          <p className="text-body">₹1,500 a month · wristband, app and Health Book included</p>
        </div>
        <div className="flex flex-col gap-3.5 rounded-[26px] border-2 border-accent-500 bg-canvas-paper p-9">
          <span className="mono-tag text-accent-600">12 months · Prepaid</span>
          <p className="font-display text-[52px] font-semibold leading-none">₹18,000</p>
          <p className="text-body">
            ₹1,500 a month · wristband, app, Health Book and a monthly report included
          </p>
        </div>
      </div>
    </section>
  );
}
