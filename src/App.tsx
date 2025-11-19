import { useState, useEffect } from 'react';
import { Person } from './types';
import PersonCard from './components/PersonCard';
import ProgressGraph from './components/ProgressGraph';
import { api } from './services/api';
import './App.css';

// Auto-calculate target end date based on healthy weight loss rate (0.8-1kg per week)
const calculateTargetEndDate = (startDate: string, startWeight: number, goalWeight: number): string => {
  const weightToLose = startWeight - goalWeight;
  const avgWeeklyLoss = 0.9; // kg per week (average of 0.8-1kg)
  const weeksNeeded = Math.ceil(weightToLose / avgWeeklyLoss);
  const daysNeeded = weeksNeeded * 7;
  
  const start = new Date(startDate);
  const targetDate = new Date(start);
  targetDate.setDate(targetDate.getDate() + daysNeeded);
  
  return targetDate.toISOString().split('T')[0];
};

// Define start dates
const ANURADHA_START = '2025-11-17';
const NITIN_START = '2025-11-17';

const INITIAL_DATA: Person[] = [
  {
    id: '1',
    name: 'Anuradha',
    startWeight: 70,
    currentWeight: 70,
    goalWeight: 65,
    height: 165,
    age: 28,
    gender: 'female',
    startDate: ANURADHA_START,
    targetEndDate: calculateTargetEndDate(ANURADHA_START, 70, 65), // Auto: ~6 weeks (5kg ÷ 0.9)
    color: '#FF6B6B',
    dailyActivities: [],
    weightHistory: [
      { date: ANURADHA_START, weight: 70 }
    ],
  },
  {
    id: '2',
    name: 'Nitin Kuhar',
    startWeight: 100,
    currentWeight: 100,
    goalWeight: 89,
    height: 178,
    age: 27,
    gender: 'male',
    startDate: NITIN_START,
    targetEndDate: calculateTargetEndDate(NITIN_START, 100, 89), // Auto: ~13 weeks (11kg ÷ 0.9)
    color: '#4ECDC4',
    dailyActivities: [],
    weightHistory: [
      { date: NITIN_START, weight: 100 }
    ],
  },
];

function App() {
  const [people, setPeople] = useState<Person[]>(INITIAL_DATA);
  const [loading, setLoading] = useState(true);
  const [serverOnline, setServerOnline] = useState(false);

  // Load data from server on mount
  useEffect(() => {
    const loadDataFromServer = async () => {
      try {
        // Check if server is online
        const isOnline = await api.healthCheck();
        setServerOnline(isOnline);

        if (isOnline) {
          const data = await api.fetchData();
          if (data && data.length > 0) {
            setPeople(data);
            console.log('✅ Loaded data from server');
          } else {
            // If server is empty, initialize with INITIAL_DATA
            await api.saveData(INITIAL_DATA);
            setPeople(INITIAL_DATA);
            console.log('📝 Initialized server with default data');
          }
        } else {
          console.log('⚠️ Server offline, using initial data');
        }
      } catch (error) {
        console.error('❌ Error loading data:', error);
        console.log('⚠️ Using initial data');
      } finally {
        setLoading(false);
      }
    };

    loadDataFromServer();
  }, []);


  const handleUpdateActivities = async (personId: string, date: string, completedActivities: string[], weight?: number) => {
    const updatedPeople = people.map(p => {
      if (p.id !== personId) return p;

      const existingDayIndex = p.dailyActivities.findIndex(da => da.date === date);
      let updatedDailyActivities = [...p.dailyActivities];

      if (existingDayIndex >= 0) {
        updatedDailyActivities[existingDayIndex] = {
          date,
          completedActivities,
          weight,
        };
      } else {
        updatedDailyActivities.push({
          date,
          completedActivities,
          weight,
        });
      }

      // Update weight history if weight is provided
      let updatedWeightHistory = [...p.weightHistory];
      let updatedCurrentWeight = p.currentWeight;

      if (weight !== undefined && weight > 0) {
        const existingWeightIndex = updatedWeightHistory.findIndex(w => w.date === date);
        
        if (existingWeightIndex >= 0) {
          updatedWeightHistory[existingWeightIndex] = { date, weight };
        } else {
          updatedWeightHistory.push({ date, weight });
        }

        // Sort weight history by date (newest first)
        updatedWeightHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // Update current weight to the latest entry
        updatedCurrentWeight = updatedWeightHistory[0].weight;
      }

      return { 
        ...p, 
        dailyActivities: updatedDailyActivities,
        weightHistory: updatedWeightHistory,
        currentWeight: updatedCurrentWeight,
      };
    });

    // Update state
    setPeople(updatedPeople);

    // Save to server immediately after update
    if (serverOnline) {
      try {
        await api.saveData(updatedPeople);
        console.log('💾 Saved to server');
      } catch (error) {
        console.error('❌ Error saving to server:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading-screen">
          <div className="loader"></div>
          <p>Loading your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>💪 Let's Grind</h1>
        <p>Crush your goals together, one day at a time</p>
      </header>

      <div className="container">
        <div className="section-header">
          <h2>📋 Individual Trackers</h2>
        </div>
        
        <div className="cards-grid">
          {people.map(person => (
            <PersonCard
              key={person.id}
              person={person}
              onUpdateActivities={handleUpdateActivities}
            />
          ))}
        </div>

        {people.length > 0 && <ProgressGraph people={people} />}
      </div>
    </div>
  );
}

export default App;

