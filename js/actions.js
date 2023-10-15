const navList = document.querySelector(".article-blog-aside__navigate-list");
const contentList = document.querySelectorAll(".article-blog__article");

const dropdowns = document.querySelectorAll(".dropdown");

const spoilers = document.querySelectorAll(".spoiler");

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
  if (e.target.classList.contains("article-blog-aside__navigate-btn")) {
    e.target.classList.toggle("active");
    e.target
      .closest(".article-blog-aside__navigate")
      .classList.toggle("active");
  }

  if (e.target.closest(".dropdown__header")) {
    let dropdown = e.target.closest(".dropdown");
    dropdown.classList.toggle("active");
  }
  if (e.target.classList.contains("dropdown__item")) {
    let dropdown = e.target.closest(".dropdown");

    dropdown.querySelector(".dropdown__current").textContent =
      e.target.textContent;
    dropdown.classList.toggle("active");

    updDropdown(dropdown);
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
    console.log(true);
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
