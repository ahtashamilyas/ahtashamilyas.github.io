/* experience.js — accessible experience timeline expansion */
(function() {
  const button = document.getElementById('experienceToggle');
  const panel = document.getElementById('moreExperience');
  if (!button || !panel) return;

  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(expanded));
    button.textContent = expanded ? 'Show Less Experience' : 'Show More Experience (+3)';
    panel.classList.toggle('is-expanded', expanded);
    panel.setAttribute('aria-hidden', String(!expanded));
    panel.inert = !expanded;
  });
})();
