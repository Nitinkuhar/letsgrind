import { kv } from '@vercel/kv';

const DATA_KEY = 'letsgrind:people';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      // Fetch data from Vercel KV
      const data = await kv.get(DATA_KEY);
      
      if (!data) {
        // Return empty array if no data exists yet
        res.status(200).json([]);
      } else {
        res.status(200).json(data);
      }
    } else if (req.method === 'POST') {
      // Save data to Vercel KV
      const data = req.body;
      
      if (!Array.isArray(data)) {
        res.status(400).json({ error: 'Data must be an array' });
        return;
      }

      await kv.set(DATA_KEY, data);
      console.log('✅ Data saved to Vercel KV');
      
      res.status(200).json({ 
        success: true, 
        message: 'Data saved successfully',
        count: data.length
      });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}

