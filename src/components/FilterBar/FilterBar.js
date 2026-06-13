import React from 'react';
import { FILTER_OPTIONS, SORT_OPTIONS } from '../../utils/constants';
import './FilterBar.css';

function FilterBar({ filter, sortBy, onFilterChange, onSortChange }) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <span className="filter-label">Filter:</span>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === FILTER_OPTIONS.ALL ? 'active' : ''}`}
            onClick={() => onFilterChange(FILTER_OPTIONS.ALL)}
          >
            All Goals
          </button>
          <button
            className={`filter-btn ${filter === FILTER_OPTIONS.COMPLETED ? 'active' : ''}`}
            onClick={() => onFilterChange(FILTER_OPTIONS.COMPLETED)}
          >
            Completed
          </button>
          <button
            className={`filter-btn ${filter === FILTER_OPTIONS.PENDING ? 'active' : ''}`}
            onClick={() => onFilterChange(FILTER_OPTIONS.PENDING)}
          >
            Pending
          </button>
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-select" className="filter-label">
          Sort by:
        </label>
        <select
          id="sort-select"
          className="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value={SORT_OPTIONS.DEADLINE}>Deadline</option>
          <option value={SORT_OPTIONS.PRIORITY}>Priority</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
