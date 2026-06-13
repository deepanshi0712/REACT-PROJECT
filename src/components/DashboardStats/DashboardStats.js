import React from 'react';
import './DashboardStats.css';

function DashboardStats({ stats }) {
  const statCards = [
    { label: 'Total Goals', value: stats.total, className: 'stat-total' },
    { label: 'Completed', value: stats.completed, className: 'stat-completed' },
    { label: 'Pending', value: stats.pending, className: 'stat-pending' },
    {
      label: 'Completion',
      value: `${stats.completionPercentage}%`,
      className: 'stat-percentage',
    },
  ];

  return (
    <section className="dashboard-stats" aria-label="Goal statistics">
      <h2 className="section-heading">Dashboard</h2>
      <div className="stats-grid">
        {statCards.map((card) => (
          <div key={card.label} className={`stat-card ${card.className}`}>
            <span className="stat-value">{card.value}</span>
            <span className="stat-label">{card.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DashboardStats;
