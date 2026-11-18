import { Link } from "react-router-dom";
import LegalPage, { type LegalSection } from "../components/site/LegalPage";
import { usePageMeta } from "../seo";

/**
 * Terms of use — placeholder text, clearly marked on the page as a draft.
 * Must be reviewed by legal counsel before launch.
 */
const sections: LegalSection[] = [
  {
    id: "about",
    title: "1. About these terms",
    body: (
      <>
        <p>
          These terms apply to your use of the Triksha website and waitlist, operated by VTY
          Triksha Health Tech Pvt Ltd (“Triksha”, “we”, “us”). By using the site or joining
          the waitlist, you agree to them.
        </p>
        <p>
          Separate terms will apply to the Triksha wristband, app and Health Book when they
          become available. You will be asked to accept those before you use the product.
        </p>
      </>
    ),
  },
  {
    id: "not-medical",
    title: "2. Triksha is not medical advice",
    body: (
      <>
        <p>
          Triksha is in development and is <strong>not a certified medical device</strong>. It
          does not diagnose, treat or prevent any disease, and it does not replace your doctor.
        </p>
        <p>
          Nothing on this site is medical advice. Alerts, charts and numbers shown here are
          illustrations with example data. Always speak to a qualified doctor about your
          health. <strong>In an emergency, call 112.</strong>
        </p>
      </>
    ),
  },
  {
    id: "waitlist",
    title: "3. The waitlist",
    body: (
      <>
        <p>
          Joining the waitlist is free and does not create an order, a reservation or a
          contract to buy. We will email you when Triksha is ready for you. You can ask to be
          removed at any time.
        </p>
        <p>
          Prices shown on the site are planned prices. They may change, and will be confirmed
          before launch.
        </p>
      </>
    ),
  },
  {
    id: "content",
    title: "4. Site content",
    body: (
      <p>
        The text, images, logos and designs on this site belong to Triksha or are used with
        permission. You may view and share pages for personal, non-commercial use. Please do
        not copy or reuse them in other ways without asking us first.
      </p>
    ),
  },
  {
    id: "acceptable-use",
    title: "5. Using the site fairly",
    body: (
      <ul>
        <li>Do not try to break, overload or gain unauthorised access to the site.</li>
        <li>Do not submit someone else’s email address without their permission.</li>
        <li>Do not use the site for anything unlawful.</li>
      </ul>
    ),
  },
  {
    id: "liability",
    title: "6. Our responsibility to you",
    body: (
      <p>
        We work to keep the information on this site accurate and up to date, but the product
        is still being built and details will change. The site is provided as it is. To the
        extent the law allows, Triksha is not liable for loss arising from reliance on the
        information here.
      </p>
    ),
  },
  {
    id: "privacy",
    title: "7. Privacy",
    body: (
      <p>
        How we handle your personal data is explained in our{" "}
        <Link to="/privacy">privacy policy</Link>.
      </p>
    ),
  },
  {
    id: "law",
    title: "8. Governing law",
    body: (
      <p>
        These terms are governed by the laws of India. Courts in Hyderabad, Telangana have
        jurisdiction over any dispute.
      </p>
    ),
  },
  {
    id: "contact",
    title: "9. Changes and contact",
    body: (
      <p>
        We may update these terms as the product develops, and will show the date of the
        latest version on this page. Questions:{" "}
        <a href="mailto:yashwanth@trikshahealth.com">yashwanth@trikshahealth.com</a>.
      </p>
    ),
  },
];

function TermsPage() {
  usePageMeta("/terms");

  return (
    <LegalPage
      kicker="Legal"
      title="Terms of use"
      intro="The basic terms for using this website and joining the Triksha waitlist."
      updated="November 2026"
      sections={sections}
    />
  );
}

export default TermsPage;
