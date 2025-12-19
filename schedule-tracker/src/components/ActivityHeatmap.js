import React from 'react';
import { useGamification } from '../context/GamificationContext';

/**
 * ActivityHeatmap Component
 * Displays a GitHub-style contribution graph for the last 365 days.
 */
function ActivityHeatmap({ tasks }) {
    // Generate last 365 days
    const generateDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 364; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            dates.push(d.toISOString().split('T')[0]);
        }
        return dates;
    };

    const dates = generateDates();

    // Calculate intensity map
    const intensityMap = dates.reduce((acc, date) => {
        // Count completed tasks for this date
        const count = tasks.filter(t => t.date === date && t.completed).length;
        acc[date] = count;
        return acc;
    }, {});

    const getIntensityColor = (count) => {
        if (count === 0) return 'rgba(255, 255, 255, 0.05)';
        if (count <= 2) return 'rgba(16, 185, 129, 0.3)'; // Low
        if (count <= 5) return 'rgba(16, 185, 129, 0.6)'; // Medium
        return '#10b981'; // High
    };

    return (
        <div className="glass-panel" style={{ padding: '24px', gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', color: 'white' }}>Consistency Graph</h3>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>Last 365 Days</div>
            </div>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '4px',
                maxWidth: '100%',
                overflowX: 'auto'
            }}>
                {dates.map((date) => (
                    <div
                        key={date}
                        title={`${date}: ${intensityMap[date] || 0} tasks`}
                        style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '2px',
                            backgroundColor: getIntensityColor(intensityMap[date] || 0),
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.5)';
                            e.currentTarget.style.zIndex = '10';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.zIndex = '1';
                        }}
                    />
                ))}
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '12px', fontSize: '11px', color: '#6b7280' }}>
                <span>Less</span>
                <div style={{ width: '10px', height: '10px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '2px' }} />
                <div style={{ width: '10px', height: '10px', background: 'rgba(16, 185, 129, 0.3)', borderRadius: '2px' }} />
                <div style={{ width: '10px', height: '10px', background: 'rgba(16, 185, 129, 0.6)', borderRadius: '2px' }} />
                <div style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '2px' }} />
                <span>More</span>
            </div>
        </div>
    );
}

export default ActivityHeatmap;
