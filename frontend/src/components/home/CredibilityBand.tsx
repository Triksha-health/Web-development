import { motion } from "framer-motion";
import { Cloud, GraduationCap, Building2, ShieldCheck } from "lucide-react";
import Container from "../ui/Container";

const SOFT = { color: "rgba(22,25,29,0.62)" };
const MUTE = { color: "rgba(22,25,29,0.40)" };

const items = [
  { icon: Cloud, label: "Partner", title: "Microsoft for Startups", sub: "Cloud + infrastructure" },
  { icon: GraduationCap, label: "Backing", title: "NIT Andhra Pradesh", sub: "Institutional & research" },
  { icon: Building2, label: "Entity", title: "Incorporated in India", sub: "VTY Triksha Health Tech" },
  { icon: ShieldCheck, label: "Compliance", title: "DPDP-aligned", sub: "India's data-protection law" },
];

function CredibilityBand() {
  return (
    <section className="bg-canvas py-20 md:py-24">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl text-2xl md:text-3xl font-semibold text-ink-900 tracking-tighter"
        >
          Backed, incorporated, and accountable — built from Hyderabad.
        </motion.h2>

        {/* instrument row: hairline-separated columns via 1px gap, not generic cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-3xl overflow-hidden bg-[rgba(22,25,29,0.10)] ring-1 ring-[rgba(22,25,29,0.10)]"
        >
          {items.map((it) => (
            <div key={it.title} className="bg-canvas-paper p-6 lg:p-7">
              <div className="flex items-center gap-2.5">
                <it.icon className="w-4 h-4 text-accent-600" strokeWidth={1.75} />
                <span className="font-mono text-[10.5px] uppercase tracking-[0.18em]" style={MUTE}>
                  {it.label}
                </span>
              </div>
              <div className="mt-4 text-lg font-semibold text-ink-900 tracking-tight leading-tight">
                {it.title}
              </div>
              <div className="mt-1.5 text-sm leading-relaxed" style={SOFT}>
                {it.sub}
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

export default CredibilityBand;
