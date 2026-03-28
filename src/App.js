import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsImpactSection from './components/StatsImpactSection';
import ServicesStackedCards from './components/ServicesStackedCards';
import OurProjectsSection from './components/OurProjectsSection';
import WhoWeAreSection from './components/WhoWeAreSection';
import ContactSection from './components/ContactSection';
import OurProcessPage from './components/OurProcessPage';
import Footer from './components/Footer';

// ── Site Loader ────────────────────────────────────────────────────────────
const SiteLoader = ({ onDone }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const el = document.getElementById('site-loader');
      if (el) {
        el.classList.add('hide');
        setTimeout(onDone, 650);
      } else {
        onDone();
      }
    }, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div id="site-loader">
      <div className="loader-logo">
        AMANURA<span> TECH</span>
      </div>
      <div className="loader-bar-wrap">
        <div className="loader-bar" />
      </div>
      <div className="loader-text">Loading experience…</div>
    </div>
  );
};

// ── Back To Top Button ─────────────────────────────────────────────────────
const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <button
        onClick={scrollToTop}
        className="back-to-top-btn"
        style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'all' : 'none' }}
        aria-label="Back to top"
      >
        {/* Arrow up */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

      <style>{`
        .back-to-top-btn {
          position: fixed;
          bottom: 32px;
          right: 28px;
          z-index: 999;

          width: 52px;
          height: 52px;
          border-radius: 50%;

          background: #0a0a0a;
          border: none;
          cursor: pointer;

          display: flex;
          align-items: center;
          justify-content: center;

          /* Red glowing ring — exactly like erisstech */
          box-shadow:
            0 0 0 2px rgba(230, 48, 48, 0.85),
            0 0 12px rgba(230, 48, 48, 0.55),
            0 0 28px rgba(230, 48, 48, 0.25),
            0 0 55px rgba(230, 48, 48, 0.12);

          transition:
            opacity 0.4s ease,
            transform 0.3s ease,
            box-shadow 0.35s ease;
        }

        .back-to-top-btn:hover {
          transform: translateY(-4px) scale(1.08);
          box-shadow:
            0 0 0 2px rgba(230, 48, 48, 1),
            0 0 18px rgba(230, 48, 48, 0.75),
            0 0 40px rgba(230, 48, 48, 0.4),
            0 0 80px rgba(230, 48, 48, 0.2);
        }

        @media (max-width: 640px) {
          .back-to-top-btn {
            bottom: 20px;
            right: 16px;
            width: 46px;
            height: 46px;
          }
        }
      `}</style>
    </>
  );
};

// ── App ────────────────────────────────────────────────────────────────────
function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [activeProjectTab, setActiveProjectTab] = useState('web');

  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const servicesRef = useRef(null);
  const projectsRef = useRef(null);
  const whoWeAreRef = useRef(null);
  const contactRef = useRef(null);

  const handleNavigation = (section, projectType = null) => {
    if (section === 'ourProcess') {
      setCurrentPage('ourProcess');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentPage !== 'home') setCurrentPage('home');
    if (projectType) setActiveProjectTab(projectType);

    setTimeout(() => {
      const refMap = {
        hero: heroRef,
        stats: statsRef,
        services: servicesRef,
        projects: projectsRef,
        whoWeAre: whoWeAreRef,
        contact: contactRef,
      };
      const targetRef = refMap[section];
      if (targetRef?.current) {
        const navH = 80;
        const pos = targetRef.current.getBoundingClientRect().top + window.pageYOffset - navH;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    }, currentPage !== 'home' ? 120 : 0);
  };

  useEffect(() => {
    if (projectsRef.current && activeProjectTab) {
      window.dispatchEvent(new CustomEvent('changeProjectTab', { detail: activeProjectTab }));
    }
  }, [activeProjectTab]);

  return (
    <div className="App" style={{ background: '#000', minHeight: '100vh' }}>
      {loading && <SiteLoader onDone={() => setLoading(false)} />}

      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.4s ease' }}>
        <Navbar onNavigate={handleNavigation} />

        {currentPage === 'home' ? (
          <>
            <div ref={heroRef}>
              <HeroSection onNavigate={handleNavigation} />
            </div>
            <div ref={statsRef}>
              <StatsImpactSection />
            </div>
            <div ref={servicesRef}>
              <ServicesStackedCards onNavigate={handleNavigation} />
            </div>
            <div ref={projectsRef}>
              <OurProjectsSection initialTab={activeProjectTab} />
            </div>
            <div ref={whoWeAreRef}>
              <WhoWeAreSection />
            </div>
            <div ref={contactRef}>
              <ContactSection />
            </div>
            <Footer onNavigate={handleNavigation} />
          </>
        ) : currentPage === 'ourProcess' ? (
          <>
            <OurProcessPage onNavigate={handleNavigation} />
            <Footer onNavigate={handleNavigation} />
          </>
        ) : null}
      </div>

      {/* Back to top — always rendered, fades in after 300px scroll */}
      <BackToTop />
    </div>
  );
}

export default App;