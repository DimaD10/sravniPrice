document.addEventListener("touchend", (e) => {
  if (e.target.closest(".slider-init")) {
    let slider = e.target.closest(".slider-init");

    checkCurrentSlide(slider);

    window.setTimeout(() => {
      checkCurrentSlide(slider);
    }, 300);
    window.setTimeout(() => {
      checkCurrentSlide(slider);
    }, 600);

    let observerOptions = {
      attributes: true,
      attributeFilter: ["data-current-slide"],
    };

    let observer = new MutationObserver(attributeChangeCallback);
    observer.observe(slider, observerOptions);
  }
});

window.addEventListener("resize", () => {
  checkBlogSliders();
});
window.addEventListener("load", () => {
  checkBlogSliders();

  document.querySelector(".hero-slider").classList.add("slider-init");
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

function attributeChangeCallback(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (
      mutation.type === "attributes" &&
      mutation.attributeName === "data-current-slide"
    ) {
      // Выполните ваш функционал здесь, когда атрибут изменится
      console.log(
        "Атрибут изменен:",
        mutation.target.getAttribute("data-current-slide")
      );
    }
  }
}

function checkCurrentSlide(slider) {
  let pos = slider
    .querySelectorAll(".slider-slide")
    [
      slider.querySelectorAll(".slider-slide").length - 1
    ].getBoundingClientRect().left;

  let slideWidth = slider.querySelectorAll(".slider-slide")[0].offsetWidth;
  let currentSlide =
    slider.querySelectorAll(".slider-slide").length -
    1 -
    Math.floor(pos / slideWidth);
  slider.setAttribute("data-current-slide", currentSlide);
}
