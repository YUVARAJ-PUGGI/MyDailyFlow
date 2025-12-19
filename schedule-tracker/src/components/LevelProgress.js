import React from 'react';
import { useGamification } from '../context/GamificationContext';
import { Trophy, Zap } from 'lucide-react';

/**
 * LevelProgress Component
 * Displays the user's current level, XP bar, and streak.
 */
function LevelProgress() {
    const { xp, level, nextLevelXp, streak } = useGamification();

    // Calculate percentage
    const progressPercent = Math.min(100, (xp / nextLevelXp) * 100);

    return (
        <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px', background: 'linear-gradient(145deg, rgba(20,20,30,0.6) 0%, rgba(30,30,50,0.4) 100%)' }}>

            {/* Header: Level & Streak */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                        width: '36px', height: '36px', borderRadius: '10px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                    }}>
                        <Trophy size={18} color="white" />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '0.9rem', color: '#9ca3af' }}>Current Level</h3>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>Level {level}</div>
                    </div>
                </div>

                {/* Streak Badge */}
                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '12px', boxSizing: 'border-box'
                }}>
                    <Zap size={16} color="#fbbf24" fill="#fbbf24" />
                    <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#fbbf24' }}>{streak} Days</span>
                </div>
            </div>

            {/* XP Bar */}
            <div style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px', color: '#d1d5db' }}>
                    <span>XP Progress</span>
                    <span><span style={{ color: '#60a5fa' }}>{Math.floor(xp)}</span> / {nextLevelXp}</span>
                </div>
                <div style={{
                    height: '8px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden'
                }}>
                    <div style={{
                        height: '100%',
                        width: `${progressPercent}%`,
                        background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                        borderRadius: '4px',
                        transition: 'width 0.5s ease-out',
                        boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
                    }} />
                </div>
            </div>

            {/* Motivation Text */}
            <div style={{ fontSize: '0.75rem', color: '#6b7280', textAlign: 'center', marginTop: '12px' }}>
                {nextLevelXp - xp} XP to reach Level {level + 1}
            </div>
        </div>
    );
}

export default LevelProgress;
