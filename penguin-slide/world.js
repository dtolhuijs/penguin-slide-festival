import { keys } from "./input.js";

let worldOffsetY = 0;
const baseScrollSpeed = 1.2;

let pathWidth = 240;
let pathX = 0;

let auroraTime = 0;


export function initWorld(canvas) {
  pathX = (canvas.width - pathWidth) / 2;
}

export function updateWorld() {
  let scrollSpeed = baseScrollSpeed;
  if (keys["ArrowUp"]) scrollSpeed -= 0.5;
  if (keys["ArrowDown"]) scrollSpeed += 0.5;


  scrollSpeed = Math.max(0.3, Math.min(scrollSpeed, 4));
  worldOffsetY += scrollSpeed;
  auroraTime += 0.002; // very slow, cozy movement
}

export function drawWorld(ctx, canvas) {
  // 🌌 Cozy winter sky
  // 🌌 Stronger winter sky (visibility test)
const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
skyGradient.addColorStop(0, "#050b14");   // very dark top
skyGradient.addColorStop(0.4, "#0b2a4a"); // strong blue
skyGradient.addColorStop(1, "#5fa3c8");   // bright horizon glow

ctx.fillStyle = skyGradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// 🌌 Aurora borealis (subtle & slow)
ctx.save();

const auroraGradient = ctx.createLinearGradient(
  0,
  0,
  canvas.width,
  0
);

// 🌫️ Horizon haze (soft transition between sky and ice)
ctx.save();

const hazeHeight = canvas.height * 0.25; // height of the blend zone
const hazeGradient = ctx.createLinearGradient(
  0,
  canvas.height - hazeHeight,
  0,
  canvas.height
);

hazeGradient.addColorStop(0, "rgba(255,255,255,0)");
hazeGradient.addColorStop(0.4, "rgba(220,240,255,0.15)");
hazeGradient.addColorStop(1, "rgba(255,255,255,0.35)");

ctx.fillStyle = hazeGradient;
ctx.fillRect(0, canvas.height - hazeHeight, canvas.width, hazeHeight);

ctx.restore();


const wave = Math.sin(auroraTime) * 0.2;

auroraGradient.addColorStop(0, `rgba(120,255,200,${0.04 + wave})`);
auroraGradient.addColorStop(0.5, `rgba(180,140,255,${0.06 - wave})`);
auroraGradient.addColorStop(1, `rgba(120,255,200,${0.04 + wave})`);

ctx.globalCompositeOperation = "lighter";
ctx.fillStyle = auroraGradient;
ctx.fillRect(0, 0, canvas.width, canvas.height * 0.6);

ctx.restore();

  // ❄️ Icy path gradient
  // ❄️ High-contrast ice path (visibility test)
const iceGradient = ctx.createLinearGradient(pathX, 0, pathX + pathWidth, 0);
iceGradient.addColorStop(0, "#bfe9ff");
iceGradient.addColorStop(0.2, "#ffffff");
iceGradient.addColorStop(0.8, "#ffffff");
iceGradient.addColorStop(1, "#bfe9ff");

// ❄️ Ice path gradient
ctx.fillStyle = iceGradient;
ctx.fillRect(pathX, 0, pathWidth, canvas.height);


// Bright edge (temporary)
ctx.strokeStyle = "rgba(255,255,255,0.25)";
ctx.lineWidth = 1.5;
ctx.strokeRect(pathX, 0, pathWidth, canvas.height);


}


export function getWorldOffset() {
  return worldOffsetY;
}

export function getPath() {
  return { pathX, pathWidth };
}
