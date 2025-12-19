import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Brain, Coffee } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';
import { toast } from 'react-toastify';

const PomodoroTimer = () => {
    const { addXP } = useGamification();
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('focus'); // 'focus' or 'break'
    const [totalTime, setTotalTime] = useState(25 * 60);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((timeLeft) => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            handleTimerComplete();
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const handleTimerComplete = () => {
        // Play notification sound (optional)

        if (mode === 'focus') {
            addXP(100);
            toast.success("Focus Session Complete! +100 XP 🎯", {
                icon: "🔥"
            });
            // Auto switch to break?
            switchMode('break');
        } else {
            toast.info("Break is over! Time to focus.", {
                icon: "☕"
            });
            switchMode('focus');
        }
    };

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setIsActive(false);
        const newTime = newMode === 'focus' ? 25 * 60 : 5 * 60;
        setTotalTime(newTime);
        setTimeLeft(newTime);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Calculate Progress Circle
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const progress = 1 - (timeLeft / totalTime);
    const strokeDashoffset = circumference * (1 - progress);

    return (
        <div className="widget-card glass-panel" style={{ padding: '24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>

            {/* Header */}
            <h3 style={{
                color: mode === 'focus' ? '#60a5fa' : '#34d399',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}>
                {mode === 'focus' ? <Brain size={16} /> : <Coffee size={16} />}
                {mode === 'focus' ? 'Deep Work' : 'Chill Mode'}
            </h3>

            {/* Circular Timer UI */}
            <div style={{ position: 'relative', width: '140px', height: '140px', margin: '0 auto 24px' }}>
                {/* Background Circle */}
                <svg width="140" height="140" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                </svg>

                {/* Progress Circle */}
                <svg width="140" height="140" viewBox="0 0 120 120" style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
                    <circle
                        cx="60" cy="60" r={radius}
                        fill="none"
                        stroke={mode === 'focus' ? '#3b82f6' : '#10b981'}
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 1s linear' }}
                    />
                </svg>

                {/* Time Text */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', fontFamily: 'monospace', color: 'white' }}>
                        {formatTime(timeLeft)}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <button
                    onClick={toggleTimer}
                    className="btn-icon-circle"
                    style={{
                        width: '48px', height: '48px', borderRadius: '50%',
                        background: 'white', color: mode === 'focus' ? '#3b82f6' : '#10b981', border: 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', boxShadow: '0 0 20px rgba(255,255,255,0.2)',
                        transition: 'transform 0.1s'
                    }}
                    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    {isActive ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" style={{ marginLeft: '2px' }} />}
                </button>
                <button
                    onClick={resetTimer}
                    className="btn-icon-circle"
                    style={{
                        width: '48px', height: '48px', borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <RotateCcw size={20} />
                </button>
            </div>

            {/* Quick Switch */}
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button onClick={() => switchMode('focus')} style={{ opacity: mode === 'focus' ? 1 : 0.4, background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '12px' }}>Focus</button>
                <span style={{ color: '#555' }}>|</span>
                <button onClick={() => switchMode('break')} style={{ opacity: mode === 'break' ? 1 : 0.4, background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '12px' }}>Break</button>
            </div>
        </div>
    );
};

export default PomodoroTimer;
