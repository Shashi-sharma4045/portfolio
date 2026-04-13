function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('hero');

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  try {
    return (
      <nav data-name="navbar" className="nav-bar" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'all 0.35s ease',
        background: scrolled ? 'rgba(8, 7, 13, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(14, 165, 233,0.1)' : 'none',
        boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.5)' : 'none',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
            <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} style={{
              fontFamily: "'Outfit', monospace", fontWeight: 800, fontSize: '1.25rem',
              background: 'linear-gradient(90deg, #0ea5e9, #f5c542)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              textDecoration: 'none', letterSpacing: '-0.5px',
            }}>
              {'<SKS />'}
            </a>

            <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }} className="desktop-nav">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                    className={`nav-link ${isActive ? 'active' : ''}`}>
                    {link.label}
                  </a>
                );
              })}
              <a href="mailto:shaskantsharma2@gmail.com" className="nav-cta">
                Hire Me
              </a>
            </div>

            <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" style={{
              background: 'none', border: '1px solid rgba(14, 165, 233,0.3)', borderRadius: '8px',
              padding: '8px', color: '#0ea5e9', display: 'none',
            }}>
              <div className={`icon-${menuOpen ? 'x' : 'menu'} text-xl`}></div>
            </button>
          </div>

          {menuOpen && (
            <div style={{
              position: 'absolute', top: '64px', left: 0, right: 0,
              background: 'rgba(8,7,13,0.97)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(14, 165, 233,0.1)',
              padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '8px',
            }}>
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                  style={{ padding: '12px 16px', borderRadius: '8px', fontSize: '1rem', fontWeight: 500,
                    textDecoration: 'none', color: '#8a86a0', transition: 'color 0.2s' }}>
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <style>{`
          .nav-link {
            padding: 6px 16px; border-radius: 8px; font-size: 0.875rem; font-weight: 400;
            text-decoration: none; color: #8a86a0; background: transparent;
            transition: all 0.2s ease; font-family: 'Inter', sans-serif;
          }
          .nav-link:hover { color: #e8e6f0; background: rgba(14, 165, 233,0.06); }
          .nav-link.active { color: #0ea5e9; font-weight: 600; background: rgba(14, 165, 233,0.1); }

          .nav-cta {
            margin-left: 8px; padding: 8px 20px; border-radius: 8px;
            font-size: 0.875rem; font-weight: 600; text-decoration: none;
            color: #0a0a12; background: linear-gradient(135deg, #0ea5e9, #f5c542);
            font-family: 'Inter', sans-serif;
            box-shadow: 0 0 18px rgba(14, 165, 233,0.3);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 0 30px rgba(14, 165, 233,0.5); }

          @media (max-width: 768px) {
            .desktop-nav { display: none !important; }
            .mobile-menu-btn { display: flex !important; }
          }
        `}</style>
      </nav>
    );
  } catch (error) {
    console.error('Navbar error:', error);
    return null;
  }
}
