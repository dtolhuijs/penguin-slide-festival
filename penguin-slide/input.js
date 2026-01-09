export const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
  console.log("KEY DOWN:", e.key);
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
  console.log("KEY UP:", e.key);
});
