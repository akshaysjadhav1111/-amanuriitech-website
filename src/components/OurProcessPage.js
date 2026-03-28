import React, { useState, useEffect, useRef } from 'react';
import { Search, Paintbrush, Code2, FlaskConical, Rocket, HeartHandshake, ArrowRight } from 'lucide-react';

const OurProcessPage = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute('data-step'));
            if (!isNaN(idx)) setActiveStep(idx);
          }
        });
      },
      { threshold: 0.6 }
    );
    stepRefs.current.forEach(el => { if (el) stepObserver.observe(el); });
    return () => stepObserver.disconnect();
  }, []);

  const steps = [
    {
      number: '01', icon: Search, title: 'Discovery', subtitle: 'We Listen First',
      description: "Before a single line of code is written, we sit down and deeply understand your business, your goals, your users, and your challenges. Most agencies skip this — we don't.",
      details: ['In-depth requirement gathering', 'Competitor & market analysis', 'Technical feasibility review', 'Project scope & timeline definition'],
      duration: '1–2 weeks',
    },
    {
      number: '02', icon: Paintbrush, title: 'Design', subtitle: 'Blueprinting Your Vision',
      description: "We transform ideas into visual blueprints. Every screen, every interaction, every user journey is carefully crafted before we build — so you see exactly what you're getting.",
      details: ['UI/UX wireframing', 'Interactive prototypes', 'Brand-aligned visual design', 'Client review & approval'],
      duration: '1–3 weeks',
    },
    {
      number: '03', icon: Code2, title: 'Develop', subtitle: 'Building With Precision',
      description: 'Our engineers get to work — writing clean, scalable, and maintainable code. We use modern technologies and agile sprints so you see progress every single week.',
      details: ['Agile sprint-based development', 'Weekly progress updates', 'Clean & documented code', 'Regular client demos'],
      duration: '4–12 weeks',
    },
    {
      number: '04', icon: FlaskConical, title: 'Test', subtitle: 'Zero Compromise on Quality',
      description: "We break things so your users don't have to. Rigorous testing across devices, browsers, and edge cases ensures your product works perfectly before it ever goes live.",
      details: ['Functional & regression testing', 'Cross-device & browser testing', 'Performance & load testing', 'Security vulnerability checks'],
      duration: '1–2 weeks',
    },
    {
      number: '05', icon: Rocket, title: 'Launch', subtitle: 'Go Live, Stress-Free',
      description: 'Launch day should be exciting, not stressful. We handle the entire deployment process — from server setup to DNS configuration — so everything goes live without a hitch.',
      details: ['Server setup & configuration', 'Smooth deployment pipeline', 'Performance monitoring', 'Launch day support'],
      duration: '1 week',
    },
    {
      number: '06', icon: HeartHandshake, title: 'Support', subtitle: "We Don't Disappear",
      description: "Unlike agencies that vanish after launch, we stay. We monitor, maintain, and continuously improve your product — because your long-term success is our success.",
      details: ['Ongoing maintenance & updates', 'Performance optimization', 'Feature enhancements', 'Priority bug fixes'],
      duration: 'Ongoing',
    },
  ];

  return (
    <div className="text-white min-h-screen pt-16 sm:pt-20" style={{ background: '#000' }}>

      {/* Back Button */}
      <div className="fixed top-28 sm:top-32 left-4 sm:left-8 z-40">
        <button
          onClick={() => onNavigate && onNavigate('hero')}
          className="flex items-center gap-2 text-sm font-bold transition-all duration-200"
          style={{
            background: '#0d0d0d',
            border: '1px solid #222',
            color: '#888',
            padding: '0.6rem 1.2rem',
            borderRadius: '4px',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#e63030';
            e.currentTarget.style.color = '#e63030';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#222';
            e.currentTarget.style.color = '#888';
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Back to Home
        </button>
      </div>

      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(230,48,48,0.07) 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            id="hero-title"
            data-animate
            className="text-center"
            style={{ transition: 'all 1s ease', opacity: isVisible['hero-title'] ? 1 : 0, transform: isVisible['hero-title'] ? 'translateY(0)' : 'translateY(30px)' }}
          >
            <div
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded"
              style={{ background: 'rgba(230,48,48,0.08)', border: '1px solid rgba(230,48,48,0.25)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#e63030' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#e63030' }}>
                How We Work
              </span>
            </div>

            <h1
              className="font-black leading-none mb-6"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2.8rem, 11vw, 8rem)',
                letterSpacing: '0.02em',
              }}
            >
              OUR{' '}
              <span style={{ color: '#e63030' }}>PROCESS</span>
            </h1>

            <p className="text-gray-400 max-w-2xl mx-auto mb-10"
              style={{ fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', lineHeight: 1.8 }}>
              No surprises. No guesswork. Just a clear, proven path from your idea to a product your users will love.
            </p>

            {/* Step pills */}
            <div className="flex justify-center gap-2 flex-wrap">
              {steps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => stepRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  className="px-3 py-1.5 rounded text-xs font-black transition-all duration-300"
                  style={{
                    background: activeStep === i ? '#e63030' : 'transparent',
                    border: activeStep === i ? 'none' : '1px solid #222',
                    color: activeStep === i ? '#fff' : '#444',
                    transform: activeStep === i ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {step.number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-6 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Timeline line — desktop */}
            <div
              className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ background: 'linear-gradient(to bottom, rgba(230,48,48,0.5), rgba(230,48,48,0.1), transparent)' }}
            />

            <div className="space-y-16 sm:space-y-24">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isEven = index % 2 === 0;
                const vis = isVisible[`step-${index}`];

                return (
                  <div
                    key={index}
                    ref={el => stepRefs.current[index] = el}
                    data-step={index}
                    id={`step-${index}`}
                    data-animate
                    className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-0 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                    style={{
                      transition: `all 0.9s ease ${index * 80}ms`,
                      opacity: vis ? 1 : 0,
                      transform: vis ? 'translateY(0)' : 'translateY(30px)',
                    }}
                  >
                    {/* Content */}
                    <div className={`w-full lg:w-5/12 ${isEven ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:text-left'}`}>
                      <div
                        className="p-6 sm:p-8 rounded"
                        style={{
                          background: '#080808',
                          border: '1px solid #1a1a1a',
                          transition: 'border-color 0.3s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = '#e63030'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a1a'}
                      >
                        {/* Duration badge */}
                        <div
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold mb-4"
                          style={{ background: '#0d0d0d', border: '1px solid #222', color: '#555' }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#e63030' }} />
                          {step.duration}
                        </div>

                        <h3
                          className="font-black mb-1"
                          style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                            letterSpacing: '0.04em',
                            color: activeStep === index ? '#e63030' : '#fff',
                            transition: 'color 0.3s',
                          }}
                        >
                          {step.title}
                        </h3>
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-4">
                          {step.subtitle}
                        </p>
                        <p className="text-gray-400 leading-relaxed text-sm sm:text-base mb-5">
                          {step.description}
                        </p>

                        <ul className={`space-y-2 flex flex-col ${isEven ? 'lg:items-end' : ''}`}>
                          {step.details.map((detail, di) => (
                            <li
                              key={di}
                              className={`flex items-center gap-2 text-sm text-gray-500 ${isEven ? 'lg:flex-row-reverse' : ''}`}
                            >
                              <span style={{ color: '#e63030', fontSize: '0.75rem' }}>▶</span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Center node — desktop */}
                    <div className="hidden lg:flex w-2/12 justify-center relative z-10">
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center relative"
                        style={{
                          background: activeStep === index ? '#e63030' : '#1a1a1a',
                          border: `2px solid ${activeStep === index ? '#e63030' : '#2a2a2a'}`,
                          boxShadow: activeStep === index ? '0 0 30px rgba(230,48,48,0.4), 0 0 60px rgba(230,48,48,0.15)' : 'none',
                          transition: 'all 0.4s ease',
                          transform: activeStep === index ? 'scale(1.2)' : 'scale(1)',
                        }}
                      >
                        <Icon size={26} style={{ color: activeStep === index ? '#fff' : '#444' }} />
                        <div
                          className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-black"
                          style={{ color: '#333', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.06em' }}
                        >
                          {step.number}
                        </div>
                      </div>
                    </div>

                    {/* Mobile icon */}
                    <div className="lg:hidden flex items-center gap-4 w-full">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: '#e63030' }}
                      >
                        <Icon size={22} style={{ color: '#fff' }} />
                      </div>
                      <span
                        className="font-black"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '4rem', color: '#111', lineHeight: 1 }}
                      >
                        {step.number}
                      </span>
                    </div>

                    <div className="hidden lg:block w-5/12" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Our Process Works */}
      <section className="py-16 sm:py-20 mt-12" style={{ borderTop: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="why-section"
            data-animate
            className="text-center mb-12"
            style={{ transition: 'all 1s ease', opacity: isVisible['why-section'] ? 1 : 0, transform: isVisible['why-section'] ? 'translateY(0)' : 'translateY(30px)' }}
          >
            <h2
              className="font-black leading-none mb-4"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                letterSpacing: '0.02em',
              }}
            >
              WHY OUR PROCESS{' '}
              <span style={{ color: '#e63030' }}>WORKS</span>
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto">
              Every step is designed to keep you in control, eliminate surprises, and deliver results you're proud of.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { title: 'Transparent', desc: 'You always know exactly where your project stands. Weekly updates, no radio silence.', emoji: '👁️' },
              { title: 'Fast', desc: 'Agile sprints mean you see real progress every week — not just at the end of months.', emoji: '⚡' },
              { title: 'Reliable', desc: '100% on-time delivery. We set realistic timelines and we stick to them.', emoji: '🎯' },
            ].map((item, i) => (
              <div
                key={i}
                id={`why-${i}`}
                data-animate
                className="p-7 sm:p-9 rounded text-center"
                style={{
                  background: '#080808',
                  border: '1px solid #1a1a1a',
                  transition: `all 0.9s ease ${i * 150}ms`,
                  opacity: isVisible[`why-${i}`] ? 1 : 0,
                  transform: isVisible[`why-${i}`] ? 'translateY(0)' : 'translateY(20px)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#e63030';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#1a1a1a';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3
                  className="font-black mb-3"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '1.6rem',
                    letterSpacing: '0.06em',
                    color: '#e63030',
                  }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20" style={{ borderTop: '1px solid #111' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            id="cta-section"
            data-animate
            style={{ transition: 'all 1s ease', opacity: isVisible['cta-section'] ? 1 : 0, transform: isVisible['cta-section'] ? 'translateY(0)' : 'translateY(30px)' }}
          >
            <h2
              className="font-black leading-none mb-5"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2rem, 6vw, 5rem)',
                letterSpacing: '0.02em',
              }}
            >
              READY TO START{' '}
              <span style={{ color: '#e63030' }}>YOUR PROJECT?</span>
            </h2>
            <p className="text-gray-400 mb-9 max-w-lg mx-auto" style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
              Let's kick off with a free discovery call — no pressure, no commitment. Just a conversation about your goals.
            </p>
            <button
              onClick={() => onNavigate && onNavigate('contact')}
              className="proc-liquid-btn mx-auto group"
            >
              <span className="proc-liquid-fill" />
              <span className="proc-liquid-text flex items-center gap-2">
                Book a Free Call
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .proc-liquid-btn {
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
        .proc-liquid-btn:hover {
          transform: scale(1.05);
          box-shadow:
            0 0 18px rgba(230,48,48,0.5),
            0 0 50px rgba(230,48,48,0.22),
            0 0 90px rgba(230,48,48,0.12);
        }
        .proc-liquid-fill {
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
        .proc-liquid-btn:hover .proc-liquid-fill {
          bottom: -5%;
          border-radius: 0;
        }
        .proc-liquid-text {
          position: relative;
          z-index: 1;
          transition: color 0.25s ease 0.08s;
        }
        .proc-liquid-btn:hover .proc-liquid-text {
          color: #ffffff;
        }
      `}</style>
    </div>
  );
};

export default OurProcessPage;