import { useEffect } from "react";
import Container from "../components/ui/Container";
import { ShieldCheck } from "lucide-react";

/**
 * Privacy Policy — DPDP Act 2023 aware skeleton.
 * Reviewed periodically. Last update reflected on this page.
 *
 * Note: This is a working draft suitable for a pre-launch waitlist
 * site. Please have legal counsel review before any health data
 * (beyond waitlist email) is collected.
 */
function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy — Triksha";
  }, []);

  const SOFT = { color: "rgba(22,25,29,0.62)" };

  const sections: { id: string; title: string; body: React.ReactNode }[] = [
    {
      id: "scope",
      title: "1. Scope and applicable law",
      body: (
        <>
          <p>
            This Privacy Policy explains how VTY TRIKSHA HEALTH TECH PRIVATE LIMITED
            ("Triksha", "we", "our") collects, uses, stores and shares personal data
            through our website, app, and any associated services.
          </p>
          <p className="mt-3">
            We operate in India and comply with the{" "}
            <strong>Digital Personal Data Protection Act, 2023 ("DPDP Act")</strong>{" "}
            and applicable rules and standards. By using our services, you consent to
            the practices described here.
          </p>
        </>
      ),
    },
    {
      id: "data",
      title: "2. What we collect",
      body: (
        <>
          <p>At this pre-launch stage we collect, at minimum:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            <li>
              <strong>Email address</strong> — when you join our waitlist or contact us.
            </li>
            <li>
              <strong>Communication content</strong> — emails or messages you send us.
            </li>
            <li>
              <strong>Basic technical data</strong> — privacy-friendly analytics
              (page views, referrer) via{" "}
              <a href="https://plausible.io/data-policy" className="text-accent-700 underline">
                Plausible Analytics
              </a>
              . No cookies, no cross-site tracking, no personally identifying analytics.
            </li>
          </ul>
          <p className="mt-3">
            When pilot access opens, we will additionally process the categories of
            sensitive personal and health data described in our pilot consent form
            (e.g. vitals from the wearable, optional medical history). This policy will
            be updated, and explicit opt-in consent will be requested at that time.
          </p>
        </>
      ),
    },
    {
      id: "purpose",
      title: "3. Why we collect it",
      body: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Operating the waitlist and notifying you when access opens.</li>
          <li>Responding to your questions and support requests.</li>
          <li>Improving the product, model and clinical workflows.</li>
          <li>Complying with applicable law.</li>
        </ul>
      ),
    },
    {
      id: "rights",
      title: "4. Your rights under the DPDP Act",
      body: (
        <>
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            <li><strong>Access</strong> — request a summary of your personal data.</li>
            <li><strong>Correct or update</strong> — fix inaccuracies in your data.</li>
            <li><strong>Erase</strong> — request deletion when our processing is no longer needed.</li>
            <li><strong>Withdraw consent</strong> — at any time, with the same ease you gave it.</li>
            <li><strong>Nominate</strong> — designate another individual to exercise your rights in case of death or incapacity.</li>
            <li><strong>Grievance redressal</strong> — raise a complaint with our Grievance Officer (below) or with the Data Protection Board of India.</li>
          </ul>
          <p className="mt-3">
            To exercise any of these, email{" "}
            <a href="mailto:privacy@trikshahealth.com" className="text-accent-700 underline">
              privacy@trikshahealth.com
            </a>
            .
          </p>
        </>
      ),
    },
    {
      id: "storage",
      title: "5. Storage and security",
      body: (
        <>
          <p>
            Personal data is stored on infrastructure in India where feasible, with
            encryption at rest and in transit. Access is restricted to authorized
            personnel under confidentiality obligations.
          </p>
          <p className="mt-3">
            We retain personal data only for as long as needed to fulfil the purposes
            above, or as required by law. Waitlist emails are retained until you
            unsubscribe or request deletion.
          </p>
        </>
      ),
    },
    {
      id: "sharing",
      title: "6. Sharing and third parties",
      body: (
        <>
          <p>We never sell your personal data. We share data only with:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            <li>Processors who help us run the service (e.g. transactional email,
              cloud hosting) under written data-processing agreements.</li>
            <li>Your authorized clinicians, when you explicitly share content with them
              from within the product.</li>
            <li>Authorities, when required by lawful request.</li>
          </ul>
        </>
      ),
    },
    {
      id: "children",
      title: "7. Children's data",
      body: (
        <p>
          Triksha is not intended for individuals under 18. We do not knowingly process
          children's data, and will follow DPDP Act provisions for verifiable parental
          consent if and when relevant.
        </p>
      ),
    },
    {
      id: "changes",
      title: "8. Changes to this policy",
      body: (
        <p>
          We will update this policy as the product evolves — especially before
          collecting any sensitive health data. Material changes will be communicated
          via email to waitlist members and via a notice on this page.
        </p>
      ),
    },
    {
      id: "contact",
      title: "9. Grievance Officer and contact",
      body: (
        <>
          <p>
            <strong>Grievance Officer:</strong> Vemuri Yashwanth
            <br />
            <a href="mailto:privacy@trikshahealth.com" className="text-accent-700 underline">
              privacy@trikshahealth.com
            </a>
            <br />
            VTY TRIKSHA HEALTH TECH PRIVATE LIMITED, Hyderabad, Telangana, India.
          </p>
          <p className="mt-3" style={SOFT}>
            We aim to respond to grievances within 30 days.
          </p>
        </>
      ),
    },
  ];

  return (
    <main className="bg-canvas">
      <div className="pt-32 pb-24">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-5">
              <ShieldCheck className="w-5 h-5 text-accent-700" />
              <span className="eyebrow">Privacy</span>
            </div>
            <h1 className="text-display text-ink-900 tracking-tighter">Privacy Policy</h1>
            <p className="mt-5 text-lg leading-relaxed" style={SOFT}>
              Triksha collects only what's needed and is governed by India's DPDP Act
              2023. This page explains what, why, and how to opt out.
            </p>
            <p className="mt-4 text-sm" style={SOFT}>
              Last updated · June 2026
            </p>
          </div>

          <div className="mt-14 grid lg:grid-cols-12 gap-10">
            <aside className="lg:col-span-3">
              <nav className="lg:sticky lg:top-28">
                <div className="text-eyebrow uppercase mb-3" style={{ color: "rgba(22,25,29,0.40)" }}>
                  On this page
                </div>
                <ol className="space-y-2 text-sm">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="text-ink-700 hover:text-accent-600 transition-colors"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <article className="lg:col-span-9 space-y-10">
              {sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-semibold text-ink-900 tracking-tight mb-4">
                    {s.title}
                  </h2>
                  <div className="leading-relaxed text-[15.5px]" style={{ color: "rgba(22,25,29,0.78)" }}>
                    {s.body}
                  </div>
                </section>
              ))}
            </article>
          </div>
        </Container>
      </div>
    </main>
  );
}

export default PrivacyPolicy;
