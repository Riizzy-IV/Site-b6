// ── Menu hamburger ──
const hamburger = document.getElementById('menuHamburger');
const menuNav   = document.getElementById('menuNav');

function closeMenu() {
  menuNav.classList.remove('is-open');
  hamburger.classList.remove('is-open');
  hamburger.setAttribute('aria-expanded', 'false');
}

if (hamburger && menuNav) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = menuNav.classList.toggle('is-open');
    hamburger.classList.toggle('is-open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });

  menuNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.menu')) closeMenu();
  });

  // Fecha menu ao redimensionar para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) closeMenu();
  });
}

// ── Carousel de imóveis (desktop) ──
const cardsWrap = document.getElementById('cardsWrap');
const btnPrev   = document.querySelector('.carousel-btn--prev');
const btnNext   = document.querySelector('.carousel-btn--next');

if (cardsWrap && btnPrev && btnNext) {
  const cardWidth = () => {
    const card = cardsWrap.querySelector('.card-imovel');
    if (!card) return 400;
    return card.offsetWidth + parseInt(getComputedStyle(cardsWrap).gap || '0');
  };

  btnNext.addEventListener('click', () => {
    cardsWrap.scrollBy({ left: cardWidth(), behavior: 'smooth' });
  });
  btnPrev.addEventListener('click', () => {
    cardsWrap.scrollBy({ left: -cardWidth(), behavior: 'smooth' });
  });
}

// ── Scroll indicator no menu ──
const menu = document.getElementById('menu');
if (menu) {
  let menuScrolled = false;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 10;
    if (scrolled === menuScrolled) return;
    menuScrolled = scrolled;
    menu.style.boxShadow = scrolled ? '0 2px 20px rgba(0,0,0,.14)' : '';
  }, { passive: true });
}

// ── Slider de Certificações ──
const certSlider = document.getElementById('certSlider');
if (certSlider) {
  const slides = certSlider.querySelectorAll('.cert-slide');
  const tabs   = document.querySelectorAll('.cert-tab');

  function goToSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
    tabs.forEach((t, i)   => t.classList.toggle('is-active', i === index));
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => goToSlide(Number(tab.dataset.tab)));
  });
}

// ── Botão "Role para baixo" ──
const scrollDown = document.querySelector('.arrow-btn--down');
if (scrollDown) {
  scrollDown.addEventListener('click', () => {
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
  });
}
