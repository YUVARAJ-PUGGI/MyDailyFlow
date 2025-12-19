import React, { useState } from 'react';
import { Flame } from 'lucide-react';

const StreakTracker = () => {
    const [streak, setStreak] = useState(5); // Mock data for now
    const [checkedToday, setCheckedToday] = useState(false);

    const handleCheckIn = () => {
        if (!checkedToday) {
            setStreak(s => s + 1);
            setCheckedToday(true);
        }
    };

    return (
        <div className="widget-card glass-panel" style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(255, 107, 74, 0.1), rgba(20, 20, 30, 0.6))', border: '1px solid rgba(255, 107, 74, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Flame color="#ff6b4a" fill="#ff6b4a" size={20} />
                <h3 style={{ color: '#ff6b4a', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
                    Daily Streak
                </h3>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: 'white' }}>{streak} Days</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Keep formatting code!</div>
                </div>
                <button
                    onClick={handleCheckIn}
                    disabled={checkedToday}
                    style={{
                        padding: '8px 16px',
                        background: checkedToday ? 'rgba(255,255,255,0.1)' : '#ff6b4a',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: checkedToday ? 'default' : 'pointer',
                        fontWeight: '600',
                        fontSize: '12px'
                    }}
                >
                    {checkedToday ? 'Done' : 'Check In'}
                </button>
            </div>
        </div>
    );
};

export default StreakTracker;
