// Select the elements on the page - canvas, shake button

// canvas is the element
const canvas = document.querySelector('#etch-a-sketch');
// place we do the drawing is the context
const ctx = canvas.getContext('2d');

const shakeButton = document.querySelector('.shake');

const moveAmount = 10;

// Setup canvas for drawing
const { width, height } = canvas;

// create random x and y starting points on the canvas. Math.floor generates whole number
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = moveAmount;

let hue = 50;
ctx.strokeStyle = `hsl(100, 100%, 50%)`;

ctx.beginPath(); // start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke(); // draws a line

// Write a draw function
// function draw(options) {
//   console.log(options.key);
// }
// use destructuring
function draw({ key }) {
  hue += 5;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  ctx.beginPath();
  ctx.moveTo(x, y);
  switch (key) {
    case 'ArrowUp':
      y -= moveAmount;
      break;
    case 'ArrowDown':
      y += moveAmount;
      break;
    case 'ArrowLeft':
      x -= moveAmount;
      break;
    case 'ArrowRight':
      x += moveAmount;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}
// Write a handler for the keys
function handleKey(event) {
  if (event.key.includes('Arrow')) {
    event.preventDefault();
    draw({ key: event.key });
  }
}

// Clear / Shake function
function clearCanvas() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    'animationend',
    function () {
      canvas.classList.remove('shake');
    },
    { once: true }
  );
}
// Listen for key presses
window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);

