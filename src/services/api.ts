import { Person } from '../types';

// API URL configuration
// Production: Uses Vercel serverless functions at /api
// Development: Can use local dev server or Vercel dev
const API_URL = import.meta.env.VITE_API_URL || '/api';

export const api = {
  // Fetch all data from server
  async fetchData(): Promise<Person[]> {
    try {
      const response = await fetch(`${API_URL}/data`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('📥 Data fetched from server:', data);
      return data;
    } catch (error) {
      console.error('❌ Error fetching data:', error);
      throw error;
    }
  },

  // Save all data to server
  async saveData(data: Person[]): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to save data');
      }
      console.log('💾 Data saved to server');
    } catch (error) {
      console.error('❌ Error saving data:', error);
      throw error;
    }
  },

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  },
};

