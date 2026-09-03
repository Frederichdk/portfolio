// ========== Smart Nav Bar ==========
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) header?.classList.add("scrolled");
    else header?.classList.remove("scrolled");

    header.style.top = scrollY > lastScrollTop ? "-100px" : "0";
    lastScrollTop = Math.max(0, scrollY);
  });
});

// ========== Hero Scroll Animation ==========
// For the first PIN_DISTANCE px of scroll (matching .hero-pin's extra
// height in CSS/StyleSheet.css), .hero is held by position: sticky, so it
// only moves as far as SCREEN_DRIFT drags it - much slower than a normal
// scroll would move it. The name travels NAME_TRAVEL px in that same
// window (faster than the screen) and shrinks toward NAME_MIN_SCALE, so it
// visually outruns the screen and gets swallowed behind the PC cutout.
// Past PIN_DISTANCE, .hero unsticks and the page scrolls normally.
document.addEventListener("DOMContentLoaded", () => {
  const heroText = document.querySelector(".hero-text h1");
  const heroSection = document.querySelector(".hero");
  if (!heroText || !heroSection) return;

  const PIN_DISTANCE = 220;
  const SCREEN_DRIFT = 50;
  const NAME_TRAVEL = 150;
  const NAME_MIN_SCALE = 0.8;

  window.addEventListener("scroll", () => {
    const progress = Math.min(window.scrollY, PIN_DISTANCE) / PIN_DISTANCE;
    heroSection.style.transform = `translateY(${-progress * SCREEN_DRIFT}px)`;
    const scale = 1 - progress * (1 - NAME_MIN_SCALE);
    heroText.style.transform = `translateY(${progress * NAME_TRAVEL}px) scale(${scale})`;
  });
});

// ========== Scroll Indicator ==========
document.addEventListener("DOMContentLoaded", () => {
  const scrollIndicator = document.getElementById("scroll-indicator");
  if (!scrollIndicator) return;
  window.addEventListener("scroll", () => {
    scrollIndicator.classList.toggle("hide", window.scrollY > 10);
  });
});

// ========== Carousel Buttons ==========
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("project-carousel");
  const leftBtn = document.getElementById("scroll-left");
  const rightBtn = document.getElementById("scroll-right");

  if (!carousel || !leftBtn || !rightBtn) return;

  const getScrollAmount = () => {
    const card = carousel.querySelector(".project-card");
    const style = getComputedStyle(carousel);
    const gap = parseFloat(style.gap) || 0;
    return card.offsetWidth + gap;
  };

  const updateArrows = () => {
    leftBtn.disabled = carousel.scrollLeft <= 0;
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    rightBtn.disabled = carousel.scrollLeft >= maxScrollLeft - 1;
  };

  leftBtn.addEventListener("click", () =>
    carousel.scrollBy({ left: -getScrollAmount(), behavior: "smooth" }),
  );
  rightBtn.addEventListener("click", () =>
    carousel.scrollBy({ left: getScrollAmount(), behavior: "smooth" }),
  );

  carousel.addEventListener("scroll", updateArrows);
  window.addEventListener("load", updateArrows);
});

// ========== Smooth Scrolling ==========
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const headerOffset = header?.offsetHeight || 0;

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: offsetTop - headerOffset,
          behavior: "smooth",
        });
      }
    });
  });
});

// ========== Contact Form ==========
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactpage");
  const successBox = document.getElementById("form-success");
  if (!form || !successBox) return;

  const showSuccess = () => {
    successBox.classList.remove("hidden");
    setTimeout(() => successBox.classList.add("show"), 10);
    setTimeout(() => {
      successBox.classList.remove("show");
      setTimeout(() => successBox.classList.add("hidden"), 300);
    }, 5000);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    })
      .then((res) => (res.ok ? showSuccess() : alert("Something went wrong.")))
      .catch((err) => {
        console.warn("Form error:", err);
        showSuccess();
      })
      .finally(() => form.reset());
  });
});

// ========== Hero Image Swap ==========
function swapHeroImage() {
  const heroImage = document.getElementById("hero-image");
  if (!heroImage) return;
  heroImage.src =
    window.innerWidth <= 780
      ? "Assets/Images/Rugby2Cell-cutout.png"
      : "Assets/Images/rugby2-cutout.png";
}
window.addEventListener("DOMContentLoaded", swapHeroImage);
window.addEventListener("resize", swapHeroImage);

// ========== Mobile Popup ==========
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("mobile-popup");
  const dismissBtn = document.getElementById("dismiss-popup");
  if (!popup || !dismissBtn) return;

  if (window.innerWidth <= 600) popup.style.display = "flex";
  dismissBtn.addEventListener("click", () => (popup.style.display = "none"));
});
