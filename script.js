const photos = [
  "images/1.jpg.jpeg",
  "images/2.jpg.jpeg",
  "images/3.jpg.JPG",
  "images/4.jpg.JPG",
  "images/5.jpg.JPG",
  "images/6.jpg.JPG",
  "images/7.jpg.jpeg",
  "images/8.jpg.jpeg",
];

// DOM
const slide = document.getElementById("slide");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const slider = document.getElementById("slider");
const frame = document.getElementById("frame");
const counter = document.getElementById("counter");

const final = document.getElementById("final");
const restart = document.getElementById("restart");

const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("close");
const canvas = document.getElementById("splash");
const ctx = canvas.getContext("2d");

let index = 0;

// отображение
function setCounter() {
  counter.textContent = ${index + 1} / ${photos.length};
}
function showPhoto() {
  slide.src = photos[index];
  setCounter();
}

// финальный экран
function showFinal() {
  slider.classList.add("hidden");
  final.classList.remove("hidden");
}
function hideFinal() {
  final.classList.add("hidden");
  slider.classList.remove("hidden");
}

// пасхалка (быстрое листание)
let taps = [];
const LIMIT = 7;
const INTERVAL = 1700;

function registerFastAction() {
  const now = Date.now();
  taps.push(now);
  taps = taps.filter(t => now - t < INTERVAL);
  if (taps.length >= LIMIT) {
    showJoke();
    taps = [];
  }
}

// навигация
function goNext() {
  registerFastAction();

  if (index === photos.length - 1) {
    showFinal();
    return;
  }
  index += 1;
  showPhoto();
}

function goPrev() {
  registerFastAction();

  if (!final.classList.contains("hidden")) {
    hideFinal();
    index = photos.length - 1;
    showPhoto();
    return;
  }

  index = (index - 1 + photos.length) % photos.length;
  showPhoto();
}

next.addEventListener("click", goNext);
prev.addEventListener("click", goPrev);

restart.addEventListener("click", () => {
  index = 0;
  hideFinal();
  showPhoto();
});

// клавиши
window.addEventListener("keydown", (e) => {
  if (!overlay.classList.contains("hidden")) return;
  if (e.key === "ArrowRight") goNext();
  if (e.key === "ArrowLeft") goPrev();
});

// свайп
let touchStartX = null;
let touchStartY = null;
let touchStartTime = 0;

frame.addEventListener("touchstart", (e) => {
  if (!e.touches || e.touches.length !== 1) return;
  const t = e.touches[0];
  touchStartX = t.clientX;
  touchStartY = t.clientY;
  touchStartTime = Date.now();
}, { passive: true });

frame.addEventListener("touchend", (e) => {
  if (touchStartX === null || touchStartY === null) return;

  const t = e.changedTouches[0];
  const dx = t.clientX - touchStartX;
  const dy = t.clientY - touchStartY;
  const dt = Date.now() - touchStartTime;

  touchStartX = null;
  touchStartY = null;

  if (Math.abs(dy) > Math.abs(dx)) return;
  if (dt > 700) return;

  const THRESHOLD = 45;
  if (dx <= -THRESHOLD) goNext();
  if (dx >= THRESHOLD) goPrev();
}, { passive: true });

// overlay + брызги
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function showJoke() {
  overlay.classList.remove("hidden");
  drawSplash();
  setTimeout(hideJoke, 2800);
}

function hideJoke() {
  overlay.classList.add("hidden");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

closeBtn.addEventListener("click", hideJoke);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay || e.target === canvas) hideJoke();
});

function drawSplash() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 70; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = 6 + Math.random() * 30;

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fill();
  }
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