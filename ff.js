const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    console.log('wrong u dumb !!');
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(1050, 1500);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => timeUp = true, 15000)
}

function bonk(e) {
  if(!e.isTrusted) return; // cheater!
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
  if (score === 10) {
    alert('🎉 You Won! YEHHHHHHHH');
    timeUp = true; // optional: stop game
  }
}


moles.forEach(mole => mole.addEventListener('click', bonk));