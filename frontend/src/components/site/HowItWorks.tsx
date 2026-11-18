import { useEffect, useRef, useState, type CSSProperties } from "react";

interface Step {
  tag: string;
  title: string;
  body: string;
  img: string;
  /**
   * Optional screen recording shown in place of the still, inside the same
   * frame. The still stays as its poster, and is what visitors who ask for
   * reduced motion see. Put the file in public/video and set the path here.
   */
  video?: string;
  alt: string;
  kind: "phone" | "wide";
  width: number;
  height: number;
}

const STEPS: Step[] = [
  {
    tag: "1. Senses you",
    title: "A wristband reads you every day",
    body: "Heart rate, heart-rate variability, breathing, temperature and movement, measured quietly, all day. The band is only the data layer; the intelligence is in the twin.",
    img: "/img/app-heart-rate.webp",
    // video: "/video/app-heart-rate.mp4",
    alt: "Triksha app heart rate screen showing the current reading against the last 14 days",
    kind: "phone",
    width: 560,
    height: 1172,
  },
  {
    tag: "2. Remembers you",
    title: "Your Health Book keeps every report",
    body: "Upload lab reports and records once. Triksha reads them, organises them, and gives you one health history you can hand any doctor in a tap.",
    img: "/img/healthbook.webp",
    alt: "Health Book web app showing a lab analysis snapshot with results and a summary",
    kind: "wide",
    width: 1200,
    height: 542,
  },
  {
    tag: "3. Simulates you",
    title: "The twin warns you, with the evidence",
    body: "When something drifts, your twin looks for the cause and where it could lead, then tells you in plain language, and why.",
    img: "/img/app-alerts.webp",
    alt: "Triksha app Twin Alerts screen listing detected drifts in order of risk",
    kind: "phone",
    width: 560,
    height: 1172,
  },
];

interface StepMediaProps {
  step: Step;
  className: string;
  /** Decorative copies (the pinned desktop stage) carry no alt text. */
  decorative?: boolean;
  /** False while this step is not the one on show; its video then waits. */
  active?: boolean;
}

/**
 * A step's screen: the still image, or a muted looping video when the step
 * has one. The video only plays while it is on screen, and is never used when
 * the visitor has asked for reduced motion.
 */
function StepMedia({ step, className, decorative = false, active = true }: StepMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const onScreen = useRef(false);
  // Starts false so the prerendered HTML and the first render both show the still.
  const [useVideo, setUseVideo] = useState(false);

  useEffect(() => {
    if (!step.video) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setUseVideo(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [step.video]);

  useEffect(() => {
    const el = videoRef.current;
    if (!useVideo || !el) return;
    const sync = () => {
      if (onScreen.current && active) el.play().catch(() => {});
      else el.pause();
    };
    const obs = new IntersectionObserver(
      ([entry]) => {
        onScreen.current = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    sync();
    return () => {
      obs.disconnect();
      el.pause();
    };
  }, [useVideo, active]);

  if (useVideo && step.video) {
    return (
      <video
        ref={videoRef}
        src={step.video}
        poster={step.img}
        muted
        loop
        playsInline
        preload="none"
        width={step.width}
        height={step.height}
        aria-label={decorative ? undefined : step.alt}
        aria-hidden={decorative || undefined}
        className={`${className} rounded-2xl object-cover`}
      />
    );
  }
  return (
    <img
      src={step.img}
      alt={decorative ? "" : step.alt}
      width={step.width}
      height={step.height}
      loading="lazy"
      className={className}
    />
  );
}

export default function HowItWorks() {
  // `prev` is the screen being replaced; it stays visible under the new one.
  const [{ active, prev }, setStage] = useState({ active: 0, prev: 0 });
  const setActive = (next: number) =>
    setStage((s) => (s.active === next ? s : { active: next, prev: s.active }));
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
    <section id="how" className="sec">
      <div className="site-wrap flex flex-col gap-14">
        <div className="flex max-w-[860px] flex-col gap-[18px]" data-reveal>
          <h2 className="h-display">How Triksha works</h2>
          <p className="lede">
            Fitness wearables count steps and beats. Triksha learns what normal looks like for
            you, then notices when you start moving away from it.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Steps. Stacked cards on phones and tablets, a scrolling column on desktop. */}
          <div className="relative grid gap-5 md:grid-cols-2 lg:block">
            {/* fills as the three steps scroll past (desktop, where supported) */}
            <span className="steps-rail" aria-hidden="true" />
            {STEPS.map((s, i) => (
              <article
                key={s.tag}
                ref={(el) => (stepRefs.current[i] = el)}
                data-step={i}
                data-reveal
                className="flex flex-col overflow-hidden rounded-2xl border border-line bg-canvas-paper lg:min-h-[68vh] lg:justify-center lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent"
              >
                <div
                  className={`flex h-[300px] justify-center overflow-hidden bg-canvas-soft px-6 lg:hidden ${
                    s.kind === "phone" ? "pt-8" : "items-start pt-9"
                  }`}
                >
                  <StepMedia
                    step={s}
                    className={
                      s.kind === "phone"
                        ? "h-auto w-[200px] self-start"
                        : "h-auto w-full max-w-[420px] rounded-2xl"
                    }
                  />
                </div>
                <div
                  className={`flex flex-col gap-2.5 px-[30px] pb-8 pt-7 transition-colors duration-300 lg:border-l-2 lg:py-2 lg:pl-8 lg:pr-0 ${
                    active === i ? "lg:border-accent-500" : "lg:border-line"
                  }`}
                >
                  <p className="section-label">{s.tag}</p>
                  <h3 className="font-display text-[26px] font-medium leading-[1.2] lg:text-[34px] lg:leading-[1.15]">
                    {s.title}
                  </h3>
                  <p className="text-body lg:max-w-[30em] lg:text-lg">{s.body}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Pinned stage: stays put on desktop while the steps scroll past. */}
          <div className="hidden lg:block" aria-hidden="true">
            <div className="sticky top-24 h-[min(640px,calc(100vh-8rem))] overflow-hidden rounded-2xl border border-line">
              {STEPS.map((s, i) => (
                <div
                  key={s.tag}
                  // each screen settles at a slightly different angle
                  style={{ "--ry": `${(i - 1) * 6}deg` } as CSSProperties}
                  className={`stage-layer absolute inset-0 flex justify-center bg-canvas-soft px-10 ${
                    s.kind === "phone" ? "items-start pt-12" : "items-center"
                  } ${active === i ? "is-active" : prev === i ? "is-prev" : ""}`}
                >
                  <StepMedia
                    step={s}
                    decorative
                    active={active === i}
                    className={
                      s.kind === "phone"
                        ? "h-auto w-[300px] drop-shadow-[0_30px_40px_rgba(12,37,71,0.25)]"
                        : "h-auto w-full max-w-[520px] rounded-2xl shadow-[0_24px_44px_rgba(12,37,71,0.18)]"
                    }
                  />
                </div>
              ))}
              <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
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
      </div>
    </section>
  );
}
