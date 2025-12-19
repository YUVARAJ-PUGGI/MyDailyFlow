import React, { createContext, useContext, useState, useEffect } from 'react';

// Default State
const initialState = {
    xp: 0,
    level: 1,
    streak: 0,
    nextLevelXp: 100,
    addXP: () => { },
    levelUp: false,
};

const GamificationContext = createContext(initialState);

export const useGamification = () => useContext(GamificationContext);

export const GamificationProvider = ({ children }) => {
    // Load from local storage or default
    const [xp, setXp] = useState(() => parseInt(localStorage.getItem('mdf_xp')) || 0);
    const [level, setLevel] = useState(() => parseInt(localStorage.getItem('mdf_level')) || 1);
    const [streak, setStreak] = useState(() => parseInt(localStorage.getItem('mdf_streak')) || 0);
    const [levelUp, setLevelUp] = useState(false);

    // Calculate XP needed for next level (Curve: 100 * Level)
    const nextLevelXp = level * 100;

    // Persist to Local Storage
    useEffect(() => {
        localStorage.setItem('mdf_xp', xp);
        localStorage.setItem('mdf_level', level);
        localStorage.setItem('mdf_streak', streak);
    }, [xp, level, streak]);

    const addXP = (amount) => {
        let newXp = xp + amount;

        // Level Up Logic
        if (newXp >= nextLevelXp) {
            newXp = newXp - nextLevelXp;
            setLevel((prev) => prev + 1);
            setLevelUp(true);

            // Reset level up notification after 3 seconds
            setTimeout(() => setLevelUp(false), 3000);
        }

        setXp(newXp);
    };

    /**
     * Attempts to spend XP.
     * @param {number} amount - Amount of XP to spend
     * @returns {boolean} - true if successful, false if insufficient funds
     */
    const spendXP = (amount) => {
        if (xp >= amount) {
            setXp(prev => prev - amount);
            return true;
        }
        return false;
    };

    const value = {
        xp,
        level,
        streak,
        nextLevelXp,
        addXP,
        spendXP,
        levelUp,
    };

    return (
        <GamificationContext.Provider value={value}>
            {children}
        </GamificationContext.Provider>
    );
};
