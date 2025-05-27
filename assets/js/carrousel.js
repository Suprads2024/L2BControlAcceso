let onSlide = false;
let intervalId = null;

window.addEventListener("load", () => {
   startAutoSlide();

   const dots = document.querySelectorAll(".carousel_dot");
   dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
         stopAutoSlide();
         slide(i);
         startAutoSlide();
      });
   });

   const buttonPrev = document.querySelector(".carousel_button__prev");
   const buttonNext = document.querySelector(".carousel_button__next");
   buttonPrev.addEventListener("click", () => {
      stopAutoSlide();
      slide(getItemActiveIndex() - 1);
      startAutoSlide();
   });
   buttonNext.addEventListener("click", () => {
      stopAutoSlide();
      slide(getItemActiveIndex() + 1);
      startAutoSlide();
   });
});

function startAutoSlide() {
   intervalId = setInterval(() => {
      slide(getItemActiveIndex() + 1);
   }, 3000);
}

function stopAutoSlide() {
   if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
   }
}

function slide(toIndex) {
   if (onSlide) return;
   onSlide = true;

   const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
   const itemActive = document.querySelector(".carousel_item__active");
   const itemActiveIndex = itemsArray.indexOf(itemActive);
   let newItemActive = null;

   // Ciclo infinito: ajustar toIndex al rango correcto
   if (toIndex >= itemsArray.length) toIndex = 0;
   if (toIndex < 0) toIndex = itemsArray.length - 1;

   newItemActive = itemsArray[toIndex];

   // Limpia todas las clases de posición antes de aplicar nuevas
   itemsArray.forEach(item => {
      item.classList.remove("carousel_item__pos_next", "carousel_item__next", "carousel_item__pos_prev", "carousel_item__prev");
   });

   // Transición hacia la derecha
   if (toIndex > itemActiveIndex) {
      newItemActive.classList.add("carousel_item__pos_next");
      setTimeout(() => {
         newItemActive.classList.add("carousel_item__next");
         itemActive.classList.add("carousel_item__next");
      }, 20);
   } else { // Transición hacia la izquierda
      newItemActive.classList.add("carousel_item__pos_prev");
      setTimeout(() => {
         newItemActive.classList.add("carousel_item__prev");
         itemActive.classList.add("carousel_item__prev");
      }, 20);
   }

   // Temporizador de seguridad para limpiar el estado
   const safetyTimer = setTimeout(() => {
      onSlide = false;
   }, 1000);

   // Limpia clases y reactivación del nuevo item activo
   newItemActive.addEventListener("transitionend", () => {
      clearTimeout(safetyTimer);
      itemsArray.forEach(item => item.className = "carousel_item"); // Elimina todas las clases de posición
      newItemActive.classList.add("carousel_item", "carousel_item__active");
      onSlide = false;
   }, { once: true });

   slideIndicator(toIndex);
}

function getItemActiveIndex() {
   const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
   const itemActive = document.querySelector(".carousel_item__active");
   return itemsArray.indexOf(itemActive);
}

function slideIndicator(toIndex) {
   const dots = document.querySelectorAll(".carousel_dot");
   const dotActive = document.querySelector(".carousel_dot__active");
   const newDotActive = dots[toIndex];

   dotActive.classList.remove("carousel_dot__active");
   newDotActive.classList.add("carousel_dot__active");
}
