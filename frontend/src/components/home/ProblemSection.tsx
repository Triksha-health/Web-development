import { motion } from "framer-motion";
import Container from "../ui/Container";
import CountUp from "../util/CountUp";
import Aurora from "../ui/Aurora";
import { fadeUp } from "../../lib/motion";

const SOFT = { color: "rgba(22,25,29,0.62)" };

interface Stat {
  count?: { value: number; prefix?: string; suffix?: string };
  k?: string;
  label: string;
  note: string;
}

function ProblemSection() {
  return (
    <section
      id="problem"
      className="relative bg-canvas-soft py-32 overflow-hidden"
    >
      <Aurora />
      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="max-w-3xl"
        >
          <div className="eyebrow mb-4">The silent gap</div>
          <h2 className="text-display text-ink-900 tracking-tighter">
            Your father is 52.
            <br />
            <span style={{ color: "rgba(22,25,29,0.55)" }}>
              The first sign always comes too late.
            </span>
          </h2>
          <p className="mt-6 text-lg md:text-xl leading-relaxed" style={SOFT}>
            India has the largest pre-symptomatic cardiac population on earth. Most who
            collapse first had no obvious warning — heart disease often shows itself only
            after damage is done. We're building for the years <em>before</em> that moment.
          </p>
        </motion.div>

        {/* Stat trio */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {([
            {
              count: { value: 300, suffix: "M+" },
              label: "Indians at silent cardiac risk",
              note: "Hypertension, diabetes, lifestyle, and genetics — most undiagnosed at the time of event.",
            },
            {
              count: { value: 2, prefix: "~", suffix: "M" },
              label: "Cardiac events every year, in India",
              note: "Acute MI, sudden cardiac arrest and stroke combined. Many among 35–55 year olds.",
            },
            {
              k: "Years",
              label: "Of silent drift before the first event",
              note: "Subtle changes in vitals appear long before symptoms. This is the gap we close.",
            },
          ] as Stat[]).map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="glass-card is-interactive p-7"
            >
              <div className="font-mono tabular-nums text-5xl font-semibold tracking-tighter text-ink-900">
                {stat.count ? (
                  <CountUp
                    value={stat.count.value}
                    prefix={stat.count.prefix}
                    suffix={stat.count.suffix}
                  />
                ) : (
                  stat.k
                )}
              </div>
              <div className="mt-3 text-base font-medium text-ink-900">{stat.label}</div>
              <p className="mt-2 text-sm leading-relaxed" style={SOFT}>
                {stat.note}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Second-person hook */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="mt-16 max-w-3xl"
        >
          <blockquote className="border-l-2 border-accent-500 pl-6 text-xl md:text-2xl font-medium text-ink-900 tracking-tight leading-snug">
            Your father climbed a flight of stairs and said he felt fine. Six months
            later, an ICU. That gap — between "fine" and the event — is where Triksha
            lives.
          </blockquote>
          <p className="mt-5 text-sm" style={SOFT}>
            This is the founder's story. It's also the story of millions of families
            across India.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

export default ProblemSection;
