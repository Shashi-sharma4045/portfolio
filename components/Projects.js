function DraggableCard({ project, boundaryRef, initialPos, zIndex, onPushFront }) {
  const [pos, setPos] = React.useState(initialPos);
  const [isDragging, setIsDragging] = React.useState(false);
  const offset = React.useRef({ x: 0, y: 0 });
  const cardRef = React.useRef(null);

  React.useEffect(() => {
    const handleResize = () => {
      if (!boundaryRef.current || !cardRef.current) return;
      const bRect = boundaryRef.current.getBoundingClientRect();
      const cRect = cardRef.current.getBoundingClientRect();
      setPos(prev => ({
        x: Math.min(prev.x, Math.max(0, bRect.width - cRect.width)),
        y: Math.min(prev.y, Math.max(0, bRect.height - cRect.height))
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePointerDown = (e) => {
    e.target.setPointerCapture(e.pointerId);
    setIsDragging(true);
    onPushFront();
    const rect = cardRef.current.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handlePointerMove = (e) => {
    if (!isDragging || !boundaryRef.current || !cardRef.current) return;
    const boundaryRect = boundaryRef.current.getBoundingClientRect();
    let newX = e.clientX - boundaryRect.left - offset.current.x;
    let newY = e.clientY - boundaryRect.top - offset.current.y;
    
    const cardRect = cardRef.current.getBoundingClientRect();
    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX + cardRect.width > boundaryRect.width) newX = boundaryRect.width - cardRect.width;
    if (newY + cardRect.height > boundaryRect.height) newY = boundaryRect.height - cardRect.height;
    
    setPos({ x: newX, y: newY });
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
  };

  return (
    <div
      ref={cardRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        position: 'absolute', 
        left: pos.x, 
        top: pos.y, 
        zIndex: zIndex,
        touchAction: 'none'
      }}
      className={`w-[300px] md:w-[380px] border bg-[#131313] transition-colors duration-300 group flex flex-col justify-between
        ${isDragging ? 'shadow-2xl shadow-[#bcff00]/10 cursor-grabbing border-[#bcff00]/40' : 'cursor-grab border-white/10 hover:border-white/20'}`}
    >
      <div className="p-6 border-b border-white/10 bg-[#1c1b1b]">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[#bcff00] text-[10px] uppercase tracking-[0.2em] font-body bg-[#131313] px-2 py-1 border border-[#bcff00]/20">
            {project.cat}
          </span>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#bcff00] transition-colors">
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>
        <h3 className="font-headline text-2xl font-light text-white uppercase tracking-tight">{project.title}</h3>
      </div>
      
      <div className="p-6 flex-grow pointer-events-none">
        <p className="font-body text-white/50 text-xs tracking-wide leading-relaxed line-clamp-3">
          {project.desc}
        </p>
      </div>

      <div className="p-4 border-t border-white/10 flex items-center gap-2 pointer-events-none">
        {project.tags.slice(0,2).map(tag => (
           <span key={tag} className="text-xs font-body text-on-surface-variant bg-surface-container-highest px-2 py-1 border border-white/5 uppercase">
             {tag}
           </span>
        ))}
        {project.status === 'Active' && <span className="ml-auto flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#bcff00] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#bcff00]"></span>
        </span>}
      </div>
    </div>
  );
}

window.Projects = function Projects() {
  const [filter, setFilter] = React.useState('All');
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [topZIndex, setTopZIndex] = React.useState(10);
  
  const boundaryRef = React.useRef(null);

  React.useEffect(() => {
    const fetchGitHub = fetch('https://api.github.com/users/shashi232/repos?sort=updated&per_page=6')
      .then(res => res.ok ? res.json() : [])
      .then(repos => repos.map(repo => ({
          title: repo.name,
          desc: repo.description || `${repo.language ? repo.language + ' project' : 'Project'} — ${repo.stargazers_count} stars, ${repo.forks_count} forks`,
          tags: repo.language ? [repo.language, 'GitHub'] : ['GitHub'],
          cat: 'GitHub',
          status: 'Active',
          link: repo.html_url
      }))).catch(() => []);

    const fetchLinkedIn = fetch('data/linkedin.json')
      .then(res => res.ok ? res.json() : [])
      .catch(() => []);

    Promise.all([fetchGitHub, fetchLinkedIn]).then(([ghData, liData]) => {
      const merged = [...ghData, ...liData].map((p, i) => {
        const padding = 50; 
        const cellWidth = 400;
        const cellHeight = 300;
        const cols = Math.max(1, Math.floor((window.innerWidth || 1000 - padding * 2) / cellWidth));
        const row = Math.floor(i / cols);
        const col = i % cols;
        return {
           ...p,
           id: Math.random().toString(),
           initialPos: { 
             x: padding + col * (cellWidth * 0.9) + (Math.random() * 40 - 20), 
             y: padding + row * (cellHeight * 0.9) + (Math.random() * 40 - 20)
           },
           z: 10 + i
        };
      });
      setProjects(merged);
      setLoading(false);
    });
  }, []);

  const filters = ['All', 'GitHub', 'LinkedIn'];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.cat === filter);

  const bringToFront = (id) => {
    setTopZIndex(z => z + 1);
    setProjects(prev => prev.map(p => p.id === id ? { ...p, z: topZIndex + 1 } : p));
  };

  try {
    return (
      <section id="projects" data-name="projects" className="py-24 bg-[#0e0e0e] relative min-h-[1000px] flex flex-col overflow-hidden">
        <div className="section-divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />
        
        <div className="relative z-0 px-6 md:px-12 pointer-events-none">
          <h2 className="font-headline mb-4 text-[clamp(2.5rem,6vw,5rem)] font-thin text-white tracking-tighter uppercase opacity-20">
            Active<br/>Nodes
          </h2>
          <p className="font-body text-[#bcff00] text-xs tracking-widest uppercase mb-12">
            Interactive Deployment Workspace — Move Nodes freely.
          </p>
        </div>
        
        <div className="relative z-10 px-6 md:px-12 flex gap-4 mb-8 flex-wrap">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} 
               className={`px-6 py-2 border font-body text-[10px] tracking-widest uppercase transition-colors duration-300 ${filter === f ? 'bg-[#bcff00] text-[#131313] border-[#bcff00]' : 'bg-transparent text-white/50 border-white/10 hover:border-white/40'}`}>
              {f}
            </button>
          ))}
        </div>

        <div ref={boundaryRef} className="relative flex-grow w-full h-full mx-auto" style={{ minHeight: '800px' }}>
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <p className="font-body text-[#bcff00] text-sm uppercase tracking-widest animate-pulse">Initializing Interface...</p>
              </div>
            ) : (
              filtered.map((p) => (
                <DraggableCard 
                  key={p.id}
                  project={p}
                  boundaryRef={boundaryRef}
                  initialPos={p.initialPos}
                  zIndex={p.z}
                  onPushFront={() => bringToFront(p.id)}
                />
              ))
            )}
        </div>

        <div className="section-divider" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
      </section>
    );
  } catch (error) {
    console.error('Projects component error:', error);
    return null;
  }
}