const slides = document.querySelectorAll('.hero-slide');
const dots   = document.querySelectorAll('.hero-dot');
let current  = 0;
let autoplay;

function goToSlide(n) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

function startAutoplay() {
  autoplay = setInterval(() => goToSlide(current + 1), 5000);
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    clearInterval(autoplay);
    goToSlide(parseInt(dot.dataset.slide));
    startAutoplay();
  });
});

startAutoplay();

// ─── HEADER SCROLL ───────────────────────────
const header = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('elevated', window.scrollY > 20);
});

// ─── MENU CAROUSEL ───────────────────────────
const track    = document.getElementById('menuTrack');
const cards    = track.querySelectorAll('.menu-card');
const prevBtn  = document.getElementById('menuPrev');
const nextBtn  = document.getElementById('menuNext');
let   carouselPos = 0;

function getCardWidth() {
  const card = cards[0];
  const style = window.getComputedStyle(card);
  return card.offsetWidth + parseInt(style.marginRight || 0) + 20;
}

function getVisibleCount() {
  if (window.innerWidth > 1100) return 4;
  if (window.innerWidth > 860)  return 3;
  return 1;
}

function getMaxPos() {
  return Math.max(0, cards.length - getVisibleCount());
}

function moveCarousel() {
  track.style.transform = `translateX(-${carouselPos * getCardWidth()}px)`;
}

nextBtn.addEventListener('click', () => {
  if (carouselPos < getMaxPos()) { carouselPos++; moveCarousel(); }
});
prevBtn.addEventListener('click', () => {
  if (carouselPos > 0) { carouselPos--; moveCarousel(); }
});

// ─── CATEGORY FILTER ─────────────────────────
function filterMenu(category, el) {
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  carouselPos = 0;
  cards.forEach(card => {
    const cat = card.dataset.category;
    if (category === 'all' || cat === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
  moveCarousel();
}

// ─── MOBILE NAVIGATION ────────────────────────
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');
const navClose = document.getElementById('navClose');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('nav-active');
  hamburger.classList.toggle('active');
});

// Close mobile menu when clicking the close button
navClose.addEventListener('click', () => {
  nav.classList.remove('nav-active');
  hamburger.classList.remove('active');
});

// Close mobile menu when clicking on a navigation link
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('nav-active');
    hamburger.classList.remove('active');
  });
});

// Close mobile menu when clicking outside the navigation
document.addEventListener('click', (e) => {
  if (nav.classList.contains('nav-active') && 
      !nav.contains(e.target) && 
      !hamburger.contains(e.target)) {
    nav.classList.remove('nav-active');
    hamburger.classList.remove('active');
  }
});

// Close mobile menu with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('nav-active')) {
    nav.classList.remove('nav-active');
    hamburger.classList.remove('active');
  }
});

// ─── SCROLL REVEAL ───────────────────────────
const revealEls = document.querySelectorAll(
  '.promo-card, .menu-card, .review-card, .process-card, .gallery-item, .special-card, .about-stat-value'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, (entry.target.dataset.delay || 0));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach((el, i) => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(24px)';
  el.style.transition = `opacity 0.6s ease ${(i % 4) * 0.1}s, transform 0.6s ease ${(i % 4) * 0.1}s`;
  observer.observe(el);
});

// Section headings reveal
document.querySelectorAll('.section-title, .eyebrow').forEach((el, i) => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition= 'opacity 0.7s ease, transform 0.7s ease';
  setTimeout(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, i * 200);
});

// sanity check for category filtering
console.log('filterMenu available?', typeof filterMenu);
