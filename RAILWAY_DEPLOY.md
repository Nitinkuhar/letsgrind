# 🚂 Deploy Backend to Railway - Step by Step

Simple 5-minute guide to deploy your backend!

---

## 🎯 What You're Deploying:

```
Frontend (Vercel)           Backend (Railway)
letsgrind.fun    ←→    xxx.up.railway.app
                       ↕
                   server/data.json
```

---

## 📝 Step-by-Step Guide:

### Step 1: Create Railway Account

1. Go to https://railway.app
2. Click "Login"
3. Choose "Login with GitHub"
4. Authorize Railway

✅ Done!

---

### Step 2: Create New Project

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Find and select: **letsgrind**
4. Click on the deployed service

✅ Project created!

---

### Step 3: Configure Root Directory

**Important:** Tell Railway to use the `/server` folder

1. Click "Settings" tab
2. Scroll to "Root Directory"
3. Enter: `/server`
4. Click "Update"

Railway will redeploy automatically!

✅ Backend deploying!

---

### Step 4: Get Your Railway URL

1. Go to "Settings" tab
2. Find "Domains" section
3. Click "Generate Domain"
4. Copy the URL (looks like: `https://letsgrind-production-xxxx.up.railway.app`)

✅ URL copied!

---

### Step 5: Update Frontend to Use Railway URL

**In Vercel Dashboard:**

1. Go to https://vercel.com/dashboard
2. Select your project: **letsgrind**
3. Go to "Settings" → "Environment Variables"
4. Click "Add New"
5. Set:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-railway-url.up.railway.app/api` (paste your Railway URL + /api)
6. Click "Save"

✅ Environment variable added!

---

### Step 6: Redeploy Frontend

In Vercel:

1. Go to "Deployments" tab
2. Click "..." on latest deployment
3. Click "Redeploy"
4. Check "Use existing Build Cache" → Redeploy

Or just push to GitHub:

```bash
git commit --allow-empty -m "Trigger Vercel redeploy"
git push
```

✅ Frontend redeployed!

---

### Step 7: Test Your Setup! 🧪

**Test Backend:**

```bash
# Replace with your Railway URL
curl https://your-railway-url.up.railway.app/api/health
```

Should see:

```json
{ "status": "ok", "message": "Server is running" }
```

**Test Frontend:**

1. Open https://letsgrind.fun
2. Look at header - should see: **🟢 Synced**
3. Add weight and activities
4. Refresh page - data should persist!

✅ Everything working!

---

## 🎉 You're Done!

Your app is now fully deployed:

✅ **Frontend:** https://letsgrind.fun (Vercel)  
✅ **Backend:** https://xxx.up.railway.app (Railway)  
✅ **Data:** Stored in `server/data.json` on Railway

---

## 🔍 Useful Railway Commands:

### View Logs

1. Railway Dashboard → Your project
2. Click "Logs" tab
3. See real-time logs

### View Data File

Can't view directly, but can:

1. Export via app (📥 Export Data button)
2. Check logs for saved data messages

### Restart Server

1. Settings → "Restart"
2. Or redeploy by pushing to GitHub

---

## 📱 Access from Phones:

Both Anuradha and Nitin can now:

1. Open: https://letsgrind.fun
2. Add their daily data
3. See each other's progress!

**Data syncs in real-time!** 🎉

---

## 🆘 Troubleshooting:

### "Server offline" in app?

**Check Railway is running:**

1. Railway Dashboard → Check if service is "Active"
2. View Logs for errors

**Check environment variable:**

1. Vercel → Settings → Environment Variables
2. Make sure `VITE_API_URL` is set correctly
3. Should end with `/api`

**Check CORS:**

- Already configured in `server/index.js`
- No changes needed!

### Data not saving?

**Check Railway logs:**

1. Look for "💾 Data saved to file"
2. Check for errors

**Check browser console:**

1. Press F12
2. Console tab
3. Look for red errors

### Can't access from phone?

**Check:**

1. Phone has internet connection
2. Using correct URL: https://letsgrind.fun (not localhost!)
3. Clear browser cache

---

## 💰 Cost:

Railway Free Tier:

- ✅ $5 free credits per month
- ✅ Enough for your use case
- ✅ No credit card required initially

If you exceed:

- Upgrade to Hobby plan ($5/month)
- Or optimize usage

---

## 📊 Monitor Usage:

Railway Dashboard → Project → "Metrics"

- See CPU, Memory, Network usage
- Track free credit usage

---

## 🔄 Update Backend:

To update backend code:

```bash
# Make changes to server/ files
git add .
git commit -m "Update backend"
git push
```

Railway auto-deploys! ✅

---

## 🎯 Quick Reference:

**Railway URL Pattern:**

```
https://[project-name]-production-[random].up.railway.app
```

**Vercel Env Var:**

```
VITE_API_URL=https://your-railway-url.up.railway.app/api
```

**Test Endpoints:**

```
GET  /api/health  ← Health check
GET  /api/data    ← Fetch data
POST /api/data    ← Save data
```

---

## ✨ Benefits:

✅ **Shared data** - Both see same information  
✅ **Real-time sync** - Auto-saves on every change  
✅ **Always available** - Access from anywhere  
✅ **Simple file storage** - Just JSON file  
✅ **Free hosting** - No cost for your usage

---

**Need help? Check logs in Railway Dashboard!** 🚂

**Everything working? Start tracking! 💪**
