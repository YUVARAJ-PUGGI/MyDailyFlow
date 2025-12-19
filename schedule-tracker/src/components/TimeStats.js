import React from 'react';
import PropTypes from 'prop-types';
import { BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { getCategoryStyle } from '../constants/categories';

/**
 * TimeStats Component
 * Displays time spent on each category using a Pie Chart
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

    // Transform to array for Recharts
    return Object.entries(stats).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(1)),
      color: getCategoryStyle(name).color
    })).filter(item => item.value > 0);
  };

  const chartData = calculateTimeSpent();
  const totalHours = chartData.reduce((acc, item) => acc + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: 'rgba(0,0,0,0.8)', padding: '8px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', color: 'white' }}>
          <p>{`${payload[0].name} : ${payload[0].value}h`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="widget-card glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BarChart3 size={20} color="var(--primary)" />
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'white', margin: 0 }}>
            Time Distribution
          </h3>
        </div>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{totalHours.toFixed(1)}h Total</span>
      </div>

      {chartData.length === 0 ? (
        <div className="empty-state" style={{ padding: '20px', textAlign: 'center', opacity: 0.5 }}>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>No completed tasks yet.</p>
        </div>
      ) : (
        <div style={{ height: '200px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {chartData.map((entry) => (
          <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: entry.color }}></div>
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
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