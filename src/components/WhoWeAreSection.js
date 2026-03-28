import React, { useEffect } from 'react';
import { Users, Target, Lightbulb, Award } from 'lucide-react';

const WhoWeAreSection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.15 }
    );
    document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'Empowering businesses with cutting-edge technology solutions that drive innovation and sustainable growth in the digital era.',
    },
    {
      icon: Lightbulb,
      title: 'Our Vision',
      description: 'To be the global leader in AI-powered digital transformation, making advanced technology accessible to enterprises of all sizes.',
    },
    {
      icon: Award,
      title: 'Our Values',
      description: 'Innovation, integrity, and client success drive everything we do. We believe in building lasting partnerships through excellence.',
    },
    {
      icon: Users,
      title: 'Our Team',
      description: 'A diverse team of experts passionate about technology, committed to delivering solutions that exceed expectations.',
    },
  ];

  return (
    <div style={{ background: '#000' }}>
      {/* Hero */}
      <section className="relative flex items-center justify-center overflow-hidden py-10 sm:py-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(230,48,48,0.05) 0%, transparent 70%)' }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="fade-in-section">
            <div
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded"
              style={{ background: 'rgba(230,48,48,0.08)', border: '1px solid rgba(230,48,48,0.2)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block" />
              <span className="text-xs font-bold tracking-widest uppercase text-red-500">About Us</span>
            </div>

            <h1
              className="font-black leading-none mb-8"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2.8rem, 11vw, 8rem)',
                letterSpacing: '0.02em',
              }}
            >
              WHO{' '}
              <span style={{ color: '#e63030' }}>WE ARE</span>
            </h1>

            <p className="text-gray-400 max-w-3xl mx-auto mb-6"
              style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', lineHeight: 1.8 }}>
              We started Amanura Tech Solutions because we saw too many businesses struggling with outdated
              technology and overpriced agencies. So we built something different — a tech partner
              that actually listens, moves fast, and delivers.
            </p>

            <p className="font-bold" style={{ color: '#e63030', fontSize: '1rem', letterSpacing: '0.04em' }}>
              We don't just write code. We solve problems that matter.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-8 sm:py-20" style={{ borderTop: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="fade-in-section group p-7 sm:p-9 rounded"
                  style={{
                    background: '#080808',
                    border: '1px solid #1a1a1a',
                    transitionDelay: `${index * 100}ms`,
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#e63030'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a1a'}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(230,48,48,0.1)', border: '1px solid rgba(230,48,48,0.2)' }}
                    >
                      <Icon size={22} style={{ color: '#e63030' }} />
                    </div>
                    <h3 className="font-black text-white mt-1"
                      style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', letterSpacing: '-0.01em' }}>
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-8 sm:py-20" style={{ borderTop: '1px solid #111' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="fade-in-section">
            <h2
              className="font-black leading-none mb-6"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2rem, 7vw, 5rem)',
                letterSpacing: '0.02em',
              }}
            >
              WHY CHOOSE{' '}
              <span style={{ color: '#e63030' }}>US</span>
            </h2>

            <p className="text-gray-400 max-w-3xl mx-auto mb-10"
              style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', lineHeight: 1.8 }}>
              We believe every business deserves a technology partner that truly gets them. We take
              time to understand your goals, your challenges, and your vision — then we build
              solutions that are fast, reliable, and built to grow with you.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {['30+ Satisfied Clients', 'Fast & Agile Team', '100% On-Time Delivery'].map((badge, i) => (
                <div
                  key={i}
                  className="px-5 py-2.5 rounded"
                  style={{
                    border: '1px solid rgba(230,48,48,0.3)',
                    background: 'rgba(230,48,48,0.07)',
                    color: '#e63030',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    letterSpacing: '0.02em',
                  }}
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhoWeAreSection;