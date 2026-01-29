// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close menu when link is clicked
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
}

// Navbar scroll effect
const navbar = document.getElementById("navbar");

// Watch switching on scroll
const watches = document.querySelectorAll(".watch-image");
const indicators = document.querySelectorAll(".indicator");
const logoWatermark = document.getElementById("logoWatermark");
let currentWatch = 0;
let lastScrollY = window.scrollY;

function switchWatch(index) {
  if (index < 0 || index >= watches.length || index === currentWatch) return;

  // Update watches
  watches[currentWatch].classList.remove("active");
  watches[index].classList.add("active");

  // Update indicators
  indicators[currentWatch].classList.remove("active");
  indicators[index].classList.add("active");

  currentWatch = index;
}

// Scroll event for watch switching and parallax
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // Navbar effect
  if (scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Parallax effect on logo watermark
  logoWatermark.style.transform = `translate(-50%, -50%) scale(${
    1 + scrollY * 0.0003
  }) rotate(${scrollY * 0.05}deg)`;
  logoWatermark.style.opacity = Math.max(0.04 - scrollY * 0.00008, 0);

  // Watch switching based on scroll position
  // Switch at specific scroll milestones
  if (scrollY < 200) {
    switchWatch(0); // Black watch
  } else if (scrollY >= 200 && scrollY < 400) {
    switchWatch(1); // Blue watch
  } else if (scrollY >= 400) {
    switchWatch(2); // Brown watch
  }

  lastScrollY = scrollY;
});

// Click indicators to switch watches
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    switchWatch(index);
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Mouse move parallax effect (subtle)
document.addEventListener("mousemove", (e) => {
  const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
  const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

  logoWatermark.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) scale(${
    1 + window.scrollY * 0.0003
  }) rotate(${window.scrollY * 0.05}deg)`;
});

// Watch card click handler (for future navigation)
document.querySelectorAll(".watch-card").forEach((card) => {
  card.addEventListener("click", function () {
    // Future: Navigate to product detail page
    console.log(
      "Watch card clicked:",
      this.querySelector(".watch-name").textContent,
    );
  });
});
