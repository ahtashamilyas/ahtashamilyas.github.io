/* tabs.js — education / certifications tab switcher */
(function() {
  const tabs   = document.querySelectorAll('.edu-tab');
  const panels = document.querySelectorAll('.edu-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const panel = document.getElementById('tab-' + target);
      if (panel) panel.classList.add('active');
    });
  });

  // Show more certificates
  const showMoreBtn = document.getElementById('showMoreCerts');
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
      const hidden = document.querySelectorAll('.cert-hidden');
      const expanded = showMoreBtn.dataset.expanded === 'true';

      if (!expanded) {
        hidden.forEach(c => {
          c.classList.remove('cert-hidden');
          c.classList.add('visible');
        });
        showMoreBtn.textContent = 'Show Less −';
        showMoreBtn.dataset.expanded = 'true';
      } else {
        hidden.forEach(c => c.classList.add('cert-hidden'));
        // re-add original hidden ones
        document.querySelectorAll('.cert-card:nth-child(n+7)').forEach(c => {
          c.classList.add('cert-hidden');
        });
        showMoreBtn.textContent = 'Show More Certificates +';
        showMoreBtn.dataset.expanded = 'false';
      }
    });
  }
})();
