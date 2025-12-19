/**
 * Utility functions for smart scheduling, conflict detection, and time management.
 */

// Helper to convert "HH:MM" (24h) to minutes since midnight
export const getMinutesFromTime = (timeStr) => {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
};

// Helper to convert minutes since midnight back to "HH:MM" (24h)
export const getTimeFromMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60) % 24;
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

/**
 * Detects if a new task conflicts with any existing tasks.
 * @param {Object} newTask - { startTime24: "HH:MM", endTime24: "HH:MM" }
 * @param {Array} existingTasks - Array of task objects
 * @returns {Object|null} - Returns the conflicting task or null if no conflict
 */
export const detectConflict = (newTask, existingTasks) => {
    const newStart = getMinutesFromTime(newTask.startTime24);
    const newEnd = getMinutesFromTime(newTask.endTime24);

    // Filter out the task itself if we are updating (optional check based on ID)
    // For now assuming we check against "other" tasks provided in the array
    return existingTasks.find(task => {
        // Skip cancelled or done tasks if needed? For now, we count them as blocking time unless deleted.
        // Maybe we ignore 'Done' tasks? Usually 'Done' tasks still took up time.
        // Let's assume all tasks in the list block time.

        const existingStart = getMinutesFromTime(task.startTime24);
        const existingEnd = getMinutesFromTime(task.endTime24);

        return (newStart < existingEnd && existingStart < newEnd);
    });
};

/**
 * Finds the next available time slot for a task.
 * @param {Object} taskToReschedule - { durationMinutes: number, startTime24: "HH:MM" }
 * @param {Array} existingTasks - Array of task objects
 * @returns {Object} - { startTime24: "HH:MM", endTime24: "HH:MM" }
 */
export const findNextAvailableSlot = (taskToReschedule, existingTasks) => {
    // Calculate duration of the task to reschedule
    const startMin = getMinutesFromTime(taskToReschedule.startTime24);
    const endMin = getMinutesFromTime(taskToReschedule.endTime24);
    const duration = endMin - startMin;

    // Sort tasks by start time
    const sortedTasks = [...existingTasks].sort((a, b) =>
        getMinutesFromTime(a.startTime24) - getMinutesFromTime(b.startTime24)
    );

    // Start looking from the original start time
    let attemptStart = startMin;

    // Try to find a gap
    for (const task of sortedTasks) {
        const taskStart = getMinutesFromTime(task.startTime24);
        const taskEnd = getMinutesFromTime(task.endTime24);

        // If our attempt overlaps with this task
        if (attemptStart < taskEnd && taskStart < (attemptStart + duration)) {
            // Conflict! Move our attempt to after this task
            attemptStart = Math.max(attemptStart, taskEnd + 5); // Add 5 mins buffer
        }
    }

    // Check if it fits within the day (1440 minutes)
    if (attemptStart + duration <= 1440) {
        return {
            startTime24: getTimeFromMinutes(attemptStart),
            endTime24: getTimeFromMinutes(attemptStart + duration)
        };
    }

    // If simple scan failed (e.g. pushed too late), return null or next day message?
    // For MVP, if over midnight, just return null.
    return null;
};
