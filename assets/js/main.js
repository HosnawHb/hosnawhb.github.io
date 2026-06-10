(function () {
  "use strict";

  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelector(".nav-links");
  const navToggle = document.querySelector(".nav-toggle");
  const backToTop = document.querySelector(".back-to-top");
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a");

  /* Navbar scroll shadow */
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
    backToTop.classList.toggle("visible", window.scrollY > 400);
  });

  /* Mobile menu */
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const icon = navToggle.querySelector("i");
    icon.classList.toggle("bi-list");
    icon.classList.toggle("bi-x-lg");
  });

  navAnchors.forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  /* Active nav link on scroll */
  const setActiveLink = () => {
    const scrollY = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === "#" + id);
        });
      }
    });
  };
  window.addEventListener("scroll", setActiveLink);
  setActiveLink();

  /* Smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* Typed.js hero */
  const typedEl = document.querySelector(".typed");
  if (typedEl && typeof Typed !== "undefined") {
    const items = typedEl.getAttribute("data-typed-items").split(",");
    new Typed(".typed", {
      strings: items,
      loop: true,
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 2000,
    });
  }

  /* Counter animation */
  const counters = document.querySelectorAll("[data-count]");
  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-count");
      const duration = 1200;
      const step = target / (duration / 16);
      let current = 0;
      const tick = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(tick);
        } else {
          counter.textContent = target;
        }
      };
      tick();
    });
  };

  /* Fade-in on scroll */
  const fadeEls = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          if (entry.target.querySelector("[data-count]") && !entry.target.dataset.counted) {
            entry.target.dataset.counted = "true";
            animateCounters();
          }
        }
      });
    },
    { threshold: 0.15 }
  );
  fadeEls.forEach((el) => observer.observe(el));
})();
