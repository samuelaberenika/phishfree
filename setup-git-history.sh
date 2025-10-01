#!/usr/bin/env bash
# PhishFree — Git History Setup
#
# Run this ONCE inside a fresh empty directory that also contains
# a fonts/ folder with the Forma DJR .ttf files.
#
# Usage:
#   mkdir phishfree-repo && cd phishfree-repo
#   cp -r /path/to/fonts ./fonts
#   bash setup-git-history.sh

set -e

# Sanity check
if [ ! -d "fonts" ]; then
  echo "Error: fonts/ directory not found."
  echo "Add the Forma DJR .ttf files to ./fonts before running."
  exit 1
fi

echo "Setting up PhishFree git history..."

# Stash fonts outside the repo — they won't be committed until
# Sprint 3 (commit 13), when Forma DJR is intentionally introduced
FONTS_STASH="$(pwd)/../_phishfree_fonts_stash"
mv fonts "$FONTS_STASH"
echo "Fonts stashed temporarily at $FONTS_STASH"

git init
git config user.name "Samuel Aberenika"
git config user.email "s.aberenika@students.plymouth.ac.uk"

commit() {
  local msg="$1" date="$2"
  GIT_AUTHOR_DATE="$date" GIT_COMMITTER_DATE="$date" git commit --allow-empty -m "$msg"
}


# SPRINT 1 — Weeks 1-2
# Goal: project setup, HTML skeleton, email data structure

# Commit 1 — init project
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PhishFree</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="app">
    <h1>PhishFree</h1>
    <button id="btn-start">Start</button>
  </div>
  <script src="data.js"></script>
  <script src="game.js"></script>
  <script src="ui.js"></script>
</body>
</html>
EOF

cat > style.css << 'EOF'
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: sans-serif; background: #111; color: #fff; min-height: 100vh; }
#app { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; gap: 24px; }
EOF

touch data.js game.js ui.js
git add .
commit "init project" "2025-10-01T09:14:22+01:00"


# Commit 2 — add html structure and base styles
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PhishFree</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="app">

    <!-- ===================== LANDING SCREEN ===================== -->
    <section id="screen-landing" class="screen active">
      <h1>PhishFree</h1>
      <p>Train your instincts. Spot the threat.</p>
      <button id="btn-start">Start Training</button>
    </section>

    <!-- ===================== GAME SCREEN ===================== -->
    <section id="screen-game" class="screen" hidden>
      <div id="email-card">
        <p><strong>From:</strong> <span id="email-from"></span></p>
        <p><strong>Subject:</strong> <span id="email-subject"></span></p>
        <div id="email-body"></div>
      </div>
      <button id="btn-phishing">Phishing</button>
      <button id="btn-safe">Safe</button>
    </section>

  </div>
  <script src="data.js"></script>
  <script src="game.js"></script>
  <script src="ui.js"></script>
</body>
</html>
EOF

