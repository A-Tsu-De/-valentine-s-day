const images = ["1.jpg", "2.jpg", "3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg"]; // Массив фото
let currentIndex = 0; // Индекс текущей картинки
const imgElement = document.getElementById("image");

// Функция переключения
function changeImage(direction) {
    currentIndex += direction;

    // Зацикливание: если конец, то в начало
    if (currentIndex >= images.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = images.length - 1;

    imgElement.src = images[currentIndex]; // Смена src [1]
}

// Обработчики событий
document.getElementById("prev").addEventListener("click", () => changeImage(-1));
document.getElementById("next").addEventListener("click", () => changeImage(1));