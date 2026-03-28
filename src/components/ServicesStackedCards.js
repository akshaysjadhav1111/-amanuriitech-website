import React, { useState, useEffect, useRef } from 'react';
import { Globe, Smartphone, Brain, ArrowRight, Check } from 'lucide-react';

const ServicesSection = ({ onNavigate }) => {
  const [activeService, setActiveService] = useState(0);
  const serviceRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute('data-svc-index'));
            if (!isNaN(idx)) setActiveService(idx);
          }
        });
      },
      { threshold: 0.5 }
    );
    serviceRefs.current.forEach(el => { if (el) scrollObserver.observe(el); });
    return () => scrollObserver.disconnect();
  }, []);

  const services = [
    {
      number: '01',
      icon: Globe,
      title: 'Web Development',
      subtitle: 'Your Digital Storefront',
      description: "We build websites and web applications that don't just look great — they convert visitors into customers. Fast, responsive, and built to scale with your business.",
      features: [
        'Custom Website Design & Development',
        'E-Commerce Stores (Shopify, WooCommerce)',
        'Web App & SaaS Platforms',
        'CMS Integration (WordPress, Strapi)',
        'SEO-Optimized & Performance Tuned',
        'API Development & Integration',
      ],
      techStack: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'MongoDB', 'AWS'],
      badge: 'Most Popular',
      bgGradient: 'linear-gradient(135deg, #1a0000 0%, #3d0000 50%, #1a0000 100%)',
      accentColor: '#e63030',
    },
    {
      number: '02',
      icon: Smartphone,
      title: 'App Development',
      subtitle: 'Mobile Experiences That Stick',
      description: 'From idea to App Store — we build native and cross-platform mobile apps that users love using every day. Smooth, fast, and beautifully designed.',
      features: [
        'iOS & Android Native Apps',
        'Cross-Platform Apps (React Native, Flutter)',
        'UI/UX Design & Prototyping',
        'Push Notifications & Real-Time Features',
        'App Store Submission & Support',
        'Backend & API Integration',
      ],
      techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Expo'],
      badge: 'Fast Delivery',
      bgGradient: 'linear-gradient(135deg, #0d0d0d 0%, #1f1f1f 50%, #0d0d0d 100%)',
      accentColor: '#e63030',
    },
    {
      number: '03',
      icon: Brain,
      title: 'AI & Machine Learning',
      subtitle: 'Intelligence Built Into Your Product',
      description: 'We integrate AI into your business so it works smarter, not harder. From chatbots that never sleep to models that predict what your customers need next.',
      features: [
        'Custom AI Chatbots & Virtual Assistants',
        'Predictive Analytics & Forecasting',
        'Computer Vision & Image Recognition',
        'Natural Language Processing (NLP)',
        'ML Model Training & Deployment',
        'AI Workflow Automation',
      ],
      techStack: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'LangChain', 'FastAPI'],
      badge: 'Future-Ready',
      bgGradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a0505 50%, #0a0a0a 100%)',
      accentColor: '#e63030',
    },
  ];

  return (
    <section className="py-8 sm:py-20 lg:py-28 relative overflow-hidden" style={{ background: '#000' }}>
      {/* BG glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(230,48,48,0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/3 -right-32 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(230,48,48,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="fade-in-section text-center mb-16 sm:mb-24">
          <div
            className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded"
            style={{ background: 'rgba(230,48,48,0.08)', border: '1px solid rgba(230,48,48,0.2)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block" />
            <span className="text-xs font-bold tracking-widest uppercase text-red-500">What We Build</span>
          </div>

          <h2
            className="font-black leading-none mb-5"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2.2rem, 7vw, 6rem)',
              letterSpacing: '0.02em',
            }}
          >
            OUR{' '}
            <span style={{ color: '#e63030' }}>SERVICES</span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', lineHeight: 1.7 }}>
            Three core services. Infinite possibilities. Everything your business needs to win online.
          </p>

          {/* Jump pills */}
          <div className="flex justify-center gap-3 mt-8 flex-wrap">
            {services.map((svc, i) => (
              <button
                key={i}
                onClick={() => serviceRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                className="flex items-center gap-2 px-4 py-2 rounded text-xs font-bold transition-all duration-300"
                style={{
                  border: activeService === i ? 'none' : '1px solid #2a2a2a',
                  background: activeService === i ? '#e63030' : 'transparent',
                  color: activeService === i ? '#fff' : '#555',
                }}
              >
                <svc.icon size={13} />
                {svc.title}
              </button>
            ))}
          </div>
        </div>

        {/* Service Cards */}
        <div className="space-y-14 sm:space-y-20 lg:space-y-32">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                ref={el => serviceRefs.current[index] = el}
                data-svc-index={index}
                className={`fade-in-section flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-20 items-center`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {/* Visual Card */}
                <div className="w-full lg:w-5/12">
                  <div
                    className="relative rounded-xl p-8 sm:p-10 overflow-hidden"
                    style={{
                      background: service.bgGradient,
                      border: '1px solid rgba(230,48,48,0.15)',
                      minHeight: '260px',
                    }}
                  >
                    {/* Decorative circles */}
                    <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full"
                      style={{ border: '1px solid rgba(255,255,255,0.04)' }} />
                    <div className="absolute -bottom-16 -left-8 w-64 h-64 rounded-full"
                      style={{ border: '1px solid rgba(255,255,255,0.02)' }} />

                    {/* Number watermark */}
                    <div
                      className="absolute bottom-4 right-6 select-none leading-none"
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: '8rem',
                        color: 'rgba(255,255,255,0.04)',
                      }}
                    >
                      {service.number}
                    </div>

                    <div className="relative z-10">
                      {/* Badge */}
                      <div
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold mb-6"
                        style={{ background: 'rgba(230,48,48,0.15)', border: '1px solid rgba(230,48,48,0.3)', color: '#e63030' }}
                      >
                        {service.badge}
                      </div>

                      {/* Icon */}
                      <div
                        className="w-14 h-14 rounded flex items-center justify-center mb-5"
                        style={{ background: 'rgba(230,48,48,0.12)', border: '1px solid rgba(230,48,48,0.25)' }}
                      >
                        <Icon size={28} style={{ color: '#e63030' }} />
                      </div>

                      <h3
                        className="text-white mb-1"
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: 'clamp(1.6rem, 5vw, 3rem)',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {service.title}
                      </h3>
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                        {service.subtitle}
                      </p>
                    </div>

                    {/* Tech chips */}
                    <div className="relative z-10 flex flex-wrap gap-2 mt-8">
                      {service.techStack.map((tech, ti) => (
                        <span
                          key={ti}
                          className="px-2.5 py-1 rounded text-xs font-semibold text-gray-400"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`w-full lg:w-7/12 space-y-6 ${isEven ? 'lg:pl-4' : 'lg:pr-4'}`}>
                  <div className="flex items-center gap-3">
                    <div className="h-px w-10" style={{ background: '#e63030' }} />
                    <span className="text-xs font-black tracking-widest text-gray-600 uppercase">
                      Service {service.number}
                    </span>
                  </div>

                  <div>
                    <h3
                      className="font-black mb-3 leading-tight"
                      style={{ fontSize: 'clamp(1.4rem, 4vw, 2.8rem)', letterSpacing: '-0.01em' }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed" style={{ fontSize: '1rem' }}>
                      {service.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feat, fi) => (
                      <div key={fi} className="flex items-start gap-2.5">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: 'rgba(230,48,48,0.12)', border: '1px solid rgba(230,48,48,0.3)' }}
                        >
                          <Check size={9} style={{ color: '#e63030' }} />
                        </div>
                        <span className="text-sm text-gray-400">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onNavigate && onNavigate('contact')}
                      className="svc-liquid-btn group"
                    >
                      <span className="svc-liquid-fill" />
                      <span className="svc-liquid-text flex items-center gap-2">
                        Get Started
                        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className="fade-in-section mt-24 sm:mt-32 rounded-xl p-8 sm:p-14 text-center relative overflow-hidden"
          style={{ background: '#080808', border: '1px solid #1a1a1a' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(230,48,48,0.07) 0%, transparent 70%)' }}
          />
          <div className="relative z-10">
            <h3
              className="font-black mb-4"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                letterSpacing: '0.04em',
              }}
            >
              NOT SURE WHICH SERVICE YOU NEED?
            </h3>
            <p className="text-gray-500 mb-8 max-w-xl mx-auto text-base">
              Tell us about your project and we'll recommend exactly what you need — no upselling, no fluff.
            </p>
            <button
              onClick={() => onNavigate && onNavigate('contact')}
              className="svc-liquid-btn mx-auto group"
            >
              <span className="svc-liquid-fill" />
              <span className="svc-liquid-text flex items-center gap-2">
                Talk to Us for Free
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
      <style>{`
        .svc-liquid-btn {
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
        .svc-liquid-btn:hover {
          transform: scale(1.05);
          box-shadow:
            0 0 18px rgba(230,48,48,0.5),
            0 0 50px rgba(230,48,48,0.22),
            0 0 90px rgba(230,48,48,0.12);
        }
        .svc-liquid-fill {
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
        .svc-liquid-btn:hover .svc-liquid-fill {
          bottom: -5%;
          border-radius: 0;
        }
        .svc-liquid-text {
          position: relative;
          z-index: 1;
          transition: color 0.25s ease 0.08s;
        }
        .svc-liquid-btn:hover .svc-liquid-text {
          color: #ffffff;
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;