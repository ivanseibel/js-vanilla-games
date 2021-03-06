/*
  Variables for DOM elements
*/
var playingArea;
var paddle;
var ball;
var score;
var gearButton;
var controlsScreen;
var newButton;
var difficultySelect;
var doneButton;
var sound;
var music;

/*
  Variables for music elements
*/
var beepX;
var beepY;
var beepPaddle;
var beepGameOver;
var backgroundMusic;

/*
  Variables for game states
*/
var availableWidth;
var availableHeight;
var playingAreaWidth;
var playingAreaHeight;
var horizontalSpeed = 2;
var verticalSpeed = 2;
var paddleSpeed = 48;
var currentsScore = 0;
var timer;
var paddleLeft = 228;
var ballLeft = 100;
var ballTop = 8;
var isDragging = false;
var effectsEnabled = false;
var musicEnabled = false;

function initAudio() {
  // load audio files
  beepX = new Audio('assets/sounds/beepX.mp3');
  beepY = new Audio('assets/sounds/beepY.mp3');
  beepPaddle = new Audio('assets/sounds/beepPaddle.mp3');
  beepGameOver = new Audio('assets/sounds/beepGameOver.mp3');
  backgroundMusic = new Audio('assets/sounds/music.mp3');

  // turn off volume
  beepX.volume = 0;
  beepY.volume = 0;
  beepPaddle.volume = 0;
  beepGameOver.volume = 0;
  backgroundMusic.volume = 0;

  // play each file to grant permission
  beepX.play();
  beepY.play();
  beepPaddle.play();
  beepGameOver.play();
  backgroundMusic.play();

  // pause each file to store in memory for later
  beepX.pause();
  beepY.pause();
  beepPaddle.pause();
  beepGameOver.pause();
  backgroundMusic.pause();

  // set the volume back for next time
  beepX.volume = 0.5;
  beepY.volume = 0.5;
  beepPaddle.volume = 0.5;
  beepGameOver.volume = 0.5;
  backgroundMusic.volume = 0.5;
}

const layoutPage = () => {
  availableWidth = window.innerWidth;
  availableHeight = window.innerHeight;

  playingAreaWidth = availableWidth - 22;
  playingAreaHeight = availableHeight - 22;

  playingArea.style.width = playingAreaWidth + 'px';
  playingArea.style.height = playingAreaHeight + 'px';
}

const keyListener = (e) => {
  const keyCode = e.keyCode;
  if ((keyCode === 37 || keyCode === 65) && paddleLeft > 0) {
    paddleLeft -= paddleSpeed;

    if (paddleLeft < 0) {
      paddleLeft = 0;
    }
  } else if ((keyCode === 39 || keyCode === 68) && paddleLeft < playingAreaWidth - 64) {
    paddleLeft += paddleSpeed;

    if (paddleLeft > playingAreaWidth - 64) {
      paddleLeft = playingAreaWidth - 64;
    }
  }

  paddle.style.left = paddleLeft + 'px';
}

const moveBall = () => {
  ballLeft += horizontalSpeed;
  ballTop += verticalSpeed;
  ball.style.left = ballLeft + 'px';
  ball.style.top = ballTop + 'px';
}

const updateScore = () => {
  currentsScore += 5;
  score.innerHTML = `Score: ${currentsScore}`;
}

const render = () => {
  moveBall();
  updateScore();
}

const collisionX = () => {
  if (ballLeft < 4 || ballLeft > playingAreaWidth - 20) {
    playSound(beepX);
    return true;
  }

  return false;
}

const collisionY = () => {
  if (ballTop < 4) {
    playSound(beepY);
    return true;
  }

  if (ballTop > playingAreaHeight - 64) {
    if (ballLeft >= paddleLeft + 16 && ballLeft <= paddleLeft + 48) {
      if (horizontalSpeed < 0)
        horizontalSpeed = -2;
      else
        horizontalSpeed = 2;

      playSound(beepPaddle);

      return true;
    } else if (ballLeft >= paddleLeft && ballLeft < paddleLeft + 16) {
      if (horizontalSpeed < 0)
        horizontalSpeed = -8;
      else
        horizontalSpeed = 8;

      playSound(beepPaddle);

      return true;
    } else if (ballLeft > paddleLeft + 48 && ballLeft <= paddleLeft + 64) {
      if (horizontalSpeed < 0)
        horizontalSpeed = -8;
      else
        horizontalSpeed = 8;

      playSound(beepPaddle);

      return true;
    }
  }

  return false;
}

