import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const PomodoroTimer = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('focus'); // 'focus' or 'break'

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((timeLeft) => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            // Optional: Play sound here
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="widget-card glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                Focus Timer
            </h3>

            <div className="timer-display" style={{
                fontSize: '48px',
                fontWeight: '700',
                color: mode === 'focus' ? 'var(--primary)' : 'var(--accent)',
                fontFamily: 'monospace',
                margin: '10px 0'
            }}>
                {formatTime(timeLeft)}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
                <button
                    onClick={() => switchMode('focus')}
                    className={mode === 'focus' ? 'btn-xs active' : 'btn-xs'}
                    style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        border: '1px solid var(--glass-border)',
                        background: mode === 'focus' ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                        color: mode === 'focus' ? 'white' : 'var(--text-muted)',
                        cursor: 'pointer'
                    }}
                >
                    Focus
                </button>
                <button
                    onClick={() => switchMode('break')}
                    className={mode === 'break' ? 'btn-xs active' : 'btn-xs'}
                    style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        border: '1px solid var(--glass-border)',
                        background: mode === 'break' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                        color: mode === 'break' ? 'white' : 'var(--text-muted)',
                        cursor: 'pointer'
                    }}
                >
                    Break
                </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <button
                    onClick={toggleTimer}
                    className="btn-icon-circle"
                    style={{
                        width: '40px', height: '40px', borderRadius: '50%',
                        background: 'var(--primary)', color: 'white', border: 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', boxShadow: '0 0 15px var(--primary-glow)'
                    }}
                >
                    {isActive ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
                </button>
                <button
                    onClick={resetTimer}
                    className="btn-icon-circle"
                    style={{
                        width: '40px', height: '40px', borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid var(--glass-border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <RotateCcw size={18} />
                </button>
            </div>
        </div>
    );
};

export default PomodoroTimer;
