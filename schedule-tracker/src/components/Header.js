import React from 'react';
import PropTypes from 'prop-types';
import { Home } from 'lucide-react';
import Logo from './Logo';

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
          <Logo size="medium" />
          <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.9rem', marginLeft: '12px', borderLeft: '1px solid #333', paddingLeft: '12px' }}>{formatDate(currentDate)}</p>
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
