import { lazy, Suspense } from "react";
import { Stethoscope, Activity, GitBranch, Bell } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import StatusBadge from "../ui/StatusBadge";
import Aurora from "../ui/Aurora";

const BaselineScene = lazy(() => import("../three/BaselineScene"));

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const SOFT = { color: "rgba(22,25,29,0.62)" };
const MUTE = { color: "rgba(22,25,29,0.40)" };

const inputs = [
  {
    icon: Activity,
    title: "Continuous sensing",
    desc: "Heart rate, HRV, SpO₂, ECG segments, respiration, sleep — sampled around the clock from the wearable.",
  },
  {
    icon: Stethoscope,
    title: "Medical history",
    desc: "Past diagnoses, lab reports, family history and medication. The model knows your baseline, not the average.",
  },
];

const outputs = [
  {
    icon: GitBranch,
    title: "Drift detection",
    desc: "We watch for deviations from your personal baseline — not population averages. Subtle drift, weeks before symptoms.",
  },
  {
    icon: Bell,
    title: "Clinician hand-off",
    desc: "An alert isn't a beep on your phone. It's a structured note your cardiologist can act on — vitals, trend, suggested next step.",
  },
];

function AboutSection() {
  return (
    <section id="what-it-does" className="relative bg-canvas py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-canvas-soft/50 to-transparent" />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="max-w-3xl"
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <StatusBadge variant="inDev" label="Twin engine — in development" />
          </div>
          <h2 className="text-display text-ink-900 tracking-tighter">
            A living model of you.<br />
            <span style={{ color: "rgba(22,25,29,0.55)" }}>Watching for drift.</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl leading-relaxed" style={SOFT}>
            Triksha is, before anything else, an intelligence. A personalized
            physiological twin that learns your baseline and tells your cardiologist
            when you're moving away from it. The wearable is just one input.
          </p>
        </motion.div>

        {/* Live signal panel */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1 }}
          className="relative mt-16 rounded-4xl glass-card overflow-hidden"
        >
          <div className="h-[280px] md:h-[360px] bg-gradient-to-b from-canvas-paper to-canvas-soft/40">
            <Suspense
              fallback={
                <div className="w-full h-full bg-gradient-to-br from-canvas-soft to-canvas-paper animate-pulse" />
              }
            >
              <BaselineScene className="w-full h-full" />
            </Suspense>
          </div>
          <div className="px-8 md:px-12 py-8 border-t border-[rgba(22,25,29,0.10)] flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="text-eyebrow uppercase" style={MUTE}>
                Personal baseline
              </div>
              <div className="mt-1 text-xl font-semibold text-ink-900">
                A signal that knows you, not the average.
              </div>
            </div>
            <div className="flex items-center gap-8 text-sm">
              <div>
                <span style={MUTE}>Resting HR</span>{" "}
                <span className="font-semibold text-ink-900">72 BPM</span>
              </div>
              <div>
                <span style={MUTE}>HRV</span>{" "}
                <span className="font-semibold text-ink-900">62 ms</span>
              </div>
              <div>
                <span style={MUTE}>SpO₂</span>{" "}
                <span className="font-semibold text-ink-900">98%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Inputs → outputs flow */}
        <div className="mt-24 grid lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-eyebrow uppercase mb-3" style={MUTE}>
              Inputs
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold text-ink-900 tracking-tight leading-snug">
              We fuse two streams of truth.
            </h3>
            <div className="mt-8 space-y-4">
              {inputs.map((it) => (
                <div
                  key={it.title}
                  className="flex items-start gap-4 p-5 rounded-2xl glass-card is-interactive"
                >
                  <div className="w-10 h-10 rounded-xl bg-canvas-soft ring-1 ring-[rgba(22,25,29,0.08)] flex items-center justify-center flex-shrink-0">
                    <it.icon className="w-5 h-5 text-ink-900" />
                  </div>
                  <div>
                    <div className="font-semibold text-ink-900">{it.title}</div>
                    <p className="mt-1 text-sm leading-relaxed" style={SOFT}>
                      {it.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="text-eyebrow uppercase mb-3" style={MUTE}>
              Outputs
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold text-ink-900 tracking-tight leading-snug">
              Two things actually leave the model.
            </h3>
            <div className="mt-8 space-y-4">
              {outputs.map((it) => (
                <div
                  key={it.title}
                  className="flex items-start gap-4 p-5 rounded-2xl glass-card is-interactive"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-50 ring-1 ring-accent-100 flex items-center justify-center flex-shrink-0">
                    <it.icon className="w-5 h-5 text-accent-700" />
                  </div>
                  <div>
                    <div className="font-semibold text-ink-900">{it.title}</div>
                    <p className="mt-1 text-sm leading-relaxed" style={SOFT}>
                      {it.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Statement */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
          className="mt-24 rounded-4xl bg-navy text-canvas p-10 md:p-16 relative overflow-hidden"
        >
          <Aurora tone="navy" />
          <div className="relative grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7">
              <div
                className="text-eyebrow uppercase font-medium mb-4"
                style={{ color: "#6FB6FF" }}
              >
                Why this is different
              </div>
              <h3 className="text-3xl md:text-4xl font-semibold tracking-tighter leading-[1.08] text-canvas">
                Other wearables tell you what's happening.<br />
                <span className="text-canvas/55">The twin tells you what's changing.</span>
              </h3>
              <p className="mt-6 leading-relaxed max-w-xl text-canvas/80">
                Most monitors compare your heart rate to a population. Triksha compares
                you to <em>yesterday's you</em>. That's where the signal is.
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="grid grid-cols-1 gap-4">
                {[
                  { k: "Pop. averages", v: "Most wearables" },
                  { k: "Personal baseline", v: "Triksha twin" },
                  { k: "Clinician-ready output", v: "Triksha" },
                ].map((stat) => (
                  <div
                    key={stat.k}
                    className="rounded-2xl bg-white/[0.06] ring-1 ring-white/10 p-5 flex items-center justify-between"
                  >
                    <div className="text-sm text-canvas/70">{stat.k}</div>
                    <div className="text-sm font-semibold text-canvas">{stat.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default AboutSection;
