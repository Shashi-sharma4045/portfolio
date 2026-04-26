function About() {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  try {
    return (
      <section id="about" ref={ref} data-name="about" className="px-6 md:px-16 py-32 bg-surface-container-lowest relative">
        <div className={`max-w-7xl mx-auto reveal ${visible ? 'visible' : ''}`}>
          
          <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center">
            
            {/* Architectural Image Container */}
            <div className={`relative w-full md:w-[400px] aspect-[4/5] group flex-shrink-0 reveal reveal-delay-1 ${visible ? 'visible' : ''}`}>
              <div className="absolute inset-0 border border-white/10 translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"></div>
              <div className="absolute inset-0 border border-primary-fixed/20 -translate-x-2 -translate-y-2 transition-transform duration-500 group-hover:-translate-x-4 group-hover:-translate-y-4"></div>
              <div className="relative h-full w-full bg-surface-container overflow-hidden">
                {/* User's profile photo restored here! */}
                <img 
                  src="assets/profile.png" 
                  alt="Architect Profile" 
                  onError={(e) => { e.target.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuBlK36xc7hpOhq8fJV15tu68qsb3ugkpDValzAePBXic3-CqUzKT_dqFUlEHALoXxXAON66x5FStwY_emFRKKwtgPF3u7eZvfHflXHn28-ZIh_r6Ykm47z1NAKgMM16xR-aoQg_ac7wv3EyWjImg41BuwvTf-st_A5IlLryqW7OtrJ80KIO8ZiNWbOyLPH6c9XoPSbAvqGN1YRDTKEFm3S5rmpp74krTAt7SVQQ4zQGfMHHHiOih3PtJ3BsWENE96oMIL-JWEECo3Y"; }}
                  className="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-105" 
                />
                
                <div className="absolute bottom-0 right-0 bg-primary-fixed text-on-primary-fixed px-4 py-2 font-body text-[10px] font-black tracking-widest">
                  EST. {new Date().getFullYear()}
                </div>
              </div>
            </div>

            {/* Philosophy & Manifesto Content */}
            <div className="flex-1 space-y-12">
              <div className="space-y-6">
                <span className="font-body text-primary-fixed text-xs tracking-[0.5em] uppercase block">THE MANIFESTO</span>
                <div className="inline-block border-l-2 border-primary-fixed pl-6 mb-6">
                  <h2 className="font-headline text-3xl md:text-5xl font-light text-white leading-snug">
                    "CODE IS FLEETING.<br/>
                    INFRASTRUCTURE IS <span className="text-primary-fixed italic font-medium">PERMANENT.</span>"
                  </h2>
                </div>
                <p className="font-body text-base leading-relaxed text-white/70 max-w-xl text-justify">
                  In a world of ephemeral software, I focus on the monolithic stability of systems. My approach merges DevOps rigor with architectural aesthetics, ensuring that the invisible bones of your platform are as beautiful and reliable as the interface. I treat deployment pipelines like brutalist cathedrals—heavy, permanent, and inherently functional.
                </p>
                
                <div className="flex flex-wrap gap-2 pt-4">
                  <span className="bg-surface-container-highest px-3 py-1.5 text-[10px] font-body text-white/80 tracking-widest uppercase border border-white/5">Kubernetes</span>
                  <span className="bg-surface-container-highest px-3 py-1.5 text-[10px] font-body text-white/80 tracking-widest uppercase border border-white/5">Terraform</span>
                  <span className="bg-surface-container-highest px-3 py-1.5 text-[10px] font-body text-white/80 tracking-widest uppercase border border-white/5">AWS</span>
                  <span className="bg-surface-container-highest px-3 py-1.5 text-[10px] font-body text-white/80 tracking-widest uppercase border border-white/5">CI/CD Automation</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Methodologies Grid (The 4 properties previously in About.js) */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-[1px] mt-24 bg-white/10 border-y border-white/10 reveal reveal-delay-2 ${visible ? 'visible' : ''}`}>
            <div className="bg-background p-8 md:p-10 aspect-square flex flex-col justify-between group cursor-pointer hover:bg-surface-container-highest transition-colors duration-500">
               <span className="text-primary-fixed font-body text-xs font-bold tracking-widest">01</span>
               <div>
                  <div className="icon-box text-primary-fixed text-3xl mb-4 group-hover:-translate-y-2 transition-transform duration-500" />
                  <span className="font-body text-[10px] tracking-widest uppercase text-white/60 group-hover:text-white transition-colors duration-300">SCALABILITY</span>
               </div>
            </div>
             
            <div className="bg-background p-8 md:p-10 aspect-square flex flex-col justify-between group cursor-pointer hover:bg-surface-container-highest transition-colors duration-500">
               <span className="text-primary-fixed font-body text-xs font-bold tracking-widest">02</span>
               <div>
                  <div className="icon-shield text-primary-fixed text-3xl mb-4 group-hover:-translate-y-2 transition-transform duration-500" />
                  <span className="font-body text-[10px] tracking-widest uppercase text-white/60 group-hover:text-white transition-colors duration-300">HARDENING</span>
               </div>
            </div>
             
            <div className="bg-background p-8 md:p-10 aspect-square flex flex-col justify-between group cursor-pointer hover:bg-surface-container-highest transition-colors duration-500">
               <span className="text-primary-fixed font-body text-xs font-bold tracking-widest">03</span>
               <div>
                  <div className="icon-zap text-primary-fixed text-3xl mb-4 group-hover:-translate-y-2 transition-transform duration-500" />
                  <span className="font-body text-[10px] tracking-widest uppercase text-white/60 group-hover:text-white transition-colors duration-300">VELOCITY</span>
               </div>
            </div>
             
            <div className="bg-background p-8 md:p-10 aspect-square flex flex-col justify-between group cursor-pointer hover:bg-surface-container-highest transition-colors duration-500">
               <span className="text-primary-fixed font-body text-xs font-bold tracking-widest">04</span>
               <div>
                  <div className="icon-cloud text-primary-fixed text-3xl mb-4 group-hover:-translate-y-2 transition-transform duration-500" />
                  <span className="font-body text-[10px] tracking-widest uppercase text-white/60 group-hover:text-white transition-colors duration-300">AVAILABILITY</span>
               </div>
            </div>
          </div>
          
        </div>
        
        {/* Accent Element */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-primary-fixed to-transparent opacity-50"></div>
      </section>
    );
  } catch (error) {
    console.error('About component error:', error);
    return null;
  }
}