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

// ── Hero Slider ──
(function () {
  const bgs      = document.querySelectorAll('.hero__bg-img');
  const contents = document.querySelectorAll('.hero__slide-content');
  const bars     = document.querySelectorAll('.hero__bar');
  const dots     = document.querySelectorAll('.hero__dot');

  if (!bgs.length) return;

  let current = 0;
  let timer;

  function goTo(index) {
    bgs[current].classList.remove('is-active');
    contents[current].classList.remove('is-active');
    bars[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');

    current = (index + bgs.length) % bgs.length;

    bgs[current].classList.add('is-active');
    contents[current].classList.add('is-active');
    bars[current].classList.add('is-active');
    dots[current].classList.add('is-active');
  }

  function startAuto() {
    timer = setInterval(() => goTo(current + 1), 6000);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(timer);
      goTo(Number(dot.dataset.goto));
      startAuto();
    });
  });

  startAuto();
})();

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

// ── FAQ MCMV accordion ──
document.querySelectorAll('.mcmv__faq-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.mcmv__faq-item');
    const isOpen = item.classList.contains('is-open');
    // fecha todos
    document.querySelectorAll('.mcmv__faq-item.is-open').forEach(el => {
      el.classList.remove('is-open');
      el.querySelector('.mcmv__faq-btn').setAttribute('aria-expanded', 'false');
    });
    // abre o clicado (toggle)
    if (!isOpen) {
      item.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ── Botão "Role para baixo" ──
const scrollDown = document.querySelector('.arrow-btn--down');
if (scrollDown) {
  scrollDown.addEventListener('click', () => {
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
  });
}
