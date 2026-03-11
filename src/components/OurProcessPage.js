import React, { useState, useEffect, useRef } from 'react';
import { Search, Paintbrush, Code2, FlaskConical, Rocket, HeartHandshake, ChevronRight, ArrowRight } from 'lucide-react';

const OurProcessPage = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );
    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-step'));
            if (!isNaN(index)) setActiveStep(index);
          }
        });
      },
      { threshold: 0.6 }
    );
    stepRefs.current.forEach((el) => { if (el) stepObserver.observe(el); });
    return () => stepObserver.disconnect();
  }, []);

  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Discovery',
      subtitle: 'We Listen First',
      description: 'Before a single line of code is written, we sit down and deeply understand your business, your goals, your users, and your challenges. Most agencies skip this — we don\'t.',
      details: ['In-depth requirement gathering', 'Competitor & market analysis', 'Technical feasibility review', 'Project scope & timeline definition'],
      color: 'from-purple-600 to-purple-800',
      accent: '#a855f7',
      duration: '1–2 weeks'
    },
    {
      number: '02',
      icon: Paintbrush,
      title: 'Design',
      subtitle: 'Blueprinting Your Vision',
      description: 'We transform ideas into visual blueprints. Every screen, every interaction, every user journey is carefully crafted before we build — so you see exactly what you\'re getting.',
      details: ['UI/UX wireframing', 'Interactive prototypes', 'Brand-aligned visual design', 'Client review & approval'],
      color: 'from-orange-500 to-red-600',
      accent: '#f97316',
      duration: '1–3 weeks'
    },
    {
      number: '03',
      icon: Code2,
      title: 'Develop',
      subtitle: 'Building With Precision',
      description: 'Our engineers get to work — writing clean, scalable, and maintainable code. We use modern technologies and agile sprints so you see progress every single week.',
      details: ['Agile sprint-based development', 'Weekly progress updates', 'Clean & documented code', 'Regular client demos'],
      color: 'from-blue-600 to-indigo-700',
      accent: '#3b82f6',
      duration: '4–12 weeks'
    },
    {
      number: '04',
      icon: FlaskConical,
      title: 'Test',
      subtitle: 'Zero Compromise on Quality',
      description: 'We break things so your users don\'t have to. Rigorous testing across devices, browsers, and edge cases ensures your product works perfectly before it ever goes live.',
      details: ['Functional & regression testing', 'Cross-device & browser testing', 'Performance & load testing', 'Security vulnerability checks'],
      color: 'from-teal-500 to-cyan-700',
      accent: '#14b8a6',
      duration: '1–2 weeks'
    },
    {
      number: '05',
      icon: Rocket,
      title: 'Launch',
      subtitle: 'Go Live, Stress-Free',
      description: 'Launch day should be exciting, not stressful. We handle the entire deployment process — from server setup to DNS configuration — so everything goes live without a hitch.',
      details: ['Server setup & configuration', 'Smooth deployment pipeline', 'Performance monitoring', 'Launch day support'],
      color: 'from-pink-600 to-purple-700',
      accent: '#ec4899',
      duration: '1 week'
    },
    {
      number: '06',
      icon: HeartHandshake,
      title: 'Support',
      subtitle: 'We Don\'t Disappear',
      description: 'Unlike agencies that vanish after launch, we stay. We monitor, maintain, and continuously improve your product — because your long-term success is our success.',
      details: ['Ongoing maintenance & updates', 'Performance optimization', 'Feature enhancements', 'Priority bug fixes'],
      color: 'from-purple-600 to-orange-500',
      accent: '#a855f7',
      duration: 'Ongoing'
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen pt-16 sm:pt-20">

      {/* Back Button */}
      <div className="fixed top-20 sm:top-24 left-4 sm:left-8 z-40">
        <button
          onClick={() => onNavigate && onNavigate('hero')}
          className="group flex items-center gap-2 bg-gray-900 hover:bg-gradient-to-r hover:from-purple-600 hover:to-orange-500 border border-gray-800 hover:border-transparent text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          <span>Back to Home</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            id="hero-title"
            data-animate
            className={`text-center transition-all duration-1000 ${isVisible['hero-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="inline-block px-4 py-2 bg-purple-600/20 rounded-full mb-6 border border-purple-500/30">
              <span className="text-purple-400 font-semibold text-sm sm:text-base tracking-widest uppercase">How We Work</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-none tracking-tight">
              Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
                {' '}Process
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              No surprises. No guesswork. Just a clear, proven path from your idea to a product your users will love.
            </p>

            {/* Step count pills */}
            <div className="flex justify-center gap-2 mt-10 flex-wrap">
              {steps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => stepRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 border ${
                    activeStep === i
                      ? 'bg-purple-600 border-purple-500 text-white scale-110'
                      : 'border-gray-700 text-gray-500 hover:border-purple-500 hover:text-purple-400'
                  }`}
                >
                  {step.number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Vertical timeline line - desktop */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-600/50 via-orange-500/30 to-transparent transform -translate-x-1/2" />

            <div className="space-y-16 sm:space-y-24">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={index}
                    ref={(el) => (stepRefs.current[index] = el)}
                    data-step={index}
                    id={`step-${index}`}
                    data-animate
                    className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-0 transition-all duration-1000 ${
                      isVisible[`step-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                    } ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    {/* Content Side */}
                    <div className={`w-full lg:w-5/12 ${isEven ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:text-left'}`}>
                      <div className={`group p-6 sm:p-8 rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 cursor-default`}>
                        {/* Duration badge */}
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-xs font-semibold text-gray-400 mb-4`}>
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          {step.duration}
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-black mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-orange-400 transition-all duration-300">
                          {step.title}
                        </h3>
                        <p className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">{step.subtitle}</p>
                        <p className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">{step.description}</p>

                        {/* Details list */}
                        <ul className={`space-y-2 ${isEven ? 'lg:items-end' : ''} flex flex-col`}>
                          {step.details.map((detail, di) => (
                            <li key={di} className={`flex items-center gap-2 text-sm text-gray-400 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                              <ChevronRight size={14} style={{ color: step.accent }} className="flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Center Node - desktop */}
                    <div className="hidden lg:flex w-2/12 justify-center relative z-10">
                      <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl transition-all duration-500 ${activeStep === index ? 'scale-125 ring-4 ring-purple-500/40' : 'scale-100'}`}>
                        <Icon size={28} className="text-white" />
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-black text-gray-600">{step.number}</div>
                      </div>
                    </div>

                    {/* Mobile icon */}
                    <div className={`lg:hidden flex items-center gap-4 w-full`}>
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl flex-shrink-0`}>
                        <Icon size={22} className="text-white" />
                      </div>
                      <span className="text-4xl font-black text-gray-800">{step.number}</span>
                    </div>

                    {/* Empty side - desktop spacing */}
                    <div className="hidden lg:block w-5/12" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Our Process Works */}
      <section className="py-16 sm:py-20 border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="why-section"
            data-animate
            className={`text-center mb-12 transition-all duration-1000 ${isVisible['why-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
              Why Our Process
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400"> Works</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Every step is designed to keep you in control, eliminate surprises, and deliver results you're proud of.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: 'Transparent', desc: 'You always know exactly where your project stands. Weekly updates, no radio silence.', emoji: '👁️' },
              { title: 'Fast', desc: 'Agile sprints mean you see real progress every week — not just at the end of months.', emoji: '⚡' },
              { title: 'Reliable', desc: '100% on-time delivery. We set realistic timelines and we stick to them.', emoji: '🎯' }
            ].map((item, i) => (
              <div
                key={i}
                id={`why-${i}`}
                data-animate
                className={`p-6 sm:p-8 rounded-2xl border border-gray-800 bg-gray-900/50 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 text-center ${isVisible[`why-${i}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            id="cta-section"
            data-animate
            className={`transition-all duration-1000 ${isVisible['cta-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">
              Ready to Start
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400"> Your Project?</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              Let's kick off with a free discovery call — no pressure, no commitment. Just a conversation about your goals.
            </p>
            <button
              onClick={() => onNavigate && onNavigate('contact')}
              className="group bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 flex items-center mx-auto gap-2"
            >
              Book a Free Call
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurProcessPage;
