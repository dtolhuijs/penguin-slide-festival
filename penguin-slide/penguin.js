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

  // 🐧 Shadow
  ctx.save();
  ctx.globalAlpha = 0.25;
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.ellipse(
    penguin.x,
    penguin.screenY + 18,
    18,
    6,
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();
  ctx.restore();

  // ✨ Glow
  ctx.save();
  ctx.shadowColor = "rgba(255,255,255,0.4)";
  ctx.shadowBlur = 10;

  // 🐧 Penguin sprite
  ctx.drawImage(
    penguinImage,
    penguin.x + wobble - size / 2,
    penguin.screenY - size / 2,
    size,
    size
  );

  ctx.restore();
}


export function getPenguin() {
  return penguin;
}
