let isAutoplay = true;

document.addEventListener("touchend", (e) => {
  if (e.target.closest(".slider-init") && !e.target.closest(".slider_fade")) {
    let slider = e.target.closest(".slider-init");

    checkCurrentSlide(slider);

    window.setTimeout(() => {
      checkCurrentSlide(slider);
    }, 100);
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
document.addEventListener("touchmove", (e) => {
  if (e.target.closest(".slider-init") && !e.target.closest(".slider_fade")) {
    let slider = e.target.closest(".slider-init");
    checkCurrentSlide(slider);
  }
});
document.addEventListener("touchstart", (e) => {
  if (
    e.target.closest(".slider-init") &&
    e.target.closest(".slider-init").classList.contains("hero-slider")
  ) {
    isAutoplay = false;
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("slider-bullet")) {
    let slider;
    if (e.target.closest(".hero")) {
      slider = e.target.closest(".hero").querySelector(".slider-init");
    } else if (e.target.closest(".product-banner")) {
      slider = e.target
        .closest(".product-banner")
        .querySelector(".slider-init");
    }
    let slideWidth = slider.querySelectorAll(".slider-slide")[0].offsetWidth;

    if (slider) {
      let bullets;
      if (e.target.closest(".hero")) {
        bullets = e.target
          .closest(".hero__bullets")
          .querySelectorAll(".slider-bullet");
      } else if (e.target.closest(".product-banner")) {
        bullets = e.target
          .closest(".product-banner")
          .querySelectorAll(".slider-bullet");
      }
      let clickedBulletIndex = Array.from(bullets).indexOf(e.target);
      slider.setAttribute("data-current-slide", clickedBulletIndex);

      slider
        .querySelector(".slider-wrapper")
        .scrollTo(parseInt(slideWidth) * parseInt(clickedBulletIndex), 0);

      if (e.target.closest(".hero")) {
        e.target
          .closest(".hero__bullets")
          .querySelectorAll(".slider-bullet")
          .forEach((el) => {
            el.classList.remove("slider-bullet_active");
          });
      } else if (e.target.closest(".product-banner")) {
        e.target
          .closest(".product-banner__bullets")
          .querySelectorAll(".slider-bullet")
          .forEach((el) => {
            el.classList.remove("slider-bullet_active");
          });
      }
      e.target.classList.add("slider-bullet_active");

      isAutoplay = false;
    }
  }

  if (e.target.classList.contains("slider-btn")) {
    let prevBtn = e.target
      .closest(".slider-parent")
      .querySelector(".slider-btn__prev");
    let nextBtn = e.target
      .closest(".slider-parent")
      .querySelector(".slider-btn__next");

    let slider = e.target
      .closest(".slider-parent")
      .querySelector(".slider-init");
    let currentSlide = slider.getAttribute("data-current-slide");
    let slideWidth = slider.querySelectorAll(".slider-slide")[0].offsetWidth;
    let sliderCount =
      slider.querySelectorAll(".slider-slide").length -
      Math.floor(slider.offsetWidth / slideWidth);

    if (e.target.classList.contains("slider-btn__next")) {
      if (parseInt(currentSlide) + 1 <= sliderCount) {
        slider.setAttribute("data-current-slide", parseInt(currentSlide) + 1);
        prevBtn.classList.remove("disable");

        slider
          .querySelector(".slider-wrapper")
          .scrollTo(
            parseInt(slider.getAttribute("data-current-slide")) *
              parseInt(slideWidth),
            0
          );

        if (parseInt(currentSlide) + 1 === sliderCount) {
          e.target.classList.add("disable");
        } else {
          e.target.classList.remove("disable");
        }
      }
    } else if (e.target.classList.contains("slider-btn__prev")) {
      if (parseInt(currentSlide) - 1 >= 0) {
        slider.setAttribute("data-current-slide", parseInt(currentSlide) - 1);
        nextBtn.classList.remove("disable");

        slider
          .querySelector(".slider-wrapper")
          .scrollTo(
            parseInt(slider.getAttribute("data-current-slide")) *
              parseInt(slideWidth),
            0
          );

        if (parseInt(currentSlide) - 1 === 0) {
          e.target.classList.add("disable");
        } else {
          e.target.classList.remove("disable");
        }
      }
    }
  }
});

window.addEventListener("resize", () => {
  checkBlogSliders();

  if (document.querySelector(".hero-slider")) {
    let heroSlider = document.querySelector(".hero-slider");
    heroSlider.style.height = `auto`;
  }
});
window.addEventListener("load", () => {
  checkBlogSliders();

  if (document.querySelector(".hero-slider")) {
    document.querySelector(".hero-slider").classList.add("slider-init");

    let heroSlider = document.querySelector(".hero-slider");
    heroSlider
      .querySelectorAll(".slider-slide")[0]
      .classList.add("slider-slide_active");
    heroSlider.style.height = `${
      heroSlider.querySelectorAll(".slider-slide")[0].offsetHeight
    }px`;

    let bullets = document.querySelector(".hero__bullets");

    for (
      let i = 0;
      i < heroSlider.querySelectorAll(".slider-slide").length;
      i++
    ) {
      let bullet = document.createElement("div");
      bullet.className = "slider-bullet";
      bullets.appendChild(bullet);

      heroSlider.querySelectorAll(".slider-slide")[
        i
      ].style.transform = `translateX(-${i * 100}%)`;
    }
    bullets
      .querySelectorAll(".slider-bullet")[0]
      .classList.add("slider-bullet_active");

    autoPlay(heroSlider);
  }
  if (document.querySelectorAll(".product-banner__slider").length > 0) {
    document.querySelectorAll(".product-banner__slider").forEach((slider) => {
      let bullets = slider
        .closest(".product-banner")
        .querySelector(".product-banner__bullets");

      for (
        let i = 0;
        i < slider.querySelectorAll(".slider-slide").length;
        i++
      ) {
        let bullet = document.createElement("div");
        bullet.className = "slider-bullet";
        bullets.appendChild(bullet);
      }
      bullets
        .querySelectorAll(".slider-bullet")[0]
        .classList.add("slider-bullet_active");
    });
  }

  document.querySelectorAll(".slider-parent").forEach((slider) => {
    let slideWidth = slider.querySelectorAll(".slider-slide")[0].offsetWidth;
    let gap = window
      .getComputedStyle(slider.querySelector(".slider-wrapper"))
      .getPropertyValue("gap");
    if (
      slider.offsetWidth >
      slideWidth * slider.querySelectorAll(".slider-slide").length +
        parseInt(gap) * slider.querySelectorAll(".slider-slide").length -
        parseInt(gap)
    ) {
      slider
        .closest(".slider-parent")
        .querySelectorAll(".slider-btn")
        .forEach((el) => {
          el.classList.add("disable");
        });
    } else {
      slider
        .closest(".slider-parent")
        .querySelector(".slider-btn__next")
        .classList.remove("disable");
    }
  });
});

document.addEventListener("mouseover", (e) => {
  if (
    e.target.closest(".product-banner") &&
    e.target.closest(".product-banner__bullets") &&
    e.target.closest(".slider-bullet") &&
    e.target.closest(".product-slides")
  ) {
    let mouseBullet = e.target.closest(".slider-bullet");
    let slider = e.target.closest(".slider-init");
    let bullets = slider.querySelectorAll(".slider-bullet");
    let sliderWidth = parseInt(
      slider.querySelectorAll(".slider-slide")[0].offsetWidth
    );

    let elPos = [...bullets].indexOf(mouseBullet);

    slider.setAttribute("data-current-slide", elPos);

    let observerOptions = {
      attributes: true,
      attributeFilter: ["data-current-slide"],
    };

    let observer = new MutationObserver(attributeChangeCallback);
    observer.observe(slider, observerOptions);

    slider.querySelector(".slider-wrapper").scrollTo(sliderWidth * elPos, 0);

    bullets.forEach((bullet) => {
      bullet.classList.remove("slider-bullet_active");
    });
    mouseBullet.classList.add("slider-bullet_active");
  }
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
      mutation.attributeName === "data-current-slide" &&
      mutation.target.classList.contains("hero-slider")
    ) {
      let slider = document.querySelector(".hero-slider");
      let currentSlideNum = mutation.target.getAttribute("data-current-slide");
      let bullets = document
        .querySelector(".hero__bullets")
        .querySelectorAll(".slider-bullet");
      bullets.forEach((el) => {
        el.classList.remove("slider-bullet_active");
      });
      bullets[parseInt(currentSlideNum)].classList.add("slider-bullet_active");

      slider.querySelectorAll(".slider-slide").forEach((el) => {
        el.classList.remove("slider-slide_active");
      });
      slider
        .querySelectorAll(".slider-slide")
        [parseInt(currentSlideNum)].classList.add("slider-slide_active");
      slider.style.height = `${
        slider.querySelectorAll(".slider-slide")[parseInt(currentSlideNum)]
          .offsetHeight
      }px`;
    } else if (
      mutation.type === "attributes" &&
      mutation.attributeName === "data-current-slide" &&
      mutation.target.classList.contains("product-banner__slider")
    ) {
      let currentSlideNum = mutation.target.getAttribute("data-current-slide");
      let bullets = mutation.target
        .closest(".product-banner")
        .querySelector(".product-banner__bullets")
        .querySelectorAll(".slider-bullet");
      bullets.forEach((el) => {
        el.classList.remove("slider-bullet_active");
      });
      bullets[parseInt(currentSlideNum)].classList.add("slider-bullet_active");
    }
  }
}

function checkCurrentSlide(slider) {
  let pos = slider
    .querySelectorAll(".slider-slide")
    [
      slider.querySelectorAll(".slider-slide").length - 1
    ].getBoundingClientRect().left;

  let sliderLeft = slider.getBoundingClientRect().left;

  let slideWidth = slider.querySelectorAll(".slider-slide")[0].offsetWidth;
  let currentSlide =
    slider.querySelectorAll(".slider-slide").length -
    1 -
    Math.floor((pos - sliderLeft) / slideWidth);

  if (slider.classList.contains("hero-slider")) {
    if (window.innerWidth < 767.98) {
      slider.setAttribute("data-current-slide", currentSlide);
    } else {
      slider.setAttribute(
        "data-current-slide",
        currentSlide + 1 <= slider.querySelectorAll(".slider-slide").length - 1
          ? currentSlide + 1
          : slider.querySelectorAll(".slider-slide").length - 1
      );
    }
  } else if (slider.classList.contains("product-banner__slider")) {
    slider.setAttribute("data-current-slide", currentSlide);
  } else {
    slider.setAttribute("data-current-slide", currentSlide);
  }
}

const autoPlay = (slider) => {
  let autoplaySpeed = !slider.getAttribute("data-autoplay-speed")
    ? 4000
    : slider.getAttribute("data-autoplay-speed");
  let slideWidth = slider.querySelectorAll(".slider-slide")[0].offsetWidth;
  let bullets = slider.closest(".hero").querySelectorAll(".slider-bullet");
  let currentSlide = 0;

  let observerOptions = {
    attributes: true,
    attributeFilter: ["data-current-slide"],
  };
  let observer = new MutationObserver(attributeChangeCallback);

  observer.observe(slider, observerOptions);

  const heroAutoplay = setInterval(() => {
    if (isAutoplay) {
      if (
        currentSlide + 1 <=
        slider.querySelectorAll(".slider-slide").length - 1
      ) {
        currentSlide = currentSlide + 1;
      } else {
        currentSlide = 0;
      }
      slider.setAttribute("data-current-slide", currentSlide);
      bullets.forEach((el) => [el.classList.remove("slider-bullet_active")]);
      bullets[currentSlide].classList.add("slider-bullet_active");

      slider
        .querySelector(".slider-wrapper")
        .scrollTo(slideWidth * currentSlide, 0);

      observer.observe(slider, observerOptions);
    }
  }, autoplaySpeed);
};
