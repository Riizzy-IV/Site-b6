// Filtro de empreendimentos
document.addEventListener('DOMContentLoaded', function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const sections   = document.querySelectorAll('.emp-category[data-category]');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.dataset.filter;

      // atualiza botão ativo
      filterBtns.forEach(function (b) { b.classList.remove('filter-btn--active'); });
      btn.classList.add('filter-btn--active');

      // mostra/esconde seções por categoria
      sections.forEach(function (section) {
        if (filter === 'todos' || section.dataset.category === filter) {
          section.style.display = '';
        } else {
          section.style.display = 'none';
        }
      });
    });
  });
});
