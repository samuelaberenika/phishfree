/*  PhishFree - ui.js
    Screen management, transitions, rendering, user interactions
*/

'use strict';

(function () {

  /*  STATE  */

  const game           = new GameController();
  let   activeScreen   = 'home';
  let   classifyLocked = false;

  /*  DOM REFERENCES  */

  const $  = id => document.getElementById(id);
  const $$ = sel => document.querySelectorAll(sel);

  const screens = {
    home:       $('screen-home'),
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

    prev.classList.add('exit');
    prev.classList.remove('active');

    setTimeout(() => {
      prev.classList.remove('exit');
      prev.removeAttribute('hidden');
      next.classList.add('active');
      activeScreen = id;
    }, 210);
  }

  /*  HOME SCREEN (landing.html content)  */

  const btnPlayNow = $('btn-play-now');
  if (btnPlayNow) {
    btnPlayNow.addEventListener('click', () => {
      game.setCategory(null);
      renderDifficulty();
      showScreen('difficulty');
    });
  }

  const btnHeroPlay = $('btn-hero-play');
  if (btnHeroPlay) {
    btnHeroPlay.addEventListener('click', () => {
      game.setCategory(null);
      renderDifficulty();
      showScreen('difficulty');
    });
  }

  const btnCtaPlay = $('btn-cta-play');
  if (btnCtaPlay) {
    btnCtaPlay.addEventListener('click', () => {
      game.setCategory(null);
      renderDifficulty();
      showScreen('difficulty');
    });
  }

  // Mission cards - Begin Mission buttons with data-category
  $$('.mission-btn[data-category]').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      game.setCategory(category);
      renderDifficulty();
      showScreen('difficulty');
    });
  });

  /*  SPLASH / LANDING SCREEN  */

  function renderLanding() {
    const hs   = game.highScore;
    const hsEl = $('landing-high-score');
    if (hsEl) hsEl.textContent = hs > 0 ? `Best score: ${hs}` : '';
  }

  const btnStart = $('btn-start');
  if (btnStart) {
    btnStart.addEventListener('click', () => {
      game.setCategory(null);
      renderDifficulty();
      showScreen('difficulty');
    });
  }

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

  const btnBackLanding = $('btn-back-landing');
  if (btnBackLanding) {
    btnBackLanding.addEventListener('click', () => {
      showScreen('home');
    });
  }

  /*  GAME SCREEN  */

  function renderGame() {
    const email = game.getCurrentEmail();
    if (!email) return;

    classifyLocked = false;
    $('btn-phishing').disabled = false;
    $('btn-safe').disabled     = false;

    const { current, total, percentage } = game.getProgress();
    $('game-progress-label').textContent = `Email ${current} of ${total}`;
    $('game-score-label').textContent    = `Score: ${game.score}`;
    $('progress-bar').style.width        = `${percentage}%`;

    const track = document.querySelector('.progress-track');
    if (track) track.setAttribute('aria-valuenow', percentage);

    $('email-from').textContent    = email.sender;
    $('email-subject').textContent = email.subject;
    $('email-body').textContent    = email.body;

    const body = $('email-body');
    if (body) body.scrollTop = 0;
  }

  // Exit game - returns to home screen
  const btnExitGame = $('btn-exit-game');
  if (btnExitGame) {
    btnExitGame.addEventListener('click', () => {
      showScreen('home');
    });
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

    $('feedback-icon').textContent = result.isCorrect ? '✓' : '✗';
    $('feedback-text').textContent = result.isCorrect ? 'Correct' : 'Incorrect';

    const pts = GameController.POINTS[game.difficulty];
    $('feedback-score-delta').textContent = result.isCorrect
      ? `+${pts} points  ·  Running score: ${result.currentScore}`
      : `No points  ·  Running score: ${result.currentScore}`;

    $('feedback-explanation').textContent = result.email.indicators;
  }

  /*  JSON flat file output - writes round result to phishfree_result.json  */
  function saveResult(summary) {
    const result = {
      date:       new Date().toISOString(),
      difficulty: summary.difficulty,
      category:   summary.category || 'all',
      score:      summary.score,
      accuracy:   summary.accuracy,
      correct:    summary.correctCount,
      total:      summary.total
    };
    const blob = new Blob(
      [JSON.stringify(result, null, 2)],
      { type: 'application/json' }
    );
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'phishfree_result.json';
    a.click();
  }

  $('btn-continue').addEventListener('click', () => {
    game.loadNextEmail();

    if (game.isRoundOver()) {
      const summary = game.getRoundSummary();
      saveResult(summary);
      renderEnd(summary);
      showScreen('end');
    } else {
      renderGame();
      showScreen('game');
    }
  });

  /*  END SCREEN  */

  function renderEnd(summary) {
    const title =
      summary.accuracy >= 90 ? 'Exceptional'       :
      summary.accuracy >= 70 ? 'Well Done'          :
      summary.accuracy >= 50 ? 'Keep At It'         :
      'More Practice Needed';

    $('end-title').textContent      = title;
    $('end-score').textContent      = summary.score;
    $('end-high-score').textContent = summary.highScore;
    $('end-accuracy').textContent   = `${summary.accuracy}%`;

    const recordEl = $('end-new-record');
    recordEl.hidden = !summary.isNewRecord;

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

  /*  KEYBOARD NAVIGATION - P/S keys as shortcuts for classify buttons  */

  document.addEventListener('keydown', e => {
    if (activeScreen !== 'game') return;
    if (e.key === '1' || e.key === 'p') handleClassify('phishing');
    if (e.key === '2' || e.key === 's') handleClassify('safe');
  });

  /*  INIT - load email dataset from JSON flat file before rendering  */

  loadEmails().then(() => {
    renderLanding();
  });

})();
