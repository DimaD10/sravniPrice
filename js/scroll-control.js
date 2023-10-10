const scrollToTopBtn = document.querySelector(".scroll-to-top");
let prevScrollPos = window.scrollY;
const header = document.querySelector(".header");

document.addEventListener("scroll", () => {
  let scrollPos = window.scrollY;

  if (scrollPos > 300) {
    scrollToTopBtn.classList.add("active");
  } else {
    scrollToTopBtn.classList.remove("active");
  }

  if (scrollPos > prevScrollPos) {
    header.classList.add('hidden');
  } else if (scrollPos < prevScrollPos) {
    header.classList.remove("hidden");
  }

  prevScrollPos = scrollPos;
});

document.addEventListener("click", (e) => {
  if (e.target.closest(".scroll-to-top")) {
    window.scrollTo(0, 0);
  }
});
