/*  PhishFree - ui.js
   Screen management, transitions, rendering, user interactions
  */

'use strict';

(function () {

  /*  STATE  */

  const game          = new GameController();
  let   activeScreen  = 'landing';
  let   classifyLocked = false;

  /*  DOM REFERENCES  */

  const $  = id => document.getElementById(id);
  const $$ = sel => document.querySelectorAll(sel);

  const screens = {
    landing:    $('screen-landing'),
    difficulty: $('screen-difficulty'),
    game:       $('screen-game'),
    feedback:   $('screen-feedback'),
    end:        $('screen-end'),
  };

  /*  SCREEN TRANSITIONS - fade out current → fade in next  */

  function showScreen(id) {
    if (activeScreen === id) return;

    const prev = screens[activeScreen];
    const next = screens[id];
    if (!prev || !next) return;

    // Exit current
    prev.classList.add('exit');
    prev.classList.remove('active');

    setTimeout(() => {
      prev.classList.remove('exit');
      prev.removeAttribute('hidden'); // keep in DOM for transitions
      // Enter next
      next.classList.add('active');
      activeScreen = id;
    }, 210);
  }

  /*  LANDING SCREEN  */

  function renderLanding() {
    const hs   = game.highScore;
    const hsEl = $('landing-high-score');
    hsEl.textContent = hs > 0 ? `Best score: ${hs}` : '';
  }

  $('btn-start').addEventListener('click', () => {
    renderDifficulty();
    showScreen('difficulty');
  });

  /*  DIFFICULTY SCREEN  */

  function renderDifficulty() {
    $$('.difficulty-card').forEach(card => {
      card.classList.toggle('selected',
        card.dataset.difficulty === game.difficulty
      );
    });
  }

  $$('.difficulty-card').forEach(card => {
    card.addEventListener('click', () => {
      const diff = card.dataset.difficulty;
      game.setDifficulty(diff);
      game.startRound();
      renderGame();
      showScreen('game');
    });
  });

  $('btn-back-landing').addEventListener('click', () => {
    renderLanding();
    showScreen('landing');
  });

  /*  GAME SCREEN  */

  function renderGame() {
    const email = game.getCurrentEmail();
    if (!email) return;

    // Unlock classify buttons
    classifyLocked = false;
    $('btn-phishing').disabled = false;
    $('btn-safe').disabled     = false;

    // Progress
    const { current, total, percentage } = game.getProgress();
    $('game-progress-label').textContent = `Email ${current} of ${total}`;
    $('game-score-label').textContent    = `Score: ${game.score}`;
    $('progress-bar').style.width        = `${percentage}%`;

    // Update aria progressbar
    const track = document.querySelector('.progress-track');
    if (track) track.setAttribute('aria-valuenow', percentage);

    // Email content
    $('email-from').textContent    = email.sender;
    $('email-subject').textContent = email.subject;
    $('email-body').textContent    = email.body;

    // Scroll email body to top for each new email
    const body = $('email-body');
    if (body) body.scrollTop = 0;
  }

  /*  Double-click guard - disable both buttons immediately on first click  */
  function handleClassify(answer) {
    if (classifyLocked) return;
    classifyLocked = true;

    $('btn-phishing').disabled = true;
    $('btn-safe').disabled     = true;

    const result = game.checkAnswer(answer);
    if (!result) return;

    renderFeedback(result);
    showScreen('feedback');
  }

  $('btn-phishing').addEventListener('click', () => handleClassify('phishing'));
  $('btn-safe').addEventListener('click',     () => handleClassify('safe'));

  /*  FEEDBACK SCREEN  */

  function renderFeedback(result) {
    const panel = $('feedback-panel');
    panel.classList.remove('correct', 'incorrect');
    panel.classList.add(result.isCorrect ? 'correct' : 'incorrect');

    // Icon
    $('feedback-icon').textContent = result.isCorrect ? '✓' : '✗';

    // Verdict text
    $('feedback-text').textContent = result.isCorrect ? 'Correct' : 'Incorrect';

    // Score delta
    const pts = GameController.POINTS[game.difficulty];
    $('feedback-score-delta').textContent = result.isCorrect
      ? `+${pts} points  ·  Running score: ${result.currentScore}`
      : `No points  ·  Running score: ${result.currentScore}`;

    // Explanation
    $('feedback-explanation').textContent = result.email.indicators;
  }

  $('btn-continue').addEventListener('click', () => {
    game.loadNextEmail();

    if (game.isRoundOver()) {
      renderEnd();
      showScreen('end');
    } else {
      renderGame();
      showScreen('game');
    }
  });

  /*  END SCREEN  */

  function renderEnd() {
    const summary = game.getRoundSummary();

    // Dynamic title based on accuracy
    const title =
      summary.accuracy >= 90 ? 'Exceptional' :
      summary.accuracy >= 70 ? 'Well Done'   :
      summary.accuracy >= 50 ? 'Keep At It'  :
      'More Practice Needed';

    $('end-title').textContent      = title;
    $('end-score').textContent      = summary.score;
    $('end-high-score').textContent = summary.highScore;
    $('end-accuracy').textContent   = `${summary.accuracy}%`;

    const recordEl = $('end-new-record');
    recordEl.hidden = !summary.isNewRecord;

    // Sync landing high score
    const hsEl = $('landing-high-score');
    if (hsEl) {
      hsEl.textContent = summary.highScore > 0
        ? `Best score: ${summary.highScore}`
        : '';
    }
  }

  $('btn-play-again').addEventListener('click', () => {
    game.startRound();
    renderGame();
    showScreen('game');
  });

  $('btn-change-difficulty').addEventListener('click', () => {
    renderDifficulty();
    showScreen('difficulty');
  });

  /*  KEYBOARD NAVIGATION - Space/Enter on classify buttons respects the lock  */

  document.addEventListener('keydown', e => {
    if (activeScreen !== 'game') return;
    if (e.key === '1' || e.key === 'p') handleClassify('phishing');
    if (e.key === '2' || e.key === 's') handleClassify('safe');
  });

  /*  INIT  */

  renderLanding();

})();
