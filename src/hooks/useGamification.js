import { useState, useEffect, useCallback, useRef } from 'react';
import {
  GAMIFICATION_KEY,
  DEFAULT_GAMIFICATION,
  BADGES,
} from '../utils/constants';
import {
  getXPReward,
  updateStreakOnCompletion,
  applyStreakReset,
  checkNewBadges,
  calculateLevel,
  getLevelProgress,
} from '../utils/gamification';

/**
 * Custom hook for gamification: XP, levels, streaks, and badges
 */
export function useGamification() {
  const [gamification, setGamification] = useState(DEFAULT_GAMIFICATION);
  const [isLoaded, setIsLoaded] = useState(false);
  const stateRef = useRef(DEFAULT_GAMIFICATION);

  // Keep ref in sync for synchronous reads
  useEffect(() => {
    stateRef.current = gamification;
  }, [gamification]);

  // Load gamification data from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(GAMIFICATION_KEY);
      if (stored) {
        const parsed = { ...DEFAULT_GAMIFICATION, ...JSON.parse(stored) };
        const withReset = applyStreakReset(parsed);
        setGamification(withReset);
        stateRef.current = withReset;
        if (withReset.currentStreak !== parsed.currentStreak) {
          localStorage.setItem(GAMIFICATION_KEY, JSON.stringify(withReset));
        }
      }
    } catch (error) {
      console.error('Failed to load gamification data:', error);
    }
    setIsLoaded(true);
  }, []);

  // Persist gamification data
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(GAMIFICATION_KEY, JSON.stringify(gamification));
    }
  }, [gamification, isLoaded]);

  const handleGoalCompleted = useCallback((goal) => {
    const prev = stateRef.current;
    let result = {
      xpEarned: 0,
      newBadges: [],
      levelUp: false,
      previousLevel: calculateLevel(prev.totalXP),
      newLevel: calculateLevel(prev.totalXP),
    };

    if (prev.goalsAwardedXP.includes(goal.id)) {
      const streakUpdate = updateStreakOnCompletion(
        prev.currentStreak,
        prev.longestStreak,
        prev.lastCompletionDate
      );
      const updated = { ...prev, ...streakUpdate };
      setGamification(updated);
      stateRef.current = updated;
      return result;
    }

    const xpEarned = getXPReward(goal.priority);
    const previousLevel = calculateLevel(prev.totalXP);
    const newTotalXP = prev.totalXP + xpEarned;
    const newLevel = calculateLevel(newTotalXP);

    const streakUpdate = updateStreakOnCompletion(
      prev.currentStreak,
      prev.longestStreak,
      prev.lastCompletionDate
    );

    const updatedStats = {
      totalXP: newTotalXP,
      currentStreak: streakUpdate.currentStreak,
      longestStreak: streakUpdate.longestStreak,
      totalGoalsCompleted: prev.totalGoalsCompleted + 1,
      earnedBadges: prev.earnedBadges,
    };

    const newBadges = checkNewBadges(updatedStats, prev.earnedBadges);
    const newBadgeIds = newBadges.map((b) => b.id);

    const updated = {
      ...prev,
      totalXP: newTotalXP,
      currentStreak: streakUpdate.currentStreak,
      longestStreak: streakUpdate.longestStreak,
      lastCompletionDate: streakUpdate.lastCompletionDate,
      totalGoalsCompleted: prev.totalGoalsCompleted + 1,
      earnedBadges: [...prev.earnedBadges, ...newBadgeIds],
      goalsAwardedXP: [...prev.goalsAwardedXP, goal.id],
    };

    setGamification(updated);
    stateRef.current = updated;

    result = {
      xpEarned,
      newBadges,
      levelUp: newLevel > previousLevel,
      previousLevel,
      newLevel,
    };

    return result;
  }, []);

  const levelProgress = getLevelProgress(gamification.totalXP);

  const stats = {
    totalXP: gamification.totalXP,
    currentStreak: gamification.currentStreak,
    longestStreak: gamification.longestStreak,
    totalGoalsCompleted: gamification.totalGoalsCompleted,
    earnedBadges: gamification.earnedBadges,
    level: levelProgress.level,
  };

  const allBadges = BADGES.map((badge) => ({
    ...badge,
    earned: gamification.earnedBadges.includes(badge.id),
  }));

  return {
    gamification,
    stats,
    levelProgress,
    allBadges,
    isLoaded,
    handleGoalCompleted,
  };
}
