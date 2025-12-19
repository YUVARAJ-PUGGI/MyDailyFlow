/**
 * Parses a natural language task command.
 * Supported Patterns:
 * - Time: "at 5pm", "@17:00", "at 5:30 pm"
 * - Duration: "for 2h", "for 30m", "for 1.5 hours"
 * 
 * @param {string} input - The raw input string
 * @returns {Object} - { title, time, duration } (values null if not found)
 */
export function parseTaskCommand(input) {
    if (!input) return { title: '', time: '', duration: '' };

    let text = input;
    let time = '';
    let duration = 60; // Default 1 hour if not specified

    // 1. Extract Time (e.g., "at 5pm", "@17:00", " at 9:30 ")
    // Regex matches: "at" or "@" followed by digits, optional colon/min, optional am/pm
    const timeRegex = /(?:at|@)\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm|AM|PM)?)/i;
    const timeMatch = text.match(timeRegex);

    if (timeMatch) {
        time = convertTo24Hour(timeMatch[1]);
        // Remove the matched time string from the title text
        text = text.replace(timeMatch[0], '');
    }

    // 2. Extract Duration (e.g., "for 2h", "for 30 mins")
    // Regex matches: "for" followed by number and unit (h/hr/hours/m/min/minutes)
    const durationRegex = /(?:for)\s*(\d+(?:\.\d+)?)\s*(h|hr|hours|m|min|minutes)/i;
    const durationMatch = text.match(durationRegex);

    if (durationMatch) {
        const value = parseFloat(durationMatch[1]);
        const unit = durationMatch[2].toLowerCase();

        if (unit.startsWith('h')) {
            duration = Math.round(value * 60);
        } else {
            duration = Math.round(value);
        }
        // Remove the matched duration string from the title text
        text = text.replace(durationMatch[0], '');
    }

    // 3. Cleanup Title
    const title = text.replace(/\s+/g, ' ').trim(); // Remove extra spaces

    return { title, time, duration };
}

/**
 * Helper to convert "5pm", "5:30pm", "17:00" to "HH:MM"
 */
function convertTo24Hour(timeStr) {
    timeStr = timeStr.trim().toLowerCase();

    // Check if it's already HH:MM (24h) format
    if (/^\d{1,2}:\d{2}$/.test(timeStr)) {
        return timeStr.padStart(5, '0'); // Ensure 09:00
    }

    // Handle AM/PM
    let [time, modifier] = timeStr.split(/(am|pm)/);
    let [hours, minutes] = time.split(':');

    if (!minutes) minutes = '00';
    if (!modifier) modifier = ''; // Assume 24h if no am/pm but wasn't caught by first check (e.g. just "5")

    // Handle "5" -> "5:00" 
    // If just "5", logic below handles it, but let's be safe

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'pm') {
        hours = parseInt(hours, 10) + 12;
    } else {
        hours = parseInt(hours, 10);
    }

    // Handle "12am" -> "00:00", "12pm" -> "12:00" done above mostly
    // Special case correct: 12 PM = 12, 1 PM = 13.
    // Logic above: 12->0, +12 = 12. Correct.
    // Logic above: 1->1, +12 = 13. Correct.
    // Logic above: 12am -> 12->0, no add = 0. Correct.

    return `${String(hours).padStart(2, '0')}:${minutes}`;
}
