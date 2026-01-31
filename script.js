document.addEventListener("DOMContentLoaded", function () {
  const CONFIG = {
    HERO_FRAMES: 94,
    LOGO_SCROLL_THRESHOLD: 50,
    WATCH_SWITCH_INTERVALS: [400, 800],
  };

  const elements = {
    topLogoBrand: document.getElementById("topLogoBrand"),
    logoWatermark: document.getElementById("logoWatermark"),
    heroWatchSequence: document.getElementById("heroWatchSequence"),
    watchSequenceSection: document.getElementById("watchSequence"),
    watchShowcaseSection: document.querySelector(".watch-showcase"),
    watchImages: document.querySelectorAll(".watch-image"),
  };

  let currentWatch = 0;

  function getFrameFilename(frameNumber) {
    const paddedNumber = String(frameNumber).padStart(2, "0");
    return `Assets/ThirtyThree ImageSequence/frame_${paddedNumber}_delay-0.05s.webp`;
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
    const progress = scrolled / totalScrollable;

    return Math.max(0, Math.min(1, progress));
  }

  function switchWatch(index) {
    if (
      index < 0 ||
      index >= elements.watchImages.length ||
      index === currentWatch
    ) {
      return;
    }

    if (elements.watchImages[currentWatch]) {
      elements.watchImages[currentWatch].classList.remove("active");
    }

    if (elements.watchImages[index]) {
      elements.watchImages[index].classList.add("active");
    }

    currentWatch = index;
  }

  function getShowcaseScrollPosition() {
    if (!elements.watchShowcaseSection) return -1;

    const showcaseTop = elements.watchShowcaseSection.offsetTop;
    const currentScroll = window.scrollY;

    return currentScroll - showcaseTop;
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

  function updateWatchShowcase() {
    if (elements.watchImages.length === 0) return;

    const showcaseScroll = getShowcaseScrollPosition();

    if (showcaseScroll < 0) {
      if (currentWatch !== 0) {
        switchWatch(0);
      }
      return;
    }

    const [interval1, interval2] = CONFIG.WATCH_SWITCH_INTERVALS;

    if (showcaseScroll < interval1) {
      switchWatch(0);
    } else if (showcaseScroll >= interval1 && showcaseScroll < interval2) {
      switchWatch(1);
    } else if (showcaseScroll >= interval2) {
      switchWatch(2);
    }
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

        updateWatchShowcase();

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

    if (elements.watchImages.length > 0) {
      const hasActiveWatch = Array.from(elements.watchImages).some((watch) =>
        watch.classList.contains("active"),
      );

      if (!hasActiveWatch) {
        elements.watchImages[0].classList.add("active");
        currentWatch = 0;
      } else {
        elements.watchImages.forEach((watch, index) => {
          if (watch.classList.contains("active")) {
            currentWatch = index;
          }
        });
      }
    }

    console.log("ThirtyThree Collection - Initialized");
  }

  init();
  window.dispatchEvent(new Event("scroll"));
});
