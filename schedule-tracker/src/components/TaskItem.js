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
    <div className={`task-item-enhanced ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <button
          onClick={handleToggle}
          className="task-checkbox"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
          title={task.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {task.completed ? (
            <CheckCircle size={24} color="#10b981" />
          ) : (
            <Circle size={24} color="#d1d5db" />
          )}
        </button>
        
        <div>
          <div className="task-title">{task.title}</div>
          
          <div className="task-meta">
            <div className="task-meta-item">
              <span 
                className="task-badge"
                style={{ background: catStyle.bg, color: catStyle.color }}
              >
                {task.category}
              </span>
            </div>
            <div className="task-meta-item">
              <span>
                {task.displayStart} - {task.displayEnd}
              </span>
            </div>
            {duration && (
              <div className="task-meta-item">
                <span style={{color: '#818cf8', fontWeight: '600'}}>
                  ({duration})
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="task-actions">
        <button
          onClick={handleToggle}
          className="task-btn task-btn-complete"
          title={task.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {task.completed ? '✓' : '○'}
        </button>
        <button
          onClick={handleDelete}
          className="task-btn task-btn-delete"
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