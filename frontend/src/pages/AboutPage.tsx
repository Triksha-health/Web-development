import { useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { ArrowRight, Mail } from "lucide-react";
import Container from "../components/ui/Container";
import StatusBadge from "../components/ui/StatusBadge";

function AboutPage() {
  useEffect(() => {
    document.title = "About | Triksha";
  }, []);

  const SOFT = { color: "rgba(22,25,29,0.62)" };

  return (
    <main className="bg-canvas">
      <div className="pt-32 pb-24">
        <Container>
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="eyebrow">About Triksha</span>
              <StatusBadge variant="mvp" />
            </div>
            <h1 className="text-display text-ink-900 tracking-tighter">
              Predict cardiac risk, before symptoms.
            </h1>
            <p className="mt-6 text-lg md:text-xl leading-relaxed" style={SOFT}>
              Triksha is a personalized physiological twin, an AI model that learns
              your cardiac baseline from a medical-grade wearable and your medical
              history, watches for drift, and hands findings to your cardiologist
              before symptoms surface.
            </p>
          </div>

          {/* Mission */}
          <section className="mt-20 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <div className="text-eyebrow uppercase mb-3" style={{ color: "rgba(22,25,29,0.40)" }}>
                Mission
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-ink-900 tracking-tighter leading-snug">
                Close the silent gap before it costs another life.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-4 text-[15.5px] leading-relaxed" style={{ color: "rgba(22,25,29,0.78)" }}>
              <p>
                India has the largest pre-symptomatic cardiac population on earth: about
                300 million people with hypertension, diabetes, lifestyle and genetic
                risk that hasn't yet become a diagnosis. Each year roughly 2 million of
                them suffer an acute event, and most had no obvious warning.
              </p>
              <p>
                Existing wearables compare your heart rate to population averages.
                Triksha compares <em>you to yesterday's you</em>. That's where the
                signal lives, and that's the gap we close.
              </p>
            </div>
          </section>

          {/* What we believe */}
          <section className="mt-20">
            <div className="text-eyebrow uppercase mb-6" style={{ color: "rgba(22,25,29,0.40)" }}>
              What we believe
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  k: "Personal beats population.",
                  v: "Your baseline is the only reference that matters. We never compare you to a generic curve.",
                },
                {
                  k: "Clinicians own the call.",
                  v: "Software doesn't diagnose. It hands clean, actionable signals to your doctor.",
                },
                {
                  k: "Honesty over hype.",
                  v: "We say what's shipped, what's working, and what's still in development. No vapor.",
                },
              ].map((c) => (
                <div
                  key={c.k}
                  className="rounded-3xl bg-canvas-paper ring-1 ring-[rgba(22,25,29,0.10)] shadow-soft p-6"
                >
                  <div className="font-semibold text-ink-900">{c.k}</div>
                  <p className="mt-2 text-sm leading-relaxed" style={SOFT}>
                    {c.v}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Backing */}
          <section className="mt-20 rounded-4xl bg-canvas-soft ring-1 ring-[rgba(22,25,29,0.10)] p-8 md:p-12">
            <div className="text-eyebrow uppercase mb-3" style={{ color: "rgba(22,25,29,0.40)" }}>
              Backing
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-ink-900 tracking-tighter leading-snug">
              Building from Hyderabad, with serious support.
            </h2>
            <ul className="mt-6 grid md:grid-cols-3 gap-4 text-[15px]">
              <li className="rounded-2xl bg-canvas-paper ring-1 ring-[rgba(22,25,29,0.10)] p-5">
                <div className="font-medium text-ink-900">Microsoft for Startups</div>
                <p className="mt-1 text-sm" style={SOFT}>Cloud + infrastructure partner.</p>
              </li>
              <li className="rounded-2xl bg-canvas-paper ring-1 ring-[rgba(22,25,29,0.10)] p-5">
                <div className="font-medium text-ink-900">NIT Andhra Pradesh</div>
                <p className="mt-1 text-sm" style={SOFT}>Institutional and research partner.</p>
              </li>
              <li className="rounded-2xl bg-canvas-paper ring-1 ring-[rgba(22,25,29,0.10)] p-5">
                <div className="font-medium text-ink-900">VTY Triksha Health Tech</div>
                <p className="mt-1 text-sm" style={SOFT}>Incorporated in India.</p>
              </li>
            </ul>
          </section>

          {/* CTA */}
          <section className="mt-20 flex flex-wrap items-center gap-4">
            <HashLink
              smooth
              to="/#waitlist"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-accent-500 text-white font-medium hover:bg-accent-600 transition"
            >
              Join the waitlist <ArrowRight className="w-4 h-4" />
            </HashLink>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-canvas-paper ring-1 ring-[rgba(22,25,29,0.14)] text-ink-900 font-medium hover:bg-canvas-soft transition"
            >
              See open roles
            </Link>
            <a
              href="mailto:yashwanth@trikshahealth.com"
              className="inline-flex items-center gap-2 text-sm text-ink-700 hover:text-accent-600 transition"
            >
              <Mail className="w-4 h-4" />
              yashwanth@trikshahealth.com
            </a>
          </section>
        </Container>
      </div>
    </main>
  );
}

export default AboutPage;
