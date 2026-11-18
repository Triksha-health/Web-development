import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Code2, Brain } from "lucide-react";
import Container from "../components/ui/Container";
import StatusBadge from "../components/ui/StatusBadge";

const SOFT = { color: "rgba(22,25,29,0.62)" };

const roles = [
  {
    id: "cardio",
    icon: Heart,
    title: "Clinical Co-Founder · Cardiology",
    type: "Co-founder · Equity",
    location: "Hyderabad / Remote (India)",
    description:
      "Senior cardiologist to own the clinical side of Triksha end-to-end: model validation, alert thresholds, pilot study design and clinician workflows. You'll co-shape product decisions, not just review them.",
    priority: true,
  },
  {
    id: "ml",
    icon: Brain,
    title: "ML Engineer · Time-series + Signals",
    type: "Full-time",
    location: "Hyderabad / Remote (India)",
    description:
      "Build the personalized-baseline engine: signal cleaning, drift detection, and ranked alerts. You should be comfortable with PyTorch, signal processing, and shipping models, not just papers.",
  },
  {
    id: "swe",
    icon: Code2,
    title: "Full-stack Engineer · React + Node",
    type: "Full-time",
    location: "Hyderabad / Remote (India)",
    description:
      "Own the app and clinician-facing surfaces. We use React, TypeScript, Node, MongoDB. Bonus if you've worked on mobile-first apps and care about polish.",
  },
];

function CareersPage() {
  useEffect(() => {
    document.title = "Careers — Triksha";
  }, []);

  return (
    <main className="bg-canvas">
      <div className="pt-32 pb-24">
        <Container>
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="eyebrow">Careers</span>
              <StatusBadge variant="inDev" label="Hiring · 2026" />
            </div>
            <h1 className="text-display text-ink-900 tracking-tighter">
              Build the early-warning system India needs.
            </h1>
            <p className="mt-6 text-lg md:text-xl leading-relaxed" style={SOFT}>
              We're small, technical, and driven by a personal story. If you've felt
              the cost of late detection in your own family, you'll understand the
              urgency. If you haven't — bring the rigor and humility.
            </p>
          </div>

          {/* Roles */}
          <section className="mt-16 space-y-5">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`rounded-3xl p-7 md:p-9 ring-1 shadow-soft ${
                  role.priority
                    ? "bg-navy text-canvas ring-navy"
                    : "bg-canvas-paper ring-[rgba(22,25,29,0.10)]"
                }`}
              >
                <div className="grid md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ring-1 ${
                          role.priority
                            ? "bg-white/10 ring-white/20 text-canvas"
                            : "bg-accent-50 ring-accent-100 text-accent-700"
                        }`}
                      >
                        <role.icon className="w-5 h-5" />
                      </div>
                      {role.priority && (
                        <span
                          className="text-[11px] uppercase tracking-wider px-2 py-1 rounded-full font-medium"
                          style={{ background: "rgba(111,182,255,0.18)", color: "#6FB6FF" }}
                        >
                          Priority hire
                        </span>
                      )}
                    </div>
                    <h2 className={`text-xl md:text-2xl font-semibold tracking-tight ${role.priority ? "text-canvas" : "text-ink-900"}`}>
                      {role.title}
                    </h2>
                    <div className={`mt-1 text-sm ${role.priority ? "text-canvas/70" : ""}`} style={role.priority ? undefined : SOFT}>
                      {role.type} · {role.location}
                    </div>
                    <p className={`mt-4 text-[15px] leading-relaxed ${role.priority ? "text-canvas/85" : ""}`} style={role.priority ? undefined : { color: "rgba(22,25,29,0.78)" }}>
                      {role.description}
                    </p>
                  </div>
                  <div className="md:col-span-4 flex md:justify-end">
                    <a
                      href={`mailto:yashwanth@trikshahealth.com?subject=Triksha Careers — ${encodeURIComponent(role.title)}`}
                      className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium transition ${
                        role.priority
                          ? "bg-canvas text-ink-900 hover:bg-canvas-paper"
                          : "bg-ink-900 text-canvas-paper hover:bg-ink-700"
                      }`}
                    >
                      Apply <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Don't see your role */}
          <section className="mt-16 rounded-4xl bg-canvas-soft ring-1 ring-[rgba(22,25,29,0.10)] p-8 md:p-12 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
            <div>
              <div className="text-eyebrow uppercase mb-2" style={{ color: "rgba(22,25,29,0.40)" }}>
                Don't see your role?
              </div>
              <h3 className="text-2xl font-semibold text-ink-900 tracking-tight">
                If you've felt the gap — write to us anyway.
              </h3>
              <p className="mt-2 text-sm" style={SOFT}>
                Designers, clinicians, regulatory folks, signal-processing geeks — we want to hear from you.
              </p>
            </div>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-accent-500 text-white font-medium hover:bg-accent-600 transition self-start"
            >
              Read about Triksha <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </Container>
      </div>
    </main>
  );
}

export default CareersPage;
