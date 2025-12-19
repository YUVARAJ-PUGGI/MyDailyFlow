import React from 'react';
import PropTypes from 'prop-types';
import { BarChart3 } from 'lucide-react';
import { getCategoryStyle } from '../constants/categories';

/**
 * TimeStats Component
 * Displays time spent on each category
 */
function TimeStats({ tasks }) {
  const calculateTimeSpent = () => {
    const stats = {};
    tasks.forEach(task => {
      if (task.completed) {
        const start = new Date(`2000-01-01T${task.startTime24 || task.startTime || '00:00'}`);
        const end = new Date(`2000-01-01T${task.endTime24 || task.endTime || '00:00'}`);

        // Handle next day scenarios
        if (end < start) {
          end.setDate(end.getDate() + 1);
        }

        const hours = (end - start) / (1000 * 60 * 60);
        stats[task.category] = (stats[task.category] || 0) + hours;
      }
    });
    return stats;
  };

  const timeStats = calculateTimeSpent();
  const totalHours = Object.values(timeStats).reduce((a, b) => a + b, 0);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div className="icon-badge gradient-blue">
          <BarChart3 size={24} color="white" />
        </div>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', margin: 0 }}>
          Time Spent Today
        </h3>
      </div>

      {Object.keys(timeStats).length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📊</div>
          <p className="empty-state-text">
            Complete tasks to see time statistics
          </p>
        </div>
      ) : (
        <>
          <div className="stat-box">
            <span className="stat-label">
              Total Time Completed
            </span>
            <span className="stat-value">
              {totalHours.toFixed(1)}h
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(timeStats).map(([category, hours]) => {
              const catStyle = getCategoryStyle(category);
              return (
                <div
                  key={category}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 16px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                  }}
                >
                  <span style={{ color: catStyle.color, fontWeight: '600', fontSize: '14px' }}>
                    {category}
                  </span>
                  <span style={{ color: 'white', fontWeight: '700', fontSize: '16px' }}>
                    {hours.toFixed(1)}h
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

TimeStats.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      startTime24: PropTypes.string,
      endTime24: PropTypes.string
    })
  ).isRequired
};

export default TimeStats;