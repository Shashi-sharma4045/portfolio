function AnimatedBackground() {
  const dotRef = React.useRef(null);
  const ringRef = React.useRef(null);
  const glowRef = React.useRef(null);

  // Particles — generated once
  const particles = React.useMemo(() => {
    const p = [];
    for (let i = 0; i < 25; i++) {
      p.push({
        id: i,
        size: Math.random() * 3 + 1.5,
        left: Math.random() * 100,
        delay: Math.random() * 30,
        duration: 22 + Math.random() * 20,
      });
    }
    return p;
  }, []);

  // Cursor follower — pure DOM, zero re-renders
  React.useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!dot || !ring || !glow) return;

    let mx = -100, my = -100;
    let isHovering = false;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      ring.style.transform = `translate(${mx}px, ${my}px)`;
      glow.style.transform = `translate(${mx}px, ${my}px)`;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      glow.style.opacity = '1';
    };

    const onLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      glow.style.opacity = '0';
    };

    const onEnterInteractive = () => {
      isHovering = true;
      dot.classList.add('interactive');
      ring.classList.add('interactive');
    };

    const onLeaveInteractive = () => {
      isHovering = false;
      dot.classList.remove('interactive');
      ring.classList.remove('interactive');
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    // Track interactive elements
    const addInteractiveListeners = () => {
      document.querySelectorAll('a, button, input, textarea, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', onEnterInteractive);
        el.addEventListener('mouseleave', onLeaveInteractive);
      });
    };
    addInteractiveListeners();
    const mo = new MutationObserver((mutations) => {
        // Debounce to not kill performance
        let shouldUpdate = false;
        for (let m of mutations) {
            if (m.addedNodes.length > 0) shouldUpdate = true;
        }
        if (shouldUpdate) addInteractiveListeners();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      mo.disconnect();
    };
  }, []);

  try {
    return (
      <React.Fragment>
        {/* Custom cursor elements */}
        <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} />
        <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} />
        <div ref={glowRef} className="cursor-glow" style={{ opacity: 0 }} />

        {/* Background layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" data-name="animated-background">
          {/* Floating particles */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            {particles.map((p) => (
              <div
                key={p.id}
                className="bg-particle"
                style={{
                  width: p.size + 'px',
                  height: p.size + 'px',
                  left: p.left + '%',
                  animationDelay: p.delay + 's',
                  animationDuration: p.duration + 's',
                }}
              />
            ))}
          </div>

          {/* Ambient gradient orbs — drift + breathe */}
          <div style={{
            position: 'absolute', top: '10%', left: '8%',
            width: '500px', height: '500px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(14, 165, 233,0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'orb-breathe 8s ease-in-out infinite, orb-drift 25s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', bottom: '5%', right: '5%',
            width: '450px', height: '450px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,197,66,0.06) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'orb-breathe 10s ease-in-out 3s infinite, orb-drift 30s ease-in-out 5s infinite',
          }} />
          <div style={{
            position: 'absolute', top: '50%', left: '55%',
            width: '550px', height: '550px', borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(244,114,182,0.04) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'orb-breathe 12s ease-in-out 6s infinite, orb-drift 35s ease-in-out 10s infinite',
          }} />

          {/* Rotating decoration ring */}
          <div style={{
            position: 'absolute', top: '20%', right: '15%',
            width: '180px', height: '180px', borderRadius: '50%',
            border: '1px solid rgba(14, 165, 233,0.06)',
            animation: 'rotate-slow 40s linear infinite',
          }}>
            <div style={{
              position: 'absolute', top: '-3px', left: '50%',
              width: '6px', height: '6px', borderRadius: '50%',
              background: 'rgba(14, 165, 233,0.3)', marginLeft: '-3px',
            }} />
          </div>
          <div style={{
            position: 'absolute', bottom: '25%', left: '10%',
            width: '120px', height: '120px', borderRadius: '50%',
            border: '1px solid rgba(245,197,66,0.05)',
            animation: 'rotate-slow 30s linear reverse infinite',
          }}>
            <div style={{
              position: 'absolute', top: '-3px', left: '50%',
              width: '5px', height: '5px', borderRadius: '50%',
              background: 'rgba(245,197,66,0.25)', marginLeft: '-2.5px',
            }} />
          </div>

          {/* Subtle grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage:
              'linear-gradient(rgba(14, 165, 233,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 165, 233,0.018) 1px, transparent 1px)',
            backgroundSize: '70px 70px',
            opacity: 0.6,
          }} />
        </div>
      </React.Fragment>
    );
  } catch (error) {
    console.error('AnimatedBackground component error:', error);
    return null;
  }
}