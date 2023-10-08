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
