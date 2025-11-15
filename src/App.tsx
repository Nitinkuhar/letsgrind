import { useState } from 'react';
import { Person, CustomActivity } from './types';
import PersonCard from './components/PersonCard';
import AddPersonModal from './components/AddPersonModal';
import Leaderboard from './components/Leaderboard';
import DailyHistory from './components/DailyHistory';
import './App.css';

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
    startDate: '2024-09-01',
    color: '#FF6B6B',
    dailyActivities: [],
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
    startDate: '2024-08-15',
    color: '#4ECDC4',
    dailyActivities: [],
  },
];

function App() {
  const [people, setPeople] = useState<Person[]>(INITIAL_DATA);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddPerson = (person: Person) => {
    setPeople([...people, person]);
    setShowAddModal(false);
  };

  const handleUpdateWeight = (id: string, newWeight: number) => {
    setPeople(people.map(p => 
      p.id === id ? { ...p, currentWeight: newWeight } : p
    ));
  };

  const handleDeletePerson = (id: string) => {
    setPeople(people.filter(p => p.id !== id));
  };

  const handleUpdateActivities = (personId: string, date: string, completedActivities: string[], customActivities: CustomActivity[]) => {
    setPeople(people.map(p => {
      if (p.id !== personId) return p;

      const existingDayIndex = p.dailyActivities.findIndex(da => da.date === date);
      let updatedDailyActivities = [...p.dailyActivities];

      if (existingDayIndex >= 0) {
        updatedDailyActivities[existingDayIndex] = {
          date,
          completedActivities,
          customActivities,
        };
      } else {
        updatedDailyActivities.push({
          date,
          completedActivities,
          customActivities,
        });
      }

      return { ...p, dailyActivities: updatedDailyActivities };
    }));
  };

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
              onUpdateWeight={handleUpdateWeight}
              onDelete={handleDeletePerson}
              onUpdateActivities={handleUpdateActivities}
            />
          ))}
          
          <button 
            className="add-person-card"
            onClick={() => setShowAddModal(true)}
          >
            <span className="plus-icon">+</span>
            <span>Add Person</span>
          </button>
        </div>

        {people.length > 0 && (
          <>
            <DailyHistory people={people} />
            <Leaderboard people={people} />
          </>
        )}
      </div>

      {showAddModal && (
        <AddPersonModal
          onAdd={handleAddPerson}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}

export default App;

