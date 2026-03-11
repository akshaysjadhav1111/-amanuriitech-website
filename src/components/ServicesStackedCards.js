import React, { useState, useEffect, useRef } from 'react';
import { Globe, Smartphone, Brain, ArrowRight, Check } from 'lucide-react';

const ServicesSection = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState({});
  const [activeService, setActiveService] = useState(0);
  const serviceRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('[data-animate-svc]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-svc-index'));
            if (!isNaN(index)) setActiveService(index);
          }
        });
      },
      { threshold: 0.5 }
    );
    serviceRefs.current.forEach((el) => { if (el) scrollObserver.observe(el); });
    return () => scrollObserver.disconnect();
  }, []);

  const services = [
    {
      number: '01',
      icon: Globe,
      title: 'Web Development',
      subtitle: 'Your Digital Storefront',
      description: 'We build websites and web applications that don\'t just look great — they convert visitors into customers. Fast, responsive, and built to scale with your business.',
      features: [
        'Custom Website Design & Development',
        'E-Commerce Stores (Shopify, WooCommerce)',
        'Web App & SaaS Platforms',
        'CMS Integration (WordPress, Strapi)',
        'SEO-Optimized & Performance Tuned',
        'API Development & Integration',
      ],
      techStack: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'MongoDB', 'AWS'],
      color: 'from-purple-600 to-purple-900',
      accent: '#a855f7',
      borderAccent: 'hover:border-purple-500/60',
      glowColor: 'hover:shadow-purple-500/10',
      badge: 'Most Popular',
      badgeColor: 'bg-purple-600/20 text-purple-400 border-purple-500/30',
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
      color: 'from-orange-500 to-red-700',
      accent: '#f97316',
      borderAccent: 'hover:border-orange-500/60',
      glowColor: 'hover:shadow-orange-500/10',
      badge: 'Fast Delivery',
      badgeColor: 'bg-orange-600/20 text-orange-400 border-orange-500/30',
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
      color: 'from-blue-600 to-indigo-800',
      accent: '#3b82f6',
      borderAccent: 'hover:border-blue-500/60',
      glowColor: 'hover:shadow-blue-500/10',
      badge: 'Future-Ready',
      badgeColor: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
    },
  ];

  return (
    <section className="bg-black text-white py-20 sm:py-28 relative overflow-hidden">

      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-purple-800/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-orange-700/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div
          id="svc-header"
          data-animate-svc
          className={`text-center mb-16 sm:mb-24 transition-all duration-1000 ${
            isVisible['svc-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block px-4 py-2 bg-purple-600/20 rounded-full mb-5 border border-purple-500/30">
            <span className="text-purple-400 font-semibold text-sm sm:text-base tracking-widest uppercase">What We Build</span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-5 leading-none tracking-tight">
            Our
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
              {' '}Services
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Three core services. Infinite possibilities. Everything your business needs to win online.
          </p>

          {/* Service quick-jump pills */}
          <div className="flex justify-center gap-3 mt-8 flex-wrap">
            {services.map((svc, i) => (
              <button
                key={i}
                onClick={() => serviceRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                  activeService === i
                    ? 'bg-gradient-to-r from-purple-600 to-orange-500 border-transparent text-white scale-105'
                    : 'border-gray-700 text-gray-500 hover:border-purple-500 hover:text-purple-400'
                }`}
              >
                <svc.icon size={14} />
                {svc.title}
              </button>
            ))}
          </div>
        </div>

        {/* Service Cards — Alternating Layout */}
        <div className="space-y-16 sm:space-y-28">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                ref={(el) => (serviceRefs.current[index] = el)}
                data-svc-index={index}
                id={`svc-card-${index}`}
                data-animate-svc
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center transition-all duration-1000 ${
                  isVisible[`svc-card-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Visual Side — Gradient Card */}
                <div className="w-full lg:w-5/12">
                  <div className={`relative rounded-2xl bg-gradient-to-br ${service.color} p-8 sm:p-10 min-h-[280px] sm:min-h-[320px] flex flex-col justify-between overflow-hidden group cursor-default shadow-2xl`}>
                    {/* Decorative circles */}
                    <div className="absolute -top-10 -right-10 w-48 h-48 border border-white/10 rounded-full" />
                    <div className="absolute -bottom-16 -left-8 w-64 h-64 border border-white/5 rounded-full" />

                    {/* Number watermark */}
                    <div className="absolute bottom-4 right-6 text-8xl sm:text-9xl font-black text-white/5 select-none leading-none">
                      {service.number}
                    </div>

                    <div className="relative z-10">
                      {/* Badge */}
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold mb-6 bg-white/10 border-white/20 text-white`}>
                        {service.badge}
                      </div>

                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center mb-5">
                        <Icon size={28} className="text-white" />
                      </div>

                      <h3 className="text-3xl sm:text-4xl font-black text-white mb-2">{service.title}</h3>
                      <p className="text-white/60 text-sm font-semibold uppercase tracking-widest">{service.subtitle}</p>
                    </div>

                    {/* Tech Stack pills at bottom */}
                    <div className="relative z-10 flex flex-wrap gap-2 mt-8">
                      {service.techStack.map((tech, ti) => (
                        <span key={ti} className="px-2.5 py-1 bg-white/10 backdrop-blur rounded-full text-xs font-semibold text-white/80 border border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-7/12">
                  <div className={`space-y-6 ${isEven ? 'lg:pl-4' : 'lg:pr-4'}`}>

                    {/* Step indicator */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-px bg-gradient-to-r from-purple-500 to-orange-500" />
                      <span className="text-xs font-black tracking-widest text-gray-500 uppercase">Service {service.number}</span>
                    </div>

                    <div>
                      <h3 className="text-3xl sm:text-4xl font-black mb-3 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((feature, fi) => (
                        <div key={fi} className="flex items-start gap-2.5 group">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: `${service.accent}20`, border: `1px solid ${service.accent}40` }}
                          >
                            <Check size={11} style={{ color: service.accent }} />
                          </div>
                          <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors duration-200">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-4 pt-2">
                      <button
                        onClick={() => onNavigate && onNavigate('contact')}
                        className="group flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 text-white"
                        style={{ background: `linear-gradient(135deg, ${service.accent}, ${service.accent}99)` }}
                      >
                        Get Started
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Strip */}
        <div
          id="svc-cta"
          data-animate-svc
          className={`mt-24 sm:mt-32 transition-all duration-1000 ${
            isVisible['svc-cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur p-8 sm:p-12 text-center overflow-hidden">
            {/* Glow background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-orange-900/20 pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4">
                Not Sure Which Service You Need?
              </h3>
              <p className="text-gray-400 text-base sm:text-lg mb-8 max-w-xl mx-auto">
                Tell us about your project and we'll recommend exactly what you need — no upselling, no fluff.
              </p>
              <button
                onClick={() => onNavigate && onNavigate('contact')}
                className="group bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white px-8 py-4 rounded-lg text-base font-bold transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 flex items-center mx-auto gap-2">
                Talk to Us for Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;