import React from 'react';
import PropTypes from 'prop-types';

/**
 * Logo Component (Neon Glass Calendar)
 * A premium, high-tech icon representing 'Time' and 'Flow'.
 * Concept: Glass Calendar + Lightning Pulse.
 */
function Logo({ size = 'medium', showText = true }) {
    const sizes = {
        small: { width: 24, font: '1.1rem', gap: '8px' },
        medium: { width: 32, font: '1.5rem', gap: '12px' },
        large: { width: 48, font: '2.5rem', gap: '16px' }
    };

    const { width, font, gap } = sizes[size] || sizes.medium;

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: gap, userSelect: 'none' }}>

            {/* Neon Calendar Icon */}
            <svg
                width={width}
                height={width}
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00f0ff" />
                        <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feComposite in="coloredBlur" operator="over" />
                    </filter>
                </defs>

                {/* Glass Calendar Body */}
                <rect
                    x="6"
                    y="6"
                    width="28"
                    height="28"
                    rx="6"
                    fill="rgba(20, 20, 30, 0.6)"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="1.5"
                />

                {/* Calendar Header */}
                <path
                    d="M6 12C6 8.68629 8.68629 6 12 6H28C31.3137 6 34 8.68629 34 12V14H6V12Z"
                    fill="rgba(255, 255, 255, 0.05)"
                />
                <path d="M12 4V8 M28 4V8" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" />

                {/* Lightning Bolt (The "Flow") */}
                <path
                    d="M22 14L16 22H21L19 30L26 21H20L22 14Z"
                    fill="url(#neonGradient)"
                    filter="url(#glow)"
                />
                <path
                    d="M22 14L16 22H21L19 30L26 21H20L22 14Z"
                    stroke="white"
                    strokeWidth="1"
                    strokeLinejoin="round"
                />

            </svg>

            {/* Brand Text */}
            {showText && (
                <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: font,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    color: 'white',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px'
                }}>
                    <span style={{ color: 'rgba(255,255,255,0.95)' }}>MyDaily</span>
                    <span style={{
                        background: 'linear-gradient(to right, #22d3ee, #8b5cf6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: '800',
                        filter: 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.3))'
                    }}>
                        Flow
                    </span>
                </span>
            )}
        </div>
    );
}

Logo.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    showText: PropTypes.bool
};

export default Logo;
