import React from 'react';
import PropTypes from 'prop-types';
import { Circle, Clock, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

/**
 * KanbanBoard Component
 * Displays tasks in columns based on status: 'todo', 'in-progress', 'done'.
 */
function KanbanBoard({ tasks, onUpdateTask, onDeleteTask }) {
    const columns = [
        { id: 'todo', title: 'To Do', icon: <Circle size={18} />, color: '#6366f1' },
        { id: 'in-progress', title: 'In Progress', icon: <Clock size={18} />, color: '#f59e0b' },
        { id: 'done', title: 'Done', icon: <CheckCircle size={18} />, color: '#10b981' }
    ];

    const getTasksByStatus = (status) => tasks.filter(task => task.status === status);

    const handleMove = (taskId, newStatus) => {
        // If moving to done, we might want to set completedAt (handled by effect or logic, but explicit here is safer if hook doesn't auto-watch status)
        // The hook 'updateTask' just spreads updates. 
        // Optimization: If moving to 'done', set completed: true, completedAt: now.
        // If moving from 'done', set completed: false.

        const updates = { status: newStatus };
        if (newStatus === 'done') {
            updates.completed = true;
            updates.completedAt = new Date().toISOString();
        } else {
            updates.completed = false;
            updates.completedAt = null;
        }
        onUpdateTask(taskId, updates);
    };

    return (
        <div className="kanban-board" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            overflowX: 'auto',
            paddingBottom: '20px'
        }}>
            {columns.map(col => (
                <div key={col.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '24px' }}>
                    {/* Column Header */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '16px',
                        paddingBottom: '12px',
                        borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <div style={{ color: col.color }}>{col.icon}</div>
                        <h3 style={{ margin: 0, fontSize: '18px', color: 'white' }}>{col.title}</h3>
                        <span style={{
                            marginLeft: 'auto',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            padding: '2px 10px',
                            fontSize: '12px',
                            color: 'var(--text-muted)'
                        }}>
                            {getTasksByStatus(col.id).length}
                        </span>
                    </div>

                    {/* Tasks Container */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {getTasksByStatus(col.id).map(task => (
                            <div key={task.id} className="glass-panel tilt-card" style={{
                                padding: '12px',
                                borderLeft: `4px solid ${getCategoryColor(task.category)}`,
                                marginBottom: 0
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{
                                        fontSize: '11px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        color: 'var(--text-muted)'
                                    }}>
                                        {task.category}
                                    </span>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        {/* Priority Indicator */}
                                        {[...Array(parseInt(task.priority))].map((_, i) => (
                                            <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: getPriorityColor(task.priority) }} />
                                        ))}
                                    </div>
                                </div>

                                <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', color: 'white' }}>{task.title}</h4>

                                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                                    {task.displayStart} - {task.displayEnd}
                                </div>

                                {/* Controls */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                                    {col.id !== 'todo' && (
                                        <button
                                            onClick={() => handleMove(task.id, getPrevStatus(col.id))}
                                            className="btn-icon-sm"
                                            title="Move Back"
                                            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '4px', padding: '4px' }}
                                        >
                                            <ArrowLeft size={16} />
                                        </button>
                                    )}
                                    {col.id !== 'done' ? (
                                        <button
                                            onClick={() => handleMove(task.id, getNextStatus(col.id))}
                                            className="btn-icon-sm"
                                            title="Move Forward"
                                            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '4px', padding: '4px', marginLeft: 'auto' }}
                                        >
                                            <ArrowRight size={16} />
                                        </button>
                                    ) : (
                                        <div style={{ marginLeft: 'auto' }}></div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {getTasksByStatus(col.id).length === 0 && (
                            <div style={{
                                textAlign: 'center',
                                color: 'rgba(255,255,255,0.2)',
                                fontStyle: 'italic',
                                fontSize: '13px',
                                marginTop: '20px'
                            }}>
                                No tasks
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

// Helpers
const getNextStatus = (current) => {
    if (current === 'todo') return 'in-progress';
    if (current === 'in-progress') return 'done';
    return 'done';
};

const getPrevStatus = (current) => {
    if (current === 'done') return 'in-progress';
    if (current === 'in-progress') return 'todo';
    return 'todo';
};

const getCategoryColor = (category) => {
    const colors = {
        'DSA': '#00f0ff',
        'Development': '#7000ff',
        'Placement Prep': '#ff0055',
        'Core Subjects': '#f59e0b',
        'Default': '#9ca3af'
    };
    return colors[category] || colors['Default'];
};

const getPriorityColor = (priority) => {
    if (priority >= 4) return '#ef4444'; // Red
    if (priority === 3) return '#f59e0b'; // Orange
    return '#10b981'; // Green
};

KanbanBoard.propTypes = {
    tasks: PropTypes.array.isRequired,
    onUpdateTask: PropTypes.func.isRequired,
    onDeleteTask: PropTypes.func.isRequired
};

export default KanbanBoard;
