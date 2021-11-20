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

const init = () => {
  playingArea = document.querySelector('#playingArea');
  paddle = document.querySelector('#paddle');
  ball = document.querySelector('#ball');
  score = document.querySelector('#score');

  playingArea.style.width = 'calc(100vw - 20px)';
  playingArea.style.height = 'calc(100vh - 20px)';

}

window.onload = init;