import { useState, lazy, Suspense } from "react";
import { ArrowDown, Play, X, ArrowRight, HeartPulse, Cpu, Gauge } from "lucide-react";
import { motion } from "framer-motion";
import { HashLink } from "react-router-hash-link";
import introvideo from "../../public/introvideo.mp4";
import StatusBadge from "../ui/StatusBadge";
import Aurora from "../ui/Aurora";
import MagneticButton from "../ui/MagneticButton";
import { fadeUp, stagger } from "../../lib/motion";

const DigitalTwinScene = lazy(() => import("../three/DigitalTwinScene"));

const SOFT = { color: "rgba(22,25,29,0.62)" };

function Hero() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center pt-28 lg:pt-24 bg-canvas">
      <Aurora />

      {showVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 backdrop-blur-md"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative bg-navy rounded-3xl shadow-soft-xl max-w-5xl w-[92%]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-canvas-paper text-ink-900 flex items-center justify-center shadow-soft"
              onClick={() => setShowVideo(false)}
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <video src={introvideo} controls autoPlay className="w-full rounded-3xl" />
          </div>
        </div>
      )}

      <div className="container relative z-10 pb-16 lg:pb-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-10 lg:gap-6 items-center"
        >
          {/* Copy */}
          <div className="lg:col-span-6 xl:col-span-5">
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              <StatusBadge variant="mvp" />
              <StatusBadge variant="pilot" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-7 text-hero text-ink-900"
            >
              Predict cardiac risk,
              <br />
              <span className="text-ink-400">before symptoms.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg md:text-xl leading-relaxed max-w-xl"
              style={SOFT}
            >
              A personalized physiological model for the 300&nbsp;million Indians at
              silent cardiac risk.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton strength={0.4}>
                <HashLink
                  smooth
                  to="/#waitlist"
                  className="sheen group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent-500 text-white text-[15px] font-medium hover:bg-accent-600 transition active:scale-[0.98] shadow-soft"
                >
                  Join the waitlist
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </HashLink>
              </MagneticButton>
              <button
                onClick={() => setShowVideo(true)}
                className="group inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-canvas-paper ring-1 ring-[rgba(22,25,29,0.14)] text-ink-900 text-[15px] font-medium shadow-soft hover:shadow-soft-lg transition"
              >
                <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-accent-500 text-white">
                  <Play className="w-3 h-3 ml-0.5" fill="currentColor" />
                </span>
                Watch the film
              </button>
            </motion.div>

          </div>

          {/* 3D scene */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-6 xl:col-span-7 relative"
          >
            <div className="relative aspect-square max-w-[640px] mx-auto">
              <Suspense
                fallback={
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="w-24 h-24 rounded-full bg-accent-100/70 animate-pulse" />
                  </div>
                }
              >
                <DigitalTwinScene className="absolute inset-0" />
              </Suspense>

              {/* Cardiac risk — continuous 30-day deterioration model */}
              <motion.div
                initial={{ opacity: 0, y: 14, x: 14 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="absolute top-[2%] -left-3 sm:-left-5 z-20 w-[12.5rem] rounded-2xl bg-canvas-paper/85 backdrop-blur-xl ring-1 ring-[rgba(22,25,29,0.08)] shadow-soft-xl p-2.5"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-accent-50 ring-1 ring-accent-100 grid place-items-center">
                      <HeartPulse className="w-3.5 h-3.5 text-accent-700" />
                    </span>
                    <span className="text-[10.5px] font-semibold uppercase tracking-wider text-accent-700">
                      Cardiac risk
                    </span>
                    <span className="relative flex h-1.5 w-1.5" title="Live">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-accent-500 opacity-70 animate-ping" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-500" />
                    </span>
                  </div>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(16,185,129,0.12)", color: "#059669", boxShadow: "inset 0 0 0 1px rgba(16,185,129,0.30)" }}
                  >
                    Stable
                  </span>
                </div>

                {/* Primary metric */}
                <div className="mt-2.5 flex items-end gap-2">
                  <span className="text-xl font-semibold text-ink-900 tracking-tight font-mono tabular-nums leading-none">6.2%</span>
                  <div className="pb-0.5">
                    <div className="text-[10.5px] leading-tight" style={SOFT}>30-day deterioration risk</div>
                    <div className="text-[10px] leading-tight" style={{ color: "rgba(22,25,29,0.40)" }}>
                      ± 1.4% <span className="ml-0.5">(90% CI 4.8–7.6%)</span>
                    </div>
                  </div>
                </div>

                {/* Delta chip */}
                <div
                  className="mt-2 inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                  style={{ background: "rgba(225,29,72,0.08)", color: "#e11d48" }}
                >
                  ▲ +0.4% <span style={{ color: "rgba(22,25,29,0.45)" }}>vs last week</span>
                </div>

                {/* Risk trajectory + 30-day forecast */}
                <svg viewBox="0 0 240 64" className="mt-2.5 w-full h-12">
                  <defs>
                    <linearGradient id="riskFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#0571D3" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#0571D3" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* forecast cone */}
                  <path d="M168,40 L240,26 L240,52 Z" fill="rgba(5,113,211,0.10)" />
                  {/* historical area */}
                  <path d="M0,50 L24,48 L48,51 L72,46 L96,47 L120,43 L144,44 L168,40 L168,64 L0,64 Z" fill="url(#riskFill)" />
                  {/* historical line */}
                  <path d="M0,50 L24,48 L48,51 L72,46 L96,47 L120,43 L144,44 L168,40" fill="none" stroke="#0571D3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  {/* dashed forecast */}
                  <path d="M168,40 L204,37 L240,31" fill="none" stroke="#0571D3" strokeWidth="1.75" strokeLinecap="round" strokeDasharray="3 4" opacity="0.85" />
                  {/* current point */}
                  <circle cx="168" cy="40" r="4" fill="#FBF7EC" stroke="#0571D3" strokeWidth="2" />
                </svg>
                <div className="-mt-1 flex justify-between text-[9px]" style={{ color: "rgba(22,25,29,0.40)" }}>
                  <span>90-day trajectory</span>
                  <span>30-day forecast</span>
                </div>

                {/* Driver contributions — signed (SHAP-style) */}
                <div className="mt-3 space-y-1.5">
                  {[
                    { k: "HRV (SDNN)", arrow: "↓", mag: 80, risk: true },
                    { k: "Nocturnal HR dip", arrow: "↓", mag: 62, risk: true },
                    { k: "BP variability", arrow: "↑", mag: 50, risk: true },
                    { k: "VO₂max trend", arrow: "—", mag: 22, risk: false },
                  ].map((d) => (
                    <div key={d.k} className="flex items-center gap-2">
                      <span className="w-[5.6rem] text-[10px] truncate" style={SOFT}>{d.k}</span>
                      <span className="w-3 text-center text-[11px] font-semibold leading-none" style={{ color: d.risk ? "#e11d48" : "#059669" }}>
                        {d.arrow}
                      </span>
                      <span className="flex-1 h-1.5 rounded-full bg-canvas-soft overflow-hidden">
                        <span className="block h-full rounded-full" style={{ width: `${d.mag}%`, background: d.risk ? "#fb7185" : "#34d399" }} />
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-3 text-[10px] font-medium text-ink-900">
                  Top driver: HRV (SDNN) ↓ · contribution 0.34
                </div>
                <div className="mt-0.5 text-[9.5px]" style={{ color: "rgba(22,25,29,0.40)" }}>
                  Personalized · 142 days of data · updated 2m ago
                </div>
              </motion.div>

              {/* Twin personalization — how much the model is fit to this person */}
              <motion.div
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="absolute top-[38%] -right-2 sm:right-[1%] z-10 -translate-y-1/2 w-[12rem] rounded-2xl bg-canvas-paper/85 backdrop-blur-xl ring-1 ring-[rgba(22,25,29,0.08)] shadow-soft-xl p-3 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <span className="relative w-10 h-10 grid place-items-center flex-shrink-0">
                    <svg viewBox="0 0 36 36" className="w-10 h-10 -rotate-90">
                      <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(5,113,211,0.15)" strokeWidth="3.5" />
                      <circle cx="18" cy="18" r="15" fill="none" stroke="#0571D3" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="94.2" strokeDashoffset="12.2" />
                    </svg>
                    <span className="absolute text-[11px] font-semibold text-ink-900 font-mono tabular-nums">87%</span>
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Cpu className="w-3 h-3 text-accent-700" />
                      <span className="text-[10.5px] font-semibold uppercase tracking-wider text-accent-700">Twin fit</span>
                    </div>
                    <div className="text-[13px] font-semibold text-ink-900 mt-0.5 leading-tight">Personalized to you</div>
                    <div className="text-[11px]" style={SOFT}>142 days of your data</div>
                  </div>
                </div>
              </motion.div>

              {/* Heart age — floats over the lower-left body, balancing TWIN FIT */}
              <motion.div
                initial={{ opacity: 0, y: 14, x: 14 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 1.7, duration: 0.8 }}
                className="absolute top-[64%] -left-3 sm:-left-5 z-10 w-[12rem] rounded-2xl bg-canvas-paper/85 backdrop-blur-xl ring-1 ring-[rgba(22,25,29,0.08)] shadow-soft-xl p-3"
              >
                <div className="flex items-center gap-2">
                  <Gauge className="w-3.5 h-3.5 text-accent-700" />
                  <span className="text-[10.5px] font-medium uppercase tracking-wider" style={SOFT}>Heart age</span>
                </div>
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="text-xl font-semibold text-ink-900 tracking-tight font-mono tabular-nums">49</span>
                  <span className="text-[11px]" style={SOFT}>yrs</span>
                  <span className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent-50 text-accent-700 ring-1 ring-accent-100">
                    3 yrs younger
                  </span>
                </div>
                <div className="mt-2 text-[11px]" style={SOFT}>
                  vs 52 chronological · estimated by your twin
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span
            className="text-[11px] uppercase tracking-widest"
            style={{ color: "rgba(22,25,29,0.40)" }}
          >
            Scroll
          </span>
          <ArrowDown
            className="w-4 h-4 scroll-cue"
            style={{ color: "rgba(22,25,29,0.40)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
