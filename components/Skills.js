function Skills() {
  const skills = [
    { name: 'Linux', icon: 'terminal', color: 'var(--primary-color)' },
    { name: 'Git', icon: 'git-branch', color: 'var(--secondary-color)' },
    { name: 'Docker', icon: 'container', color: 'var(--primary-color)' },
    { name: 'Kubernetes', icon: 'box', color: 'var(--secondary-color)' },
    { name: 'Jenkins', icon: 'settings', color: 'var(--primary-color)' },
    { name: 'Terraform', icon: 'layers', color: 'var(--secondary-color)' },
    { name: 'Ansible', icon: 'cpu', color: 'var(--primary-color)' },
    { name: 'AWS', icon: 'cloud', color: 'var(--secondary-color)' },
    { name: 'GCP', icon: 'cloud-lightning', color: 'var(--primary-color)' },
    { name: 'MongoDB', icon: 'database', color: 'var(--secondary-color)' },
    { name: 'Nginx', icon: 'server', color: 'var(--primary-color)' },
    { name: 'Prometheus', icon: 'activity', color: 'var(--secondary-color)' }
  ];

  try {
    return (
      <section className="py-20 bg-[var(--bg-primary)]" data-name="skills" data-file="components/Skills.js">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[var(--primary-color)]">
            DevOps Skills
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="skill-card text-center group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4">
                  <div 
                    className={`icon-${skill.icon} text-4xl transition-colors duration-300`}
                    style={{ color: skill.color }}
                  ></div>
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {skill.name}
                </h3>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                  <div 
                    className="h-2 rounded-full transition-all duration-500 group-hover:w-full"
                    style={{ 
                      backgroundColor: skill.color,
                      width: `${70 + (index % 3) * 10}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <p className="text-lg text-[var(--text-secondary)] mb-6">
              Continuously learning and expanding my DevOps toolkit
            </p>
            <div className="flex justify-center items-center gap-4">
              <div className="w-2 h-2 bg-[var(--primary-color)] rounded-full animate-pulse"></div>
              <span className="text-[var(--primary-color)]">Always Learning</span>
              <div className="w-2 h-2 bg-[var(--primary-color)] rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Skills component error:', error);
    return null;
  }
}