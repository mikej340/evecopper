document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.product-carousel').forEach(carousel => {
    initCarousel(carousel);
  });
});

function initCarousel(carousel) {
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const dots   = Array.from(carousel.querySelectorAll('.carousel-dot'));
  const prev   = carousel.querySelector('.carousel-prev');
  const next   = carousel.querySelector('.carousel-next');
  let current  = 0;

  function goTo(index) {
    index = (index + slides.length) % slides.length;

    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    dots[current].setAttribute('aria-selected', 'false');

    current = index;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    dots[current].setAttribute('aria-selected', 'true');
  }

  prev.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(current - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
  });

  let touchStartX = 0;
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 40) {
      goTo(delta < 0 ? current + 1 : current - 1);
    }
  }, { passive: true });
}
