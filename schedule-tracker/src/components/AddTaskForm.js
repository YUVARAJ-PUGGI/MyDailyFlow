import React from 'react';
import PropTypes from 'prop-types';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import useForm from '../hooks/useForm';
import { getCategoryNames } from '../constants/categories';
import { convertTo24Hour } from '../utils/timeUtils';

/**
 * AddTaskForm Component
 * Form for creating new tasks with validation
 */
function AddTaskForm({ onAddTask }) {
  const categories = getCategoryNames();

  const initialFormState = {
    title: '',
    category: 'DSA',
    startTime: '',
    endTime: '',
    startPeriod: 'AM',
    endPeriod: 'AM'
  };

  const handleFormSubmit = (formData) => {
    try {
      const start24 = convertTo24Hour(formData.startTime, formData.startPeriod);
      const end24 = convertTo24Hour(formData.endTime, formData.endPeriod);

      const taskData = {
        ...formData,
        startTime24: start24,
        endTime24: end24,
        displayStart: `${formData.startTime} ${formData.startPeriod}`,
        displayEnd: `${formData.endTime} ${formData.endPeriod}`
      };

      onAddTask(taskData);
      toast.success('Task added successfully!');
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

  return (
    <div className="glass">
      <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px'}}>
        <div className="icon-badge gradient-indigo">
          <Plus size={24} color="white" />
        </div>
        <h2 style={{fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: 0}}>
          Add Task
        </h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Task Title <span style={{color: '#dc2626'}}>*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Solve 5 DSA problems"
            maxLength={100}
            disabled={isSubmitting}
          />
          {errors.title && (
            <p style={{color: '#dc2626', fontSize: '12px', marginTop: '4px'}}>
              {errors.title}
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">
            Category <span style={{color: '#dc2626'}}>*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && (
            <p style={{color: '#dc2626', fontSize: '12px', marginTop: '4px'}}>
              {errors.category}
            </p>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              Start Time <span style={{color: '#dc2626'}}>*</span>
            </label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <div className="time-toggle">
              <button
                type="button"
                onClick={() => updateFormData({startPeriod: 'AM'})}
                className={`toggle-btn ${formData.startPeriod === 'AM' ? 'active' : ''}`}
                disabled={isSubmitting}
              >
                AM
              </button>
              <button
                type="button"
                onClick={() => updateFormData({startPeriod: 'PM'})}
                className={`toggle-btn ${formData.startPeriod === 'PM' ? 'active' : ''}`}
                disabled={isSubmitting}
              >
                PM
              </button>
            </div>
            {errors.startTime && (
              <p style={{color: '#dc2626', fontSize: '12px', marginTop: '4px'}}>
                {errors.startTime}
              </p>
            )}
          </div>
          
          <div className="form-group">
            <label className="form-label">
              End Time <span style={{color: '#dc2626'}}>*</span>
            </label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <div className="time-toggle">
              <button
                type="button"
                onClick={() => updateFormData({endPeriod: 'AM'})}
                className={`toggle-btn ${formData.endPeriod === 'AM' ? 'active' : ''}`}
                disabled={isSubmitting}
              >
                AM
              </button>
              <button
                type="button"
                onClick={() => updateFormData({endPeriod: 'PM'})}
                className={`toggle-btn ${formData.endPeriod === 'PM' ? 'active' : ''}`}
                disabled={isSubmitting}
              >
                PM
              </button>
            </div>
            {errors.endTime && (
              <p style={{color: '#dc2626', fontSize: '12px', marginTop: '4px'}}>
                {errors.endTime}
              </p>
            )}
          </div>
        </div>

        {errors.timeRange && (
          <p style={{color: '#dc2626', fontSize: '13px', marginBottom: '12px', textAlign: 'center'}}>
            {errors.timeRange}
          </p>
        )}

        {errors.submit && (
          <p style={{color: '#dc2626', fontSize: '13px', marginBottom: '12px', textAlign: 'center'}}>
            {errors.submit}
          </p>
        )}

        <button 
          type="submit" 
          className="btn-gradient"
          disabled={isSubmitting}
          style={{opacity: isSubmitting ? 0.6 : 1}}
        >
          <Plus size={20} style={{display: 'inline', marginRight: '8px'}} />
          {isSubmitting ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
}

AddTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired
};

export default AddTaskForm;