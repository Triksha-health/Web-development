import { Suspense, useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useReveal } from "../../lib/useReveal";
import { usePointerEffects } from "../../lib/usePointerVars";

function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  // The homepage opens on a dark hero, so the nav starts light-on-dark there.
  // Starting from the route (not from a measurement) keeps the prerendered
  // HTML and the first client render identical.
  const [overHero, setOverHero] = useState(isHome);

  useReveal(location.pathname);
  usePointerEffects();
  const lastPath = useRef(location.pathname);

  // Nav changes style once the page has moved.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const hero = isHome ? document.getElementById("top") : null;
      // Still over the hero while its bottom edge is below the nav.
      setOverHero(!!hero && hero.getBoundingClientRect().bottom > 64);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  // Section links (/#how) scroll to their section; a new page starts at the top.
  useEffect(() => {
    const pathChanged = lastPath.current !== location.pathname;
    lastPath.current = location.pathname;

    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      // Wait a frame so a page we just navigated to has rendered.
      const raf = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView();
      });
      return () => cancelAnimationFrame(raf);
    }
    if (pathChanged) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [location.pathname, location.hash, location.key]);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar scrolled={scrolled} onDark={isHome && overHero} />
      <main id="main" className="flex-grow">
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
