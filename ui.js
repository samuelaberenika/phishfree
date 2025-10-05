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
