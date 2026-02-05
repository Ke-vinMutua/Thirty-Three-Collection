function initPreloader() {
  const preloader = document.getElementById("preloader");
  const percentage = document.getElementById("preloaderPercentage");
  const progressCircle = document.getElementById("progressCircle");
  const preloaderContent = document.querySelector(".preloader-content");
  const preloaderHand = document.getElementById("preloaderHand");

  if (sessionStorage.getItem("preloaderShown")) {
    document.body.classList.remove("loading");
    document.body.classList.add("loaded");
    preloader.remove();
    return;
  }

  sessionStorage.setItem("preloaderShown", "true");
  document.body.classList.add("loading");

  const circumference = 534;
  let currentProgress = 0;
  const targetProgress = 33;
  const duration = 2000;
  const increment = targetProgress / (duration / 40);

  function updateProgress() {
    if (currentProgress < targetProgress) {
      currentProgress += increment;
      if (currentProgress > targetProgress) currentProgress = targetProgress;

      const progress = Math.floor(currentProgress);
      percentage.textContent = progress;

      const offset = circumference - (currentProgress / 100) * circumference;
      progressCircle.style.strokeDashoffset = offset;

      const rotation = (currentProgress / 100) * 360;
      const handHeight = window.innerWidth <= 480 ? 80 : 100;
      preloaderHand.style.transform = `translate(-50%, -${handHeight}px) rotate(${rotation}deg)`;

      requestAnimationFrame(updateProgress);
    } else {
      preloaderContent.style.transition = "transform 0.5s ease";
      preloaderContent.style.transform = "scale(1.5)";
      percentage.style.transition = "color 0.5s ease";

      setTimeout(() => {
        preloaderHand.style.transition = "opacity 0.3s ease";
        preloaderHand.style.opacity = "0";
      }, 800);

      setTimeout(() => {
        const circlesSvg = document.querySelector(".preloader-circle");
        circlesSvg.style.transition = "opacity 0.3s ease";
        circlesSvg.style.opacity = "0";
      }, 800);

      setTimeout(() => {
        document.body.classList.remove("loading");
        document.body.classList.add("loaded");
        preloader.classList.add("hidden");

        setTimeout(() => {
          preloader.remove();
          document.body.style.overflow = "";
        }, 800);
      }, 1100);
    }
  }

  updateProgress();
}
document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    initPreloader();
  } else {
    document.body.classList.remove("loading");
    document.body.classList.add("loaded");
  }

  const CONFIG = {
    HERO_FRAMES: 51,
    LOGO_SCROLL_THRESHOLD: 50,
  };

  const elements = {
    topLogoBrand: document.getElementById("topLogoBrand"),
    logoWatermark: document.getElementById("logoWatermark"),
    heroWatchSequence: document.getElementById("heroWatchSequence"),
    watchSequenceSection: document.getElementById("watchSequence"),
  };

  function getFrameFilename(frameNumber) {
    const paddedNumber = String(frameNumber).padStart(2, "0");
    return `./Assets/ThirtyThree ImageSequence/frame_${paddedNumber}_delay-0.1s.webp`;
  }

  function preloadFrames() {
    for (let i = 0; i < CONFIG.HERO_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameFilename(i);
    }
  }

  function getWatchSequenceProgress() {
    if (!elements.watchSequenceSection) return 0;

    const rect = elements.watchSequenceSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = elements.watchSequenceSection.offsetHeight;

    if (rect.top > windowHeight) return 0;
    if (rect.bottom < 0) return 1;

    const offset = 300;
    const scrolled = windowHeight - rect.top - offset;
    const totalScrollable = sectionHeight + windowHeight;
    const progress = Math.min(1, (scrolled / totalScrollable) * 1.7);

    return Math.max(0, Math.min(1, progress));
  }

  function updateTopLogo(scrollY) {
    if (!elements.topLogoBrand) return;

    if (scrollY > CONFIG.LOGO_SCROLL_THRESHOLD) {
      elements.topLogoBrand.classList.add("scrolled");
    } else {
      elements.topLogoBrand.classList.remove("scrolled");
    }
  }

  function updateWatchSequence(progress) {
    if (!elements.heroWatchSequence) return;

    const currentFrame = Math.floor(progress * (CONFIG.HERO_FRAMES - 1));
    const framePath = getFrameFilename(currentFrame);

    if (elements.heroWatchSequence.src.indexOf(framePath) === -1) {
      elements.heroWatchSequence.src = framePath;
    }
  }

  function updateLogoWatermark(scrollY) {
    if (!elements.logoWatermark) return;

    const scaleValue = 1 + scrollY * 0.0003;
    const rotateValue = scrollY * 0.05;
    const opacityValue = Math.max(0.06 - scrollY * 0.00008, 0);

    elements.logoWatermark.style.transform = `translate(-50%, -50%) scale(${scaleValue}) rotate(${rotateValue}deg)`;
    elements.logoWatermark.style.opacity = opacityValue;
  }

  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        updateTopLogo(scrollY);

        const sequenceProgress = getWatchSequenceProgress();
        updateWatchSequence(sequenceProgress);

        updateLogoWatermark(scrollY);

        ticking = false;
      });

      ticking = true;
    }
  });

  document.addEventListener("mousemove", (e) => {
    if (!elements.logoWatermark) return;

    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    const scrollY = window.scrollY;
    const scaleValue = 1 + scrollY * 0.0003;
    const rotateValue = scrollY * 0.05;

    elements.logoWatermark.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) scale(${scaleValue}) rotate(${rotateValue}deg)`;
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  document.querySelectorAll(".watch-card").forEach((card) => {
    card.addEventListener("click", function () {
      const watchName = this.querySelector(".watch-name")?.textContent;
      console.log("Watch card clicked:", watchName);
    });
  });

  function init() {
    if (elements.heroWatchSequence) {
      elements.heroWatchSequence.src = getFrameFilename(0);
      preloadFrames();
    }

    console.log("ThirtyThree Collection - Initialized");
  }

  function initCountdown() {
    const targetDate = new Date("2026-03-03T00:00:00").getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const daysEl = document.querySelector(".countdown-number-days");
      const hoursEl = document.querySelector(".countdown-number-hours");
      const minutesEl = document.querySelector(".countdown-number-minutes");
      const secondsEl = document.querySelector(".countdown-number-seconds");
      const daysTextEl = document.querySelector(".footer-days-text");

      if (daysEl) daysEl.textContent = days;
      if (hoursEl) hoursEl.textContent = hours;
      if (minutesEl) minutesEl.textContent = minutes;
      if (secondsEl) secondsEl.textContent = seconds;
      if (daysTextEl) daysTextEl.textContent = days;

      if (distance < 0) {
        clearInterval(countdownInterval);
        const subtitleEl = document.querySelector(".footer-subtitle");
        if (subtitleEl) subtitleEl.textContent = "Now available!";
      }
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
  }

  initCountdown();
  init();
  window.dispatchEvent(new Event("scroll"));
});
