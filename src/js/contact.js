/* contact.js — form handling with Formspree */
(function() {
  const form      = document.getElementById('contactForm');
  const noteEl    = document.getElementById('formNote');
  const submitBtn = document.getElementById('submitLabel');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const name    = form.querySelector('#cName').value.trim();
    const email   = form.querySelector('#cEmail').value.trim();
    const message = form.querySelector('#cMsg').value.trim();

    if (!name || !email || !message) {
      noteEl.textContent = '⚠ Please fill in all required fields.';
      noteEl.className = 'form-note error';
      return;
    }

    submitBtn.textContent = 'Sending…';
    noteEl.textContent = '';
    noteEl.className = 'form-note';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });

      if (res.ok) {
        noteEl.textContent = '✓ Message sent! I\'ll get back to you soon.';
        noteEl.className = 'form-note success';
        form.reset();
        submitBtn.textContent = 'Send Message';
        setTimeout(() => { noteEl.textContent = ''; }, 6000);
      } else {
        throw new Error('Network response not ok');
      }
    } catch {
      noteEl.textContent = '✕ Something went wrong. Please email me directly.';
      noteEl.className = 'form-note error';
      submitBtn.textContent = 'Send Message';
    }
  });
})();
