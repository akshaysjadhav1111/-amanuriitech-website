import React, { useState, useEffect } from 'react';
import { ChevronRight, Globe, Smartphone, Brain, CheckCircle } from 'lucide-react';

const OurProjectsSection = ({ initialTab = 'web' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
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

  // Listen for tab change events from navbar
  useEffect(() => {
    const handleTabChange = (event) => {
      setActiveTab(event.detail);
    };
    
    window.addEventListener('changeProjectTab', handleTabChange);
    return () => window.removeEventListener('changeProjectTab', handleTabChange);
  }, []);

  // Update tab when initialTab prop changes
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const projects = {
    web: {
      title: 'Web Development',
      icon: Globe,
      items: [
        { 
          name: 'E-Commerce Platform', 
          desc: 'Full-featured online store with payment integration, inventory management, and real-time analytics dashboard'
        },
        { 
          name: 'Corporate Website Redesign', 
          desc: 'Modern, responsive website with CMS integration, SEO optimization, and enhanced user experience'
        },
        { 
          name: 'SaaS Dashboard Application', 
          desc: 'Cloud-based platform with advanced data visualization, user management, and API integrations'
        },
        { 
          name: 'Real Estate Portal', 
          desc: 'Property listing platform with advanced search filters, virtual tours, and lead management system'
        },
        { 
          name: 'Healthcare Appointment System', 
          desc: 'Patient portal with online booking, electronic health records, and telemedicine capabilities'
        },
        { 
          name: 'Educational Learning Platform', 
          desc: 'Interactive e-learning system with course management, progress tracking, and certification features'
        }
      ]
    },
    app: {
      title: 'App Development',
      icon: Smartphone,
      items: [
        { 
          name: 'Fitness Tracking App', 
          desc: 'Cross-platform mobile app with workout plans, nutrition tracking, and social community features'
        },
        { 
          name: 'Food Delivery Application', 
          desc: 'On-demand delivery app with real-time tracking, payment gateway, and restaurant management system'
        },
        { 
          name: 'Banking & Finance App', 
          desc: 'Secure mobile banking solution with biometric authentication, transaction history, and investment tracking'
        },
        { 
          name: 'Social Networking Platform', 
          desc: 'Feature-rich social app with messaging, content sharing, and AI-powered recommendation engine'
        },
        { 
          name: 'Travel Booking App', 
          desc: 'Comprehensive travel solution with flight/hotel booking, itinerary planning, and travel guides'
        },
        { 
          name: 'Smart Home Controller', 
          desc: 'IoT mobile application for controlling smart devices, automation routines, and energy monitoring'
        }
      ]
    },
    ai: {
      title: 'AI & ML',
      icon: Brain,
      items: [
        { 
          name: 'Predictive Analytics Engine', 
          desc: 'Machine learning model for sales forecasting, customer behavior prediction, and market trend analysis'
        },
        { 
          name: 'Computer Vision System', 
          desc: 'AI-powered image recognition for quality control, object detection, and automated inspection processes'
        },
        { 
          name: 'Natural Language Processing Bot', 
          desc: 'Intelligent chatbot with sentiment analysis, intent recognition, and multi-language support'
        },
        { 
          name: 'Recommendation System', 
          desc: 'Personalized content recommendation engine using collaborative filtering and deep learning algorithms'
        },
        { 
          name: 'Fraud Detection Platform', 
          desc: 'Real-time anomaly detection system using ML models for transaction monitoring and risk assessment'
        },
        { 
          name: 'AI Document Processing', 
          desc: 'Automated document classification, data extraction, and intelligent workflow routing system'
        }
      ]
    }
  };

  return (
    <div className="bg-black text-white">
      {/* Projects Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="projects-title"
            data-animate
            className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
              isVisible['projects-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-block px-4 py-2 bg-purple-600/20 rounded-full mb-4">
              <span className="text-purple-400 font-semibold text-sm sm:text-base">Our Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">
                {' '}Projects
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Innovative solutions delivered across web, mobile, and AI technologies
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 flex-wrap px-2">
            {Object.entries(projects).map(([key, { title, icon: Icon }]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                  activeTab === key
                    ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                }`}
              >
                <Icon size={18} className="sm:w-5 sm:h-5" />
                {title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects[activeTab].items.map((item, index) => (
              <div
                key={index}
                className="group p-4 sm:p-6 rounded-lg border border-gray-800 bg-gray-900/50 backdrop-blur hover:border-purple-500 transition-all duration-300 hover:scale-105 cursor-pointer hover:shadow-xl hover:shadow-purple-500/20"
              >
                <div className="flex items-start gap-3 mb-3 sm:mb-4">
                  <CheckCircle className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                  <h3 className="text-lg sm:text-xl font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-orange-400 transition-all duration-300">
                    {item.name}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4 leading-relaxed">{item.desc}</p>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Ready to Build Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">
                {' '}Next Project?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8">
              Let's collaborate to bring your vision to life with cutting-edge technology solutions
            </p>
            <button className="group bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 flex items-center mx-auto">
              Start Your Project
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurProjectsSection;