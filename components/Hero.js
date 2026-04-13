function Hero() {
  const [text, setText] = React.useState('');
  const [showCursor, setShowCursor] = React.useState(true);
  const phrases = ['DevOps Engineer', 'Cloud Architect', 'Automation Enthusiast', 'CI/CD Builder'];
  const phraseRef = React.useRef(0);
  const charRef = React.useRef(0);
  const deletingRef = React.useRef(false);
  const timerRef = React.useRef(null);

  React.useEffect(() => {
    const type = () => {
      const current = phrases[phraseRef.current];
      if (!deletingRef.current) {
        setText(current.slice(0, charRef.current + 1));
        charRef.current++;
        if (charRef.current === current.length) {
          deletingRef.current = true;
          timerRef.current = setTimeout(type, 2000);
          return;
        }
      } else {
        setText(current.slice(0, charRef.current - 1));
        charRef.current--;
        if (charRef.current === 0) {
          deletingRef.current = false;
          phraseRef.current = (phraseRef.current + 1) % phrases.length;
        }
      }
      timerRef.current = setTimeout(type, deletingRef.current ? 50 : 90);
    };
    timerRef.current = setTimeout(type, 600);
    return () => clearTimeout(timerRef.current);
  }, []);

  React.useEffect(() => {
    const b = setInterval(() => setShowCursor(c => !c), 530);
    return () => clearInterval(b);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  try {
    return (
      <section id="hero" className="animated-gradient relative overflow-hidden" data-name="hero"
        style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatedBackground />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,7,13,0.45)' }} />

        <div style={{
          position: 'relative', zIndex: 10, maxWidth: '860px', margin: '0 auto',
          padding: '80px 24px 60px', textAlign: 'center',
          animation: 'fade-in-up 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {/* Avatar with glow animation */}
          <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '110px', height: '110px', borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(14, 165, 233,0.15), rgba(245,197,66,0.08))',
              border: '2px solid rgba(14, 165, 233,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2.8rem', position: 'relative',
              animation: 'glow-pulse 4s ease-in-out infinite',
            }}>
              <span>👨‍💻</span>
              <div style={{
                position: 'absolute', bottom: '4px', right: '4px',
                width: '16px', height: '16px', borderRadius: '50%',
                background: '#22c55e', border: '3px solid var(--bg-primary)',
                boxShadow: '0 0 8px rgba(34,197,94,0.6)',
                animation: 'pulse 2s ease-in-out infinite',
              }} />
            </div>
          </div>

          {/* Status badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '5px 14px', borderRadius: '100px', marginBottom: '24px',
            background: 'rgba(14, 165, 233,0.08)', border: '1px solid rgba(14, 165, 233,0.2)',
            color: '#0ea5e9', fontSize: '0.72rem', fontWeight: 600,
            letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'monospace',
            animation: 'border-dance 6s ease infinite',
          }}>
            <div style={{
              width: '5px', height: '5px', borderRadius: '50%',
              background: '#22c55e', boxShadow: '0 0 6px #22c55e',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            Available for Work
          </div>

          {/* Name with glow */}
          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(2.8rem, 7vw, 5rem)',
            fontWeight: 800, lineHeight: 1.05,
            marginBottom: '20px', letterSpacing: '-2px',
            background: 'linear-gradient(135deg, #e8e6f0 20%, #0ea5e9 55%, #f5c542 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            animation: 'text-glow 4s ease-in-out infinite',
          }}>
            Shashi Kant<br/>Sharma
          </h1>

          {/* Role row */}
          <div style={{ marginBottom: '20px', lineHeight: 1.6 }}>
            <span style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.2rem)', color: '#6b6880', fontWeight: 400 }}>
              B.Tech CSE · Amity University Jaipur
            </span>
            <br />
            <span style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)', fontFamily: 'monospace', color: '#0ea5e9', fontWeight: 600 }}>
              {text}
              <span style={{
                display: 'inline-block', width: '2px', height: '1.1em',
                background: '#0ea5e9', marginLeft: '3px', verticalAlign: 'text-bottom',
                opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s',
              }} />
            </span>
          </div>

          <p style={{
            color: '#6b6880', fontSize: '1rem', maxWidth: '520px',
            margin: '0 auto 44px', lineHeight: 1.8,
          }}>
            Passionate about cloud infrastructure, automation pipelines, and
            building scalable systems. Currently diving deep into Docker, Kubernetes & AWS.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center', marginBottom: '56px' }}>
            <button onClick={() => scrollTo('contact')} className="hero-cta-primary">
              <span style={{ marginRight: '6px' }}>✉</span> Get In Touch
            </button>
            <a href="https://github.com/shashi232" target="_blank" rel="noopener noreferrer" className="hero-cta-secondary">
              <div className="icon-github" style={{ fontSize: '1.1rem' }} /> GitHub
            </a>
          </div>

          {/* Scroll cue */}
          <div onClick={() => scrollTo('about')} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
            animation: 'bounce 2.5s ease infinite',
          }}>
            <span style={{ fontSize: '0.65rem', letterSpacing: '3px', color: '#3e3a52', textTransform: 'uppercase' }}>Scroll</span>
            <div className="icon-chevrons-down" style={{ color: 'rgba(14, 165, 233,0.4)', fontSize: '1.2rem' }} />
          </div>
        </div>

        <style>{`
          .hero-cta-primary {
            padding: 14px 34px; border-radius: 12px; border: none;
            background: linear-gradient(135deg, #0ea5e9, #f5c542);
            color: #0a0a12; font-weight: 700; font-size: 0.9rem;
            font-family: 'Inter', sans-serif;
            box-shadow: 0 4px 30px rgba(14, 165, 233,0.3);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .hero-cta-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 45px rgba(14, 165, 233,0.5);
          }
          .hero-cta-secondary {
            padding: 14px 34px; border-radius: 12px;
            border: 1.5px solid rgba(14, 165, 233,0.25);
            background: rgba(14, 165, 233,0.05); color: #0ea5e9;
            font-weight: 600; font-size: 0.9rem;
            text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
            font-family: 'Inter', sans-serif;
            transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
          }
          .hero-cta-secondary:hover {
            transform: translateY(-3px);
            background: rgba(14, 165, 233,0.12);
            border-color: rgba(14, 165, 233,0.5);
          }
        `}</style>
      </section>
    );
  } catch (error) {
    console.error('Hero component error:', error);
    return null;
  }
}