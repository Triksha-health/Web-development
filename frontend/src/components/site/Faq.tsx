import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "Can I buy Triksha today?",
    a: "Not yet. We are running a hospital pilot first so Triksha is tested with real patients before anyone pays for it. Join the waitlist and we will tell you when family plans open.",
  },
  {
    q: "Is Triksha a medical device? Can it replace my doctor?",
    a: "Triksha is in development and is not yet cleared by CDSCO. It does not diagnose or treat any condition, and it never replaces your doctor. Its job is to help you notice early and get to the right doctor sooner.",
  },
  {
    q: "How is this different from a smartwatch?",
    a: "Smartwatches compare you with averages and describe the present. Triksha builds a model of you from your daily signals and your medical history, and watches for drift away from your own normal.",
  },
  {
    q: "Who can see my health data?",
    // TODO(founder): the design asks for a two-sentence summary of the data
    // policy here. Until that wording is confirmed, this answer says only
    // what the design already states and points to the full policy.
    a: (
      <>
        Only you, and the family members and doctors you choose to share with.{" "}
        <Link to="/privacy" className="text-link">
          Read the privacy policy
        </Link>
        .
      </>
    ),
  },
];

export default function Faq() {
  return (
    <section id="faq" className="site-section mx-auto flex w-full max-w-[900px] flex-col gap-8 px-[clamp(20px,5vw,48px)]">
      <h2 className="h-display" data-reveal>
        Honest answers
      </h2>
      <div className="flex flex-col border-t border-line-strong">
        {FAQS.map((f, i) => (
          <details
            key={f.q}
            data-reveal
            style={{ "--i": i } as CSSProperties}
            className="faq border-b border-line-strong"
          >
            <summary className="flex items-center justify-between gap-5 py-[22px] font-display text-[clamp(20px,2vw,24px)] font-semibold transition-colors">
              {f.q}
              <span
                aria-hidden="true"
                className="faq-plus flex-none font-sans text-[26px] font-normal leading-none text-accent-600"
              >
                +
              </span>
            </summary>
            <p className="mb-[22px] text-[17px] text-body">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
