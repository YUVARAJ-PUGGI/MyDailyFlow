// Form validation utilities

/**
 * Validate task form data
 * @param {object} formData - Task form data
 * @returns {object} { isValid: boolean, errors: object }
 */
export const validateTaskForm = (formData) => {
  const errors = {};
  
  // Title validation
  if (!formData.title || formData.title.trim().length === 0) {
    errors.title = 'Task title is required';
  } else if (formData.title.trim().length < 3) {
    errors.title = 'Task title must be at least 3 characters';
  } else if (formData.title.length > 100) {
    errors.title = 'Task title must be less than 100 characters';
  }
  
  // Category validation
  if (!formData.category) {
    errors.category = 'Category is required';
  }
  
  // Start time validation
  if (!formData.startTime) {
    errors.startTime = 'Start time is required';
  }
  
  // End time validation
  if (!formData.endTime) {
    errors.endTime = 'End time is required';
  }
  
  // Time range validation
  if (formData.startTime && formData.endTime) {
    const { convertTo24Hour, isValidTimeRange } = require('./timeUtils');
    const start24 = convertTo24Hour(formData.startTime, formData.startPeriod);
    const end24 = convertTo24Hour(formData.endTime, formData.endPeriod);
    
    if (!isValidTimeRange(start24, end24)) {
      errors.timeRange = 'End time must be after start time';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Sanitize user input to prevent XSS
 * @param {string} input - User input string
 * @returns {string} Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .trim();
};
