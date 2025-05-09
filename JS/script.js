// ========== Preloader ==========
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;
  setTimeout(() => {
    preloader.style.opacity = "0";
    preloader.style.pointerEvents = "none";
    setTimeout(() => preloader.remove(), 500);
  }, 1000);
});

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
document.addEventListener("DOMContentLoaded", () => {
  const heroText = document.querySelector(".hero-text h1");
  if (!heroText) return;
  window.addEventListener("scroll", () => {
    heroText.style.transform = `translateY(${window.scrollY * 0.3}px)`;
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
    carousel.scrollBy({ left: -getScrollAmount(), behavior: "smooth" })
  );
  rightBtn.addEventListener("click", () =>
    carousel.scrollBy({ left: getScrollAmount(), behavior: "smooth" })
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
