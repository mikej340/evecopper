const shopCatalog = [
  {
    name: 'Trinity',
    price: '£70',
    images: [
      'images/cat/trinity/IMG_6155.jpeg',
      'images/cat/trinity/IMG_6137.jpeg',
      'images/cat/trinity/IMG_6166.jpeg',
      'images/cat/trinity/IMG_6171.jpeg',
      'images/cat/trinity/IMG_6202.jpeg'
    ]
  },
  {
    name: 'Cleo',
    price: '£95',
    images: [
      'images/cat/cleo/IMG_6303.jpeg',
      'images/cat/cleo/IMG_6311.jpeg',
      'images/cat/cleo/IMG_6315.jpeg',
      'images/cat/cleo/IMG_6322.jpeg',
      'images/cat/cleo/IMG_6324.jpeg',
      'images/cat/cleo/IMG_6328.jpeg',
      'images/cat/cleo/IMG_6333.jpeg',
      'images/cat/cleo/IMG_6346.jpeg',
      'images/cat/cleo/IMG_6352.jpeg'
    ]
  },
  {
    name: 'Arc',
    price: '£125',
    images: [
      'images/cat/arc/sq-tabard-re-1.jpg',
      'images/cat/arc/sq-tabard-re-4.jpg',
      'images/cat/arc/sq-tabard-re-5.jpg',
      'images/cat/arc/sq-tabard-re-7.jpg',
      'images/cat/arc/sq-tabard-re-10.jpg',
      'images/cat/arc/sq-tabard-re-11.jpg',
      'images/cat/arc/sq-tabard-re-12.jpg'
    ]
  },
  {
    name: 'Beatrix',
    price: '£70',
    images: [
      'images/cat/beatrix/sq-beatrix-mi-2.jpg',
      'images/cat/beatrix/sq-beatrix-mi-1.jpg',
      'images/cat/beatrix/sq-beatrix-mi-3.jpg'
    ]
  },
  {
    name: 'Scarfigan',
    price: '£75',
    images: [
      'images/cat/scarfigan/test02252.jpg',
      'images/cat/scarfigan/test02228.jpg',
      'images/cat/scarfigan/test02234.jpg',
      'images/cat/scarfigan/test02243.jpg',
      'images/cat/scarfigan/test02245.jpg'
    ]
  },
  {
    name: 'Connor',
    price: '£65',
    images: [
      'images/cat/connor/sq-connor-bl-3.jpg',
      'images/cat/connor/sq-connor-bl-1.jpg',
      'images/cat/connor/sq-connor-bl-2.jpg',
      'images/cat/connor/sq-connor-bl-4.jpg',
      'images/cat/connor/sq-connor-bl-7.jpg'
    ]
  },
  {
    name: 'Maya',
    price: '£70',
    images: [
      'images/cat/maya/IMG_6279.jpeg',
      'images/cat/maya/IMG_6260.jpeg',
      'images/cat/maya/IMG_6273.jpeg',
      'images/cat/maya/IMG_6275.jpeg',
      'images/cat/maya/IMG_6283.jpeg',
      'images/cat/maya/IMG_6288.jpeg',
      'images/cat/maya/IMG_6291.jpeg'
    ]
  }
];

document.addEventListener('DOMContentLoaded', () => {
  renderShopCatalog();

  document.querySelectorAll('.product-carousel').forEach(carousel => {
    initCarousel(carousel);
  });
});

function renderShopCatalog() {
  const grid = document.querySelector('#products-grid');
  if (!grid) return;

  grid.innerHTML = shopCatalog.map(product => {
    const slides = product.images.map((src, index) => `
      <li class="carousel-slide${index === 0 ? ' active' : ''}">
        <img src="${escapeHtml(src)}"
             alt="${escapeHtml(product.name)} look ${index + 1}"
             ${index === 0 ? '' : 'loading="lazy"'}
             decoding="async"
             width="800" height="1000">
        <span class="slide-label">Look ${index + 1}</span>
      </li>
    `).join('');

    const dots = product.images.map((_, index) => `
      <button class="carousel-dot${index === 0 ? ' active' : ''}"
              role="tab"
              aria-selected="${index === 0 ? 'true' : 'false'}"
              aria-label="Look ${index + 1}"></button>
    `).join('');

    return `
      <article class="product-card">
        <div class="product-carousel" role="region" aria-label="${escapeHtml(product.name)} looks" tabindex="0">
          <div class="carousel-track-container">
            <ul class="carousel-track" aria-live="polite">
              ${slides}
            </ul>
          </div>
          <div class="carousel-controls">
            <button class="carousel-btn carousel-prev" aria-label="Previous look">&#8249;</button>
            <button class="carousel-btn carousel-next" aria-label="Next look">&#8250;</button>
          </div>
          <div class="carousel-dots" role="tablist" aria-label="Select look">
            ${dots}
          </div>
        </div>
        <div class="product-info">
          <h2 class="product-name">${escapeHtml(product.name)}</h2>
          ${product.price ? `<p class="product-price">${escapeHtml(product.price)}</p>` : ''}
          <p class="product-looks-label">${product.images.length} ${product.images.length === 1 ? 'photo' : 'photos'}</p>
        </div>
      </article>
    `;
  }).join('');
}

function initCarousel(carousel) {
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));
  const prev = carousel.querySelector('.carousel-prev');
  const next = carousel.querySelector('.carousel-next');
  let current = 0;

  if (!slides.length || !dots.length || !prev || !next) return;

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
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(current - 1);
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(current + 1);
    }
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

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[character]));
}
