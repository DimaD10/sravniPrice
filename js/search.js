const searchLocationBtn = document.getElementById("searchLocationsBtn");
const locationList = document.querySelectorAll(".change-location__list a");
const notFoundText = document.querySelector(".change-location__error-text");
const locInput = document.getElementById("LocInput");

searchLocationBtn.addEventListener("click", () => {
  let userTextLoc = locInput.value.toLowerCase();

  locationList.forEach((location) => {
    const cityName = location.textContent.toLowerCase();

    if (cityName.includes(userTextLoc)) {
      location.closest("li").classList.add("found");
      location.closest("li").style.display = "inline";
    } else {
      location.closest("li").classList.remove("found");
      location.closest("li").style.display = "none";
    }

    if (
      document.querySelectorAll(".change-location__list .found").length != 0
    ) {
      notFoundText.classList.remove("active");
      locInput.classList.remove("error");
    } else {
      notFoundText.classList.add("active");
      locInput.classList.add("error");
    }
  });
});
