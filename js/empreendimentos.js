// Filtro de categoria (via link do menu, ex: ?filter=comerciais)
document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.emp-category[data-category]');
  const filterParam = new URLSearchParams(window.location.search).get('filter');

  if (filterParam && filterParam !== 'todos') {
    sections.forEach(function (section) {
      section.style.display = section.dataset.category === filterParam ? '' : 'none';
    });
  }

  // Subfiltro de status, apenas na seção Residencial (condomínios)
  const statusBtns = document.querySelectorAll('.emp-subfilters .filter-btn');
  const residencialCards = document.querySelectorAll('.emp-category[data-category="condominios"] .card-emp[data-status]');

  statusBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      statusBtns.forEach(function (b) { b.classList.remove('filter-btn--active'); });
      btn.classList.add('filter-btn--active');

      const status = btn.dataset.status;
      residencialCards.forEach(function (card) {
        card.style.display = (status === 'todos' || card.dataset.status === status) ? '' : 'none';
      });
    });
  });
});
