export const STORAGE_KEY = 'goalflow_goals';
export const THEME_KEY = 'goalflow_theme';
export const ACTIVITY_KEY = 'goalflow_activity';
export const GAMIFICATION_KEY = 'goalflow_gamification';

export const PRIORITY = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
};

export const PRIORITY_ORDER = {
  High: 1,
  Medium: 2,
  Low: 3,
};

export const FILTER_OPTIONS = {
  ALL: 'all',
  COMPLETED: 'completed',
  PENDING: 'pending',
};

export const SORT_OPTIONS = {
  DEADLINE: 'deadline',
  PRIORITY: 'priority',
};

// Gamification: XP earned per priority
export const XP_VALUES = {
  Low: 10,
  Medium: 20,
  High: 30,
};

// Gamification: Level thresholds (XP required to reach each level)
export const LEVEL_THRESHOLDS = [
  { level: 1, minXP: 0 },
  { level: 2, minXP: 100 },
  { level: 3, minXP: 250 },
  { level: 4, minXP: 500 },
  { level: 5, minXP: 1000 },
];

// Gamification: Achievement badges
export const BADGES = [
  {
    id: 'first_goal',
    title: 'First Step',
    description: 'Complete your first goal',
    icon: '🎯',
    check: (stats) => stats.totalGoalsCompleted >= 1,
  },
  {
    id: 'streak_3',
    title: '3-Day Streak',
    description: 'Complete goals for 3 days in a row',
    icon: '🔥',
    check: (stats) => stats.longestStreak >= 3,
  },
  {
    id: 'streak_7',
    title: '7-Day Streak',
    description: 'Complete goals for 7 days in a row',
    icon: '⚡',
    check: (stats) => stats.longestStreak >= 7,
  },
  {
    id: 'goals_10',
    title: 'Goal Getter',
    description: 'Complete 10 goals',
    icon: '🏅',
    check: (stats) => stats.totalGoalsCompleted >= 10,
  },
  {
    id: 'goals_25',
    title: 'Overachiever',
    description: 'Complete 25 goals',
    icon: '🏆',
    check: (stats) => stats.totalGoalsCompleted >= 25,
  },
  {
    id: 'xp_100',
    title: 'XP Hunter',
    description: 'Earn 100 total XP',
    icon: '⭐',
    check: (stats) => stats.totalXP >= 100,
  },
];

export const DEFAULT_GAMIFICATION = {
  totalXP: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastCompletionDate: null,
  totalGoalsCompleted: 0,
  earnedBadges: [],
  goalsAwardedXP: [],
};

// Sample goals for first-time users
export const SAMPLE_GOALS = [
  {
    id: 'sample-1',
    title: 'Complete React Assignment',
    description: 'Finish the GoalFlow personal goal tracker project for college submission.',
    deadline: getFutureDate(14),
    priority: 'High',
    completed: false,
    createdAt: getPastDate(5),
  },
  {
    id: 'sample-2',
    title: 'Read 2 Chapters of DBMS',
    description: 'Cover normalization and ER diagrams from the prescribed textbook.',
    deadline: getFutureDate(7),
    priority: 'Medium',
    completed: false,
    createdAt: getPastDate(3),
  },
  {
    id: 'sample-3',
    title: 'Morning Walk Routine',
    description: 'Walk for 30 minutes every morning before classes start.',
    deadline: getFutureDate(30),
    priority: 'Low',
    completed: true,
    createdAt: getPastDate(10),
  },
  {
    id: 'sample-4',
    title: 'Prepare for Mid-Sem Exam',
    description: 'Revise all unit notes and solve previous year question papers.',
    deadline: getFutureDate(-2),
    priority: 'High',
    completed: false,
    createdAt: getPastDate(15),
  },
];

function getFutureDate(daysFromNow) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
}

function getPastDate(daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
}
