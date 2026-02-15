document.addEventListener("DOMContentLoaded", () => {

    const slide = document.getElementById("slide");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    const reactionEl = document.getElementById("reaction");
    const dropsLayer = document.getElementById("dropsLayer");
    const dropsSound = document.getElementById("dropsSound");

    if (!slide || !nextBtn || !prevBtn || !reactionEl) {
        console.error("Не найден основной элемент. Проверь id/class в HTML.");
        return;
    }

    // Фразы + звук
    const reactions = [
        { text: "Ммм...", sound: document.getElementById("sound1") },
        { text: "Даа...", sound: document.getElementById("sound2") },
        { text: "Еще...", sound: document.getElementById("sound3") },
        { text: "Быстрее 💕", sound: document.getElementById("sound4") },
        { text: "Не останавливайся... 💋", sound: document.getElementById("sound5") }
    ];

    const images = [
        "images/1.jpg",
        "images/2.jpg",
        "images/3.jpg",
        "images/4.jpg",
        "images/5.jpg",
        "images/6.jpg",
        "images/7.jpg",
        "images/8.jpg"
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
                setTimeout(() => dropsCooldown = false, 3000);
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
        reactionEl.classList.add("show");

        setTimeout(() => {
            reactionEl.classList.remove("show");
        }, 1500);

        // ЗВУК ФРАЗЫ
        if (selected.sound instanceof HTMLAudioElement) {
            try {
                selected.sound.currentTime = 0;
                selected.sound.volume = 1;
                selected.sound.play().catch(() => {});
            } catch {}
        }
    }

    function triggerDrops() {

        // 🔊 ЗВУК КАПЕЛЬ (без AbortError)
        if (dropsSound instanceof HTMLAudioElement) {
            try {
                dropsSound.currentTime = 0;
                dropsSound.volume = 0.7;
                dropsSound.loop = false;
                dropsSound.play().catch(() => {});
            } catch {}
        }

        if (!dropsLayer) return;

        const count = 800; // больше капель

        for (let i = 0; i < count; i++) {
            const drop = document.createElement("div");
            drop.className = "drop";

            drop.style.left = Math.random() * 100 + "vw";

            const scale = 0.6 + Math.random() * 1.8;
            drop.style.transform = 'scale(${scale})';

            const delay = Math.random() * 2;
            drop.style.animationDelay = delay + "s";

            const duration = 4 + Math.random() * 3; // медленнее
            drop.style.animationDuration = duration + "s";

            dropsLayer.appendChild(drop);

            const removeAfter = (delay + duration) * 1000 + 200;
            setTimeout(() => drop.remove(), removeAfter);
        }

        showFinalMessage();
    }

    function showFinalMessage() {
        reactionEl.textContent = "С праздником, любимый ❤️";
        reactionEl.style.left = "50%";
        reactionEl.style.top = "50%";
        reactionEl.classList.add("show");
    }

    // КНОПКИ
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

    showImage();

});