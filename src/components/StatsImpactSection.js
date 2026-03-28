import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, Zap } from 'lucide-react';

/* ── Count-up hook ─────────────────────────────────── */
function useCountUp(endStr, duration = 2200, started = false) {
  const endNum = parseInt(endStr.replace(/\D/g, '')) || 0;
  const suffix = endStr.replace(/[0-9]/g, '');
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started || endNum === 0) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * endNum));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(endNum);
    };
    requestAnimationFrame(step);
  }, [started, endNum, duration]);

  return { count, suffix };
}

/* ── Individual stat card ──────────────────────────── */
const StatCard = ({ stat, index }) => {
  const cardRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { count, suffix } = useCountUp(stat.value, 2200, started);
  const Icon = stat.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="stat-card"
      style={{
        animationDelay: `${index * 130}ms`,
        '--card-delay': `${index * 130}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top red accent bar — slides in on hover */}
      <div className="stat-top-bar" />

      {/* Icon */}
      <div className="stat-icon-wrap" style={{ background: hovered ? 'rgba(230,48,48,0.18)' : 'rgba(230,48,48,0.08)' }}>
        <Icon size={26} style={{ color: '#e63030' }} />
      </div>

      {/* Number */}
      <div className="stat-number" style={{ color: hovered ? '#e63030' : '#ffffff' }}>
        {count}{suffix}
      </div>

      {/* Label */}
      <div className="stat-label">{stat.label}</div>

      {/* Desc */}
      <div className="stat-desc">{stat.desc}</div>

      {/* Bottom glow line on hover */}
      <div className="stat-glow-line" style={{ opacity: hovered ? 1 : 0 }} />
    </div>
  );
};

/* ── Section ────────────────────────────────────────── */
const StatsImpactSection = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('stat-title-visible'); },
      { threshold: 0.3 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: 'Businesses Transformed', value: '30+', desc: 'from idea to product',        icon: TrendingUp },
    { label: 'Faster Development',      value: '3x',  desc: 'with our agile process',      icon: Zap        },
    { label: 'On-Time Delivery',        value: '100%', desc: 'every sprint, every deadline', icon: Users     },
  ];

  return (
    <>
      <section
        style={{ background: '#000', borderTop: '1px solid #0f0f0f', borderBottom: '1px solid #0f0f0f' }}
        className="py-8 sm:py-20 lg:py-24 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div ref={titleRef} className="stat-title text-center mb-10 sm:mb-16 lg:mb-20">
            <div
              className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded"
              style={{ background: 'rgba(230,48,48,0.08)', border: '1px solid rgba(230,48,48,0.2)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#e63030' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#e63030' }}>
                Our Impact
              </span>
            </div>

            <h2
              className="font-black leading-none mb-5"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2rem, 6vw, 5rem)',
                letterSpacing: '0.02em',
              }}
            >
              30+ CLIENTS,{' '}
              <span style={{ color: '#e63030' }}>IMPACTFUL RESULTS</span>
            </h2>

            <p className="text-gray-500 max-w-2xl mx-auto" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', lineHeight: 1.7 }}>
              Real results, real businesses — built with speed, precision, and a commitment to
              delivering on time, every time.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        /* ── Title fade-in ── */
        .stat-title {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .stat-title-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Card base ── */
        .stat-card {
          position: relative;
          padding: 1.75rem 1.25rem;
          background: #080808;
          border: 1px solid #1c1c1c;
          border-radius: 6px;
          text-align: center;
          cursor: default;
          overflow: hidden;
          transition:
            border-color 0.4s ease,
            transform 0.4s ease,
            box-shadow 0.45s ease;
          /* entrance animation */
          opacity: 0;
          animation: cardEntrance 0.7s ease forwards;
          animation-delay: var(--card-delay, 0ms);
        }

        @keyframes cardEntrance {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Hover lift + red border + glow ── */
        .stat-card:hover {
          border-color: rgba(230,48,48,0.6);
          transform: translateY(-8px);
          box-shadow:
            /* tight inner red ring */
            0 0 0 1px rgba(230,48,48,0.35),
            /* close red glow */
            0 0 18px rgba(230,48,48,0.45),
            /* mid red aura */
            0 0 45px rgba(230,48,48,0.28),
            /* wide soft red halo — like erisstech */
            0 0 90px rgba(230,48,48,0.18),
            /* deep drop shadow */
            0 24px 60px rgba(0,0,0,0.7);
        }

        /* ── Top accent bar — sweeps in from left on hover ── */
        .stat-top-bar {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: #e63030;
          transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          box-shadow: 0 0 12px rgba(230,48,48,0.8);
        }
        .stat-card:hover .stat-top-bar {
          left: 0%;
        }

        /* ── Icon wrapper ── */
        .stat-icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 1px solid rgba(230,48,48,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem auto;
          transition: background 0.35s ease, transform 0.35s ease;
        }
        .stat-card:hover .stat-icon-wrap {
          transform: scale(1.12) rotate(-5deg);
        }

        /* ── Number ── */
        .stat-number {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 6vw, 4.2rem);
          letter-spacing: 0.04em;
          line-height: 1;
          margin-bottom: 0.5rem;
          transition: color 0.35s ease;
          /* subtle scale pulse on hover */
        }
        .stat-card:hover .stat-number {
          animation: numPop 0.4s ease;
        }
        @keyframes numPop {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.08); }
          100% { transform: scale(1); }
        }

        /* ── Label & desc ── */
        .stat-label {
          color: #ffffff;
          font-weight: 700;
          font-size: 0.95rem;
          margin-bottom: 0.35rem;
          transition: color 0.3s ease;
        }
        .stat-card:hover .stat-label {
          color: #ffffff;
        }
        .stat-desc {
          color: #555;
          font-size: 0.82rem;
          letter-spacing: 0.02em;
        }

        /* ── Bottom glow line ── */
        .stat-glow-line {
          position: absolute;
          bottom: 0;
          left: 10%;
          width: 80%;
          height: 1px;
          background: linear-gradient(to right, transparent, #e63030, transparent);
          box-shadow: 0 0 10px rgba(230,48,48,0.6);
          transition: opacity 0.4s ease;
        }
      `}</style>
    </>
  );
};

export default StatsImpactSection;