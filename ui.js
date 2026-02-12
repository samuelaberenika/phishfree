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
