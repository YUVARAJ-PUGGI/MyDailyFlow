import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ArrowRight, Calendar, Zap, Shield, BarChart3, Code, Cpu, BookOpen } from 'lucide-react';

/**
 * LandingPage Component
 * A modern, high-performance landing page for MyDailyFlow.
 */
function LandingPage({ onGetStarted }) {
  const tiltRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!tiltRef.current) return;
    const card = tiltRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!tiltRef.current) return;
    tiltRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  };

  return (
    <div className="landing-page">
      <div className="background-gradient"></div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Calendar className="logo-icon" size={28} />
            <span className="logo-text">MyDaily<span className="text-highlight">Flow</span></span>
          </div>
          <button onClick={onGetStarted} className="btn-primary-small">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">Built for Engineering Students</span>
          </div>
          <h1 className="hero-title">
            Master Your Time, <br />
            <span className="text-gradient">Ace Your Goals.</span>
          </h1>
          <p className="hero-subtitle">
            The intelligent schedule tracker designed to help you balance complex coding projects,
            DSA practice, and academic life with ease.
          </p>

          <div className="hero-actions">
            <button onClick={onGetStarted} className="btn-primary-large">
              Start Scheduling Now <ArrowRight size={20} />
            </button>
            <button className="btn-secondary-large">
              Learn More
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div
            className="hero-card glass-panel"
            ref={tiltRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-header">
              <div className="card-dot red"></div>
              <div className="card-dot yellow"></div>
              <div className="card-dot green"></div>
            </div>
            <div className="card-body">
              <div className="mock-schedule-item active">
                <Code size={16} /> <span>DSA Practice (Graphs)</span> <span className="time">2h</span>
              </div>
              <div className="mock-schedule-item">
                <Cpu size={16} /> <span>System Design Study</span> <span className="time">1.5h</span>
              </div>
              <div className="mock-schedule-item">
                <BookOpen size={16} /> <span>Final Year Project</span> <span className="time">3h</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Why MyDailyFlow? */}
      <section className="features-section">
        <div className="section-header">
          <h2>Intelligent Scheduling</h2>
          <p>Why engineering students choose MyDailyFlow</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="icon-box blue"><Zap size={24} /></div>
            <h3>Lightning Fast flow</h3>
            <p>Input tasks in seconds. Drag, drop, and organize your day without breaking your coding flow.</p>
          </div>
          <div className="feature-card">
            <div className="icon-box purple"><BarChart3 size={24} /></div>
            <h3>Visual Analytics</h3>
            <p>Track your study hours, coding streaks, and project progress with beautiful, real-time charts.</p>
          </div>
          <div className="feature-card">
            <div className="icon-box pink"><Shield size={24} /></div>
            <h3>Distraction Free</h3>
            <p>A minimal, dark-mode interface that helps you focus on what matters: shipping code and passing exams.</p>
          </div>
          <div className="feature-card">
            <div className="icon-box green"><Code size={24} /></div>
            <h3>Smart Goals</h3>
            <p>Set daily coding targets and sync them with your GitHub activity for maximum accountability.</p>
          </div>
        </div>
      </section>

      {/* Visual Showcase Section */}
      <section className="visual-section">
        <div className="visual-container">
          <div className="visual-card-left glass-panel">
            <div className="card-header">
              <h3>Weekly Progress</h3>
            </div>
            <div className="mock-chart">
              <div className="bar" style={{ height: '40%' }}></div>
              <div className="bar" style={{ height: '70%' }}></div>
              <div className="bar" style={{ height: '50%' }}></div>
              <div className="bar active" style={{ height: '90%' }}></div>
              <div className="bar" style={{ height: '60%' }}></div>
            </div>
            <div className="card-footer-text">You are crushing it! 🔥</div>
          </div>
          <div className="visual-text">
            <h2>Visualize Your Growth</h2>
            <p>See your study habits improve over time with detailed analytics and insights.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <Calendar size={24} />
            <span>MyDailyFlow</span>
          </div>
          <div className="footer-links">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Contact</span>
          </div>
          <p className="copyright">© 2025 MyDailyFlow. Built with ❤️ for students.</p>
        </div>
      </footer>
    </div>
  );
}

LandingPage.propTypes = {
  onGetStarted: PropTypes.func.isRequired
};

export default LandingPage;
