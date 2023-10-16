const rangeInput = document.querySelectorAll(".range-input input"),
  priceInput = document.querySelectorAll(".price-input input"),
  range = document.querySelector(".slider .progress");

document.addEventListener("input", (e) => {
  if (e.target.classList.contains("input-min")) {
    e.target.closest(".spoiler__body").querySelector(".range-min").value =
      e.target.value;
    calcRangeWidthMin(
      e.target.closest(".spoiler__body").querySelector(".range-min").min,
      e.target.closest(".spoiler__body").querySelector(".range-max").max,
      e.target.closest(".spoiler__body"),
      e.target.closest(".spoiler__body").querySelector(".input-min").value,
      e.target.closest(".spoiler__body").querySelector(".input-max").value
    );
  } else if (e.target.classList.contains("input-max")) {
    e.target.closest(".spoiler__body").querySelector(".range-max").value =
      e.target.value;
    calcRangeWidthMax(
      e.target.closest(".spoiler__body").querySelector(".range-min").min,
      e.target.closest(".spoiler__body").querySelector(".range-max").max,
      e.target.closest(".spoiler__body"),
      e.target.closest(".spoiler__body").querySelector(".input-min").value,
      e.target.closest(".spoiler__body").querySelector(".input-max").value
    );
  }

  if (e.target.classList.contains("range-min")) {
    e.target.closest(".spoiler__body").querySelector(".input-min").value =
      e.target.value;
    calcRangeWidthMin(
      e.target.min,
      e.target.max,
      e.target.closest(".spoiler__body"),
      e.target.closest(".spoiler__body").querySelector(".input-min").value,
      e.target.closest(".spoiler__body").querySelector(".input-max").value
    );
  } else if (e.target.classList.contains("range-max")) {
    e.target.closest(".spoiler__body").querySelector(".input-max").value =
      e.target.value;
    calcRangeWidthMax(
      e.target.min,
      e.target.max,
      e.target.closest(".spoiler__body"),
      e.target.closest(".spoiler__body").querySelector(".input-min").value,
      e.target.closest(".spoiler__body").querySelector(".input-max").value
    );
  }
});
window.addEventListener("load", () => {
  let sliders = document.querySelectorAll(".range-slider");

  if (sliders.length > 0) {
    sliders.forEach((range) => {
      range.querySelector(".range-min").value =
        range.querySelector(".input-min").value;
      range.querySelector(".range-max").value =
        range.querySelector(".input-max").value;

      calcRangeWidthMin(
        range.querySelector(".range-min").min,
        range.querySelector(".range-max").max,
        range,
        range.querySelector(".input-min").value,
        range.querySelector(".input-max").value
      );
      calcRangeWidthMax(
        range.querySelector(".range-min").min,
        range.querySelector(".range-max").max,
        range,
        range.querySelector(".input-min").value,
        range.querySelector(".input-max").value
      );
    });
  }
});

function calcRangeWidthMin(min, max, parrent, minRange, maxRange) {
  let range = parrent.querySelector(".progress");
  let width = max - min;

  range.style.left = `${((minRange - min) / width) * 100}%`;
}
function calcRangeWidthMax(min, max, parrent, minRange, maxRange) {
  let range = parrent.querySelector(".progress");
  let width = max - min;

  range.style.right = `${100 - ((maxRange - min) / width) * 100}%`;
}
