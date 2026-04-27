function Hero() {
  const [text, setText] = React.useState('');
  const [showCursor, setShowCursor] = React.useState(true);
  const [heroReady, setHeroReady] = React.useState(false);  // ← controls reveal
  const phrases = ['DevOps Engineer', 'Cloud Enthusiast', 'Automation Builder', 'CI/CD Tinkerer'];
  const phraseRef = React.useRef(0);
  const charRef = React.useRef(0);
  const deletingRef = React.useRef(false);
  const timerRef = React.useRef(null);

  // ── Wait for preloader to be removed, then trigger cinematic reveal ──
  React.useEffect(() => {
    const checkPreloader = () => {
      const preloader = document.getElementById('preloader');
      if (!preloader) {
        // Preloader is gone — start reveal after tiny settle delay
        setTimeout(() => setHeroReady(true), 150);
      } else {
        // Poll every 100ms until it's gone
        setTimeout(checkPreloader, 100);
      }
    };
    checkPreloader();
  }, []);

  // ── Typewriter — only starts after hero is revealed ──
  React.useEffect(() => {
    if (!heroReady) return;
    const type = () => {
      const current = phrases[phraseRef.current];
      if (!deletingRef.current) {
        setText(current.slice(0, charRef.current + 1));
        charRef.current++;
        if (charRef.current === current.length) {
          deletingRef.current = true;
          timerRef.current = setTimeout(type, 2500);
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
      timerRef.current = setTimeout(type, deletingRef.current ? 45 : 105);
    };
    timerRef.current = setTimeout(type, 600);
    return () => clearTimeout(timerRef.current);
  }, [heroReady]);

  React.useEffect(() => {
    const b = setInterval(() => setShowCursor(c => !c), 530);
    return () => clearInterval(b);
  }, []);

  try {
    return (
      <section id="hero" data-name="hero" className="relative min-h-[max(800px,100vh)] flex flex-col justify-center px-6 md:px-16 overflow-hidden bg-background">
        <style>{`
          /* ── Stitch-designed keyframes ── */

          /* "THE" — scan-line letter reveal: each letter sweeps in via clip-path */
          @keyframes scanReveal {
            0%   { clip-path: inset(100% 0 0 0); opacity: 0; }
            30%  { clip-path: inset(60% 0 0 0);  opacity: 1; }
            100% { clip-path: inset(0% 0 0 0);   opacity: 1; }
          }

          /* "INFRA. CORE" — slams in from below with blur-to-sharp */
          @keyframes slamUp {
            0%   { transform: translateY(60px); filter: blur(20px); opacity: 0; }
            60%  { transform: translateY(-6px); filter: blur(2px);  opacity: 1; }
            80%  { transform: translateY(3px);  filter: blur(0px);  opacity: 1; }
            100% { transform: translateY(0);    filter: blur(0px);  opacity: 1; }
          }

          /* "CORE" pulsing neon halo (final state) */
          @keyframes coreHalo {
            0%, 100% { text-shadow: 0 0 20px #bcff0066, 0 0 60px #bcff0022; }
            50%       { text-shadow: 0 0 40px #bcff00bb, 0 0 100px #bcff0044; }
          }

          /* Scan-line bar that sweeps across "THE" */
          @keyframes scanBar {
            0%   { top: 100%; opacity: 1; }
            80%  { top: -4px; opacity: 1; }
            100% { top: -4px; opacity: 0; }
          }

          /* Sub-content fade up */
          @keyframes fadeSlideUp {
            0%   { opacity: 0; transform: translateY(24px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          /* Hairline divider grow */
          @keyframes growLine {
            0%   { width: 0; }
            100% { width: 100%; }
          }

          /* ── Applied classes ── */
          .hero-the {
            display: inline-block;
            animation: scanReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
          }
          .hero-infra {
            display: block;
            animation: slamUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
          }
          .hero-core-word {
            animation: coreHalo 3s ease-in-out 1.2s infinite;
          }
          .hero-scanbar {
            position: absolute;
            left: 0; right: 0;
            height: 2px;
            background: #bcff00;
            box-shadow: 0 0 12px #bcff00, 0 0 30px #bcff0066;
            animation: scanBar 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            pointer-events: none;
            z-index: 10;
          }
          .hero-divider {
            height: 1px;
            background: rgba(255,255,255,0.12);
            animation: growLine 0.5s ease forwards;
            width: 0;
          }
          .hero-sub {
            opacity: 0;
            animation: fadeSlideUp 0.6s ease forwards;
          }

          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            white-space: nowrap;
            animation: marquee 30s linear infinite;
          }
        `}</style>

        {/* Background glow */}
        <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_top_right,_#bcff0022_0%,_transparent_50%)]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col">

            {/* Typewriter tag */}
            <span
              className="font-body text-xs md:text-sm tracking-[0.4em] text-primary-fixed uppercase mb-4 opacity-80 hero-sub"
              style={heroReady ? { animationDelay: '1.4s' } : { opacity: 0, animation: 'none' }}
            >
              {text}<span style={{ opacity: showCursor ? 1 : 0 }}>_</span>
            </span>

            {/* ── THE — scan-line reveal ── */}
            <div className={`relative overflow-hidden leading-none ${heroReady ? '' : 'invisible'}`}>
              {heroReady && <div className="hero-scanbar" />}
              <h1
                className="font-headline font-light tracking-tighter text-white hero-the"
                style={{
                  fontSize: 'clamp(4rem,12vw,10rem)',
                  lineHeight: 0.9,
                  animationDelay: heroReady ? '0.05s' : '999s'
                }}
              >
                THE
              </h1>
            </div>

            {/* ── Divider hairline ── */}
            {heroReady && (
              <div
                className="hero-divider my-1"
                style={{ animationDelay: '0.55s' }}
              />
            )}

            {/* ── INFRA. CORE — slam up ── */}
            <span
              className="font-headline font-light italic text-primary-fixed tracking-tighter hero-infra"
              style={{
                fontSize: 'clamp(4rem,12vw,10rem)',
                lineHeight: 0.9,
                marginLeft: 'clamp(1rem, 4vw, 8rem)',
                animationDelay: heroReady ? '0.45s' : '999s'
              }}
            >
              INFRA.{' '}
              <span className={heroReady ? 'hero-core-word' : ''}>CORE</span>
            </span>
          </div>

          {/* Sub-content */}
          <div
            className="md:ml-[25vw] max-w-md pt-8 border-l border-white/10 pl-6 space-y-6 hero-sub"
            style={heroReady ? { animationDelay: '1.2s' } : { opacity: 0, animation: 'none' }}
          >
            <p className="font-body text-sm md:text-base text-white/60 leading-relaxed text-justify">
              Engineering digital monuments through code, cloud infrastructure, and structural precision. High-availability architecture designed for permanence.
            </p>
            <button
              onClick={() => { const el = document.getElementById('projects'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
              className="bg-primary-fixed text-on-primary-fixed hover:bg-white hover:text-black transition-all duration-300 px-8 py-4 font-body font-bold text-xs tracking-[0.2em] uppercase"
            >
              Explore Structures
            </button>
          </div>
        </div>

        {/* Marquee side text */}
        <div className="absolute right-0 md:right-8 top-1/2 -translate-y-1/2 rotate-90 origin-center pointer-events-none opacity-40">
          <div className="animate-marquee flex gap-12 items-center">
            <span className="text-[clamp(60px,10vw,120px)] font-headline font-black text-white/10 leading-none whitespace-nowrap">SYSTEMS CORE NETWORK NODES INFRASTRUCTURE</span>
            <span className="text-[clamp(60px,10vw,120px)] font-headline font-black text-white/10 leading-none whitespace-nowrap">SYSTEMS CORE NETWORK NODES INFRASTRUCTURE</span>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Hero component error:', error);
    return null;
  }
}