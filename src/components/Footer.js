import React, { useState } from 'react';
import { Linkedin, Twitter, Facebook, Instagram, Youtube, ChevronUp } from 'lucide-react';

const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    whatWeDo: {
      title: 'What we do',
      links: [
        'Industries',
        'Services',
        'Insights'
      ]
    },
    whoWeAre: {
      title: 'Who we are',
      links: [
        'About Company',
        'Locations',
        'Annual Report',
        'Board of Directors',
        'Awards and accolades'
      ]
    },
    aiInnovation: {
      title: 'AI and innovation',
      links: [
        'AI Lab',
        'Engineering AI for impact',
        'New minds, new markets'
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        'Contact Us',
        'Careers',
        'Information for Suppliers',
        'Glossary'
      ]
    }
  };

  const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', url: '#' },
    { icon: Twitter, label: 'Twitter', url: '#' },
    { icon: Facebook, label: 'Facebook', url: '#' },
    { icon: Instagram, label: 'Instagram', url: '#' },
    { icon: Youtube, label: 'Youtube', url: '#' }
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
                    <a
                      href="#"
                      onMouseEnter={() => setHoveredLink(`${key}-${index}`)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className={`text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 inline-block ${
                        hoveredLink === `${key}-${index}` ? 'translate-x-2' : ''
                      }`}
                    >
                      {link}
                    </a>
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
            <a href="#" className="hover:text-white transition-colors duration-300">Sitemap</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy Notice</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Cookie Notice</a>
          </div>
          <p className="text-center sm:text-right">
            © 2025 Your Company, all rights reserved
          </p>
        </div>
      </div>

      {/* Gradient Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-purple-600 via-orange-500 to-purple-600"></div>
    </footer>
  );
};

export default Footer;