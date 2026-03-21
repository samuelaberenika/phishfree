# PhishFree

**Train your instincts. Spot the threat.**

A gamified phishing awareness Single Page Application built with Vanilla JavaScript.

## About

PhishFree is a browser-based SPA designed to help university students and staff
recognise phishing emails. Users classify emails across four attack categories as
either phishing or safe, receiving immediate feedback and educational explanations
after each decision. Built as part of COMP1004 Computing Practice at the
University of Plymouth.

## Features

- 41 emails across 4 categories: Corporate, Bank, Social Media, Academic
- 3 difficulty levels — Easy (10pts), Medium (25pts), Hard (50pts)
- Immediate feedback with phishing indicator explanations
- Category-specific training missions
- High score persistence via LocalStorage
- JSON flat file input (emails.json) and output (phishfree_result.json)
- Progress bar, responsive layout, keyboard shortcuts (P / S)

## Stack

HTML · CSS · Vanilla JavaScript

## File Structure

```
phishfree/
├── fonts/               ← Forma DJR .ttf files
├── emails.json          ← Email dataset (JSON flat file input)
├── index.html           ← Single Page Application (all screens)
├── style.css
├── data.js              ← Loads emails.json via fetch()
├── game.js              ← GameController logic and scoring
└── ui.js                ← Screen management and DOM rendering
```

## How to Run Locally

This app loads `emails.json` via `fetch()` and requires a local server.

**Option 1 — VS Code Live Server**
Install the Live Server extension, right-click `index.html`, select Open with Live Server.

**Option 2 — Node.js**

```bash
npx serve .
```

Then open `http://localhost:3000` in your browser.

## Author

Samuel Aberenika — University of Plymouth
