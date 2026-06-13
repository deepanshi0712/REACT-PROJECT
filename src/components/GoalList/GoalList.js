import React from 'react';
import GoalCard from '../GoalCard/GoalCard';
import EmptyState from '../EmptyState/EmptyState';
import './GoalList.css';

function GoalList({ goals, onToggleComplete, onEdit, onDelete, hasFilters }) {
  if (goals.length === 0) {
    return <EmptyState hasFilters={hasFilters} />;
  }

  return (
    <section className="goal-list-section" aria-label="Goals list">
      <h2 className="section-heading">
        Your Goals
        <span className="goal-count">({goals.length})</span>
      </h2>
      <div className="goal-list">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}

export default GoalList;
