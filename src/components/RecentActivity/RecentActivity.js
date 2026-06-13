import React from 'react';
import { getRelativeTime } from '../../utils/helpers';
import './RecentActivity.css';

function RecentActivity({ activities }) {
  if (!activities || activities.length === 0) {
    return null;
  }

  return (
    <section className="recent-activity" aria-label="Recent activity">
      <h2 className="section-heading">Recent Activity</h2>
      <ul className="activity-list">
        {activities.map((item) => (
          <li key={item.id} className="activity-item">
            <span className="activity-dot" aria-hidden="true" />
            <div className="activity-content">
              <p className="activity-message">{item.message}</p>
              <time className="activity-time">{getRelativeTime(item.timestamp)}</time>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RecentActivity;
