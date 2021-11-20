var ballNumber = 1;

const ballArray = new Array();

for (var i = 0; i < 23; i++) {
  const newBall = new Image();
  newBall.src = `./images/begin/images/ball${i}.gif`;
  ballArray.push(newBall);
}

const rotateBall = () => {
  if (ballNumber > ballArray.length - 1)
    ballNumber = 0;

  document.querySelector('#ball').src = ballArray[ballNumber].src;
  ballNumber++;
  setTimeout('rotateBall()', 50);
}

window.onload = rotateBall;