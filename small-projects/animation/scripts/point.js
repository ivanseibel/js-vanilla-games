var currentX = 100;
var currentY = 100;

const animate = () => {
  const ball = document.querySelector('#ball');
  ball.style.left = currentX + 'px';
  ball.style.top = currentY + 'px';

  currentX += 5;
  currentY += 5;

  if (currentX > window.innerWidth - 60 || currentY > window.innerHeight - 60) {
    currentX = 100;
    currentY = 100;
  }

  setTimeout(() => {
    animate();
  }, 30);
}

window.onload = animate;