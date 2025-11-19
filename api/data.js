import { createClient } from 'redis';

const DATA_KEY = 'letsgrind:people';

// Create Redis client (will be connected in handler)
let redisClient = null;

async function getRedisClient() {
  if (!redisClient) {
    redisClient = createClient({
      url: process.env.REDIS_URL
    });
    await redisClient.connect();
  }
  return redisClient;
}

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
    const redis = await getRedisClient();

    if (req.method === 'GET') {
      // Fetch data from Redis
      const data = await redis.get(DATA_KEY);
      
      if (!data) {
        // Return empty array if no data exists yet
        res.status(200).json([]);
      } else {
        res.status(200).json(JSON.parse(data));
      }
    } else if (req.method === 'POST') {
      // Save data to Redis
      const data = req.body;
      
      if (!Array.isArray(data)) {
        res.status(400).json({ error: 'Data must be an array' });
        return;
      }

      await redis.set(DATA_KEY, JSON.stringify(data));
      console.log('✅ Data saved to Redis');
      
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
