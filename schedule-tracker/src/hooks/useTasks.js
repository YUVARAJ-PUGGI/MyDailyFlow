import { useState, useEffect } from 'react';
import { loadTasks, saveTasks } from '../utils/localStorage';

/**
 * Custom hook for managing tasks with localStorage persistence
 * @returns {object} { tasks, addTask, updateTask, deleteTask, toggleTaskCompletion, clearAllTasks, getTasksByDate }
 */
const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const savedTasks = loadTasks();
      // Migration: Ensure all tasks have a status and priority
      const migratedTasks = savedTasks.map(task => ({
        ...task,
        status: task.status || (task.completed ? 'done' : 'todo'),
        priority: task.priority || 3, // Default priority Medium
        completedAt: task.completedAt || (task.completed ? new Date().toISOString() : null)
      }));
      setTasks(migratedTasks);
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
      status: 'todo',
      priority: taskData.priority || 3,
      completedAt: null,
      completed: false // Keep for backward compatibility if needed, but rely on status
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
      prevTasks.map(task => {
        if (task.id === taskId) {
          const newStatus = task.status === 'done' ? 'todo' : 'done';
          return {
            ...task,
            status: newStatus,
            completed: newStatus === 'done',
            completedAt: newStatus === 'done' ? new Date().toISOString() : null
          };
        }
        return task;
      })
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

  /**
   * Automatically reschedule overdue tasks to the next available slots
   * @returns {number} Number of tasks rescheduled
   */
  const autoRescheduleOverdue = () => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeValue = currentHour * 60 + currentMinute;

    // 1. Find overdue tasks (past end time or from previous days)
    const overdueTasks = tasks.filter(task => {
      if (task.completed) return false;
      if (task.date < todayStr) return true;

      // If today, check time
      if (task.date === todayStr && task.endTime24) {
        const [endH, endM] = task.endTime24.split(':').map(Number);
        const endTimeValue = endH * 60 + endM;
        return endTimeValue < currentTimeValue;
      }
      return false;
    });

    if (overdueTasks.length === 0) return 0;

    // 2. Sort by priority (High to Low)
    overdueTasks.sort((a, b) => (b.priority || 0) - (a.priority || 0));

    // 3. Find next available slots starting from NOW + buffer
    let rescheduledCount = 0;
    const updatedTasks = [...tasks];

    // Start scheduling 30 mins from now
    let nextSlotStart = currentTimeValue + 30;

    // Helper to check if a slot is free
    const isSlotFree = (start, end, excludeTaskId) => {
      // Simple collision detection for TODAY
      const todaysTasks = updatedTasks.filter(t =>
        t.date === todayStr && !t.completed && t.id !== excludeTaskId && t.startTime24 && t.endTime24
      );

      for (const t of todaysTasks) {
        const [tS_H, tS_M] = t.startTime24.split(':').map(Number);
        const [tE_H, tE_M] = t.endTime24.split(':').map(Number);
        const tStart = tS_H * 60 + tS_M;
        const tEnd = tE_H * 60 + tE_M;

        // Check overlap
        if (start < tEnd && end > tStart) return false;
      }
      return true;
    };

    // Helper to format minutes back to HH:MM
    const minutesToTime = (totalMins) => {
      const h = Math.floor(totalMins / 60);
      const m = totalMins % 60;
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    };

    // 4. Process each overdue task
    overdueTasks.forEach(task => {
      // Estimate duration (default 60 mins if missing)
      let duration = 60;
      if (task.startTime24 && task.endTime24) {
        const [sH, sM] = task.startTime24.split(':').map(Number);
        const [eH, eM] = task.endTime24.split(':').map(Number);
        duration = (eH * 60 + eM) - (sH * 60 + sM);
        if (duration <= 0) duration = 60;
      }

      // Find a slot
      let foundSlot = false;
      // Simply scan forward in 15 min increments until 10 PM (22:00 = 1320 mins)
      while (nextSlotStart + duration <= 1320) {
        if (isSlotFree(nextSlotStart, nextSlotStart + duration, task.id)) {
          // Found it!
          const newStart = minutesToTime(nextSlotStart);
          const newEnd = minutesToTime(nextSlotStart + duration);

          // Direct update in our local copy
          const taskIndex = updatedTasks.findIndex(t => t.id === task.id);
          if (taskIndex !== -1) {
            updatedTasks[taskIndex] = {
              ...updatedTasks[taskIndex],
              date: todayStr, // Move to today
              startTime24: newStart,
              endTime24: newEnd,
              status: 'rescheduled' // New status flag
            };
            rescheduledCount++;
            foundSlot = true;
            // Push next search start
            nextSlotStart += duration + 15; // Add 15 min buffer
            break;
          }
        }
        nextSlotStart += 15; // Try multiple of 15
      }
    });

    if (rescheduledCount > 0) {
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    }

    return rescheduledCount;
  };

  /**
   * Check for scheduling conflicts
   * @param {string} date
   * @returns {Array} List of conflicting task IDs
   */
  const checkConflicts = (date) => {
    const dayTasks = getTasksByDate(date).filter(t => !t.completed && t.startTime24 && t.endTime24);
    const conflicts = new Set();

    for (let i = 0; i < dayTasks.length; i++) {
      for (let j = i + 1; j < dayTasks.length; j++) {
        const t1 = dayTasks[i];
        const t2 = dayTasks[j];

        const [s1H, s1M] = t1.startTime24.split(':').map(Number);
        const [e1H, e1M] = t1.endTime24.split(':').map(Number);
        const star1 = s1H * 60 + s1M;
        const end1 = e1H * 60 + e1M;

        const [s2H, s2M] = t2.startTime24.split(':').map(Number);
        const [e2H, e2M] = t2.endTime24.split(':').map(Number);
        const star2 = s2H * 60 + s2M;
        const end2 = e2H * 60 + e2M;

        if (star1 < end2 && end1 > star2) {
          conflicts.add(t1.id);
          conflicts.add(t2.id);
        }
      }
    }
    return Array.from(conflicts);
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
    getTasksByDate,
    autoRescheduleOverdue,
    checkConflicts
  };
};

export default useTasks;
