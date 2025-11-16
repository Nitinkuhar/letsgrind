const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'data.json');

console.log('🚀 Starting server...');
console.log('📁 Data file:', DATA_FILE);
console.log('🌐 Port:', PORT);

// Middleware
app.use(cors());
app.use(express.json());

// Initialize data file if it doesn't exist
async function initDataFile() {
  try {
    await fs.access(DATA_FILE);
    console.log('✅ Data file exists');
  } catch {
    console.log('📝 Creating initial data file...');
    const initialData = [];
    await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2));
    console.log('✅ Data file created');
  }
}

// GET - Fetch all data
app.get('/api/data', async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    console.log('📥 Data fetched');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('❌ Error reading data:', error);
    res.status(500).json({ error: 'Failed to read data' });
  }
});

// POST - Save all data
app.post('/api/data', async (req, res) => {
  try {
    const data = req.body;
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    console.log('💾 Data saved to file');
    res.json({ success: true, message: 'Data saved successfully' });
  } catch (error) {
    console.error('❌ Error saving data:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
async function startServer() {
  await initDataFile();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Data stored in: ${DATA_FILE}`);
  });
}

startServer();

