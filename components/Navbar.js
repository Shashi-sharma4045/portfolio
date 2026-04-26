function Navbar({ onTerminalOpen }) {
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
      <nav data-name="navbar" className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-[#131313]/90 backdrop-blur-2xl border-white/5 py-6' : 'bg-transparent border-transparent py-8 md:py-10'}`}>
        <div className="flex justify-between items-center px-6 md:px-12 max-w-[1800px] mx-auto">
          <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="text-xl md:text-2xl font-light tracking-[0.25em] text-white font-headline uppercase hover:text-primary-fixed transition-colors duration-500">
            SKS / INFRA. CORE
          </a>
          
          <div className="hidden md:flex gap-12 items-center">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                 <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                    className={`font-body text-[11px] tracking-widest uppercase transition-colors duration-500 ${isActive ? 'text-primary-fixed font-bold' : 'text-white/60 hover:text-primary-fixed'}`}>
                    {link.label}
                 </a>
              );
            })}
          </div>
          
          <div className="flex items-center gap-4 text-white/60">
             <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden hover:text-primary-fixed cursor-pointer transition-colors p-2">
                 <div className={`icon-${menuOpen ? 'x' : 'menu'} text-2xl`} />
             </button>
             <button onClick={onTerminalOpen} className="hidden md:block icon-terminal hover:text-primary-fixed cursor-pointer transition-colors text-xl p-2" aria-label="Open Terminal" />
          </div>
        </div>

        {/* Mobile Nav */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-[#131313]/95 backdrop-blur-xl border-b border-white/5 transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-[400px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'}`}>
           <div className="flex flex-col gap-4 px-6">
              {navLinks.map((link) => {
                 const isActive = activeSection === link.href.replace('#', '');
                 return (
                   <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                      className={`font-body text-xs tracking-widest uppercase py-3 border-b border-white/5 transition-colors ${isActive ? 'text-primary-fixed font-bold' : 'text-white/60'}`}>
                      {link.label}
                   </a>
                 );
              })}
           </div>
        </div>
      </nav>
    );
  } catch (error) {
    console.error('Navbar error:', error);
    return null;
  }
}
