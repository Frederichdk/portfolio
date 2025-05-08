/* * Preloader: fades out on load
 * (only shows on first page load)
 */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  // Keep preloader visible for 2 seconds
  setTimeout(() => {
    preloader.style.opacity = "0";
    preloader.style.pointerEvents = "none";
    setTimeout(() => preloader.remove(), 500); // give time for fade-out
  }, 2000);
});

/*
 * Smart nav bar: appears on scroll up, hides on scroll down, changes style on scroll
 */
let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // Apply faded background and shadow after scrolling
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

/*
 * Hero name animation on scroll
 */
const heroText = document.querySelector(".hero-text h1");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  heroText.style.transform = `translateY(${scrollY * 0.3}px)`;
});

/*
 * Scroll indicator: hides when scrolled down
 * (only shows on first page load)
 */
const scrollIndicator = document.getElementById("scroll-indicator");

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    scrollIndicator.classList.add("hide");
  } else {
    scrollIndicator.classList.remove("hide");
  }
});

/*
 * Project carousel scroll left/right and arrow state
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

leftBtn?.addEventListener("click", () => {
  carousel.scrollBy({
    left: -getScrollAmount(),
    behavior: "smooth",
  });
});

rightBtn?.addEventListener("click", () => {
  carousel.scrollBy({
    left: getScrollAmount(),
    behavior: "smooth",
  });
});

carousel?.addEventListener("scroll", updateArrows);
window.addEventListener("load", updateArrows);

/*
 * Smooth scroll for all nav and footer links
 */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#" || targetId === "") return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();

      const headerOffset = header.offsetHeight;
      const elementPosition =
        target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

/*
 * for mobile: swap hero image on resize
 */
function swapHeroImage() {
  const heroImage = document.getElementById("hero-image");
  if (window.innerWidth <= 780) {
    heroImage.src = "Assets/Images/Rugby2Cell-cutout.png"; // your mobile cutout image
  } else {
    heroImage.src = "Assets/Images/rugby2-cutout.png";
  }
}

window.addEventListener("DOMContentLoaded", swapHeroImage);
window.addEventListener("resize", swapHeroImage);

/*
 * for mobile: show popup on first load
 * (only shows on first page load)
 */
window.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("mobile-popup");
  const dismissBtn = document.getElementById("dismiss-popup");

  // Show popup only on small screens
  if (window.innerWidth <= 600) {
    popup.style.display = "flex";
  }

  // Close popup when button clicked
  dismissBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });
});
