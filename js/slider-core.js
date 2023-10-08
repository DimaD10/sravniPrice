const wrapper = document.querySelector(".slider-init");
const carousel = document.querySelector(".slider-wrapper");
const firstCardWidth = carousel.querySelector(".slider-slide").offsetWidth;
const carouselChildrens = [...carousel.children];
const homeBlogSlider = document.querySelector(".blog-list")
  ? document.querySelector(".blog-list")
  : null;

let isDragging = false,
  startX,
  startScrollLeft,
  timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

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
if (wrapper) {
  wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
}

window.addEventListener("resize", () => {
  checkBlogSlider();
});
window.addEventListener("load", () => {
  checkBlogSlider();
});

function checkBlogSlider() {
  if (window.innerWidth < 767.98) {
    if (homeBlogSlider != null) {
      homeBlogSlider.classList.add("slider-init");
    }
  } else {
    if (homeBlogSlider != null) {
      homeBlogSlider.classList.remove("slider-init");
    }
  }
}

console.log("test comment");