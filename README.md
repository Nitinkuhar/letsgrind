# 💪 Let's Grind

**Crush your fitness goals together, one day at a time!**

A beautiful, competitive fitness and health tracker built with React and TypeScript. Track weight loss, daily activities, and compete with friends in a fun, motivational way.

🌐 **Live at:** [letsgrind.fun](https://letsgrind.fun)

## ✨ Features

### 📊 Comprehensive Tracking
- **Weight Management** - Track current weight, goal weight, and progress
- **BMI Calculator** - Automatic BMI calculation with health categories
- **Daily Activities** - Check off healthy habits (exercise, nutrition, hydration, steps)
- **Custom Activities** - Add your own activities with custom point values
- **Historical Data** - Track activities for any past date

### 🏆 Competitive & Motivational
- **Daily Champions Calendar** - See who won each day in a visual calendar grid with full rankings
- **Most Wins Tracker** - See who's been consistently crushing it over time
- **Points System** - Earn points for completing daily activities
- **Achievement Celebrations** - Special animations when weight loss goals are reached
- **Visual Progress Tracking** - Color-coded progress bars for each person

### 🎨 Beautiful Design
- Modern, gradient UI with smooth animations
- Color-coded personal themes
- Responsive design for mobile and desktop
- Collapsible sections for clean interface
- Interactive hover effects

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown in the terminal (usually http://localhost:5173)

## 📖 How to Use

### Getting Started
1. **Add People** - Click the "+" card to add yourself and friends
2. **Set Goals** - Enter starting weight, current weight, goal weight, height, age, and gender
3. **Pick a Color** - Choose a unique color theme for each person

### Daily Tracking
1. **Update Weight** - Click the pencil icon next to current weight to update
2. **Track Activities** - Click "📅 Daily Activities" in each card
3. **Select Date** - Choose today or any past date to log activities
4. **Check Off Tasks**:
   - 🥗 Ate Healthy Food (10 pts)
   - 💪 Did Exercise (15 pts)
   - 💧 Drank Water Properly (10 pts)
   - 👟 Completed 10K Steps (15 pts)
5. **Add Custom Activities** - Click "+ Add Extra Activity" for bonus tasks

### View Progress
- **Individual Cards** - See BMI, progress bars, weight loss stats, and daily activities for each person
- **Daily Calendar** - Check who won each day with full rankings and points
- **Most Wins Summary** - Track who's been most consistent over time
- **Historical Performance** - Compare progress across multiple days

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **CSS3** - Modern animations and gradients

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Deploy to Various Platforms

#### **Vercel** (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### **Netlify**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

#### **GitHub Pages**
1. Add to `vite.config.ts`:
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/letsgrind/', // your repo name
})
```
2. Build and deploy:
```bash
npm run build
# Push dist folder to gh-pages branch
```

#### **Custom Domain (letsgrind.fun)**
1. Build the project: `npm run build`
2. Upload the `dist/` folder contents to your hosting provider
3. Point your domain DNS to the hosting provider
4. Configure SSL certificate for HTTPS

### Environment Variables

No environment variables needed! The app runs entirely client-side with local state management.

## 📝 Future Enhancements

- [ ] Local storage persistence
- [ ] Data export/import (JSON)
- [ ] Social sharing of achievements
- [ ] Weekly/monthly reports
- [ ] Custom activity templates
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Progressive Web App (PWA) support
- [ ] Email/SMS reminders for daily check-ins
- [ ] Photo progress tracking
- [ ] Meal planning integration
- [ ] Workout routines library

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 💪 About Let's Grind

**Let's Grind** is built for people who want to achieve their fitness goals together. Whether you're competing with friends, family, or coworkers, the competitive and social aspects make staying healthy more fun and engaging.

Remember: **Consistency beats intensity. Let's Grind! 💪**

---

Made with ❤️ for the fitness community | [letsgrind.fun](https://letsgrind.fun)

