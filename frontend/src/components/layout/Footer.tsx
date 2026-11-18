import { Link } from "react-router-dom";

const linkClass =
  "text-cream underline decoration-navy-400 underline-offset-4 transition-colors hover:text-white hover:decoration-accent-300";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-navy-100">
      <div className="site-wrap flex flex-col gap-10 pb-10 pt-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3.5">
            <img
              src="/img/eye-light.webp"
              alt=""
              width={72}
              height={93}
              loading="lazy"
              className="h-auto w-9"
            />
            <p className="font-display text-xl text-cream">
              Predict cardiac risk, before symptoms.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 text-[15px]">
            <span className="text-sm font-semibold text-navy-200">Contact</span>
            <a href="mailto:yashwanth@trikshahealth.com" className={linkClass}>
              yashwanth@trikshahealth.com
            </a>
            <a href="tel:+917899940382" className={linkClass}>
              +91 78999 40382
            </a>
          </div>

          <div className="flex flex-col gap-2.5 text-[15px]">
            <span className="text-sm font-semibold text-navy-200">Company</span>
            <Link to="/#about" className={linkClass}>
              About
            </Link>
            <Link to="/#clinicians" className={linkClass}>
              Clinical partners
            </Link>
            <a
              href="mailto:yashwanth@trikshahealth.com?subject=Investor%20enquiry"
              className={linkClass}
            >
              Investors
            </a>
          </div>

          <div className="flex flex-col gap-2.5 text-[15px]">
            <span className="text-sm font-semibold text-navy-200">Legal</span>
            <Link to="/privacy" className={linkClass}>
              Privacy policy
            </Link>
            <Link to="/terms" className={linkClass}>
              Terms of use
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 border-t border-navy-500 pt-6 text-[13px]">
          <p>
            Triksha is in development and is not a certified medical device. It does not
            diagnose, treat or prevent any disease. In an emergency, call 112.
          </p>
          <p>© {year} VTY Triksha Health Tech Pvt Ltd</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
