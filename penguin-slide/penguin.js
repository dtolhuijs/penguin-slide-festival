import { keys } from "./input.js";

let penguin;
let penguinImage;
let time = 0;

export function initPenguin(canvas) {
  penguin = {
    x: canvas.width / 2,
    screenY: canvas.height - 100,
    radius: 15,
    speedX: 3
  };

  penguinImage = new Image();
  penguinImage.src = "sprites/penguin.png";
}

export function updatePenguin(canvas) {
  time += 0.05;

  if (keys["ArrowLeft"]) penguin.x -= penguin.speedX;
  if (keys["ArrowRight"]) penguin.x += penguin.speedX;



  penguin.x = Math.max(
    penguin.radius,
    Math.min(canvas.width - penguin.radius, penguin.x)
  );
}

export function drawPenguin(ctx, canvas) {
  const wobble = Math.sin(time) * 2.5;
  const size = 40;

  ctx.drawImage(
    penguinImage,
    penguin.x + wobble - size / 2,
    penguin.screenY - size / 2,
    size,
    size
  );
}

export function getPenguin() {
  return penguin;
}
