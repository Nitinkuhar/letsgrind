import { useState } from 'react';
import { Person } from '../types';
import './AddPersonModal.css';

interface AddPersonModalProps {
  onAdd: (person: Person) => void;
  onClose: () => void;
}

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#95E1D3', '#FFE66D', 
  '#A8E6CF', '#FF8B94', '#C7CEEA', '#FFDAC1'
];

const AddPersonModal = ({ onAdd, onClose }: AddPersonModalProps) => {
  const [name, setName] = useState('');
  const [startWeight, setStartWeight] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !startWeight || !currentWeight || !goalWeight || !height || !age) {
      alert('Please fill in all fields');
      return;
    }

    const newPerson: Person = {
      id: Date.now().toString(),
      name,
      startWeight: parseFloat(startWeight),
      currentWeight: parseFloat(currentWeight),
      goalWeight: parseFloat(goalWeight),
      height: parseFloat(height),
      age: parseInt(age),
      gender,
      startDate,
      color: selectedColor,
      dailyActivities: [],
    };

    onAdd(newPerson);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Add New Person</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="startWeight">Starting Weight (kg)</label>
            <input
              id="startWeight"
              type="number"
              value={startWeight}
              onChange={(e) => setStartWeight(e.target.value)}
              placeholder="e.g., 82"
              step="0.1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="currentWeight">Current Weight (kg)</label>
            <input
              id="currentWeight"
              type="number"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
              placeholder="e.g., 79"
              step="0.1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="goalWeight">Goal Weight (kg)</label>
            <input
              id="goalWeight"
              type="number"
              value={goalWeight}
              onChange={(e) => setGoalWeight(e.target.value)}
              placeholder="e.g., 68"
              step="0.1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="height">Height (cm)</label>
            <input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g., 170"
              step="0.1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g., 30"
              min="1"
              max="120"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value as 'male' | 'female' | 'other')}
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Choose Color</label>
            <div className="color-picker">
              {COLORS.map(color => (
                <button
                  key={color}
                  type="button"
                  className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                  style={{ background: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Add Person
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPersonModal;

