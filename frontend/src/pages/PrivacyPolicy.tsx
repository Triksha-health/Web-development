import LegalPage, { type LegalSection } from "../components/site/LegalPage";
import { usePageMeta } from "../seo";

/**
 * Privacy policy — DPDP Act 2023 aware working draft, clearly marked on
 * the page as pending legal review. Suitable for a pre-launch waitlist
 * site; must be reviewed by legal counsel before any health data (beyond
 * the waitlist email) is collected.
 */
const sections: LegalSection[] = [
  {
    id: "scope",
    title: "1. Scope and applicable law",
    body: (
      <>
        <p>
          This privacy policy explains how VTY Triksha Health Tech Pvt Ltd (“Triksha”, “we”,
          “our”) collects, uses, stores and shares personal data through our website, app and
          any associated services.
        </p>
        <p>
          We operate in India and comply with the{" "}
          <strong>Digital Personal Data Protection Act, 2023 (“DPDP Act”)</strong> and
          applicable rules and standards. By using our services, you consent to the practices
          described here.
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
        <ul>
          <li>
            <strong>Email address</strong> — when you join our waitlist or contact us, along
            with whether you are joining for yourself, a family member or your patients.
          </li>
          <li>
            <strong>Communication content</strong> — emails or messages you send us.
          </li>
          <li>
            <strong>Basic technical data</strong> — privacy-friendly analytics (page views,
            referrer) via{" "}
            <a href="https://plausible.io/data-policy" rel="noopener">
              Plausible Analytics
            </a>
            . No cookies, no cross-site tracking, no personally identifying analytics.
          </li>
        </ul>
        <p>
          When pilot access opens, we will additionally process the categories of sensitive
          personal and health data described in our pilot consent form (for example vitals
          from the wristband and optional medical history). This policy will be updated, and
          explicit opt-in consent will be requested at that time.
        </p>
      </>
    ),
  },
  {
    id: "purpose",
    title: "3. Why we collect it",
    body: (
      <ul>
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
        <ul>
          <li>
            <strong>Access</strong> — request a summary of your personal data.
          </li>
          <li>
            <strong>Correct or update</strong> — fix inaccuracies in your data.
          </li>
          <li>
            <strong>Erase</strong> — request deletion when our processing is no longer needed.
          </li>
          <li>
            <strong>Withdraw consent</strong> — at any time, with the same ease you gave it.
          </li>
          <li>
            <strong>Nominate</strong> — designate another individual to exercise your rights in
            case of death or incapacity.
          </li>
          <li>
            <strong>Grievance redressal</strong> — raise a complaint with our Grievance Officer
            (below) or with the Data Protection Board of India.
          </li>
        </ul>
        <p>
          To exercise any of these, email{" "}
          <a href="mailto:privacy@trikshahealth.com">privacy@trikshahealth.com</a>.
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
          Personal data is stored on infrastructure in India where feasible, with encryption at
          rest and in transit. Access is restricted to authorised personnel under
          confidentiality obligations.
        </p>
        <p>
          We retain personal data only for as long as needed to fulfil the purposes above, or
          as required by law. Waitlist emails are retained until you unsubscribe or request
          deletion.
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
        <ul>
          <li>
            Processors who help us run the service (for example transactional email and cloud
            hosting) under written data-processing agreements.
          </li>
          <li>
            Your authorised clinicians, when you explicitly share content with them from within
            the product.
          </li>
          <li>Authorities, when required by lawful request.</li>
        </ul>
      </>
    ),
  },
  {
    id: "children",
    title: "7. Children’s data",
    body: (
      <p>
        Triksha is not intended for individuals under 18. We do not knowingly process
        children’s data, and will follow DPDP Act provisions for verifiable parental consent if
        and when relevant.
      </p>
    ),
  },
  {
    id: "changes",
    title: "8. Changes to this policy",
    body: (
      <p>
        We will update this policy as the product evolves — especially before collecting any
        sensitive health data. Material changes will be communicated by email to waitlist
        members and by a notice on this page.
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
          <a href="mailto:privacy@trikshahealth.com">privacy@trikshahealth.com</a>
          <br />
          VTY Triksha Health Tech Pvt Ltd, Hyderabad, Telangana, India.
        </p>
        <p>We aim to respond to grievances within 30 days.</p>
      </>
    ),
  },
];

function PrivacyPolicy() {
  usePageMeta("/privacy");

  return (
    <LegalPage
      kicker="Legal"
      title="Privacy policy"
      intro="Triksha collects only what is needed and is governed by India’s DPDP Act 2023. This page explains what we collect, why, and how to opt out."
      updated="November 2026"
      sections={sections}
    />
  );
}

export default PrivacyPolicy;
