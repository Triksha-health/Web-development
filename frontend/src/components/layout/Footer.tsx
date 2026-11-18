import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, AlertCircle } from "lucide-react";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";
import trikshawordlogo from "../../public/Trikshawordlogo.png";
import trikshaeyelogo from "../../public/trikshaeyelogo(2).png";
import { HashLink } from "react-router-hash-link";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-canvas-soft border-t border-[rgba(22,25,29,0.10)]">
      {/* Medical disclaimer band */}
      <div className="border-b border-[rgba(22,25,29,0.10)]">
        <div className="container py-5 flex items-start gap-3">
          <AlertCircle
            className="w-4 h-4 mt-0.5 flex-shrink-0"
            style={{ color: "rgba(22,25,29,0.62)" }}
          />
          <p className="text-xs md:text-sm leading-relaxed" style={{ color: "rgba(22,25,29,0.62)" }}>
            <span className="font-medium text-ink-900">
              Triksha is currently in development.
            </span>{" "}
            It is <span className="font-medium text-ink-900">not a medical device</span> and is not
            intended to diagnose, treat, cure or prevent any disease. The information presented
            is for educational and informational purposes only and is not a substitute for
            professional medical advice. Always consult a qualified healthcare provider.
          </p>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center w-[90px] h-10 relative">
              <img src={trikshawordlogo} alt="Triksha" className="w-[65px] h-auto" />
              <img src={trikshaeyelogo} alt="" className="w-[28px] h-[90%] absolute top-0 right-0" />
            </Link>
            <p
              className="mt-5 text-sm leading-relaxed max-w-xs"
              style={{ color: "rgba(22,25,29,0.62)" }}
            >
              Predicting cardiac risk for the 300M Indians at silent risk — before symptoms.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { Icon: FiFacebook, href: "#", label: "Facebook" },
                { Icon: FiTwitter, href: "#", label: "Twitter" },
                { Icon: FiInstagram, href: "#", label: "Instagram" },
                { Icon: FiLinkedin, href: "https://www.linkedin.com/company/triksha", label: "LinkedIn" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-ink-500 bg-canvas-paper ring-1 ring-[rgba(22,25,29,0.12)] hover:text-accent-600 hover:ring-accent-500/60 transition"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3
              className="text-eyebrow uppercase mb-4"
              style={{ color: "rgba(22,25,29,0.40)", letterSpacing: "0.04em" }}
            >
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <HashLink smooth to="/#problem" className="text-sm text-ink-700 hover:text-accent-600 transition-colors">
                  The problem
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#what-it-does" className="text-sm text-ink-700 hover:text-accent-600 transition-colors">
                  The Twin
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#how" className="text-sm text-ink-700 hover:text-accent-600 transition-colors">
                  How it works
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#whytriksha" className="text-sm text-ink-700 hover:text-accent-600 transition-colors">
                  Why Triksha
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#pre-order" className="text-sm text-ink-700 hover:text-accent-600 transition-colors">
                  Pre-order
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#faq" className="text-sm text-ink-700 hover:text-accent-600 transition-colors">
                  FAQ
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#waitlist" className="text-sm text-ink-700 hover:text-accent-600 transition-colors">
                  Join the waitlist
                </HashLink>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3
              className="text-eyebrow uppercase mb-4"
              style={{ color: "rgba(22,25,29,0.40)", letterSpacing: "0.04em" }}
            >
              Company
            </h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-ink-700 hover:text-accent-600 transition-colors">About</Link></li>
              <li><Link to="/teams" className="text-sm text-ink-700 hover:text-accent-600 transition-colors">Team</Link></li>
              <li><Link to="/careers" className="text-sm text-ink-700 hover:text-accent-600 transition-colors">Careers</Link></li>
              <li><Link to="/privacy" className="text-sm text-ink-700 hover:text-accent-600 transition-colors">Privacy policy</Link></li>
              <li><Link to="/admin/login" className="text-sm text-ink-700 hover:text-accent-600 transition-colors">Admin</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-eyebrow uppercase mb-4"
              style={{ color: "rgba(22,25,29,0.40)", letterSpacing: "0.04em" }}
            >
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: "rgba(22,25,29,0.40)" }} />
                <span className="text-sm text-ink-700">yashwanth@trikshahealth.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: "rgba(22,25,29,0.40)" }} />
                <span className="text-sm text-ink-700">+91 (789) 994-0382</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: "rgba(22,25,29,0.40)" }} />
                <span className="text-sm text-ink-700 leading-relaxed">
                  5-5-7/29/B, Devi Nagar Road No 2,
                  <br />
                  Kukatpally, Hyderabad, Telangana
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[rgba(22,25,29,0.10)] mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs" style={{ color: "rgba(22,25,29,0.40)" }}>
            &copy; {currentYear} VTY TRIKSHA HEALTH TECH PRIVATE LIMITED. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(22,25,29,0.40)" }}>
            Designed in Hyderabad. Built with care.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
