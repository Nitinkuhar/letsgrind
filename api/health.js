// Health check endpoint
export default function handler(req, res) {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Vercel Serverless Function is running',
    timestamp: new Date().toISOString()
  });
}

