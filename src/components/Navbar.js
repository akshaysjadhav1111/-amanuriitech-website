import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../assets/Amanuri.png';

const Navbar = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [whatWeDoOpen, setWhatWeDoOpen] = useState(false);
  const [mobileWhatWeDoOpen, setMobileWhatWeDoOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
    if (onNavigate) {
      onNavigate(section, projectType);
    }
  };

  const services = [
    { name: 'Web Development', value: 'web' },
    { name: 'App Development', value: 'app' },
    { name: 'AI & ML', value: 'ai' }
  ];

  return (
    <nav className="bg-black/60 backdrop-blur-md text-white fixed w-full top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">

          {/* Logo */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => handleNavigation('hero')}
          >
            <img
              src={logo}
              alt="Amanuriitech Solutions"
              className="h-14 sm:h-16 md:h-20 w-auto transition-all duration-500 group-hover:scale-105 animate-logoFadeIn"
              style={{ background: 'transparent', mixBlendMode: 'screen' }}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setWhatWeDoOpen(true)}
              onMouseLeave={() => setWhatWeDoOpen(false)}
            >
              <button className="flex items-center space-x-1 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-orange-400 cursor-pointer transition-all duration-300 text-base font-medium py-2">
                <span>What we do</span>
                <ChevronDown
                  size={18}
                  className={`transform transition-transform duration-300 ${whatWeDoOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {whatWeDoOpen && (
                <div className="absolute top-full left-0 pt-2 w-56">
                  <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-2xl shadow-purple-500/20 overflow-hidden animate-fadeIn">
                    {services.map((service, index) => (
                      <button
                        key={service.value}
                        onClick={() => handleNavigation('projects', service.value)}
                        className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-orange-500/20 transition-all duration-300 border-b border-gray-800 last:border-b-0 group"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <span className="text-sm font-medium text-gray-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-orange-400 transition-all duration-300">
                          {service.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavigation('ourProcess')}
              className="text-base font-medium hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-orange-400 cursor-pointer transition-all duration-300"
            >
              Our Process
            </button>

            <button
              onClick={() => handleNavigation('whoWeAre')}
              className="text-base font-medium hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-orange-400 cursor-pointer transition-all duration-300"
            >
              Who we are
            </button>
          </div>

          {/* Reach Us Button */}
          <div className="hidden md:block">
            <button
              onClick={() => handleNavigation('contact')}
              className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white px-8 py-3 rounded-lg text-base font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
            >
              Reach Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-purple-400 transition-colors"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-md border-t border-white/10 animate-slideDown">
          <div className="px-4 py-4 space-y-4">
            <div>
              <button
                onClick={() => setMobileWhatWeDoOpen(!mobileWhatWeDoOpen)}
                className="w-full flex items-center justify-between text-base font-medium hover:text-purple-400 transition-colors"
              >
                <span>What we do</span>
                <ChevronDown
                  size={18}
                  className={`transform transition-transform duration-300 ${mobileWhatWeDoOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {mobileWhatWeDoOpen && (
                <div className="mt-2 ml-4 space-y-2 animate-fadeIn">
                  {services.map((service) => (
                    <button
                      key={service.value}
                      onClick={() => handleNavigation('projects', service.value)}
                      className="block w-full text-left text-sm text-gray-400 hover:text-purple-400 py-2 transition-colors"
                    >
                      {service.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavigation('ourProcess')}
              className="block w-full text-left text-base font-medium hover:text-purple-400 transition-colors"
            >
              Our Process
            </button>

            <button
              onClick={() => handleNavigation('whoWeAre')}
              className="block w-full text-left text-base font-medium hover:text-purple-400 transition-colors"
            >
              Who we are
            </button>

            <button
              onClick={() => handleNavigation('contact')}
              className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300"
            >
              Reach Us
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes logoFadeIn {
          0% { opacity: 0; transform: scale(0.8) translateY(-20px); }
          60% { transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
        .animate-logoFadeIn { animation: logoFadeIn 0.8s ease-out; }
      `}</style>
    </nav>
  );
};

export default Navbar;