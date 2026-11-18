import type { CSSProperties } from "react";

const PEOPLE = [
  {
    role: "Founder & CEO",
    name: "Vemuri Yashwanth",
    img: "/img/founder.webp",
    bio: "NIT Andhra Pradesh. Works on AI for predictive health; built the state-space and memory models behind the twin from scratch for long-term physiological data.",
  },
  {
    role: "Advisor",
    name: "Dr. P. Kishore Kumar",
    img: "/img/advisor.webp",
    bio: "Assistant Professor, NIT Andhra Pradesh. PhD from NIT Warangal in ultra-wideband radar imaging and compressive sensing.",
  },
];

const BACKING = [
  "NIT AP Ignition grant",
  "Microsoft for Startups member",
  "VTY Triksha Health Tech Pvt Ltd",
];

const QUOTE = "“Every preventable health crisis is a failure of early detection.”";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export default function About() {
  return (
    <section id="about" className="border-y border-line bg-canvas-paper">
      <div className="site-wrap site-section grid items-start gap-14 lg:grid-cols-2">
        <div className="flex flex-col gap-[22px]">
          <p className="section-label" data-reveal>
            Why we exist
          </p>
          <h2 className="h-display" data-reveal style={step(1)}>
            Built because an illness was caught too late.
          </h2>
          <p className="lede" data-reveal style={step(2)}>
            Yashwanth started Triksha after his father’s illness went unnoticed until it was
            serious. That loss became one question: what if the body’s early signals could be
            read in time?
          </p>
          <p className="lede" data-reveal style={step(3)}>
            We started with the heart because heart disease so often arrives without any
            warning at all, and because the families left behind are the ones most ready to
            listen to an early one.
          </p>
          {/* The words fill in one by one as the quote scrolls up the screen
              (where supported); otherwise it is simply shown. */}
          <blockquote className="quote-fill mt-2 font-display text-[clamp(26px,3vw,40px)] font-semibold leading-[1.15] tracking-[-0.01em] text-accent-300">
            {QUOTE.split(" ").map((word, i) => (
              <span key={i} style={{ "--w": i } as CSSProperties}>
                {word}{" "}
              </span>
            ))}
          </blockquote>
        </div>

        <div className="flex flex-col gap-5">
          {PEOPLE.map((p, i) => (
            <article
              key={p.name}
              data-reveal="right"
              data-tilt
              data-spot
              style={step(i)}
              className="card-hover flex flex-wrap items-start gap-5 rounded-[22px] border border-line bg-canvas p-6"
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
                <span className="section-label">{p.role}</span>
                <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
                <p className="text-[15px] text-body">{p.bio}</p>
              </div>
            </article>
          ))}
          <ul className="flex flex-col gap-1.5 pt-1.5 text-sm text-body" data-reveal>
            {BACKING.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
