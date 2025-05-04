/*
 * this is for the smart nav bar to appear and disappear on scroll
 */
let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    header.style.top = "-100px";
  } else {
    header.style.top = "2vw";
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
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

const carousel = document.getElementById("project-carousel");
const leftBtn = document.getElementById("scroll-left");
const rightBtn = document.getElementById("scroll-right");

function updateArrows() {
  leftBtn.disabled = carousel.scrollLeft <= 0;
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
  rightBtn.disabled = carousel.scrollLeft >= maxScrollLeft - 1;
}

leftBtn.addEventListener("click", () => {
  carousel.scrollBy({
    left: -carousel.clientWidth / 2 - 10,
    behavior: "smooth",
  });
});

rightBtn.addEventListener("click", () => {
  carousel.scrollBy({
    left: carousel.clientWidth / 2 + 10,
    behavior: "smooth",
  });
});

carousel.addEventListener("scroll", updateArrows);
window.addEventListener("load", updateArrows);
