/* hero.js — typewriter + particle field */
(function() {
  // ── TYPEWRITER ─────────────────────────────────
  const el = document.getElementById('heroRole');
  if (!el) return;

  const phrases = [
    'AI Researcher',
    'Machine Learning Engineer',
    'Robotics Enthusiast',
    'Deep Learning Practitioner',
    'Data Scientist',
    'Computer Vision Developer',
  ];

  let pi = 0, ci = 0, deleting = false;
  const SPEED_TYPE = 75;
  const SPEED_DEL  = 40;
  const PAUSE_END  = 1800;
  const PAUSE_START = 400;

  function type() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) {
        deleting = true;
        setTimeout(type, PAUSE_END);
        return;
      }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        setTimeout(type, PAUSE_START);
        return;
      }
    }
    setTimeout(type, deleting ? SPEED_DEL : SPEED_TYPE);
  }
  setTimeout(type, 1600);

  // ── PARTICLE FIELD ─────────────────────────────
  const field = document.getElementById('particleField');
  if (!field) return;

  const COUNT = 28;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 1.5;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${8 + Math.random() * 14}s;
      animation-delay: ${Math.random() * 12}s;
      opacity: 0;
    `;
    field.appendChild(p);
  }

  // ── 2D NEURAL CANVAS (hero bg) ─────────────────
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  const nodes = [];
  const NCOUNT = 55;
  const CDIST  = 150;
  let mouse = { x: -999, y: -999 };

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < NCOUNT; i++) {
    nodes.push({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r:  1 + Math.random() * 1.8
    });
  }

  document.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });

  function draw() {
    ctx.clearRect(0, 0, W, H);

    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
      // Mouse attraction
      const dx = mouse.x - n.x, dy = mouse.y - n.y;
      const d = Math.sqrt(dx*dx + dy*dy);
      if (d < 200) {
        n.vx += (dx / d) * 0.012;
        n.vy += (dy / d) * 0.012;
        // Speed cap
        const spd = Math.sqrt(n.vx*n.vx + n.vy*n.vy);
        if (spd > 1.2) { n.vx *= 0.95; n.vy *= 0.95; }
      }
    });

    // Edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i+1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const d = Math.hypot(a.x-b.x, a.y-b.y);
        if (d < CDIST) {
          const alpha = (1 - d/CDIST) * 0.35;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(26,86,219,${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    // Nodes
    nodes.forEach((n, i) => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
      const p = 0.5 + 0.5 * Math.sin(Date.now()*0.0008 + i*0.4);
      ctx.fillStyle = i % 8 === 0
        ? `rgba(217,95,43,${0.5 + 0.4*p})`
        : `rgba(26,86,219,${0.4 + 0.5*p})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
})();
