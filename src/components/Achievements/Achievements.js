import React from 'react';
import './Achievements.css';

function Achievements({ badges }) {
  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <section className="achievements" aria-label="Achievement badges">
      <div className="achievements-header">
        <h2 className="section-heading">Achievements</h2>
        <span className="achievements-count">
          {earnedCount}/{badges.length} unlocked
        </span>
      </div>
      <div className="badges-grid">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`badge-card ${badge.earned ? 'earned' : 'locked'}`}
            title={badge.description}
          >
            <span className="badge-icon">{badge.earned ? badge.icon : '🔒'}</span>
            <span className="badge-title">{badge.title}</span>
            <span className="badge-desc">{badge.description}</span>
            {badge.earned && <span className="badge-earned-tag">Unlocked</span>}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Achievements;
