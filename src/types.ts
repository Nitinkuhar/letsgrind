export interface Person {
  id: string;
  name: string;
  startWeight: number;
  currentWeight: number;
  goalWeight: number;
  startDate: string;
  targetEndDate: string; // Expected goal completion date
  avatar?: string;
  color: string;
  height: number; // in cm
  age: number;
  gender: 'male' | 'female' | 'other';
  dailyActivities: DailyActivity[];
  weightHistory: WeightEntry[];
}

export interface WeightEntry {
  date: string;
  weight: number;
}

export interface Activity {
  id: string;
  name: string;
  points: number;
  icon: string;
}

export interface DailyActivity {
  date: string; // YYYY-MM-DD format
  completedActivities: string[]; // Array of activity IDs
  weight?: number; // Optional weight entry for that day in kg
}

