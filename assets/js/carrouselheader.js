// Variables para manejar el carrusel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;
const intervalTime = 5000; // 5 segundos

// Función para mostrar la diapositiva actual
function showSlide(index) {
  // Ocultar todas las diapositivas
  slides.forEach((slide) => slide.classList.remove('carousel-item-active'));

  // Asegúrate de que el índice esté dentro del rango
  currentSlide = index >= totalSlides ? 0 : index < 0 ? totalSlides - 1 : index;

  // Mostrar la diapositiva actual
  slides[currentSlide].classList.add('carousel-item-active');
}

// Función para mover la diapositiva
function moveSlide(direction) {
  showSlide(currentSlide + direction);
}

// Cambio automático cada 5 segundos
let autoSlide = setInterval(() => {
  moveSlide(1); // Siempre se mueve a la derecha
}, intervalTime);

// Pausar el carrusel al interactuar manualmente
document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
  clearInterval(autoSlide); // Pausa el auto-slide cuando el mouse está sobre el carrusel
});

// Reanudar el carrusel cuando se quita el mouse
document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => {
    moveSlide(1); // Reanuda el auto-slide
  }, intervalTime);
});