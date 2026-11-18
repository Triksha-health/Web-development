import { useEffect, useRef, useState } from "react";

interface Step {
  tag: string;
  title: string;
  body: string;
  img: string;
  alt: string;
  kind: "phone" | "wide";
  well: string;
  width: number;
  height: number;
}

const STEPS: Step[] = [
  {
    tag: "01 · Senses you",
    title: "A wristband reads you every day",
    body: "Heart rate, heart-rate variability, breathing, temperature and movement — measured quietly, all day. The band is only the data layer; the intelligence is in the twin.",
    img: "/img/phone2.webp",
    alt: "Heart rate screen comparing each signal to its normal range",
    kind: "phone",
    well: "bg-canvas-soft",
    width: 560,
    height: 1177,
  },
  {
    tag: "02 · Remembers you",
    title: "Your Health Book keeps every report",
    body: "Upload lab reports and records once. Triksha reads them, organises them, and gives you one health history you can hand any doctor in a tap.",
    img: "/img/healthbook.webp",
    alt: "Health Book web app reading a lab report into structured results",
    kind: "wide",
    well: "bg-accent-100",
    width: 1000,
    height: 516,
  },
  {
    tag: "03 · Simulates you",
    title: "The twin warns you, with the evidence",
    body: "When something drifts, your twin looks for the cause and where it could lead, then tells you in plain language — and why.",
    img: "/img/phone3.webp",
    alt: "Twin Alerts screen listing detected drifts as a ranked risk feed",
    kind: "phone",
    well: "bg-navy",
    width: 560,
    height: 1177,
  },
];

const LOOP = [
  { tag: "Sense", title: "The wrist", body: "Cleans the signal on the band." },
  { tag: "Fuse", title: "The record", body: "Blends signals with your history." },
  { tag: "Learn", title: "The twin", body: "Re-learns you every day." },
  { tag: "Warn", title: "The alert", body: "Plain language, before symptoms." },
  { tag: "Hand off", title: "The doctor", body: "A one-page summary for your cardiologist." },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  // Desktop: the step crossing the middle of the screen drives the pinned stage.
  useEffect(() => {
    const els = stepRefs.current.filter((el): el is HTMLElement => !!el);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        });
      },
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="how" className="site-wrap site-section flex flex-col gap-14">
      <div className="flex max-w-[760px] flex-col gap-[18px]">
        <p className="kicker">How it works</p>
        <h2 className="h-display">
          A living twin of your health that{" "}
          <span className="text-accent-500">sees the drift coming.</span>
        </h2>
        <p className="lede">
          Fitness wearables count steps and beats. Triksha learns what normal looks like for
          you, then notices when you start moving away from it.
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-16">
        {/* Steps. Stacked cards on phones and tablets, a scrolling column on desktop. */}
        <div className="grid gap-5 md:grid-cols-2 lg:block">
          {STEPS.map((s, i) => (
            <article
              key={s.tag}
              ref={(el) => (stepRefs.current[i] = el)}
              data-step={i}
              className="flex flex-col overflow-hidden rounded-[26px] border border-line bg-canvas-paper lg:min-h-[68vh] lg:justify-center lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent"
            >
              <div
                className={`flex h-[300px] justify-center overflow-hidden px-6 lg:hidden ${s.well} ${
                  s.kind === "phone" ? "pt-8" : "items-start pt-9"
                }`}
              >
                <img
                  src={s.img}
                  alt={s.alt}
                  width={s.width}
                  height={s.height}
                  loading="lazy"
                  className={
                    s.kind === "phone"
                      ? "h-auto w-[200px] self-start"
                      : "h-auto w-full max-w-[420px] rounded-[10px] shadow-[0_16px_30px_rgba(12,37,71,0.14)]"
                  }
                />
              </div>
              <div
                className={`flex flex-col gap-2.5 px-[30px] pb-8 pt-7 transition-colors duration-300 lg:border-l-2 lg:py-2 lg:pl-8 lg:pr-0 ${
                  active === i ? "lg:border-accent-500" : "lg:border-line"
                }`}
              >
                <p className="mono-tag !tracking-[0.18em] text-accent-600">{s.tag}</p>
                <h3 className="font-display text-[26px] font-semibold leading-[1.2] lg:text-[34px] lg:leading-[1.15]">
                  {s.title}
                </h3>
                <p className="text-body lg:max-w-[30em] lg:text-lg">{s.body}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Pinned stage: stays put on desktop while the steps scroll past. */}
        <div className="hidden lg:block" aria-hidden="true">
          <div className="sticky top-24 h-[min(640px,calc(100vh-8rem))] overflow-hidden rounded-[26px] border border-line">
            {STEPS.map((s, i) => (
              <div
                key={s.tag}
                className={`stage-layer absolute inset-0 flex justify-center px-10 ${s.well} ${
                  s.kind === "phone" ? "items-start pt-12" : "items-center"
                } ${active === i ? "is-active" : ""}`}
              >
                <img
                  src={s.img}
                  alt=""
                  width={s.width}
                  height={s.height}
                  loading="lazy"
                  className={
                    s.kind === "phone"
                      ? "h-auto w-[300px] drop-shadow-[0_30px_40px_rgba(12,37,71,0.25)]"
                      : "h-auto w-full max-w-[520px] rounded-[12px] shadow-[0_24px_44px_rgba(12,37,71,0.18)]"
                  }
                />
              </div>
            ))}
            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
              {STEPS.map((s, i) => (
                <span
                  key={s.tag}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === i ? "w-7 bg-accent-500" : "w-1.5 bg-ink-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* The loop */}
      <ol className="grid gap-6 rounded-[26px] border border-line bg-canvas-paper p-[clamp(24px,3vw,40px)] sm:grid-cols-2 lg:grid-cols-5">
        {LOOP.map((l) => (
          <li key={l.tag} className="flex flex-col gap-1.5">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-600">
              {l.tag}
            </span>
            <strong className="font-display text-xl font-semibold">{l.title}</strong>
            <span className="text-[15px] text-body">{l.body}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
