import React, { useState, useRef, lazy, Suspense } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { motion, useInView } from "framer-motion";
import StatusBadge from "../ui/StatusBadge";
import { track } from "../../lib/analytics";
import { API_BASE } from "../../lib/api";

const GradientOrb = lazy(() => import("../three/GradientOrb"));

const WaitlistSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [statusMsg, setStatusMsg] = useState<string>("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus("err");
      setStatusMsg("Please enter an email address.");
      return;
    }
    setLoading(true);
    setStatus("idle");
    try {
      const response = await fetch(
        `${API_BASE}/api/newsletter/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setStatus("ok");
        setStatusMsg("You're on the list. We'll reach out when pilot access opens.");
        setEmail("");
        track("waitlist_submit");
      } else {
        setStatus("err");
        setStatusMsg(data.message || "Submission failed.");
      }
    } catch {
      setStatus("err");
      setStatusMsg("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" ref={ref} className="relative bg-canvas py-32 overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-4xl bg-navy overflow-hidden"
        >
          <div className="absolute inset-0 opacity-95">
            <Suspense
              fallback={
                <div className="absolute inset-0 bg-gradient-to-br from-accent-500/40 via-accent-700/30 to-navy" />
              }
            >
              <GradientOrb className="absolute inset-0 -right-1/4 scale-[1.4] translate-x-1/4" />
            </Suspense>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-transparent" />

          <div className="relative px-8 md:px-16 py-16 md:py-24 grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span
                  className="text-eyebrow uppercase font-medium"
                  style={{ color: "#6FB6FF", letterSpacing: "0.04em" }}
                >
                  Join the waitlist
                </span>
                <StatusBadge variant="pilot" />
              </div>
              <h2 className="text-display tracking-tighter text-canvas">
                We'll reach out when pilot access opens.
              </h2>
              <p className="mt-5 text-lg leading-relaxed max-w-xl text-canvas/80">
                Triksha is in active development. Drop your email and we'll invite you
                into the pilot the moment we're ready — no spam, no marketing blasts.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 px-5 py-3.5 rounded-full bg-canvas-paper text-ink-900 placeholder-[rgba(22,25,29,0.40)] outline-none focus:ring-2 focus:ring-accent-500"
                  aria-label="Email address"
                  required
                />
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent-500 text-white font-medium hover:bg-accent-600 transition disabled:opacity-60"
                >
                  {loading ? (
                    "Submitting…"
                  ) : (
                    <>
                      Join the waitlist <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>

              {status !== "idle" && (
                <div
                  className={`mt-4 text-sm ${
                    status === "ok" ? "text-[#6FB6FF]" : "text-red-300"
                  }`}
                  role="status"
                >
                  {statusMsg}
                </div>
              )}

              <p className="mt-5 text-xs text-canvas/55">
                We comply with India's DPDP Act 2023. Read our{" "}
                <a href="/privacy" className="underline hover:text-canvas/80">
                  privacy policy
                </a>
                .
              </p>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 sm:items-center text-canvas/70 text-sm">
                <a
                  href="mailto:yashwanth@trikshahealth.com"
                  className="inline-flex items-center gap-2 hover:text-canvas transition"
                >
                  <Mail className="w-4 h-4" />
                  yashwanth@trikshahealth.com
                </a>
                <span className="hidden sm:inline text-canvas/30">·</span>
                <span>Hyderabad · India</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WaitlistSection;
