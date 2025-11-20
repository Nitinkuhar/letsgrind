import { Person } from '../types';
import './ProgressGraph.css';

interface ProgressGraphProps {
  people: Person[];
}

// Helper function to format date with ordinal suffix
const formatDateWithOrdinal = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.getFullYear();
  
  // Get ordinal suffix (st, nd, rd, th)
  const getOrdinalSuffix = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };
  
  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
};

const ProgressGraph = ({ people }: ProgressGraphProps) => {
  const calculateProgress = (person: Person) => {
    const today = new Date();
    const startDate = new Date(person.startDate);
    const targetDate = new Date(person.targetEndDate);
    
    // Total journey
    const totalDays = Math.ceil((targetDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    // Weight progress
    const totalWeightToLose = person.startWeight - person.goalWeight;
    const weightLostSoFar = person.startWeight - person.currentWeight;
    const weightRemaining = person.currentWeight - person.goalWeight;
    
    // Expected progress (linear)
    const expectedProgress = Math.min((daysPassed / totalDays) * 100, 100);
    const expectedWeight = person.startWeight - (totalWeightToLose * (daysPassed / totalDays));
    
    // Actual progress
    const actualProgress = Math.min((weightLostSoFar / totalWeightToLose) * 100, 100);
    
    // Pace calculation
    const expectedWeightLoss = (totalWeightToLose / totalDays) * daysPassed;
    const pace = weightLostSoFar >= expectedWeightLoss ? 'On Track' : 'Behind';
    const paceColor = weightLostSoFar >= expectedWeightLoss ? '#4caf50' : '#ff9800';
    
    // Points calculation (25 points per activity, 4 activities per day = 100 max per day)
    const totalPossiblePoints = daysPassed * 100; // 100 points per day max
    const actualPoints = person.dailyActivities.reduce((total, day) => {
      return total + (day.completedActivities.length * 25); // 25 points per activity
    }, 0);
    const pointsPercentage = totalPossiblePoints > 0 ? (actualPoints / totalPossiblePoints) * 100 : 0;
    
    return {
      totalDays,
      daysPassed,
      daysRemaining,
      totalWeightToLose,
      weightLostSoFar,
      weightRemaining,
      expectedProgress,
      expectedWeight,
      actualProgress,
      pace,
      paceColor,
      totalPossiblePoints,
      actualPoints,
      pointsPercentage,
    };
  };

  return (
    <div className="progress-graph-container">
      <div className="progress-graph-header">
        <h2>📈 Progress Tracker</h2>
        <p>Expected vs Actual Journey</p>
        <span className="progress-note">Based on healthy weight loss: 0.8-1 kg/week</span>
      </div>

      <div className="people-progress-grid">
        {people.map(person => {
          const progress = calculateProgress(person);
          
          return (
            <div key={person.id} className="person-progress-card">
              {/* Header */}
              <div className="progress-card-header" style={{ borderBottomColor: person.color }}>
                <div className="progress-avatar" style={{ background: person.color }}>
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="progress-card-title">
                  <h3>{person.name}</h3>
                  <span className="progress-pace" style={{ color: progress.paceColor }}>
                    {progress.pace}
                  </span>
                </div>
                <div className="progress-journey-info">
                  <span className="journey-detail">
                    Started On: {formatDateWithOrdinal(person.startDate)}
                  </span>
                  <span className="journey-detail">
                    🎯 Goal: {person.startWeight} → {person.goalWeight} kg
                  </span>
                </div>
              </div>

              {/* Activity Points Badge */}
              <div className="points-badge" style={{ borderColor: person.color }}>
                <div className="points-icon">🏆</div>
                <div className="points-content">
                  <div className="points-label">Activity Score</div>
                  <div className="points-value" style={{ color: person.color }}>
                    {progress.actualPoints} / {progress.totalPossiblePoints}
                  </div>
                  <div className="points-percentage">
                    {Math.round(progress.pointsPercentage)}% completion
                  </div>
                </div>
              </div>

              {/* Visual Progress Bars */}
              <div className="progress-bars-section">
                <div className="progress-bar-item">
                  <div className="progress-bar-label">
                    <span>Expected Progress</span>
                    <span className="progress-bar-value">{Math.round(progress.expectedProgress)}%</span>
                  </div>
                  <div className="progress-bar-track">
                    <div 
                      className="progress-bar-fill expected" 
                      style={{ width: `${progress.expectedProgress}%`, background: 'linear-gradient(90deg, #e0e0e0 0%, #bdbdbd 100%)' }}
                    />
                  </div>
                </div>

                <div className="progress-bar-item">
                  <div className="progress-bar-label">
                    <span>Actual Progress</span>
                    <span className="progress-bar-value" style={{ color: person.color }}>
                      {Math.round(progress.actualProgress)}%
                    </span>
                  </div>
                  <div className="progress-bar-track">
                    <div 
                      className="progress-bar-fill actual" 
                      style={{ width: `${progress.actualProgress}%`, background: person.color }}
                    />
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="progress-stats-grid">
                <div className="progress-stat">
                  <span className="stat-icon">📅</span>
                  <div className="stat-content">
                    <span className="stat-label">Days Passed</span>
                    <span className="stat-value">{progress.daysPassed}</span>
                  </div>
                </div>

                <div className="progress-stat">
                  <span className="stat-icon">⏳</span>
                  <div className="stat-content">
                    <span className="stat-label">Days Remaining</span>
                    <span className="stat-value">{progress.daysRemaining > 0 ? progress.daysRemaining : 0}</span>
                  </div>
                </div>

                <div className="progress-stat">
                  <span className="stat-icon">⚖️</span>
                  <div className="stat-content">
                    <span className="stat-label">Weight Lost</span>
                    <span className="stat-value" style={{ color: person.color }}>
                      {progress.weightLostSoFar.toFixed(1)} kg
                    </span>
                  </div>
                </div>

                <div className="progress-stat">
                  <span className="stat-icon">🎯</span>
                  <div className="stat-content">
                    <span className="stat-label">Weight Remaining</span>
                    <span className="stat-value">
                      {progress.weightRemaining.toFixed(1)} kg
                    </span>
                  </div>
                </div>
              </div>

              {/* Weight Comparison */}
              <div className="weight-comparison">
                <div className="weight-item">
                  <span className="weight-label">📌 Today’s Expected Weight</span>
                  <span className="weight-value">{progress.expectedWeight.toFixed(1)} kg</span>
                </div>
                <div className="weight-divider">vs</div>
                <div className="weight-item">
                  <span className="weight-label">Today’s Actual Weight</span>
                  <span className="weight-value" style={{ color: person.color }}>
                    {person.currentWeight.toFixed(1)} kg
                  </span>
                </div>
              </div>

              {/* Target Date */}
              <div className="target-date-info">
                <span className="target-icon">🏁</span>
                <div className="target-text-group">
                  <span className="target-text">
                    Target: {new Date(person.targetEndDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                  <span className="target-duration">
                    {progress.totalDays} days ({Math.ceil(progress.totalDays / 7)} weeks) journey
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressGraph;

