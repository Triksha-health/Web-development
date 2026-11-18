import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  scrolled: boolean;
  /** True while the nav sits over the homepage's dark hero. */
  onDark?: boolean;
}

const LINKS = [
  { id: "how", label: "How it works" },
  { id: "families", label: "For families" },
  { id: "clinicians", label: "For cardiologists" },
  { id: "about", label: "About" },
];

function Navbar({ scrolled, onDark = false }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const location = useLocation();

  // Close the mobile menu whenever the visitor goes somewhere.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash, location.key]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Underline the section currently on screen (homepage only).
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveId("");
      return;
    }
    const els = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => !!el
    );
    const visible = new Set<string>();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        });
        setActiveId(LINKS.find((l) => visible.has(l.id))?.id ?? "");
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [location.pathname]);

  return (
    <header
      className={`site-nav sticky top-0 z-50 ${scrolled || open ? "is-scrolled" : ""} ${
        // The open mobile menu is a light panel, so the bar goes light with it.
        onDark && !open ? "on-dark" : ""
      }`}
    >
      <span className="scroll-progress" aria-hidden="true" />
      <nav
        aria-label="Main"
        className="nav-inner flex items-center justify-between gap-x-6"
      >
        <Link to="/" aria-label="Triksha home" className="flex flex-none items-center">
          <img
            src="/img/logo-full.webp"
            alt="Triksha"
            width={168}
            height={76}
            className="logo-dark h-[38px] w-auto"
          />
          {/* shown instead while the nav is over the dark hero (see motion.css) */}
          <img
            src="/img/logo-full-light.webp"
            alt=""
            aria-hidden="true"
            width={168}
            height={76}
            className="logo-light h-[38px] w-auto"
          />
        </Link>

        {/* Desktop links (1024px and up; below that they wrap, so the menu takes over) */}
        <div className="hidden items-center gap-x-7 text-[15px] font-medium lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.id}
              to={`/#${l.id}`}
              className="nav-link"
              aria-current={activeId === l.id ? "true" : undefined}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/#waitlist" className="cta cta-blue !px-5 !py-3 !text-[15px]">
            Join the waitlist
          </Link>
        </div>

        {/* Mobile: primary action stays visible, the rest sits in the menu */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/#waitlist"
            className={`cta cta-blue !px-4 !py-2.5 !text-[14px] ${
              // The open menu has its own waitlist button; don't show two.
              open ? "!hidden" : "hidden min-[400px]:inline-flex"
            }`}
          >
            Join the waitlist
          </Link>
          <button
            type="button"
            className="nav-burger flex h-11 w-11 items-center justify-center rounded-lg text-ink-900 transition-colors hover:bg-canvas-soft"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              aria-hidden="true"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-64px)] overflow-y-auto border-t border-line bg-canvas-paper shadow-[0_24px_40px_rgba(12,37,71,0.14)] lg:hidden"
      >
        <div className="flex flex-col px-[var(--page-pad)] pb-6 pt-2">
          {LINKS.map((l) => (
            <Link
              key={l.id}
              to={`/#${l.id}`}
              className="border-b border-line py-4 font-display text-[22px] font-medium text-ink-900 no-underline active:text-accent-600"
            >
              {l.label}
            </Link>
          ))}
          <Link to="/#waitlist" className="cta cta-blue mt-6 w-full">
            Join the waitlist
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
