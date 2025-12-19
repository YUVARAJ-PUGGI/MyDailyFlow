import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, Home } from 'lucide-react';

/**
 * Header Component
 * Displays app title and date picker
 * Stats are now displayed in the sidebar
 */
function Header({ currentDate, setCurrentDate, onBackToHome }) {
  // Format date for better display
  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <header className="glass-header">
      <div className="header-content">
        <div className="header-title" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '10px', borderRadius: '12px' }}>
            <Calendar size={28} color="#60a5fa" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: 'white' }}>Schedule Tracker</h1>
            <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.9rem' }}>{formatDate(currentDate)}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="date-picker-wrapper">
            <input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              className="form-input"
            />
          </div>

          <button
            onClick={onBackToHome}
            className="btn-icon"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'rgba(255,255,255,0.08)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
            title="Back to home page"
          >
            <Home size={18} />
            <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>Home</span>
          </button>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  currentDate: PropTypes.string.isRequired,
  setCurrentDate: PropTypes.func.isRequired,
  onBackToHome: PropTypes.func.isRequired
};

export default Header;
