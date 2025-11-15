# 🚀 Deployment Guide for letsgrind.fun

This guide will help you deploy **Let's Grind** to your custom domain.

## Prerequisites

- Node.js 18+ installed
- Domain: `letsgrind.fun` configured
- Hosting platform account (Vercel, Netlify, or custom server)

## Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

**Why Vercel?**

- Free hosting for hobby projects
- Automatic HTTPS
- Easy custom domain setup
- Zero configuration needed
- Instant deployments

**Steps:**

1. Install Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Build the project:

   ```bash
   npm run build
   ```

3. Deploy:

   ```bash
   vercel --prod
   ```

4. Add custom domain:
   - Go to your Vercel dashboard
   - Select your project
   - Settings → Domains
   - Add `letsgrind.fun` and `www.letsgrind.fun`
   - Update your DNS records as instructed

**DNS Configuration:**

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

### Option 2: Netlify

**Steps:**

1. Install Netlify CLI:

   ```bash
   npm install -g netlify-cli
   ```

2. Build:

   ```bash
   npm run build
   ```

3. Deploy:

   ```bash
   netlify deploy --prod --dir=dist
   ```

4. Configure custom domain in Netlify dashboard

**DNS Configuration:**

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site.netlify.app
```

---

### Option 3: Traditional Web Hosting

If you have a traditional web host (cPanel, etc.):

1. Build the project:

   ```bash
   npm run build
   ```

2. Upload contents of `dist/` folder to your web root:

   - Via FTP/SFTP
   - Or cPanel File Manager

3. Ensure your `.htaccess` or server config handles SPA routing:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

---

## Post-Deployment Checklist

- [ ] Website loads at `https://letsgrind.fun`
- [ ] HTTPS/SSL is working (green padlock)
- [ ] `www.letsgrind.fun` redirects to main domain
- [ ] All features work (add person, track activities, etc.)
- [ ] Mobile responsive design works
- [ ] Calendar view displays correctly
- [ ] Leaderboards update properly

---

## Troubleshooting

### Issue: Blank page after deployment

**Solution:** Check if `base` is set correctly in `vite.config.ts`. For custom domains, it should be `/`.

### Issue: 404 on refresh

**Solution:** Configure your hosting to serve `index.html` for all routes (SPA routing).

### Issue: Styles not loading

**Solution:** Check browser console for CORS or path errors. Ensure all assets are deployed.

---

## Performance Optimization

After deployment, consider:

1. **Enable Compression** - Gzip/Brotli compression for faster loading
2. **CDN Setup** - Use Cloudflare for global caching
3. **Image Optimization** - Compress any added images
4. **Lighthouse Check** - Run Google Lighthouse for performance audit

---

## Monitoring

- **Uptime Monitoring**: Use UptimeRobot or Pingdom
- **Analytics**: Add Google Analytics or Plausible
- **Error Tracking**: Consider Sentry for bug tracking

---

## Support

Having issues? Check:

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)

---

**Good luck crushing those goals! 💪**
