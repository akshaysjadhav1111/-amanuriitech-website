import React, { useState, useEffect } from 'react';
import { ChevronRight, Zap, Shield, TrendingUp, CheckCircle } from 'lucide-react';

const OverviewSection = () => {
  const [activeTab, setActiveTab] = useState('innovate');
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const tabs = {
    innovate: {
      title: 'Innovate',
      icon: Zap,
      items: [
        { name: 'AI Multi-Agent Accelerator', desc: 'Scale agentic AI with seamless orchestration' },
        { name: 'AI Decisioning Platform', desc: 'Unlock AI potential across operations' },
        { name: 'Edge Computing Solutions', desc: 'Real-time insights at data sources' }
      ]
    },
    modernize: {
      title: 'Modernize',
      icon: TrendingUp,
      items: [
        { name: 'Cloud-Native Modernization', desc: 'Enable scalable cloud transformation' },
        { name: 'Data Analytics Platform', desc: 'Automate full data lifecycle' },
        { name: 'Legacy System Migration', desc: 'Seamless transition to modern architecture' }
      ]
    },
    optimize: {
      title: 'Optimize',
      icon: Shield,
      items: [
        { name: 'AI-Powered IT Operations', desc: 'Enhanced efficiency and automation' },
        { name: 'Process Automation', desc: 'Streamline workflows intelligently' },
        { name: 'Cyber Security Solutions', desc: 'Real-time threat detection' }
      ]
    }
  };

  const stats = [
    { label: 'Cost Reduction', value: '30-60%', desc: 'for IT estate' },
    { label: 'Productivity Increase', value: '20-50%', desc: 'in engineering' },
    { label: 'Staff Rotation', value: '15-30%', desc: 'from run to innovate' }
  ];

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div
            id="hero-title"
            data-animate
            className={`transition-all duration-1000 ${
              isVisible['hero-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              Enterprise-Grade
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">
                AI Acceleration
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12">
              The last mile advantage for AI implementation. Transform potential into reality with platforms designed for scale.
            </p>
            <button className="group bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all duration-300 flex items-center mx-auto">
              Explore Our Platforms
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-20 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="stats-title"
            data-animate
            className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
              isVisible['stats-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">400+ Clients, Impactful Results</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                id={`stat-${index}`}
                data-animate
                className={`text-center p-6 sm:p-8 rounded-lg border border-gray-800 bg-gray-900/50 backdrop-blur transition-all duration-1000 delay-${index * 100} ${
                  isVisible[`stat-${index}`] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg sm:text-xl font-semibold mb-2">{stat.label}</div>
                <div className="text-sm sm:text-base text-gray-400">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="platforms-title"
            data-animate
            className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
              isVisible['platforms-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-block px-4 py-2 bg-purple-600/20 rounded-full mb-4">
              <span className="text-purple-400 font-semibold text-sm sm:text-base">Our Platforms</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Solving the Last-Mile Challenge
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Modern, full-stack solutions designed to accelerate your AI transformation
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 flex-wrap px-2">
            {Object.entries(tabs).map(([key, { title, icon: Icon }]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                  activeTab === key
                    ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <Icon size={18} className="sm:w-5 sm:h-5" />
                {title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {tabs[activeTab].items.map((item, index) => (
              <div
                key={index}
                className="group p-4 sm:p-6 rounded-lg border border-gray-800 bg-gray-900/50 backdrop-blur hover:border-purple-500 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="flex items-start gap-3 mb-3 sm:mb-4">
                  <CheckCircle className="text-purple-400 flex-shrink-0" size={20} />
                  <h3 className="text-lg sm:text-xl font-bold group-hover:text-purple-400 transition-colors">
                    {item.name}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">{item.desc}</p>
                <div className="flex items-center text-purple-400 font-semibold group-hover:gap-2 transition-all text-sm sm:text-base">
                  Learn more
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            id="cta-section"
            data-animate
            className={`transition-all duration-1000 ${
              isVisible['cta-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Take the First Step</h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8">
              Contact us to learn how our platforms deliver enterprise-grade AI solutions
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all duration-300">
              Get Started Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OverviewSection;