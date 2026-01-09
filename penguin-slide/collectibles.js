import { getWorldOffset, getPath } from "./world.js";

let collectibles = [];
let spawnTimer = 0;
let score = 0;

export function initCollectibles() {
  collectibles = [];
}

export function updateCollectibles(canvas, penguin) {
  spawnTimer++;

  if (spawnTimer > 120) {
    const { pathX, pathWidth } = getPath();
    collectibles.push({
      x: Math.random() * pathWidth + pathX,
      y: getWorldOffset() - 20,
      size: 12,
      rotation: 0,
      speed: 2
    });
    spawnTimer = 0;
  }

  collectibles.forEach((c, i) => {
    c.y += c.speed;
    c.rotation += 0.1;

    const screenY = c.y - getWorldOffset();
    const dx = c.x - penguin.x;
    const dy = screenY - penguin.screenY;

    if (Math.sqrt(dx * dx + dy * dy) < penguin.radius + c.size) {
      score++;
      collectibles.splice(i, 1);
    }
  });
}

export function drawCollectibles(ctx) {
  collectibles.forEach(c => {
    const screenY = c.y - getWorldOffset();
    ctx.save();
    ctx.translate(c.x, screenY);
    ctx.rotate(c.rotation);

    ctx.fillStyle = "#ff6b6b";
    ctx.beginPath();
    ctx.arc(0, 0, c.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  });

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);
}
