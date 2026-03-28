import React, { useState } from 'react';
import { Linkedin, Twitter, Facebook, Instagram, Youtube, ChevronUp } from 'lucide-react';

const Footer = ({ onNavigate }) => {
  const [hoveredLink, setHoveredLink] = useState(null);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

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
    contact: {
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
    { icon: Youtube, label: 'Youtube', url: 'https://youtube.com' },
  ];

  return (
    <footer style={{ background: '#000', borderTop: '1px solid #111' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">

        {/* Links grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-12">
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="space-y-4">
              <h3
                className="text-xs sm:text-sm font-black uppercase tracking-widest"
                style={{ color: '#e63030' }}
              >
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.action}
                      onMouseEnter={() => setHoveredLink(`${key}-${index}`)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="text-xs sm:text-sm text-gray-500 transition-all duration-200 text-left"
                      style={{
                        color: hoveredLink === `${key}-${index}` ? '#fff' : undefined,
                        transform: hoveredLink === `${key}-${index}` ? 'translateX(4px)' : 'translateX(0)',
                        display: 'inline-block',
                      }}
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
        <div className="my-8 sm:my-10 lg:my-14 h-px" style={{ background: '#111' }} />

        {/* Social + Back to top */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="w-9 h-9 flex items-center justify-center rounded transition-all duration-300"
                style={{ border: '1px solid #1f1f1f', color: '#555' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#e63030';
                  e.currentTarget.style.color = '#e63030';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#1f1f1f';
                  e.currentTarget.style.color = '#555';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <social.icon size={17} />
              </a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-500 transition-colors hover:text-white"
          >
            Back to top
            <div
              className="w-8 h-8 flex items-center justify-center rounded transition-all duration-300"
              style={{ border: '1px solid #222' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#e63030'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#222'}
            >
              <ChevronUp size={15} />
            </div>
          </button>
        </div>

        {/* Divider */}
        <div className="my-8 h-px" style={{ background: '#111' }} />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <div className="flex flex-wrap gap-5">
            {[
              { label: 'Home', section: 'hero' },
              { label: 'Services', section: 'services' },
              { label: 'About', section: 'whoWeAre' },
              { label: 'Contact', section: 'contact' },
            ].map((l) => (
              <button
                key={l.label}
                onClick={() => onNavigate && onNavigate(l.section)}
                className="hover:text-white transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
          <p>© 2025 Amanura Tech Solutions, all rights reserved</p>
        </div>
      </div>

      {/* Red bottom bar */}
      <div className="h-0.5" style={{ background: '#e63030', boxShadow: '0 0 20px rgba(230,48,48,0.5)' }} />
    </footer>
  );
};

export default Footer;