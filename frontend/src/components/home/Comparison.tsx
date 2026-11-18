import React from "react";
import { Check, Minus } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import Aurora from "../ui/Aurora";
import trikshaLogo from "../../public/Triksha_logo.png";
import appleLogo from "../../public/apple-logo.png";
import whoopLogo from "../../public/whoop_logo.png";
import ouraLogo from "../../public/ultra_human_logo.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const SOFT = { color: "rgba(22,25,29,0.62)" };

const Comparison: React.FC = () => {
  const features = [
    { name: "Predictive AI health alerts", triksha: true, apple: false, whoop: false, ultrahuman: false, unique: true },
    { name: "Chronic disease early detection", triksha: true, apple: false, whoop: false, ultrahuman: false, unique: true },
    { name: "EHR integration", triksha: true, apple: false, whoop: false, ultrahuman: false, unique: true },
    { name: "Health Book", triksha: true, apple: false, whoop: false, ultrahuman: false, unique: true },
    { name: "Monthly health reports", triksha: true, apple: false, whoop: false, ultrahuman: false, unique: true },
    { name: "Family emergency alerts", triksha: true, apple: false, whoop: false, ultrahuman: false, unique: true },
    { name: "Real-time monitoring", triksha: true, apple: true, whoop: true, ultrahuman: true, unique: false },
    { name: "AI-powered insights", triksha: true, apple: false, whoop: true, ultrahuman: true, unique: false },
    { name: "User emergency alerts", triksha: true, apple: false, whoop: false, ultrahuman: false, unique: false },
    { name: "Personalized recommendations", triksha: true, apple: false, whoop: true, ultrahuman: true, unique: false },
  ];

  const brands = [
    { name: "Triksha", logo: trikshaLogo, primary: true },
    { name: "Apple Watch", logo: appleLogo },
    { name: "WHOOP", logo: whoopLogo },
    { name: "Ultrahuman", logo: ouraLogo },
  ];

  const cell = (on: boolean, primary?: boolean) =>
    on ? (
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center ${
          primary
            ? "bg-accent-500 text-white"
            : "bg-canvas-soft text-ink-700 ring-1 ring-[rgba(22,25,29,0.10)]"
        }`}
      >
        <Check className="w-4 h-4" strokeWidth={2.5} />
      </div>
    ) : (
      <div className="w-7 h-7 flex items-center justify-center" style={{ color: "rgba(22,25,29,0.25)" }}>
        <Minus className="w-4 h-4" />
      </div>
    );

  return (
    <section id="whytriksha" className="relative py-32 bg-canvas overflow-hidden">
      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="max-w-2xl"
        >
          <h2 className="text-display text-ink-900 tracking-tighter">
            One wearable. A category of its own.
          </h2>
          <p className="mt-5 text-lg md:text-xl leading-relaxed" style={SOFT}>
            How Triksha compares with the most popular health platforms in the market.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="mt-16 rounded-4xl bg-canvas-paper ring-1 ring-[rgba(22,25,29,0.10)] shadow-soft-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <div className="min-w-[760px]">
              {/* Header */}
              <div className="grid grid-cols-5 px-4 md:px-6 pt-8 pb-6 border-b border-[rgba(22,25,29,0.10)]">
                <div />
                {brands.map((brand) => (
                  <div key={brand.name} className="flex flex-col items-center gap-3">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center ring-1 ${
                        brand.primary
                          ? "bg-accent-500 ring-accent-500 shadow-soft"
                          : "bg-canvas-soft ring-[rgba(22,25,29,0.10)]"
                      }`}
                    >
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className={`h-7 w-7 object-contain ${brand.primary ? "brightness-200" : ""}`}
                      />
                    </div>
                    <div className={`text-sm font-medium ${brand.primary ? "text-ink-900" : ""}`} style={brand.primary ? undefined : SOFT}>
                      {brand.name}
                    </div>
                  </div>
                ))}
              </div>

              {/* Rows */}
              {features.map((feature, i) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.04, duration: 0.45 }}
                  className={`grid grid-cols-5 items-center px-4 md:px-6 py-4 border-b border-[rgba(22,25,29,0.08)] last:border-0 ${
                    i % 2 === 0 ? "bg-canvas-paper" : "bg-canvas-soft/50"
                  }`}
                >
                  <div className="flex items-center gap-3 text-sm md:text-[15px] text-ink-800 font-medium pr-2">
                    <span>{feature.name}</span>
                    {feature.unique && (
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent-50 text-accent-700 ring-1 ring-accent-100">
                        Unique
                      </span>
                    )}
                  </div>
                  <div className="flex justify-center">{cell(feature.triksha, true)}</div>
                  <div className="flex justify-center">{cell(feature.apple)}</div>
                  <div className="flex justify-center">{cell(feature.whoop)}</div>
                  <div className="flex justify-center">{cell(feature.ultrahuman)}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Triksha Difference — navy statement */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mt-16 rounded-4xl bg-navy text-canvas p-10 md:p-16 relative overflow-hidden"
        >
          <Aurora tone="navy" />
          <div className="relative">
            <div className="max-w-3xl">
              <div className="text-eyebrow uppercase font-medium mb-4" style={{ color: "#6FB6FF" }}>
                The Triksha difference
              </div>
              <h3 className="text-3xl md:text-4xl font-semibold tracking-tighter leading-[1.08] text-canvas">
                Proactive. Personalized. Predictive.
              </h3>
              <p className="mt-6 leading-relaxed text-canvas/80">
                Triksha analyzes real-time vitals, medical history and detected anomalies
                to forecast emerging health risk before it escalates.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
              {[
                {
                  title: "Advanced AI predictions",
                  desc: "Our proprietary AI learns your patterns over time, combining vitals and history to forecast potential issues — empowering you to act before they arise.",
                },
                {
                  title: "Personalized risk insights",
                  desc: "Triksha uses your medical history, past conditions and real-time data to deliver personalized risk scores and alerts tailored specifically to you.",
                },
                {
                  title: "Integrated Health Book",
                  desc: "A single, secure home for your medical data — easy to track, easy to share with your doctor.",
                },
              ].map((box, i) => (
                <motion.div
                  key={box.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.55 }}
                  className="rounded-3xl bg-white/[0.06] ring-1 ring-white/10 p-6"
                >
                  <div className="text-base font-semibold tracking-tight text-canvas">{box.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-canvas/75">{box.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Comparison;
