const scrollToTopBtn = document.querySelector(".scroll-to-top");
let prevScrollPos = window.scrollY;
const header = document.querySelector(".header");
const prodNav = document.querySelector(".product-nav");
const prodListHeader = document.querySelector(".equal__header");

window.addEventListener("load", () => {
  let scrollPos = window.scrollY;

  if (document.querySelector(".article-blog-aside__wrapper")) {
    document
      .querySelector(".article-blog-aside__wrapper")
      .setAttribute(
        "data-pos",
        parseInt(
          document
            .querySelector(".article-blog-aside__wrapper")
            .getBoundingClientRect().top
        )
      );
  }

  if (document.querySelector(".equal-scroll-marker")) {
    let marker = document.querySelector(".equal-scroll-marker");

    if (scrollPos + 100 > marker.offsetTop) {
      prodListHeader.classList.add("fixed");
    } else {
      prodListHeader.classList.remove("fixed");
    }
  }
});
window.addEventListener("resize", () => {
  if (document.querySelector(".article-blog-aside__wrapper")) {
    document
      .querySelector(".article-blog-aside__wrapper")
      .setAttribute(
        "data-pos",
        parseInt(
          document
            .querySelector(".article-blog-aside__wrapper")
            .getBoundingClientRect().top
        )
      );

    document.querySelector(".article-blog-aside__wrapper").style.position =
      "static";
    document.querySelector(".article-blog-aside__wrapper").style.top = `0px`;
  }
});

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
    if (prodListHeader) {
      prodListHeader.classList.add("transformed");
    }
  } else if (scrollPos < prevScrollPos) {
    header.classList.remove("hidden");
    if (prodNav) {
      prodNav.classList.remove("hidden");
    }
    if (prodListHeader) {
      prodListHeader.classList.remove("transformed");
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

  if (document.querySelector(".article-blog-aside__wrapper")) {
    let sidebar = document.querySelector(".article-blog-aside__wrapper");
    let sidebarHeight = parseInt(sidebar.offsetHeight);

    if (sidebarHeight > parseInt(window.innerHeight) - 100) {
      let pointTop = 0;
      let startPoint;
      let scrollBottom = false;

      if (scrollPos > prevScrollPos) {
        let pointTopControl = parseInt(sidebar.offsetTop);
        scrollBottom = true;
        if (scrollBottom) {
          startPoint = parseInt(sidebar.offsetTop);
        }
        let pointMarker = parseInt(sidebar.getAttribute("data-last-pos"))
          ? parseInt(sidebar.getAttribute("data-last-pos"))
          : 0;
        scrollBottom = false;
        sidebar.style.top = `${pointTop}px`;

        if (
          scrollPos - pointMarker - 99 >
          parseInt(sidebarHeight - parseInt(window.innerHeight)) - 0
        ) {
          sidebar.classList.remove("absolute");
          sidebar.classList.add("sticky");
          sidebar.style.top = `${parseInt(
            -(sidebarHeight - parseInt(window.innerHeight))
          )}px`;
        } else {
          sidebar.classList.remove("sticky");
          sidebar.classList.add("absolute");

          sidebar.style.top = `${parseInt(pointTopControl)}px`;
        }
      } else if (scrollPos < prevScrollPos) {
        let pointTop = parseInt(sidebar.getBoundingClientRect().top);
        let pointTopControl = parseInt(sidebar.offsetTop);
        sidebar.style.top = `${pointTopControl}px`;

        if (99 < pointTop) {
          sidebar.classList.remove("absolute");
          sidebar.classList.add("sticky");
          sidebar.style.top = "100px";
          pointTop = parseInt(sidebar.offsetTop);
        } else {
          sidebar.style.top = `${pointTopControl}px`;
          sidebar.classList.remove("sticky");
          sidebar.classList.add("absolute");
        }
        pointTop = pointTopControl;
        sidebar.setAttribute("data-last-pos", scrollPos);
      }
    } else {
      sidebar.classList.remove("absolute");
      sidebar.classList.add("sticky");
      sidebar.style.top = "100px";
    }
  }

  if (document.querySelector(".equal-scroll-marker")) {
    let marker = document.querySelector(".equal-scroll-marker");

    if (scrollPos + 100 > marker.offsetTop) {
      prodListHeader.classList.add("fixed");
    } else {
      prodListHeader.classList.remove("fixed");
    }
  }

  prevScrollPos = scrollPos;
});

document.addEventListener("click", (e) => {
  if (e.target.closest(".scroll-to-top")) {
    window.scrollTo(0, 0);
  }
});
