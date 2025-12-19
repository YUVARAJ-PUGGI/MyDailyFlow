import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Plus, AlertTriangle, ArrowRight, Type, Tag, Flag, Clock, Calendar, Sparkles, Wand2 } from 'lucide-react';
import { parseTaskCommand } from '../utils/nlp'; // Import Parser
import { toast } from 'react-toastify';
import useForm from '../hooks/useForm';
import { getCategoryNames } from '../constants/categories';
import { convertTo24Hour } from '../utils/timeUtils';
import { detectConflict, findNextAvailableSlot } from '../utils/schedulingUtils';

/**
 * AddTaskForm Component (Modern Redesign)
 * Features distinct input boxes with icons and high-end typography.
 */
function AddTaskForm({ onAddTask, currentTasks = [] }) {
  const categories = getCategoryNames();
  const [conflict, setConflict] = useState(null);

  const initialFormState = {
    title: '',
    category: 'DSA',
    priority: 3,
    startTime: '',
    endTime: '',
    startPeriod: 'AM',
    endPeriod: 'AM'
  };

  const handleFormSubmit = (formData) => {
    try {
      const start24 = convertTo24Hour(formData.startTime, formData.startPeriod);
      const end24 = convertTo24Hour(formData.endTime, formData.endPeriod);

      const newTask = {
        ...formData,
        startTime24: start24,
        endTime24: end24,
        displayStart: `${formData.startTime} ${formData.startPeriod}`,
        displayEnd: `${formData.endTime} ${formData.endPeriod}`
      };

      // Conflict Detection
      const conflictingTask = detectConflict(newTask, currentTasks);
      if (conflictingTask) {
        setConflict({ newTask, conflictingTask });
        return;
      }

      onAddTask(newTask);
      toast.success('Task added successfully!');
      setConflict(null);
    } catch (error) {
      toast.error('Failed to add task. Please try again.');
    }
  };

  const { formData, errors, isSubmitting, handleChange, handleSubmit, updateFormData } = useForm(initialFormState, handleFormSubmit);

  const handleAutoReschedule = () => {
    if (!conflict) return;
    const nextSlot = findNextAvailableSlot(conflict.newTask, currentTasks);

    if (nextSlot) {
      const [startH, startM] = nextSlot.startTime24.split(':');
      const startHourNum = parseInt(startH, 10);
      const startPeriod = startHourNum >= 12 ? 'PM' : 'AM';
      const startDisplayH = startHourNum % 12 || 12;

      const [endH, endM] = nextSlot.endTime24.split(':');
      const endHourNum = parseInt(endH, 10);
      const endPeriod = endHourNum >= 12 ? 'PM' : 'AM';
      const endDisplayH = endHourNum % 12 || 12;

      updateFormData({
        startTime: `${startDisplayH}:${startM}`,
        startPeriod: startPeriod,
        endTime: `${endDisplayH}:${endM}`,
        endPeriod: endPeriod
      });
      setConflict(null);
      toast.info('Auto-rescheduled to next available slot!');
    } else {
      toast.warning('Could not find a free slot today!');
    }
  };

  const handleMagicInput = (e) => {
    const val = e.target.value;
    setMagicInput(val);

    const { title, time, duration } = parseTaskCommand(val);
    const updates = {};
    if (title) updates.title = title;
    if (time) {
      // Assuming time is in "HH:MM AM/PM" format or similar that can be split
      const [timePart, periodPart] = time.split(' ');
      updates.startTime = timePart;
      updates.startPeriod = periodPart || 'AM'; // Default to AM if not specified
      // For simplicity, setting end time to be duration later, or just leaving it for now
      // A more robust parser would handle duration to calculate endTime
    }
    // Duration parsing would require more complex logic to update endTime based on startTime
    // For now, we'll just update title and startTime/startPeriod
    if (Object.keys(updates).length > 0) {
      updateFormData(updates);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div className="icon-badge gradient-indigo">
          <Plus size={24} color="white" />
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: 0 }}>Add Task</h2>
        <button
          type="button"
          onClick={() => setUseMagic(!useMagic)}
          className="btn-icon"
          style={{
            marginLeft: 'auto',
            color: useMagic ? 'var(--accent)' : 'var(--text-muted)',
            borderColor: useMagic ? 'var(--accent)' : 'var(--glass-border)'
          }}
          title="Toggle Magic Command Mode"
        >
          <Wand2 size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {useMagic && (
          <div className="form-group-modern" style={{ animation: 'fadeIn 0.3s ease' }}>
            <label className="form-label-modern" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent)' }}>
              <Sparkles size={14} /> Magic Command
            </label>
            <div className="input-wrapper-modern">
              <Wand2 size={18} className="input-icon" style={{ color: 'var(--accent)' }} />
              <input
                type="text"
                value={magicInput}
                onChange={handleMagicInput}
                placeholder='e.g., "Review Code at 4pm for 90 mins"'
                className="form-input-modern"
                style={{ borderColor: 'var(--accent)', background: 'rgba(16, 185, 129, 0.05)' }}
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Task Title */}
        <div className="form-group-modern">
          <label className="form-label-modern">Task Title</label>
          <div className="input-wrapper-modern">
            <Type size={18} className="input-icon" />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Solve 5 DSA problems"
              maxLength={100}
              disabled={isSubmitting || useMagic}
              className="form-input-modern"
            />
          </div>
          {errors.title && <p className="error-text">{errors.title}</p>}
        </div>

        {/* Category & Priority Grid */}
        <div className="form-grid">
          <div className="form-group-modern">
            <label className="form-label-modern">Category</label>
            <div className="input-wrapper-modern">
              <Tag size={18} className="input-icon" />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={isSubmitting}
                className="form-select-modern"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group-modern">
            <label className="form-label-modern">Priority</label>
            <div className="input-wrapper-modern">
              <Flag size={18} className="input-icon" />
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                disabled={isSubmitting}
                className="form-select-modern"
              >
                <option value="1">Low Priority</option>
                <option value="2">Medium-Low</option>
                <option value="3">Medium</option>
                <option value="4">High Priority</option>
                <option value="5">Urgent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Time Selection Grid */}
        <div className="form-grid">
          <div className="form-group-modern">
            <label className="form-label-modern">Start Time</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div className="input-wrapper-modern" style={{ flex: 1 }}>
                <Clock size={18} className="input-icon" />
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="form-input-modern"
                />
              </div>
              <div className="am-pm-toggle">
                <button
                  type="button"
                  onClick={() => updateFormData({ startPeriod: 'AM' })}
                  className={`ampm-btn ${formData.startPeriod === 'AM' ? 'active' : ''}`}
                >AM</button>
                <button
                  type="button"
                  onClick={() => updateFormData({ startPeriod: 'PM' })}
                  className={`ampm-btn ${formData.startPeriod === 'PM' ? 'active' : ''}`}
                >PM</button>
              </div>
            </div>
            {errors.startTime && <p className="error-text">{errors.startTime}</p>}
          </div>

          <div className="form-group-modern">
            <label className="form-label-modern">End Time</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div className="input-wrapper-modern" style={{ flex: 1 }}>
                <Clock size={18} className="input-icon" />
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="form-input-modern"
                />
              </div>
              <div className="am-pm-toggle">
                <button
                  type="button"
                  onClick={() => updateFormData({ endPeriod: 'AM' })}
                  className={`ampm-btn ${formData.endPeriod === 'AM' ? 'active' : ''}`}
                >AM</button>
                <button
                  type="button"
                  onClick={() => updateFormData({ endPeriod: 'PM' })}
                  className={`ampm-btn ${formData.endPeriod === 'PM' ? 'active' : ''}`}
                >PM</button>
              </div>
            </div>
            {errors.endTime && <p className="error-text">{errors.endTime}</p>}
          </div>
        </div>

        {errors.timeRange && <p className="error-text-center">{errors.timeRange}</p>}

        {/* Conflict UI */}
        {conflict && (
          <div className="conflict-box">
            <div className="conflict-header">
              <AlertTriangle size={18} />
              <span>Time Conflict Detected</span>
            </div>
            <p>Clashes with <strong>{conflict.conflictingTask.title}</strong></p>
            <button type="button" onClick={handleAutoReschedule} className="btn-conflict-action">
              Find Next Slot <ArrowRight size={14} />
            </button>
          </div>
        )}

        <button type="submit" className="btn-modern-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Scheduling...' : <><Plus size={20} /> Add Task</>}
        </button>
      </form>
    </div>
  );
}

AddTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
  currentTasks: PropTypes.array
};

export default AddTaskForm;