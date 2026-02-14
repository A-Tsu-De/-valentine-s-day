const slide = document.getElementById("slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const reaction = document.getElementById("reaction");

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

function showImage() {
  slide.src = images[current];
}

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

function checkFastClick(){
    const now = Date.now();
    const diff = now - lastClickTime;

    if(lastClickTime !== 0 && diff < 300){
        showReaction();
    }
    lastClickTime = now;
}

function showReaction(){
    const messages = [
        "ohhhhhh...",
        "Не останавливайся",
        "Ещё...",
        "Дааа...",
        "Быстрее... мммм..."
    ];

const randomMessage = messages[Math.floor(Math.random() * messages.length)];
reaction.textContent = randomMessage;

const randomX = Math.random() * 60 + 20;
const randomY = Math.random() * 60 +20;

reaction.style.left = randomX + "%";
reaction.style.top = randomY + "%";

reaction.classList.add("show");

setTimeout(() => {
    reaction.classList.remove("show");
}, 1500);
}