const detectCollision = () => {
  if (collisionX()) {
    horizontalSpeed *= -1;
  }
  if (collisionY()) {
    verticalSpeed *= -1;
  }
}

const difficulty = () => {
  if (currentsScore % 1000 === 0) {
    if (verticalSpeed > 0) {
      verticalSpeed += 2;
    } else {
      verticalSpeed -= 2;
    }
  }
}

const gameOver = () => {
  cancelAnimationFrame(timer);
  score.innerHTML = `Score: ${currentsScore}   Game Over!`;
  score.style.backgroundColor = 'rgb(128,0,0)';
  playSound(beepGameOver);
}

const start = () => {
  render();
  detectCollision();
  difficulty();

  if (ballTop < playingAreaHeight - 32) {
    timer = requestAnimationFrame(start);
  } else {
    gameOver();
  }
}

const mouseDown = (e) => {
  isDragging = true;
}

const mouseMove = (e) => {
  if (isDragging) {
    e.preventDefault();
    paddleLeft = e.clientX - 32 || e.targetTouches[0].pageX - 32;

    if (paddleLeft < 0) {
      paddleLeft = 0;
    } else if (paddleLeft > playingAreaWidth - 64) {
      paddleLeft = playingAreaWidth - 64;
    }

    paddle.style.left = paddleLeft + 'px';
  }
}

const mouseUp = (e) => {
  isDragging = false;
}

const showControls = () => {
  controlsScreen.style.display = 'block';
  cancelAnimationFrame(timer);
}

const hideControls = () => {
  controlsScreen.style.display = 'none';
  timer = requestAnimationFrame(start);
}

const setDifficultly = (difficulty) => {
  switch (difficulty) {
    case 0:
      verticalSpeed = 2;
      paddleSpeed = 48;
      break;

    case 1:
      verticalSpeed = 4;
      paddleSpeed = 32;
      break;

    case 2:
      verticalSpeed = 6;
      paddleSpeed = 16;
      break;

    default:
      verticalSpeed = 2;
      paddleSpeed = 48;
  }
}

const newGame = () => {
  ballTop = 8;
  currentsScore = 0;
  horizontalSpeed = 2;
  setDifficultly(difficultySelect.selectedIndex);
  score.style.backgroundColor = 'rgb(32,128,64)';
  hideControls();
}

const toggleSound = () => {
  if (!beepX)
    initAudio();

  effectsEnabled = !effectsEnabled;
}

const playSound = (soundObject) => {
  if (effectsEnabled)
    soundObject.play();
}

const toggleMusic = () => {
  if (!backgroundMusic)
    initAudio();

  if (musicEnabled) {
    backgroundMusic.pause();
  } else {
    backgroundMusic.loop = true;
    backgroundMusic.play();
  }

  musicEnabled = !musicEnabled;
}

const init = () => {
  playingArea = document.querySelector('#playingArea');
  paddle = document.querySelector('#paddle');
  ball = document.querySelector('#ball');
  score = document.querySelector('#score');
  gearButton = document.querySelector('#gear');
  controlsScreen = document.querySelector('#controls');
  newButton = document.querySelector('#new');
  difficultySelect = document.querySelector('#difficulty');
  doneButton = document.querySelector('#done');
  sound = document.querySelector('#sound');
  music = document.querySelector('#music');

  document.addEventListener('keydown', keyListener, false);

  playingArea.addEventListener('mousedown', mouseDown, false);
  playingArea.addEventListener('mousemove', mouseMove, false);
  playingArea.addEventListener('mouseup', mouseUp, false);

  playingArea.addEventListener('touchstart', mouseDown, false);
  playingArea.addEventListener('touchmove', mouseMove, false);
  playingArea.addEventListener('touchend', mouseUp, false);

  gearButton.addEventListener('click', showControls, false);
  newButton.addEventListener('click', newGame, false);
  doneButton.addEventListener('click', hideControls, false);
  difficultySelect.addEventListener('change', () => {
    setDifficultly(difficultySelect.selectedIndex);
  }, false);

  sound.addEventListener('click', toggleSound, false);
  music.addEventListener('click', toggleMusic, false);

  layoutPage();

  timer = requestAnimationFrame(start);
}

window.onload = init;
window.onresize = layoutPage;