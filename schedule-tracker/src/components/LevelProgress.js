import React, { useState } from 'react';
import { useGamification } from '../context/GamificationContext';
import { Trophy, Zap, Palette } from 'lucide-react';
import ThemeShop from './ThemeShop';

/**
 * LevelProgress Component
 * Displays the user's current level, XP bar, and streak.
 */
function LevelProgress() {
    const { xp, level, nextLevelXp, streak } = useGamification();

    // Calculate percentage
    const progressPercent = Math.min((xp / nextLevelXp) * 100, 100);
    const [showShop, setShowShop] = useState(false);
    // levelUp is not defined in the original code, assuming it's a placeholder for a future feature or context value.
    // For now, setting it to false to avoid errors. If it's meant to come from context, it should be destructured from useGamification().
    const levelUp = false;

    return (
        <div className="glass-panel" style={{ padding: '24px', position: 'relative' }}>
            {/* Level Up Notification Overlay */}
            {levelUp && (
                <div style={{
                    position: 'absolute', inset: 0, background: 'rgba(16, 185, 129, 0.9)',
                    borderRadius: '24px', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.3s ease',
                    backdropFilter: 'blur(4px)', zIndex: 10
                }}>
                    <Trophy size={48} color="white" style={{ animation: 'bounce 1s infinite' }} />
                    <h2 style={{ color: 'white', margin: '8px 0 0 0' }}>LEVEL UP!</h2>
                </div>
            )}

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, color: '#e0e7ff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Level {level}
                    <Trophy size={20} color="#facc15" />
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ color: '#a78bfa', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Zap size={18} /> {streak} Day Streak
                    </span>
                    <button
                        onClick={() => setShowShop(true)}
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                            display: 'flex', alignItems: 'center', color: '#e0e7ff'
                        }}
                        title="Open Theme Shop"
                    >
                        <Palette size={20} />
                    </button>
                </div>
            </div>

            {/* XP Bar */}
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

            {/* Motivation Text */}
            <div style={{ fontSize: '0.75rem', color: '#6b7280', textAlign: 'center', marginTop: '12px' }}>
                {nextLevelXp - xp} XP to reach Level {level + 1}
            </div>

            {showShop && <ThemeShop onClose={() => setShowShop(false)} />}
        </div>
    );
}

export default LevelProgress;
