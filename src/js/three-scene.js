/* three-scene.js — Three.js floating 3D shapes in hero */
(function() {
  if (typeof THREE === 'undefined') return;

  const canvas = document.getElementById('three-canvas');
  if (!canvas) return;

  // ── SCENE SETUP ──────────────────────────────────
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
  camera.position.set(0, 0, 8);

  // ── LIGHTS ───────────────────────────────────────
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);

  const dirLight = new THREE.DirectionalLight(0x1a56db, 1.2);
  dirLight.position.set(5, 8, 5);
  scene.add(dirLight);

  const rimLight = new THREE.DirectionalLight(0xd95f2b, 0.6);
  rimLight.position.set(-6, -4, 2);
  scene.add(rimLight);

  // ── MATERIALS ────────────────────────────────────
  const matWire = new THREE.MeshStandardMaterial({
    color: 0x1a56db,
    metalness: 0.7,
    roughness: 0.2,
    wireframe: false,
    transparent: true,
    opacity: 0.55,
  });

  const matSolid = new THREE.MeshStandardMaterial({
    color: 0xd95f2b,
    metalness: 0.8,
    roughness: 0.15,
    transparent: true,
    opacity: 0.7,
  });

  const matGlass = new THREE.MeshStandardMaterial({
    color: 0x1b1a17,
    metalness: 0.9,
    roughness: 0.05,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
  });

  // ── SHAPES ───────────────────────────────────────
  const shapes = [];

  function addShape(geo, mat, pos, rot, scale) {
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...pos);
    mesh.rotation.set(...rot);
    mesh.scale.setScalar(scale);
    scene.add(mesh);

    // Wire edges
    const edges = new THREE.EdgesGeometry(geo);
    const line  = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: mat.color, transparent: true, opacity: 0.4 })
    );
    mesh.add(line);

    shapes.push({
      mesh,
      rotSpeed: {
        x: (Math.random() - 0.5) * 0.008,
        y: (Math.random() - 0.5) * 0.012,
        z: (Math.random() - 0.5) * 0.006,
      },
      floatAmp:   Math.random() * 0.25 + 0.1,
      floatSpeed: Math.random() * 0.4 + 0.3,
      floatOffset: Math.random() * Math.PI * 2,
      originY: pos[1],
    });
    return mesh;
  }

  // Icosahedron (main large)
  addShape(
    new THREE.IcosahedronGeometry(1.6, 0),
    matWire,
    [1.2, 0.5, -1], [0.3, 0.5, 0.1], 1
  );

  // Torus (ring)
  addShape(
    new THREE.TorusGeometry(0.9, 0.25, 16, 48),
    matSolid,
    [-1.8, 1.8, -2], [1.2, 0.4, 0.3], 1
  );

  // Octahedron
  addShape(
    new THREE.OctahedronGeometry(0.9, 0),
    matGlass,
    [2.8, -1.2, -3], [0.6, 0.8, 0.2], 1
  );

  // Small dodecahedron
  addShape(
    new THREE.DodecahedronGeometry(0.6, 0),
    matSolid,
    [-2.5, -0.8, -1], [0.5, 0.3, 0.7], 1
  );

  // Cone
  addShape(
    new THREE.ConeGeometry(0.55, 1.1, 5),
    matWire,
    [0.5, -2, -2], [0.2, 0.4, 0.1], 1
  );

  // Small sphere cluster
  for (let i = 0; i < 5; i++) {
    const s = new THREE.Mesh(
      new THREE.SphereGeometry(0.08 + Math.random()*0.1, 8, 8),
      new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x1a56db : 0xd95f2b,
        metalness: 0.9, roughness: 0.1,
        transparent: true, opacity: 0.8
      })
    );
    s.position.set(
      (Math.random()-0.5)*6,
      (Math.random()-0.5)*5,
      (Math.random())*(-4)
    );
    scene.add(s);
    shapes.push({
      mesh: s,
      rotSpeed: { x: 0.01, y: 0.01, z: 0.01 },
      floatAmp: 0.3 + Math.random()*0.2,
      floatSpeed: 0.5 + Math.random()*0.6,
      floatOffset: Math.random()*Math.PI*2,
      originY: s.position.y
    });
  }

  // ── MOUSE PARALLAX ───────────────────────────────
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener('mousemove', e => {
    targetX = (e.clientX / window.innerWidth  - 0.5) * 1.2;
    targetY = (e.clientY / window.innerHeight - 0.5) * -0.8;
  });

  // ── RESIZE ───────────────────────────────────────
  function resize() {
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);

  // ── ANIMATE ──────────────────────────────────────
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Smooth mouse
    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;

    // Rotate group via camera nudge
    camera.position.x = currentX * 0.6;
    camera.position.y = currentY * 0.6;
    camera.lookAt(0, 0, 0);

    // Individual shape animations
    shapes.forEach(s => {
      s.mesh.rotation.x += s.rotSpeed.x;
      s.mesh.rotation.y += s.rotSpeed.y;
      s.mesh.rotation.z += s.rotSpeed.z;
      // Float
      s.mesh.position.y = s.originY
        + Math.sin(t * s.floatSpeed + s.floatOffset) * s.floatAmp;
    });

    renderer.render(scene, camera);
  }
  animate();
})();
