# Let's Grind Server

Simple Express.js backend for Let's Grind health tracker with JSON file storage.

## Setup

```bash
cd server
npm install
```

## Run Development Server

```bash
npm run dev
```

Server will start on http://localhost:3001

## API Endpoints

### GET /api/data

Fetch all health tracking data

### POST /api/data

Save health tracking data

### GET /api/health

Health check endpoint

## Data Storage

Data is stored in `server/data.json` file

## Deploy to Railway

1. Create account at https://railway.app
2. Connect your GitHub repo
3. Deploy the `/server` directory
4. Update `VITE_API_URL` in React app to your Railway URL
