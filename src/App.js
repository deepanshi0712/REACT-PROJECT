import React, { useState, useMemo } from 'react';

import Navbar from './components/Navbar/Navbar';

import DashboardStats from './components/DashboardStats/DashboardStats';

import ProgressTracker from './components/ProgressTracker/ProgressTracker';

import RewardDashboard from './components/RewardDashboard/RewardDashboard';

import MotivationSection from './components/MotivationSection/MotivationSection';

import Achievements from './components/Achievements/Achievements';

import GoalForm from './components/GoalForm/GoalForm';

import GoalList from './components/GoalList/GoalList';

import SearchBar from './components/SearchBar/SearchBar';

import FilterBar from './components/FilterBar/FilterBar';

import EmptyState from './components/EmptyState/EmptyState';

import ConfirmationModal from './components/ConfirmationModal/ConfirmationModal';

import RecentActivity from './components/RecentActivity/RecentActivity';

import Footer from './components/Footer/Footer';

import { useGoals } from './hooks/useGoals';

import { useGamification } from './hooks/useGamification';

import { useDarkMode } from './hooks/useDarkMode';

import { useToast } from './hooks/useToast';

import {

  calculateStats,

  filterGoals,

  sortGoals,

} from './utils/helpers';

import { FILTER_OPTIONS, SORT_OPTIONS } from './utils/constants';

import './styles/App.css';



function App() {

  const { goals, activity, isLoaded, addGoal, updateGoal, deleteGoal, toggleComplete } =

    useGoals();

  const { stats, levelProgress, allBadges, isLoaded: gamificationLoaded, handleGoalCompleted } =

    useGamification();

  const { isDark, toggleDarkMode } = useDarkMode();

  const { toast, showToast } = useToast();



  const [searchQuery, setSearchQuery] = useState('');

  const [filter, setFilter] = useState(FILTER_OPTIONS.ALL);

  const [sortBy, setSortBy] = useState(SORT_OPTIONS.DEADLINE);

  const [editingGoal, setEditingGoal] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);



  const goalStats = useMemo(() => calculateStats(goals), [goals]);



  const displayedGoals = useMemo(() => {

    const filtered = filterGoals(goals, searchQuery, filter);

    return sortGoals(filtered, sortBy);

  }, [goals, searchQuery, filter, sortBy]);



  const hasActiveFilters =

    searchQuery.trim() !== '' || filter !== FILTER_OPTIONS.ALL;



  const handleFormSubmit = (formData) => {

    if (editingGoal) {

      updateGoal(editingGoal.id, formData);

      setEditingGoal(null);

      showToast('Goal updated successfully!', 'success');

    } else {

      addGoal(formData);

      showToast('Goal added successfully!', 'success');

    }

  };



  const handleEdit = (goal) => {

    setEditingGoal(goal);

    window.scrollTo({ top: 0, behavior: 'smooth' });

  };



  const handleCancelEdit = () => {

    setEditingGoal(null);

  };



  const handleDeleteRequest = (goal) => {

    setDeleteTarget(goal);

  };



  const handleDeleteConfirm = () => {

    if (deleteTarget) {

      deleteGoal(deleteTarget.id);

      if (editingGoal?.id === deleteTarget.id) {

        setEditingGoal(null);

      }

      showToast('Goal deleted.', 'info');

      setDeleteTarget(null);

    }

  };



  const handleDeleteCancel = () => {

    setDeleteTarget(null);

  };



  const handleToggleComplete = (id) => {

    const goal = goals.find((g) => g.id === id);

    toggleComplete(id);



    if (goal && !goal.completed) {

      const result = handleGoalCompleted(goal);



      if (result.xpEarned > 0) {

        let message = `Great job! +${result.xpEarned} XP earned!`;



        if (result.levelUp) {

          message += ` Level up to ${result.newLevel}!`;

        }



        if (result.newBadges.length > 0) {

          const badgeNames = result.newBadges.map((b) => b.title).join(', ');

          message += ` Badge unlocked: ${badgeNames}!`;

        }



        showToast(message, 'success');

      } else {

        showToast('Great job! Goal completed! 🎉', 'success');

      }

    }

  };



  if (!isLoaded || !gamificationLoaded) {

    return (

      <div className="loading-screen">

        <p>Loading GoalFlow...</p>

      </div>

    );

  }



  return (

    <div className="app">

      <Navbar isDark={isDark} onToggleDarkMode={toggleDarkMode} />



      <main className="main-content">

        <DashboardStats stats={goalStats} />

        <ProgressTracker percentage={goalStats.completionPercentage} />



        <RewardDashboard stats={stats} levelProgress={levelProgress} />

        <MotivationSection stats={stats} levelProgress={levelProgress} />



        <div className="controls-row">

          <SearchBar value={searchQuery} onChange={setSearchQuery} />

        </div>



        <FilterBar

          filter={filter}

          sortBy={sortBy}

          onFilterChange={setFilter}

          onSortChange={setSortBy}

        />



        <div className="content-grid">

          <div className="main-column">

            <GoalForm

              onSubmit={handleFormSubmit}

              editingGoal={editingGoal}

              onCancelEdit={handleCancelEdit}

            />



            {goals.length === 0 ? (

              <EmptyState hasFilters={false} />

            ) : (

              <GoalList

                goals={displayedGoals}

                onToggleComplete={handleToggleComplete}

                onEdit={handleEdit}

                onDelete={handleDeleteRequest}

                hasFilters={hasActiveFilters}

              />

            )}

          </div>



          <aside className="sidebar-column">

            <Achievements badges={allBadges} />

            <RecentActivity activities={activity} />

          </aside>

        </div>

      </main>



      <Footer />



      <ConfirmationModal

        isOpen={!!deleteTarget}

        title="Delete Goal"

        message={

          deleteTarget

            ? `Are you sure you want to delete "${deleteTarget.title}"? This action cannot be undone.`

            : ''

        }

        onConfirm={handleDeleteConfirm}

        onCancel={handleDeleteCancel}

      />



      {toast && (

        <div className={`toast toast-${toast.type}`} role="alert">

          {toast.message}

        </div>

      )}

    </div>

  );

}



export default App;

