const catalogTabs = document.querySelectorAll(".catalog-category");
const catalogSections = document.querySelectorAll(".catalog-section");
const catalog = document.querySelector(".catalog");
const catalogMenu = document.getElementById("CatalogMenu");

document.addEventListener("click", (e) => {
  if (e.target.closest(".open-catalog")) {
    catalog.classList.toggle("active");
    header.classList.remove("hidden");
    document.querySelectorAll(".open-catalog").forEach((el) => {
      el.classList.toggle("active");
    });
    document.querySelector(".user-actions_main").classList.toggle("active");

    document
      .getElementById("MobileCatalogBtn")
      .classList.toggle("user-actions-point_current");

    if (catalog.classList.contains("active")) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "visible";
    }
  }
  if (e.target.closest(".catalog-category_current")) {
    window.setTimeout(() => {
      e.target
        .closest(".catalog-category")
        .classList.remove("catalog-category_current");
      catalogMenu.classList.remove("active");
    }, 100);
  }
  if (
    catalogTabs != null &&
    e.target.closest(".catalog-category") &&
    !e.target.closest(".catalog-category_current")
  ) {
    const clickedTab = e.target.closest(".catalog-category");
    let catalogPos;

    catalogTabs.forEach((el, i) => {
      el.classList.remove("catalog-category_current");
      if (el === clickedTab) {
        clickedTab.classList.add("catalog-category_current");
        catalogPos = i;
      }
    });

    catalogSections.forEach((el) => {
      el.classList.remove("catalog-section_current");
    });
    catalogSections[catalogPos].classList.add("catalog-section_current");

    if (window.innerWidth < 767.98) {
      if (
        document.querySelector(".catalog-category_current").nextElementSibling
      ) {
        document
          .querySelector(".catalog-category_current")
          .nextElementSibling.parentNode.insertBefore(
            catalogMenu,
            document.querySelector(".catalog-category_current")
              .nextElementSibling
          );
      } else {
        document
          .querySelector(".catalog-category_current")
          .parentNode.appendChild(catalogMenu);
      }
      catalogMenu.classList.add("active");
    }
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth < 767.98) {
    catalogTabs.forEach((el, i) => {
      el.classList.remove("catalog-category_current");
    });
    catalogSections.forEach((el) => {
      el.classList.remove("catalog-section_current");
    });
    catalogMenu.classList.remove("active");
  } else {
    catalogTabs[0].classList.add("catalog-category_current");
    catalogSections[0].classList.add("catalog-section_current");

    document.querySelector(".catalog__body").appendChild(catalogMenu);
  }
});

window.addEventListener("load", () => {
  if (window.innerWidth < 767.98) {
    catalogTabs.forEach((el, i) => {
      el.classList.remove("catalog-category_current");
    });
    catalogSections.forEach((el) => {
      el.classList.remove("catalog-section_current");
    });
    catalogMenu.classList.remove("active");
  }
});
