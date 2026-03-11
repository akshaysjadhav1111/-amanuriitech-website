import React, { useState } from 'react';
import { Linkedin, Twitter, Facebook, Instagram, Youtube, ChevronUp } from 'lucide-react';

const Footer = ({ onNavigate }) => {
  const [hoveredLink, setHoveredLink] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    whatWeDo: {
      title: 'What we do',
      links: [
        { label: 'Web Development', action: () => onNavigate && onNavigate('projects', 'web') },
        { label: 'App Development', action: () => onNavigate && onNavigate('projects', 'app') },
        { label: 'AI & Machine Learning', action: () => onNavigate && onNavigate('projects', 'ai') },
      ]
    },
    whoWeAre: {
      title: 'Who we are',
      links: [
        { label: 'About Company', action: () => onNavigate && onNavigate('whoWeAre') },
        { label: 'Our Process', action: () => onNavigate && onNavigate('ourProcess') },
        { label: 'Our Impact', action: () => onNavigate && onNavigate('stats') },
      ]
    },
    services: {
      title: 'Services',
      links: [
        { label: 'Our Services', action: () => onNavigate && onNavigate('services') },
        { label: 'Our Projects', action: () => onNavigate && onNavigate('projects') },
        { label: 'Get Started', action: () => onNavigate && onNavigate('contact') },
      ]
    },
    resources: {
      title: 'Contact',
      links: [
        { label: 'Contact Us', action: () => onNavigate && onNavigate('contact') },
        { label: 'Free Consultation', action: () => onNavigate && onNavigate('contact') },
        { label: 'Back to Home', action: () => onNavigate && onNavigate('hero') },
      ]
    }
  };

  const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com' },
    { icon: Twitter, label: 'Twitter', url: 'https://twitter.com' },
    { icon: Facebook, label: 'Facebook', url: 'https://facebook.com' },
    { icon: Instagram, label: 'Instagram', url: 'https://instagram.com' },
    { icon: Youtube, label: 'Youtube', url: 'https://youtube.com' }
  ];

  return (
    <footer className="bg-black text-white border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-purple-400 border-b border-gray-800 pb-3">
                {section.title}
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.action}
                      onMouseEnter={() => setHoveredLink(`${key}-${index}`)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className={`text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 inline-block text-left ${
                        hoveredLink === `${key}-${index}` ? 'translate-x-2' : ''
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-8 sm:my-12 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

        {/* Social Links and Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8">
          {/* Social Media Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="group relative w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-110"
              >
                <social.icon
                  size={20}
                  className="text-gray-400 group-hover:text-white transition-colors duration-300"
                />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {social.label}
                </span>
              </a>
            ))}
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-all duration-300"
          >
            <span>Back to top</span>
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-700 group-hover:border-purple-500 group-hover:scale-110 transition-all duration-300">
              <ChevronUp size={16} className="group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </button>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

        {/* Bottom Links and Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6">
            <button onClick={() => onNavigate && onNavigate('hero')} className="hover:text-white transition-colors duration-300">Home</button>
            <button onClick={() => onNavigate && onNavigate('services')} className="hover:text-white transition-colors duration-300">Services</button>
            <button onClick={() => onNavigate && onNavigate('whoWeAre')} className="hover:text-white transition-colors duration-300">About</button>
            <button onClick={() => onNavigate && onNavigate('contact')} className="hover:text-white transition-colors duration-300">Contact</button>
          </div>
          <p className="text-center sm:text-right">
            © 2025 Amanuriitech Solutions, all rights reserved
          </p>
        </div>
      </div>

      {/* Gradient Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-purple-600 via-orange-500 to-purple-600"></div>
    </footer>
  );
};

export default Footer;