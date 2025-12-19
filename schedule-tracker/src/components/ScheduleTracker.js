import React, { useState } from 'react';
import Header from './Header';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';
import TimeStats from './TimeStats';
import useTasks from '../hooks/useTasks';

/**
 * ScheduleTracker Component
 * The main interface for the application after "Get Started"
 */
function ScheduleTracker({ onBackToHome }) {
    const {
        loading,
        error,
        addTask,
        deleteTask,
        toggleTaskCompletion,
        getTasksByDate
    } = useTasks();

    const [currentDate, setCurrentDate] = useState(
        new Date().toISOString().split('T')[0]
    );

    // Get tasks for current date
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
            <div className="loading-container">
                <div className="loading-content">
                    <div className="spinner">⏳</div>
                    <p>Loading your schedule...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-card">
                    <div className="error-icon">⚠️</div>
                    <p className="error-message">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="schedule-tracker fade-in">
            <Header
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                totalTasks={todayTasks.length}
                completedTasks={completedCount}
                onBackToHome={onBackToHome}
            />

            <div className="main-content">
                <div className="sidebar">
                    <div className="glass-panel">
                        <AddTaskForm onAddTask={handleAddTask} />
                    </div>
                    <div className="glass-panel">
                        <TimeStats tasks={todayTasks} />
                    </div>
                </div>

                <div className="task-section glass-panel">
                    <TaskList
                        tasks={todayTasks}
                        onToggleComplete={toggleTaskCompletion}
                        onDeleteTask={deleteTask}
                    />
                </div>
            </div>
        </div>
    );
}

export default ScheduleTracker;
