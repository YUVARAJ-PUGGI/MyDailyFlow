import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ArrowRight, Calendar, Clock, BarChart3, Zap, Shield, Sparkles } from 'lucide-react';


/**
 * LandingPage Component (3D Tech Upgrade)
 */
function LandingPage({ onGetStarted }) {
  const tiltRef = useRef(null);

  // Simple 3D Tilt Effect on Mouse Move
  const handleMouseMove = (e) => {
    if (!tiltRef.current) return;
    const card = tiltRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!tiltRef.current) return;
    tiltRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  };

  return (
    <div className="landing-page">
      {/* 3D Animated Background */}
      <div className="cyber-grid-bg"></div>
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>

      {/* Navigation */}
      <nav className="glass-header">
        <div className="header-content">
          <div className="header-title">
            <Calendar color="#00f0ff" size={32} />
            <h1 className="gradient-text" style={{ fontSize: '24px', margin: 0 }}>
              MyDaily<span style={{ color: 'white' }}>Flow</span>
            </h1>
          </div>
          <button onClick={onGetStarted} className="btn-primary" style={{ width: 'auto', padding: '10px 24px', marginTop: 0 }}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '800px', padding: '0 20px' }}>
          <div
            className="feature-chip fade-in"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: 'rgba(0, 240, 255, 0.1)',
              border: '1px solid #00f0ff',
              borderRadius: '99px',
              color: '#00f0ff',
              marginBottom: '24px',
              fontSize: '14px',
              fontWeight: '600',
              boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)'
            }}
          >
            <Sparkles size={16} />
            <span>Next Gen Task Management</span>
          </div>

          <h1 className="gradient-text fade-in" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: '800', lineHeight: 1.1, marginBottom: '24px' }}>
            Master Your Time in <br />
            <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent' }}>3D Space</span>
          </h1>

          <p className="fade-in" style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            Experience the future of productivity with our immersive, high-performance schedule tracker. Built for the modern web.
          </p>

          <div
            ref={tiltRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="glass-panel tilt-card fade-in"
            style={{ display: 'inline-block', padding: '40px', cursor: 'default' }}
          >
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '30px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>10x</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Focus</div>
              </div>
              <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>100%</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Control</div>
              </div>
            </div>

            <button
              onClick={onGetStarted}
              className="btn-primary"
              style={{ fontSize: '18px', padding: '16px 40px', display: 'flex', alignItems: 'center', gap: '12px', margin: '0 0' }}
            >
              Get Started Now <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '80px 20px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="gradient-text" style={{ fontSize: '36px', textAlign: 'center', marginBottom: '60px', fontWeight: '800' }}>
            Why Choose MyDailyFlow?
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div className="glass-panel tilt-card">
              <div style={{ background: 'rgba(112, 0, 255, 0.2)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Zap size={24} color="#7000ff" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>Lightning Fast</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Optimized for speed with instant interactions and zero lag. Feel the power of modern web tech.
              </p>
            </div>

            <div className="glass-panel tilt-card" style={{ transform: 'translateY(20px)' }}>
              <div style={{ background: 'rgba(0, 240, 255, 0.2)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Shield size={24} color="#00f0ff" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>Secure & Private</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Your data stays local. No cloud leaks, just pure localized productivity storage.
              </p>
            </div>

            <div className="glass-panel tilt-card">
              <div style={{ background: 'rgba(255, 0, 85, 0.2)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <BarChart3 size={24} color="#ff0055" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>Visual Analytics</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Track your progress with beautiful, real-time data visualization and insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Engineering Students */}
      <section style={{ padding: '80px 20px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="gradient-text" style={{ fontSize: '36px', textAlign: 'center', marginBottom: '60px', fontWeight: '800' }}>
            Perfect for Engineering Students
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div className="glass-panel tilt-card">
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#00f0ff', marginBottom: '12px' }}>DSA & Coding</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Dedicated categories for Data Structures and Algorithms practice. Track your coding streaks.
              </p>
            </div>

            <div className="glass-panel tilt-card">
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#7000ff', marginBottom: '12px' }}>Project Management</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Break down complex final year projects into manageable sprints and tasks.
              </p>
            </div>

            <div className="glass-panel tilt-card">
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ff0055', marginBottom: '12px' }}>Exam Prep</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Optimize your study schedule with time-blocking for optimal retention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '80px 20px', position: 'relative', zIndex: 1, paddingBottom: '120px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="gradient-text" style={{ fontSize: '36px', marginBottom: '60px', fontWeight: '800' }}>
            How It Works
          </h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px', textAlign: 'left' }}>
            <div className="glass-panel tilt-card" style={{ flex: '1 1 300px', position: 'relative' }}>
              <div style={{ fontSize: '80px', fontWeight: '900', color: 'rgba(255,255,255,0.05)', position: 'absolute', top: '10px', right: '20px' }}>1</div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>Plan</h3>
              <p style={{ color: 'var(--text-muted)' }}>Add your tasks for the day. Categorize them into DSA, Dev, or Study.</p>
            </div>

            <div className="glass-panel tilt-card" style={{ flex: '1 1 300px', position: 'relative' }}>
              <div style={{ fontSize: '80px', fontWeight: '900', color: 'rgba(255,255,255,0.05)', position: 'absolute', top: '10px', right: '20px' }}>2</div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>Focus</h3>
              <p style={{ color: 'var(--text-muted)' }}>Execute your tasks. The UI stays out of your way so you can code.</p>
            </div>

            <div className="glass-panel tilt-card" style={{ flex: '1 1 300px', position: 'relative' }}>
              <div style={{ fontSize: '80px', fontWeight: '900', color: 'rgba(255,255,255,0.05)', position: 'absolute', top: '10px', right: '20px' }}>3</div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>Track</h3>
              <p style={{ color: 'var(--text-muted)' }}>Mark tasks complete and visualize your productivity in the stats dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '60px 20px',
        position: 'relative',
        zIndex: 1,
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px' }}>
              <Calendar color="#00f0ff" size={28} />
              <h2 className="gradient-text" style={{ fontSize: '24px', margin: 0, fontWeight: 'bold' }}>
                MyDaily<span style={{ color: 'white' }}>Flow</span>
              </h2>
            </div>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
              Empowering engineering students to master their time, achieve their goals, and maintain a balanced lifestyle through intelligent scheduling.
            </p>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            margin: '32px 0',
            color: 'white',
            fontSize: '14px',
            flexWrap: 'wrap'
          }}>
            <span style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>Cookie Policy</span>
            <span style={{ color: 'var(--text-muted)' }}>•</span>
            <span style={{ color: 'var(--text-muted)' }}>Built with ❤️ for students.</span>
          </div>

          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
            © 2025 MyDailyFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

LandingPage.propTypes = {
  onGetStarted: PropTypes.func.isRequired
};

export default LandingPage;
