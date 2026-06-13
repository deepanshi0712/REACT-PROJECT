import React from 'react';
import './SearchBar.css';

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="goal-search" className="sr-only">
        Search goals
      </label>
      <span className="search-icon" aria-hidden="true">
        🔍
      </span>
      <input
        id="goal-search"
        type="text"
        className="search-input"
        placeholder="Search goals by title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          className="search-clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
