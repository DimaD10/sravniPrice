const homeBlogSlider = document.querySelector(".blog-list")
  ? document.querySelector(".blog-list")
  : null;

window.addEventListener("resize", () => {
  checkBlogSlider();
});
window.addEventListener("load", () => {
  checkBlogSlider();
});

document.addEventListener("touchmove", (e) => {
  if (e.target.closest(".slider-init")) {
    let sliderParent = e.target.closest(".slider-init");
    let currentSlide;
    if (sliderParent.hasAttribute("data-current-slide")) {
      currentSlide = sliderParent.getAttribute("data-current-slide");
    } else {
      currentSlide = 0;
    }

    sliderParent.setAttribute("data-current-slide", currentSlide);
  }
});
document.addEventListener("touchend", (e) => {
  if (e.target.closest(".slider-init")) {
    let sliderParent = e.target.closest(".slider-init");
    let slides = sliderParent.querySelectorAll(".slider-slide");
    let scrollPos = sliderParent.getAttribute("data-scroll-pos");
    let newScrollPos = sliderParent.scrollLeft;

    let currentSlide = sliderParent.getAttribute("data-current-slide");
    let currentSlideWidth = slides[0].offsetWidth;
    let gap = window
      .getComputedStyle(sliderParent.querySelector(".slider-wrapper"))
      .getPropertyValue("gap");

    if (newScrollPos - scrollPos > 0) {
      if (newScrollPos - scrollPos > currentSlideWidth / 2) {
        if (currentSlide + 2 != slides.lenght) {
          currentSlide++;
        } else {
          currentSlide = slides.lenght - 1;
        }
        sliderParent.setAttribute("data-current-slide", currentSlide);

        updAttributes(sliderParent, currentSlideWidth, gap);
      } else {
        updAttributes(sliderParent, currentSlideWidth, gap);
      }
    } else {
      if (scrollPos - newScrollPos > currentSlideWidth / 2) {
        if (currentSlide - 1 >= 0) {
          currentSlide--;
        } else {
          currentSlide = 0;
        }
        sliderParent.setAttribute("data-current-slide", currentSlide);

        updAttributes(sliderParent, currentSlideWidth, gap);
      } else {
        updAttributes(sliderParent, currentSlideWidth, gap);
      }
    }
  }
});

// Functions

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

function updAttributes(sliderParent, currentSlideWidth, gap) {
  if (parseInt(sliderParent.getAttribute("data-current-slide")) == 0) {
    newScrollPos =
      sliderParent.getAttribute("data-current-slide") * currentSlideWidth;
  } else if (parseInt(sliderParent.getAttribute("data-current-slide")) == 1) {
    newScrollPos =
      sliderParent.getAttribute("data-current-slide") * currentSlideWidth + 10;
  } else {
    newScrollPos =
      sliderParent.getAttribute("data-current-slide") * currentSlideWidth +
      parseInt(gap) * sliderParent.getAttribute("data-current-slide");
  }

  sliderParent.setAttribute("data-scroll-pos", newScrollPos);

  sliderParent.scrollTo(sliderParent.getAttribute("data-scroll-pos"), 0);

  window.setTimeout(() => {
    sliderParent.scrollTo(sliderParent.getAttribute("data-scroll-pos"), 0);
  }, 100);
}

checkBlogSlider();
