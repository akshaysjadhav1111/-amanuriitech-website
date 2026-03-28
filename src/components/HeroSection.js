import React, { useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

const HeroSection = ({ onNavigate }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3.5 + 1.5;
        this.speedX = Math.random() * 0.55 - 0.275;
        this.speedY = Math.random() * 0.55 - 0.275;
        this.opacity = Math.random() * 0.7 + 0.25;
        this.r = 210 + Math.floor(Math.random() * 46);
        this.g = Math.floor(Math.random() * 25);
        this.b = Math.floor(Math.random() * 25);
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width)  this.x = 0;
        if (this.x < 0)             this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0)             this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const isMobile = () => window.innerWidth < 768;

    const createParticles = () => {
      // Mobile: fewer particles than desktop but not too sparse
      const density = isMobile() ? 11000 : 8000;
      const count = Math.floor((canvas.width * canvas.height) / density);
      particles = [];
      for (let i = 0; i < count; i++) particles.push(new Particle());
    };
    createParticles();

    // Recreate on resize so mobile → desktop or vice-versa updates count
    window.addEventListener('resize', createParticles);

    const connectParticles = () => {
      // On mobile, skip connections entirely for a cleaner look
      if (isMobile()) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const alpha = 0.18 * (1 - dist / 140);
            ctx.strokeStyle = `rgba(230,48,48,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.16)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', createParticles);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Social links
  const socials = [
    {
      label: 'WhatsApp',
      url: 'https://wa.me/',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
    {
      label: 'Instagram',
      url: 'https://www.instagram.com/amanuriitech?igsh=MWw4bGF5c2t2eDUybQ==',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      <section
        className="relative min-h-screen flex items-center overflow-hidden pt-20"
        style={{ background: '#000' }}
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.6 }}
        />

        {/* Red radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(230,48,48,0.07) 0%, transparent 70%)' }}
        />

        {/* Noise */}
        <div className="noise-overlay" />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 w-full h-40 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #000 0%, transparent 100%)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">

            {/* Left — Headline */}
            <div className="space-y-4 sm:space-y-6">

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2">
                <span
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: '#ffffff', letterSpacing: '0.18em' }}
                >
                  Amanura Tech Solutions
                </span>
              </div>

              <h1
                className="leading-none font-black"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(2.8rem, 11vw, 7.5rem)',
                  letterSpacing: '0.02em',
                  lineHeight: 1,
                }}
              >
                TOGETHER<br />
                WE{' '}
                <span style={{ color: '#e63030' }}>BUILT</span>
                <svg
                  viewBox="0 0 60 60"
                  style={{
                    display: 'inline',
                    width: '0.7em',
                    height: '0.7em',
                    verticalAlign: 'middle',
                    margin: '0 0.05em',
                    fill: '#e63030',
                  }}
                >
                  <polygon points="10,30 50,10 50,50" />
                </svg>
                <br />
                YOUR FUTURE
              </h1>

              {/* ── SOCIAL ICONS ── */}
              <div className="flex items-center gap-3 pt-1">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="social-icon-btn"
                  >
                    {social.icon}
                    <span className="social-tooltip">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right — Sub + CTAs */}
            <div className="space-y-4 sm:space-y-5 lg:pl-6">
              <h2
                className="font-black leading-tight"
                style={{ fontSize: 'clamp(1.3rem, 4.5vw, 2.5rem)', letterSpacing: '-0.01em' }}
              >
                Turning Ideas Into{' '}
                <span style={{ color: '#e63030' }}>Intelligent Solutions</span>
              </h2>

              <p className="text-gray-400 leading-relaxed" style={{ fontSize: 'clamp(0.82rem, 2.2vw, 1.1rem)' }}>
                In a world driven by technology, we make sure your business leads it. We craft
                intelligent web, app, and AI solutions tailored to your goals — scalable today,
                ready for tomorrow.
              </p>

              <p className="font-semibold tracking-wide" style={{ color: '#e63030', fontSize: '0.82rem' }}>
                We don't just build software. We build the engine that grows your business.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 pt-1">

                <button
                  onClick={() => onNavigate && onNavigate('services')}
                  className="hero-btn-primary"
                >
                  <span className="hero-liquid-fill hero-liquid-dark" />
                  <span className="hero-btn-text flex items-center gap-2">
                    Explore What We Build
                    <ChevronRight size={16} />
                  </span>
                </button>

                <button
                  onClick={() => onNavigate && onNavigate('contact')}
                  className="hero-btn-outline"
                >
                  <span className="hero-liquid-fill hero-liquid-red" />
                  <span className="hero-btn-text-outline">Free Consultation</span>
                </button>

              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`

        /* ═══════════════════════════════════════════
           SOCIAL ICON BUTTONS — bright white at rest
        ═══════════════════════════════════════════ */
        .social-icon-btn {
          position: relative;
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.05);
          color: #e8e8e8;
          text-decoration: none;
          transition:
            color 0.3s ease,
            border-color 0.3s ease,
            background 0.3s ease,
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }
        .social-icon-btn:hover {
          color: #ffffff;
          border-color: #e63030;
          background: rgba(230,48,48,0.15);
          transform: translateY(-4px) scale(1.1);
          box-shadow:
            0 0 14px rgba(230,48,48,0.5),
            0 0 35px rgba(230,48,48,0.22);
        }

        /* Tooltip */
        .social-tooltip {
          position: absolute;
          bottom: -28px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #e63030;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.25s ease;
          pointer-events: none;
          font-family: 'Inter', sans-serif;
        }
        .social-icon-btn:hover .social-tooltip {
          opacity: 1;
        }

        /* ═══════════════════════════════════════════
           HERO BUTTONS
        ═══════════════════════════════════════════ */
        .hero-btn-primary {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.6rem;
          background: transparent;
          border: 2px solid #e63030;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          font-family: 'Inter', sans-serif;
          color: #e63030;
          transition: box-shadow 0.4s ease, border-color 0.4s ease;
          width: 100%;
        }
        @media (min-width: 480px) {
          .hero-btn-primary { width: auto; font-size: 0.9rem; padding: 0.85rem 2rem; }
        }
        .hero-btn-primary:hover {
          border-color: #e63030;
          box-shadow:
            0 0 20px rgba(230,48,48,0.6),
            0 0 55px rgba(230,48,48,0.28),
            0 0 100px rgba(230,48,48,0.14);
        }

        .hero-btn-outline {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.6rem;
          background: transparent;
          border: 2px solid #e63030;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          font-family: 'Inter', sans-serif;
          color: #e63030;
          transition: box-shadow 0.4s ease;
          width: 100%;
        }
        @media (min-width: 480px) {
          .hero-btn-outline { width: auto; font-size: 0.9rem; padding: 0.85rem 2rem; }
        }
        .hero-btn-outline:hover {
          box-shadow:
            0 0 20px rgba(230,48,48,0.6),
            0 0 55px rgba(230,48,48,0.28),
            0 0 100px rgba(230,48,48,0.14);
        }

        /* Shared liquid blob */
        .hero-liquid-fill {
          position: absolute;
          left: -5%;
          bottom: -130%;
          width: 110%;
          height: 130%;
          border-radius: 50% 50% 0 0 / 40px 40px 0 0;
          transition:
            bottom 0.5s cubic-bezier(0.23, 1, 0.32, 1),
            border-radius 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 0;
        }
        .hero-liquid-dark { background: #e63030; }
        .hero-liquid-red  { background: #e63030; }

        .hero-btn-primary:hover .hero-liquid-fill,
        .hero-btn-outline:hover .hero-liquid-fill {
          bottom: -5%;
          border-radius: 0;
        }

        .hero-btn-text,
        .hero-btn-text-outline {
          position: relative;
          z-index: 1;
          transition: color 0.25s ease 0.08s;
        }
        .hero-btn-primary:hover .hero-btn-text { color: #ffffff; }
        .hero-btn-outline:hover .hero-btn-text-outline { color: #ffffff; }
      `}</style>
    </>
  );
};

export default HeroSection;