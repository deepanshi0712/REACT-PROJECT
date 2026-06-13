import React from 'react';
import './Navbar.css';

function Navbar({ isDark, onToggleDarkMode }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="navbar-logo" aria-hidden="true">
            ◎
          </span>
          <div>
            <h1 className="navbar-title">GoalFlow</h1>
            <p className="navbar-subtitle">Personal Goal Tracker</p>
          </div>
        </div>

        <button
          className="theme-toggle"
          onClick={onToggleDarkMode}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
