function Contact() {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    {
      name: 'GitHub',
      icon: 'github',
      url: 'https://github.com/shashi232',
      color: 'var(--primary-color)'
    },
    {
      name: 'LinkedIn',
      icon: 'linkedin',
      url: 'https://linkedin.com/shashi-kant-sharma-a338a5318',
      color: 'var(--secondary-color)'
    },
    {
      name: 'Email',
      icon: 'mail',
      url: 'mailto:shaskantsharma2@gmail.com',
      color: 'var(--accent-color)'
    }

  ];

  try {
    return (
      <section 
        id="contact"
        ref={sectionRef}
        className="py-20 bg-[var(--bg-secondary)]" 
        data-name="contact" 
        data-file="components/Contact.js"
      >
        <div className="container mx-auto px-6">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[var(--primary-color)]">
              Get In Touch
            </h2>
            
            <div className="max-w-2xl mx-auto text-center mb-16">
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
                Let's connect and discuss opportunities in DevOps, cloud infrastructure, 
                or any exciting projects you have in mind!
              </p>
              
              <div className="flex justify-center items-center gap-8 mb-12">
                {socialLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 rounded-full border-2 border-gray-700 flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ 
                      borderColor: link.color,
                      boxShadow: `0 0 0 ${link.color}40`
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.boxShadow = `0 0 30px ${link.color}`;
                      e.target.style.backgroundColor = link.color + '10';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.boxShadow = `0 0 0 ${link.color}40`;
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div 
                      className={`icon-${link.icon} text-2xl`}
                      style={{ color: link.color }}
                    ></div>
                  </a>
                ))}
              </div>
              
              <div className="bg-[var(--bg-primary)] rounded-xl p-8 border border-gray-700">
                <div className="flex items-center justify-center mb-4">
                  <div className="icon-download text-[var(--primary-color)] text-2xl mr-3"></div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)]">Resume</h3>
                </div>
                <p className="text-[var(--text-secondary)] mb-6">
                  Download my resume to learn more about my skills and experience
                </p>
                <button className="glow-button">
                  <div className="icon-download text-lg mr-2 inline-block"></div>
                  Download Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Contact component error:', error);
    return null;
  }
}