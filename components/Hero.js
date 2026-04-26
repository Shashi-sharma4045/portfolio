function Hero() {
  const [text, setText] = React.useState('');
  const [showCursor, setShowCursor] = React.useState(true);
  const phrases = ['DevOps Engineer', 'Cloud Enthusiast', 'Automation Builder', 'CI/CD Tinkerer'];
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
    timerRef.current = setTimeout(type, 800);
    return () => clearTimeout(timerRef.current);
  }, []);

  React.useEffect(() => {
    const b = setInterval(() => setShowCursor(c => !c), 530);
    return () => clearInterval(b);
  }, []);

  try {
    return (
      <section id="hero" data-name="hero" className="relative min-h-[max(800px,100vh)] flex flex-col justify-center px-6 md:px-16 overflow-hidden bg-background">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            white-space: nowrap;
            animation: marquee 30s linear infinite;
          }
          .animate-marquee-vertical {
            animation: marquee 40s linear infinite reverse;
          }
        `}</style>
        
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_top_right,_#bcff0022_0%,_transparent_50%)]"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto space-y-8 reveal visible">
          <div className="flex flex-col">
            <span className="font-body text-xs md:text-sm tracking-[0.4em] text-primary-fixed uppercase mb-4 opacity-80">
              {text}<span style={{ opacity: showCursor ? 1 : 0 }}>_</span>
            </span>
            <h1 className="font-headline text-[clamp(4rem,12vw,10rem)] font-light leading-[0.9] tracking-tighter text-white">
              THE<br />
              <span className="text-primary-fixed italic ml-8 md:ml-[10vw]">INFRA. CORE</span>
            </h1>
          </div>
          
          <div className="md:ml-[25vw] max-w-md pt-8 border-l border-white/10 pl-6 space-y-6">
            <p className="font-body text-sm md:text-base text-white/60 leading-relaxed text-justify">
              Engineering digital monuments through code, cloud infrastructure, and structural precision. High-availability architecture designed for permanence.
            </p>
            <button className="bg-primary-fixed text-on-primary-fixed hover:bg-white hover:text-black transition-all duration-300 px-8 py-4 font-body font-bold text-xs tracking-[0.2em] uppercase">
              Explore Structures
            </button>
          </div>
        </div>

        {/* Dynamic Sliding Text Marquee (Desktop & Mobile safe) */}
        <div className="absolute right-0 md:right-8 top-1/2 -translate-y-1/2 rotate-90 origin-center pointer-events-none opacity-40">
          <div className="animate-marquee animate-marquee-vertical flex gap-12 items-center">
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