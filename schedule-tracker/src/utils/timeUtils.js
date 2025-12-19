// Utility functions for time conversions and calculations

/**
 * Convert 12-hour time to 24-hour format
 * @param {string} time12 - Time in HH:MM format
 * @param {string} period - 'AM' or 'PM'
 * @returns {string} Time in 24-hour format (HH:MM)
 */
export const convertTo24Hour = (time12, period) => {
  if (!time12) return '';
  
  const [hours, minutes] = time12.split(':');
  let hour = parseInt(hours, 10);
  
  if (period === 'PM' && hour !== 12) {
    hour += 12;
  }
  if (period === 'AM' && hour === 12) {
    hour = 0;
  }
  
  return `${hour.toString().padStart(2, '0')}:${minutes}`;
};

/**
 * Convert 24-hour time to 12-hour format with period
 * @param {string} time24 - Time in 24-hour format (HH:MM)
 * @returns {object} { time: 'HH:MM', period: 'AM'|'PM' }
 */
export const convertTo12Hour = (time24) => {
  if (!time24) return { time: '', period: 'AM' };
  
  const [hours, minutes] = time24.split(':');
  let hour = parseInt(hours, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  
  if (hour > 12) {
    hour -= 12;
  } else if (hour === 0) {
    hour = 12;
  }
  
  return {
    time: `${hour.toString().padStart(2, '0')}:${minutes}`,
    period
  };
};

/**
 * Calculate duration in hours between two times
 * @param {string} startTime - Start time in HH:MM format
 * @param {string} endTime - End time in HH:MM format
 * @returns {number} Duration in hours
 */
export const calculateDuration = (startTime, endTime) => {
  if (!startTime || !endTime) return 0;
  
  const start = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);
  
  // Handle cases where end time is next day
  if (end < start) {
    end.setDate(end.getDate() + 1);
  }
  
  return (end - start) / (1000 * 60 * 60);
};

/**
 * Format duration in hours to readable format
 * @param {number} hours - Duration in hours
 * @returns {string} Formatted duration (e.g., "2h 30m")
 */
export const formatDuration = (hours) => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
};

/**
 * Validate if end time is after start time
 * @param {string} startTime - Start time in HH:MM format
 * @param {string} endTime - End time in HH:MM format
 * @returns {boolean} True if valid
 */
export const isValidTimeRange = (startTime, endTime) => {
  if (!startTime || !endTime) return false;
  
  const start = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);
  
  return end > start;
};
