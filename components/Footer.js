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
      <footer data-name="footer" style={{ position: 'relative' }}>
        <div className="section-divider" />
        <div style={{ background: 'var(--bg-primary)', padding: '56px 0 0' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '44px', marginBottom: '52px' }}>

              {/* Brand */}
              <div>
                <div style={{
                  fontFamily: "'Outfit', monospace", fontWeight: 800, fontSize: '1.4rem',
                  background: 'linear-gradient(90deg, #0ea5e9, #f5c542)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  marginBottom: '14px',
                }}>{'<SKS />'}</div>
                <p style={{ color: '#6b6880', fontSize: '0.82rem', lineHeight: 1.75, marginBottom: '20px' }}>
                  Aspiring DevOps Engineer building cloud infrastructure, automating pipelines, and learning every day.
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {[
                    { icon: 'github', url: 'https://github.com/shashi232' },
                    { icon: 'linkedin', url: 'https://linkedin.com/in/shashi-kant-sharma-a338a5318' },
                    { icon: 'mail', url: 'mailto:shaskantsharma2@gmail.com' },
                  ].map((s, i) => (
                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="footer-social">
                      <div className={`icon-${s.icon}`} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Nav */}
              <div>
                <h4 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#8a86a0', marginBottom: '18px' }}>Navigation</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {links.map(l => (
                    <a key={l.href} href={l.href} onClick={(e) => scroll(e, l.href)} className="footer-link">
                      <span style={{ color: '#4e4a62', fontFamily: 'monospace', fontSize: '0.7rem' }}>→</span> {l.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <h4 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#8a86a0', marginBottom: '18px' }}>Status</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { dot: '#22c55e', text: 'Open to Internships' },
                    { dot: '#0ea5e9', text: 'Available for Freelance' },
                    { dot: '#f5c542', text: 'Actively Learning' },
                  ].map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: s.dot, flexShrink: 0, boxShadow: `0 0 5px ${s.dot}` }} />
                      <span style={{ fontSize: '0.82rem', color: '#8a86a0' }}>{s.text}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '24px', padding: '14px', borderRadius: '12px', background: 'rgba(14, 165, 233,0.03)', border: '1px solid rgba(14, 165, 233,0.08)' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.68rem', color: '#6b6880', marginBottom: '4px' }}>📍 Location</div>
                  <div style={{ fontSize: '0.82rem', color: '#e8e6f0' }}>Jaipur, Rajasthan, India</div>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div style={{ borderTop: '1px solid rgba(14, 165, 233,0.06)', padding: '20px 0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
              <p style={{ fontSize: '0.75rem', color: '#6b6880' }}>
                © {yr} Shashi Kant Sharma · Built with ❤️ & React
              </p>
              <button onClick={toTop} className="footer-top-btn" title="Back to top">
                <div className="icon-chevron-up" />
              </button>
            </div>
          </div>
        </div>

        <style>{`
          .footer-social {
            width: 36px; height: 36px; border-radius: 9px;
            border: 1px solid rgba(14, 165, 233,0.1); background: rgba(14, 165, 233,0.04);
            display: flex; align-items: center; justify-content: center;
            color: #8a86a0; text-decoration: none; font-size: 1rem;
            transition: transform 0.2s ease, color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
          }
          .footer-social:hover { color: #0ea5e9; border-color: rgba(14, 165, 233,0.3); background: rgba(14, 165, 233,0.08); transform: translateY(-2px); }

          .footer-link {
            font-size: 0.82rem; color: #6b6880; text-decoration: none;
            display: flex; align-items: center; gap: 7px;
            transition: color 0.2s ease;
          }
          .footer-link:hover { color: #0ea5e9; }

          .footer-top-btn {
            width: 34px; height: 34px; border-radius: 9px;
            border: 1px solid rgba(14, 165, 233,0.15); background: rgba(14, 165, 233,0.05);
            color: #0ea5e9; cursor: pointer; display: flex; align-items: center; justify-content: center;
            font-size: 0.95rem; transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
          }
          .footer-top-btn:hover { background: rgba(14, 165, 233,0.1); transform: translateY(-2px); box-shadow: 0 0 15px rgba(14, 165, 233,0.25); }
        `}</style>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}