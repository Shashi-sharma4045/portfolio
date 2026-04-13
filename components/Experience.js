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
    document.querySelectorAll('.exp-item').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const color = (t) => t === 'education' ? '#0ea5e9' : t === 'certification' ? '#f5c542' : '#f472b6';
  const label = (t) => t === 'education' ? 'Education' : t === 'certification' ? 'Cert' : 'Learning';

  try {
    return (
      <section id="experience" data-name="experience" style={{ padding: '110px 0', background: 'var(--bg-primary)', position: 'relative' }}>
        <div className="section-divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 24px' }}>
          <div className="reveal visible" style={{ textAlign: 'center', marginBottom: '14px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '3px', color: '#f5c542', textTransform: 'uppercase', opacity: 0.6 }}>// 04. experience</span>
          </div>
          <h2 className="reveal visible" style={{ textAlign: 'center', marginBottom: '12px', fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 800, color: '#e8e6f0', letterSpacing: '-1px' }}>
            My Journey
          </h2>
          <p className="reveal visible" style={{ textAlign: 'center', color: '#4e4a62', marginBottom: '70px', fontSize: '0.95rem' }}>
            Education, certifications, and self-directed learning
          </p>

          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute', left: '23px', top: '10px', bottom: '10px', width: '2px',
              background: 'linear-gradient(to bottom, rgba(14, 165, 233,0.3), rgba(245,197,66,0.3))',
            }} />

            {loading ? (
              <div style={{ paddingLeft: '70px', color: '#8a86a0', fontSize: '0.9rem', fontStyle: 'italic', animation: 'pulse 2s infinite' }}>
                Fetching certificates...
              </div>
            ) : data.length === 0 ? (
               <div style={{ paddingLeft: '70px', color: '#ff4d4f', fontSize: '0.9rem' }}>
                 Failed to load data. Please try again later.
               </div>
            ) : data.map((item, i) => {
              const c = color(item.type);
              const show = visibleItems.has(i);
              return (
                <div key={i} data-idx={i} className="exp-item" style={{
                  display: 'flex', gap: '22px',
                  paddingBottom: i < data.length - 1 ? '36px' : '0',
                  opacity: show ? 1 : 0,
                  transform: show ? 'translateX(0)' : 'translateX(30px)',
                  transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
                }}>
                  {/* Icon */}
                  <div style={{ flexShrink: 0, width: '48px' }}>
                    <div className="exp-icon" style={{ '--ec': c }}>
                      {item.icon}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="exp-card" style={{ '--ec': c }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                      <h3 style={{ fontWeight: 700, fontSize: '0.98rem', color: '#e8e6f0', margin: 0 }}>{item.title}</h3>
                      <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                        <span className="exp-badge" style={{ '--ebc': c }}>{label(item.type)}</span>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#6b6880', fontWeight: 600 }}>{item.year}</span>
                      </div>
                    </div>
                    <div style={{ color: c, fontSize: '0.82rem', fontWeight: 600, marginBottom: '8px' }}>{item.org}</div>
                    <p style={{ color: '#8a86a0', fontSize: '0.82rem', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="reveal visible" style={{ textAlign: 'center', marginTop: '56px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '10px 24px', borderRadius: '100px',
              background: 'rgba(245,197,66,0.06)', border: '1px solid rgba(245,197,66,0.12)',
              fontSize: '0.82rem', color: '#6b6880',
            }}>
              <span style={{ fontSize: '1rem' }}>🚀</span>
              Building my DevOps journey — one pipeline at a time
            </div>
          </div>
        </div>

        <div className="section-divider" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />

        <style>{`
          .exp-icon {
            width: 46px; height: 46px; border-radius: 50%;
            background: color-mix(in srgb, var(--ec) 12%, transparent);
            border: 2px solid color-mix(in srgb, var(--ec) 35%, transparent);
            display: flex; align-items: center; justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 0 20px color-mix(in srgb, var(--ec) 20%, transparent);
            position: relative; z-index: 1;
            transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
          }
          .exp-item:hover .exp-icon {
            transform: scale(1.1);
            background: color-mix(in srgb, var(--ec) 20%, transparent);
            box-shadow: 0 0 30px color-mix(in srgb, var(--ec) 30%, transparent);
          }
          .exp-card {
            flex: 1; padding: 20px 22px; border-radius: 14px;
            background: rgba(14, 165, 233,0.03);
            border: 1px solid rgba(14, 165, 233,0.06);
            transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          }
          .exp-item:hover .exp-card {
            transform: translateX(6px);
            background: rgba(14, 165, 233,0.06);
            border-color: color-mix(in srgb, var(--ec) 30%, transparent);
            box-shadow: 0 8px 30px rgba(0,0,0,0.3);
          }
          .exp-badge {
            font-size: 0.65rem; font-weight: 700; padding: 2px 8px; border-radius: 100px;
            background: color-mix(in srgb, var(--ebc) 12%, transparent);
            color: var(--ebc);
            border: 1px solid color-mix(in srgb, var(--ebc) 25%, transparent);
            text-transform: uppercase; letter-spacing: 0.5px;
          }
        `}</style>
      </section>
    );
  } catch (error) {
    console.error('Experience component error:', error);
    return null;
  }
}
