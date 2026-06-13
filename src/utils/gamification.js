import { LEVEL_THRESHOLDS, BADGES, XP_VALUES } from './constants';

/**
 * Get today's date as YYYY-MM-DD string
 */
export function getTodayString() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get yesterday's date as YYYY-MM-DD string
 */
export function getYesterdayString() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
}

/**
 * Calculate days difference between two YYYY-MM-DD dates
 */
export function daysBetween(dateStr1, dateStr2) {
  const d1 = new Date(dateStr1);
  const d2 = new Date(dateStr2);
  return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
}

/**
 * Check if streak should be reset based on last completion date
 */
export function shouldResetStreak(lastCompletionDate) {
  if (!lastCompletionDate) return false;
  const today = getTodayString();
  const yesterday = getYesterdayString();
  return lastCompletionDate !== today && lastCompletionDate !== yesterday;
}

/**
 * Calculate current level from total XP
 */
export function calculateLevel(totalXP) {
  let level = 1;
  for (const threshold of LEVEL_THRESHOLDS) {
    if (totalXP >= threshold.minXP) {
      level = threshold.level;
    }
  }
  return level;
}

/**
 * Get XP progress within current level for progress bar
 */
export function getLevelProgress(totalXP) {
  const level = calculateLevel(totalXP);
  const currentThreshold = LEVEL_THRESHOLDS.find((t) => t.level === level);
  const nextThreshold = LEVEL_THRESHOLDS.find((t) => t.level === level + 1);

  if (!nextThreshold) {
    return { level, currentXP: totalXP, nextLevelXP: null, percentage: 100, xpNeeded: 0 };
  }

  const levelStartXP = currentThreshold.minXP;
  const levelEndXP = nextThreshold.minXP;
  const xpInLevel = totalXP - levelStartXP;
  const xpRequired = levelEndXP - levelStartXP;
  const percentage = Math.min(100, Math.round((xpInLevel / xpRequired) * 100));
  const xpNeeded = levelEndXP - totalXP;

  return {
    level,
    currentXP: totalXP,
    nextLevelXP: levelEndXP,
    percentage,
    xpNeeded,
  };
}

/**
 * Get XP reward for a goal priority
 */
export function getXPReward(priority) {
  return XP_VALUES[priority] || XP_VALUES.Medium;
}

/**
 * Check which badges should be unlocked
 */
export function checkNewBadges(stats, earnedBadges) {
  const newlyUnlocked = [];
  for (const badge of BADGES) {
    if (!earnedBadges.includes(badge.id) && badge.check(stats)) {
      newlyUnlocked.push(badge);
    }
  }
  return newlyUnlocked;
}

/**
 * Generate motivational message based on gamification state
 */
export function getMotivationMessage(stats, levelProgress) {
  const messages = [];

  if (stats.currentStreak >= 2) {
    messages.push({
      text: `You're on a ${stats.currentStreak}-day streak! Keep it going!`,
      type: 'streak',
    });
  } else if (stats.currentStreak === 0 && stats.longestStreak > 0) {
    messages.push({
      text: 'Complete a goal today to start a new streak!',
      type: 'streak',
    });
  }

  if (levelProgress.xpNeeded > 0 && levelProgress.xpNeeded <= 50) {
    messages.push({
      text: `Only ${levelProgress.xpNeeded} XP needed for Level ${levelProgress.level + 1}!`,
      type: 'level',
    });
  } else if (levelProgress.level < 5) {
    messages.push({
      text: `Only ${levelProgress.xpNeeded} XP needed for Level ${levelProgress.level + 1}!`,
      type: 'level',
    });
  } else if (levelProgress.level >= 5) {
    messages.push({
      text: "You've reached the max level! You're a goal-tracking champion!",
      type: 'level',
    });
  }

  const lockedBadges = BADGES.filter((b) => !stats.earnedBadges.includes(b.id));
  if (lockedBadges.length > 0) {
    const nextBadge = lockedBadges[0];
    if (nextBadge.id === 'first_goal' && stats.totalGoalsCompleted === 0) {
      messages.push({
        text: 'Complete 1 goal to unlock your first badge!',
        type: 'badge',
      });
    } else if (nextBadge.id === 'streak_3' && stats.currentStreak > 0 && stats.currentStreak < 3) {
      messages.push({
        text: `Complete goals for ${3 - stats.currentStreak} more day(s) to unlock the 3-Day Streak badge!`,
        type: 'badge',
      });
    } else if (nextBadge.id === 'goals_10' && stats.totalGoalsCompleted < 10) {
      const remaining = 10 - stats.totalGoalsCompleted;
      if (remaining <= 3) {
        messages.push({
          text: `Complete ${remaining} more goal${remaining > 1 ? 's' : ''} to unlock a badge!`,
          type: 'badge',
        });
      }
    }
  }

  if (messages.length === 0) {
    if (stats.totalGoalsCompleted === 0) {
      return [{ text: 'Complete your first goal to start earning XP!', type: 'default' }];
    }
    return [{ text: 'Every goal completed brings you closer to your dreams!', type: 'default' }];
  }

  return messages.slice(0, 2);
}

/**
 * Update streak when a goal is completed today
 */
export function updateStreakOnCompletion(currentStreak, longestStreak, lastCompletionDate) {
  const today = getTodayString();
  const yesterday = getYesterdayString();

  if (lastCompletionDate === today) {
    return { currentStreak, longestStreak, lastCompletionDate: today };
  }

  let newStreak;
  if (lastCompletionDate === yesterday) {
    newStreak = currentStreak + 1;
  } else {
    newStreak = 1;
  }

  const newLongest = Math.max(longestStreak, newStreak);

  return {
    currentStreak: newStreak,
    longestStreak: newLongest,
    lastCompletionDate: today,
  };
}

/**
 * Apply streak reset on app load if user missed a day
 */
export function applyStreakReset(state) {
  if (shouldResetStreak(state.lastCompletionDate)) {
    return { ...state, currentStreak: 0 };
  }
  return state;
}
