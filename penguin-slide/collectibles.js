const presentImage = new Image();
presentImage.src = "sprites/present.png";

import { getWorldOffset, getPath } from "./world.js";

let collectibles = [];
let spawnTimer = 0;
let score = 0;

export function initCollectibles() {
  collectibles = [];
}

export function updateCollectibles(canvas, penguin) {
  spawnTimer++;

  if (spawnTimer > 200) {
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
    const size = c.size * 3; // visual size of present

    ctx.save();
    ctx.translate(c.x, screenY);
    ctx.rotate(c.rotation);

    ctx.drawImage(
      presentImage,
      -size / 2,
      -size / 2,
      size,
      size
    );

    ctx.restore();
  });

  // 🎁 Cozy score UI
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = "18px system-ui, sans-serif";
  ctx.fillText(`🎁 ${score}`, 20, 32);
}
