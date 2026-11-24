/* counters.js — animated number counters */
(function() {
  const nums = document.querySelectorAll('[data-count]');
  if (!nums.length) return;

  const started = new WeakSet();

  function animCount(el, target) {
    if (started.has(el)) return;
    started.add(el);
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

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  }

  if (!('IntersectionObserver' in window)) {
    nums.forEach(el => animCount(el, Number(el.dataset.count)));
    return;
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animCount(entry.target, Number(entry.target.dataset.count));
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });

  nums.forEach(el => {
    if (isInViewport(el)) animCount(el, Number(el.dataset.count));
    else obs.observe(el);
  });
})();
