/* tabs.js — certification filters and expand/collapse */
(function() {
  const cards = Array.from(document.querySelectorAll('.cert-card'));
  const filters = document.querySelectorAll('[data-cert-filter]');
  const showMore = document.getElementById('showMoreCerts');
  if (!cards.length) return;

  let activeFilter = 'all';
  let showAll = false;

  function updateCards() {
    cards.forEach((card, index) => {
      const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter;
      card.hidden = !matchesFilter || (!showAll && index >= 6);
    });
  }

  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      activeFilter = filter.dataset.certFilter;
      filters.forEach(item => {
        const isActive = item === filter;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });
      updateCards();
    });
  });

  if (showMore) {
    showMore.addEventListener('click', () => {
      showAll = !showAll;
      showMore.setAttribute('aria-expanded', String(showAll));
      showMore.textContent = showAll ? 'Show Fewer Certifications' : 'View All Certifications';
      updateCards();
    });
  }

  updateCards();
})();
