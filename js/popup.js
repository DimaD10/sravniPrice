document.addEventListener("click", (e) => {
  if (e.target.classList.contains("popup-close")) {
    e.target.closest(".popup").classList.remove("popup_opened");

    if (e.target.closest(".change-location-parrent")) {
      closeLocModal();
    }
  }

  if (e.target.classList.contains("open-popup-location")) {
    document.querySelector(".location-question").classList.add("popup_opened");
  }

  if (e.target.classList.contains("change-city-btn")) {
    document
      .querySelector(".change-location-parrent")
      .classList.add("popup_opened");

    document.querySelector("body").style.overflow = "hidden";
  }
  if (
    e.target.classList.contains("change-location-parrent") &&
    !e.target.closest(".change-location")
  ) {
    closeLocModal();
  }

  if (e.target.closest(".subcategory-aside__close-btn")) {
    e.target.closest(".subcategory-aside").classList.remove("active");
    document.querySelector("body").style.overflow = "visible";
  }
  if (
    e.target.closest(".open-filter") &&
    document.querySelector(".subcategory-aside")
  ) {
    document.querySelector(".subcategory-aside").classList.add("active");
    document.querySelector("body").style.overflow = "hidden";
  }

  if (
    e.target.closest(".leave-review-btn") &&
    document.querySelector(".leave-review")
  ) {
    document.querySelector(".leave-review").classList.add("popup_opened");
    document.querySelector("body").style.overflow = "hidden";
  }
  if (
    e.target.closest(".popup__close-btn") &&
    document.querySelector(".leave-review")
  ) {
    document.querySelector("body").style.overflow = "visible";
  }

  if (
    e.target.closest(".leave-review") &&
    !e.target.closest(".leave-review__card")
  ) {
    document.querySelector(".leave-review").classList.remove("popup_opened");
    document.querySelector("body").style.overflow = "visible";
  }
});

window.addEventListener("load", () => {
  document.querySelector(".location-question").classList.add("popup_opened");
  document.querySelector(".cookie-popup").classList.add("popup_opened");
});

document.addEventListener("keydown", function (event) {
  if (
    document
      .querySelector(".change-location-parrent")
      .classList.contains("popup_opened")
  ) {
    if (event.key == "Escape") {
      closeLocModal();
    }
  }
  if (
    document.querySelector(".leave-review") &&
    document.querySelector(".leave-review").classList.contains("popup_opened")
  ) {
    if (event.key == "Escape") {
      document.querySelector(".leave-review").classList.remove("popup_opened");
      document.querySelector("body").style.overflow = "visible";
    }
  }
});

function closeLocModal() {
  document
    .querySelector(".change-location-parrent")
    .classList.remove("popup_opened");
  if (document.querySelector(".catalog").classList.contains("active")) {
    document.querySelector("body").style.overflow = "hidden";
  } else {
    document.querySelector("body").style.overflow = "visible";
  }
}
