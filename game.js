/*  PhishFree - game.js
   GameController: game state, scoring, LocalStorage, email sampling
  */

'use strict';

class GameController {

  static EMAILS_PER_ROUND = 10;

  static POINTS = {
    easy:   10,
    medium: 25,
    hard:   50,
  };

  static STORAGE = {
    highScore:  'phishfree_highscore',
    difficulty: 'phishfree_difficulty',
  };

  constructor() {
    this.difficulty     = this._loadDifficulty();
    this.emails         = [];
    this.currentIndex   = 0;
    this.score          = 0;
    this.correctCount   = 0;
    this.highScore      = this._loadHighScore();
    this.hasAnswered    = false;
  }

  /*  SETUP  */

  setDifficulty(difficulty) {
    this.difficulty = difficulty;
    this._saveDifficulty(difficulty);
  }

  startRound() {
    this.emails       = this._sampleEmails();
    this.currentIndex = 0;
    this.score        = 0;
    this.correctCount = 0;
    this.hasAnswered  = false;
  }

  /*  EMAIL NAVIGATION  */

  getCurrentEmail() {
    return this.emails[this.currentIndex] || null;
  }

  loadNextEmail() {
    this.currentIndex++;
    this.hasAnswered = false;
    return this.getCurrentEmail();
  }

  isRoundOver() {
    return this.currentIndex >= GameController.EMAILS_PER_ROUND;
  }

  getProgress() {
    const current = this.currentIndex + 1;
    const total   = GameController.EMAILS_PER_ROUND;
    return {
      current,
      total,
      percentage: Math.round((current / total) * 100),
    };
  }

  /*  ANSWER CHECKING  */

  /**
   * @param {string} answer - 'phishing' | 'safe'
   * @returns {{ isCorrect, email, scoreDelta, currentScore } | null}
   */
  checkAnswer(answer) {
    if (this.hasAnswered) return null;

    const email = this.getCurrentEmail();
    if (!email) return null;

    this.hasAnswered = true;

    const isCorrect  = (answer === 'phishing') === email.isPhishing;
    const scoreDelta = isCorrect ? GameController.POINTS[this.difficulty] : 0;

    if (isCorrect) {
      this.score += scoreDelta;
      this.correctCount++;
    }

    return {
      isCorrect,
      email,
      scoreDelta,
      currentScore: this.score,
    };
  }

  /*  ROUND SUMMARY  */

  getRoundSummary() {
    const isNewRecord = this.score > this.highScore;

    if (isNewRecord) {
      this.highScore = this.score;
      this._saveHighScore(this.score);
    }

    return {
      score:        this.score,
      highScore:    this.highScore,
      isNewRecord,
      correctCount: this.correctCount,
      total:        GameController.EMAILS_PER_ROUND,
      accuracy:     Math.round((this.correctCount / GameController.EMAILS_PER_ROUND) * 100),
      difficulty:   this.difficulty,
    };
  }

  /*  LOCALSTORAGE - parseInt() enforced on every read  */

  _loadHighScore() {
    try {
      const raw    = localStorage.getItem(GameController.STORAGE.highScore);
      const parsed = parseInt(raw, 10);
      return isNaN(parsed) || parsed < 0 ? 0 : parsed;
    } catch {
      return 0;
    }
  }

  _saveHighScore(score) {
    try {
      const safe = parseInt(score, 10);
      if (!isNaN(safe)) {
        localStorage.setItem(GameController.STORAGE.highScore, safe.toString());
      }
    } catch {
      // Storage unavailable - silently continue
    }
  }

  _loadDifficulty() {
    try {
      const raw   = localStorage.getItem(GameController.STORAGE.difficulty);
      const valid = ['easy', 'medium', 'hard'];
      return valid.includes(raw) ? raw : null;
    } catch {
      return null;
    }
  }

  _saveDifficulty(difficulty) {
    try {
      const valid = ['easy', 'medium', 'hard'];
      if (valid.includes(difficulty)) {
        localStorage.setItem(GameController.STORAGE.difficulty, difficulty);
      }
    } catch {
      // Storage unavailable - silently continue
    }
  }

  /*  EMAIL SAMPLING - balanced phishing/safe mix  */

  _sampleEmails() {
    const pool = EMAIL_DATA.filter(e => e.difficulty === this.difficulty);

    const phishing = this._shuffle(pool.filter(e => e.isPhishing));
    const safe     = this._shuffle(pool.filter(e => !e.isPhishing));

    // Aim for ~60% phishing / 40% safe to mirror real-world threat ratio
    const phishCount = Math.min(6, phishing.length);
    const safeCount  = Math.min(
      GameController.EMAILS_PER_ROUND - phishCount,
      safe.length
    );

    const combined = [
      ...phishing.slice(0, phishCount),
      ...safe.slice(0, safeCount),
    ];

    // Fill remaining slots if pool is thin
    if (combined.length < GameController.EMAILS_PER_ROUND) {
      const extra = this._shuffle(pool)
        .filter(e => !combined.includes(e))
        .slice(0, GameController.EMAILS_PER_ROUND - combined.length);
      combined.push(...extra);
    }

    return this._shuffle(combined).slice(0, GameController.EMAILS_PER_ROUND);
  }

  _shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
