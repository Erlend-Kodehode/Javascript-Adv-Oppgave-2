const box = document.querySelector("#box");
let x = 0;
let y = 0;
const speed = 5;
function updatePos() {
  y = parseInt(box.style.top.slice(0, box.style.top.indexOf("p")));
  x = parseInt(box.style.left.slice(0, box.style.left.indexOf("p")));
}

updatePos();

document.body.addEventListener("click", (e) => {
  box.style.top = `${e.y - box.offsetWidth / 2}px`;
  box.style.left = `${e.x - box.offsetHeight / 2}px`;
  updatePos();
});

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
    case "w":
      y -= speed;
      break;

    case "ArrowDown":
    case "s":
      y += speed;
      break;

    case "ArrowLeft":
    case "a":
      x -= speed;
      break;

    case "ArrowRight":
    case "d":
      x += speed;
      break;
  }
  box.style.top = `${y}px`;
  box.style.left = `${x}px`;
});
