/*
 * this is for the smart nav bar to appear and disappear on scroll
 */
let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // Sticky fade-in background
  if (scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Smart hide/show nav bar
  if (scrollY > lastScrollTop) {
    header.style.top = "-100px";
  } else {
    header.style.top = "0"; // stick flush to top
  }

  lastScrollTop = scrollY <= 0 ? 0 : scrollY;
});

/**
 * this is for my name animation on the hero section
 */
const heroText = document.querySelector(".hero-text h1");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  // Move it downward a bit as user scrolls
  heroText.style.transform = `translateY(${scrollY * 0.3}px)`;
});

/**
 * this is for the project carousel
 * it will scroll left and right
 * and disable the buttons when at the end
 */
const carousel = document.getElementById("project-carousel");
const leftBtn = document.getElementById("scroll-left");
const rightBtn = document.getElementById("scroll-right");

function getScrollAmount() {
  const card = carousel.querySelector(".project-card");
  const style = getComputedStyle(carousel);
  const gap = parseFloat(style.gap) || 0;
  return card.offsetWidth + gap;
}

function updateArrows() {
  leftBtn.disabled = carousel.scrollLeft <= 0;
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
  rightBtn.disabled = carousel.scrollLeft >= maxScrollLeft - 1;
}

leftBtn.addEventListener("click", () => {
  carousel.scrollBy({
    left: -getScrollAmount(),
    behavior: "smooth",
  });
});

rightBtn.addEventListener("click", () => {
  carousel.scrollBy({
    left: getScrollAmount(),
    behavior: "smooth",
  });
});

carousel.addEventListener("scroll", updateArrows);
window.addEventListener("load", updateArrows);

/**
 * for scrooling to the section when clicking on the nav bar
 * it will scroll to the section smoothly
 * and highlight the active section
 */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    // Skip if it's not a valid in-page anchor
    if (targetId === "#" || targetId === "") return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();

      const offsetTop = target.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

/**
 * this is for the header to change color on scroll
 * it will change the color of the header when scrolling down
 * and change it back when scrolling up
 */
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
