import React from 'react';
import './ProgressTracker.css';

function ProgressTracker({ percentage }) {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className="progress-tracker" aria-label={`Overall progress: ${clampedPercentage}%`}>
      <div className="progress-header">
        <span className="progress-label">Overall Progress</span>
        <span className="progress-percentage">{clampedPercentage}%</span>
      </div>
      <div className="progress-bar-bg">
        <div
          className="progress-bar-fill"
          style={{ width: `${clampedPercentage}%` }}
          role="progressbar"
          aria-valuenow={clampedPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

export default ProgressTracker;
