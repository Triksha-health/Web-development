import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Radio, Layers, Brain, BellRing, UserCog } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Container from "../ui/Container";
import { fadeUp, viewportOnce, prefersReducedMotion } from "../../lib/motion";

const SOFT = { color: "rgba(22,25,29,0.62)" };
const MUTE = { color: "rgba(22,25,29,0.40)" };

interface Step {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const steps: Step[] = [
  { icon: Radio, title: "Sense", desc: "A medical-grade wearable continuously captures cardiac and respiratory signals." },
  { icon: Layers, title: "Fuse", desc: "Sensor streams merge with your medical history, labs and family signals." },
  { icon: Brain, title: "Twin", desc: "A personalized model builds — and continually updates — your physiological baseline." },
  { icon: BellRing, title: "Warn", desc: "Drift from your baseline triggers early, ranked alerts — not noise." },
  { icon: UserCog, title: "Hand off", desc: "Findings reach your cardiologist as a clinician-ready note." },
];

function Header() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="max-w-2xl"
    >
      <div className="eyebrow mb-4">How it works</div>
      <h2 className="text-display text-ink-900 tracking-tighter">
        From a heartbeat to a hand-off.
      </h2>
      <p className="mt-5 text-lg md:text-xl leading-relaxed" style={SOFT}>
        The full path a signal takes from your wrist to your doctor — five quiet steps.
      </p>
    </motion.div>
  );
}

/* Static fallback — reduced-motion and small screens get a clean grid. */
function StaticSteps() {
  return (
    <section id="how" className="relative bg-canvas py-24 md:py-32">
      <Container>
        <Header />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <div key={s.title} className="glass-card p-6">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 grid place-items-center shadow-soft">
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <div className="mt-4 font-mono text-[11px] tracking-wider" style={MUTE}>
                STEP 0{i + 1}
              </div>
              <h3 className="mt-1 text-lg font-semibold text-ink-900 tracking-tight">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed" style={SOFT}>{s.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function UseCaseSection() {
  const reduce = prefersReducedMotion();
  const [compact] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.max(0, Math.min(steps.length - 1, Math.floor(v * steps.length)));
    setActive(i);
  });

  if (reduce || compact) return <StaticSteps />;

  const ActiveIcon = steps[active].icon;

  return (
    <section id="how" ref={ref} className="relative bg-canvas" style={{ height: `${steps.length * 62}vh` }}>
      <div className="sticky top-0 min-h-screen flex flex-col justify-center py-20 overflow-hidden">
        <Container>
          <Header />

          <div className="mt-12 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left — step rail */}
            <ol className="relative pl-6">
              {/* progress rail */}
              <span className="absolute left-0 top-1 bottom-1 w-px bg-[rgba(22,25,29,0.12)]" />
              <motion.span
                className="absolute left-0 top-1 w-px bg-accent-500 origin-top"
                style={{ height: "calc(100% - 0.5rem)", scaleY: scrollYProgress }}
              />
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className="flex items-center gap-4 py-3.5 transition-all duration-300"
                  style={{ opacity: i === active ? 1 : 0.4 }}
                >
                  <span
                    className="font-mono text-sm tabular-nums w-7"
                    style={{ color: i === active ? "#0571d3" : "rgba(22,25,29,0.40)" }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className={`text-xl md:text-2xl font-semibold tracking-tight ${
                      i === active ? "text-ink-900" : "text-ink-500"
                    }`}
                  >
                    {s.title}
                  </span>
                </li>
              ))}
            </ol>

            {/* Right — active step panel */}
            <div className="glass-card p-8 md:p-10 min-h-[300px] flex flex-col justify-center">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 grid place-items-center shadow-soft">
                    <ActiveIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-mono text-sm tabular-nums" style={MUTE}>
                    0{active + 1} / 0{steps.length}
                  </div>
                </div>
                <h3 className="mt-6 text-3xl font-semibold text-ink-900 tracking-tight">
                  {steps[active].title}
                </h3>
                <p className="mt-3 text-lg leading-relaxed max-w-md" style={SOFT}>
                  {steps[active].desc}
                </p>
              </motion.div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
