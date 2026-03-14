/* skills.js — animate skill bars on scroll */
(function() {
  const bars = document.querySelectorAll('.sbar-fill');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const w = e.target.dataset.w;
        setTimeout(() => {
          e.target.style.width = w + '%';
        }, 200);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(b => obs.observe(b));
})();
