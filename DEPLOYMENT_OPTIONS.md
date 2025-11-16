# 🚀 Deployment Guide - Railway Backend

Your app uses **Railway** for the backend with JSON file storage!

---

## 📁 Project Structure:

```
health-tracker/
├── src/                 ← Frontend (React)
├── server/              ← Backend (Node.js + Express)
│   ├── index.js        ← API server
│   ├── data.json       ← Your data file
│   └── package.json
└── RAILWAY_DEPLOY.md   ← Deployment guide
```

---

## 🌐 Deployment Architecture:

```
┌─────────────────────┐
│   Frontend          │
│   (Vercel)          │
│   letsgrind.fun     │
└──────────┬──────────┘
           │ API calls
           ↓
┌─────────────────────┐
│   Backend           │
│   (Railway)         │
│   xxx.railway.app   │
│   ↕                 │
│   server/data.json  │
└─────────────────────┘
```

---

## ✅ What's Already Done:

✅ Frontend deployed on Vercel (letsgrind.fun)  
✅ Backend code ready in `/server` folder  
✅ API service configured  
✅ CORS enabled  
✅ Loading & status indicators added

---

## 🚂 Deploy Backend to Railway:

### Quick Steps:

1. **Go to Railway:** https://railway.app
2. **Login with GitHub**
3. **New Project** → Deploy from GitHub
4. **Select:** letsgrind repo
5. **Settings** → Root Directory → `/server`
6. **Copy Railway URL**
7. **Add to Vercel:** Environment Variable `VITE_API_URL`
8. **Redeploy Vercel**

**Full guide:** See `RAILWAY_DEPLOY.md`

---

## 🧪 Test Locally First:

Before deploying, test everything works:

### Start Backend:

```bash
cd server
npm run dev
```

### Start Frontend:

```bash
# In new terminal, from project root
npm run dev
```

### Open App:

```
http://localhost:5173
```

Should see: **🟢 Synced**

---

## 🔧 Environment Variables:

### Development (Local):

Already configured! Uses `http://localhost:3001/api`

### Production (Deployed):

Set in Vercel Dashboard:

```
VITE_API_URL=https://your-railway-url.up.railway.app/api
```

---

## 📊 Data Storage:

**File:** `server/data.json`  
**Location:** Railway server  
**Format:** JSON  
**Backup:** Use "📥 Export Data" button in app

---

## 🔄 Update Workflow:

### Update Frontend:

```bash
git add .
git commit -m "Update frontend"
git push
```

→ Vercel auto-deploys

### Update Backend:

```bash
git add .
git commit -m "Update backend"
git push
```

→ Railway auto-deploys

---

## 📱 Access from Anywhere:

Once deployed:

- **Anuradha:** Opens https://letsgrind.fun on her phone
- **Nitin:** Opens https://letsgrind.fun on his phone
- **Both see same data!**

---

## 💰 Cost:

### Frontend (Vercel):

- **Free** - Hobby plan
- Unlimited bandwidth for your usage

### Backend (Railway):

- **$5 free credits/month**
- Your usage: ~$0.50-1/month
- More than enough!

---

## 🆘 Support:

**Issues deploying?**

- Check `RAILWAY_DEPLOY.md` for step-by-step guide
- View Railway logs for errors
- Check browser console (F12)

**Data not syncing?**

- Check "🟢 Synced" indicator in app
- Verify `VITE_API_URL` is set in Vercel
- Test backend: `curl https://your-url/api/health`

---

## 🎯 Next Steps:

1. **Read:** `RAILWAY_DEPLOY.md` for detailed steps
2. **Deploy:** Backend to Railway
3. **Configure:** Environment variable in Vercel
4. **Test:** Open letsgrind.fun
5. **Use:** Start tracking!

---

## ✨ Features:

✅ **Real-time sync** - Changes save automatically  
✅ **Cross-device** - Access from any device  
✅ **Shared data** - Both users see same info  
✅ **Export/Import** - Backup your data anytime  
✅ **Offline indicator** - Know when synced  
✅ **Simple storage** - JSON file (not database)

---

**Ready to deploy? Follow `RAILWAY_DEPLOY.md`!** 🚂
