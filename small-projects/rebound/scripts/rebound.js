var playingArea;
var paddle;
var ball;
var score;

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

const layoutPage = () => {
  availableWidth = window.innerWidth;
  availableHeight = window.innerHeight;

  playingAreaWidth = availableWidth - 22;
  playingAreaHeight = availableHeight - 22;

  playingArea.style.width = playingAreaWidth + 'px';
  playingArea.style.height = playingAreaHeight + 'px';
}

const init = () => {
  playingArea = document.querySelector('#playingArea');
  paddle = document.querySelector('#paddle');
  ball = document.querySelector('#ball');
  score = document.querySelector('#score');

  layoutPage();
}

window.onload = init;
window.onresize = layoutPage;