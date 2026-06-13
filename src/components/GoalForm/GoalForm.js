import React, { useState, useEffect } from 'react';
import { PRIORITY } from '../../utils/constants';
import { validateGoalForm } from '../../utils/helpers';
import './GoalForm.css';

const EMPTY_FORM = {
  title: '',
  description: '',
  deadline: '',
  priority: PRIORITY.MEDIUM,
};

function GoalForm({ onSubmit, editingGoal, onCancelEdit }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingGoal) {
      setFormData({
        title: editingGoal.title,
        description: editingGoal.description || '',
        deadline: editingGoal.deadline,
        priority: editingGoal.priority,
      });
    } else {
      setFormData(EMPTY_FORM);
    }
    setErrors({});
  }, [editingGoal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateGoalForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
    if (!editingGoal) {
      setFormData(EMPTY_FORM);
    }
    setErrors({});
  };

  const handleCancel = () => {
    setFormData(EMPTY_FORM);
    setErrors({});
    onCancelEdit();
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section className="goal-form-section">
      <h2 className="section-heading">
        {editingGoal ? 'Edit Goal' : 'Add New Goal'}
      </h2>
      <form className="goal-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="title">Goal Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Finish project report"
            className={errors.title ? 'input-error' : ''}
          />
          {errors.title && <span className="error-msg">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add details about your goal..."
            rows={3}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="deadline">Deadline *</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              min={editingGoal ? undefined : today}
              className={errors.deadline ? 'input-error' : ''}
            />
            {errors.deadline && (
              <span className="error-msg">{errors.deadline}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority *</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className={errors.priority ? 'input-error' : ''}
            >
              <option value={PRIORITY.HIGH}>High</option>
              <option value={PRIORITY.MEDIUM}>Medium</option>
              <option value={PRIORITY.LOW}>Low</option>
            </select>
            {errors.priority && (
              <span className="error-msg">{errors.priority}</span>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingGoal ? 'Save Changes' : 'Add Goal'}
          </button>
          {editingGoal && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
