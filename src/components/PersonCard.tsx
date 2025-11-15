import { useState } from 'react';
import { Person, Activity, CustomActivity } from '../types';
import './PersonCard.css';

interface PersonCardProps {
  person: Person;
  onUpdateWeight: (id: string, newWeight: number) => void;
  onDelete: (id: string) => void;
  onUpdateActivities: (personId: string, date: string, completedActivities: string[], customActivities: CustomActivity[]) => void;
}

const DEFAULT_ACTIVITIES: Activity[] = [
  { id: 'healthy-food', name: 'Ate Healthy Food', points: 10, icon: '🥗' },
  { id: 'exercise', name: 'Did Exercise', points: 15, icon: '💪' },
  { id: 'water', name: 'Drank Water Properly', points: 10, icon: '💧' },
  { id: 'steps', name: 'Completed 10K Steps', points: 15, icon: '👟' },
];

const PersonCard = ({ person, onUpdateWeight, onDelete, onUpdateActivities }: PersonCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newWeight, setNewWeight] = useState(person.currentWeight.toString());
  const [showActivities, setShowActivities] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customActivityName, setCustomActivityName] = useState('');
  const [customActivityPoints, setCustomActivityPoints] = useState('5');

  const totalLoss = person.startWeight - person.goalWeight;
  const currentLoss = person.startWeight - person.currentWeight;
  const progress = Math.min((currentLoss / totalLoss) * 100, 100);
  const remaining = Math.max(person.currentWeight - person.goalWeight, 0);
  
  // Calculate BMI: weight (kg) / (height (m))^2
  const heightInMeters = person.height / 100;
  const bmi = person.currentWeight / (heightInMeters * heightInMeters);
  
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { text: 'Underweight', color: '#3498db' };
    if (bmi < 25) return { text: 'Normal', color: '#2ecc71' };
    if (bmi < 30) return { text: 'Overweight', color: '#f39c12' };
    return { text: 'Obese', color: '#e74c3c' };
  };
  
  const bmiCategory = getBMICategory(bmi);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const weight = parseFloat(newWeight);
    if (!isNaN(weight) && weight > 0) {
      onUpdateWeight(person.id, weight);
      setIsEditing(false);
    }
  };

  const getActivitiesForDate = (date: string) => {
    return person.dailyActivities.find(da => da.date === date) || {
      date,
      completedActivities: [],
      customActivities: [],
    };
  };

  const calculateDailyPoints = (date: string) => {
    const dayActivities = getActivitiesForDate(date);
    
    const defaultPoints = dayActivities.completedActivities.reduce((sum, actId) => {
      const activity = DEFAULT_ACTIVITIES.find(a => a.id === actId);
      return sum + (activity?.points || 0);
    }, 0);

    const customPoints = dayActivities.customActivities.reduce((sum, ca) => sum + ca.points, 0);
    
    return defaultPoints + customPoints;
  };

  const handleActivityToggle = (activityId: string) => {
    const dayActivities = getActivitiesForDate(selectedDate);
    const completed = dayActivities.completedActivities.includes(activityId)
      ? dayActivities.completedActivities.filter(id => id !== activityId)
      : [...dayActivities.completedActivities, activityId];

    onUpdateActivities(person.id, selectedDate, completed, dayActivities.customActivities);
  };

  const handleAddCustomActivity = () => {
    if (!customActivityName.trim()) return;

    const dayActivities = getActivitiesForDate(selectedDate);
    const newCustomActivity: CustomActivity = {
      id: Date.now().toString(),
      name: customActivityName,
      points: parseInt(customActivityPoints) || 5,
    };

    onUpdateActivities(
      person.id,
      selectedDate,
      dayActivities.completedActivities,
      [...dayActivities.customActivities, newCustomActivity]
    );

    setCustomActivityName('');
    setCustomActivityPoints('5');
    setShowCustomModal(false);
  };

  const handleRemoveCustomActivity = (customActivityId: string) => {
    const dayActivities = getActivitiesForDate(selectedDate);
    const updatedCustomActivities = dayActivities.customActivities.filter(
      ca => ca.id !== customActivityId
    );

    onUpdateActivities(person.id, selectedDate, dayActivities.completedActivities, updatedCustomActivities);
  };

  const dayActivities = getActivitiesForDate(selectedDate);
  const dailyPoints = calculateDailyPoints(selectedDate);

  return (
    <div className="person-card" style={{ borderColor: person.color }}>
      <div className="card-header">
        <div className="avatar" style={{ background: person.color }}>
          {person.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="person-info">
          <h2>{person.name}</h2>
          <p className="start-date">Started {new Date(person.startDate).toLocaleDateString()}</p>
        </div>
        <button 
          className="delete-btn"
          onClick={() => onDelete(person.id)}
          title="Delete person"
        >
          ×
        </button>
      </div>

      <div className="person-details">
        <div className="detail-item">
          <span className="detail-icon">👤</span>
          <span className="detail-text">{person.age} years • {person.gender.charAt(0).toUpperCase() + person.gender.slice(1)}</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">📏</span>
          <span className="detail-text">{person.height} cm</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">📊</span>
          <span className="detail-text">
            BMI: <strong style={{ color: bmiCategory.color }}>{bmi.toFixed(1)}</strong> ({bmiCategory.text})
          </span>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ 
              width: `${progress}%`,
              background: person.color 
            }}
          >
            <span className="progress-text">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat">
          <span className="stat-label">Start</span>
          <span className="stat-value">{person.startWeight} kg</span>
        </div>
        <div className="stat current">
          <span className="stat-label">Current</span>
          {isEditing ? (
            <form onSubmit={handleSubmit} className="weight-form">
              <input
                type="number"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                step="0.1"
                autoFocus
                className="weight-input"
              />
              <button type="submit" className="save-btn">✓</button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => {
                  setIsEditing(false);
                  setNewWeight(person.currentWeight.toString());
                }}
              >
                ×
              </button>
            </form>
          ) : (
            <span 
              className="stat-value editable"
              onClick={() => setIsEditing(true)}
              title="Click to edit"
            >
              {person.currentWeight} kg ✏️
            </span>
          )}
        </div>
        <div className="stat">
          <span className="stat-label">Goal</span>
          <span className="stat-value">{person.goalWeight} kg</span>
        </div>
      </div>

      <div className="summary">
        <div className="summary-item">
          <span className="summary-label">Lost</span>
          <span className="summary-value" style={{ color: person.color }}>
            {currentLoss.toFixed(1)} kg
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Remaining</span>
          <span className="summary-value">
            {remaining.toFixed(1)} kg
          </span>
        </div>
      </div>

      {progress >= 100 && (
        <div className="achievement">
          🎉 Goal Achieved! 🎉
        </div>
      )}

      <div className="activities-section">
        <button 
          className="toggle-activities-btn"
          onClick={() => setShowActivities(!showActivities)}
        >
          <span>📅 Daily Activities</span>
          <span className="toggle-icon">{showActivities ? '▲' : '▼'}</span>
        </button>

        {showActivities && (
          <div className="activities-content">
            <div className="date-selector">
              <label htmlFor={`date-${person.id}`}>Select Date:</label>
              <input
                id={`date-${person.id}`}
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                min={person.startDate}
              />
              <span className="daily-points-badge" style={{ background: person.color }}>
                ⭐ {dailyPoints} pts
              </span>
            </div>

            <div className="activities-checklist">
              {DEFAULT_ACTIVITIES.map(activity => {
                const isCompleted = dayActivities.completedActivities.includes(activity.id);
                return (
                  <label key={activity.id} className={`activity-checkbox ${isCompleted ? 'checked' : ''}`}>
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={() => handleActivityToggle(activity.id)}
                    />
                    <span className="activity-icon">{activity.icon}</span>
                    <span className="activity-name">{activity.name}</span>
                    <span className="activity-points">+{activity.points}</span>
                  </label>
                );
              })}
            </div>

            {dayActivities.customActivities.length > 0 && (
              <div className="custom-activities">
                <h4>Extra Activities</h4>
                {dayActivities.customActivities.map(ca => (
                  <div key={ca.id} className="custom-activity-row">
                    <span className="activity-icon">✨</span>
                    <span className="activity-name">{ca.name}</span>
                    <span className="activity-points">+{ca.points}</span>
                    <button
                      className="remove-activity-btn"
                      onClick={() => handleRemoveCustomActivity(ca.id)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              className="add-custom-activity-btn"
              onClick={() => setShowCustomModal(true)}
            >
              + Add Extra Activity
            </button>
          </div>
        )}
      </div>

      {showCustomModal && (
        <div className="modal-overlay" onClick={() => setShowCustomModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add Extra Activity</h3>
            
            <div className="form-group">
              <label>Activity Name</label>
              <input
                type="text"
                value={customActivityName}
                onChange={(e) => setCustomActivityName(e.target.value)}
                placeholder="e.g., Yoga, Meditation"
              />
            </div>

            <div className="form-group">
              <label>Points (1-20)</label>
              <input
                type="number"
                value={customActivityPoints}
                onChange={(e) => setCustomActivityPoints(e.target.value)}
                min="1"
                max="20"
              />
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowCustomModal(false)}>
                Cancel
              </button>
              <button className="btn-submit" onClick={handleAddCustomActivity}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonCard;

