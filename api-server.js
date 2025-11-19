const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

console.log('🚀 Starting BASIC TEST server...');
console.log('🌐 Port:', PORT);
console.log('📝 Testing Railway deployment');

// Middleware
app.use(cors());
app.use(express.json());

// ROOT ROUTE - Basic test
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Let's Grind Server</title></head>
      <body style="font-family: Arial; padding: 40px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
        <h1>🎉 Welcome to Let's Grind Server!</h1>
        <p style="font-size: 1.2em;">✅ Server is running successfully on Railway</p>
        <p>🌐 Port: ${PORT}</p>
        <p>⏰ Server Time: ${new Date().toISOString()}</p>
        <hr style="border-color: rgba(255,255,255,0.3); margin: 30px 0;">
        <h3>Available Endpoints:</h3>
        <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; max-width: 400px; margin: 20px auto;">
          <p>✅ <a href="/" style="color: #ffd700;">GET /</a> - This page</p>
          <p>✅ <a href="/api/health" style="color: #ffd700;">GET /api/health</a> - Health check</p>
        </div>
        <p style="margin-top: 30px; opacity: 0.8;">🚀 Deployed via Railway</p>
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
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0-test'
  });
});

// Catch all for debugging
app.use('*', (req, res) => {
  console.log(`❓ Unknown route accessed: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    error: 'Not Found',
    path: req.originalUrl,
    availableRoutes: ['GET /', 'GET /api/health']
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
  console.log(`🔗 Try: http://localhost:${PORT}/`);
  console.log(`🔗 Try: http://localhost:${PORT}/api/health`);
  console.log(`📝 Ready for Railway deployment!`);
});

