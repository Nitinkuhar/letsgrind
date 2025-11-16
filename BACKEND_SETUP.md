# 🚀 Backend Setup Guide

Your app now has a simple Node.js backend with JSON file storage!

## 📁 What Was Added

```
health-tracker/
├── server/
│   ├── index.js          ← Express server
│   ├── package.json      ← Server dependencies  
│   ├── data.json         ← Your data file (auto-created)
│   └── README.md
└── src/
    └── services/
        └── api.ts        ← API service (frontend)
```

## 🏃 Quick Start

### Step 1: Start the Backend Server

```bash
cd server
npm run dev
```

Server runs on: **http://localhost:3001**

###Step 2: Start the Frontend (in new terminal)

```bash
# From project root
npm run dev
```

Frontend runs on: **http://localhost:5173**

## ✅ How It Works

### When Anuradha Uses Her Phone:
```
Anuradha's Phone
     ↓ (saves data)
  Server
  data.json ← Shared file
     ↑ (reads data)
Nitin's Phone
```

**Both see the same data in real-time!**

## 🌐 Make It Accessible

### Option 1: Same WiFi (Easiest)
1. Get your computer's local IP: `192.168.x.x`
2. On phones, go to: `http://192.168.x.x:5173`
3. Both can access together!

### Option 2: Deploy Online (Best)

**Backend → Railway.app (Free)**
```bash
# 1. Push to GitHub
# 2. Go to https://railway.app
# 3. Create new project from GitHub
# 4. Select /server directory
# 5. Deploy!
```

**Frontend → Vercel (Free)**
```bash
# Already done! Just update API URL
```

## 🔧 Configuration

Create `.env` file in project root:

```env
VITE_API_URL=http://localhost:3001/api
```

For production:
```env
VITE_API_URL=https://your-railway-url.up.railway.app/api
```

## 📊 Data Storage

Data is stored in `server/data.json`:
```json
[
  {
    "id": "1",
    "name": "Anuradha",
    "currentWeight": 68.5,
    "dailyActivities": [...],
    ...
  },
  {
    "id": "2", 
    "name": "Nitin Kuhar",
    ...
  }
]
```

## ✨ Features

✅ **Auto-sync**: Changes save automatically  
✅ **Real-time**: Both see updates instantly  
✅ **Offline support**: Falls back if server down  
✅ **Simple**: Just a JSON file, no database  
✅ **Free**: Host on Railway for free  

## 🧪 Test It

1. Open app on your phone
2. Add weight and activities
3. Open on Nitin's phone
4. See the same data! 🎉

## 🚀 Deploy to Production

See RAILWAY_DEPLOY.md for detailed deployment guide.

## 🆘 Troubleshooting

**"Server offline" message?**
- Make sure backend is running: `cd server && npm run dev`
- Check firewall allows port 3001

**Can't connect from phone?**
- Use your local IP, not `localhost`
- Disable VPN if active
- Check same WiFi network

**Data not saving?**
- Check Console for errors (F12)
- Verify `server/data.json` exists
- Check server logs in terminal

