// ─── NODE GRAPH CANVAS ──────────────────────────────────────────────────────
function NodeCanvas({ cards, draggingId }) {
  // Draw bezier connections from each card to the next (pipeline order)
  const lines = React.useMemo(() => {
    const out = [];
    for (let i = 0; i < cards.length - 1; i++) {
      out.push({ from: cards[i], to: cards[i + 1] });
    }
    return out;
  }, [cards]);

  const CARD_W = window.innerWidth < 768 ? 280 : 340;
  const CARD_H = 210;

  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}
    >
      <defs>
        <filter id="glow-line">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {lines.map(({ from, to }, i) => {
        // right-port of 'from' → left-port of 'to'
        const x1 = from.pos.x + CARD_W;
        const y1 = from.pos.y + CARD_H / 2;
        const x2 = to.pos.x;
        const y2 = to.pos.y + CARD_H / 2;
        const dx = Math.abs(x2 - x1) * 0.5;
        const isActive = draggingId === from.id || draggingId === to.id;
        return (
          <g key={i}>
            {/* shadow path */}
            <path
              d={`M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`}
              fill="none"
              stroke="#bcff00"
              strokeWidth={isActive ? 2.5 : 1}
              strokeOpacity={isActive ? 0.7 : 0.15}
              filter="url(#glow-line)"
              strokeDasharray={isActive ? 'none' : '6 4'}
            />
            {/* animated flow dot when active */}
            {isActive && (
              <circle r="4" fill="#bcff00" opacity="0.9" filter="url(#glow-line)">
                <animateMotion
                  dur="1.6s"
                  repeatCount="indefinite"
                  path={`M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`}
                />
              </circle>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ─── DRAGGABLE NODE CARD ─────────────────────────────────────────────────────
function DraggableCard({ project, boundaryRef, pos, zIndex, onPushFront, onPosChange, isDragging, onDragStart, onDragEnd }) {
  const offset = React.useRef({ x: 0, y: 0 });
  const cardRef = React.useRef(null);

  const CARD_W = window.innerWidth < 768 ? 280 : 340;

  const handlePointerDown = (e) => {
    if (e.target.closest('a')) return; // allow link clicks
    e.target.setPointerCapture(e.pointerId);
    onDragStart();
    onPushFront();
    const rect = cardRef.current.getBoundingClientRect();
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handlePointerMove = (e) => {
    if (!isDragging || !boundaryRef.current || !cardRef.current) return;
    const bRect = boundaryRef.current.getBoundingClientRect();
    const cRect = cardRef.current.getBoundingClientRect();
    let nx = e.clientX - bRect.left - offset.current.x;
    let ny = e.clientY - bRect.top - offset.current.y;
    nx = Math.max(0, Math.min(nx, bRect.width - cRect.width));
    ny = Math.max(0, Math.min(ny, bRect.height - cRect.height));
    onPosChange({ x: nx, y: ny });
  };

  const handlePointerUp = () => { onDragEnd(); };

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
        zIndex,
        touchAction: 'none',
        width: CARD_W,
        transition: isDragging ? 'none' : 'box-shadow 0.3s'
      }}
      className={`bg-[#131313] flex flex-col cursor-grab select-none
        ${isDragging ? 'cursor-grabbing shadow-[0_0_40px_0px_#bcff0044]' : 'shadow-[0_0_0px_0px_#bcff0000] hover:shadow-[0_0_20px_0px_#bcff0022]'}`}
    >
      {/* Top neon accent border */}
      <div className="h-[2px] w-full" style={{ background: isDragging ? '#bcff00' : '#bcff0066' }} />

      {/* LEFT connector port */}
      <div style={{
        position: 'absolute', left: -6, top: '50%', transform: 'translateY(-50%)',
        width: 12, height: 12, borderRadius: '50%',
        background: isDragging ? '#bcff00' : '#1c1b1b',
        border: `2px solid ${isDragging ? '#bcff00' : '#bcff0044'}`,
        boxShadow: isDragging ? '0 0 10px #bcff00' : 'none',
        zIndex: 20
      }} />
      {/* RIGHT connector port */}
      <div style={{
        position: 'absolute', right: -6, top: '50%', transform: 'translateY(-50%)',
        width: 12, height: 12, borderRadius: '50%',
        background: isDragging ? '#bcff00' : '#1c1b1b',
        border: `2px solid ${isDragging ? '#bcff00' : '#bcff0044'}`,
        boxShadow: isDragging ? '0 0 10px #bcff00' : 'none',
        zIndex: 20
      }} />

      {/* HEADER */}
      <div className="px-4 pt-4 pb-3 bg-[#1c1b1b] border-b border-white/5">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[#bcff00] text-[9px] uppercase tracking-[0.2em] font-body bg-[#131313] px-2 py-1 border border-[#bcff00]/20">
            {project.cat}
          </span>
          <a href={project.link} target="_blank" rel="noopener noreferrer"
            className="text-white/30 hover:text-[#bcff00] transition-colors pointer-events-auto"
            onClick={e => e.stopPropagation()}>
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>
        <h3 className="font-headline text-lg font-light text-white uppercase tracking-tight leading-tight line-clamp-1">
          {project.title}
        </h3>
      </div>

      {/* BODY */}
      <div className="px-4 py-3 flex-grow">
        <p className="font-body text-white/45 text-[11px] tracking-wide leading-relaxed line-clamp-3">
          {project.desc}
        </p>
      </div>

      {/* FOOTER */}
      <div className="px-4 pb-4 pt-2 border-t border-white/5 flex items-center gap-2 flex-wrap">
        {project.tags.slice(0, 3).map(tag => (
          <span key={tag} className="text-[9px] font-body text-on-surface-variant bg-[#353534] px-2 py-0.5 uppercase tracking-wider">
            {tag}
          </span>
        ))}
        {project.status === 'Active' && (
          <span className="ml-auto flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#bcff00] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#bcff00]" />
            </span>
            <span className="text-[9px] font-body text-[#bcff00] uppercase tracking-widest">ACTIVE_NODE</span>
          </span>
        )}
      </div>
    </div>
  );
}

// ─── PROJECTS SECTION ────────────────────────────────────────────────────────
window.Projects = function Projects() {
  const [filter, setFilter] = React.useState('All');
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [topZIndex, setTopZIndex] = React.useState(10);
  const [draggingId, setDraggingId] = React.useState(null);
  const boundaryRef = React.useRef(null);

  React.useEffect(() => {
    const fetchGitHub = fetch('https://api.github.com/users/shashi232/repos?sort=updated&per_page=6')
      .then(res => res.ok ? res.json() : [])
      .then(repos => repos.map(repo => ({
        title: repo.name,
        desc: repo.description || `${repo.language ? repo.language + ' project' : 'Repository'} — ${repo.stargazers_count} ★ · ${repo.forks_count} forks`,
        tags: repo.language ? [repo.language, 'GitHub'] : ['GitHub'],
        cat: 'GITHUB',
        status: 'Active',
        link: repo.html_url
      }))).catch(() => []);

    const fetchLinkedIn = fetch('data/linkedin.json')
      .then(res => res.ok ? res.json() : [])
      .catch(() => []);

    Promise.all([fetchGitHub, fetchLinkedIn]).then(([ghData, liData]) => {
      const CARD_W = window.innerWidth < 768 ? 290 : 350;
      const CARD_H = 220;
      const PAD = 60;
      const COLS = Math.max(1, Math.floor((window.innerWidth - PAD * 2) / (CARD_W + 60)));

      const merged = [...ghData, ...liData].map((p, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        return {
          ...p,
          id: `proj-${i}`,
          pos: {
            x: PAD + col * (CARD_W + 80) + (Math.random() * 30 - 15),
            y: PAD + row * (CARD_H + 100) + (Math.random() * 30 - 15)
          },
          z: 10 + i
        };
      });
      setProjects(merged);
      setLoading(false);
    });
  }, []);

  const filters = ['All', 'GITHUB', 'LinkedIn'];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.cat === filter);

  const bringToFront = (id) => {
    const next = topZIndex + 1;
    setTopZIndex(next);
    setProjects(prev => prev.map(p => p.id === id ? { ...p, z: next } : p));
  };

  const updatePos = (id, newPos) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, pos: newPos } : p));
  };

  try {
    return (
      <section id="projects" data-name="projects" className="py-24 bg-[#0e0e0e] relative flex flex-col overflow-hidden" style={{ minHeight: '100vh' }}>
        <div className="section-divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

        {/* Grid dot canvas background */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, #bcff0018 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />

        {/* Section header */}
        <div className="relative z-10 px-6 md:px-12 pointer-events-none mb-2">
          <h2 className="font-headline text-[clamp(2.5rem,6vw,5rem)] font-thin text-white tracking-tighter uppercase opacity-15">
            Active<br />Nodes
          </h2>
          <p className="font-body text-[#bcff00] text-[10px] tracking-[0.3em] uppercase mb-4">
            Node Graph Workspace — Drag to rearrange the pipeline.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="relative z-10 px-6 md:px-12 flex gap-3 mb-6 flex-wrap">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-5 py-1.5 border font-body text-[9px] tracking-widest uppercase transition-colors duration-300
                ${filter === f ? 'bg-[#bcff00] text-[#131313] border-[#bcff00]' : 'bg-transparent text-white/40 border-white/10 hover:border-white/40'}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Canvas workspace */}
        <div
          ref={boundaryRef}
          className="relative flex-grow w-full"
          style={{ minHeight: '860px' }}
        >
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <p className="font-body text-[#bcff00] text-sm uppercase tracking-widest animate-pulse">
                Initializing Node Graph...
              </p>
            </div>
          ) : (
            <>
              {/* SVG connection lines — rendered BELOW cards */}
              <NodeCanvas cards={filtered} draggingId={draggingId} />

              {filtered.map((p) => (
                <DraggableCard
                  key={p.id}
                  project={p}
                  boundaryRef={boundaryRef}
                  pos={p.pos}
                  zIndex={p.z}
                  isDragging={draggingId === p.id}
                  onPushFront={() => bringToFront(p.id)}
                  onPosChange={(newPos) => updatePos(p.id, newPos)}
                  onDragStart={() => setDraggingId(p.id)}
                  onDragEnd={() => setDraggingId(null)}
                />
              ))}
            </>
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