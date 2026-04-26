// =============================================
// PARTICLE CURSOR TRAIL
// =============================================
(function initCursorTrail() {
  const canvas = document.createElement('canvas');
  canvas.id = 'cursor-trail-canvas';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99998;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  window.addEventListener('resize', () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; });

  const particles = [];
  let mouseX = -999, mouseY = -999;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    for (let i = 0; i < 3; i++) {
      particles.push({
        x: mouseX + (Math.random() - 0.5) * 6,
        y: mouseY + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5 - 0.5,
        life: 1,
        size: Math.random() * 3 + 1,
        r: Math.round(Math.random() * 30 + 180),
        g: 255,
        b: Math.round(Math.random() * 30),
      });
    }
    if (particles.length > 200) particles.splice(0, particles.length - 200);
  });

  function loop() {
    ctx.clearRect(0, 0, W, H);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.04;
      p.size *= 0.96;
      if (p.life <= 0 || p.size < 0.2) { particles.splice(i, 1); continue; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.life * 0.8})`;
      ctx.fill();
    }
    requestAnimationFrame(loop);
  }
  loop();
})();


// =============================================
// SCROLL PROGRESS BAR
// =============================================
(function initScrollBar() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress-bar';
  bar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    width: 0%;
    background: #bcff00;
    box-shadow: 0 0 8px #bcff00, 0 0 20px rgba(188,255,0,0.4);
    z-index: 99999;
    transition: width 0.05s linear;
    pointer-events: none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = total > 0 ? (scrolled / total) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
})();


// =============================================
// HERO GLITCH EFFECT
// =============================================
(function initHeroGlitch() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes glitch-1 {
      0%,94%,100% { clip-path: none; transform: none; }
      95% { clip-path: inset(20% 0 60% 0); transform: translateX(-4px); }
      96% { clip-path: inset(60% 0 10% 0); transform: translateX(4px); }
      97% { clip-path: inset(40% 0 30% 0); transform: translateX(-2px) skewX(1deg); }
      99% { clip-path: none; transform: translateX(0); }
    }
    @keyframes glitch-color {
      0%,94%,100% { text-shadow: none; }
      95% { text-shadow: 3px 0 rgba(255,0,80,0.7), -3px 0 rgba(0,255,200,0.7); }
      97% { text-shadow: -3px 0 rgba(255,0,80,0.7), 3px 0 rgba(0,255,200,0.7); }
      99% { text-shadow: none; }
    }
    .hero-glitch-target {
      animation: glitch-1 8s ease infinite, glitch-color 8s ease infinite;
      display: inline-block;
    }
  `;
  document.head.appendChild(style);

  // Apply after React renders
  setTimeout(() => {
    const h1Spans = document.querySelectorAll('#hero h1 span');
    h1Spans.forEach(el => el.classList.add('hero-glitch-target'));
  }, 2000);
})();


// =============================================
// NOISE / FILM GRAIN TEXTURE OVERLAY
// =============================================
(function initGrain() {
  const grain = document.createElement('canvas');
  grain.id = 'grain-overlay';
  grain.width = 256;
  grain.height = 256;
  grain.style.cssText = `
    position: fixed; top: 0; left: 0;
    width: 100vw; height: 100vh;
    pointer-events: none; z-index: 99997;
    opacity: 0.028;
    mix-blend-mode: overlay;
  `;
  document.body.appendChild(grain);

  const gCtx = grain.getContext('2d');
  function generateNoise() {
    const img = gCtx.createImageData(256, 256);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255;
      img.data[i] = img.data[i+1] = img.data[i+2] = v;
      img.data[i+3] = 255;
    }
    gCtx.putImageData(img, 0, 0);
  }
  generateNoise();
  setInterval(generateNoise, 80);
})();
