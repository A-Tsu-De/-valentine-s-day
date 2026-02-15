const slide = document.getElementById("slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const reactionEl = document.getElementById("reaction");
const dropsLayer = document.getElementById("dropsLayer");
const dropsSound = document.getElementById("dropsSound");

if (!slide || !nextBtn || !prevBtn || !reactionEl) {
  console.error("Не найден основной элемент. Проверь id/class в HTML.");
}

// Фразы + звук
const reactions = [
  { text: "Ммм…", sound: document.getElementById("sound1") },
  { text: "Даа…", sound: document.getElementById("sound2") },
  { text: "Ещё…", sound: document.getElementById("sound3") },
  { text: "Быстрее ❤️", sound: document.getElementById("sound4") },
  { text: "Не останавливайся…", sound: document.getElementById("sound5") },
];

const images = [
  "images/1.jpg",
  "images/2.jpg",
  "images/3.jpg",
  "images/4.jpg",
  "images/5.jpg",
  "images/6.jpg",
  "images/7.jpg",
  "images/8.jpg",
];

let current = 0;
let lastClickTime = 0;
let fastClickStreak = 0;
let streakResetTimer = null;
let dropsCooldown = false;

function showImage() {
  slide.src = images[current];
}

function checkFastClick() {
  const now = Date.now();
  const diff = now - lastClickTime;

  const FAST_MS = 600;

  if (lastClickTime !== 0 && diff < FAST_MS) {
    fastClickStreak++;
    showReaction();

    if (fastClickStreak >= 30 && !dropsCooldown) {
      triggerDrops();
      dropsCooldown = true;
      setTimeout(() => (dropsCooldown = false), 2500);
      fastClickStreak = 0;
    }
  } else {
    fastClickStreak = 0;
  }

  lastClickTime = now;

  if (streakResetTimer) clearTimeout(streakResetTimer);
  streakResetTimer = setTimeout(() => {
    fastClickStreak = 0;
  }, 1200);
}

function showReaction() {
  const randomIndex = Math.floor(Math.random() * reactions.length);
  const selected = reactions[randomIndex];

  reactionEl.textContent = selected.text;

  const randomX = Math.random() * 60 + 20;
  const randomY = Math.random() * 60 + 20;
  reactionEl.style.left = randomX + "%";
  reactionEl.style.top = randomY + "%";

  reactionEl.classList.add("show");
  reactionEl.classList.add("sync");
  setTimeout(() => reactionEl.classList.remove("sync"), 120);

// 🔊 ЗВУК
if (selected.sound instanceof HTMLAudioElement) {

  try {
    selected.sound.pause();        // остановить если уже играл
    selected.sound.currentTime = 0;
    selected.sound.volume = 1;
    selected.sound.muted = false;

    const playPromise = selected.sound.play();

    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.log("Play blocked:", err);
      });
    }

  } catch (err) {
    console.log("Audio error:", err);
  }
}

  setTimeout(() => {
    reactionEl.classList.remove("show");
  }, 1500);
}

function triggerDrops() {
    if(dropsSound){
        dropsSound.pause();
        dropsSound.currentTime = 0;
        dropsSound.volume = 3;
        dropsSound.play().catch(err => {
            confirm.log("Drops sound error:", err);
        });
    }
  if (!dropsLayer) {
    console.error("dropsLayer не найден — добавь <div id='dropsLayer' ...> в HTML");
    return;
  }

  const count = 600;

  for (let i = 0; i < count; i++) {
    const drop = document.createElement("div");
    drop.className = "drop";

    drop.style.left = Math.random() * 100 + "vw";

    const s = 0.7 + Math.random() * 1.6;
    drop.style.transform = 'scale(${s})';

    const delay = Math.random() * 1.2;
    drop.style.animationDelay = delay + "s";

    const dur = 2.6 + Math.random() * 2.2;
    drop.style.animationDuration = dur + "s";

    dropsLayer.appendChild(drop);

    const removeAfter = (delay + dur) * 1000 + 100;
    setTimeout(() => drop.remove(), removeAfter);
  }

  // финальная фраза
  showFinalMessage();
  setTimeout(() => {
    dropsSound.pause(0.5);
    dropsSound.currentTime = 0;
    dropsSound.loop = false;
  }, 4000);
}

function showFinalMessage() {
  reactionEl.textContent = "С праздником, любимый ❤️";
  reactionEl.style.left = "50%";
  reactionEl.style.top = "50%";
  reactionEl.classList.add("show");
}

// кнопки
nextBtn.addEventListener("click", () => {
  current = (current + 1) % images.length;
  showImage();
  checkFastClick();
});

prevBtn.addEventListener("click", () => {
  current = (current - 1 + images.length) % images.length;
  showImage();
  checkFastClick();
});

// старт
showImage();