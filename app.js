class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Something went wrong</h1>
            <p className="text-[var(--text-secondary)] mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="glow-button"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function CustomCursor() {
  const cursorRef = React.useRef(null);
  const [hovered, setHovered] = React.useState(false);

  React.useEffect(() => {
    const onMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    
    const onMouseOver = (e) => {
      if (e.target.closest('.proj-card')) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <div ref={cursorRef} className={`custom-cursor ${hovered ? 'active' : ''}`}>
      <span className="cursor-text">{'{ VIEW } →'}</span>
      <style>{`
        .custom-cursor {
          position: fixed; top: 0; left: 0; width: 0; height: 0; pointer-events: none; z-index: 99999;
          display: flex; align-items: center; justify-content: center;
        }
        .cursor-text {
          background: #bcff00; color: #000; padding: 6px 14px; border-radius: 100px;
          font-weight: 700; font-family: 'Inter', sans-serif; font-size: 0.8rem;
          white-space: nowrap; transform: translate(-50%, -50%) scale(0);
          opacity: 0; transition: transform 0.2s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease;
        }
        .custom-cursor.active .cursor-text {
          transform: translate(-50%, -50%) scale(1); opacity: 1;
        }
        .proj-card, .proj-card * {
          cursor: none !important;
        }
      `}</style>
    </div>
  );
}

function App() {
  const [terminalOpen, setTerminalOpen] = React.useState(false);

  React.useEffect(() => {
    const el = document.getElementById('preloader');
    const perc = document.getElementById('loading-perc');
    const bar = document.getElementById('preloader-bar');
    const statusBl = document.getElementById('preloader-status-bl');
    if (!el || !perc) return;

    const statuses = [
      'ESTABLISHING SECURE LINK...',
      'MOUNTING FILESYSTEM...',
      'LOADING DOCKER LAYERS...',
      'SYNCING KUBERNETES NODES...',
      'VERIFYING CERTS...',
      'ALL SYSTEMS NOMINAL.',
    ];
    let statusIdx = 0;
    const statusInterval = setInterval(() => {
      statusIdx = (statusIdx + 1) % statuses.length;
      if (statusBl) statusBl.textContent = statuses[statusIdx];
    }, 600);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 4;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        clearInterval(statusInterval);
        if (statusBl) statusBl.textContent = 'ALL SYSTEMS NOMINAL.';
        setTimeout(() => {
          el.style.opacity = '0';
          el.style.transform = 'translateY(-100%)';
          setTimeout(() => el.remove(), 1000);
        }, 400);
      }
      perc.innerText = progress;
      if (bar) bar.style.width = progress + '%';
    }, 60);
  }, []);

  try {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)]" data-name="app" data-file="app.js">
        <CustomCursor />
        <Navbar onTerminalOpen={() => setTerminalOpen(true)} />
        <TerminalOverlay isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
        <InteractiveElements />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);