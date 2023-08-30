const carouselInner = document.querySelector(".carousel-inner");
const carouselSlides = document.querySelectorAll(".carousel-slide");

let currentIndex = 0;

function showSlide(index) {
  carouselInner.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % carouselSlides.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + carouselSlides.length) % carouselSlides.length;
  showSlide(currentIndex);
}

setInterval(nextSlide, 2000); 

showSlide(currentIndex);
