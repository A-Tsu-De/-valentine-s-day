addEventListener("click", (e) => {
  // клик по фону/канвасу закрывает, по карточке — нет
  if (e.target === overlay || e.target === canvas) hideJoke();
});

// Комикс/стекло-брызги: без реализма, просто эффект
function drawSplash() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // легкая вуаль
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // пятна
  for (let i = 0; i < 70; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = 6 + Math.random() * 30;

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fill();
  }

  // лучики-брызги
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const len = 50 + Math.random() * 160;
    const ang = Math.random() * Math.PI * 2;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    ctx.strokeStyle = "rgba(0,0,0,0.08)";
    ctx.lineWidth = 4 + Math.random() * 7;
    ctx.lineCap = "round";
    ctx.stroke();
  }
}

// старт
showPhoto();