import React from 'react';
import ReactDOM from 'react-dom';
import { useTheme } from '../context/ThemeContext';
import { useGamification } from '../context/GamificationContext';
import { Palette, Lock, Check, Zap, X, ChevronLeft } from 'lucide-react';
import { toast } from 'react-toastify';

function ThemeShop({ onClose }) {
    const { currentTheme, unlockedThemes, unlockTheme, setTheme, THEMES } = useTheme();
    const { xp } = useGamification();

    const handleAction = (theme) => {
        if (unlockedThemes.includes(theme.id)) {
            setTheme(theme.id);
            toast.success(`Theme set to ${theme.name}!`);
        } else {
            if (theme.cost > xp) {
                toast.error(`Not enough XP! You need ${theme.cost - xp} more.`);
                return;
            }
            if (unlockTheme(theme.id)) {
                toast.success('Theme Unlocked!');
                setTheme(theme.id);
            }
        }
    };

    const modalContent = (
        <>
            {/* Backdrop */}
            <div
                style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(8px)', zIndex: 9999,
                    animation: 'fadeIn 0.2s ease'
                }}
                onClick={onClose}
            />

            {/* Modal */}
            <div className="glass-panel" style={{
                position: 'fixed',
                top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '90%', maxWidth: '420px',
                maxHeight: '85vh',
                display: 'flex',
                flexDirection: 'column',
                padding: '24px',
                zIndex: 10000, // Very high z-index
                animation: 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(15, 15, 20, 0.95)' // Slightly more opaque background
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexShrink: 0 }}>
                    <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.4rem', color: 'white' }}>
                        <div style={{ background: 'var(--primary)', padding: '6px', borderRadius: '8px', display: 'flex' }}>
                            <Palette size={20} color="white" />
                        </div>
                        Theme Shop
                    </h3>
                    <button onClick={onClose} className="btn-icon" style={{ padding: '8px', background: 'rgba(255,255,255,0.1)' }}>
                        <X size={20} />
                    </button>
                </div>

                <div style={{
                    fontSize: '0.95rem', color: '#d1d5db', marginBottom: '24px',
                    padding: '16px', background: 'rgba(255,255,255,0.03)',
                    borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    flexShrink: 0, border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <span style={{ fontWeight: '500' }}>Available Balance</span>
                    <span style={{ color: '#fbbf24', fontWeight: '800', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Zap size={18} fill="currentColor" /> {xp} XP
                    </span>
                </div>

                <div style={{
                    display: 'flex', flexDirection: 'column', gap: '12px',
                    overflowY: 'auto', paddingRight: '4px',
                    flex: 1, minHeight: 0
                }}>
                    {THEMES.map(theme => {
                        const isUnlocked = unlockedThemes.includes(theme.id);
                        const isActive = currentTheme === theme.id;

                        return (
                            <div key={theme.id} style={{
                                padding: '16px',
                                background: isActive
                                    ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.1))'
                                    : 'rgba(255,255,255,0.03)',
                                borderRadius: '16px',
                                border: `1px solid ${isActive ? '#3b82f6' : 'rgba(255,255,255,0.08)'}`,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                transition: 'all 0.2s ease',
                                marginBottom: '0px',
                                flexShrink: 0,
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                                onClick={() => handleAction(theme)}
                                className={!isActive ? 'hover:bg-white/5' : ''}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{
                                        width: '44px', height: '44px', borderRadius: '12px',
                                        background: theme.color,
                                        boxShadow: `0 0 20px ${theme.color}30`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexShrink: 0,
                                        border: '1px solid rgba(255,255,255,0.2)'
                                    }}>
                                        {isActive && <Check size={22} color="white" strokeWidth={3} />}
                                        {!isUnlocked && !isActive && <Lock size={18} color="white" strokeWidth={2.5} />}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '700', fontSize: '1.05rem', color: '#ffffff' }}>{theme.name}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '2px' }}>{theme.description}</div>
                                    </div>
                                </div>

                                {!isUnlocked && (
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: '4px',
                                        fontSize: '0.9rem', color: '#10b981', fontWeight: '700',
                                        background: 'rgba(16, 185, 129, 0.1)', padding: '6px 12px', borderRadius: '99px',
                                        flexShrink: 0,
                                        border: '1px solid rgba(16, 185, 129, 0.2)'
                                    }}>
                                        {theme.cost} XP
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'white',
                            padding: '12px 32px',
                            borderRadius: '99px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.95rem',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                        onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
                        onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.08)'}
                    >
                        <ChevronLeft size={18} /> Back to Dashboard
                    </button>
                </div>
            </div>

            <style>
                {`
                @keyframes scaleIn {
                    from { transform: translate(-50%, -50%) scale(0.9); opacity: 0; }
                    to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                }
                `}
            </style>
        </>
    );

    return ReactDOM.createPortal(modalContent, document.body);
}

export default ThemeShop;
