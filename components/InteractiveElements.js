function InteractiveElements() {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (e) => {
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: fixed;
        left: ${e.clientX}px; top: ${e.clientY}px;
        width: 8px; height: 8px;
        margin-left: -4px; margin-top: -4px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(14, 165, 233,0.6) 0%, rgba(245,197,66,0.3) 50%, transparent 70%);
        pointer-events: none; z-index: 99990;
        animation: click-ripple 0.7s ease-out forwards;
      `;
      container.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  try {
    return (
      <div
        ref={containerRef}
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99990 }}
        data-name="interactive-elements"
      />
    );
  } catch (error) {
    console.error('InteractiveElements component error:', error);
    return null;
  }
}