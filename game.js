'use strict';

class GameController {
  constructor() {
    this.emails = []; this.currentIndex = 0;
    this.score = 0; this.difficulty = 'easy'; this.hasAnswered = false;
  }
  startRound() { this.emails = this._sampleEmails(); this.currentIndex = 0; this.score = 0; this.hasAnswered = false; }
  getCurrentEmail() { return this.emails[this.currentIndex] || null; }
  loadNextEmail()   { this.currentIndex++; this.hasAnswered = false; return this.getCurrentEmail(); }
  isRoundOver()     { return this.currentIndex >= 10; }
  checkAnswer(answer) {
    if (this.hasAnswered) return null;
    this.hasAnswered = true;
    const email = this.getCurrentEmail();
    const isCorrect = (answer === 'phishing') === email.isPhishing;
    if (isCorrect) this.score += 10;
    return { isCorrect, email, currentScore: this.score };
  }
  _sampleEmails() { return this._shuffle(EMAIL_DATA.filter(e => e.difficulty === this.difficulty)).slice(0, 10); }
  _shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
}
