import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGamification } from './GamificationContext';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const THEMES = [
    { id: 'default', name: 'Original Flow', color: '#3b82f6', cost: 0, description: 'The classic look.' },
    { id: 'cyberpunk', name: 'Neon City', color: '#f472b6', cost: 500, description: 'High tech, low life.' },
    { id: 'sunset', name: 'Golden Hour', color: '#f97316', cost: 800, description: 'Warm vibes only.' },
    { id: 'matrix', name: 'The Construct', color: '#22c55e', cost: 1200, description: 'Wake up, Neo.' },
    { id: 'ocean', name: 'Deep Blue', color: '#38bdf8', cost: 1500, description: 'Calm and focused.' },
];

export const ThemeProvider = ({ children }) => {
    const { spendXP } = useGamification();

    // Persisted State
    const [currentTheme, setCurrentTheme] = useState(() => localStorage.getItem('mdf_theme') || 'default');
    const [unlockedThemes, setUnlockedThemes] = useState(() => {
        const saved = localStorage.getItem('mdf_unlocked_themes');
        return saved ? JSON.parse(saved) : ['default'];
    });

    // Apply Theme to Body
    useEffect(() => {
        document.body.setAttribute('data-theme', currentTheme);
        localStorage.setItem('mdf_theme', currentTheme);
    }, [currentTheme]);

    // Persist Unlocked Themes
    useEffect(() => {
        localStorage.setItem('mdf_unlocked_themes', JSON.stringify(unlockedThemes));
    }, [unlockedThemes]);

    const unlockTheme = (themeId) => {
        if (unlockedThemes.includes(themeId)) return true; // Already owned

        const theme = THEMES.find(t => t.id === themeId);
        if (!theme) return false;

        if (spendXP(theme.cost)) {
            setUnlockedThemes(prev => [...prev, themeId]);
            return true;
        }
        return false;
    };

    const setTheme = (themeId) => {
        if (unlockedThemes.includes(themeId)) {
            setCurrentTheme(themeId);
        }
    };

    return (
        <ThemeContext.Provider value={{ currentTheme, unlockedThemes, unlockTheme, setTheme, THEMES }}>
            {children}
        </ThemeContext.Provider>
    );
};
