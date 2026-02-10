document.addEventListener("DOMContentLoaded", function () {
  const imagePaths = {
    41: {
      noir: [
        "./Assets/Preorder images/41mm/01 - noir men - front.jpg",
        "./Assets/Preorder images/41mm/02 - noir men - back.jpg",
        "./Assets/Preorder images/41mm/03 - noir men - lifestyle 01.jpg",
        "./Assets/Preorder images/41mm/04 - noir men - lifestyle 02.jpg",
      ],
      marine: [
        "./Assets/Preorder images/41mm/09 - marine men - front.jpg",
        "./Assets/Preorder images/41mm/10 - marine men - back.jpg",
        "./Assets/Preorder images/41mm/11 - marine men - lifestyle 01.jpg",
        "./Assets/Preorder images/41mm/12 - marine men - lifestyle 02.jpg",
      ],
      cognac: [
        "./Assets/Preorder images/41mm/05 - cognac men - front.jpg",
        "./Assets/Preorder images/41mm/06 - cognac men - back.jpg",
        "./Assets/Preorder images/41mm/07 - cognac men - lifestyle 01.jpg",
        "./Assets/Preorder images/41mm/08 - cognac men - lifestyle 02.jpg",
      ],
    },
    34: {
      noir: [
        "./Assets/Preorder images/34mm/01 - noir women - front.jpg",
        "./Assets/Preorder images/34mm/02 - noir women - back.jpg",
        "./Assets/Preorder images/34mm/03 - noir women - lifestyle 01.jpg",
        "./Assets/Preorder images/34mm/04 - noir women - lifestyle 02.jpg",
      ],
      marine: [
        "./Assets/Preorder images/34mm/09 - marine women - front.jpg",
        "./Assets/Preorder images/34mm/10 - marine women - back.jpg",
        "./Assets/Preorder images/34mm/11 - marine women - lifestyle 01.jpg",
        "./Assets/Preorder images/34mm/12 - marine women - lifestyle 02.jpg",
      ],
      cognac: [
        "./Assets/Preorder images/34mm/05 - cognac women - front.jpg",
        "./Assets/Preorder images/34mm/06 - cognac women - back.jpg",
        "./Assets/Preorder images/34mm/07 - cognac women - lifestyle 01.jpg",
        "./Assets/Preorder images/34mm/08 - cognac women - lifestyle 02.jpg",
      ],
    },
  };

  let currentSize = "41";
  let currentColor = "noir";
  let currentImageIndex = 0;

  const selectedWatchImage = document.getElementById("selectedWatchImage");
  const sizeOptions = document.querySelectorAll(".size-option");
  const colorSwatches = document.querySelectorAll(".color-swatch");
  const selectedColorName = document.querySelector(".selected-color-name");
  const prevButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");

  function updateCarousel() {
    const images = imagePaths[currentSize][currentColor];
    currentImageIndex = 0;
    updateImage();
    updateDots(images.length);
  }

  function updateImage() {
    const images = imagePaths[currentSize][currentColor];
    selectedWatchImage.src = images[currentImageIndex];
  }

  function updateDots(count) {
    document.querySelectorAll(".dot").forEach((dot) => dot.remove());
    const dotsContainer = document.querySelector(".dots-container");
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("span");
      dot.className = "dot" + (i === 0 ? " active" : "");
      dot.addEventListener("click", () => {
        currentImageIndex = i;
        updateImage();
        updateDotsUI();
        updateArrowStates();
      });
      dotsContainer.appendChild(dot);
    }
    updateArrowStates();
  }

  function updateDotsUI() {
    document.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentImageIndex);
    });
  }

  function updateArrowStates() {
    const images = imagePaths[currentSize][currentColor];
    prevButton.disabled = currentImageIndex === 0;
    nextButton.disabled = currentImageIndex === images.length - 1;
  }

  function navigatePrevious() {
    if (currentImageIndex > 0) {
      currentImageIndex--;
      updateImage();
      updateDotsUI();
      updateArrowStates();
    }
  }

  function navigateNext() {
    const images = imagePaths[currentSize][currentColor];
    if (currentImageIndex < images.length - 1) {
      currentImageIndex++;
      updateImage();
      updateDotsUI();
      updateArrowStates();
    }
  }

  prevButton.addEventListener("click", navigatePrevious);
  nextButton.addEventListener("click", navigateNext);

  sizeOptions.forEach((option) => {
    option.addEventListener("click", () => {
      sizeOptions.forEach((opt) => opt.classList.remove("active"));
      option.classList.add("active");
      currentSize = option.dataset.size === "41mm" ? "41" : "34";
      updateCarousel();
    });
  });

  colorSwatches.forEach((swatch) => {
    swatch.addEventListener("click", () => {
      colorSwatches.forEach((s) => s.classList.remove("active"));
      swatch.classList.add("active");
      currentColor = swatch.dataset.color;
      selectedColorName.textContent = `Color - ${currentColor.charAt(0).toUpperCase() + currentColor.slice(1)}`;
      updateCarousel();
    });
  });

  document.addEventListener("keydown", (e) => {
    const images = imagePaths[currentSize][currentColor];
    if (e.key === "ArrowRight") {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      updateImage();
      updateDotsUI();
      updateArrowStates();
    } else if (e.key === "ArrowLeft") {
      currentImageIndex =
        (currentImageIndex - 1 + images.length) % images.length;
      updateImage();
      updateDotsUI();
      updateArrowStates();
    }
  });

  updateCarousel();
});
