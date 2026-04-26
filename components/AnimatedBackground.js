function AnimatedBackground() {
  // Particles — fewer and subtler
  const particles = React.useMemo(() => {
    const p = [];
    for (let i = 0; i < 10; i++) {
      p.push({
        id: i,
        size: Math.random() * 2.5 + 1,
        left: Math.random() * 100,
        delay: Math.random() * 30,
        duration: 25 + Math.random() * 25,
      });
    }
    return p;
  }, []);

  try {
    return (
      <React.Fragment>
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

          {/* Ambient gradient orbs — soft and subtle */}
          <div style={{
            position: 'absolute', top: '10%', left: '8%',
            width: '450px', height: '450px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(100, 181, 246, 0.05) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'orb-breathe 10s ease-in-out infinite, orb-drift 30s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', bottom: '5%', right: '5%',
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(224, 168, 84, 0.04) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'orb-breathe 12s ease-in-out 3s infinite, orb-drift 35s ease-in-out 5s infinite',
          }} />
          <div style={{
            position: 'absolute', top: '50%', left: '55%',
            width: '500px', height: '500px', borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(199, 141, 186, 0.03) 0%, transparent 70%)',
            filter: 'blur(100px)',
            animation: 'orb-breathe 14s ease-in-out 6s infinite, orb-drift 40s ease-in-out 10s infinite',
          }} />
        </div>
      </React.Fragment>
    );
  } catch (error) {
    console.error('AnimatedBackground component error:', error);
    return null;
  }
}