import "./input.js";

import { initWorld, updateWorld, drawWorld } from "./world.js";
import { initPenguin, updatePenguin, drawPenguin, getPenguin } from "./penguin.js";
import { initSnow, updateSnow, drawSnow } from "./snow.js";
import { initCollectibles, updateCollectibles, drawCollectibles } from "./collectibles.js";


const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initWorld(canvas);
  initPenguin(canvas);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

initSnow(canvas);
initCollectibles();

function loop() {
  updateWorld();
  updatePenguin(canvas);
  updateSnow(canvas);
  updateCollectibles(canvas, getPenguin());

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawWorld(ctx, canvas);
  drawSnow(ctx);
  drawCollectibles(ctx);
  drawPenguin(ctx, canvas);

  requestAnimationFrame(loop);
}

loop();
