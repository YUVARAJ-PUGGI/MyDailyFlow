import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Plus, AlertTriangle, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import useForm from '../hooks/useForm';
import { getCategoryNames } from '../constants/categories';
import { convertTo24Hour } from '../utils/timeUtils';
import { detectConflict, findNextAvailableSlot } from '../utils/schedulingUtils';

/**
 * AddTaskForm Component
 * Form for creating new tasks with validation, priority, and conflict detection.
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
        setConflict({
          newTask,
          conflictingTask
        });
        return; // Stop submission
      }

      onAddTask(newTask);
      toast.success('Task added successfully!');
      setConflict(null); // Clear conflict state on success
    } catch (error) {
      toast.error('Failed to add task. Please try again.');
      throw error;
    }
  };

  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    updateFormData
  } = useForm(initialFormState, handleFormSubmit);

  const handleAutoReschedule = () => {
    if (!conflict) return;

    const nextSlot = findNextAvailableSlot(conflict.newTask, currentTasks);

    if (nextSlot) {
      // Parse 24h back to 12h for form state
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

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
        <div className="icon-badge gradient-indigo">
          <Plus size={24} color="white" />
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>
          Add Task
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Task Title <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Solve 5 DSA problems"
            maxLength={100}
            disabled={isSubmitting}
            className="form-input"
          />
          {errors.title && (
            <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
              {errors.title}
            </p>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">
              Category <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={isSubmitting}
              className="form-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Priority <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              disabled={isSubmitting}
              className="form-select"
            >
              <option value="1">1 - Low</option>
              <option value="2">2 - Medium-Low</option>
              <option value="3">3 - Medium</option>
              <option value="4">4 - High</option>
              <option value="5">5 - Urgent</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">
              Start Time <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              disabled={isSubmitting}
              className="form-input"
            />
            <div className="time-toggle">
              <button
                type="button"
                onClick={() => updateFormData({ startPeriod: 'AM' })}
                className={`toggle-btn ${formData.startPeriod === 'AM' ? 'active' : ''}`}
                disabled={isSubmitting}
              >
                AM
              </button>
              <button
                type="button"
                onClick={() => updateFormData({ startPeriod: 'PM' })}
                className={`toggle-btn ${formData.startPeriod === 'PM' ? 'active' : ''}`}
                disabled={isSubmitting}
              >
                PM
              </button>
            </div>
            {errors.startTime && (
              <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                {errors.startTime}
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              End Time <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              disabled={isSubmitting}
              className="form-input"
            />
            <div className="time-toggle">
              <button
                type="button"
                onClick={() => updateFormData({ endPeriod: 'AM' })}
                className={`toggle-btn ${formData.endPeriod === 'AM' ? 'active' : ''}`}
                disabled={isSubmitting}
              >
                AM
              </button>
              <button
                type="button"
                onClick={() => updateFormData({ endPeriod: 'PM' })}
                className={`toggle-btn ${formData.endPeriod === 'PM' ? 'active' : ''}`}
                disabled={isSubmitting}
              >
                PM
              </button>
            </div>
            {errors.endTime && (
              <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                {errors.endTime}
              </p>
            )}
          </div>
        </div>

        {errors.timeRange && (
          <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px', textAlign: 'center' }}>
            {errors.timeRange}
          </p>
        )}

        {/* Conflict Warning UI */}
        {conflict && (
          <div className="glass-panel" style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid #ef4444',
            padding: '16px',
            marginBottom: '20px',
            animation: 'fadeIn 0.3s'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444', marginBottom: '10px' }}>
              <AlertTriangle size={20} />
              <span style={{ fontWeight: 'bold' }}>Scheduling Conflict Detected!</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>
              This overlaps with '{conflict.conflictingTask.title}' ({conflict.conflictingTask.displayStart} - {conflict.conflictingTask.displayEnd}).
            </p>
            <button
              type="button"
              onClick={handleAutoReschedule}
              style={{
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid #ef4444',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                justifyContent: 'center'
              }}
            >
              Auto-Reschedule <ArrowRight size={14} />
            </button>
          </div>
        )}

        <button
          type="submit"
          className="btn-primary"
          disabled={isSubmitting}
          style={{ opacity: isSubmitting ? 0.6 : 1 }}
        >
          <Plus size={20} style={{ display: 'inline', marginRight: '8px' }} />
          {isSubmitting ? 'Adding...' : 'Add Task'}
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