import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, Home } from 'lucide-react';

/**
 * Header Component
 * Displays app title, date picker, and daily statistics
 */
function Header({ currentDate, setCurrentDate, totalTasks, completedTasks, onBackToHome }) {
  const progress = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

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
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <Calendar className="icon-large" />
          <div>
            <h1>My Schedule Tracker</h1>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              fontSize: '14px', 
              marginTop: '4px' 
            }}>
              {formatDate(currentDate)}
            </p>
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
      
      <div className="stats-bar">
        <div className="stat-box stat-total">
          <span className="stat-label">Total Tasks</span>
          <span className="stat-value">{totalTasks}</span>
        </div>
        
        <div className="stat-box stat-completed">
          <span className="stat-label">Completed</span>
          <span className="stat-value">{completedTasks}</span>
        </div>
        
        <div className="stat-box stat-progress">
          <span className="stat-label">Progre,
  onBackToHome: PropTypes.func.isRequiredss</span>
          <span className="stat-value">{progress}%</span>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  currentDate: PropTypes.string.isRequired,
  setCurrentDate: PropTypes.func.isRequired,
  totalTasks: PropTypes.number.isRequired,
  completedTasks: PropTypes.number.isRequired
};

export default Header;