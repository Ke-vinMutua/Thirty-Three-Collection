document.addEventListener("DOMContentLoaded", function () {
  // ==================== NAVIGATION SYSTEM ====================

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    // Toggle menu on hamburger click
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close menu when any nav link is clicked
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }

  const navbar = document.getElementById("navbar");

  // ==================== WATCH SHOWCASE SYSTEM ====================

  const watches = document.querySelectorAll(".watch-image");
  const logoWatermark = document.getElementById("logoWatermark");
  let currentWatch = 0;

  /**
   * Switch to a specific watch by index
   * @param {number} index - Watch index (0, 1, or 2)
   */
  function switchWatch(index) {
    if (index < 0 || index >= watches.length || index === currentWatch) return;

    // Hide current watch
    watches[currentWatch].classList.remove("active");

    // Show new watch
    watches[index].classList.add("active");

    // Update current index
    currentWatch = index;
  }

  // ==================== SCROLL EFFECTS ====================

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // 1. Navbar Scroll Effect
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    // 2. Logo Watermark Parallax Effect
    if (logoWatermark) {
      logoWatermark.style.transform = `translate(-50%, -50%) scale(${
        1 + scrollY * 0.0003
      }) rotate(${scrollY * 0.05}deg)`;
      logoWatermark.style.opacity = Math.max(0.06 - scrollY * 0.00008, 0);
    }

    // 3. Watch Switching Based on Scroll Position
    // Adjusted thresholds for new hero height (80vh)
    if (watches.length > 0) {
      if (scrollY < 400) {
        switchWatch(0); // Black watch
      } else if (scrollY >= 400 && scrollY < 800) {
        switchWatch(1); // Blue watch
      } else if (scrollY >= 800) {
        switchWatch(2); // Brown watch
      }
    }
  });

  // ==================== MOUSE PARALLAX EFFECT ====================

  document.addEventListener("mousemove", (e) => {
    if (logoWatermark) {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

      logoWatermark.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) scale(${
        1 + window.scrollY * 0.0003
      }) rotate(${window.scrollY * 0.05}deg)`;
    }
  });

  // ==================== SMOOTH SCROLL ====================

  /**
   * Smooth Scroll for Anchor Links
   * Enables smooth scrolling for all internal anchor links (#shop, #about, etc.)
   */
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

  // ==================== SHOP SECTION ====================

  document.querySelectorAll(".watch-card").forEach((card) => {
    card.addEventListener("click", function () {
      const watchName = this.querySelector(".watch-name")?.textContent;

      // For now, just log
      console.log("Watch card clicked:", watchName);
    });
  });

  // ==================== INITIALIZATION ====================

  function init() {
    // Set first watch as active if none are active
    if (watches.length > 0 && !document.querySelector(".watch-image.active")) {
      watches[0].classList.add("active");
    }

    // Log initialization (remove in production)
    console.log("ThirtyThree Collection - Scripts Initialized ✓");
  }

  // Run initialization
  init();
}); // End of DOMContentLoaded
