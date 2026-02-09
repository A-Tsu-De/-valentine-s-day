// Считаем "быстрое клацанье"
let clicks = [];
const LIMIT = 6;      // сколько кликов
const INTERVAL = 1800; // за сколько мс (1.8 сек)

const photos = document.querySelectorAll(".photo");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");

const canvas = document.getElementById("splash");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

photos.forEach(p => {
  p.addEventListener("click", () => {
    const now = Date.now();
    clicks.push(now);
    clicks = clicks.filter(t => now - t < INTERVAL);

    if (clicks.length >= LIMIT) {
      showJoke();
      clicks = [];
    }
  });
});

closeBtn.addEventListener("click", hideJoke);
overlay.addEventListener("click", (e) => {
  // чтобы клик по фону закрывал, а по карточке — нет
  if (e.target === overlay || e.target === canvas) hideJoke();
});

function showJoke() {
  overlay.classList.remove("hidden");
  drawSplash();
  // авто-скрытие через 3 сек
  setTimeout(hideJoke, 3000);
}

function hideJoke() {
  overlay.classList.add("hidden");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Комикс-брызги (без реализма)
function drawSplash() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // полупрозрачная "вуаль"
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // пятна-капли
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = 6 + Math.random() * 26;

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fill();
  }

  // несколько "брызг" лучиками
  for (let i = 0; i < 18; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const len = 40 + Math.random() * 140;
    const ang = Math.random() * Math.PI * 2;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    ctx.strokeStyle = "rgba(0,0,0,0.08)";
    ctx.lineWidth = 4 + Math.random() * 6;
    ctx.lineCap = "round";
    ctx.stroke();
  }
}