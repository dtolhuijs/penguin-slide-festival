import { keys } from "./input.js";

let worldOffsetY = 0;
const baseScrollSpeed = 1.2;

let pathWidth = 240;
let pathX = 0;

export function initWorld(canvas) {
  pathX = (canvas.width - pathWidth) / 2;
}

export function updateWorld() {
  let scrollSpeed = baseScrollSpeed;
  if (keys["ArrowUp"]) scrollSpeed -= 0.5;
  if (keys["ArrowDown"]) scrollSpeed += 0.5;

  scrollSpeed = Math.max(0.3, Math.min(scrollSpeed, 4));
  worldOffsetY += scrollSpeed;
}

export function drawWorld(ctx, canvas) {
  ctx.fillStyle = "#e8f6ff";
  ctx.fillRect(pathX, 0, pathWidth, canvas.height);
}

export function getWorldOffset() {
  return worldOffsetY;
}

export function getPath() {
  return { pathX, pathWidth };
}
