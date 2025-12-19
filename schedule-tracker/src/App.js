import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import TimeStats from './components/TimeStats';
import ErrorBoundary from './components/ErrorBoundary';
import useTasks from './hooks/useTasks';
import './App.css';

/**
 * Main App Component
 * Manages task state and layout
 */
function App() {
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
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{textAlign: 'center', color: 'white'}}>
          <div style={{fontSize: '48px', marginBottom: '16px'}}>⏳</div>
          <p style={{fontSize: '18px', fontWeight: '600'}}>Loading your schedule...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '40px',
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <div style={{fontSize: '48px', marginBottom: '16px'}}>⚠️</div>
          <p style={{color: '#dc2626', fontSize: '16px'}}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="app">
        <Header 
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          totalTasks={todayTasks.length}
          completedTasks={completedCount}
        />
        
        <div className="main-content">
          <div className="sidebar">
            <AddTaskForm onAddTask={handleAddTask} />
            <TimeStats tasks={todayTasks} />
          </div>
          
          <div className="task-section">
            <TaskList 
              tasks={todayTasks}
              onToggleComplete={toggleTaskCompletion}
              onDeleteTask={deleteTask}
            />
          </div>
        </div>
      </div>
      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </ErrorBoundary>
  );
}

export default App;