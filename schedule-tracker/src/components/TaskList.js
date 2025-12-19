import React from 'react';
import PropTypes from 'prop-types';
import { CheckSquare } from 'lucide-react';
import TaskItem from './TaskItem';

/**
 * TaskList Component
 * Displays all tasks for the current day
 */
function TaskList({ tasks, onToggleComplete, onDeleteTask }) {
  const sortedTasks = [...tasks].sort((a, b) => {
    const timeA = a.startTime24 || '';
    const timeB = b.startTime24 || '';
    return timeA.localeCompare(timeB);
  });

  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          marginBottom: '32px'
        }}>
          <div className="icon-badge gradient-blue">
            <CheckSquare size={24} color="white" />
          </div>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: '#1f2937',
            margin: 0 
          }}>
            Today's Schedule
          </h2>
        </div>
        
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <div className="empty-state-text">
            <p style={{ marginBottom: '4px', fontWeight: '600' }}>
              No tasks scheduled for today
            </p>
            <p style={{ fontSize: '14px', color: '#9ca3af' }}>
              Add your first task to get started!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list">
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        marginBottom: '24px'
      }}>
        <div className="icon-badge gradient-blue">
          <CheckSquare size={24} color="white" />
        </div>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: '#1f2937',
          margin: 0 
        }}>
          Today's Schedule ({tasks.length})
        </h2>
      </div>
      
      <div className="tasks-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {sortedTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    })
  ).isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired
};

export default TaskList;