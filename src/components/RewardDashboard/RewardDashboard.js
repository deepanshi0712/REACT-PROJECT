import React from 'react';
import './RewardDashboard.css';

function RewardDashboard({ stats, levelProgress }) {
  const earnedCount = stats.earnedBadges.length;

  return (
    <section className="reward-dashboard" aria-label="Rewards and progress">
      <h2 className="section-heading">Rewards</h2>
      <div className="reward-card">
        <div className="reward-top">
          <div className="level-badge">
            <span className="level-number">Lv.{stats.level}</span>
            <span className="level-label">Level</span>
          </div>
          <div className="xp-info">
            <span className="xp-total">{stats.totalXP} XP</span>
            <span className="xp-sub">
              {levelProgress.nextLevelXP
                ? `${levelProgress.xpNeeded} XP to Level ${stats.level + 1}`
                : 'Max level reached!'}
            </span>
          </div>
        </div>

        <div className="xp-progress-section">
          <div className="xp-progress-header">
            <span>Level Progress</span>
            <span>{levelProgress.percentage}%</span>
          </div>
          <div className="xp-progress-bar-bg">
            <div
              className="xp-progress-bar-fill"
              style={{ width: `${levelProgress.percentage}%` }}
              role="progressbar"
              aria-valuenow={levelProgress.percentage}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        <div className="streak-row">
          <div className="streak-item">
            <span className="streak-icon">🔥</span>
            <div>
              <span className="streak-value">{stats.currentStreak}</span>
              <span className="streak-label">Current Streak</span>
            </div>
          </div>
          <div className="streak-divider" />
          <div className="streak-item">
            <span className="streak-icon">🏅</span>
            <div>
              <span className="streak-value">{stats.longestStreak}</span>
              <span className="streak-label">Longest Streak</span>
            </div>
          </div>
          <div className="streak-divider" />
          <div className="streak-item">
            <span className="streak-icon">🎖️</span>
            <div>
              <span className="streak-value">{earnedCount}</span>
              <span className="streak-label">Badges Earned</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RewardDashboard;
