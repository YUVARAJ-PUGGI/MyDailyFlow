import React, { useState } from 'react';
import { 
  Calendar, Brain, BarChart3, Target, Clock, Zap,
  CheckCircle2, ArrowRight, ChevronDown,
  Menu, X, Code, BookOpen, Dumbbell, Heart, FlaskConical
} from 'lucide-react';
import './LandingPage.css';

const LandingPage = ({ onGetStarted }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const features = [
    {
      icon: <Brain />,
      title: 'AI-Powered Scheduling',
      description: 'Let our intelligent AI optimize your daily schedule based on your goals, energy levels, and deadlines.'
    },
    {
      icon: <Target />,
      title: 'Smart Task Management',
      description: 'Organize tasks with categories, priorities, and time estimates. Never miss an important deadline.'
    },
    {
      icon: <BarChart3 />,
      title: 'Time Analytics',
      description: 'Visualize how you spend your time with detailed charts and insights to improve productivity.'
    },
    {
      icon: <CheckCircle2 />,
      title: 'Goal Tracking',
      description: 'Set and track weekly/monthly goals. Monitor progress with visual indicators and achievement badges.'
    },
    {
      icon: <Clock />,
      title: 'Deadline Reminders',
      description: 'Get smart notifications before deadlines. Customize reminder timing for different task types.'
    },
    {
      icon: <Zap />,
      title: 'Quick Actions',
      description: 'Add tasks with voice commands, quick shortcuts, and templates for recurring activities.'
    }
  ];

  const benefits = [
    {
      icon: <Code />,
      title: 'Competitive Programming',
      description: 'Schedule daily DSA practice, track solved problems, and prepare for coding contests systematically.',
      color: '#d97706',
      bgColor: 'rgba(217, 119, 6, 0.1)'
    },
    {
      icon: <Target />,
      title: 'Project Management',
      description: 'Break down web development projects into tasks, set milestones, and track progress efficiently.',
      color: '#be185d',
      bgColor: 'rgba(190, 24, 93, 0.1)'
    },
    {
      icon: <BookOpen />,
      title: 'Exam Preparation',
      description: 'Create study schedules, allocate revision time, and ensure comprehensive exam coverage.',
      color: '#ca8a04',
      bgColor: 'rgba(202, 138, 4, 0.1)'
    },
    {
      icon: <FlaskConical />,
      title: 'Labs & Assignments',
      description: 'Manage college labs and assignments with dedicated time blocks and deadline tracking.',
      color: '#ea580c',
      bgColor: 'rgba(234, 88, 12, 0.1)'
    },
    {
      icon: <Dumbbell />,
      title: 'Fitness & Wellness',
      description: 'Maintain work-life balance with scheduled workout sessions and wellness activities.',
      color: '#dc2626',
      bgColor: 'rgba(220, 38, 38, 0.1)'
    },
    {
      icon: <Heart />,
      title: 'Balanced Lifestyle',
      description: 'Ensure time for breaks, hobbies, and social activities while staying productive.',
      color: '#16a34a',
      bgColor: 'rgba(22, 163, 74, 0.1)'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Sign Up Free',
      description: 'Create your account in seconds. No credit card required, no commitment.'
    },
    {
      number: '02',
      title: 'Add Your Tasks',
      description: 'Import existing tasks or start fresh. Categorize and set priorities effortlessly.'
    },
    {
      number: '03',
      title: 'AI Optimizes Your Day',
      description: 'Our smart algorithm creates the perfect schedule based on your preferences and goals.'
    },
    {
      number: '04',
      title: 'Track & Improve',
      description: 'Monitor progress with analytics. Adjust and refine your productivity system over time.'
    }
  ];

  const faqs = [
    {
      question: 'Is MyDailyFlow really free?',
      answer: 'Yes! MyDailyFlow is completely free to use. We believe productivity tools should be accessible to all students. No hidden fees, no premium tiers.'
    },
    {
      question: 'How does the AI scheduling work?',
      answer: 'Our AI analyzes your tasks, deadlines, energy patterns, and preferences to create an optimized daily schedule. It learns from your behavior to improve suggestions over time.'
    },
    {
      question: 'Can I use it on mobile devices?',
      answer: 'Absolutely! MyDailyFlow is fully responsive and works seamlessly on desktop, tablet, and mobile devices. Access your schedule anywhere, anytime.'
    },
    {
      question: 'Do you integrate with other tools?',
      answer: 'We support calendar sync (Google Calendar, Outlook), task imports from popular tools, and offer API access for custom integrations.'
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Your privacy is our priority. We use industry-standard encryption, never share your data with third parties, and you can export or delete your data anytime.'
    },
    {
      question: 'Can I collaborate with study groups?',
      answer: 'Yes! You can share tasks, create group schedules, and collaborate on projects with classmates. Perfect for team assignments and study sessions.'
    }
  ];

  return (
    <div className="landing-page">
      {/* Navigation Header */}
      <nav className="nav-header">
        <div className="nav-content">
          <div className="nav-logo" onClick={() => scrollToSection('hero')}>
            <Calendar className="logo-icon" />
            <span>MyDailyFlow</span>
          </div>

          <div className="nav-links">
            <a href="#features" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>
              Features
            </a>
            <a href="#benefits" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('benefits'); }}>
              Benefits
            </a>
            <a href="#how-it-works" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}>
              How It Works
            </a>
            <a href="#faq" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>
              FAQ
            </a>
          </div>

          <div className="nav-actions">
            <button className="btn-primary" onClick={onGetStarted}>
              Get Started
            </button>
          </div>

          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu open">
            <a href="#features" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>
              Features
            </a>
            <a href="#benefits" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('benefits'); }}>
              Benefits
            </a>
            <a href="#how-it-works" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}>
              How It Works
            </a>
            <a href="#faq" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>
              FAQ
            </a>
            <button className="btn-primary mobile-cta" onClick={onGetStarted}>
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Brain size={16} />
            <span>AI-Powered Schedule Management</span>
          </div>

          <h1 className="hero-title">Master Your Time, Ace Your Goals</h1>

          <p className="hero-subtitle">
            The ultimate productivity app for engineering students. Balance coding practice, projects, 
            exams, and wellness with AI-optimized scheduling.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary btn-large" onClick={onGetStarted}>
              Get Started
              <ArrowRight size={20} />
            </button>
            <button className="btn-secondary btn-large" onClick={() => scrollToSection('how-it-works')}>
              See How It Works
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">5,000+</div>
              <div className="stat-label">Active Students</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Tasks Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Powerful Features Built for You</h2>
            <p className="section-subtitle">
              Everything you need to stay organized, focused, and productive throughout your engineering journey.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  {React.cloneElement(feature.icon, { className: 'feature-icon' })}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Perfect for Every Aspect of Student Life</h2>
            <p className="section-subtitle">
              From competitive coding to fitness goals, manage everything in one unified platform.
            </p>
          </div>

          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="benefit-card" 
                style={{ borderLeftColor: benefit.color }}
              >
                <div className="benefit-icon" style={{ backgroundColor: benefit.bgColor }}>
                  {React.cloneElement(benefit.icon, { 
                    size: 24, 
                    style: { color: benefit.color } 
                  })}
                </div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Get Started in 4 Simple Steps</h2>
            <p className="section-subtitle">
              Start optimizing your productivity in minutes, not hours. No complex setup required.
            </p>
          </div>

          <div className="steps-container">
            {steps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{step.number}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing/CTA Section */}
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <Calendar size={32} />
              <span>MyDailyFlow</span>
            </div>
            <p className="footer-description">
              Empowering engineering students to master their time, achieve their goals, 
              and maintain a balanced lifestyle through intelligent scheduling.
            </p>
          </div>
        </div>

        <div className="footer-bottom"> Built with ❤️ for students.
          <p>&copy; 2025 MyDailyFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
