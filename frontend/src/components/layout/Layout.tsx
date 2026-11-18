import { Suspense, useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const lastPath = useRef(location.pathname);

  // Nav changes style once the page has moved.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const hideFooter = location.pathname.startsWith("/userdashboard");

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar scrolled={scrolled} />
      <main id="main" className="flex-grow">
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <Outlet />
        </Suspense>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default Layout;
