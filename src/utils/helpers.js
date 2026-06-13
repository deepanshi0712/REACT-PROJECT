import { PRIORITY_ORDER } from './constants';

/**
 * Generate a unique ID for new goals
 */
export function generateId() {
  return `goal-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Format ISO date string to readable format
 */
export function formatDate(dateString) {
  if (!dateString) return '—';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Check if a deadline is overdue
 */
export function isOverdue(deadline, completed) {
  if (completed || !deadline) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);
  return deadlineDate < today;
}

/**
 * Check if deadline is within next 7 days
 */
export function isUpcoming(deadline, completed) {
  if (completed || !deadline) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);
  const diffDays = (deadlineDate - today) / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 7;
}

/**
 * Get days remaining until deadline
 */
export function getDaysRemaining(deadline) {
  if (!deadline) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);
  return Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
}

/**
 * Calculate dashboard statistics from goals array
 */
export function calculateStats(goals) {
  const total = goals.length;
  const completed = goals.filter((g) => g.completed).length;
  const pending = total - completed;
  const completionPercentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return { total, completed, pending, completionPercentage };
}

/**
 * Filter goals by search query and filter type
 */
export function filterGoals(goals, searchQuery, filterType) {
  let filtered = [...goals];

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    filtered = filtered.filter((goal) =>
      goal.title.toLowerCase().includes(query)
    );
  }

  if (filterType === 'completed') {
    filtered = filtered.filter((g) => g.completed);
  } else if (filterType === 'pending') {
    filtered = filtered.filter((g) => !g.completed);
  }

  return filtered;
}

/**
 * Sort goals by deadline or priority
 */
export function sortGoals(goals, sortBy) {
  const sorted = [...goals];

  if (sortBy === 'deadline') {
    sorted.sort((a, b) => {
      if (!a.deadline) return 1;
      if (!b.deadline) return -1;
      return new Date(a.deadline) - new Date(b.deadline);
    });
  } else if (sortBy === 'priority') {
    sorted.sort((a, b) => {
      const orderA = PRIORITY_ORDER[a.priority] || 99;
      const orderB = PRIORITY_ORDER[b.priority] || 99;
      return orderA - orderB;
    });
  }

  return sorted;
}

/**
 * Validate goal form data
 */
export function validateGoalForm(formData) {
  const errors = {};

  if (!formData.title.trim()) {
    errors.title = 'Goal title is required';
  } else if (formData.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters';
  }

  if (!formData.deadline) {
    errors.deadline = 'Deadline is required';
  }

  if (!formData.priority) {
    errors.priority = 'Please select a priority';
  }

  return errors;
}

/**
 * Get relative time string for activity feed
 */
export function getRelativeTime(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hr ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return formatDate(timestamp);
}
