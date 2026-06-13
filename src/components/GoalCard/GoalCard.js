import React, { useState } from 'react';
import {
  formatDate,
  isOverdue,
  isUpcoming,
  getDaysRemaining,
} from '../../utils/helpers';
import './GoalCard.css';

function GoalCard({ goal, onToggleComplete, onEdit, onDelete }) {
  const [justCompleted, setJustCompleted] = useState(false);

  const overdue = isOverdue(goal.deadline, goal.completed);
  const upcoming = isUpcoming(goal.deadline, goal.completed);
  const daysLeft = getDaysRemaining(goal.deadline);

  const handleToggle = () => {
    if (!goal.completed) {
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 600);
    }
    onToggleComplete(goal.id);
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'priority-high';
      case 'Medium':
        return 'priority-medium';
      case 'Low':
        return 'priority-low';
      default:
        return '';
    }
  };

  const getDeadlineLabel = () => {
    if (goal.completed) return null;
    if (overdue) return `${Math.abs(daysLeft)} day${Math.abs(daysLeft) !== 1 ? 's' : ''} overdue`;
    if (daysLeft === 0) return 'Due today';
    if (daysLeft === 1) return 'Due tomorrow';
    return `${daysLeft} days left`;
  };

  return (
    <article
      className={`goal-card ${goal.completed ? 'completed' : ''} ${
        overdue ? 'overdue' : ''
      } ${upcoming ? 'upcoming' : ''} ${justCompleted ? 'celebrate' : ''}`}
    >
      {justCompleted && (
        <div className="celebration-overlay" aria-hidden="true">
          <span>🎉</span>
        </div>
      )}

      <div className="goal-card-header">
        <label className="checkbox-wrapper">
          <input
            type="checkbox"
            checked={goal.completed}
            onChange={handleToggle}
            aria-label={`Mark "${goal.title}" as ${goal.completed ? 'incomplete' : 'complete'}`}
          />
          <span className="checkmark" />
        </label>
        <h3 className={`goal-title ${goal.completed ? 'struck' : ''}`}>
          {goal.title}
        </h3>
        <span className={`priority-badge ${getPriorityClass(goal.priority)}`}>
          {goal.priority}
        </span>
      </div>

      {goal.description && (
        <p className="goal-description">{goal.description}</p>
      )}

      <div className="goal-meta">
        <span className="meta-item">
          📅 Due: {formatDate(goal.deadline)}
        </span>
        <span className="meta-item">
          🕐 Created: {formatDate(goal.createdAt)}
        </span>
      </div>

      {!goal.completed && (
        <div className="deadline-status">
          {overdue && (
            <span className="status-badge status-overdue">
              ⚠ Overdue — {getDeadlineLabel()}
            </span>
          )}
          {upcoming && !overdue && (
            <span className="status-badge status-upcoming">
              ⏰ Upcoming — {getDeadlineLabel()}
            </span>
          )}
          {!overdue && !upcoming && daysLeft !== null && (
            <span className="status-badge status-normal">
              {getDeadlineLabel()}
            </span>
          )}
        </div>
      )}

      {goal.completed && (
        <span className="status-badge status-done">✓ Completed</span>
      )}

      <div className="goal-card-actions">
        <button className="action-btn edit-btn" onClick={() => onEdit(goal)}>
          Edit
        </button>
        <button className="action-btn delete-btn" onClick={() => onDelete(goal)}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default GoalCard;
