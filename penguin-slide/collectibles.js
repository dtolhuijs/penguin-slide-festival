const presentImage = new Image();
presentImage.src = "sprites/present.png";

const rockImage = new Image();
rockImage.src = "sprites/rock.png";


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
    const isRock = Math.random() < 0.3; // 30% chance rock

collectibles.push({
  type: isRock ? "rock" : "present",
  x: Math.random() * pathWidth + pathX,
  y: getWorldOffset() - 20,
  size: isRock ? 10 : 12,
  rotation: 0,
  speed: isRock ? 1.6 : 2
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
      if (c.type === "present") {
        score++;
      } else if (c.type === "rock") {
        score = Math.max(0, score - 1);
      }
    
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

    if (c.type === "present") {
      ctx.drawImage(
        presentImage,
        -size / 2,
        -size / 2,
        size,
        size
      );
    } else {
      // 🪨 Rock
      ctx.globalAlpha = 0.9;
      ctx.drawImage(
        rockImage,
        -size / 2,
        -size / 2,
        size,
        size
      );
    }
    

    ctx.restore();
  });

  // 🎁 Cozy score UI
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = "18px system-ui, sans-serif";
  ctx.fillText(`🎁 ${score}`, 20, 32);
}
