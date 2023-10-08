// Получите все слайдеры на странице
const sliders = document.querySelectorAll(".slider-init");

sliders.forEach((slider) => {
  const carousel = slider.querySelector(".slider-wrapper");
  const firstCardWidth = carousel.querySelector(".slider-slide").offsetWidth;

  let isDragging = false,
    startX,
    startScrollLeft,
    timeoutId;

  carousel.classList.add("no-transition");
  carousel.scrollLeft = carousel.offsetWidth;
  carousel.classList.remove("no-transition");

  const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  };

  const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);

  if (slider) {
    slider.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  }
});

window.addEventListener("resize", () => {
  checkBlogSliders();
});
window.addEventListener("load", () => {
  checkBlogSliders();

  document.querySelector('.hero-slider').classList.add('slider-init')
});

function checkBlogSliders() {
  const homeBlogSlider = document.querySelector(".blog-list");
  if (!homeBlogSlider) return;

  if (window.innerWidth < 767.98) {
    homeBlogSlider.classList.add("slider-init");
  } else {
    homeBlogSlider.classList.remove("slider-init");
  }
}
