import { getWorldOffset } from "./world.js";

let snowflakes = [];

export function initSnow(canvas) {
  snowflakes = Array.from({ length: 50 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 3 + 1,
    speed: Math.random() * 1 + 0.5
  }));
}

export function updateSnow(canvas) {
  snowflakes.forEach(flake => {
    flake.y += flake.speed;
    if (flake.y - getWorldOffset() > canvas.height) {
      flake.y = getWorldOffset() - flake.size;
      flake.x = Math.random() * canvas.width;
    }
  });
}

export function drawSnow(ctx) {
  ctx.fillStyle = "white";
  snowflakes.forEach(flake => {
    const screenY = flake.y - getWorldOffset();
    ctx.beginPath();
    ctx.arc(flake.x, screenY, flake.size, 0, Math.PI * 2);
    ctx.fill();
  });
}