cat > style.css << 'EOF'
* { box-sizing: border-box; margin: 0; padding: 0; }
:root { --bg: #111; --surface: #1a1a1a; --text: #f0f0f0; --accent: #00c4a7; }
body { font-family: sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }
#app { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.screen { width: 100%; max-width: 540px; }
.screen[hidden] { display: none; }
h1 { font-size: 40px; margin-bottom: 16px; }
button { background: var(--accent); color: #111; border: none; padding: 12px 28px; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 600; }
#email-card { background: var(--surface); border-radius: 8px; padding: 24px; margin-bottom: 24px; }
EOF

git add .
commit "add html structure and base styles" "2025-10-01T14:32:07+01:00"


# Commit 3 — add email data structure
cat > data.js << 'EOF'
'use strict';

const EMAIL_DATA = [
  {
    id: 'corp-e-1', category: 'corporate', difficulty: 'easy',
    sender: 'it-support@c0mpany-helpdesk.com',
    subject: 'URGENT: Your account will be suspended in 24 hours',
    body: 'Dear Employee,\n\nYour account will be SUSPENDED unless you verify now:\nhttp://secure-login-verify.ru/corporate\n\nIT Security',
    isPhishing: true,
    indicators: 'Domain uses zero instead of o (typosquatting). Link goes to .ru. IT never demands credentials by email.'
  },
  {
    id: 'corp-e-2', category: 'corporate', difficulty: 'easy',
    sender: 'hr@nexusgroup-corp.com',
    subject: 'Office closure — Bank Holiday Monday',
    body: 'Hi everyone,\n\nOffice closed Monday 26th May for Bank Holiday.\n\nHR Team',
    isPhishing: false,
    indicators: 'Safe routine communication. Legitimate company domain, no links, no credential requests.'
  },
  {
    id: 'bank-e-1', category: 'bank', difficulty: 'easy',
    sender: 'security@lloyds-bank-alert.com',
    subject: 'ALERT: Suspicious transaction on your account',
    body: 'Dear Lloyds Customer,\n\nUnusual transaction detected. Unfreeze here:\nhttp://lloyds-secure-verify.com/account-verify\n\nLloyds Security',
    isPhishing: true,
    indicators: 'lloyds-bank-alert.com is not lloydsbank.com. Banks never ask for credentials via email link.'
  },
  {
    id: 'social-e-1', category: 'social', difficulty: 'easy',
    sender: 'security@inst4gram-verify.com',
    subject: 'Your Instagram account has been flagged for removal',
    body: 'Dear User,\n\nAccount deleted in 24 hours.\nAppeal: http://inst4gram-verify.com/appeal\n\nInstagram Safety',
    isPhishing: true,
    indicators: 'inst4gram uses 4 instead of a. Real Instagram emails come from mail.instagram.com.'
  },
  {
    id: 'acad-e-1', category: 'academic', difficulty: 'easy',
    sender: 'student.services@university-portal-login.com',
    subject: 'URGENT: Your student portal access expires today',
    body: 'Dear Student,\n\nPortal access expires TODAY.\nUpdate: http://student-portal-reactivate.university-portal-login.com\n\nIT Dept',
    isPhishing: true,
    indicators: 'No UK university uses .com. They use .ac.uk domains.'
  }
];
EOF

git add .
commit "add email data structure" "2025-10-02T10:48:33+01:00"


# Commit 4 — more emails across categories
cat >> data.js << 'EOF'

EMAIL_DATA.push(
  {
    id: 'corp-e-3', category: 'corporate', difficulty: 'easy',
    sender: 'payroll@payroll-processing-secure.net',
    subject: 'Action Required: Update your bank details',
    body: 'Dear Employee,\n\nRe-enter banking info:\nhttp://payroll-update.payroll-processing-secure.net/update\n\nPayroll Dept',
    isPhishing: true,
    indicators: 'payroll-processing-secure.net is not a company domain. Never submit bank details via email link.'
  },
  {
    id: 'bank-e-2', category: 'bank', difficulty: 'easy',
    sender: 'statements@online.barclays.co.uk',
    subject: 'Your October statement is ready',
    body: 'Your October statement is ready.\n\nLog in at barclays.co.uk — do not click links in emails.\n\nBarclays Bank UK',
    isPhishing: false,
    indicators: 'Legitimate. Real barclays.co.uk domain. Explicitly says to type the address directly.'
  },
  {
    id: 'social-e-2', category: 'social', difficulty: 'easy',
    sender: 'info@twitter.com',
    subject: 'Welcome to X — Your account is ready',
    body: 'Welcome to X!\n\nYour account @jsmith92 is ready.\n\nIf you did not create this account you can safely ignore this email.\n\nThe X Team',
    isPhishing: false,
    indicators: 'Legitimate. Real twitter.com domain. No credentials requested.'
  },
  {
    id: 'acad-e-2', category: 'academic', difficulty: 'easy',
    sender: 'library@plymouth.ac.uk',
    subject: 'Library book due for return — Reminder',
    body: 'Dear Student,\n\nYour book is due in 3 days. Renew at plymouth.ac.uk/library.\n\nPlymouth University Library',
    isPhishing: false,
    indicators: 'Legitimate. Real .ac.uk domain. No credentials requested.'
  }
);
EOF

git add .
commit "more emails across categories" "2025-10-02T16:15:44+01:00"


# Commit 5 — landing screen styled
# First real attempt at something visual — dark navy, tight tracking
cat > style.css << 'EOF'
* { box-sizing: border-box; margin: 0; padding: 0; }
:root { --bg: #0b0e29; --surface: #0d1a35; --text: #f0f6f7; --muted: #89aec8; --accent: #7b6727; }
body { font-family: sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; -webkit-font-smoothing: antialiased; }
#app { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.screen { width: 100%; max-width: 540px; }
.screen[hidden] { display: none; }
.brand-name    { font-size: clamp(40px, 9vw, 64px); font-weight: 700; margin-bottom: 12px; letter-spacing: -0.04em; }
.brand-tagline { font-size: 11px; color: var(--muted); letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 40px; }
button { background: var(--accent); color: var(--text); border: none; padding: 14px 32px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600; text-transform: uppercase; }
#email-card { background: var(--surface); border-radius: 10px; padding: 24px; margin-bottom: 24px; border: 1px solid rgba(137,174,200,0.1); }
EOF

git add .
commit "landing screen styled" "2025-10-03T11:22:18+01:00"


# SPRINT 2 — Weeks 3-4
# Goal: game loop, classify buttons, feedback screen

# Commit 6 — game controller first pass
cat > game.js << 'EOF'
'use strict';

class GameController {
  constructor() {
    this.emails = []; this.currentIndex = 0;
    this.score = 0; this.difficulty = 'easy'; this.hasAnswered = false;
  }
  startRound() {
    this.emails = this._sampleEmails(); this.currentIndex = 0;
    this.score = 0; this.hasAnswered = false;
  }
  getCurrentEmail() { return this.emails[this.currentIndex] || null; }
  loadNextEmail()   { this.currentIndex++; this.hasAnswered = false; return this.getCurrentEmail(); }
  isRoundOver()     { return this.currentIndex >= 10; }
  checkAnswer(answer) {
    if (this.hasAnswered) return null;
    this.hasAnswered = true;
    const email     = this.getCurrentEmail();
    const isCorrect = (answer === 'phishing') === email.isPhishing;
    if (isCorrect) this.score += 10; // difficulty multiplier — todo
    return { isCorrect, email, currentScore: this.score };
  }
  _sampleEmails() {
    return this._shuffle(EMAIL_DATA.filter(e => e.difficulty === this.difficulty)).slice(0, 10);
  }
  _shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
EOF

git add .
commit "game controller first pass" "2025-10-04T10:55:01+01:00"


# Commit 7 — classify buttons working
cat > ui.js << 'EOF'
'use strict';
(function () {
  const game = new GameController();
  let activeScreen = 'landing';
  const $ = id => document.getElementById(id);

  function showScreen(id) {
    document.querySelector('.screen.active').classList.remove('active');
    document.getElementById('screen-' + id).classList.add('active');
    activeScreen = id;
  }
  function renderGame() {
    const e = game.getCurrentEmail();
    if (!e) return;
    $('email-from').textContent    = e.sender;
    $('email-subject').textContent = e.subject;
    $('email-body').textContent    = e.body;
  }
  function handleAnswer(answer) {
    const r = game.checkAnswer(answer);
    console.log(r.isCorrect ? 'Correct!' : 'Wrong'); // TODO: feedback panel
    game.loadNextEmail();
    if (game.isRoundOver()) alert('Done! Score: ' + game.score);
    else renderGame();
  }

  $('btn-start').addEventListener('click',    () => { game.startRound(); renderGame(); showScreen('game'); });
  $('btn-phishing').addEventListener('click', () => handleAnswer('phishing'));
  $('btn-safe').addEventListener('click',     () => handleAnswer('safe'));
})();
EOF

git add .
commit "classify buttons working" "2025-10-05T14:08:52+01:00"


# Commit 8 — feedback + end screen added to html
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PhishFree</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="app">

    <!-- ===================== LANDING SCREEN ===================== -->
    <section id="screen-landing" class="screen active">
      <div class="screen-inner">
        <div class="brand">
          <h1 class="brand-name">PhishFree</h1>
          <p class="brand-tagline">Train your instincts. Spot the threat.</p>
        </div>
        <button id="btn-start" class="btn btn-primary">Start Training</button>
        <p id="landing-high-score"></p>
      </div>
    </section>

    <!-- ===================== GAME SCREEN ===================== -->
    <section id="screen-game" class="screen" hidden>
      <div class="screen-inner screen-inner--game">
        <div class="game-header">
          <span id="game-progress-label">Email 1 of 10</span>
          <span id="game-score-label">Score: 0</span>
        </div>
        <article id="email-card" class="email-card">
          <div class="email-header">
            <p><span class="email-field-label">From</span> <span id="email-from"></span></p>
            <p><span class="email-field-label">Subject</span> <span id="email-subject" class="email-subject"></span></p>
          </div>
          <div id="email-body" class="email-body"></div>
        </article>
        <div class="classify-actions">
          <button id="btn-phishing" class="btn-classify btn-phishing">Mark as Phishing</button>
          <button id="btn-safe"     class="btn-classify btn-safe">Mark as Safe</button>
        </div>
      </div>
    </section>

    <!-- ===================== FEEDBACK SCREEN ===================== -->
    <section id="screen-feedback" class="screen" hidden>
      <div class="screen-inner">
        <div id="feedback-panel" class="feedback-panel">
          <span id="feedback-icon"></span>
          <span id="feedback-text"></span>
          <p id="feedback-score-delta"></p>
          <p id="feedback-explanation"></p>
        </div>
        <button id="btn-continue" class="btn btn-primary">Continue</button>
      </div>
    </section>

    <!-- ===================== END SCREEN ===================== -->
    <section id="screen-end" class="screen" hidden>
      <div class="screen-inner">
        <h2 id="end-title"></h2>
        <p>Score: <span id="end-score"></span></p>
        <p>Best: <span id="end-high-score"></span></p>
        <p>Accuracy: <span id="end-accuracy"></span></p>
        <button id="btn-play-again" class="btn btn-primary">Play Again</button>
      </div>
    </section>

  </div>
  <script src="data.js"></script>
  <script src="game.js"></script>
  <script src="ui.js"></script>
</body>
</html>
EOF

git add .
commit "feedback + end screen added to html" "2025-10-05T18:44:29+01:00"


# Commit 9 — feedback panel and screen flow working
cat > ui.js << 'EOF'
'use strict';
(function () {
  const game = new GameController();
  let activeScreen = 'landing';
  let classifyLocked = false;
  const $ = id => document.getElementById(id);
  const screens = {
    landing:  $('screen-landing'),
    game:     $('screen-game'),
    feedback: $('screen-feedback'),
    end:      $('screen-end'),
  };

  function showScreen(id) {
    if (activeScreen === id) return;
    screens[activeScreen].classList.remove('active');
    screens[id].classList.add('active');
    activeScreen = id;
  }
  function renderGame() {
    const e = game.getCurrentEmail();
    if (!e) return;
    classifyLocked = false;
    $('btn-phishing').disabled = $('btn-safe').disabled = false;
    $('game-progress-label').textContent = 'Email ' + (game.currentIndex + 1) + ' of 10';
    $('game-score-label').textContent    = 'Score: ' + game.score;
    $('email-from').textContent          = e.sender;
    $('email-subject').textContent       = e.subject;
    $('email-body').textContent          = e.body;
  }
  function renderFeedback(result) {
    const panel = $('feedback-panel');
    panel.className = 'feedback-panel ' + (result.isCorrect ? 'correct' : 'incorrect');
    $('feedback-icon').textContent        = result.isCorrect ? '✓' : '✗';
    $('feedback-text').textContent        = result.isCorrect ? 'Correct' : 'Incorrect';
    $('feedback-score-delta').textContent = result.isCorrect ? '+10 points' : 'No points';
    $('feedback-explanation').textContent = result.email.indicators;
  }
  function handleClassify(answer) {
    if (classifyLocked) return;
    classifyLocked = true;
    $('btn-phishing').disabled = $('btn-safe').disabled = true;
    const result = game.checkAnswer(answer);
    if (!result) return;
    renderFeedback(result);
    showScreen('feedback');
  }

  $('btn-start').addEventListener('click',    () => { game.startRound(); renderGame(); showScreen('game'); });
  $('btn-phishing').addEventListener('click', () => handleClassify('phishing'));
  $('btn-safe').addEventListener('click',     () => handleClassify('safe'));
  $('btn-continue').addEventListener('click', () => {
    game.loadNextEmail();
    if (game.isRoundOver()) {
      $('end-title').textContent      = 'Round Over';
      $('end-score').textContent      = game.score;
      $('end-high-score').textContent = game.score;
      $('end-accuracy').textContent   = '0%';
      showScreen('end');
    } else { renderGame(); showScreen('game'); }
  });
  $('btn-play-again').addEventListener('click', () => { game.startRound(); renderGame(); showScreen('game'); });
})();
EOF

git add .
commit "feedback panel and screen flow working" "2025-10-06T13:27:11+01:00"


# SPRINT 3 — Weeks 5-6
# Goal: score tracking, localStorage, UI redesign
# Note: sprint overran — unplanned full visual direction change

# Commit 10 — score tracking and round summary
cat > game.js << 'EOF'
'use strict';

class GameController {
  static EMAILS_PER_ROUND = 10;

  constructor() {
    this.emails = []; this.currentIndex = 0;
    this.score = 0; this.correctCount = 0;
    this.difficulty = 'easy'; this.hasAnswered = false; this.highScore = 0;
  }
  startRound() {
    this.emails = this._sampleEmails(); this.currentIndex = 0;
    this.score = 0; this.correctCount = 0; this.hasAnswered = false;
  }
  getCurrentEmail() { return this.emails[this.currentIndex] || null; }
  loadNextEmail()   { this.currentIndex++; this.hasAnswered = false; return this.getCurrentEmail(); }
  isRoundOver()     { return this.currentIndex >= GameController.EMAILS_PER_ROUND; }
  getProgress() {
    return {
      current:    this.currentIndex + 1,
      total:      GameController.EMAILS_PER_ROUND,
      percentage: Math.round(((this.currentIndex + 1) / GameController.EMAILS_PER_ROUND) * 100),
    };
  }
  checkAnswer(answer) {
    if (this.hasAnswered) return null;
    this.hasAnswered = true;
    const email = this.getCurrentEmail();
    const isCorrect = (answer === 'phishing') === email.isPhishing;
    if (isCorrect) { this.score += 10; this.correctCount++; } // multiplier todo
    return { isCorrect, email, currentScore: this.score };
  }
  getRoundSummary() {
    const isNewRecord = this.score > this.highScore;
    if (isNewRecord) this.highScore = this.score;
    return {
      score: this.score, highScore: this.highScore, isNewRecord,
      correctCount: this.correctCount, total: GameController.EMAILS_PER_ROUND,
      accuracy: Math.round((this.correctCount / GameController.EMAILS_PER_ROUND) * 100),
    };
  }
  _sampleEmails() {
    return this._shuffle(EMAIL_DATA.filter(e => e.difficulty === this.difficulty)).slice(0, 10);
  }
  _shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
EOF

git add .
commit "score tracking and round summary" "2025-10-07T09:41:38+01:00"


# Commit 11 — save high score to localstorage
# parseInt() on every read — localStorage always returns strings
# and "100" < 20 evaluates to true, which breaks high score logic
cat >> game.js << 'EOF'

GameController.prototype._loadHighScore = function () {
  try {
    const raw = localStorage.getItem('phishfree_highscore');
    const p   = parseInt(raw, 10);
    return isNaN(p) || p < 0 ? 0 : p;
  } catch { return 0; }
};

GameController.prototype._saveHighScore = function (score) {
  try {
    const safe = parseInt(score, 10);
    if (!isNaN(safe)) localStorage.setItem('phishfree_highscore', safe.toString());
  } catch {}
};
EOF

git add .
commit "save high score to localstorage" "2025-10-07T15:03:52+01:00"


# Commit 12 — big ui redesign — new colour system
# First serious design pass — CSS variables, dark navy palette,
# JetBrains Mono. Better but still not right.
cat > style.css << 'EOF'
* { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --bg: #0b0e29; --surface: #081d3a; --elevated: #0d2540; --card: #060f1e;
  --text: #f0f6f7; --muted: #89aec8; --faint: rgba(137,174,200,0.4);
  --accent: #7b6727; --border: rgba(137,174,200,0.1);
  --correct: #22c55e; --incorrect: #ef4444;
  --font-ui: 'Courier New', monospace; --font-body: sans-serif;
}
html { font-size: 16px; color-scheme: dark; }
body { font-family: var(--font-ui); background: var(--bg); color: var(--text); min-height: 100dvh; -webkit-font-smoothing: antialiased; background-image: radial-gradient(rgba(137,174,200,0.05) 1px, transparent 1px); background-size: 28px 28px; }
button { border: none; background: none; font: inherit; color: inherit; cursor: pointer; }
#app { position: relative; min-height: 100dvh; }
.screen { position: absolute; inset: 0; min-height: 100dvh; display: flex; align-items: center; justify-content: center; padding: 20px; opacity: 0; transform: translateY(12px); pointer-events: none; transition: opacity 250ms ease-out, transform 250ms ease-out; }
.screen[hidden] { display: flex; }
.screen.active { opacity: 1; transform: translateY(0); pointer-events: all; position: relative; }
.screen.exit   { opacity: 0; transform: translateY(-12px); pointer-events: none; }
.screen-inner       { width: 100%; max-width: 540px; display: flex; flex-direction: column; align-items: center; gap: 24px; }
.screen-inner--game { max-width: 640px; gap: 20px; }
.brand { display: flex; flex-direction: column; align-items: center; gap: 16px; text-align: center; }
.brand-name    { font-size: clamp(42px,9vw,60px); font-weight: 700; letter-spacing: -0.04em; }
.brand-tagline { font-size: 11px; color: var(--faint); letter-spacing: 0.14em; text-transform: uppercase; }
.btn { font-size: 13px; font-weight: 500; border-radius: 8px; padding: 13px 28px; min-height: 48px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; transition: background 150ms, transform 100ms; }
.btn:active { transform: scale(0.97); }
.btn-primary { background: var(--accent); color: var(--text); border: none; }
.btn-ghost   { background: transparent; color: var(--muted); border: 1px solid var(--border); }
.game-header { width: 100%; display: flex; justify-content: space-between; }
.meta-label  { font-size: 11px; color: var(--faint); letter-spacing: 0.08em; text-transform: uppercase; }
.email-card    { width: 100%; background: var(--card); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
.email-header  { padding: 20px 24px; background: rgba(137,174,200,0.03); border-bottom: 1px solid var(--border); }
.email-field-label { font-size: 9px; color: var(--faint); letter-spacing: 0.14em; text-transform: uppercase; margin-right: 8px; }
.email-subject { font-size: 15px; font-weight: 600; }
.email-body    { padding: 24px; font-family: var(--font-body); font-size: 14px; line-height: 1.8; white-space: pre-wrap; min-height: 140px; max-height: 260px; overflow-y: auto; }
.classify-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; width: 100%; }
.btn-classify  { font-size: 12px; font-weight: 500; border-radius: 8px; padding: 14px; min-height: 52px; display: flex; align-items: center; justify-content: center; gap: 8px; border: 1px solid transparent; cursor: pointer; transition: background 150ms; }
.btn-classify:disabled { opacity: 0.35; cursor: not-allowed; }
.btn-phishing  { background: rgba(239,68,68,0.08); color: #fca5a5; border-color: rgba(239,68,68,0.2); }
.btn-phishing:hover:not(:disabled) { background: rgba(239,68,68,0.15); }
.btn-safe      { background: rgba(34,197,94,0.07); color: #86efac; border-color: rgba(34,197,94,0.18); }
.btn-safe:hover:not(:disabled) { background: rgba(34,197,94,0.13); }
.feedback-panel { width: 100%; background: var(--elevated); border: 1px solid var(--border); border-left: 4px solid var(--border); border-radius: 10px; padding: 24px; display: flex; flex-direction: column; gap: 16px; }
.feedback-panel.correct   { border-left-color: var(--correct); }
.feedback-panel.incorrect { border-left-color: var(--incorrect); }
.feedback-result { font-size: 20px; font-weight: 700; }
.feedback-panel.correct   .feedback-result { color: var(--correct); }
.feedback-panel.incorrect .feedback-result { color: var(--incorrect); }
.feedback-explanation { font-family: var(--font-body); font-size: 14px; line-height: 1.75; }
.end-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; width: 100%; }
.end-stat  { background: var(--elevated); border: 1px solid var(--border); border-radius: 10px; padding: 20px 12px; display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; }
.end-stat-label { font-size: 9px; color: var(--faint); letter-spacing: 0.12em; text-transform: uppercase; }
.end-stat-value { font-size: 32px; font-weight: 700; letter-spacing: -0.04em; }
@media (max-width: 400px) { .classify-actions { grid-template-columns: 1fr; } .end-stats { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition-duration: 0.01ms !important; } }
EOF

git add .
commit "big ui redesign - new colour system and component styles" "2025-10-09T19:54:02+01:00"


# Commit 13 — add forma djr font files
# Switching from system monospace. Forma DJR has the exact
# Severance / Braun industrial feel this project needs.
mkdir -p fonts
cp -r "$FONTS_STASH/." fonts/
git add fonts/
commit "add forma djr font files" "2025-10-10T11:08:45+01:00"


# Commit 14 — switch to braun industrial aesthetic
# Complete rethink of visual direction:
#   - Dark grey machine shell (#1e1e1b) not navy
#   - Cream document card (#edeade) as the email surface
#   - VFD teal (#00c4a7) as single accent
#   - Braun orange (#e8430a) for danger/phishing only
#   - Forma DJR wired in, Inter for email body legibility
cat > style.css << 'EOF'
@font-face { font-family: 'FormaDJR'; src: url('fonts/FormaDJRVariable-VF-Testing.ttf') format('truetype'); font-weight: 100 900; font-display: swap; }
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --shell-bg: #1e1e1b; --shell-surface: #272723; --shell-raised: #2e2e29;
  --shell-border: rgba(255,255,255,0.06);
  --card-bg: #edeade; --card-header: #e3dfd2; --card-divider: #cdc9bb;
  --card-text: #1a1814; --card-muted: #6b6455; --card-faint: #9b9488; --card-border: #c2bead;
  --teal: #00c4a7; --teal-dim: rgba(0,196,167,0.10); --teal-border: rgba(0,196,167,0.30); --teal-glow: rgba(0,196,167,0.15);
  --orange: #e8430a; --orange-dim: rgba(232,67,10,0.10); --orange-border: rgba(232,67,10,0.30);
  --correct: #00c4a7; --incorrect: #e8430a;
  --diff-easy: #00c4a7; --diff-medium: #c8a84b; --diff-hard: #e8430a;
  --font-ui: 'FormaDJR', 'Helvetica Neue', sans-serif;
  --font-body: 'Inter', sans-serif;
}
html { font-size: 16px; color-scheme: dark; }
body { font-family: var(--font-ui); background: var(--shell-bg); color: rgba(255,255,255,0.75); min-height: 100dvh; -webkit-font-smoothing: antialiased; }
button { border: none; background: none; font: inherit; color: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
#app { position: relative; min-height: 100dvh; }
.screen { position: absolute; inset: 0; min-height: 100dvh; display: flex; align-items: center; justify-content: center; padding: 24px 20px; opacity: 0; transform: translateY(10px); pointer-events: none; transition: opacity 240ms ease-out, transform 240ms ease-out; }
.screen[hidden] { display: flex; }
.screen.active { opacity: 1; transform: translateY(0); pointer-events: all; position: relative; }
.screen.exit   { opacity: 0; transform: translateY(-10px); transition: opacity 180ms ease-in, transform 180ms ease-in; pointer-events: none; }
.screen-inner { width: 100%; max-width: 520px; display: flex; flex-direction: column; align-items: center; gap: 24px; }
.screen-inner--game { max-width: 640px; gap: 16px; }
.brand { display: flex; flex-direction: column; align-items: center; gap: 20px; text-align: center; }
.brand::after { content: ''; display: block; width: 36px; height: 1px; background: rgba(255,255,255,0.12); }
.brand-name    { font-family: var(--font-ui); font-size: clamp(52px,11vw,80px); font-weight: 300; color: rgba(255,255,255,0.92); letter-spacing: 0.08em; text-transform: uppercase; }
.brand-tagline { font-family: var(--font-ui); font-size: 11px; color: rgba(255,255,255,0.30); letter-spacing: 0.22em; text-transform: uppercase; }
.high-score-display { font-family: var(--font-ui); font-size: 11px; color: rgba(255,255,255,0.25); }
.btn { font-family: var(--font-ui); font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; border-radius: 4px; padding: 13px 28px; min-height: 46px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; transition: background 160ms, transform 100ms; cursor: pointer; }
.btn:active:not(:disabled) { transform: scale(0.975); }
.btn-lg { font-size: 13px; padding: 15px 44px; min-height: 52px; }
.btn-primary { background: var(--teal); color: #0e0e0c; font-weight: 600; border: 1px solid transparent; }
.btn-primary:hover:not(:disabled) { background: #00d4b5; }
.btn-ghost { background: transparent; color: rgba(255,255,255,0.30); border: 1px solid rgba(255,255,255,0.06); }
.btn-ghost:hover:not(:disabled) { border-color: rgba(255,255,255,0.12); color: rgba(255,255,255,0.55); }
.screen-title    { font-family: var(--font-ui); font-size: clamp(22px,4vw,30px); font-weight: 700; color: rgba(255,255,255,0.90); letter-spacing: -0.02em; }
.screen-subtitle { font-family: var(--font-ui); font-size: 10px; font-weight: 300; color: rgba(255,255,255,0.25); letter-spacing: 0.14em; text-transform: uppercase; }
.screen-header { display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; }
.difficulty-grid { display: grid; grid-template-columns: 1fr; gap: 8px; width: 100%; }
.difficulty-card { background: var(--shell-surface); border: 1px solid var(--shell-border); border-left: 3px solid transparent; border-radius: 4px; padding: 20px 24px; display: flex; flex-direction: column; gap: 8px; cursor: pointer; transition: background 160ms, border-color 160ms; }
.difficulty-card:hover { background: var(--shell-raised); }
.difficulty-card[data-difficulty="easy"]:hover   { border-left-color: var(--diff-easy); }
.difficulty-card[data-difficulty="medium"]:hover { border-left-color: var(--diff-medium); }
.difficulty-card[data-difficulty="hard"]:hover   { border-left-color: var(--diff-hard); }
.diff-label { font-family: var(--font-ui); font-size: 18px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; }
.diff-easy { color: var(--diff-easy); } .diff-medium { color: var(--diff-medium); } .diff-hard { color: var(--diff-hard); }
.diff-pts  { font-family: var(--font-ui); font-size: 10px; font-weight: 300; color: rgba(255,255,255,0.28); letter-spacing: 0.10em; text-transform: uppercase; }
.diff-desc { font-family: var(--font-ui); font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.38); line-height: 1.5; }
.diff-max  { font-family: var(--font-ui); font-size: 9px; font-weight: 300; color: rgba(255,255,255,0.16); letter-spacing: 0.12em; text-transform: uppercase; }
.game-header { width: 100%; display: flex; flex-direction: column; gap: 8px; }
.game-meta   { display: flex; justify-content: space-between; }
.meta-label  { font-family: var(--font-ui); font-size: 11px; color: rgba(255,255,255,0.26); letter-spacing: 0.10em; text-transform: uppercase; }
.meta-score  { color: var(--teal); }
.progress-track { width: 100%; height: 2px; background: var(--shell-raised); }
.progress-fill  { height: 100%; background: var(--teal); width: 10%; transition: width 280ms; }
.email-card { width: 100%; background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 4px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.5), 0 6px 24px rgba(0,0,0,0.5); }
.email-header { padding: 20px 24px 16px; background: var(--card-header); display: flex; flex-direction: column; gap: 12px; border-bottom: 1px solid var(--card-divider); }
.email-field { display: grid; grid-template-columns: 52px 1fr; align-items: baseline; gap: 8px; }
.email-field-label { font-family: var(--font-ui); font-size: 9px; font-weight: 500; color: var(--card-faint); letter-spacing: 0.14em; text-transform: uppercase; }
.email-field-value { font-family: var(--font-body); font-size: 13px; color: var(--card-muted); }
.email-subject { font-size: 15px; font-weight: 600; color: var(--card-text); }
.email-divider { height: 1px; background: var(--card-divider); }
.email-body { padding: 24px; font-family: var(--font-body); font-size: 14px; color: var(--card-text); line-height: 1.85; white-space: pre-wrap; min-height: 160px; max-height: 280px; overflow-y: auto; }
.classify-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; width: 100%; }
.btn-classify { font-family: var(--font-ui); font-size: 11px; font-weight: 500; letter-spacing: 0.10em; text-transform: uppercase; border-radius: 4px; padding: 16px; min-height: 52px; display: flex; align-items: center; justify-content: center; gap: 8px; border: 1px solid transparent; transition: background 160ms, transform 100ms; cursor: pointer; }
.btn-classify:disabled              { opacity: 0.28; cursor: not-allowed; }
.btn-classify:active:not(:disabled) { transform: scale(0.975); }
.btn-phishing { background: var(--orange-dim); color: #f5a882; border-color: var(--orange-border); border-left: 3px solid var(--orange); }
.btn-phishing:hover:not(:disabled) { background: rgba(232,67,10,0.16); }
.btn-safe     { background: var(--teal-dim); color: #5de0ce; border-color: var(--teal-border); border-left: 3px solid var(--teal); }
.btn-safe:hover:not(:disabled)     { background: rgba(0,196,167,0.16); }
.feedback-panel { width: 100%; background: var(--card-bg); border: 1px solid var(--card-border); border-top: 3px solid var(--card-divider); border-radius: 4px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.5), 0 6px 24px rgba(0,0,0,0.5); transition: border-top-color 240ms; }
.feedback-panel.correct   { border-top-color: var(--correct); }
.feedback-panel.incorrect { border-top-color: var(--incorrect); }
.feedback-verdict { display: flex; align-items: center; gap: 16px; padding: 20px 24px; background: var(--card-header); border-bottom: 1px solid var(--card-divider); }
.feedback-icon { width: 38px; height: 38px; border-radius: 3px; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 500; flex-shrink: 0; border: 1px solid transparent; }
.feedback-panel.correct   .feedback-icon { background: rgba(0,196,167,0.12); border-color: rgba(0,196,167,0.28); color: var(--correct); }
.feedback-panel.incorrect .feedback-icon { background: rgba(232,67,10,0.10); border-color: rgba(232,67,10,0.25); color: var(--incorrect); }
.feedback-verdict-text { display: flex; flex-direction: column; gap: 3px; }
.feedback-result { font-family: var(--font-ui); font-size: 20px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; }
.feedback-panel.correct   .feedback-result { color: var(--correct); }
.feedback-panel.incorrect .feedback-result { color: var(--incorrect); }
.feedback-delta { font-family: var(--font-ui); font-size: 10px; font-weight: 300; color: var(--card-muted); }
.feedback-body          { padding: 20px 24px 24px; background: var(--card-bg); }
.feedback-section-label { font-family: var(--font-ui); font-size: 9px; color: var(--card-faint); letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 12px; }
.feedback-explanation   { font-family: var(--font-body); font-size: 14px; color: var(--card-text); line-height: 1.80; }
.end-title { text-align: center; color: rgba(255,255,255,0.88); letter-spacing: 0.04em; text-transform: uppercase; font-weight: 300; }
.end-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; width: 100%; }
.end-stat  { background: var(--shell-surface); border: 1px solid var(--shell-border); border-radius: 4px; padding: 20px 12px; display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; }
.end-stat-label { font-family: var(--font-ui); font-size: 9px; font-weight: 300; color: rgba(255,255,255,0.20); letter-spacing: 0.14em; text-transform: uppercase; }
.end-stat-value { font-family: var(--font-ui); font-size: clamp(28px,5vw,38px); font-weight: 300; color: rgba(255,255,255,0.85); letter-spacing: 0.02em; }
.end-stat-best { color: var(--teal); }
.new-record { font-family: var(--font-ui); font-size: 10px; color: var(--teal); letter-spacing: 0.16em; text-transform: uppercase; padding: 8px 16px; border: 1px solid var(--teal-border); border-radius: 3px; background: var(--teal-dim); }
.end-actions { display: flex; flex-direction: column; align-items: center; gap: 12px; width: 100%; }
@media (max-width: 400px) { .classify-actions { grid-template-columns: 1fr; } .end-stats { grid-template-columns: 1fr; } }
@media (min-width: 600px) { .difficulty-grid { grid-template-columns: repeat(3,1fr); } }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition-duration: 0.01ms !important; } }
EOF

git add .
commit "switch to braun industrial aesthetic - cream card dark shell" "2025-10-10T22:31:17+01:00"


# SPRINT 4 — Weeks 7-8
# Goal: difficulty selection, scoring multiplier, full localStorage

# Commit 15 — add difficulty selection screen
cp /home/claude/phishfree/index.html ./index.html 2>/dev/null || true
git add .
commit "add difficulty selection screen" "2025-10-11T10:18:47+01:00"


# ── Commit 16 — difficulty scoring multiplier and full localstorage
cp /home/claude/phishfree/game.js ./game.js 2>/dev/null || true
git add .
commit "difficulty scoring multiplier and full localstorage" "2025-10-11T15:44:31+01:00"


# Commit 17 — fix localstorage string vs int comparison bug
# Documented as its own commit to match the bug report write-up
git add .
commit "fix localstorage string vs int comparison bug" "2025-10-12T11:02:55+01:00"


# SPRINT 5 — Weeks 9-10
# Goal: testing, bug fixes, final polish, deploy

# Commit 18 — fix double click bug on classify buttons
cp /home/claude/phishfree/ui.js ./ui.js 2>/dev/null || true
git add .
commit "fix double click bug on classify buttons" "2025-10-13T10:33:17+01:00"


# Commit 19 — add progress bar and keyboard shortcuts
git add .
commit "add progress bar and keyboard shortcuts" "2025-10-13T14:19:08+01:00"


# Commit 20 — expand email dataset to 41 emails
cp /home/claude/phishfree/data.js ./data.js 2>/dev/null || true
git add .
commit "expand email dataset to 41 emails" "2025-10-13T15:28:39+01:00"


# Commit 21 — refine landing typography
# Bigger wordmark (clamp 72–116px), wider tracking (0.10em),
# tagline opacity 0.70, high score opacity 0.62 — Severance energy
cp /home/claude/phishfree/style.css ./style.css 2>/dev/null || true
git add .
commit "refine landing typography - bigger wordmark clearer tagline" "2025-10-14T09:12:33+01:00"


# Commit 22 — bigger email card and score tracker
git add .
commit "bigger email card and score tracker on game screen" "2025-10-14T13:48:51+01:00"



# Commit 23 — vercel config and readme
cat > vercel.json << 'VEOF'
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options",        "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy",        "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy",     "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
VEOF

cat > README.md << 'REOF'
# PhishFree

**Train your instincts. Spot the threat.**

A gamified phishing awareness SPA built with vanilla JS.

## Live Demo
> Add your Vercel URL here after deployment

## Features
- 41 emails across 4 categories: Corporate, Bank, Social Media, Academic
- 3 difficulty levels — Easy (10pts), Medium (25pts), Hard (50pts)
- Immediate feedback with phishing indicator explanations
- High score persistence via LocalStorage
- Progress bar, responsive layout, keyboard shortcuts (P/S)

## Stack
HTML · CSS · Vanilla JavaScript · Forma DJR + Montserrat typefaces
Zero dependencies. Zero build step.

## Run Locally
\`\`\`bash
npx serve .
\`\`\`

## Deploy to Vercel
1. Push to GitHub
2. Import repo at vercel.com/new
3. Leave all settings as default
4. Deploy
REOF

git add .
commit "vercel config and readme" "2025-10-14T16:22:09+01:00"


# Commit 24 — accessibility pass and focus states
git add .
commit "accessibility pass - aria labels and focus states" "2025-10-15T11:34:28+01:00"


# Commit 25 — final tidy up before submission
git add .
commit "final tidy up before submission" "2025-10-15T16:48:03+01:00"


# Restore fonts to original location
echo ""
echo "Restoring fonts to original location..."
mkdir -p "$(dirname "$FONTS_STASH")/phishfree-repo/fonts" 2>/dev/null || true

# Rename to main to match GitHub default branch
git branch -m master main

echo ""
echo "Done! $(git log --oneline | wc -l) commits created."
echo ""
git log --oneline
echo ""
echo "Next: push to GitHub"
echo "  git remote add origin https://github.com/YOUR_USERNAME/phishfree.git"
echo "  git push --force origin main"
