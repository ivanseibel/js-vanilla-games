var currentX = 100;
var currentY = 100;

var incrementX = 5;
var incrementY = 5;

const animate = () => {
  const ball = document.querySelector('#ball');
  ball.style.left = currentX + 'px';
  ball.style.top = currentY + 'px';

  currentX += incrementX;
  currentY += incrementY;

  if (currentX > window.innerWidth - 60 || currentX < 0)
    incrementX *= -1;

  if (currentY > window.innerHeight - 60 || currentY < 0)
    incrementY *= -1;


  console.log(currentX, currentY);

  setTimeout(() => {
    animate();
  }, 30);
}

window.onload = animate;