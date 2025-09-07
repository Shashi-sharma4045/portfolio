function InteractiveElements() {
  const [glowEffects, setGlowEffects] = React.useState([]);
  
  React.useEffect(() => {
    const handleClick = (e) => {
      const newGlow = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      };
      
      setGlowEffects(prev => [...prev, newGlow]);
      
      setTimeout(() => {
        setGlowEffects(prev => prev.filter(glow => glow.id !== newGlow.id));
      }, 1000);
    };
    
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  try {
    return (
      <div className="fixed inset-0 pointer-events-none z-50" data-name="interactive-elements" data-file="components/InteractiveElements.js">
        {glowEffects.map(glow => (
          <div
            key={glow.id}
            className="absolute w-4 h-4 -ml-2 -mt-2 rounded-full"
            style={{
              left: glow.x,
              top: glow.y,
              background: `radial-gradient(circle, var(--primary-color) 0%, transparent 70%)`,
              animation: 'pulse-ring 1s ease-out'
            }}
          />
        ))}
      </div>
    );
  } catch (error) {
    console.error('InteractiveElements component error:', error);
    return null;
  }
}