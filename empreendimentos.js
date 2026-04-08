// Filtro de empreendimentos
document.addEventListener('DOMContentLoaded', function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card-emp');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.dataset.filter;

      // atualiza botão ativo
      filterBtns.forEach(function (b) { b.classList.remove('filter-btn--active'); });
      btn.classList.add('filter-btn--active');

      // mostra/esconde cards
      cards.forEach(function (card) {
        if (filter === 'todos' || card.dataset.status === filter) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
});
