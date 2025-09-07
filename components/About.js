function About() {
  try {
    return (
      <section 
        className="py-20 bg-[var(--bg-secondary)] relative" 
        data-name="about" 
        data-file="components/About.js"
      >
        <div className="container mx-auto px-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[var(--primary-color)]">
              About Me
            </h2>
            
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
                I am a passionate Computer Science Engineering student at Amity University Jaipur, 
                driven by the exciting world of DevOps and cloud technologies. My journey in tech 
                is fueled by curiosity about automation, infrastructure as code, and building 
                scalable systems that power modern applications.
              </p>
              
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
                With a strong foundation in programming and system administration, I am constantly 
                learning and exploring tools like Docker, Kubernetes, Jenkins, and cloud platforms 
                to bridge the gap between development and operations.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-[var(--primary-color)] bg-opacity-10 rounded-full flex items-center justify-center">
                    <div className="icon-code text-2xl text-[var(--primary-color)]"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[var(--text-primary)]">Development</h3>
                  <p className="text-[var(--text-secondary)]">Full-stack development with modern frameworks</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-[var(--secondary-color)] bg-opacity-10 rounded-full flex items-center justify-center">
                    <div className="icon-server text-2xl text-[var(--secondary-color)]"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[var(--text-primary)]">Infrastructure</h3>
                  <p className="text-[var(--text-secondary)]">Cloud infrastructure and containerization</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-[var(--accent-color)] bg-opacity-10 rounded-full flex items-center justify-center">
                    <div className="icon-zap text-2xl text-[var(--accent-color)]"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[var(--text-primary)]">Automation</h3>
                  <p className="text-[var(--text-secondary)]">CI/CD pipelines and deployment automation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('About component error:', error);
    return null;
  }
}