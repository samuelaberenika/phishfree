# PhishFree

**Train your instincts. Spot the threat.**

A gamified phishing awareness SPA built with vanilla JS. Classify emails as phishing or safe across three difficulty levels, receive detailed educational feedback, and track your high score.

## Live Demo

>

## Features

- **41 emails** across 4 categories: Corporate, Bank, Social Media, Academic
- **3 difficulty levels** — Easy (10pts), Medium (25pts), Hard (50pts)
- **Immediate feedback** with detailed phishing indicator explanations
- **High score persistence** via LocalStorage with full type safety
- **Progress bar** — track position through the 10-email round
- **Responsive** — works on mobile and desktop
- **Accessible** — keyboard navigation (P = Phishing, S = Safe), focus states, ARIA labels, `prefers-reduced-motion` support

## Tech Stack

- HTML5 · CSS3 · Vanilla JavaScript (ES6)
- Zero dependencies · Zero build step
- Modular architecture: `data.js` → `game.js` → `ui.js`

## Project Structure

```
phishfree/
├── landing.html     # App shell + all 5 screen templates
├── index.html       # Game screen template
├── style.css        # Full design system + CSS custom properties
├── data.js          # 41 email objects (dataset)
├── game.js          # GameController class (logic + LocalStorage)
└── ui.js            # UI controller (screens, transitions, events)
```

## Run Locally

No build step required — just open `landing.html` in a browser.

```bash
# Or use any static server
npx serve .
```

## Design System

| Token    | Hex       | Role                      |
| -------- | --------- | ------------------------- |
| Frost    | `#f0f6f7` | Headings, primary text    |
| Slate    | `#89aec8` | Secondary text, UI labels |
| Brass    | `#7b6727` | Accent, CTA buttons       |
| Timber   | `#4e452a` | Muted borders             |
| Marine   | `#002c55` | App background            |
| Midnight | `#0b0e29` | Deep backgrounds, cards   |

Fonts: **JetBrains Mono** (UI) + **Inter** (email content)

## Keyboard Shortcuts

| Key        | Action           |
| ---------- | ---------------- |
| `P` or `1` | Mark as Phishing |
| `S` or `2` | Mark as Safe     |

## Academic Context

Developed for COMP1004 Computing Practice Coursework at the University of Plymouth.
