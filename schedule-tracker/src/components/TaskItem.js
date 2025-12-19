import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { getCategoryStyle } from '../constants/categories';
import { formatDuration } from '../utils/timeUtils';

/**
 * TaskItem Component
 * Individual task display with actions
 */

// Utility function for duration calculation (defined before component)
const calculateDuration = (startTime, endTime) => {
  if (!startTime || !endTime) return 0;
  const start = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);
  if (end < start) end.setDate(end.getDate() + 1);
  return (end - start) / (1000 * 60 * 60);
};

function TaskItem({ task, onToggleComplete, onDeleteTask }) {
  const catStyle = getCategoryStyle(task.category);

  // Calculate task duration
  const duration = task.startTime24 && task.endTime24
    ? formatDuration(calculateDuration(task.startTime24, task.endTime24))
    : '';

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDeleteTask(task.id);
      toast.success('Task deleted');
    }
  };

  const handleToggle = () => {
    onToggleComplete(task.id);
    toast.success(task.completed ? 'Task marked incomplete' : 'Task completed!');
  };

  return (
    <div className={`task-item ${task.completed ? 'task-completed' : ''}`}>
      <div className="task-item-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={handleToggle}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              color: task.completed ? '#10b981' : '#cbd5e1'
            }}
            aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
          >
            {task.completed ? (
              <CheckCircle size={24} />
            ) : (
              <Circle size={24} />
            )}
          </button>

          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 4px 0', color: 'white' }}>
              {task.title}
            </h3>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span
                style={{
                  background: catStyle.bg,
                  color: catStyle.color,
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
              >
                {task.category}
              </span>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                {task.displayStart} - {task.displayEnd}
              </span>
              {duration && (
                <span style={{ fontSize: '13px', color: '#818cf8', fontWeight: '500' }}>
                  {duration}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="task-item-actions">
        <button
          onClick={handleDelete}
          className="btn-danger"
          title="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>

  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    displayStart: PropTypes.string.isRequired,
    displayEnd: PropTypes.string.isRequired,
    startTime24: PropTypes.string,
    endTime24: PropTypes.string
  }).isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired
};

export default TaskItem;