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
        className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-16 sm:py-20 md:py-24 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Title */}
            <div
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="inline-block px-4 py-2 bg-purple-600/20 backdrop-blur-sm rounded-full mb-6">
                <span className="text-purple-400 font-semibold text-sm sm:text-base">Get in Touch</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
                Take the First Step
              </h2>
              
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto">
                Have a project in mind? Let's talk. We'll get back to you within 24 hours — no pressure, no commitment.
              </p>
            </div>

            {/* CTA Button with Animation */}
            <div
              className={`transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <button
                onClick={() => setShowForm(true)}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-lg text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
              >
                {/* Animated shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
                
                <span className="relative">Contact Us Today</span>
                <ArrowRight className="relative group-hover:translate-x-2 transition-transform" size={20} />
              </button>
            </div>

            {/* Decorative line */}
            <div
              className={`mt-12 sm:mt-16 transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 w-full' : 'opacity-0 w-0'
              }`}
            >
              <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto"></div>
            </div>
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            ></div>
          ))}
        </div>
      </section>

      {/* Contact Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fadeIn">
          <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-800 animate-slideUp custom-scrollbar">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-orange-500 text-white p-4 sm:p-6 rounded-t-2xl flex justify-between items-center z-10">
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold mb-1 animate-fadeInUp">Take the first step</h3>
                <p className="text-xs sm:text-sm text-white/90 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                  Fill in your details and we'll get back to you within 24 hours
                </p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                disabled={isSubmitting}
                className="ml-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 hover:rotate-90 transition-all duration-300 disabled:opacity-50"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-gray-300">
                    <User size={16} className="text-purple-400" />
                    First Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-500 hover:bg-gray-800/70 disabled:opacity-50"
                    placeholder="John"
                  />
                </div>
                <div className="animate-fadeInUp" style={{ animationDelay: '0.25s' }}>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-gray-300">
                    <User size={16} className="text-purple-400" />
                    Last Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-500 hover:bg-gray-800/70 disabled:opacity-50"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-gray-300">
                    <Mail size={16} className="text-purple-400" />
                    Email <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-500 hover:bg-gray-800/70 disabled:opacity-50"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="animate-fadeInUp" style={{ animationDelay: '0.35s' }}>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-gray-300">
                    <Phone size={16} className="text-purple-400" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-500 hover:bg-gray-800/70 disabled:opacity-50"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-gray-300">
                  <MessageSquare size={16} className="text-purple-400" />
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none text-white placeholder-gray-500 hover:bg-gray-800/70 disabled:opacity-50"
                  placeholder="Tell us about your project and requirements..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-6 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full group relative bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 flex items-center justify-center gap-2 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
                  <span className="relative">{isSubmitting ? 'Sending...' : 'Submit Form'}</span>
                  {!isSubmitting && <ArrowRight className="relative group-hover:translate-x-1 transition-transform" size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 right-4 sm:right-8 z-[60] animate-slideInRight">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl border backdrop-blur-md min-w-[320px] sm:min-w-[400px] ${
            toastType === 'success' 
              ? 'bg-black border-green-500/50' 
              : 'bg-black border-red-500/50'
          }`}>
            <div className={`flex-shrink-0 ${
              toastType === 'success' ? 'text-green-400' : 'text-red-400'
            }`}>
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
              <p className="text-gray-300 text-xs sm:text-sm mt-1">{toastMessage}</p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Custom Black Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #000000;
          border-radius: 0 10px 10px 0;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1a1a1a;
          border-radius: 6px;
          border: 2px solid #000000;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2a2a2a;
        }
        
        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #1a1a1a #000000;
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
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default ContactSection;