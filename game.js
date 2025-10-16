'use strict';

class GameController {
  static EMAILS_PER_ROUND = 10;
  constructor() {
    this.emails = []; this.currentIndex = 0; this.score = 0;
    this.correctCount = 0; this.difficulty = 'easy'; this.hasAnswered = false; this.highScore = 0;
  }
  startRound() { this.emails = this._sampleEmails(); this.currentIndex = 0; this.score = 0; this.correctCount = 0; this.hasAnswered = false; }
  getCurrentEmail() { return this.emails[this.currentIndex] || null; }
  loadNextEmail()   { this.currentIndex++; this.hasAnswered = false; return this.getCurrentEmail(); }
  isRoundOver()     { return this.currentIndex >= GameController.EMAILS_PER_ROUND; }
  getProgress()     { return { current: this.currentIndex + 1, total: GameController.EMAILS_PER_ROUND, percentage: Math.round(((this.currentIndex + 1) / GameController.EMAILS_PER_ROUND) * 100) }; }
  checkAnswer(answer) {
    if (this.hasAnswered) return null; this.hasAnswered = true;
    const email = this.getCurrentEmail();
    const isCorrect = (answer === 'phishing') === email.isPhishing;
    if (isCorrect) { this.score += 10; this.correctCount++; }
    return { isCorrect, email, currentScore: this.score };
  }
  getRoundSummary() {
    const isNewRecord = this.score > this.highScore;
    if (isNewRecord) this.highScore = this.score;
    return { score: this.score, highScore: this.highScore, isNewRecord, correctCount: this.correctCount, total: GameController.EMAILS_PER_ROUND, accuracy: Math.round((this.correctCount / GameController.EMAILS_PER_ROUND) * 100) };
  }
  _sampleEmails() { return this._shuffle(EMAIL_DATA.filter(e => e.difficulty === this.difficulty)).slice(0, 10); }
  _shuffle(arr)   { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
}

GameController.prototype._loadHighScore = function () {
  try { const raw = localStorage.getItem('phishfree_highscore'); const p = parseInt(raw, 10); return isNaN(p) || p < 0 ? 0 : p; } catch { return 0; }
};
GameController.prototype._saveHighScore = function (score) {
  try { const safe = parseInt(score, 10); if (!isNaN(safe)) localStorage.setItem('phishfree_highscore', safe.toString()); } catch {}
};
