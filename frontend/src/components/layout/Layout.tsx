import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';
import SmoothScroll from '../util/SmoothScroll';
import { EASE } from '../../lib/motion';
import { useEffect, useState } from 'react';

function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Scroll to top on top-level route change.
  const segment = location.pathname.split('/')[1] || 'home';
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [segment]);

  // Adjust this path as needed if your dashboard route is nested
  const hideFooter = location.pathname.startsWith('/userdashboard');

  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen">
        <ScrollProgress />
        <Navbar scrolled={scrolled} />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={segment}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        {!hideFooter && <Footer />}
      </div>
    </SmoothScroll>
  );
}

export default Layout;
