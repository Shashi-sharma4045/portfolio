// Animation utilities for the portfolio

// Intersection Observer helper for scroll animations
function useScrollAnimation(threshold = 0.3) {
  const [isVisible, setIsVisible] = React.useState(false);
  const elementRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [elementRef, isVisible];
}

// Staggered animation helper
function useStaggeredAnimation(itemCount, delay = 0.1) {
  const [visibleItems, setVisibleItems] = React.useState(new Set());

  React.useEffect(() => {
    const timers = [];
    
    for (let i = 0; i < itemCount; i++) {
      const timer = setTimeout(() => {
        setVisibleItems(prev => new Set([...prev, i]));
      }, i * delay * 1000);
      
      timers.push(timer);
    }

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [itemCount, delay]);

  return visibleItems;
}

// Typewriter effect helper
function useTypewriter(text, speed = 100) {
  const [displayedText, setDisplayedText] = React.useState('');

  React.useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, index));
      index++;
      if (index > text.length) {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return displayedText;
}

// Smooth scroll helper
function smoothScrollTo(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}