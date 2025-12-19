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
        <div className="header-title">
          <Calendar size={32} color="#8b5cf6" />
          <div>
            <h1>My Schedule Tracker</h1>
            <p>{formatDate(currentDate)}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            onClick={onBackToHome}
            className="back-to-home-btn"
            aria-label="Back to home page"
            title="Back to home page"
          >
            <Home size={18} />
            <span>Home</span>
          </button>

          <input
            type="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className="date-input"
            aria-label="Select date"
          />
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
