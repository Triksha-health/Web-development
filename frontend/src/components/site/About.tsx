const PEOPLE = [
  {
    role: "Founder & CEO",
    roleTone: "text-accent-600",
    name: "Vemuri Yashwanth",
    img: "/img/founder.webp",
    bio: "NIT Andhra Pradesh. Works on AI for predictive health; built the state-space and memory models behind the twin from scratch for long-term physiological data.",
  },
  {
    role: "Advisor",
    roleTone: "text-muted",
    name: "Dr. P. Kishore Kumar",
    img: "/img/advisor.webp",
    bio: "Assistant Professor, NIT Andhra Pradesh. PhD from NIT Warangal in ultra-wideband radar imaging and compressive sensing.",
  },
];

export default function About() {
  return (
    <section id="about" className="border-y border-line bg-canvas-paper">
      <div className="site-wrap site-section grid items-start gap-14 lg:grid-cols-2">
        <div className="flex flex-col gap-[22px]">
          <p className="kicker">Why we exist</p>
          <h2 className="h-display">Built because an illness was caught too late.</h2>
          <p className="lede">
            Yashwanth started Triksha after his father’s illness went unnoticed until it was
            serious. That loss became one question: what if the body’s early signals could be
            read in time?
          </p>
          <p className="lede">
            We started with the heart because heart disease so often arrives without any
            warning at all — and because the families left behind are the ones most ready to
            listen to an early one.
          </p>
          <blockquote className="mt-2 font-display text-[clamp(22px,2.2vw,28px)] font-medium italic leading-[1.3] text-navy">
            “Every preventable health crisis is a failure of early detection.”
          </blockquote>
        </div>

        <div className="flex flex-col gap-5">
          {PEOPLE.map((p) => (
            <article
              key={p.name}
              className="flex flex-wrap items-start gap-5 rounded-[22px] border border-line bg-canvas p-6"
            >
              <img
                src={p.img}
                alt={p.name}
                width={192}
                height={224}
                loading="lazy"
                className="h-28 w-24 flex-none rounded-[14px] object-cover"
              />
              <div className="flex flex-[1_1_220px] flex-col gap-1.5">
                <span className={`mono-tag ${p.roleTone}`}>{p.role}</span>
                <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
                <p className="text-[15px] text-body">{p.bio}</p>
              </div>
            </article>
          ))}
          <ul className="flex flex-wrap gap-x-6 gap-y-2.5 pt-1.5 text-sm text-body">
            <li>NIT AP Ignition grant</li>
            <li aria-hidden="true">·</li>
            <li>Microsoft for Startups member</li>
            <li aria-hidden="true">·</li>
            <li>VTY Triksha Health Tech Pvt Ltd</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
