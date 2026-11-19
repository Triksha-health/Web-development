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

const BACKING = "NIT AP Ignition grant, Microsoft for Startups member, VTY Triksha Health Tech Pvt Ltd";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export default function About() {
  return (
    <section id="about" className="sec theme-light">
      <div className="site-wrap grid items-start gap-x-16 gap-y-14 lg:grid-cols-2">
        {/* The story */}
        <div className="flex flex-col gap-[22px] lg:sticky lg:top-28">
          <h2 className="h-display" data-reveal style={step(0)}>
            Why we started Triksha
          </h2>
          <p className="lede" data-reveal style={step(1)}>
            Yashwanth started Triksha after his father’s illness went unnoticed until it was
            serious. That loss became one question: what if the body’s early signals could be
            read in time?
          </p>
          <p className="lede" data-reveal style={step(2)}>
            We started with the heart because heart disease so often arrives without any
            warning at all, and because the families left behind are the ones most ready to
            listen to an early one.
          </p>
        </div>

        {/* The people */}
        <div>
          <p className="section-label pb-4">The team</p>
          <ul className="flex flex-col border-t border-line">
            {PEOPLE.map((p, i) => (
              <li
                key={p.name}
                data-reveal
                style={step(i)}
                className="grid grid-cols-[96px_1fr] items-start gap-x-6 gap-y-4 border-b border-line py-8 sm:grid-cols-[144px_1fr] sm:gap-x-8"
              >
                <img
                  src={p.img}
                  alt={p.name}
                  width={348}
                  height={410}
                  loading="lazy"
                  className="aspect-[348/410] w-full rounded-2xl object-cover"
                />
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display text-[clamp(22px,2vw,28px)] font-medium leading-[1.2]">
                      {p.name}
                    </h3>
                    <span className="section-label">{p.role}</span>
                  </div>
                  <p className="text-body">{p.bio}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="pt-6 text-sm text-body">{BACKING}</p>
        </div>
      </div>
    </section>
  );
}
