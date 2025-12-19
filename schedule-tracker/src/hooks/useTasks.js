import { useState, useEffect } from 'react';
import { loadTasks, saveTasks } from '../utils/localStorage';

/**
 * Custom hook for managing tasks with localStorage persistence
 * @returns {object} { tasks, addTask, updateTask, deleteTask, clearAllTasks }
 */
const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const savedTasks = loadTasks();
      setTasks(savedTasks);
      setLoading(false);
    } catch (err) {
      setError('Failed to load tasks');
      setLoading(false);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      const success = saveTasks(tasks);
      if (!success) {
        setError('Failed to save tasks');
      }
    }
  }, [tasks, loading]);

  /**
   * Add a new task
   * @param {object} taskData - Task data
   * @returns {object} Created task
   */
  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      completed: false
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    return newTask;
  };

  /**
   * Update an existing task
   * @param {number} taskId - Task ID
   * @param {object} updates - Updates to apply
   */
  const updateTask = (taskId, updates) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  };

  /**
   * Delete a task
   * @param {number} taskId - Task ID to delete
   */
  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  /**
   * Toggle task completion status
   * @param {number} taskId - Task ID
   */
  const toggleTaskCompletion = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  /**
   * Clear all tasks
   */
  const clearAllTasks = () => {
    setTasks([]);
  };

  /**
   * Get tasks for a specific date
   * @param {string} date - Date in YYYY-MM-DD format
   * @returns {Array} Filtered tasks
   */
  const getTasksByDate = (date) => {
    return tasks.filter(task => task.date === date);
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    clearAllTasks,
    getTasksByDate
  };
};

export default useTasks;
