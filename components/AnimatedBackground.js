function AnimatedBackground() {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [particles, setParticles] = React.useState([]);
  
  React.useEffect(() => {
    // Generate particles
    const newParticles = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        size: Math.random() * 4 + 1,
        left: Math.random() * 100,
        animationDelay: Math.random() * 20,
        duration: 20 + Math.random() * 15
      });
    }
    setParticles(newParticles);
    
    // Mouse move handler
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  try {
    return (
      <div className="absolute inset-0 overflow-hidden" data-name="animated-background" data-file="components/AnimatedBackground.js">
        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        
        {/* Floating Particles */}
        <div className="floating-particles">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="particle"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.left}%`,
                animationDelay: `${particle.animationDelay}s`,
                animationDuration: `${particle.duration}s`
              }}
            />
          ))}
        </div>
        
        {/* Mouse Follow Effect */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.3s ease'
          }}
        >
          <div className="pulse-ring w-20 h-20"></div>
          <div className="pulse-ring w-20 h-20" style={{ animationDelay: '1s' }}></div>
          <div className="pulse-ring w-20 h-20" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Matrix Rain Effect */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px bg-[var(--primary-color)] opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                height: `${20 + Math.random() * 40}px`,
                animation: `matrix-rain ${3 + Math.random() * 4}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[var(--primary-color)] to-transparent rounded-full opacity-5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-[var(--secondary-color)] to-transparent rounded-full opacity-5 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    );
  } catch (error) {
    console.error('AnimatedBackground component error:', error);
    return null;
  }
}