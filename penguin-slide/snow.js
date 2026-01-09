let snowLayers = [];


export function initSnow(canvas) {
  snowLayers = [
    // 🌨️ Far snow (tiny, slow)
    {
      alpha: 0.3,
      blur: 0,
      flakes: Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1 + 0.5,
        speed: Math.random() * 0.2 + 0.1
      }))
    },

    // ❄️ Mid snow (normal)
    {
      alpha: 0.6,
      blur: 0,
      flakes: Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.6 + 0.3
      }))
    },

    // 🌬️ Near snow (bigger, slightly blurred)
    {
      alpha: 0.9,
      blur: 4,
      flakes: Array.from({ length: 30 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 2,
        speed: Math.random() * 1 + 0.6
      }))
    }
  ];
}


export function updateSnow(canvas) {
  snowLayers.forEach(layer => {
    layer.flakes.forEach(flake => {
      flake.y += flake.speed; // ALWAYS fall down

      // Loop back to top
      if (flake.y > canvas.height + flake.size) {
        flake.y = -flake.size;
        flake.x = Math.random() * canvas.width;
      }
    });
  });
}


export function drawSnow(ctx) {
  snowLayers.forEach(layer => {
    ctx.save();
    ctx.globalAlpha = layer.alpha;
    ctx.fillStyle = "rgba(230,245,255,0.9)";
    ctx.shadowBlur = layer.blur;
    ctx.shadowColor = "rgba(255,255,255,0.6)";

    layer.flakes.forEach(flake => {
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  });
}


