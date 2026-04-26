function Skills() {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  try {
    return (
      <section id="skills" ref={ref} data-name="skills" className="py-32 px-6 md:px-12 bg-background relative selection:bg-primary-fixed selection:text-on-primary-fixed">
        <div className="section-divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />
        
        <div className={`max-w-[1400px] mx-auto reveal ${visible ? 'visible' : ''}`}>
          
          {/* Header Section */}
          <section className="mb-24 flex flex-col md:flex-row items-end justify-between gap-12">
            <div className="max-w-2xl">
              <span className="block text-primary-fixed font-bold tracking-[0.4em] text-[10px] mb-4 uppercase font-body">System Specification v4.0</span>
              <h2 className="font-headline text-[clamp(3rem,8vw,6rem)] font-light leading-none text-white tracking-tighter">
                Engineered <br/> Precision.
              </h2>
            </div>
            <div className="w-full md:w-1/3 text-on-surface-variant font-light text-sm leading-relaxed border-l border-outline-variant/20 pl-6 font-body">
              A technical inventory of operational mastery, deployment structures, and evolving methodologies within the digital architectural landscape.
            </div>
          </section>

          {/* Capabilities Grid */}
          <div className="space-y-32">
            
            {/* Category: Comfortable */}
            <section className={`reveal ${visible ? 'visible' : ''} reveal-delay-1`}>
              <div className="flex items-baseline gap-4 mb-12">
                <span className="text-4xl font-headline font-light text-white">01</span>
                <h3 className="font-headline text-3xl font-light tracking-wide uppercase text-white">Comfortable</h3>
                <div className="flex-grow h-[1px] bg-outline-variant/30 ml-4"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-outline-variant/30">
                {/* Docker */}
                <div className="md:col-span-8 bg-surface-container-low p-12 group hover:bg-surface-container-high transition-colors">
                  <div className="flex justify-between items-start mb-16">
                    <span className="bg-primary-fixed text-on-primary-fixed font-body text-[10px] font-bold px-3 py-1 tracking-widest uppercase">Production Ready</span>
                    <span className="material-symbols-outlined text-primary-fixed text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>layers</span>
                  </div>
                  <h4 className="font-headline text-6xl text-white mb-6 font-light">Docker</h4>
                  <p className="text-on-surface-variant font-body max-w-md leading-relaxed">Sophisticated container orchestration and immutable infrastructure patterns. Mastery of multi-stage builds and internal registry management.</p>
                </div>
                
                {/* Linux */}
                <div className="md:col-span-4 bg-surface-container-low p-12 group hover:bg-surface-container-high transition-colors">
                  <div className="mb-16">
                    <span className="material-symbols-outlined text-white text-4xl">terminal</span>
                  </div>
                  <h4 className="font-headline text-4xl text-white mb-4 font-light">Linux</h4>
                  <p className="text-sm font-body text-on-surface-variant leading-relaxed mb-8">Kernel tuning, shell scripting, and systems administration within Debian and RHEL ecosystems.</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[9px] font-body text-white border border-outline-variant/30 px-2 py-1 uppercase tracking-tighter">Kernel</span>
                    <span className="text-[9px] font-body text-white border border-outline-variant/30 px-2 py-1 uppercase tracking-tighter">Bash</span>
                    <span className="text-[9px] font-body text-white border border-outline-variant/30 px-2 py-1 uppercase tracking-tighter">SSH</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Category: Working Knowledge */}
            <section className={`reveal ${visible ? 'visible' : ''} reveal-delay-2`}>
              <div className="flex items-baseline gap-4 mb-12">
                <span className="text-4xl font-headline font-light text-white">02</span>
                <h3 className="font-headline text-3xl font-light tracking-wide uppercase text-white">Working Knowledge</h3>
                <div className="flex-grow h-[1px] bg-outline-variant/30 ml-4"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Kubernetes */}
                <div className="bg-surface-container-lowest p-10 border-l-2 border-primary-fixed">
                  <div className="flex items-center justify-between mb-12">
                    <span className="material-symbols-outlined text-on-surface-variant">hub</span>
                    <span className="text-[10px] text-primary-fixed font-body font-bold tracking-[0.2em] uppercase">Stable</span>
                  </div>
                  <h4 className="text-2xl font-body font-bold text-white mb-4 tracking-tight uppercase">Kubernetes</h4>
                  <p className="text-sm text-on-surface-variant font-body leading-relaxed">Management of complex clusters, Helm charts, and ingress controllers across multi-cloud environments.</p>
                </div>
                
                {/* AWS */}
                <div className="bg-surface-container-lowest p-10 border-l-2 border-primary-fixed">
                  <div className="flex items-center justify-between mb-12">
                    <span className="material-symbols-outlined text-on-surface-variant">cloud</span>
                    <span className="text-[10px] text-primary-fixed font-body font-bold tracking-[0.2em] uppercase">Scaled</span>
                  </div>
                  <h4 className="text-2xl font-body font-bold text-white mb-4 tracking-tight uppercase">AWS</h4>
                  <p className="text-sm text-on-surface-variant font-body leading-relaxed">Architecture of VPCs, IAM security policies, and serverless Lambda deployments with high availability.</p>
                </div>
                
                {/* Terraform */}
                <div className="bg-surface-container-lowest p-10 border-l-2 border-primary-fixed">
                  <div className="flex items-center justify-between mb-12">
                    <span className="material-symbols-outlined text-on-surface-variant">architecture</span>
                    <span className="text-[10px] text-primary-fixed font-body font-bold tracking-[0.2em] uppercase">Automated</span>
                  </div>
                  <h4 className="text-2xl font-body font-bold text-white mb-4 tracking-tight uppercase">Terraform</h4>
                  <p className="text-sm text-on-surface-variant font-body leading-relaxed">State management, modular infrastructure definitions, and provider integration for consistent environments.</p>
                </div>
              </div>
            </section>

            {/* Category: Exploring */}
            <section className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center reveal ${visible ? 'visible' : ''} reveal-delay-3`}>
              <div>
                <div className="flex items-baseline gap-4 mb-8">
                  <span className="text-4xl font-headline font-light text-white">03</span>
                  <h3 className="font-headline text-3xl font-light tracking-wide uppercase text-white">Exploring</h3>
                </div>
                <p className="text-on-surface-variant font-body mb-12 max-w-sm">Current R&amp;D initiatives focusing on the next generation of cloud-native observation and AI-driven operations.</p>
                
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-6 group cursor-pointer">
                    <span className="text-[10px] font-body font-bold text-primary-fixed/40 group-hover:text-primary-fixed transition-colors">03.1</span>
                    <span className="text-xl font-headline font-light text-white group-hover:pl-4 transition-all">Grafana / Prometheus</span>
                  </div>
                  <div className="w-full h-px bg-outline-variant/20"></div>
                  <div className="flex items-center gap-6 group cursor-pointer">
                    <span className="text-[10px] font-body font-bold text-primary-fixed/40 group-hover:text-primary-fixed transition-colors">03.2</span>
                    <span className="text-xl font-headline font-light text-white group-hover:pl-4 transition-all">Ansible</span>
                  </div>
                  <div className="w-full h-px bg-outline-variant/20"></div>
                  <div className="flex items-center gap-6 group cursor-pointer">
                    <span className="text-[10px] font-body font-bold text-primary-fixed/40 group-hover:text-primary-fixed transition-colors">03.3</span>
                    <span className="text-xl font-headline font-light text-white group-hover:pl-4 transition-all">GCP Cloud Architect</span>
                  </div>
                </div>
              </div>
              
              <div className="relative aspect-square bg-surface-container-low overflow-hidden">
                <img alt="Architectural abstraction" className="object-cover opacity-40 grayscale mix-blend-luminosity w-full h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChG8HIvBoNqu3ATRh0FR6tBimFC9D5uR_ETDM4pGHXbhTC08RjMnSp3aPQfAyQ1ipqiHLl1qdittFqbK7Dic1lEqwvxaaM9GDAl0ZnlVyF8EDIcY1_pCoQyQdx72TWhW79pg7CGewNjeeYdKbopVyOJ3ysKGn6WkYmBSPKU8jOpvcRmFywAUvNH_wxJ5wewr5OHCLgGD8RUF2O0CLd5mRCNZ_bEb50O4obSBfjcqzzxtik3lXnaNSPFXK_9o6-QQYNyqizOTeYj9g"/>
                <div className="absolute inset-0 border-[20px] border-background"></div>
                <div className="absolute bottom-12 left-12 flex flex-col">
                  <span className="text-[10px] font-body font-bold text-primary-fixed tracking-[0.5em] uppercase">Status: Researching</span>
                  <span className="font-headline text-3xl text-white font-light italic">The New Frontier</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Skills component error:', error);
    return null;
  }
}