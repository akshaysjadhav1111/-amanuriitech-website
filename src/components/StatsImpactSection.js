import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Zap } from 'lucide-react';

const StatsImpactSection = () => {
  const [isVisible, setIsVisible] = useState({});

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

  const stats = [
    { 
      label: 'Businesses Transformed', 
      value: '30+', 
      desc: 'from idea to product',
      icon: TrendingUp,
      gradient: 'from-purple-400 to-pink-400'
    },
    { 
      label: 'Faster Development', 
      value: '3x', 
      desc: 'with our agile process',
      icon: Zap,
      gradient: 'from-orange-400 to-red-400'
    },
    { 
      label: 'On-Time Delivery', 
      value: '100%', 
      desc: 'every sprint, every deadline',
      icon: Users,
      gradient: 'from-purple-400 to-orange-400'
    }
  ];

  return (
    <div className="bg-black text-white">
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
            <div className="inline-block px-4 py-2 bg-purple-600/20 rounded-full mb-4">
              <span className="text-purple-400 font-semibold text-sm sm:text-base">Our Impact</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              30+ Clients,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">
                {' '}Impactful Results
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mt-4">
              Real results, real businesses — built with speed, precision, and a commitment to delivering on time, every time
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  id={`stat-${index}`}
                  data-animate
                  className={`group text-center p-6 sm:p-8 rounded-lg border border-gray-800 bg-gray-900/50 backdrop-blur hover:border-purple-500 transition-all duration-500 hover:scale-105 ${
                    isVisible[`stat-${index}`] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-gradient-to-r from-purple-600/20 to-orange-500/20 group-hover:from-purple-600/30 group-hover:to-orange-500/30 transition-all duration-300">
                      <Icon className="text-purple-400" size={32} />
                    </div>
                  </div>
                  <div className={`text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} mb-3 sm:mb-4`}>
                    {stat.value}
                  </div>
                  <div className="text-lg sm:text-xl font-semibold mb-2">{stat.label}</div>
                  <div className="text-sm sm:text-base text-gray-400">{stat.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatsImpactSection;