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
let obstaclesNum = parseInt(obstaclesInput.value);
let inElement = false;
//gets the height and width of the box
const boxHeight = box.getBoundingClientRect().height;
const boxWidth = box.getBoundingClientRect().width;
// sets the limits for the x and y variables to be within the page accounting for the boxes width and height
const yLimit = container.getBoundingClientRect().height - boxHeight;
const xLimit = container.getBoundingClientRect().width - boxWidth;

function collisionDetect() {
  // goes through all the obstacles on the page
  for (const obstacle of obstacles.children) {
    const obstX = obstacle.getBoundingClientRect().x;
    const obstY = obstacle.getBoundingClientRect().y;
    const obstWidth = obstacle.getBoundingClientRect().width;
    const obstHeight = obstacle.getBoundingClientRect().height;
    //checks if the box is inside of an obstacle
    if (
      x + boxWidth > obstX &&
      x < obstX + obstWidth &&
      y + boxHeight > obstY &&
      y < obstY + obstHeight
    ) {
      //sets the x or the y to the correct edge of the box depending on the direction the box was heading
      if (y < prevY) {
        y = obstY + obstHeight;
      } else if (y > prevY) {
        y = obstY - boxHeight;
      } else if (x < prevX) {
        x = obstX + obstWidth;
      } else if (x > prevX) {
        x = obstX - boxWidth;
      }
    }
  }
}
// makes it so the box starts in the correct position
box.style.top = `${y}px`;
box.style.left = `${x}px`;

// disables click to position if the mouse is in any of the ui elements
for (const element of ui.children) {
  element.addEventListener("mouseenter", () => (inElement = true));
  element.addEventListener("mouseleave", () => (inElement = false));
}

// updates the speed variable whenever the input changes
speedInput.addEventListener(
  "input",
  () => (speed = parseInt(speedInput.value))
);

generateBtn.addEventListener("click", () => {
  //removes the previous obstacles
  const obstacleContainer = obstacles.children;
  for (let i = obstacleContainer.length - 1; i >= 0; i--) {
    obstacleContainer[i].remove();
  }

  //creates a number of obstacles determined by the input value
  obstaclesNum = parseInt(obstaclesInput.value);
  for (let i = 0; i < obstaclesNum; i++) {
    const obstacle = document.createElement("div");
    //gives it a class for styling
    obstacle.className = "obstacle";
    //gives it a random position
    obstacle.style.top = `${Math.floor(Math.random() * yLimit) + uiHeight}px`;
    obstacle.style.left = `${Math.floor(Math.random() * xLimit)}px`;

    obstacles.append(obstacle);
  }
});

//click to position
document.body.addEventListener("click", (e) => {
  //immediately returns if the mouse is in an ui element
  if (inElement) return;

  //offsets the coordinates to center the box
  const posY = e.y - boxHeight / 2;
  const posX = e.x - boxWidth / 2;
  //sets the position of the box to where the mouse clicked
  box.style.top = `${posY}px`;
  box.style.left = `${posX}px`;
  //updates the x and y variables
  x = posX;
  y = posY;
});

window.addEventListener("keydown", (e) => {
  //stores the x and y variables before they change
  prevY = y;
  prevX = x;

  //moves the box in a direction depending on which key was pressed
  switch (e.key) {
    case "ArrowUp":
    case "w":
      //checks if the next position is inside or above the top of the page and if it is, it sets the position to be against the edge instead
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

  //runs the collision detection
  collisionDetect();

  //updates the position
  box.style.top = `${y}px`;
  box.style.left = `${x}px`;
});
