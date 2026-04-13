function Skills() {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const groups = [
    { cat: 'OS & Core', icon: '🖥️', color: '#0ea5e9',
      skills: [{ name: 'Linux', lvl: 85, logo: '🐧' }, { name: 'Bash', lvl: 78, logo: '💻' }, { name: 'Git & GitHub', lvl: 88, logo: '🌿' }] },
    { cat: 'Containers', icon: '🐳', color: '#f5c542',
      skills: [{ name: 'Docker', lvl: 82, logo: '🐋' }, { name: 'Kubernetes', lvl: 70, logo: '☸️' }, { name: 'Compose', lvl: 80, logo: '📦' }] },
    { cat: 'Cloud', icon: '☁️', color: '#e8985a',
      skills: [{ name: 'AWS', lvl: 75, logo: '🌩️' }, { name: 'GCP', lvl: 60, logo: '🔵' }, { name: 'Terraform', lvl: 68, logo: '🏗️' }] },
    { cat: 'CI/CD', icon: '⚙️', color: '#f472b6',
      skills: [{ name: 'Jenkins', lvl: 72, logo: '🔧' }, { name: 'Ansible', lvl: 65, logo: '🤖' }, { name: 'GH Actions', lvl: 78, logo: '⚡' }] },
    { cat: 'Monitoring', icon: '📊', color: '#818cf8',
      skills: [{ name: 'Prometheus', lvl: 65, logo: '📈' }, { name: 'Grafana', lvl: 60, logo: '📊' }, { name: 'MongoDB', lvl: 70, logo: '🍃' }] },
    { cat: 'Web & Servers', icon: '🌐', color: '#67e8f9',
      skills: [{ name: 'Nginx', lvl: 74, logo: '🌐' }, { name: 'Python', lvl: 72, logo: '🐍' }, { name: 'Node.js', lvl: 65, logo: '🟢' }] },
  ];

  try {
    return (
      <section id="skills" ref={ref} data-name="skills" style={{ padding: '110px 0', background: 'var(--bg-primary)', position: 'relative' }}>
        <div className="section-divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div className={`reveal ${visible ? 'visible' : ''}`}>
            <div style={{ textAlign: 'center', marginBottom: '14px' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '3px', color: '#f5c542', textTransform: 'uppercase', opacity: 0.6 }}>// 02. skills</span>
            </div>
            <h2 style={{ textAlign: 'center', marginBottom: '12px', fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 800, color: '#e8e6f0', letterSpacing: '-1px' }}>
              Technical Arsenal
            </h2>
            <p style={{ textAlign: 'center', color: '#4e4a62', marginBottom: '60px', fontSize: '0.95rem' }}>
              Tools and technologies I work with
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: '20px' }}>
            {groups.map((g, gi) => (
              <div key={gi} className={`skill-group-card reveal ${visible ? 'visible' : ''}`}
                style={{ '--sc': g.color, transitionDelay: `${0.1 + gi * 0.08}s` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
                  <span style={{ fontSize: '1.3rem' }}>{g.icon}</span>
                  <h3 style={{ fontWeight: 700, fontSize: '0.88rem', color: g.color, margin: 0 }}>{g.cat}</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {g.skills.map((s, si) => (
                    <div key={si}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '0.9rem' }}>{s.logo}</span>
                          <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#c4c0d8' }}>{s.name}</span>
                        </div>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: g.color, fontWeight: 700 }}>{s.lvl}%</span>
                      </div>
                      <div style={{ height: '5px', background: 'rgba(14, 165, 233,0.06)', borderRadius: '100px', overflow: 'hidden' }}>
                        <div className="skill-bar-fill" style={{
                          height: '100%', borderRadius: '100px',
                          width: visible ? s.lvl + '%' : '0%',
                          background: `linear-gradient(90deg, ${g.color}, ${g.color}70)`,
                          boxShadow: `0 0 8px ${g.color}40`,
                          transitionDelay: `${gi * 0.12 + si * 0.06}s`,
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={`reveal ${visible ? 'visible' : ''} reveal-delay-4`} style={{ textAlign: 'center', marginTop: '56px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '10px 24px', borderRadius: '100px',
              background: 'rgba(14, 165, 233,0.06)', border: '1px solid rgba(14, 165, 233,0.1)',
              fontSize: '0.82rem', color: '#6b6880',
            }}>
              <div style={{ width: '5px', height: '5px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 6px #22c55e', animation: 'pulse 2s ease-in-out infinite' }} />
              Continuously expanding my toolkit
            </div>
          </div>
        </div>
        <div className="section-divider" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />

        <style>{`
          .skill-group-card {
            border-radius: 16px; padding: 26px;
            background: rgba(14, 165, 233,0.03); border: 1px solid rgba(14, 165, 233,0.06);
            transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, opacity 0.8s cubic-bezier(0.16,1,0.3,1);
          }
          .skill-group-card:hover {
            transform: translateY(-5px);
            background: rgba(14, 165, 233,0.06);
            border-color: var(--sc, rgba(14, 165, 233,0.15));
            box-shadow: 0 18px 55px rgba(0,0,0,0.4);
          }
          .skill-bar-fill {
            transition: width 1.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
        `}</style>
      </section>
    );
  } catch (error) {
    console.error('Skills component error:', error);
    return null;
  }
}