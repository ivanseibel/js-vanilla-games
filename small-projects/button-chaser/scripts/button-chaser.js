var
  score = 0,
  iterations = 0,
  availableWidth,
  availableHeight,
  timer;

const detectHit = (e) => {
  score++;
  document.querySelector("#score-label").innerHTML = `Score: ${score}`;
}

const moveDot = () => {
  console.log("moveDot");
  let x = Math.floor(Math.random() * availableWidth);
  let y = Math.floor(Math.random() * availableHeight);

  if (x < 10) {
    x = 10;
  }

  if (y < 10) {
    y = 10;
  }

  document.querySelector("#dot").style.left = x + "px";
  document.querySelector("#dot").style.top = y + "px";

  if (iterations < 30) {
    timer = setTimeout(moveDot, 1000);
  } else {
    document.querySelector("#score-label").innerHTML += " GAME OVER";
    document.querySelector("#dot").removeEventListener("click", detectHit);
    clearTimeout(timer);
  }

  iterations++;
}

const setGameAreaBounds = () => {
  availableWidth = window.innerWidth;
  availableHeight = window.innerHeight;
  availableWidth -= 22;
  availableHeight -= 97;

  document.querySelector("#game-area").style.width = availableWidth + "px";
  document.querySelector("#game-area").style.height = availableHeight + "px";

  document.querySelector("#dot").style.display = "block";
  document.querySelector("#dot").addEventListener("click", detectHit);

  availableWidth -= 74;
  availableHeight -= 74;
  moveDot();
}

window.addEventListener("load", setGameAreaBounds);