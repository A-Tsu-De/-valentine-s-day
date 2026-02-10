document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM loaded, script running");

  const photos = [
    "images/1.jpg",
    "images/2.jpg",
    "images/3.jpg",
    "images/4.jpg",
    "images/5.jpg",
    "images/6.jpg",
    "images/7.jpg",
    "images/8.jpg",
  ];

  const slide = document.getElementById("slide");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const counter = document.getElementById("counter");

  console.log({ slide, prev, next, counter });

  if (!slide  !prev  !next || !counter) {
    alert("❌ Не найдены элементы. Проверь id: slide/prev/next/counter в index.html");
    return;
  }

  let index = 0;

  function render() {
    slide.src = photos[index];
    counter.textContent = ${index + 1} / ${photos.length};
    console.log("➡️ render", index, slide.src);
  }

  next.addEventListener("click", () => {
    console.log("👉 NEXT click");
    index = (index + 1) % photos.length;
    render();
  });

  prev.addEventListener("click", () => {
    console.log("👈 PREV click");
    index = (index - 1 + photos.length) % photos.length;
    render();
  });

  // Если картинка не грузится — покажем это в консоли
  slide.addEventListener("error", () => {
    console.error("❌ Не загрузилась картинка:", slide.src);
    alert("Не загрузилась картинка: " + slide.src);
  });

  render();
});