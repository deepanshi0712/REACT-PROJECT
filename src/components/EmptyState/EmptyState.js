import React from 'react';
import './EmptyState.css';

function EmptyState({ hasFilters }) {
  return (
    <div className="empty-state">
      <div className="empty-illustration" aria-hidden="true">
        <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="15" width="80" height="70" rx="8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
          <line x1="35" y1="35" x2="75" y2="35" stroke="currentColor" strokeWidth="2" opacity="0.4" />
          <line x1="35" y1="50" x2="65" y2="50" stroke="currentColor" strokeWidth="2" opacity="0.3" />
          <line x1="35" y1="65" x2="55" y2="65" stroke="currentColor" strokeWidth="2" opacity="0.2" />
          <circle cx="90" cy="75" r="18" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.25" />
          <text x="90" y="80" textAnchor="middle" fill="currentColor" fontSize="16" opacity="0.4">?</text>
        </svg>
      </div>
      <h3 className="empty-title">
        {hasFilters ? 'No goals match your search' : 'No goals yet'}
      </h3>
      <p className="empty-text">
        {hasFilters
          ? 'Try changing your search or filter options to find what you are looking for.'
          : 'Start by adding your first goal using the form above. Stay organized and track your progress!'}
      </p>
    </div>
  );
}

export default EmptyState;
