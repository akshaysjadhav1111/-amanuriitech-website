import React, { useState, useEffect } from 'react';
import { ArrowRight, X, User, Mail, Phone, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

// ✅ EMAILJS KEYS
const EMAILJS_SERVICE_ID  = 'service_oyn83ec';
const EMAILJS_TEMPLATE_ID = 'template_8bv1iau';
const EMAILJS_PUBLIC_KEY  = 'cEmRZrsFIjxTX0vQD';

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('success');
  const [toastMessage, setToastMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('contact-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showForm]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          title:   `${formData.firstName} ${formData.lastName}`,
          name:    `${formData.firstName} ${formData.lastName}`,
          email:   formData.email,
          message: `Phone: ${formData.phone || 'Not provided'}\n\n${formData.message || 'No message provided'}`,
        },
        EMAILJS_PUBLIC_KEY
      );

      setToastType('success');
      setToastMessage('Thank you! Your message has been sent. We will get back to you shortly.');
      setShowToast(true);
      setShowForm(false);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });

    } catch (error) {
      console.error('EmailJS error:', error);
      setToastType('error');
      setToastMessage('Failed to send message. Please try again or email us directly.');
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section
        id="contact-section"
        className="text-white py-8 sm:py-20 md:py-24 relative overflow-hidden"
        style={{ background: '#000' }}
      >
        {/* Animated background — RED glow blobs replacing purple/orange */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl animate-pulse"
            style={{ background: 'radial-gradient(circle, rgba(230,48,48,0.15) 0%, transparent 70%)' }}
          ></div>
          <div
            className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl animate-pulse"
            style={{ background: 'radial-gradient(circle, rgba(230,48,48,0.10) 0%, transparent 70%)', animationDelay: '1s' }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">

            {/* Title */}
            <div
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {/* Eyebrow — RED */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded mb-6"
                style={{ background: 'rgba(230,48,48,0.08)', border: '1px solid rgba(230,48,48,0.25)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#e63030' }} />
                <span className="font-bold text-sm sm:text-base tracking-widest uppercase" style={{ color: '#e63030' }}>
                  Get in Touch
                </span>
              </div>

              {/* Heading — Bebas Neue + RED accent */}
              <h2
                className="font-black leading-none mb-6 sm:mb-8"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(2.2rem, 8vw, 6.5rem)',
                  letterSpacing: '0.02em',
                }}
              >
                TAKE THE{' '}
                <span style={{ color: '#e63030' }}>FIRST STEP</span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto">
                Have a project in mind? Let's talk. We'll get back to you within 24 hours — no pressure, no commitment.
              </p>
            </div>

            {/* CTA Button — RED */}
            <div
              className={`transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <button
                onClick={() => setShowForm(true)}
                className="contact-liquid-btn"
              >
                <span className="contact-liquid-fill" />
                <span className="contact-liquid-text flex items-center gap-3">
                  Contact Us Today
                  <ArrowRight size={20} />
                </span>
              </button>
            </div>

            {/* Decorative line — RED gradient */}
            <div
              className={`mt-12 sm:mt-16 transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 w-full' : 'opacity-0 w-0'
              }`}
            >
              <div
                className="h-px mx-auto"
                style={{ background: 'linear-gradient(to right, transparent, rgba(230,48,48,0.5), transparent)' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Floating particles — RED dots */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-float"
              style={{
                background: '#e63030',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
                opacity: 0.4,
              }}
            ></div>
          ))}
        </div>
      </section>

      {/* Contact Form Modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn"
          style={{ background: 'rgba(0,0,0,0.97)' }}
        >
          <div
            className="text-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl animate-slideUp custom-scrollbar mx-2 sm:mx-0"
            style={{ background: '#080808', border: '1px solid #1a1a1a' }}
          >
            {/* Header — RED */}
            <div
              className="sticky top-0 text-white p-4 sm:p-6 rounded-t-2xl flex justify-between items-center z-10"
              style={{ background: '#e63030' }}
            >
              <div className="flex-1">
                <h3
                  className="text-xl sm:text-2xl font-black mb-1 animate-fadeInUp"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}
                >
                  TAKE THE FIRST STEP
                </h3>
                <p className="text-xs sm:text-sm text-white/90 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                  Fill in your details and we'll get back to you within 24 hours
                </p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                disabled={isSubmitting}
                className="ml-4 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 disabled:opacity-50"
                style={{ background: 'rgba(0,0,0,0.2)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.4)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.2)'}
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 sm:p-8 space-y-6">

              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                  <label className="flex items-center gap-2 text-xs font-bold mb-2 uppercase tracking-widest"
                    style={{ color: '#666' }}>
                    <User size={13} style={{ color: '#e63030' }} />
                    First Name <span style={{ color: '#e63030' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    placeholder="John"
                    className="w-full px-4 py-3 text-white placeholder-gray-600 outline-none transition-all disabled:opacity-50"
                    style={{ background: '#0d0d0d', border: '1px solid #222', borderRadius: '4px', fontSize: '0.95rem' }}
                    onFocus={e => e.target.style.borderColor = '#e63030'}
                    onBlur={e => e.target.style.borderColor = '#222'}
                  />
                </div>
                <div className="animate-fadeInUp" style={{ animationDelay: '0.25s' }}>
                  <label className="flex items-center gap-2 text-xs font-bold mb-2 uppercase tracking-widest"
                    style={{ color: '#666' }}>
                    <User size={13} style={{ color: '#e63030' }} />
                    Last Name <span style={{ color: '#e63030' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    placeholder="Doe"
                    className="w-full px-4 py-3 text-white placeholder-gray-600 outline-none transition-all disabled:opacity-50"
                    style={{ background: '#0d0d0d', border: '1px solid #222', borderRadius: '4px', fontSize: '0.95rem' }}
                    onFocus={e => e.target.style.borderColor = '#e63030'}
                    onBlur={e => e.target.style.borderColor = '#222'}
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                  <label className="flex items-center gap-2 text-xs font-bold mb-2 uppercase tracking-widest"
                    style={{ color: '#666' }}>
                    <Mail size={13} style={{ color: '#e63030' }} />
                    Email <span style={{ color: '#e63030' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 text-white placeholder-gray-600 outline-none transition-all disabled:opacity-50"
                    style={{ background: '#0d0d0d', border: '1px solid #222', borderRadius: '4px', fontSize: '0.95rem' }}
                    onFocus={e => e.target.style.borderColor = '#e63030'}
                    onBlur={e => e.target.style.borderColor = '#222'}
                  />
                </div>
                <div className="animate-fadeInUp" style={{ animationDelay: '0.35s' }}>
                  <label className="flex items-center gap-2 text-xs font-bold mb-2 uppercase tracking-widest"
                    style={{ color: '#666' }}>
                    <Phone size={13} style={{ color: '#e63030' }} />
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 text-white placeholder-gray-600 outline-none transition-all disabled:opacity-50"
                    style={{ background: '#0d0d0d', border: '1px solid #222', borderRadius: '4px', fontSize: '0.95rem' }}
                    onFocus={e => e.target.style.borderColor = '#e63030'}
                    onBlur={e => e.target.style.borderColor = '#222'}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                <label className="flex items-center gap-2 text-xs font-bold mb-2 uppercase tracking-widest"
                  style={{ color: '#666' }}>
                  <MessageSquare size={13} style={{ color: '#e63030' }} />
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  rows="4"
                  placeholder="Tell us about your project and requirements..."
                  className="w-full px-4 py-3 text-white placeholder-gray-600 outline-none transition-all resize-none disabled:opacity-50"
                  style={{ background: '#0d0d0d', border: '1px solid #222', borderRadius: '4px', fontSize: '0.95rem' }}
                  onFocus={e => e.target.style.borderColor = '#e63030'}
                  onBlur={e => e.target.style.borderColor = '#222'}
                ></textarea>
              </div>

              {/* Submit Button — pill style */}
              <div className="pt-2 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="contact-liquid-btn w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ pointerEvents: isSubmitting ? 'none' : 'auto' }}
                >
                  <span className="contact-liquid-fill" />
                  <span className="contact-liquid-text flex items-center justify-center gap-2">
                    {isSubmitting ? 'Sending...' : 'Submit Form'}
                    {!isSubmitting && <ArrowRight size={18} />}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 right-4 sm:right-8 z-[60] animate-slideInRight">
          <div
            className="flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl min-w-[320px] sm:min-w-[400px]"
            style={{
              background: '#080808',
              border: `1px solid ${toastType === 'success' ? 'rgba(34,197,94,0.5)' : 'rgba(230,48,48,0.5)'}`,
            }}
          >
            <div style={{ color: toastType === 'success' ? '#22c55e' : '#e63030', flexShrink: 0 }}>
              {toastType === 'success' ? (
                <CheckCircle size={24} className="animate-scaleIn" />
              ) : (
                <AlertCircle size={24} className="animate-scaleIn" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm sm:text-base">
                {toastType === 'success' ? 'Success!' : 'Error'}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">{toastMessage}</p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="flex-shrink-0 text-gray-600 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        /* ── Liquid Button ── */
        .contact-liquid-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 2.5rem;
          border: 2px solid #e63030;
          border-radius: 50px;
          background: transparent;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-family: 'Inter', sans-serif;
          color: #e63030;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.4s ease;
        }
        .contact-liquid-btn:hover {
          transform: scale(1.05);
          box-shadow:
            0 0 18px rgba(230,48,48,0.5),
            0 0 50px rgba(230,48,48,0.22),
            0 0 90px rgba(230,48,48,0.12);
        }
        .contact-liquid-fill {
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
        .contact-liquid-btn:hover .contact-liquid-fill {
          bottom: -5%;
          border-radius: 0;
        }
        .contact-liquid-text {
          position: relative;
          z-index: 1;
          transition: color 0.25s ease 0.08s;
        }
        .contact-liquid-btn:hover .contact-liquid-text {
          color: #ffffff;
        }

        /* Custom RED Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #000000;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e63030;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #b91c1c;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #e63030 #000000;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-30px) translateX(10px);
            opacity: 0.5;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { transform: translateX(400px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.4s ease-out; }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-slideInRight { animation: slideInRight 0.5s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
      `}</style>
    </>
  );
};

export default ContactSection;