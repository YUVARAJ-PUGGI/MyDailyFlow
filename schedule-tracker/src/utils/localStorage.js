// LocalStorage utility functions with error handling

const STORAGE_KEY = 'scheduleTasks';

/**
 * Save tasks to localStorage
 * @param {Array} tasks - Array of task objects
 * @returns {boolean} Success status
 */
export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
    return false;
  }
};

/**
 * Load tasks from localStorage
 * @returns {Array} Array of tasks or empty array
 */
export const loadTasks = () => {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [];
  }
};

/**
 * Clear all tasks from localStorage
 * @returns {boolean} Success status
 */
export const clearTasks = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing tasks from localStorage:', error);
    return false;
  }
};

/**
 * Export tasks as JSON file
 * @param {Array} tasks - Array of tasks
 */
export const exportTasksAsJSON = (tasks) => {
  try {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `schedule-tracker-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting tasks:', error);
    throw error;
  }
};

/**
 * Check if localStorage is available
 * @returns {boolean} True if available
 */
export const isLocalStorageAvailable = () => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
};
