const STATUS = [
  { item: "Wristband sensor, version 1", state: "Built & tested", tone: "text-status-done" },
  { item: "Health Book", state: "Working", tone: "text-status-done" },
  { item: "Drift detection engine", state: "In development", tone: "text-status-wip" },
  { item: "Twin simulation", state: "In development", tone: "text-status-wip" },
  { item: "Hospital pilot & regulatory review", state: "Next", tone: "text-body" },
];

export default function StatusSection() {
  return (
    <section id="status" className="site-wrap site-section grid items-center gap-14 lg:grid-cols-2">
      <div className="flex flex-col gap-[22px]">
        <p className="kicker">Where we are today</p>
        <h2 className="h-display">
          Not a render. <span className="text-accent-500">Real hardware,</span> on a real wrist.
        </h2>
        <p className="lede">
          We would rather tell you exactly where Triksha stands than promise too much.
        </p>
        <ol className="flex flex-col border-t border-line">
          {STATUS.map((s) => (
            <li
              key={s.item}
              className="flex items-baseline justify-between gap-4 border-b border-line py-4"
            >
              <span className="font-semibold">{s.item}</span>
              <span className={`flex-none text-right font-semibold ${s.tone}`}>{s.state}</span>
            </li>
          ))}
        </ol>
      </div>

      <figure className="flex flex-col gap-3">
        <img
          src="/img/sensor-worn-800.webp"
          srcSet="/img/sensor-worn-800.webp 800w, /img/sensor-worn-1400.webp 1400w"
          sizes="(min-width: 1024px) 560px, 92vw"
          alt="Triksha’s first sensor circuit board worn on a wrist"
          width={1400}
          height={689}
          loading="lazy"
          className="h-auto w-full rounded-[26px] shadow-photo"
        />
        <figcaption className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          Sensor v1 · Designed, fabricated and assembled in-house
        </figcaption>
      </figure>
    </section>
  );
}
