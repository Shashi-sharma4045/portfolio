function Experience() {
  const [visibleItems, setVisibleItems] = React.useState(new Set());
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Fetch data asynchronously from our mock API (JSON file)
    fetch('data/certificates.json')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(jsonData => {
        setData(jsonData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching certificates data:', error);
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setVisibleItems(prev => new Set([...prev, parseInt(e.target.dataset.idx)]));
        }
      });
    }, { threshold: 0.2 });
    
    // We observe after data loads and elements are rendered.
    // Instead of querying raw DOM here, we can rely on standard CSS transitions for the new design 
    // or just observe `.exp-item` elements directly. Note: since this runs on mount, 
    // it will be empty initially until data loads. So we need a timeout or observer refresh.
    // Fixed: we will just use a generic 'reveal' class observer or re-run when data changes.
    const elements = document.querySelectorAll('.exp-item');
    elements.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [data]);

  try {
    return (
      <section id="experience" data-name="experience" className="py-32 px-6 md:px-12 bg-background relative selection:bg-primary-fixed selection:text-on-primary-fixed">
        <div className="section-divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

        <div className="max-w-[1400px] mx-auto">
          
          {/* Header Section */}
          <section className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 reveal visible">
            <div className="max-w-2xl">
              <p className="text-primary-fixed font-body text-xs uppercase tracking-[0.4em] mb-4 font-bold">Credentials . 003</p>
              <h2 className="font-headline text-[clamp(2.5rem,7vw,5.5rem)] font-light text-primary leading-tight lowercase italic">
                Certifications <br/>&amp; Education
              </h2>
            </div>
            <div className="hidden md:block w-32 h-[1px] bg-outline-variant opacity-30 mb-4"></div>
          </section>

          {/* Ledger Content */}
          <div className="flex flex-col gap-px bg-outline-variant/20">
            {loading ? (
              <div className="p-12 text-on-surface-variant font-body text-sm tracking-widest uppercase">Initializing Ledger Data...</div>
            ) : data.length === 0 ? (
               <div className="p-12 text-error font-body text-sm tracking-widest uppercase">Error establishing connection to ledger</div>
            ) : data.map((item, i) => {
              const show = visibleItems.has(i);
              return (
                <div key={i} data-idx={i} className={`exp-item group grid grid-cols-1 md:grid-cols-12 bg-surface-container-low p-8 md:p-12 hover:bg-surface-container-high transition-all duration-500`} style={{ opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(20px)', transition: `opacity 0.7s ${i * 0.1}s, transform 0.7s ${i * 0.1}s` }}>
                  <div className="md:col-span-1 text-primary-fixed font-body font-bold text-[10px] mb-4 md:mb-0">
                    0{i + 1}
                  </div>
                  <div className="md:col-span-7 pr-8">
                    <h3 className="font-body font-bold text-sm uppercase tracking-[0.3em] text-on-surface mb-2">{item.org}</h3>
                    <p className="font-headline text-3xl text-primary font-light">{item.title}</p>
                    <p className="font-body text-sm text-on-surface-variant leading-relaxed mt-4 hidden group-hover:block transition-opacity opacity-0 group-hover:opacity-100">{item.desc}</p>
                  </div>
                  <div className="md:col-span-3 flex flex-col justify-center gap-2 mt-6 md:mt-0 border-t md:border-t-0 md:border-l border-outline-variant/20 pt-4 md:pt-0 md:pl-8">
                    <span className="text-[10px] font-body font-bold uppercase tracking-widest text-on-surface-variant">Type: {item.type}</span>
                    <span className="text-[10px] font-body font-bold uppercase tracking-widest text-on-surface-variant">Timeline: {item.year}</span>
                  </div>
                  <div className="md:col-span-1 flex items-center justify-end mt-4 md:mt-0">
                    <span className="material-symbols-outlined text-primary-fixed opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 duration-500">
                      {item.type === 'education' ? 'school' : item.type === 'certification' ? 'workspace_premium' : 'arrow_outward'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visual Anchor / Decorative Element */}
          <section className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-24 items-center reveal visible">
            <div className="relative h-64 bg-surface-container-highest flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-fixed/10 to-transparent"></div>
              <img alt="Architectural detail" className="w-full h-full object-cover grayscale opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsK8fLh0E1_AV-YXabBk_Dh1r-u4KZ5qodL4Nw6mwNDYEBFkXKCAOqfyFXX2PWwHO-zgx9Ge16eLcNw-4ssKEa6yLu0FlRabg7atHHy56Vu6N-GzIYmKrWHNpcDZZ8rBu4mg4x4pLNEe3J8RuftiYv7ulrXPM6lUVhsXgF7gl_Pve4rCHDBTHbNJV52V7f6dzai4Q6vtQaHK7T13zcnU4-OyB1ldAF0oHv3PGJngwh64NW57zN-QtrS8QeR5WreG_G05I49qKE8ik" />
              <div className="relative z-10 p-12 border border-primary-fixed/20 backdrop-blur-sm">
                <p className="font-headline italic text-white text-xl">"Structural integrity in code as in stone."</p>
              </div>
            </div>
            
            <div className="reveal visible">
              <h4 className="font-body font-bold text-[10px] uppercase tracking-[0.4em] text-primary-fixed mb-6">Continuous Development</h4>
              <p className="font-body text-on-surface-variant leading-relaxed text-sm max-w-sm">
                The pursuit of technical excellence is an iterative process. Each credential represents a milestone in the systematic mastery of cloud infrastructure and operational efficiency.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="bg-surface-container-highest text-on-surface px-3 py-1 text-[10px] font-body tracking-widest uppercase">AWS-CLF</span>
                <span className="bg-surface-container-highest text-on-surface px-3 py-1 text-[10px] font-body tracking-widest uppercase">TF-ASSOC</span>
                <span className="bg-surface-container-highest text-on-surface px-3 py-1 text-[10px] font-body tracking-widest uppercase">LNX-SYSADMIN</span>
                <span className="bg-surface-container-highest text-on-surface px-3 py-1 text-[10px] font-body tracking-widest uppercase">DOCKER-CNTR</span>
              </div>
            </div>
          </section>

        </div>
        <div className="section-divider" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
      </section>
    );
  } catch (error) {
    console.error('Experience component error:', error);
    return null;
  }
}
