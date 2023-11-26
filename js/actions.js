const navList = document.querySelector(".article-blog-aside__navigate-list");
const contentList = document.querySelectorAll(".article-blog__article");

const dropdowns = document.querySelectorAll(".dropdown");

const spoilers = document.querySelectorAll(".spoiler");

const visualStarRationg = document.querySelectorAll(".visual-rating");

const prodColors = document.querySelectorAll(".product-colors__color");

const blogSlider = document.querySelector(".blog-categories__slider");

document.addEventListener("click", (e) => {
  if (e.target.closest(".fav-button")) {
    if (e.target.closest(".product-banner")) {
      e.target
        .closest(".product-banner")
        .querySelectorAll(".fav-button")
        .forEach((el) => {
          el.classList.toggle("active");
        });
    } else {
      e.target.closest(".fav-button").classList.toggle("active");
    }
  }
  if (e.target.closest(".comprasion-button")) {
    if (e.target.closest(".product-banner")) {
      e.target
        .closest(".product-banner")
        .querySelectorAll(".comprasion-button")
        .forEach((el) => {
          el.classList.toggle("active");
        });
    } else {
      e.target.closest(".comprasion-button").classList.toggle("active");
    }
  }
  if (e.target.classList.contains("article-blog-aside__navigate-btn")) {
    e.target.classList.toggle("active");
    e.target
      .closest(".article-blog-aside__navigate")
      .classList.toggle("active");
  }

  if (e.target.closest(".dropdown__header")) {
    if (!e.target.closest(".active")) {
      document.querySelectorAll(".dropdown").forEach((el) => {
        el.classList.remove("active");
      });
      let dropdown = e.target.closest(".dropdown");
      dropdown.classList.add("active");
    } else {
      let dropdown = e.target.closest(".dropdown");

      dropdown.classList.remove("active");
    }
  }
  if (e.target.classList.contains("dropdown__item")) {
    let dropdown = e.target.closest(".dropdown");

    dropdown.querySelector(".dropdown__current").textContent =
      e.target.textContent;
    dropdown.classList.toggle("active");

    updDropdown(dropdown);

    if (dropdown.querySelector(".dropdown__hidden-text")) {
      dropdown.querySelector(".dropdown__hidden-text").style.display = "none";
    }
  }
  if (e.target.closest(".spoiler__header")) {
    e.target.closest(".spoiler").classList.toggle("active");

    let el = e.target.closest(".spoiler");
    let body = el.querySelector(".spoiler__body");

    if (el.classList.contains("active")) {
      body.style.height = `${el.getAttribute("data-height")}px`;
    } else {
      body.style.height = `0px`;
    }
  }

  if (e.target.classList.contains(".product-nav__point")) {
    document.querySelectorAll(".product-nav__point").forEach((el) => {
      el.classList.remove("product-nav__point_current");
    });
    e.target.classList.add("product-nav__point_current");
  }

  if (e.target.classList.contains("product-colors__color")) {
    document.querySelectorAll(".product-colors__color").forEach((el) => {
      el.classList.remove("product-colors__color_current");
    });
    e.target.classList.add("product-colors__color_current");
    updProdColor();
  }

  if (e.target.classList.contains("product-options__option")) {
    let optionsParent = e.target.closest(".product-options__options");
    let options = optionsParent.querySelectorAll(".product-options__option");

    options.forEach((option) => {
      option.classList.remove("product-options__option_current");
    });
    e.target.classList.add("product-options__option_current");
  }

  if (e.target.closest(".blog-categories__button")) {
    e.target.closest(".blog-categories__button").style.display = "none";
    e.target.closest(".blog-categories").classList.add("active");
  }

  if (!e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown").forEach((el) => {
      el.classList.remove("active");
    });
  }

  if (e.target.classList.contains("categories-eq__category")) {
    document.querySelectorAll(".categories-eq__category").forEach((el) => {
      el.classList.remove("categories-eq__category_active");
    });

    e.target.classList.add("categories-eq__category_active");
  }
});

window.addEventListener("load", () => {
  if (navList && contentList.length > 0) {
    let step = 0;

    contentList.forEach((el) => {
      step++;
      el.querySelector(".article-blog__article-marker").setAttribute(
        "id",
        `${"article-" + step}`
      );

      let point = document.createElement("a");
      point.setAttribute("href", `#${"article-" + step}`);
      point.textContent = el.querySelector(".article-blog__title").textContent;

      navList.appendChild(point);
    });
  }

  if (dropdowns.length > 0) {
    dropdowns.forEach((dropdown) => {
      updDropdown(dropdown);
    });
  }

  if (spoilers.length > 0) {
    spoilers.forEach((el) => {
      let body = el.querySelector(".spoiler__body");
      el.setAttribute("data-height", parseInt(body.offsetHeight));

      if (el.classList.contains("active")) {
        body.style.height = `${el.getAttribute("data-height")}px`;
      } else {
        body.style.height = `0px`;
      }
    });
  }

  if (visualStarRationg.length > 0) {
    visualStarRationg.forEach((rating) => {
      rate = parseInt(rating.getAttribute("data-rating"));
      stars = rating.querySelectorAll(".visual-rating__star");

      for (let i = 0; i < rate; i++) {
        const el = stars[i];
        el.classList.add("active");
      }
    });
  }

  if (prodColors.length > 0) {
    prodColors.forEach((color) => {
      let hex = color.getAttribute("data-color-hex");
      color.style.backgroundColor = hex;
    });
    updProdColor();
  }

  checkBlogSlider();
});

window.addEventListener("resize", () => {
  checkBlogSlider();
  if (document.querySelector(".equal-descr") && document.querySelector(".equal-descr").querySelectorAll('.spoiler').length > 0) {
    document.querySelector(".equal-descr").querySelectorAll('.spoiler').forEach((el) => {
      let body = el.querySelector(".spoiler__body");
      body.style.height = "auto";
      el.setAttribute("data-height", parseInt(body.offsetHeight));

      if (el.classList.contains("active")) {
        body.style.height = `${el.getAttribute("data-height")}px`;
      } else {
        body.style.height = `0px`;
      }
    });
  }
});

function updDropdown(dropdown) {
  let currentEl = dropdown.querySelector(".dropdown__current").textContent;

  dropdown.querySelectorAll(".dropdown__item").forEach((el) => {
    if (currentEl.toLowerCase() === el.textContent.toLowerCase()) {
      el.style.display = "none";
    } else {
      el.style.display = "inline";
    }
  });
}

function updProdColor() {
  let label = document
    .querySelector(".product-colors__color_current")
    .getAttribute("data-color-label");
  document.querySelector(".product-colors__color-label").textContent = label;
}

function checkBlogSlider() {
  if (blogSlider) {
    console.log(true);
    let sliderWidth = blogSlider.offsetWidth;
    let sliderContentWidth = 0;

    blogSlider.querySelectorAll(".slider-slide").forEach((el) => {
      let margin = parseInt(window.getComputedStyle(el).paddingLeft);

      sliderContentWidth += margin + parseInt(el.offsetWidth);
    });

    if (parseInt(sliderWidth) + 10 < sliderContentWidth) {
      blogSlider.closest(".blog-categories").classList.add("slider");
    } else {
      blogSlider.closest(".blog-categories").classList.remove("slider");
    }
    console.log(sliderContentWidth, parseInt(sliderWidth));
  }
}
