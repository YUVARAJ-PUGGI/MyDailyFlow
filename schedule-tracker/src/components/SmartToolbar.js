import React, { useState } from 'react';
import { Sparkles, AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import useTasks from '../hooks/useTasks';

/**
 * SmartToolbar Component
 * Provides "Magic AI" actions for the schedule.
 */
function SmartToolbar({ onAutoReschedule, conflictCount }) {
    const [isOptimizing, setIsOptimizing] = useState(false);

    const handleMagicClick = () => {
        setIsOptimizing(true);

        // Fake "AI Processing" delay for UX
        setTimeout(() => {
            const count = onAutoReschedule();
            setIsOptimizing(false);
            if (count > 0) {
                toast.success(`🪄 Smart Reschedule: Moved ${count} overdue tasks!`);
            } else {
                toast.info("Schedule is already optimized! No overdue tasks found.");
            }
        }, 800);
    };

    return (
        <div className="glass-panel" style={{
            padding: '12px 20px', marginBottom: '24px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
            border: '1px solid rgba(59, 130, 246, 0.2)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
                }}>
                    <Sparkles size={18} color="white" />
                </div>
                <div>
                    <h4 style={{ margin: 0, fontSize: '14px', color: 'white' }}>Smart Assistant</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>AI-Powered Optimization</p>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {conflictCount > 0 && (
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        color: '#ef4444', fontSize: '13px', fontWeight: '600',
                        background: 'rgba(239, 68, 68, 0.1)', padding: '6px 12px', borderRadius: '20px'
                    }}>
                        <AlertTriangle size={14} />
                        {conflictCount} Conflict{conflictCount > 1 ? 's' : ''} Detected
                    </div>
                )}

                <button
                    onClick={handleMagicClick}
                    disabled={isOptimizing}
                    className="btn-primary-small"
                    style={{
                        background: isOptimizing ? '#4b5563' : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        border: 'none',
                        padding: '8px 16px',
                        fontSize: '13px'
                    }}
                >
                    {isOptimizing ? 'Optimizing...' : 'Re-schedule Overdue'}
                </button>
            </div>
        </div>
    );
}

export default SmartToolbar;
