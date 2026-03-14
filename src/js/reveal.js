/* reveal.js — IntersectionObserver scroll animations */
(function() {
  const els = document.querySelectorAll('.reveal');

  // Apply delay from data-delay attribute
  els.forEach(el => {
    const d = el.getAttribute('data-delay');
    if (d) el.style.transitionDelay = d + 'ms';
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // Remove delay after animation so hover etc. aren't delayed
        setTimeout(() => {
          e.target.style.transitionDelay = '0ms';
        }, 1200);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
})();
