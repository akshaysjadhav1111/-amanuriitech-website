import React, { useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(147, 51, 234, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const createParticles = () => {
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
      particles = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };
    createParticles();

    // Connect particles with lines
    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.strokeStyle = `rgba(147, 51, 234, ${0.1 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop - DARKER BACKGROUND
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; // Increased from 0.05 to 0.15 for darker trails
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="bg-black text-white min-h-screen flex items-center relative overflow-hidden pt-16 sm:pt-20">
      {/* Canvas Background with Particles - REDUCED OPACITY */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.4 }}
      />

      {/* Additional gradient overlay for depth - DARKER */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-black/70 pointer-events-none" />

      {/* Noise texture overlay - REDUCED */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Side - Main Heading */}
          <div className="space-y-6 sm:space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              TOGETHER WE
              <br />
              <span className="inline-flex items-center flex-wrap">
                BUILT
                <span className="inline-block mx-1 sm:mx-2">
                  <svg width="40" height="40" viewBox="0 0 60 60" className="text-purple-600 sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px]">
                    <polygon points="10,30 50,10 50,50" fill="currentColor" />
                  </svg>
                </span>
                YOUR
              </span>
              <br />
              FUTURE
            </h1>


          </div>

          {/* Right Side - Description */}
          <div className="space-y-4 sm:space-y-6 lg:pl-8">
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Turning Ideas Into Intelligent Solutions
            </h2>
            
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              In a world driven by technology, we make sure your business leads it. We craft intelligent web, app, and AI solutions tailored to your goals — scalable today, ready for tomorrow.
            </p>

            {/* Trust Line */}
            <p className="text-sm sm:text-base text-orange-400 font-semibold tracking-wide">
              We don't just build software. We build the engine that grows your business.
            </p>

            {/* CTA Button */}
            <button className="group flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded transition-all duration-300 text-sm sm:text-base">
              <span className="font-medium">Explore What We Build</span>
              <ChevronRight size={18} className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;