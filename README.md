# PhishFree

**Train your instincts. Spot the threat.**

A gamified phishing awareness SPA built with vanilla JS.

## Live Demo
> Add your Vercel URL here after deployment

## Features
- 41 emails across 4 categories: Corporate, Bank, Social Media, Academic
- 3 difficulty levels - Easy (10pts), Medium (25pts), Hard (50pts)
- Immediate feedback with phishing indicator explanations
- High score persistence via LocalStorage
- Progress bar, responsive layout, keyboard shortcuts (P/S)

## Stack
HTML · CSS · Vanilla JavaScript · Forma DJR + Montserrat typefaces
Zero dependencies. Zero build step.

## File Structure
```
phishfree/
├── fonts/               ← Forma DJR .ttf files
├── landing.html         ← Training missions / marketing page
├── index.html           ← The game
├── style.css
├── data.js
├── game.js
└── ui.js
```

## Run Locally
```bash
npx serve .
```

## Deploy to Vercel
1. Push to GitHub
2. Import repo at vercel.com/new
3. Leave all settings as default - Vercel will detect it as a static site
4. Deploy
