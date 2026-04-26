function Footer() {
  const yr = new Date().getFullYear();
  const scroll = (e, href) => { e.preventDefault(); const el = document.querySelector(href); if (el) el.scrollIntoView({ behavior: 'smooth' }); };
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  try {
    return (
      <>
        <footer data-name="footer" className="bg-[#0e0e0e] w-full py-32 px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 w-full max-w-[1800px] mx-auto reveal">
            <div className="space-y-4">
              <span className="text-white text-3xl font-headline tracking-[0.2em] font-light uppercase">SKS / Architect</span>
              <p className="font-body text-[10px] tracking-[0.4em] uppercase text-white/40 mt-4">DESIGNED AS INFRASTRUCTURE. © {yr}</p>
            </div>
            <div className="flex flex-wrap gap-8 md:gap-16">
              <a href="https://github.com/shashi232" target="_blank" rel="noopener noreferrer" className="font-body text-[10px] tracking-[0.4em] uppercase text-white/40 hover:text-primary-fixed hover:tracking-[0.5em] transition-all duration-700">SOURCE</a>
              <a href="https://linkedin.com/in/shashi-kant-sharma-a338a5318" target="_blank" rel="noopener noreferrer" className="font-body text-[10px] tracking-[0.4em] uppercase text-white/40 hover:text-primary-fixed hover:tracking-[0.5em] transition-all duration-700">NETWORK</a>
              <a href="mailto:shaskantsharma2@gmail.com" className="font-body text-[10px] tracking-[0.4em] uppercase text-white/40 hover:text-primary-fixed hover:tracking-[0.5em] transition-all duration-700">TRANSMIT</a>
            </div>
          </div>
          <div className="mt-16 border-t border-white/5 pt-16 flex justify-end max-w-[1800px] mx-auto reveal reveal-delay-1">
            <button onClick={toTop} className="font-body text-[10px] tracking-[0.3em] uppercase text-white/30 hover:text-white transition-colors duration-300">
               [ RETURN TO TOP ]
            </button>
          </div>
        </footer>

        {/* BRUTALIST FILLER SECTION (The Monolith) via StitchMCP */}
        <section className="relative min-h-[795px] bg-[#000000] flex items-center justify-center overflow-hidden border-t border-primary-fixed/5 hidden md:flex">
          <style>{`
            .glow-neon { box-shadow: 0 0 60px 10px rgba(188, 255, 0, 0.3); }
            .monolith-gradient { background: linear-gradient(180deg, #bcff00 0%, #4a6700 100%); }
          `}</style>
          
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full border-[20vw] border-surface-container-lowest/50 scale-110"></div>
          </div>
          
          <div className="relative group z-10">
            <div className="absolute -inset-20 bg-primary-fixed/10 blur-[120px] rounded-full group-hover:bg-primary-fixed/20 transition-all duration-1000"></div>
            
            <div className="relative w-48 md:w-72 h-[530px] monolith-gradient glow-neon border border-primary-fixed/40 transition-transform duration-700 hover:scale-105 group-hover:rotate-1">
              <div className="absolute inset-0 opacity-30 flex flex-col justify-between p-4 font-body text-[8px] text-on-primary-fixed leading-none overflow-hidden select-none">
                <div className="flex justify-between"><span>0x0012FF</span><span>SECURE_LINK</span></div>
                <div className="flex justify-between"><span>CPU_TEMP_44C</span><span>LOAD_0.22</span></div>
                <div className="flex justify-between"><span>HASH_A87B2</span><span>PKT_RCV</span></div>
                <div className="flex justify-between"><span>SYS_ID_MONO</span><span>UPTIME_99.9</span></div>
                <div className="flex justify-between"><span>0x0012FF</span><span>SECURE_LINK</span></div>
                <div className="flex justify-between"><span>CPU_TEMP_44C</span><span>LOAD_0.22</span></div>
                <div className="flex justify-between"><span>HASH_A87B2</span><span>PKT_RCV</span></div>
                <div className="flex justify-between"><span>SYS_ID_MONO</span><span>UPTIME_99.9</span></div>
                <div className="flex justify-between"><span>0x0012FF</span><span>SECURE_LINK</span></div>
                <div className="flex justify-between"><span>CPU_TEMP_44C</span><span>LOAD_0.22</span></div>
                <div className="flex justify-between"><span>HASH_A87B2</span><span>PKT_RCV</span></div>
                <div className="flex justify-between"><span>SYS_ID_MONO</span><span>UPTIME_99.9</span></div>
              </div>
            </div>
            
            <div className="absolute -top-32 -left-48 md:-left-64 hidden md:block">
              <div className="flex flex-col gap-2 items-start border-l border-primary-fixed/40 pl-6 py-2">
                <span className="text-primary-fixed/40 font-bold text-[10px] tracking-[0.4em] uppercase">LINK_INTEGRITY</span>
                <span className="text-white font-bold text-lg tracking-widest uppercase">CONNECTION SECURE</span>
              </div>
            </div>
            <div className="absolute top-1/2 -right-48 md:-right-80 hidden md:block">
              <div className="flex flex-col gap-2 items-start border-l border-primary-fixed/40 pl-6 py-2">
                <span className="text-primary-fixed/40 font-bold text-[10px] tracking-[0.4em] uppercase">NETWORK_FLOW</span>
                <span className="text-white font-bold text-lg tracking-widest uppercase">LATENCY 12ms</span>
              </div>
            </div>
            <div className="absolute -bottom-24 -left-32 md:-left-40 hidden md:block">
              <div className="flex flex-col gap-2 items-start border-l border-primary-fixed/40 pl-6 py-2">
                <span className="text-primary-fixed/40 font-bold text-[10px] tracking-[0.4em] uppercase">SYSTEM_PULSE</span>
                <span className="text-white font-bold text-lg tracking-widest uppercase">SYSTEM ONLINE</span>
              </div>
            </div>
          </div>
          
          <div className="absolute top-12 left-12 opacity-5 select-none font-headline italic text-[clamp(2rem,8vw,8rem)] text-primary pointer-events-none">TERMINUS</div>
          <div className="absolute bottom-12 right-12 opacity-5 select-none font-headline italic text-[clamp(2rem,8vw,8rem)] text-primary pointer-events-none">VOID_CORE</div>
          
          <div className="absolute right-8 top-0 bottom-0 flex flex-col justify-center gap-24 opacity-20 hidden lg:flex">
            <span className="rotate-90 text-primary-fixed text-xs tracking-[1em] whitespace-nowrap">NULL_POINTER_VOID</span>
            <span className="rotate-90 text-primary-fixed text-xs tracking-[1em] whitespace-nowrap">ROOT_ACCESS_ONLY</span>
            <span className="rotate-90 text-primary-fixed text-xs tracking-[1em] whitespace-nowrap">00_00_00_00</span>
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}