/* nav.js */
(function() {
  const nav    = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const menu   = document.getElementById('mobileMenu');
  const links  = document.querySelectorAll('[data-nav]');
  const sections = document.querySelectorAll('section[id]');

  let lastY = 0;
  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      // Scrolled style
      if (y > 10) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
      // Hide on scroll down, show on scroll up
      if (y > lastY && y > 120) nav.classList.add('hidden');
      else nav.classList.remove('hidden');
      lastY = y;
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // Active link spy
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        const a = document.querySelector(`[data-nav][href="#${e.target.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  // Mobile burger
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();
