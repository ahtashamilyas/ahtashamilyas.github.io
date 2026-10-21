(function () {
  const navToggle = document.querySelector('.sf3d-nav-toggle');
  const navLinks = document.getElementById('sf3d-nav-links');
  const yearElement = document.getElementById('sf3d-year');

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  if (!navToggle || !navLinks) {
    return;
  }

  navToggle.addEventListener('click', function () {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    navLinks.classList.toggle('is-open');
  });

  navLinks.addEventListener('click', function (event) {
    if (event.target instanceof HTMLAnchorElement) {
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('is-open');
    }
  });
})();
