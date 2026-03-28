import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../assets/Amanuri.jpeg';

const Navbar = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [whatWeDoOpen, setWhatWeDoOpen] = useState(false);
  const [mobileWhatWeDoOpen, setMobileWhatWeDoOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setWhatWeDoOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (section, projectType = null) => {
    setMobileMenuOpen(false);
    setWhatWeDoOpen(false);
    setMobileWhatWeDoOpen(false);
    if (onNavigate) onNavigate(section, projectType);
  };

  const services = [
    { name: 'Web Development', value: 'web' },
    { name: 'App Development', value: 'app' },
    { name: 'AI & ML', value: 'ai' },
  ];

  return (
    <>
      <nav
        className="fixed w-full top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(0,0,0,0.96)' : 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(18px)',
          borderBottom: scrolled ? '1px solid #1a1a1a' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">

            {/* Logo */}
            <div
              className="flex items-center cursor-pointer logo-wrap"
              onClick={() => handleNavigation('hero')}
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
            >
              <div className={`logo-glow-ring ${logoHovered ? 'logo-glow-active' : ''}`}>
                <img
                  src={logo}
                  alt="Amanura Tech Solutions"
                  className="h-10 sm:h-14 md:h-16 lg:h-20 w-auto logo-img"
                  style={{ mixBlendMode: 'screen' }}
                />
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              <div
                className="relative"
                ref={dropdownRef}
                onMouseEnter={() => setWhatWeDoOpen(true)}
                onMouseLeave={() => setWhatWeDoOpen(false)}
              >
                <button className="nav-link flex items-center gap-1 text-sm font-semibold tracking-wide text-white">
                  What we do
                  <ChevronDown size={15} style={{ transition: 'transform 0.3s', transform: whatWeDoOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </button>
                {whatWeDoOpen && (
                  <div className="absolute top-full left-0 pt-3 w-52" style={{ animation: 'fadeDown 0.2s ease' }}>
                    <div className="overflow-hidden" style={{ background: '#0a0a0a', border: '1px solid #1f1f1f', borderRadius: '4px' }}>
                      {services.map((svc) => (
                        <button
                          key={svc.value}
                          onClick={() => handleNavigation('projects', svc.value)}
                          className="w-full text-left px-4 py-3 text-sm text-gray-400 transition-all duration-200 dropdown-item"
                          style={{ borderBottom: '1px solid #141414' }}
                        >
                          {svc.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button onClick={() => handleNavigation('ourProcess')} className="nav-link text-sm font-semibold tracking-wide text-white">
                Our Process
              </button>
              <button onClick={() => handleNavigation('whoWeAre')} className="nav-link text-sm font-semibold tracking-wide text-white">
                Who we are
              </button>
            </div>

            {/* ── LIQUID FILL CTA BUTTON ── */}
            <div className="hidden md:block">
              <button onClick={() => handleNavigation('contact')} className="liquid-btn">
                <span className="liquid-fill" />
                <span className="liquid-text">Reach Us</span>
              </button>
            </div>

            {/* Mobile burger */}
            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden" style={{ background: '#060606', borderTop: '1px solid #1a1a1a', animation: 'fadeDown 0.25s ease' }}>
            <div className="px-4 py-4 space-y-3">
              <button
                onClick={() => setMobileWhatWeDoOpen(!mobileWhatWeDoOpen)}
                className="w-full flex items-center justify-between text-sm font-semibold text-gray-300"
              >
                What we do
                <ChevronDown size={15} style={{ transform: mobileWhatWeDoOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
              </button>
              {mobileWhatWeDoOpen && (
                <div className="ml-4 space-y-3">
                  {services.map((svc) => (
                    <button key={svc.value} onClick={() => handleNavigation('projects', svc.value)} className="block w-full text-left text-sm text-gray-500 hover:text-white transition-colors">
                      {svc.name}
                    </button>
                  ))}
                </div>
              )}
              <button onClick={() => handleNavigation('ourProcess')} className="block w-full text-left text-sm font-semibold text-white hover:text-red-500 transition-colors">Our Process</button>
              <button onClick={() => handleNavigation('whoWeAre')} className="block w-full text-left text-sm font-semibold text-white hover:text-red-500 transition-colors">Who we are</button>
              <button onClick={() => handleNavigation('contact')} className="liquid-btn" style={{ width: '100%', justifyContent: 'center' }}>
                <span className="liquid-fill" />
                <span className="liquid-text">Reach Us</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        /* ── Logo wrapper & premium glow ring ── */
        .logo-wrap {
          position: relative;
        }

        .logo-glow-ring {
          position: relative;
          border-radius: 12px;
          padding: 4px;
          border: 1px solid transparent;
          transition:
            border-color 0.4s ease,
            box-shadow 0.45s ease,
            transform 0.35s ease;
        }

        .logo-glow-ring.logo-glow-active {
          border-color: rgba(230, 48, 48, 0.55);
          transform: scale(1.06);
          box-shadow:
            /* tight inner red rim */
            0 0 0 1px rgba(230, 48, 48, 0.3),
            /* close crisp glow */
            0 0 10px rgba(230, 48, 48, 0.6),
            /* mid red aura */
            0 0 28px rgba(230, 48, 48, 0.38),
            /* wide soft halo */
            0 0 60px rgba(230, 48, 48, 0.2),
            /* deep ambient bloom */
            0 0 100px rgba(230, 48, 48, 0.1);
        }

        /* Corner accent lines — top-left & bottom-right */
        .logo-glow-ring::before,
        .logo-glow-ring::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          border-color: #e63030;
          border-style: solid;
          transition: opacity 0.35s ease, width 0.35s ease, height 0.35s ease;
          opacity: 0;
        }
        .logo-glow-ring::before {
          top: -1px;
          left: -1px;
          border-width: 2px 0 0 2px;
          border-radius: 3px 0 0 0;
        }
        .logo-glow-ring::after {
          bottom: -1px;
          right: -1px;
          border-width: 0 2px 2px 0;
          border-radius: 0 0 3px 0;
        }
        .logo-glow-ring.logo-glow-active::before,
        .logo-glow-ring.logo-glow-active::after {
          opacity: 1;
          width: 14px;
          height: 14px;
        }

        .logo-img {
          display: block;
          transition: filter 0.4s ease;
        }
        .logo-glow-ring.logo-glow-active .logo-img {
          filter: drop-shadow(0 0 8px rgba(230, 48, 48, 0.7));
        }

        /* Nav link — bright white, red underline slide on hover */
        .nav-link {
          position: relative;
          color: #ffffff;
          transition: color 0.25s ease;
          padding-bottom: 3px;
          background: none;
          border: none;
          cursor: pointer;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 1.5px;
          background: #e63030;
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: #e63030; }
        .nav-link:hover::after { width: 100%; }

        .dropdown-item:hover {
          color: #e63030 !important;
          background: rgba(230,48,48,0.05);
        }

        /* ── LIQUID FILL CTA BUTTON ── */
        .liquid-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.65rem 1.9rem;
          border: 2px solid #e63030;
          border-radius: 50px;
          background: transparent;
          cursor: pointer;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-family: 'Inter', sans-serif;
          color: #e63030;
          overflow: hidden;
          transition:
            transform 0.3s ease,
            box-shadow 0.4s ease;
          white-space: nowrap;
        }

        .liquid-btn:hover {
          transform: scale(1.06);
          box-shadow:
            0 0 18px rgba(230,48,48,0.5),
            0 0 45px rgba(230,48,48,0.22),
            0 0 80px rgba(230,48,48,0.12);
        }

        .liquid-fill {
          position: absolute;
          left: -5%;
          bottom: -130%;
          width: 110%;
          height: 130%;
          border-radius: 50% 50% 0 0 / 40px 40px 0 0;
          background: #e63030;
          transition:
            bottom 0.5s cubic-bezier(0.23, 1, 0.32, 1),
            border-radius 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 0;
        }

        .liquid-btn:hover .liquid-fill {
          bottom: -5%;
          border-radius: 0;
        }

        .liquid-text {
          position: relative;
          z-index: 1;
          transition: color 0.25s ease 0.08s;
        }

        .liquid-btn:hover .liquid-text {
          color: #ffffff;
        }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default Navbar;