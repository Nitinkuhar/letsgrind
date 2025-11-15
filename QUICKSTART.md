# ⚡ Quick Start Guide - Let's Grind

## 🚀 Deploy to Vercel (1 minute)

The fastest way to get **Let's Grind** live at `letsgrind.fun`:

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel --prod
```

Then add your custom domain in the Vercel dashboard!

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:5173
```

---

## 🌐 Add Your Domain (letsgrind.fun)

### In Vercel:
1. Go to your project dashboard
2. Settings → Domains
3. Add `letsgrind.fun`
4. Add `www.letsgrind.fun`
5. Update your DNS:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

Wait 10-30 minutes for DNS propagation ✅

---

## 📦 Build for Production

```bash
npm run build
```

Output will be in `dist/` folder - upload this to any static hosting!

---

## 🎉 That's it!

Your fitness tracker is now live at **letsgrind.fun**

Start crushing those goals! 💪

---

**Need help?** Check out:
- [Full README](README.md)
- [Deployment Guide](DEPLOY.md)

