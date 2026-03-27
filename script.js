// ---------------------- FADE-IN + SLIDE-IN OBSERVER ----------------------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.15 });

// observe ALL animated elements (ADDED .gameStats)
document.querySelectorAll(".fade-in, .slide-in, .showcaseSection, .gameStats").forEach(el => {
  observer.observe(el);
});


// ---------------------- PARALLAX ----------------------
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  document.querySelectorAll(".parallax").forEach(el => {
    const speed = 0.2;
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
});


// ---------------------- HERO LOAD ----------------------
window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.hero h1')?.classList.add('show');
  document.querySelector('.hero h2')?.classList.add('show');
  document.querySelector('.hero h3')?.classList.add('show');
  document.querySelector('.cardContainer')?.classList.add('show');
});


// ---------------------- SHOWCASE CAROUSEL ----------------------
const track = document.querySelector(".carouselTrack");
const pages = document.querySelectorAll(".carouselPage");
const leftBtn = document.querySelector(".arrow.left");
const rightBtn = document.querySelector(".arrow.right");
const title = document.getElementById("showcaseCategory");

const categories = ["COMBAT", "FPS/GUN SYSTEMS", "UI", "VEHICLES"];

let index = 0;
let isAnimating = false;

function updateCarousel() {
  if (!track || pages.length === 0) return;

  isAnimating = true;

  track.style.transform = `translateX(-${index * 100}%)`;

  pages.forEach((page, i) => {
    page.classList.toggle("active", i === index);
  });

  if (title) {
    title.style.opacity = 0;
    title.style.transform = "translateY(10px)";

    setTimeout(() => {
      title.textContent = categories[index];
      title.style.opacity = 1;
      title.style.transform = "translateY(0)";
    }, 200);
  }

  setTimeout(() => {
    isAnimating = false;
  }, 800);
}

if (rightBtn && leftBtn) {
  rightBtn.addEventListener("click", () => {
    if (isAnimating) return;
    index = (index + 1) % pages.length;
    updateCarousel();
  });

  leftBtn.addEventListener("click", () => {
    if (isAnimating) return;
    index = (index - 1 + pages.length) % pages.length;
    updateCarousel();
  });
}

document.addEventListener("keydown", (e) => {
  if (isAnimating) return;

  if (e.key === "ArrowRight") rightBtn?.click();
  if (e.key === "ArrowLeft") leftBtn?.click();
});

updateCarousel();


// ---------------------- GAME CAROUSEL ----------------------
const gameTrack = document.querySelector(".gameTrack");
const gameSlides = document.querySelectorAll(".gameSlide");
const gameLeft = document.querySelector(".gameArrow.left");
const gameRight = document.querySelector(".gameArrow.right");

// ✅ FIX: scope dots to Section 3 only
const gameDots = document.querySelectorAll(".gameDots .dotIndicator");

let gameIndex = 0;

function updateGameCarousel() {
    gameTrack.style.transform = `translateX(-${gameIndex * 100}%)`;

    gameSlides.forEach((slide, i) => {
        const isActive = i === gameIndex;

        slide.classList.toggle("active", isActive);

        // animate stats ONLY on active slide
        const stats = slide.querySelector(".gameStats");
        if (stats) stats.classList.toggle("show", isActive);
    });

    // update dots properly for Section 3
    gameDots.forEach((dot, i) => {
        dot.classList.toggle("active", i === gameIndex);
    });
}

// buttons
gameRight?.addEventListener("click", () => {
    gameIndex = (gameIndex + 1) % gameSlides.length;
    updateGameCarousel();
});

gameLeft?.addEventListener("click", () => {
    gameIndex = (gameIndex - 1 + gameSlides.length) % gameSlides.length;
    updateGameCarousel();
});

// keyboard
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") gameRight?.click();
    if (e.key === "ArrowLeft") gameLeft?.click();
});

// initialize properly
updateGameCarousel();

function scrollToSection(id) {
    const section = document.getElementById(id);

    if (section) {
        section.scrollIntoView({
            behavior: "smooth"
        });
    }
}