const scrollToTopBtn = document.querySelector(".scroll-to-top");
let prevScrollPos = window.scrollY;
const header = document.querySelector(".header");
const prodNav = document.querySelector(".product-nav");

document.addEventListener("scroll", () => {
  let scrollPos = window.scrollY;

  if (scrollPos > 300) {
    scrollToTopBtn.classList.add("active");
  } else {
    scrollToTopBtn.classList.remove("active");
  }

  if (scrollPos > prevScrollPos) {
    header.classList.add("hidden");
    if (prodNav) {
      if (
        scrollPos >
        document.querySelector(".prod-main").scrollTop +
          parseInt(document.querySelector(".prod-main").offsetHeight) +
          50
      ) {
        prodNav.classList.add("hidden");
      } else {
        prodNav.classList.remove("hidden");
      }
    }
  } else if (scrollPos < prevScrollPos) {
    header.classList.remove("hidden");
    if (prodNav) {
      prodNav.classList.remove("hidden");
    }
  }

  if (prodNav) {
    let prices = document.querySelector(".product-section__prices");
    let descr = document.querySelector(".product-section__characteristics");
    let reviews = document.querySelector(".product-section__reviews");

    let points = prodNav.querySelectorAll(".product-nav__point");

    if (scrollPos + 400 < prices.offsetTop) {
      points.forEach((el) => {
        el.classList.remove("product-nav__point_current");
      });

      points[0].classList.add("product-nav__point_current");
    } else if (
      scrollPos + 400 > prices.offsetTop &&
      scrollPos + 400 < descr.offsetTop
    ) {
      points.forEach((el) => {
        el.classList.remove("product-nav__point_current");
      });

      points[1].classList.add("product-nav__point_current");
    } else if (
      scrollPos + 400 > descr.offsetTop &&
      scrollPos + 200 < reviews.offsetTop
    ) {
      points.forEach((el) => {
        el.classList.remove("product-nav__point_current");
      });

      points[2].classList.add("product-nav__point_current");
    } else {
      points.forEach((el) => {
        el.classList.remove("product-nav__point_current");
      });

      points[3].classList.add("product-nav__point_current");
    }
  }

  prevScrollPos = scrollPos;
});

document.addEventListener("click", (e) => {
  if (e.target.closest(".scroll-to-top")) {
    window.scrollTo(0, 0);
  }
});
