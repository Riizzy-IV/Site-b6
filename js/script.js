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

// ── Dropdown menu ──
const dropdown = document.querySelector('.menu__dropdown');
const dropdownToggle = document.querySelector('.menu__dropdown-toggle');
if (dropdown && dropdownToggle) {
  dropdownToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = dropdown.classList.toggle('is-open');
    dropdownToggle.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.menu__dropdown')) {
      dropdown.classList.remove('is-open');
      dropdownToggle.setAttribute('aria-expanded', 'false');
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      dropdown.classList.remove('is-open');
      dropdownToggle.setAttribute('aria-expanded', 'false');
    }
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

  const btnPrev = document.getElementById('heroPrev');
  const btnNext = document.getElementById('heroNext');

  if (btnPrev) btnPrev.addEventListener('click', () => {
    clearInterval(timer);
    goTo(current - 1);
    startAuto();
  });

  if (btnNext) btnNext.addEventListener('click', () => {
    clearInterval(timer);
    goTo(current + 1);
    startAuto();
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

// ── Lightbox das galerias de empreendimentos ──
(function () {
  const galleries = document.querySelectorAll('.emp-gallery');
  if (!galleries.length) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML =
    '<button class="lightbox__close" aria-label="Fechar">&times;</button>' +
    '<button class="lightbox__btn lightbox__btn--prev" aria-label="Imagem anterior">' +
    '<svg width="14" height="24" viewBox="0 0 12 20" fill="none"><path d="M11 1L1 10l10 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>' +
    '</button>' +
    '<img class="lightbox__img" src="" alt="" />' +
    '<button class="lightbox__btn lightbox__btn--next" aria-label="Próxima imagem">' +
    '<svg width="14" height="24" viewBox="0 0 12 20" fill="none"><path d="M1 1l10 9-10 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>' +
    '</button>';
  document.body.appendChild(lightbox);

  const lbImg = lightbox.querySelector('.lightbox__img');
  const lbPrev = lightbox.querySelector('.lightbox__btn--prev');
  const lbNext = lightbox.querySelector('.lightbox__btn--next');
  const lbClose = lightbox.querySelector('.lightbox__close');

  let currentImgs = [];
  let currentIndex = 0;

  function updateLightbox() {
    const img = currentImgs[currentIndex];
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    const multi = currentImgs.length > 1;
    lbPrev.style.display = multi ? 'flex' : 'none';
    lbNext.style.display = multi ? 'flex' : 'none';
  }

  function openLightbox(imgs, index) {
    currentImgs = imgs;
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  lbPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentImgs.length) % currentImgs.length;
    updateLightbox();
  });
  lbNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentImgs.length;
    updateLightbox();
  });
  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lbPrev.click();
    if (e.key === 'ArrowRight') lbNext.click();
  });

  galleries.forEach(gallery => {
    const imgs = Array.from(gallery.querySelectorAll('.emp-gallery__slide img'));
    if (!imgs.length) return;
    imgs.forEach(img => {
      img.addEventListener('click', () => openLightbox(imgs, imgs.indexOf(img)));
    });
  });
})();

// ── Botão flutuante do WhatsApp ──
(function () {
  const link = document.createElement('a');
  link.href = 'https://wa.me/5515988117788';
  link.target = '_blank';
  link.rel = 'noopener';
  link.className = 'whatsapp-float';
  link.setAttribute('aria-label', 'Fale conosco pelo WhatsApp');
  link.innerHTML =
    '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M16.004 3C9.007 3 3.334 8.673 3.334 15.67c0 2.36.646 4.567 1.77 6.458L3 29l7.05-2.076a12.6 12.6 0 005.954 1.516h.004c6.996 0 12.669-5.673 12.669-12.67C28.677 8.673 23.004 3 16.004 3zm0 23.043h-.003a10.5 10.5 0 01-5.354-1.467l-.384-.228-3.984 1.174 1.192-3.883-.25-.398a10.516 10.516 0 01-1.616-5.612c0-5.816 4.734-10.55 10.552-10.55 2.818 0 5.466 1.098 7.456 3.09a10.478 10.478 0 013.09 7.462c0 5.816-4.734 10.55-10.55 10.55z" fill="#fff"/>' +
    '<path d="M21.61 18.204c-.306-.153-1.81-.893-2.09-.995-.28-.102-.484-.153-.688.153-.204.306-.79.995-.968 1.199-.178.204-.357.23-.663.077-.306-.153-1.293-.477-2.462-1.52-.91-.812-1.525-1.815-1.703-2.121-.178-.306-.019-.472.134-.624.138-.137.306-.357.459-.535.153-.179.204-.306.306-.51.102-.204.051-.383-.026-.536-.076-.153-.688-1.658-.943-2.271-.248-.598-.5-.517-.688-.526l-.586-.01c-.204 0-.535.076-.815.383-.28.306-1.069 1.045-1.069 2.55 0 1.505 1.094 2.96 1.247 3.164.153.204 2.153 3.287 5.216 4.61.729.315 1.297.503 1.74.643.731.232 1.396.2 1.923.121.587-.088 1.809-.74 2.064-1.454.255-.714.255-1.326.178-1.454-.076-.128-.28-.204-.586-.357z" fill="#fff"/>' +
    '</svg>';
  document.body.appendChild(link);
})();
