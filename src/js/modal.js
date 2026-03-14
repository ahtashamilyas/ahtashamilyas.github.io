/* modal.js — services FAB modal */
(function() {
  const fab     = document.getElementById('fabServices');
  const modal   = document.getElementById('servicesModal');
  const closeBtn = document.getElementById('closeServices');

  function open()  { modal.classList.add('open');    document.body.style.overflow = 'hidden'; }
  function close() { modal.classList.remove('open'); document.body.style.overflow = ''; }

  if (fab)      fab.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) close();
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });
})();
