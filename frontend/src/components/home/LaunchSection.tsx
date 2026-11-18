import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import axios from "axios";
import Container from "../ui/Container";
import { API_BASE } from "../../lib/api";

function LaunchSection() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const launchDate = new Date("2026-08-15T00:00:00");
  // Start from a sensible default so the stock bar always renders, even if the
  // backend stock endpoint is unavailable.
  const [earlyBirdStock, setEarlyBirdStock] = useState<number | null>(142);

  useEffect(() => {
    const fetchEarlyBirdStock = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/stock/early`);
        if (typeof response.data?.stock === "number") {
          setEarlyBirdStock(response.data.stock);
        }
      } catch (error) {
        // Keep the default fallback; the section stays usable offline / pre-backend.
        console.error("Failed to fetch early bird stock:", error);
      }
    };

    fetchEarlyBirdStock();

    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();
      if (difference <= 0) {
        clearInterval(timer);
        return;
      }
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    const stockTimer = setInterval(() => {
      const randomDecrease = Math.random() > 0.7 ? 1 : 0;
      if (earlyBirdStock !== null && earlyBirdStock > 0 && randomDecrease === 1) {
        setEarlyBirdStock((prev) => (prev !== null ? Math.max(0, prev - randomDecrease) : prev));
      }
    }, 10000);

    return () => {
      clearInterval(timer);
      clearInterval(stockTimer);
    };
  }, []);

  const formattedLaunchDate = launchDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section
      ref={ref}
      className="relative py-32 bg-canvas-soft overflow-hidden"
    >
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h2 className="text-display text-ink-900 tracking-tighter">
            Be among the first.
          </h2>
          <p className="mt-5 text-lg md:text-xl leading-relaxed" style={{ color: "rgba(22,25,29,0.62)" }}>
            Limited devices for the initial launch. Reserve yours today and start
            ahead of the curve.
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-14 rounded-4xl bg-canvas-paper ring-1 ring-[rgba(22,25,29,0.10)] shadow-soft p-8 md:p-12"
        >
          <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
            <div>
              <div className="text-eyebrow uppercase" style={{ color: "rgba(22,25,29,0.40)" }}>Pre-order opens</div>
              <div className="mt-1 text-2xl md:text-3xl font-semibold text-ink-900 tracking-tight">
                {formattedLaunchDate}
              </div>
            </div>
            <div className="text-sm" style={{ color: "rgba(22,25,29,0.62)" }}>Secure your device before we sell out.</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: timeLeft.days, label: "Days" },
              { value: timeLeft.hours, label: "Hours" },
              { value: timeLeft.minutes, label: "Minutes" },
              { value: timeLeft.seconds, label: "Seconds" },
            ].map((item) => (
              <motion.div
                key={item.label}
                className="rounded-3xl bg-canvas ring-1 ring-[rgba(22,25,29,0.10)] p-5 text-center"
                whileHover={{ y: -2 }}
              >
                <div className="text-4xl md:text-5xl font-semibold text-ink-900 tabular-nums tracking-tighter">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="text-xs mt-1.5 uppercase tracking-wider" style={{ color: "rgba(22,25,29,0.62)" }}>
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Early bird */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-10 grid lg:grid-cols-12 gap-6"
        >
          {/* Left: navy pitch */}
          <div className="lg:col-span-5 rounded-4xl bg-navy text-canvas p-10 md:p-12 relative overflow-hidden">
            <div className="pointer-events-none absolute -bottom-24 -right-16 w-80 h-80 bg-accent-500/25 rounded-full blur-3xl" />
            <div className="relative">
              <div className="text-eyebrow uppercase font-medium mb-4" style={{ color: "#6FB6FF" }}>
                Limited early access
              </div>
              <h3 className="text-3xl md:text-4xl font-semibold tracking-tighter leading-[1.08] text-canvas">
                The first 200.
              </h3>
              <p className="mt-5 leading-relaxed text-canvas/80">
                A select cohort, priority shipping, and a 12-month subscription. The
                people who'll shape Triksha alongside us.
              </p>
              <div className="mt-8 flex items-baseline gap-3">
                <span className="text-5xl font-semibold tracking-tighter text-canvas">₹**,***</span>
                <span className="text-canvas/40 line-through">₹19,999</span>
              </div>
              <div className="mt-2 text-sm" style={{ color: "#6FB6FF" }}>Save over ** % with early access.</div>
            </div>
          </div>

          {/* Right: perks + CTA */}
          <div className="lg:col-span-7 rounded-4xl bg-canvas-paper ring-1 ring-[rgba(22,25,29,0.10)] shadow-soft p-10 md:p-12">
            <ul className="space-y-4">
              {[
                "12-month premium subscription (app + wearable)",
                "Personalized AI Coach",
                "Lifetime priority support",
                "Priority shipping from January 2027",
                "Limited to 200 units",
              ].map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-accent-50 ring-1 ring-accent-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-accent-600" strokeWidth={2.5} />
                  </div>
                  <span className="text-[15px] text-ink-800">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-[rgba(22,25,29,0.10)]">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs uppercase tracking-wider" style={{ color: "rgba(22,25,29,0.40)" }}>Stock</span>
                <span className="text-sm font-medium text-ink-900 tabular-nums">
                  {earlyBirdStock ?? "—"}<span style={{ color: "rgba(22,25,29,0.40)" }}> / 200 remaining</span>
                </span>
              </div>
              <div className="w-full bg-canvas-soft rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="bg-accent-500 h-1.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={
                    isInView && earlyBirdStock !== null
                      ? { width: `${(earlyBirdStock / 200) * 100}%` }
                      : { width: 0 }
                  }
                  transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
                />
              </div>
            </div>

            <motion.button
              onClick={() => navigate("/pre-order?triksha=early-bird")}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="mt-8 w-full bg-accent-500 text-white py-4 rounded-full font-medium text-[15px] hover:bg-accent-600 transition-colors"
            >
              Pre-order now
            </motion.button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default LaunchSection;
