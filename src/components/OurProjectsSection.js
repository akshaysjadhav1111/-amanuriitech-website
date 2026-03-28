import React, { useState, useEffect } from 'react';
import { ChevronRight, Globe, Smartphone, Brain, CheckCircle } from 'lucide-react';

const OurProjectsSection = ({ initialTab = 'web' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const handleTabChange = (e) => setActiveTab(e.detail);
    window.addEventListener('changeProjectTab', handleTabChange);
    return () => window.removeEventListener('changeProjectTab', handleTabChange);
  }, []);

  useEffect(() => setActiveTab(initialTab), [initialTab]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.15 }
    );
    document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const projects = {
    web: {
      title: 'Web Development', icon: Globe,
      items: [
        { name: 'E-Commerce Platform', desc: 'Full-featured online store with payment integration, inventory management, and real-time analytics dashboard' },
        { name: 'Corporate Website Redesign', desc: 'Modern, responsive website with CMS integration, SEO optimization, and enhanced user experience' },
        { name: 'SaaS Dashboard Application', desc: 'Cloud-based platform with advanced data visualization, user management, and API integrations' },
        { name: 'Real Estate Portal', desc: 'Property listing platform with advanced search filters, virtual tours, and lead management system' },
        { name: 'Healthcare Appointment System', desc: 'Patient portal with online booking, electronic health records, and telemedicine capabilities' },
        { name: 'Educational Learning Platform', desc: 'Interactive e-learning system with course management, progress tracking, and certification features' },
      ]
    },
    app: {
      title: 'App Development', icon: Smartphone,
      items: [
        { name: 'Fitness Tracking App', desc: 'Cross-platform mobile app with workout plans, nutrition tracking, and social community features' },
        { name: 'Food Delivery Application', desc: 'On-demand delivery app with real-time tracking, payment gateway, and restaurant management system' },
        { name: 'Banking & Finance App', desc: 'Secure mobile banking solution with biometric authentication, transaction history, and investment tracking' },
        { name: 'Social Networking Platform', desc: 'Feature-rich social app with messaging, content sharing, and AI-powered recommendation engine' },
        { name: 'Travel Booking App', desc: 'Comprehensive travel solution with flight/hotel booking, itinerary planning, and travel guides' },
        { name: 'Smart Home Controller', desc: 'IoT mobile application for controlling smart devices, automation routines, and energy monitoring' },
      ]
    },
    ai: {
      title: 'AI & ML', icon: Brain,
      items: [
        { name: 'Predictive Analytics Engine', desc: 'Machine learning model for sales forecasting, customer behavior prediction, and market trend analysis' },
        { name: 'Computer Vision System', desc: 'AI-powered image recognition for quality control, object detection, and automated inspection processes' },
        { name: 'Natural Language Processing Bot', desc: 'Intelligent chatbot with sentiment analysis, intent recognition, and multi-language support' },
        { name: 'Recommendation System', desc: 'Personalized content recommendation engine using collaborative filtering and deep learning algorithms' },
        { name: 'Fraud Detection Platform', desc: 'Real-time anomaly detection system using ML models for transaction monitoring and risk assessment' },
        { name: 'AI Document Processing', desc: 'Automated document classification, data extraction, and intelligent workflow routing system' },
      ]
    }
  };

  return (
    <div style={{ background: '#000' }}>
      <section className="py-8 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="fade-in-section text-center mb-14 sm:mb-20">
            <div
              className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded"
              style={{ background: 'rgba(230,48,48,0.08)', border: '1px solid rgba(230,48,48,0.2)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block" />
              <span className="text-xs font-bold tracking-widest uppercase text-red-500">Our Portfolio</span>
            </div>

            <h2
              className="font-black leading-none mb-5"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2.2rem, 7vw, 5.5rem)',
                letterSpacing: '0.02em',
              }}
            >
              OUR{' '}
              <span style={{ color: '#e63030' }}>PROJECTS</span>
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', lineHeight: 1.7 }}>
              Innovative solutions delivered across web, mobile, and AI technologies
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-start sm:justify-center gap-2 mb-10 sm:mb-14 flex-nowrap sm:flex-wrap overflow-x-auto pb-2 px-1 -mx-1" style={{ scrollbarWidth: 'none' }}>
            {Object.entries(projects).map(([key, { title, icon: Icon }]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className="flex items-center gap-2 px-4 py-2 rounded text-xs font-bold transition-all duration-300 flex-shrink-0"
                style={{
                  background: activeTab === key ? '#e63030' : '#0d0d0d',
                  border: activeTab === key ? 'none' : '1px solid #222',
                  color: activeTab === key ? '#fff' : '#666',
                  boxShadow: activeTab === key ? '0 0 20px rgba(230,48,48,0.3)' : 'none',
                }}
              >
                <Icon size={16} />
                {title}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {projects[activeTab].items.map((item, index) => (
              <div
                key={index}
                className="group p-5 sm:p-6 rounded cursor-pointer transition-all duration-300"
                style={{
                  background: '#080808',
                  border: '1px solid #1a1a1a',
                  transitionDelay: `${index * 50}ms`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#e63030';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(230,48,48,0.12)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#1a1a1a';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle size={18} style={{ color: '#e63030', flexShrink: 0, marginTop: 2 }} />
                  <h3 className="font-bold text-white" style={{ fontSize: '1rem', lineHeight: 1.4 }}>
                    {item.name}
                  </h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: '#e63030' }}>
                  Learn more
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-20" style={{ borderTop: '1px solid #111' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="fade-in-section">
            <h2
              className="font-black leading-none mb-5"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(1.8rem, 5vw, 4.5rem)',
                letterSpacing: '0.02em',
              }}
            >
              READY TO BUILD YOUR{' '}
              <span style={{ color: '#e63030' }}>NEXT PROJECT?</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto text-base">
              Let's collaborate to bring your vision to life with cutting-edge technology solutions.
            </p>
            <button className="proj-liquid-btn flex items-center gap-2 mx-auto group">
              <span className="proj-liquid-fill" />
              <span className="proj-liquid-text flex items-center gap-2">
                Start Your Project
                <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>
      <style>{`
        .proj-liquid-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.85rem 2.2rem;
          border: 2px solid #e63030;
          border-radius: 50px;
          background: transparent;
          cursor: pointer;
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          font-family: 'Inter', sans-serif;
          color: #e63030;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.4s ease;
        }
        .proj-liquid-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 18px rgba(230,48,48,0.5), 0 0 50px rgba(230,48,48,0.22), 0 0 90px rgba(230,48,48,0.12);
        }
        .proj-liquid-fill {
          position: absolute;
          left: -5%;
          bottom: -130%;
          width: 110%;
          height: 130%;
          border-radius: 50% 50% 0 0 / 40px 40px 0 0;
          background: #e63030;
          transition: bottom 0.5s cubic-bezier(0.23, 1, 0.32, 1), border-radius 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 0;
        }
        .proj-liquid-btn:hover .proj-liquid-fill { bottom: -5%; border-radius: 0; }
        .proj-liquid-text { position: relative; z-index: 1; transition: color 0.25s ease 0.08s; }
        .proj-liquid-btn:hover .proj-liquid-text { color: #ffffff; }
      `}</style>
    </div>
  );
};

export default OurProjectsSection;