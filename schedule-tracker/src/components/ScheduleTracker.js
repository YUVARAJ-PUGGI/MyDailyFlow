import React, { useState } from 'react';
import Header from './Header';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';
import KanbanBoard from './KanbanBoard';
import AnalyticsDashboard from './AnalyticsDashboard';
import TimeStats from './TimeStats';
import useTasks from '../hooks/useTasks';
import { LayoutList, Trello, BarChart2 } from 'lucide-react';

/**
 * ScheduleTracker Component (3D Tech Upgrade)
 * The main interface for the application after "Get Started"
 */
function ScheduleTracker({ onBackToHome }) {
    const {
        tasks, // Access all tasks for Analytics
        loading,
        error,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        getTasksByDate
    } = useTasks();

    const [currentDate, setCurrentDate] = useState(
        new Date().toISOString().split('T')[0]
    );
    const [viewMode, setViewMode] = useState('list'); // 'list', 'kanban', 'analytics'

    // Get tasks for current date (for List/Kanban)
    const todayTasks = getTasksByDate(currentDate);
    const completedCount = todayTasks.filter(t => t.completed).length;

    const handleAddTask = (newTaskData) => {
        const task = {
            ...newTaskData,
            date: currentDate,
        };
        addTask(task);
    };

    if (loading) {
        return (
            <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>
                <div className="loading-content">
                    <div className="spinner" style={{ fontSize: '48px' }}>⏳</div>
                    <p>Loading your schedule...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>
                <div className="error-card glass-panel">
                    <div className="error-icon">⚠️</div>
                    <p className="error-message">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="schedule-tracker fade-in">
            {/* 3D Background Elements */}
            <div className="cyber-grid-bg"></div>
            <div className="floating-orb orb-1"></div>
            <div className="floating-orb orb-2"></div>

            <Header
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                totalTasks={todayTasks.length}
                completedTasks={completedCount}
                onBackToHome={onBackToHome}
            />

            <div className="main-content">
                <div className="sidebar">
                    <div className="glass-panel tilt-card">
                        <AddTaskForm onAddTask={handleAddTask} currentTasks={todayTasks} />
                    </div>
                    <div className="glass-panel tilt-card">
                        <TimeStats tasks={todayTasks} />
                    </div>
                </div>

                <div className="task-section">
                    <div className="glass-panel" style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
                        {/* View Toggle */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px', gap: '8px' }}>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`btn-icon ${viewMode === 'list' ? 'active' : ''}`}
                                style={{
                                    background: viewMode === 'list' ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255,255,255,0.05)',
                                    border: viewMode === 'list' ? '1px solid #00f0ff' : '1px solid transparent',
                                    padding: '8px',
                                    borderRadius: '8px',
                                    color: 'white',
                                    cursor: 'pointer'
                                }}
                                title="List View"
                            >
                                <LayoutList size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('kanban')}
                                className={`btn-icon ${viewMode === 'kanban' ? 'active' : ''}`}
                                style={{
                                    background: viewMode === 'kanban' ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255,255,255,0.05)',
                                    border: viewMode === 'kanban' ? '1px solid #00f0ff' : '1px solid transparent',
                                    padding: '8px',
                                    borderRadius: '8px',
                                    color: 'white',
                                    cursor: 'pointer'
                                }}
                                title="Kanban Board"
                            >
                                <Trello size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('analytics')}
                                className={`btn-icon ${viewMode === 'analytics' ? 'active' : ''}`}
                                style={{
                                    background: viewMode === 'analytics' ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255,255,255,0.05)',
                                    border: viewMode === 'analytics' ? '1px solid #00f0ff' : '1px solid transparent',
                                    padding: '8px',
                                    borderRadius: '8px',
                                    color: 'white',
                                    cursor: 'pointer'
                                }}
                                title="Analytics Dashboard"
                            >
                                <BarChart2 size={20} />
                            </button>
                        </div>

                        {viewMode === 'list' && (
                            <TaskList
                                tasks={todayTasks}
                                onToggleComplete={toggleTaskCompletion}
                                onDeleteTask={deleteTask}
                            />
                        )}

                        {viewMode === 'kanban' && (
                            <KanbanBoard
                                tasks={todayTasks}
                                onUpdateTask={updateTask}
                                onDeleteTask={deleteTask}
                            />
                        )}

                        {viewMode === 'analytics' && (
                            <AnalyticsDashboard tasks={tasks} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScheduleTracker;
