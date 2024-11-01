const box = document.querySelector("#box");
const speedInput = document.querySelector("#speed");
const container = document.querySelector("#container");
const obstacles = document.querySelector("#obstacles");
const obstaclesInput = document.querySelector("#obstaclesInput");
const generateBtn = document.querySelector("#generateBtn");
const ui = document.querySelector("#ui");
const uiHeight = ui.getBoundingClientRect().height;
let x = 0;
let y = uiHeight;
let prevX = 0;
let prevY = 0;
let speed = parseInt(speedInput.value);
let obstaclesnum = parseInt(obstaclesInput.value);
let inElement = false;
const yLimit = container.offsetHeight - box.offsetHeight;
const xLimit = container.offsetWidth - box.offsetWidth;
const boxHeight = box.getBoundingClientRect().height;
const boxWidth = box.getBoundingClientRect().width;

function updatePos() {
  y = parseInt(box.style.top.slice(0, box.style.top.indexOf("p")));
  x = parseInt(box.style.left.slice(0, box.style.left.indexOf("p")));
}

function collisionDetect() {
  for (const obstacle of obstacles.children) {
    const obstX = obstacle.getBoundingClientRect().x;
    const obstY = obstacle.getBoundingClientRect().y;
    const obstWidth = obstacle.getBoundingClientRect().width;
    const obstHeight = obstacle.getBoundingClientRect().height;
    if (
      x + boxWidth / 2 > obstX - obstWidth / 2 &&
      x - boxWidth / 2 < obstX + obstWidth / 2 &&
      y + boxHeight / 2 > obstY - obstHeight / 2 &&
      y - boxHeight / 2 < obstY + obstHeight / 2
    ) {
      if (y < prevY) {
        y = obstY + obstHeight;
      } else if (y > prevY) {
        y = obstY - obstHeight;
      } else if (x < prevX) {
        x = obstX + obstWidth;
      } else if (x > prevX) {
        x = obstX - obstWidth;
      }
    }
  }
}

box.style.top = `${y}px`;
box.style.left = `${x}px`;

for (const element of ui.children) {
  element.addEventListener("mouseenter", () => (inElement = true));
  element.addEventListener("mouseleave", () => (inElement = false));
}

obstaclesInput.addEventListener(
  "input",
  () => (obstaclesnum = parseInt(obstaclesInput.value))
);

speedInput.addEventListener(
  "input",
  () => (speed = parseInt(speedInput.value))
);

generateBtn.addEventListener("click", () => {
  const obstacleContainer = obstacles.children;
  for (let i = obstacleContainer.length - 1; i >= 0; i--) {
    obstacleContainer[i].remove();
  }

  for (let i = 0; i < obstaclesnum; i++) {
    const obstacle = document.createElement("p");
    obstacle.className = "obstacle";
    obstacles.append(obstacle);
    obstacle.style.top = `${Math.floor(Math.random() * yLimit) + uiHeight}px`;
    obstacle.style.left = `${Math.floor(Math.random() * xLimit)}px`;
  }
});

document.body.addEventListener("click", (e) => {
  if (inElement) return;
  box.style.top = `${e.y - boxHeight / 2}px`;
  box.style.left = `${e.x - boxHeight / 2}px`;
  updatePos();
});

window.addEventListener("keydown", (e) => {
  prevY = y;
  prevX = x;
  switch (e.key) {
    case "ArrowUp":
    case "w":
      y = y - speed > uiHeight ? y - speed : uiHeight;
      break;

    case "ArrowDown":
    case "s":
      y = y + speed < yLimit ? y + speed : yLimit;
      break;

    case "ArrowLeft":
    case "a":
      x = x - speed > 0 ? x - speed : 0;
      break;

    case "ArrowRight":
    case "d":
      x = x + speed < xLimit ? x + speed : xLimit;
      break;
  }
  collisionDetect();

  box.style.top = `${y}px`;
  box.style.left = `${x}px`;
});
