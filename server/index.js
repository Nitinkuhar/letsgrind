const express = require('express');
const cors = require('cors');
// const fs = require('fs').promises;
// const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

console.log('🚀 Starting BASIC TEST server...');
console.log('🌐 Port:', PORT);
console.log('📝 Only testing basic connectivity - no file operations');

// Middleware
app.use(cors());
app.use(express.json());

// ROOT ROUTE - Basic test
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Let's Grind Server</title></head>
      <body style="font-family: Arial; padding: 40px; text-align: center;">
        <h1>🎉 Welcome to Let's Grind Server!</h1>
        <p>✅ Server is running successfully on Railway</p>
        <p>🌐 Port: ${PORT}</p>
        <hr>
        <h3>Available Endpoints:</h3>
        <ul style="list-style: none;">
          <li>✅ <a href="/">GET /</a> - This page</li>
          <li>✅ <a href="/api/health">GET /api/health</a> - Health check</li>
        </ul>
      </body>
    </html>
  `);
  console.log('✅ Root route accessed');
});

// Health check
app.get('/api/health', (req, res) => {
  console.log('✅ Health check accessed');
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// COMMENTED OUT - File operations for later testing
/*
// Use persistent volume if available (Railway), otherwise use local file
const DATA_DIR = process.env.RAILWAY_VOLUME_MOUNT_PATH || __dirname;
const DATA_FILE = path.join(DATA_DIR, 'data.json');

// Initialize data file if it doesn't exist
async function initDataFile() {
  try {
    // Ensure the data directory exists
    await fs.mkdir(DATA_DIR, { recursive: true });
    console.log('✅ Data directory ready');
    
    // Check if data file exists
    await fs.access(DATA_FILE);
    console.log('✅ Data file exists');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('📝 Creating initial data file...');
      const initialData = [];
      await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2));
      console.log('✅ Data file created');
    } else {
      throw error;
    }
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
*/

// Start server
app.listen(PORT, () => {
  console.log(`✅ BASIC TEST Server running on http://localhost:${PORT}`);
  console.log(`🔗 Try: http://localhost:${PORT}/`);
  console.log(`🔗 Try: http://localhost:${PORT}/api/health`);
});

