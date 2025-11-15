import { Person } from '../types';
import './Leaderboard.css';

interface LeaderboardProps {
  people: Person[];
}

const Leaderboard = ({ people }: LeaderboardProps) => {
  // Calculate progress for each person and sort
  const leaderboardData = people
    .map(person => {
      const totalLoss = person.startWeight - person.goalWeight;
      const currentLoss = person.startWeight - person.currentWeight;
      const progress = Math.min((currentLoss / totalLoss) * 100, 100);
      const weightLost = currentLoss;
      
      return {
        ...person,
        progress,
        weightLost,
      };
    })
    .sort((a, b) => b.progress - a.progress); // Sort by progress descending

  const getMedal = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  const getMotivationalMessage = (progress: number) => {
    if (progress >= 100) return '🎉 Goal Achieved!';
    if (progress >= 75) return '🔥 Almost There!';
    if (progress >= 50) return '💪 Halfway Champion!';
    if (progress >= 25) return '⭐ Great Start!';
    return '🚀 Keep Going!';
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h2>🏆 Leaderboard</h2>
        <p>Who's crushing their goals?</p>
      </div>
      
      <div className="leaderboard-list">
        {leaderboardData.map((person, index) => (
          <div 
            key={person.id} 
            className={`leaderboard-item ${index === 0 ? 'leader' : ''}`}
            style={{ 
              borderLeftColor: person.color,
              animation: `slideIn 0.5s ease ${index * 0.1}s both`
            }}
          >
            <div className="rank-badge" style={{ background: person.color }}>
              {getMedal(index)}
            </div>
            
            <div className="leaderboard-info">
              <div className="leaderboard-name-row">
                <h3>{person.name}</h3>
                <span className="motivational-badge">
                  {getMotivationalMessage(person.progress)}
                </span>
              </div>
              
              <div className="leaderboard-stats">
                <div className="stat-chip">
                  <span className="stat-label">Progress:</span>
                  <span className="stat-value" style={{ color: person.color }}>
                    {person.progress.toFixed(1)}%
                  </span>
                </div>
                <div className="stat-chip">
                  <span className="stat-label">Lost:</span>
                  <span className="stat-value">{person.weightLost.toFixed(1)} kg</span>
                </div>
                <div className="stat-chip">
                  <span className="stat-label">To Go:</span>
                  <span className="stat-value">
                    {Math.max(person.currentWeight - person.goalWeight, 0).toFixed(1)} kg
                  </span>
                </div>
              </div>
              
              <div className="mini-progress-bar">
                <div 
                  className="mini-progress-fill" 
                  style={{ 
                    width: `${person.progress}%`,
                    background: person.color 
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;

