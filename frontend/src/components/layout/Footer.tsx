import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { FiFacebook } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
// import logo from "../../public/logo (3).png";
import trikshawordlogo from "../../public/Trikshawordlogo.png";
import trikshaeyelogo from "../../public/trikshaeyelogo(2).png";
import { HashLink } from 'react-router-hash-link';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center color-white w-[90px] h-10 relative">
              <img src={trikshawordlogo} alt="" className="w-[65px] h-auto brightness-[120%]" />
              <img src={trikshaeyelogo} alt="" className="invert w-[28px] h-[90%] absolute top-[0px] right-[0px]" />
            </Link>
            <p className="mt-4 text-gray-400">
              wearable that predicts and prevents chronic health risks before they become serious.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <HashLink smooth to="/#about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#usecases" className="text-gray-400 hover:text-white transition-colors">
                  Use Cases
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#whytriksha" className="text-gray-400 hover:text-white transition-colors">
                  Why Triksha
                </HashLink>
              </li>
              <li>
                 <HashLink smooth to="/#cofounder" className="text-gray-400 hover:text-white transition-colors">
                  Meet Our Founder
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </HashLink>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <span className="text-gray-400">support@triksha.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <span className="text-gray-400">+91 (800) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-gray-400 text-center">&copy; {currentYear} Triksha Health Tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
