import React, { useState } from 'react';
import Header from './Header';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';
import KanbanBoard from './KanbanBoard';
import AnalyticsDashboard from './AnalyticsDashboard';
import TimeStats from './TimeStats';
import PomodoroTimer from './PomodoroTimer';
import ExamCountdown from './ExamCountdown';
import StreakTracker from './StreakTracker';
import useTasks from '../hooks/useTasks';
import { LayoutList, Trello, BarChart2, Plus } from 'lucide-react';

/**
 * ScheduleTracker Component (Revamp)
 * Smart 2-column layout for engineering productivity.
 */
function ScheduleTracker({ onBackToHome }) {
    const {
        tasks,
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
    const [showAddTask, setShowAddTask] = useState(false);

    // Get tasks for current date (for List/Kanban)
    const todayTasks = getTasksByDate(currentDate);
    const completedCount = todayTasks.filter(t => t.completed).length;

    const handleAddTask = (newTaskData) => {
        const task = {
            ...newTaskData,
            date: currentDate,
        };
        addTask(task);
        setShowAddTask(false);
    };

    if (loading) return <div className="loading-screen">Loading...</div>;

    return (
        <div className="schedule-tracker fade-in">
            <div className="cyber-grid-bg"></div>

            <Header
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                totalTasks={todayTasks.length}
                completedTasks={completedCount}
                onBackToHome={onBackToHome}
            />

            <div className="tracker-container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px', display: 'grid', gridTemplateColumns: '320px 1fr', gap: '32px' }}>

                {/* UPGRADED SIDEBAR */}
                <aside className="tracker-sidebar">
                    <StreakTracker />
                    <PomodoroTimer />
                    <ExamCountdown />
                    <TimeStats tasks={todayTasks} />
                </aside>

                {/* MAIN CONTENT AREA */}
                <main className="tracker-main">
                    {/* Toolbar */}
                    <div className="glass-panel" style={{ marginBottom: '24px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button onClick={() => setViewMode('list')} className={`btn-icon ${viewMode === 'list' ? 'active' : ''}`}><LayoutList size={20} /></button>
                            <button onClick={() => setViewMode('kanban')} className={`btn-icon ${viewMode === 'kanban' ? 'active' : ''}`}><Trello size={20} /></button>
                            <button onClick={() => setViewMode('analytics')} className={`btn-icon ${viewMode === 'analytics' ? 'active' : ''}`}><BarChart2 size={20} /></button>
                        </div>
                        <button onClick={() => setShowAddTask(!showAddTask)} className="btn-primary-small" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Plus size={16} /> Add Task
                        </button>
                    </div>

                    {/* Add Task Form (Collapsible) */}
                    {showAddTask && (
                        <div className="glass-panel" style={{ marginBottom: '24px', animation: 'slideInUp 0.3s ease' }}>
                            <AddTaskForm onAddTask={handleAddTask} />
                        </div>
                    )}

                    {/* Views */}
                    <div className="view-container" style={{ minHeight: '600px' }}>
                        {viewMode === 'list' && (
                            <div className="glass-panel" style={{ padding: '24px' }}>
                                <h2 style={{ fontSize: '20px', marginBottom: '20px', color: 'white' }}>Tasks for Today</h2>
                                <TaskList
                                    tasks={todayTasks}
                                    onToggleComplete={toggleTaskCompletion}
                                    onDeleteTask={deleteTask}
                                />
                            </div>
                        )}

                        {viewMode === 'kanban' && (
                            <div style={{ overflowX: 'auto', paddingBottom: '20px' }}>
                                <KanbanBoard
                                    tasks={todayTasks}
                                    onUpdateTask={updateTask}
                                    onDeleteTask={deleteTask}
                                />
                            </div>
                        )}

                        {viewMode === 'analytics' && (
                            <AnalyticsDashboard tasks={tasks} />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ScheduleTracker;
