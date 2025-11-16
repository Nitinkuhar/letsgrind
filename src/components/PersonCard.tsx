import { useState, useEffect } from 'react';
import { Person, Activity } from '../types';
import './PersonCard.css';

interface PersonCardProps {
  person: Person;
  onUpdateActivities: (personId: string, date: string, completedActivities: string[], weight?: number) => void;
}

const DEFAULT_ACTIVITIES: Activity[] = [
  { id: 'healthy-food', name: 'Ate Healthy Food', points: 25, icon: '🥗' },
  { id: 'exercise', name: 'Did Exercise', points: 25, icon: '💪' },
  { id: 'water', name: 'Drank Water Properly', points: 25, icon: '💧' },
  { id: 'steps', name: 'Completed 10K Steps', points: 25, icon: '👟' },
];

const PersonCard = ({ person, onUpdateActivities }: PersonCardProps) => {
  const [showActivities, setShowActivities] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [dailyWeight, setDailyWeight] = useState('');

  // Local state for activities (not saved until Update button is clicked)
  const [localCompletedActivities, setLocalCompletedActivities] = useState<string[]>([]);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const totalLoss = person.startWeight - person.goalWeight;
  const currentLoss = person.startWeight - person.currentWeight;
  const progress = Math.min((currentLoss / totalLoss) * 100, 100);

  // Update local state when date changes
  const syncLocalStateWithDate = (date: string) => {
    const dayData = person.dailyActivities.find(da => da.date === date);
    setLocalCompletedActivities(dayData?.completedActivities || []);
  };

  // Initialize local state on mount and when person data changes
  useEffect(() => {
    syncLocalStateWithDate(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [person.dailyActivities, selectedDate]);

  // Update daily weight state when date changes
  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
    const dayData = person.dailyActivities.find(da => da.date === newDate);
    setDailyWeight(dayData?.weight?.toString() || '');
    syncLocalStateWithDate(newDate);
  };

  const calculateDailyPoints = () => {
    return localCompletedActivities.reduce((sum, actId) => {
      const activity = DEFAULT_ACTIVITIES.find(a => a.id === actId);
      return sum + (activity?.points || 0);
    }, 0);
  };

  const handleActivityToggle = (activityId: string) => {
    const isCompleted = localCompletedActivities.includes(activityId);
    if (isCompleted) {
      setLocalCompletedActivities(localCompletedActivities.filter(id => id !== activityId));
    } else {
      setLocalCompletedActivities([...localCompletedActivities, activityId]);
    }
  };

  const handleSaveDailyData = () => {
    if (!selectedDate) {
      alert('Please select a date to save daily data.');
      return;
    }

    // Validate weight is entered
    if (!dailyWeight || dailyWeight.trim() === '') {
      alert('⚖️ Weight is required! Please enter your weight for this day.');
      return;
    }

    const weight = parseFloat(dailyWeight);
    
    // Validate weight is a valid number
    if (isNaN(weight) || weight <= 0) {
      alert('⚖️ Please enter a valid weight (greater than 0).');
      return;
    }
    
    // Save all data (activities + weight)
    onUpdateActivities(
      person.id, 
      selectedDate, 
      localCompletedActivities, 
      weight
    );

    // Show success indicator
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 2000);

    // Clear the date and reset form after successful save
    setTimeout(() => {
      setSelectedDate('');
      setDailyWeight('');
      setLocalCompletedActivities([]);
    }, 2000);
  };

  const dailyPoints = calculateDailyPoints();

  return (
    <div className="person-card" style={{ borderColor: person.color }}>
      {/* Collapsed Header - Always Visible */}
      <div className="card-header-compact">
        <div className="compact-main-content">
          <div className="avatar" style={{ background: person.color }}>
            {person.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="compact-info">
            <h2>{person.name}</h2>
            <div className="compact-progress">
              <div className="compact-progress-bar" style={{ width: `${progress}%`, background: person.color }}>
                <span className="compact-progress-text">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Activities - Always Visible */}
      <div className="activities-section-always-visible">
        <button 
          className="toggle-activities-btn"
          onClick={() => setShowActivities(!showActivities)}
        >
          <span>Daily Activities</span>
          <span className="toggle-icon">{showActivities ? '▲' : '▼'}</span>
        </button>

        {showActivities && (
          <div className="activities-content">
            <div className="date-selector-only">
              <label htmlFor={`date-${person.id}`}>📅 Select Date:</label>
              <div 
                className="date-input-wrapper"
                onClick={() => {
                  const input = document.getElementById(`date-${person.id}`) as HTMLInputElement;
                  if (input) {
                    if (input.showPicker) {
                      input.showPicker();
                    } else {
                      input.click();
                      input.focus();
                    }
                  }
                }}
              >
                <div className={`date-placeholder ${!selectedDate ? 'empty' : ''}`}>
                  {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'short',
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  }) : 'Choose a date to track'}
                </div>
                <span className="calendar-icon">📅</span>
              </div>
              <input
                id={`date-${person.id}`}
                type="date"
                value={selectedDate}
                onChange={(e) => handleDateChange(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                min={person.startDate}
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
              />
            </div>

            {/* Show activities and weight ONLY after date is selected/confirmed */}
            {selectedDate && (
              <>
                {/* Weight Input for Selected Date */}
                <div className="weight-input-section">
                  <label htmlFor={`weight-${person.id}`}>
                    <span className="weight-icon">⚖️</span>
                    Weight for this day:
                    <span className="required-indicator">*</span>
                  </label>
                  <div className="weight-input-group">
                    <input
                      id={`weight-${person.id}`}
                      type="number"
                      value={dailyWeight}
                      onChange={(e) => setDailyWeight(e.target.value)}
                      placeholder={`e.g., ${person.currentWeight}`}
                      step="0.1"
                      min="1"
                      max="500"
                      required
                    />
                    <span className="weight-unit">kg</span>
                  </div>
                </div>

                <div className="activities-checklist">
                  {DEFAULT_ACTIVITIES.map(activity => {
                    const isCompleted = localCompletedActivities.includes(activity.id);
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

                {/* Update Button with Points */}
                <button
                  className="save-daily-data-btn"
                  onClick={handleSaveDailyData}
                  style={{ background: person.color }}
                >
                  {showSaveSuccess ? '✓ Saved!' : `💾 Update (${dailyPoints}/100)`}
                </button>

                {/* Success Message */}
                {showSaveSuccess && (
                  <div className="save-success-toast" style={{ borderColor: person.color }}>
                    ✓ Daily data saved successfully!
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default PersonCard;

