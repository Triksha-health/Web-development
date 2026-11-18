import { motion } from "framer-motion";
import { Heart, AlertCircle, Activity, BookOpen, Smartphone } from "lucide-react";
import Container from "../ui/Container";
import StatusBadge from "../ui/StatusBadge";
import TiltCard from "../ui/TiltCard";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const SOFT = { color: "rgba(22,25,29,0.62)" };
const MUTE = { color: "rgba(22,25,29,0.40)" };

/* ──────────────────────────────────────────────────────────────
   App-screen mockups, hand-built in React. No image dependency.
   All labeled as in-development.
   ─────────────────────────────────────────────────────────── */

function Phone({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="relative">
      <div className="relative mx-auto w-[260px] rounded-[2.2rem] bg-navy p-2 shadow-soft-xl">
        {/* notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-navy rounded-b-2xl z-10" />
        <div className="relative rounded-[1.8rem] overflow-hidden bg-canvas-paper aspect-[9/19] flex flex-col">
          {children}
        </div>
      </div>
      <div className="mt-4 text-center text-sm font-medium text-ink-900">{label}</div>
    </div>
  );
}

function DashboardScreen() {
  return (
    <>
      <div className="pt-8 px-4 pb-2">
        <div className="text-[10px] uppercase tracking-wider" style={MUTE}>
          Today
        </div>
        <div className="text-base font-semibold text-ink-900 mt-1">Good morning, Anil</div>
      </div>

      <div className="px-3">
        <div className="rounded-2xl bg-accent-500 text-white p-3.5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] opacity-80">Risk score</div>
              <div className="text-2xl font-semibold tracking-tighter">Low</div>
            </div>
            <Heart className="w-5 h-5" />
          </div>
          <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full w-[18%] bg-white rounded-full" />
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            { k: "Resting HR", v: "72", u: "BPM" },
            { k: "HRV", v: "62", u: "ms" },
            { k: "SpO₂", v: "98", u: "%" },
            { k: "Sleep", v: "7h 12", u: "min" },
          ].map((m) => (
            <div key={m.k} className="rounded-xl bg-canvas-soft p-2.5">
              <div className="text-[9px] uppercase tracking-wider" style={MUTE}>
                {m.k}
              </div>
              <div className="mt-0.5 text-lg font-semibold text-ink-900 tabular-nums">
                {m.v}
                <span className="text-[10px] font-normal ml-0.5" style={SOFT}>{m.u}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-xl bg-canvas-soft p-3">
          <div className="text-[9px] uppercase tracking-wider" style={MUTE}>
            7-day trend
          </div>
          <svg viewBox="0 0 200 40" className="mt-1.5 w-full h-9">
            <path
              d="M0,28 L30,25 L60,29 L90,21 L120,23 L150,18 L180,20 L200,16"
              fill="none"
              stroke="#0571D3"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

function HeartRateScreen() {
  return (
    <>
      <div className="pt-8 px-4 pb-3">
        <div className="text-[10px] uppercase tracking-wider" style={MUTE}>
          Heart rate
        </div>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-4xl font-semibold text-ink-900 tabular-nums tracking-tighter">72</span>
          <span className="text-xs" style={SOFT}>BPM</span>
        </div>
        <div className="text-[10px] mt-0.5" style={SOFT}>
          Within your baseline window (64–84)
        </div>
      </div>

      <div className="flex-1 px-3 pb-4">
        <div className="rounded-2xl bg-canvas-soft p-3 h-full flex flex-col">
          <div className="text-[9px] uppercase tracking-wider mb-2" style={MUTE}>
            Last 24h
          </div>
          <svg viewBox="0 0 200 120" className="flex-1 w-full">
            <defs>
              <linearGradient id="hrFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#0571D3" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#0571D3" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,80 L20,72 L40,86 L60,68 L80,70 L100,55 L120,58 L140,72 L160,65 L180,78 L200,70 L200,120 L0,120 Z"
              fill="url(#hrFill)"
            />
            <path
              d="M0,80 L20,72 L40,86 L60,68 L80,70 L100,55 L120,58 L140,72 L160,65 L180,78 L200,70"
              fill="none"
              stroke="#0571D3"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex justify-between text-[9px] mt-2" style={MUTE}>
            <span>00:00</span>
            <span>12:00</span>
            <span>24:00</span>
          </div>
        </div>
      </div>
    </>
  );
}

function AlertsScreen() {
  return (
    <>
      <div className="pt-8 px-4 pb-2">
        <div className="text-[10px] uppercase tracking-wider" style={MUTE}>
          Twin alerts
        </div>
        <div className="text-base font-semibold text-ink-900 mt-1">2 active</div>
      </div>

      <div className="flex-1 px-3 space-y-2 overflow-hidden">
        <div className="rounded-2xl p-3" style={{ background: "rgba(5,113,211,0.08)", boxShadow: "inset 0 0 0 1px rgba(5,113,211,0.20)" }}>
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 text-accent-700" />
            <div className="flex-1">
              <div className="text-[12px] font-semibold text-ink-900">HRV trending down</div>
              <p className="text-[10px] mt-0.5 leading-snug" style={SOFT}>
                3-day decline vs your baseline. Consider reviewing sleep and stress.
              </p>
              <button className="mt-1.5 text-[10px] font-medium text-accent-700">
                Share with cardiologist →
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-3 bg-canvas-soft">
          <div className="flex items-start gap-2">
            <Activity className="w-4 h-4 mt-0.5 text-ink-700" />
            <div className="flex-1">
              <div className="text-[12px] font-semibold text-ink-900">Resting HR elevated</div>
              <p className="text-[10px] mt-0.5 leading-snug" style={SOFT}>
                +6 BPM from your 14-day average. Possibly sleep-related.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-3 bg-canvas-soft opacity-70">
          <div className="flex items-start gap-2">
            <Activity className="w-4 h-4 mt-0.5 text-ink-400" />
            <div className="flex-1">
              <div className="text-[12px] font-medium text-ink-700">Sleep variance normal</div>
              <p className="text-[10px] mt-0.5 leading-snug" style={MUTE}>
                Resolved 2 days ago.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function HealthBookScreen() {
  return (
    <>
      <div className="pt-8 px-4 pb-2">
        <div className="text-[10px] uppercase tracking-wider" style={MUTE}>
          Health Book
        </div>
        <div className="text-base font-semibold text-ink-900 mt-1">Anil Sharma</div>
      </div>

      <div className="px-3 space-y-2">
        <div className="rounded-2xl bg-canvas-soft p-3">
          <div className="text-[9px] uppercase tracking-wider" style={MUTE}>Diagnoses</div>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {["Hypertension", "Pre-diabetic"].map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 rounded-full bg-canvas-paper text-ink-900 ring-1 ring-[rgba(22,25,29,0.10)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-canvas-soft p-3">
          <div className="text-[9px] uppercase tracking-wider" style={MUTE}>Family</div>
          <div className="mt-1 text-[11px] text-ink-900">
            Father — MI at 58
            <br />
            Mother — T2D
          </div>
        </div>

        <div className="rounded-2xl bg-canvas-soft p-3">
          <div className="text-[9px] uppercase tracking-wider" style={MUTE}>Recent labs</div>
          <div className="mt-1.5 space-y-1">
            {[
              { k: "LDL", v: "142" },
              { k: "HbA1c", v: "6.2%" },
              { k: "BP avg", v: "138/86" },
            ].map((r) => (
              <div key={r.k} className="flex justify-between text-[11px]">
                <span style={SOFT}>{r.k}</span>
                <span className="font-semibold text-ink-900 tabular-nums">{r.v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-accent-50 ring-1 ring-accent-100 p-2.5 flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-accent-700" />
          <div className="text-[10px] text-accent-700 font-medium">
            Shareable with your doctor
          </div>
        </div>
      </div>
    </>
  );
}

const modules = [
  {
    label: "Dashboard",
    Screen: DashboardScreen,
    eyebrow: "At a glance",
    title: "Your whole picture, in one read.",
    body: "Risk score, resting HR, HRV, SpO₂ and sleep — synthesised into a single daily read, not a wall of numbers you have to interpret.",
  },
  {
    label: "Heart Rate",
    Screen: HeartRateScreen,
    eyebrow: "Continuous sensing",
    title: "Measured against your baseline — not a population.",
    body: "Every beat is compared to your own normal window, so the app flags what's abnormal for you rather than a generic average.",
  },
  {
    label: "Twin Alerts",
    Screen: AlertsScreen,
    eyebrow: "Drift detection",
    title: "Caught while it's still a trend.",
    body: "When your signals drift over days, the twin surfaces it early — and prepares a clean summary you can share with your cardiologist.",
  },
  {
    label: "Health Book",
    Screen: HealthBookScreen,
    eyebrow: "Your history, fused in",
    title: "Context the wearable alone can't see.",
    body: "Diagnoses, family history and labs sit alongside your live signals — and travel with you to every appointment.",
  },
];

function Module({
  index,
  eyebrow,
  title,
  body,
  label,
  Screen,
}: {
  index: number;
  eyebrow: string;
  title: string;
  body: string;
  label: string;
  Screen: () => JSX.Element;
}) {
  const reverse = index % 2 === 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
    >
      <div className={`flex justify-center ${reverse ? "lg:order-2" : ""}`}>
        <TiltCard intensity={7} className="rounded-[2.2rem]">
          <Phone label={label}>
            <Screen />
          </Phone>
        </TiltCard>
      </div>
      <div className={reverse ? "lg:order-1" : ""}>
        <div className="mb-3 text-sm font-medium text-accent-600">{eyebrow}</div>
        <h3 className="text-2xl md:text-3xl font-semibold text-ink-900 tracking-tighter leading-[1.15]">
          {title}
        </h3>
        <p className="mt-5 text-lg leading-relaxed max-w-md" style={SOFT}>
          {body}
        </p>
      </div>
    </motion.div>
  );
}

function ProductPreviewSection() {
  return (
    <section id="preview" className="relative bg-canvas-soft py-32 overflow-hidden">
      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="max-w-3xl"
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="eyebrow">Product preview</span>
            <StatusBadge variant="inDev" label="Preview — in development" />
          </div>
          <h2 className="text-display text-ink-900 tracking-tighter">
            What you'll actually use.
          </h2>
          <p className="mt-6 text-lg md:text-xl leading-relaxed" style={SOFT}>
            Real screens from the working build. Clean reads, clinician-ready exports,
            and a Health Book that travels with you.
          </p>
        </motion.div>

        <div className="mt-20 space-y-24 lg:space-y-32">
          {modules.map((m, i) => (
            <Module key={m.label} index={i} {...m} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24 flex items-center justify-center gap-2 text-sm"
          style={SOFT}
        >
          <Smartphone className="w-4 h-4" />
          Available first on iOS and Android. Built mobile-first.
        </motion.div>
      </Container>
    </section>
  );
}

export default ProductPreviewSection;
