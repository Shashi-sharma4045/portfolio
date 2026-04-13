function About() {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const focuses = [
    { icon: '🐳', title: 'Containerization', desc: 'Docker & Kubernetes for scalable, portable deployment', color: '#0ea5e9' },
    { icon: '☁️', title: 'Cloud Infrastructure', desc: 'AWS & GCP architecture — EC2, S3, Lambda, IAM', color: '#f5c542' },
    { icon: '⚙️', title: 'CI/CD Automation', desc: 'Jenkins, GitHub Actions, zero-downtime deploys', color: '#f472b6' },
    { icon: '📊', title: 'Monitoring & Ops', desc: 'Prometheus, Grafana, alerting & log aggregation', color: '#e8985a' },
  ];

  const stats = [
    { val: '2+', label: 'Years Learning', icon: '📅' },
    { val: '10+', label: 'Tools Mastered', icon: '🛠️' },
    { val: '4+', label: 'Certifications', icon: '🏆' },
    { val: '∞', label: 'Curiosity', icon: '🚀' },
  ];

  try {
    return (
      <section id="about" ref={ref} data-name="about" style={{ padding: '110px 0', background: 'var(--bg-secondary)', position: 'relative' }}>
        <div className="section-divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div className={`reveal ${visible ? 'visible' : ''}`}>
            <div style={{ textAlign: 'center', marginBottom: '14px' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '3px', color: '#0ea5e9', textTransform: 'uppercase', opacity: 0.6 }}>// 01. about me</span>
            </div>
            <h2 style={{ textAlign: 'center', marginBottom: '64px', fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 800, color: '#e8e6f0', letterSpacing: '-1px' }}>
              Who Am I?
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '56px', alignItems: 'start', marginBottom: '72px' }}>
            <div className={`reveal ${visible ? 'visible' : ''} reveal-delay-1`}>
              {[
                <React.Fragment key="a">I'm <strong style={{ color: '#e8e6f0' }}>Shashi Kant Sharma</strong>, a Computer Science Engineering student at <strong style={{ color: '#0ea5e9' }}>Amity University Jaipur</strong>, passionately building a career in DevOps and cloud infrastructure.</React.Fragment>,
                "I love bridging the gap between development and operations — from writing Terraform configs and orchestrating containers with Kubernetes, to setting up CI/CD pipelines that deploy code with zero downtime.",
                "When I'm not automating things, I'm exploring new AWS services, tinkering with Linux systems, or contributing to open-source projects.",
              ].map((para, i) => (
                <p key={i} style={{ color: '#7a7590', fontSize: '0.98rem', lineHeight: 1.85, marginBottom: '20px' }}>
                  {para}
                </p>
              ))}

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '28px' }}>
                <a href="https://github.com/shashi232" target="_blank" rel="noopener noreferrer" className="about-btn-fill">
                  <div className="icon-github" /> View GitHub
                </a>
                <a href="https://linkedin.com/in/shashi-kant-sharma-a338a5318" target="_blank" rel="noopener noreferrer" className="about-btn-outline">
                  <div className="icon-linkedin" /> LinkedIn
                </a>
              </div>
            </div>

            <div className={`reveal ${visible ? 'visible' : ''} reveal-delay-2`} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {focuses.map((f, i) => (
                <div key={i} className="about-focus-card" style={{ '--fc': f.color }}>
                  <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: f.color, marginBottom: '3px' }}>{f.title}</div>
                    <div style={{ fontSize: '0.82rem', color: '#6b6880', lineHeight: 1.55 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`reveal ${visible ? 'visible' : ''} reveal-delay-3`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
            {stats.map((s, i) => (
              <div key={i} className="about-stat-card" style={{ animationDelay: `${i * 0.5}s` }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>{s.icon}</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '2rem', fontWeight: 800, color: '#0ea5e9', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: '0.75rem', color: '#4e4a62', marginTop: '6px', letterSpacing: '0.5px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-divider" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />

        <style>{`
          .about-btn-fill {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 10px 22px; border-radius: 10px; font-size: 0.85rem; font-weight: 700;
            background: linear-gradient(135deg, #0ea5e9, #f5c542); color: #0a0a12;
            text-decoration: none; box-shadow: 0 3px 20px rgba(14, 165, 233,0.25);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .about-btn-fill:hover { transform: translateY(-2px); box-shadow: 0 6px 35px rgba(14, 165, 233,0.4); }

          .about-btn-outline {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 10px 22px; border-radius: 10px; font-size: 0.85rem; font-weight: 600;
            border: 1.5px solid rgba(14, 165, 233,0.2); color: #0ea5e9;
            background: rgba(14, 165, 233,0.05); text-decoration: none;
            transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
          }
          .about-btn-outline:hover { transform: translateY(-2px); background: rgba(14, 165, 233,0.1); border-color: rgba(14, 165, 233,0.4); }

          .about-focus-card {
            padding: 16px 18px; border-radius: 12px;
            background: rgba(14, 165, 233,0.03); border: 1px solid rgba(14, 165, 233,0.06);
            display: flex; gap: 14px; align-items: flex-start;
            transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
          }
          .about-focus-card:hover {
            background: rgba(14, 165, 233,0.06);
            border-color: var(--fc, rgba(14, 165, 233,0.15));
            transform: translateX(6px);
          }

          .about-stat-card {
            text-align: center; padding: 26px 16px; border-radius: 14px;
            background: rgba(14, 165, 233,0.04); border: 1px solid rgba(14, 165, 233,0.08);
            transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
            animation: float-subtle 6s ease-in-out infinite;
          }
          .about-stat-card:hover {
            transform: translateY(-5px);
            border-color: rgba(14, 165, 233,0.2);
            box-shadow: 0 10px 35px rgba(14, 165, 233,0.1);
          }
        `}</style>
      </section>
    );
  } catch (error) {
    console.error('About component error:', error);
    return null;
  }
}