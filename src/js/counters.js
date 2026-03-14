/* counters.js — animated number counters */
(function() {
  const nums = document.querySelectorAll('[data-count]');
  if (!nums.length) return;

  function animCount(el, target) {
    let start = 0;
    const dur = 1400;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / dur, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = parseInt(e.target.dataset.count, 10);
        animCount(e.target, target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });

  nums.forEach(n => obs.observe(n));
})();
