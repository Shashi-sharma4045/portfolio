function Footer() {
  const currentYear = new Date().getFullYear();

  try {
    return (
      <footer className="relative overflow-hidden" data-name="footer" data-file="components/Footer.js">
        <div className="animated-gradient py-1"></div>
        
        <div className="bg-[var(--bg-primary)] py-12">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <div className="mb-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent mb-4">
                  Shashi Kant Sharma
                </h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  Aspiring DevOps Engineer | Building the Future of Infrastructure
                </p>
                
                <div className="flex justify-center items-center gap-6 mb-8">
                  <a href="https://github.com/shashi232" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <div className="icon-github"></div>
                  </a>
                  <a href="https://linkedin.com/shashi-kant-sharma-a338a5318" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <div className="icon-linkedin"></div>
                  </a>
                  <a href="mailto:shashikantsharmasks2@gmail.com" className="social-icon">
                    <div className="icon-mail"></div>
                  </a>

                </div>
                
                <button className="glow-button mb-8">
                  <div className="icon-download text-lg mr-2 inline-block"></div>
                  Download Resume
                </button>
              </div>
              
              <div className="border-t border-gray-700 pt-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-[var(--text-secondary)] text-sm">
                    © {currentYear} Shashi Kant Sharma. All rights reserved.
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[var(--secondary-color)] rounded-full animate-pulse"></div>
                      Open to Opportunities
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="animated-gradient py-1"></div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}