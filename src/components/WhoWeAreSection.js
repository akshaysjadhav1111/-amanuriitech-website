import React, { useState, useEffect } from 'react';
import { Users, Target, Lightbulb, Award } from 'lucide-react';

const WhoWeAreSection = () => {
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

  const features = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'Empowering businesses with cutting-edge technology solutions that drive innovation and sustainable growth in the digital era.'
    },
    {
      icon: Lightbulb,
      title: 'Our Vision',
      description: 'To be the global leader in AI-powered digital transformation, making advanced technology accessible to enterprises of all sizes.'
    },
    {
      icon: Award,
      title: 'Our Values',
      description: 'Innovation, integrity, and client success drive everything we do. We believe in building lasting partnerships through excellence.'
    },
    {
      icon: Users,
      title: 'Our Team',
      description: 'A diverse team of experts passionate about technology, committed to delivering solutions that exceed expectations.'
    }
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
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            id="hero-title"
            data-animate
            className={`transition-all duration-1000 ${
              isVisible['hero-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="text-center mb-12 sm:mb-16">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                Who
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">
                  {' '}We Are
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed">
                We started Amanuriitech because we saw too many businesses struggling with outdated technology and overpriced agencies. So we built something different — a tech partner that actually listens, moves fast, and delivers.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                We don't just write code. We solve problems that matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-16 md:py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  id={`feature-${index}`}
                  data-animate
                  className={`group p-6 sm:p-8 rounded-lg border border-gray-800 bg-gray-900/50 backdrop-blur hover:border-purple-500 transition-all duration-500 ${
                    isVisible[`feature-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600/20 to-orange-500/20 group-hover:from-purple-600/30 group-hover:to-orange-500/30 transition-all duration-300">
                      <Icon className="text-purple-400" size={24} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-orange-400 transition-all duration-300">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 md:py-20 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="why-choose"
            data-animate
            className={`text-center transition-all duration-1000 ${
              isVisible['why-choose'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
              Why Choose
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">
                {' '}Us
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              We believe every business deserves a technology partner that truly gets them. We take time to understand your goals, your challenges, and your vision — then we build solutions that are fast, reliable, and built to grow with you. No bloated teams, no unnecessary delays, no surprises on the bill.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8 sm:mt-12">
              <div className="px-6 py-3 rounded-full border border-purple-500/50 bg-purple-600/10">
                <span className="text-purple-400 font-semibold">30+ Satisfied Clients</span>
              </div>
              <div className="px-6 py-3 rounded-full border border-orange-500/50 bg-orange-600/10">
                <span className="text-orange-400 font-semibold">Fast & Agile Team</span>
              </div>
              <div className="px-6 py-3 rounded-full border border-purple-500/50 bg-purple-600/10">
                <span className="text-purple-400 font-semibold">100% On-Time Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhoWeAreSection;