import { useState, useEffect, useCallback } from 'react';
import { STORAGE_KEY, SAMPLE_GOALS, ACTIVITY_KEY } from '../utils/constants';
import { generateId } from '../utils/helpers';

function getPastDate(daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
}

/**
 * Custom hook for managing goals with localStorage persistence
 */
export function useGoals() {
  const [goals, setGoals] = useState([]);
  const [activity, setActivity] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load goals and activity from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setGoals(JSON.parse(stored));
      } else {
        setGoals(SAMPLE_GOALS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_GOALS));

        const initialActivity = [
          {
            id: 'activity-1',
            message: 'Welcome to GoalFlow! Sample goals loaded.',
            timestamp: new Date().toISOString(),
          },
          {
            id: 'activity-2',
            message: 'Completed goal: "Morning Walk Routine"',
            timestamp: getPastDate(1),
          },
        ];
        setActivity(initialActivity);
        localStorage.setItem(ACTIVITY_KEY, JSON.stringify(initialActivity));
      }

      const storedActivity = localStorage.getItem(ACTIVITY_KEY);
      if (storedActivity) {
        setActivity(JSON.parse(storedActivity));
      }
    } catch (error) {
      console.error('Failed to load goals:', error);
      setGoals(SAMPLE_GOALS);
    }
    setIsLoaded(true);
  }, []);

  // Save goals whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    }
  }, [goals, isLoaded]);

  const addActivity = useCallback((message) => {
    const entry = {
      id: generateId(),
      message,
      timestamp: new Date().toISOString(),
    };
    setActivity((prev) => {
      const updated = [entry, ...prev].slice(0, 10);
      localStorage.setItem(ACTIVITY_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addGoal = useCallback(
    (goalData) => {
      const newGoal = {
        id: generateId(),
        title: goalData.title.trim(),
        description: goalData.description.trim(),
        deadline: goalData.deadline,
        priority: goalData.priority,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setGoals((prev) => [newGoal, ...prev]);
      addActivity(`Added goal: "${newGoal.title}"`);
      return newGoal;
    },
    [addActivity]
  );

  const updateGoal = useCallback(
    (id, goalData) => {
      setGoals((prev) =>
        prev.map((goal) =>
          goal.id === id
            ? {
                ...goal,
                title: goalData.title.trim(),
                description: goalData.description.trim(),
                deadline: goalData.deadline,
                priority: goalData.priority,
              }
            : goal
        )
      );
      addActivity(`Updated goal: "${goalData.title.trim()}"`);
    },
    [addActivity]
  );

  const deleteGoal = useCallback(
    (id) => {
      setGoals((prev) => {
        const goal = prev.find((g) => g.id === id);
        if (goal) {
          addActivity(`Deleted goal: "${goal.title}"`);
        }
        return prev.filter((g) => g.id !== id);
      });
    },
    [addActivity]
  );

  const toggleComplete = useCallback(
    (id) => {
      setGoals((prev) =>
        prev.map((goal) => {
          if (goal.id === id) {
            const updated = { ...goal, completed: !goal.completed };
            addActivity(
              updated.completed
                ? `Completed goal: "${goal.title}"`
                : `Marked incomplete: "${goal.title}"`
            );
            return updated;
          }
          return goal;
        })
      );
    },
    [addActivity]
  );

  return {
    goals,
    activity,
    isLoaded,
    addGoal,
    updateGoal,
    deleteGoal,
    toggleComplete,
  };
}
