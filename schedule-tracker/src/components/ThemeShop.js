import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useGamification } from '../context/GamificationContext';
import { Palette, Lock, Check, Zap } from 'lucide-react';
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

    return (
        <div className="glass-panel" style={{
            position: 'absolute', top: '80px', right: '24px',
            width: '320px', padding: '24px', zIndex: 1000,
            animation: 'fadeIn 0.3s ease'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Palette size={20} color="var(--primary)" /> Theme Shop
                </h3>
                <button onClick={onClose} className="btn-icon" style={{ fontSize: '1.2rem', padding: '4px' }}>&times;</button>
            </div>

            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Balance: <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{xp} XP</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto' }}>
                {THEMES.map(theme => {
                    const isUnlocked = unlockedThemes.includes(theme.id);
                    const isActive = currentTheme === theme.id;

                    return (
                        <div key={theme.id} style={{
                            padding: '12px',
                            background: isActive
                                ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.1))'
                                : 'rgba(255,255,255,0.02)',
                            borderRadius: '12px',
                            border: `1px solid ${isActive ? 'var(--primary)' : 'var(--glass-border)'}`,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                            onClick={() => handleAction(theme)}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    background: theme.color,
                                    boxShadow: `0 0 10px ${theme.color}40`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    {isActive && <Check size={16} color="white" />}
                                </div>
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{theme.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{theme.description}</div>
                                </div>
                            </div>

                            {!isUnlocked && (
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '4px',
                                    fontSize: '0.85rem', color: 'var(--accent)',
                                    background: 'rgba(16, 185, 129, 0.1)', padding: '4px 8px', borderRadius: '20px'
                                }}>
                                    <Zap size={12} /> {theme.cost}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ThemeShop;
