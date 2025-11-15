import { useState } from 'react';
import { Person, Activity } from '../types';
import './DailyHistory.css';

interface DailyHistoryProps {
  people: Person[];
}

const DEFAULT_ACTIVITIES: Activity[] = [
  { id: 'healthy-food', name: 'Ate Healthy Food', points: 10, icon: '🥗' },
  { id: 'exercise', name: 'Did Exercise', points: 15, icon: '💪' },
  { id: 'water', name: 'Drank Water Properly', points: 10, icon: '💧' },
  { id: 'steps', name: 'Completed 10K Steps', points: 15, icon: '👟' },
];

const DailyHistory = ({ people }: DailyHistoryProps) => {
  const [daysToShow, setDaysToShow] = useState(14);

  const calculateDailyPoints = (person: Person, date: string) => {
    const dayActivities = person.dailyActivities.find(da => da.date === date);
    if (!dayActivities) return 0;

    const defaultPoints = dayActivities.completedActivities.reduce((sum, actId) => {
      const activity = DEFAULT_ACTIVITIES.find(a => a.id === actId);
      return sum + (activity?.points || 0);
    }, 0);

    const customPoints = dayActivities.customActivities.reduce((sum, ca) => sum + ca.points, 0);
    
    return defaultPoints + customPoints;
  };

  // Get last N days
  const getPastDays = (days: number) => {
    const dates = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const pastDays = getPastDays(daysToShow);

  const getDailyRankings = (date: string) => {
    return people
      .map(person => ({
        person,
        points: calculateDailyPoints(person, date),
      }))
      .sort((a, b) => b.points - a.points);
  };

  const getWinnerStats = () => {
    const stats: { [key: string]: number } = {};
    
    pastDays.forEach(date => {
      const rankings = getDailyRankings(date);
      if (rankings[0] && rankings[0].points > 0) {
        stats[rankings[0].person.name] = (stats[rankings[0].person.name] || 0) + 1;
      }
    });

    return Object.entries(stats).sort((a, b) => b[1] - a[1]);
  };

  const winnerStats = getWinnerStats();

  return (
    <div className="daily-history-container">
      <div className="daily-history-header">
        <h2>📊 Daily Champions Calendar</h2>
        <div className="days-selector">
          <button 
            className={daysToShow === 7 ? 'active' : ''} 
            onClick={() => setDaysToShow(7)}
          >
            7 Days
          </button>
          <button 
            className={daysToShow === 14 ? 'active' : ''} 
            onClick={() => setDaysToShow(14)}
          >
            14 Days
          </button>
          <button 
            className={daysToShow === 21 ? 'active' : ''} 
            onClick={() => setDaysToShow(21)}
          >
            21 Days
          </button>
        </div>
      </div>

      {winnerStats.length > 0 && (
        <div className="winner-summary">
          <h3>🏅 Most Wins</h3>
          <div className="winner-summary-list">
            {winnerStats.map(([name, wins], index) => {
              const person = people.find(p => p.name === name);
              return (
                <div key={name} className="winner-summary-item">
                  <span className="rank-number">{index + 1}</span>
                  <div 
                    className="winner-avatar-small" 
                    style={{ background: person?.color }}
                  >
                    {name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="winner-name">{name}</span>
                  <span className="win-count" style={{ color: person?.color }}>
                    {wins} {wins === 1 ? 'win' : 'wins'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="calendar-grid">
        {pastDays.map((date, index) => {
          const dateObj = new Date(date);
          const isToday = index === pastDays.length - 1;
          const rankings = getDailyRankings(date);
          const hasActivity = rankings.some(r => r.points > 0);
          
          return (
            <div key={date} className={`calendar-day ${isToday ? 'today' : ''} ${!hasActivity ? 'no-activity' : ''}`}>
              <div className="calendar-day-header">
                <span className="day-label">
                  {isToday ? '📍' : ''} {dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className="date-label">
                  {dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
              
              <div className="calendar-day-content">
                {hasActivity ? (
                  rankings
                    .filter(r => r.points > 0)
                    .map((ranking, rankIndex) => (
                      <div 
                        key={ranking.person.id} 
                        className={`rank-entry rank-${rankIndex + 1}`}
                        style={{ borderLeftColor: ranking.person.color }}
                      >
                        <div className="rank-position">
                          {rankIndex === 0 ? '🥇' : rankIndex === 1 ? '🥈' : rankIndex === 2 ? '🥉' : `#${rankIndex + 1}`}
                        </div>
                        <div 
                          className="rank-avatar" 
                          style={{ background: ranking.person.color }}
                        >
                          {ranking.person.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="rank-info">
                          <span className="rank-name">{ranking.person.name.split(' ')[0]}</span>
                          <span className="rank-points" style={{ color: ranking.person.color }}>
                            {ranking.points} pts
                          </span>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="no-activity-message">
                    <span>No activities</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyHistory;

