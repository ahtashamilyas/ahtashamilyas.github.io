/* preloader.js */
(function() {
  const loader   = document.getElementById('preloader');
  const progress = document.querySelector('.pre-progress');
  const label    = document.querySelector('.pre-label');

  const steps = [
    { pct: 20,  text: 'Loading assets...' },
    { pct: 45,  text: 'Initializing 3D scene...' },
    { pct: 70,  text: 'Building UI...' },
    { pct: 90,  text: 'Almost ready...' },
    { pct: 100, text: 'Ready.' }
  ];

  let i = 0;
  function tick() {
    if (i >= steps.length) return;
    const s = steps[i++];
    progress.style.width = s.pct + '%';
    label.textContent = s.text;
    if (i < steps.length) {
      setTimeout(tick, 280 + Math.random() * 200);
    } else {
      setTimeout(() => {
        loader.classList.add('done');
        document.body.style.overflow = '';
      }, 350);
    }
  }

  document.body.style.overflow = 'hidden';

  window.addEventListener('load', () => {
    setTimeout(tick, 200);
  });

  // Fallback
  setTimeout(() => {
    if (loader && !loader.classList.contains('done')) {
      loader.classList.add('done');
      document.body.style.overflow = '';
    }
  }, 4000);
})();
