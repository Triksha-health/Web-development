import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import HeroTwin from "./HeroTwin";

/** Position in the hero's load-in sequence. */
const step = (i: number) => ({ "--i": i }) as CSSProperties;

export default function Hero() {
  return (
    // -mt/pt: the dark stage runs up underneath the (transparent) nav.
    <section id="top" className="hero-dark -mt-24 pt-24">
      <div className="site-wrap relative grid items-center gap-x-8 gap-y-6 pb-14 pt-8 lg:min-h-[min(780px,calc(100svh-96px))] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:py-14">
        <div className="relative z-10 flex flex-col gap-6 lg:gap-7">
          <p className="hero-in kicker flex items-center gap-3 !text-accent-300" style={step(0)}>
            <span aria-hidden="true" className="inline-block h-px w-7 flex-none bg-accent-300" />
            They whisper before they shout
          </p>
          {/* Sized so each half sits on one line from 1024px up, which keeps
              the waitlist button on screen on a typical laptop. */}
          <h1 className="text-hero font-display !text-cream lg:text-[clamp(48px,5.5vw,88px)]">
            <span className="hero-in block [text-wrap:balance] lg:whitespace-nowrap" style={step(1)}>
              Know your heart’s risk
            </span>{" "}
            <span
              className="hero-in block text-accent-300 [text-wrap:balance] lg:whitespace-nowrap"
              style={step(2)}
            >
              before symptoms do.
            </span>
          </h1>
          <p
            className="hero-in max-w-[31em] text-[clamp(17px,1.45vw,20px)] text-navy-100 [text-wrap:pretty]"
            style={step(3)}
          >
            Triksha is a personal digital twin for your heart health. A wristband senses your
            body every day, your Health Book remembers every report, and the twin warns you,
            and the people you choose, when something starts to drift.
          </p>
          <div className="hero-in flex flex-wrap items-center gap-3.5" style={step(4)}>
            <Link to="/#waitlist" className="cta cta-blue" data-magnetic>
              Join the waitlist
              <span className="cta-arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <Link to="/#how" className="cta cta-outline">
              See how it works
            </Link>
          </div>
          <p className="hero-in flex items-start gap-2.5 text-sm text-navy-200" style={step(5)}>
            <span
              aria-hidden="true"
              className="mt-[7px] h-2 w-2 flex-none rounded-full bg-status-dot"
            />
            In development · first hospital pilot being planned · not yet a certified medical
            device
          </p>
        </div>

        {/* The twin. On large screens it bleeds left, behind the end of the headline. */}
        <div className="relative h-[580px] lg:h-full lg:min-h-[540px]">
          <div className="absolute inset-y-0 -left-[8%] -right-[8%] lg:-left-[34%] lg:-right-[14%]">
            <HeroTwin />
          </div>

          <div className="absolute left-0 right-0 top-1 flex flex-col items-center gap-1 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.14em] lg:left-auto lg:right-0 lg:top-2 lg:items-end">
            <span className="text-navy-200">Digital twin · Illustration</span>
            <span className="relative flex justify-center lg:justify-end">
              <span className="sig-calm text-[#7fd6a0]">Within your normal</span>
              <span className="sig-drift absolute inset-x-0 top-0 text-center text-[#ffb866] lg:text-right">
                Drifting
              </span>
            </span>
          </div>

          <div className="drift-card absolute bottom-0 left-0 flex w-[min(320px,94%)] flex-col gap-2.5 rounded-[18px] border border-line bg-canvas-paper px-5 py-[18px] text-ink-900 shadow-[0_24px_60px_rgba(0,0,0,0.45)] lg:left-auto lg:right-0">
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
              <span className="rounded-full bg-accent-100 px-2.5 py-[5px] text-xs font-semibold text-accent-700">
                Report ready for your cardiologist
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
