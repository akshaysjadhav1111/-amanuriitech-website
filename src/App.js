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

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeProjectTab, setActiveProjectTab] = useState('web');

  // Create refs for each section
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const servicesRef = useRef(null);
  const projectsRef = useRef(null);
  const whoWeAreRef = useRef(null);
  const contactRef = useRef(null);

  const handleNavigation = (section, projectType = null) => {
    // If navigating to "Our Process", change page
    if (section === 'ourProcess') {
      setCurrentPage('ourProcess');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Otherwise, navigate within home page
    if (currentPage !== 'home') {
      setCurrentPage('home');
    }

    // Set active project tab if specified
    if (projectType) {
      setActiveProjectTab(projectType);
    }

    // Scroll to section with offset for fixed navbar
    setTimeout(() => {
      let targetRef = null;
      switch (section) {
        case 'hero':
          targetRef = heroRef;
          break;
        case 'stats':
          targetRef = statsRef;
          break;
        case 'services':
          targetRef = servicesRef;
          break;
        case 'projects':
          targetRef = projectsRef;
          break;
        case 'whoWeAre':
          targetRef = whoWeAreRef;
          break;
        case 'contact':
          targetRef = contactRef;
          break;
        default:
          break;
      }

      if (targetRef && targetRef.current) {
        const navbarHeight = 64;
        const elementPosition = targetRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, currentPage !== 'home' ? 100 : 0);
  };

  // Update project section when activeProjectTab changes
  useEffect(() => {
    if (projectsRef.current && activeProjectTab) {
      const event = new CustomEvent('changeProjectTab', { detail: activeProjectTab });
      window.dispatchEvent(event);
    }
  }, [activeProjectTab]);

  return (
    <div className="App">
      <Navbar onNavigate={handleNavigation} />

      {currentPage === 'home' ? (
        <>
          <div ref={heroRef}>
            <HeroSection />
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
  );
}

export default App;