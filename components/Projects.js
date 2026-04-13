function Projects() {
  const [filter, setFilter] = React.useState('All');
  const [visible, setVisible] = React.useState(false);
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    // 1. Fetch GitHub Repositories
    const fetchGitHub = fetch('https://api.github.com/users/shashi232/repos?sort=updated&per_page=6')
      .then(res => {
        if (!res.ok) throw new Error('GitHub API Error');
        return res.json();
      })
      .then(repos => {
        return repos.map(repo => ({
          title: repo.name,
          desc: repo.description || 'A project hosted on GitHub.',
          tags: repo.language ? [repo.language, 'GitHub'] : ['GitHub'],
          cat: 'GitHub',
          status: 'Active',
          statusColor: '#22c55e',
          icon: '💻',
          color: '#818cf8',
          link: repo.html_url
        }));
      })
      .catch(err => {
        console.error('Failed fetching GitHub repos:', err);
        return []; // return empty on failure so Promise.all doesn't crash
      });

    // 2. Fetch LinkedIn Mock Activity
    const fetchLinkedIn = fetch('data/linkedin.json')
      .then(res => {
        if (!res.ok) throw new Error('LinkedIn Mock API Error');
        return res.json();
      })
      .catch(err => {
        console.error('Failed fetching LinkedIn mock data:', err);
        return [];
      });

    // Resolve both API calls, merge the arrays, and update state
    Promise.all([fetchGitHub, fetchLinkedIn]).then(([ghData, liData]) => {
      // Interleave or combine data
      setProjects([...ghData, ...liData]);
      setLoading(false);
    });
  }, []);

  const filters = ['All', 'GitHub', 'LinkedIn'];

  const filtered = filter === 'All' ? projects : projects.filter(p => p.cat === filter);

  try {
    return (
      <section id="projects" ref={ref} data-name="projects" style={{ padding: '110px 0', background: 'var(--bg-secondary)', position: 'relative' }}>
        <div className="section-divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div className={`reveal ${visible ? 'visible' : ''}`}>
            <div style={{ textAlign: 'center', marginBottom: '14px' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '3px', color: '#f472b6', textTransform: 'uppercase', opacity: 0.6 }}>// 03. projects</span>
            </div>
            <h2 style={{ textAlign: 'center', marginBottom: '12px', fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 800, color: '#e8e6f0', letterSpacing: '-1px' }}>
              What I'm Building
            </h2>
            <p style={{ textAlign: 'center', color: '#4e4a62', marginBottom: '40px', fontSize: '0.95rem' }}>
              Pulling live repository data from GitHub & LinkedIn activity
            </p>

            {/* Filters */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '48px', flexWrap: 'wrap' }}>
              {filters.map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`proj-filter ${filter === f ? 'active' : ''}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {loading ? (
             <div style={{ textAlign: 'center', color: '#8a86a0', fontStyle: 'italic', padding: '60px', animation: 'pulse 2s infinite' }}>
                Fetching Live Data from GitHub and LinkedIn API...
             </div>
          ) : (
            <div className="proj-grid">
              {filtered.map((p, i) => (
                <div key={i} className={`proj-card flex flex-col reveal ${visible ? 'visible' : ''}`} style={{
                  '--pc': p.color,
                  transitionDelay: `${0.1 + (i % 3) * 0.1}s`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{p.icon}</span>
                    <span className="proj-status" style={{ '--psc': p.statusColor }}>{p.status}</span>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: '#e8e6f0', marginBottom: '10px', lineHeight: 1.35, wordBreak: 'break-word' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#6b6880', lineHeight: 1.7, marginBottom: '18px', flexGrow: 1 }}>
                    {p.desc}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                    {p.tags.map(t => (
                      <span key={t} className="proj-tag" style={{ '--ptc': p.color }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ paddingTop: '14px', borderTop: '1px solid rgba(14, 165, 233,0.06)' }}>
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="proj-link" style={{ '--plc': p.color }}>
                      <div className={`icon-${p.cat === 'GitHub' ? 'github' : 'link'}`} style={{ fontSize: '0.9rem' }} /> 
                      {p.cat === 'GitHub' ? 'View Repo' : 'View Post'}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="section-divider" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />

        <style>{`
          .proj-grid {
            display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px;
          }
          .proj-filter {
            padding: 7px 18px; border-radius: 100px; border: none;
            font-size: 0.8rem; font-weight: 600; cursor: pointer;
            background: rgba(14, 165, 233,0.05); color: #8a86a0;
            font-family: 'Inter', sans-serif;
            transition: all 0.2s ease;
          }
          .proj-filter:hover { background: rgba(14, 165, 233,0.1); color: #e8e6f0; }
          .proj-filter.active {
            background: linear-gradient(135deg, #0ea5e9, #f5c542);
            color: #0a0a12; box-shadow: 0 3px 15px rgba(14, 165, 233,0.25);
          }

          .proj-card {
            border-radius: 16px; padding: 26px;
            background: rgba(14, 165, 233,0.03);
            border: 1px solid rgba(14, 165, 233,0.06);
            display: flex; flex-direction: column;
            transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, opacity 0.8s cubic-bezier(0.16,1,0.3,1);
          }
          .proj-card:hover {
            transform: translateY(-6px);
            border-color: var(--pc, rgba(14, 165, 233,0.2));
            box-shadow: 0 18px 55px rgba(0,0,0,0.4);
          }

          .proj-status {
            font-size: 0.66rem; font-weight: 700; letter-spacing: 0.5px;
            padding: 3px 10px; border-radius: 100px;
            background: color-mix(in srgb, var(--psc) 12%, transparent);
            color: var(--psc);
            border: 1px solid color-mix(in srgb, var(--psc) 25%, transparent);
            text-transform: uppercase; font-family: 'Inter', sans-serif;
          }

          .proj-tag {
            padding: 2px 8px; border-radius: 5px;
            background: color-mix(in srgb, var(--ptc) 8%, transparent);
            color: var(--ptc);
            border: 1px solid color-mix(in srgb, var(--ptc) 18%, transparent);
            font-size: 0.7rem; font-weight: 600; font-family: monospace;
          }

          .proj-link {
            display: inline-flex; align-items: center; gap: 6px;
            color: #8a86a0; text-decoration: none; font-size: 0.78rem;
            font-weight: 500; transition: color 0.2s ease;
          }
          .proj-link:hover { color: var(--plc, #0ea5e9); }
        `}</style>
      </section>
    );
  } catch (error) {
    console.error('Projects component error:', error);
    return null;
  }
}