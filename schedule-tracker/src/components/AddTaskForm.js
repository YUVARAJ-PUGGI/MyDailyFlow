import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Plus, AlertTriangle, ArrowRight, Type, Tag, Flag, Clock, Calendar } from 'lucide-react';
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

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div className="icon-badge gradient-indigo">
          <Plus size={24} color="white" />
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: 0 }}>Add New Task</h2>
      </div>

      <form onSubmit={handleSubmit}>
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
              placeholder="What are you working on?"
              maxLength={100}
              disabled={isSubmitting}
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
          {isSubmitting ? 'Scheduling...' : 'Create Scheduled Task'}
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