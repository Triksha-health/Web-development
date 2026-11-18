import type { CSSProperties } from "react";
import PhotoSlot from "./PhotoSlot";

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
      <div className="site-wrap flex flex-col gap-14 lg:gap-20">
        <div className="grid items-center gap-x-16 gap-y-10 lg:grid-cols-2">
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
          </div>

          <PhotoSlot
            description="the Triksha team working on the wristband sensor"
            alt="The Triksha team at a lab bench, working on the wristband sensor."
            className="aspect-[4/3] lg:aspect-[5/4]"
          />
        </div>

        <div>
          <ul className="flex flex-col border-t border-line">
            {PEOPLE.map((p) => (
              <li
                key={p.name}
                className="flex flex-wrap items-start gap-x-8 gap-y-4 border-b border-line py-7"
              >
                <img
                  src={p.img}
                  alt={p.name}
                  width={192}
                  height={224}
                  loading="lazy"
                  className="h-28 w-24 flex-none rounded-2xl object-cover"
                />
                <div className="flex flex-[1_1_220px] flex-col gap-1">
                  <span className="section-label">{p.role}</span>
                  <h3 className="font-display text-2xl font-medium">{p.name}</h3>
                </div>
                <p className="flex-[2_1_320px] text-body">{p.bio}</p>
              </li>
            ))}
          </ul>
          <p className="pt-6 text-sm text-body">{BACKING}</p>
        </div>
      </div>
    </section>
  );
}
