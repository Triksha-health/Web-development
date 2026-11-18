import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../public/logo (3).png";
import { HashLink } from "react-router-hash-link";
import MagneticButton from "../ui/MagneticButton";

interface NavbarProps {
  scrolled: boolean;
}

function Navbar({ scrolled }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    closeMenu();
    setIsDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Active-section highlight (scrollspy) — homepage only.
  const [activeId, setActiveId] = useState("");
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveId("");
      return;
    }
    const ids = ["problem", "what-it-does", "how", "whytriksha", "pre-order", "faq"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [location.pathname]);

  const linkClass =
    "relative text-[13.5px] font-medium text-ink-700 hover:text-ink-900 transition-colors " +
    "after:absolute after:left-0 after:-bottom-1.5 after:h-[2px] after:w-0 after:rounded-full " +
    "after:bg-accent-500 after:transition-all after:duration-300 hover:after:w-full";
  const navLink = (id: string) =>
    activeId === id ? `${linkClass} text-ink-900 after:!w-full` : linkClass;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "header-scroll" : "header-transparent"
      }`}
    >
      <div className="container py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <img src={logo} alt="Triksha" className="w-20 h-10 object-contain" />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <HashLink smooth to="/#problem" className={navLink("problem")}>Problem</HashLink>
            <HashLink smooth to="/#what-it-does" className={navLink("what-it-does")}>The Twin</HashLink>
            <HashLink smooth to="/#how" className={navLink("how")}>How it works</HashLink>
            <HashLink smooth to="/#whytriksha" className={navLink("whytriksha")}>Why Triksha</HashLink>
            <HashLink smooth to="/#pre-order" className={navLink("pre-order")}>Pre-order</HashLink>
            <HashLink smooth to="/#faq" className={navLink("faq")}>FAQ</HashLink>
            <Link to="/teams" className={linkClass}>Team</Link>
          </nav>

          <div className="hidden md:flex items-center gap-3 relative" ref={dropdownRef}>
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1 text-[13.5px] font-medium text-ink-700 hover:text-ink-900"
                >
                  {user?.name}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-canvas-paper/95 backdrop-blur-xl rounded-2xl shadow-soft-lg ring-1 ring-[rgba(22,25,29,0.10)] overflow-hidden">
                    <Link
                      to="/userdashboard"
                      className="block px-4 py-3 text-sm text-ink-700 hover:bg-canvas-soft"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-sm text-ink-700 hover:bg-canvas-soft"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/signin" className={linkClass}>Sign in</Link>
                <MagneticButton>
                  <HashLink
                    smooth
                    to="/#waitlist"
                    className="sheen px-4 py-2 rounded-full bg-accent-500 text-white text-[13px] font-medium hover:bg-accent-600 transition active:scale-[0.98]"
                  >
                    Join waitlist
                  </HashLink>
                </MagneticButton>
              </>
            )}
          </div>

          <button
            className="md:hidden text-ink-900 p-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-canvas-paper/95 backdrop-blur-xl border-t border-[rgba(22,25,29,0.10)]">
          <div className="container py-4">
            <nav className="flex flex-col">
              <HashLink smooth to="/#problem" onClick={closeMenu} className="py-3 text-ink-900 font-medium">Problem</HashLink>
              <HashLink smooth to="/#what-it-does" onClick={closeMenu} className="py-3 text-ink-900 font-medium">The Twin</HashLink>
              <HashLink smooth to="/#how" onClick={closeMenu} className="py-3 text-ink-900 font-medium">How it works</HashLink>
              <HashLink smooth to="/#whytriksha" onClick={closeMenu} className="py-3 text-ink-900 font-medium">Why Triksha</HashLink>
              <HashLink smooth to="/#pre-order" onClick={closeMenu} className="py-3 text-ink-900 font-medium">Pre-order</HashLink>
              <HashLink smooth to="/#faq" onClick={closeMenu} className="py-3 text-ink-900 font-medium">FAQ</HashLink>
              <Link to="/teams" onClick={closeMenu} className="py-3 text-ink-900 font-medium">Team</Link>

              <div className="pt-4 mt-2 border-t border-[rgba(22,25,29,0.10)]">
                {isAuthenticated ? (
                  <>
                    <Link to="/userdashboard" onClick={closeMenu} className="block py-2 text-ink-900 font-medium">Dashboard</Link>
                    <button onClick={() => { handleLogout(); closeMenu(); }} className="block py-2 text-ink-900 font-medium">Sign out</button>
                  </>
                ) : (
                  <>
                    <Link to="/signin" onClick={closeMenu} className="block py-2 text-ink-900 font-medium">Sign in</Link>
                    <HashLink
                      smooth
                      to="/#waitlist"
                      onClick={closeMenu}
                      className="mt-3 inline-flex items-center justify-center w-full py-3 rounded-full bg-accent-500 text-white text-sm font-medium"
                    >
                      Join waitlist
                    </HashLink>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
