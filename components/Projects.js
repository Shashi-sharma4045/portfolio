function Projects() {
  const [flippedCards, setFlippedCards] = React.useState(new Set());
  
  const projects = [
    {
      title: 'CI/CD Pipeline',
      description: 'Automated deployment pipeline with Jenkins and Docker',
      status: 'In Development'
    },
    {
      title: 'Kubernetes Cluster',
      description: 'Scalable microservices deployment on K8s',
      status: 'In Development'
    },
    {
      title: 'Infrastructure as Code',
      description: 'Terraform modules for AWS infrastructure',
      status: 'In Development'
    },
    {
      title: 'Monitoring Stack',
      description: 'Prometheus & Grafana monitoring solution',
      status: 'In Development'
    }
  ];

  const handleCardFlip = (index) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  try {
    return (
      <section className="py-20 bg-[var(--bg-secondary)]" data-name="projects" data-file="components/Projects.js">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[var(--primary-color)]">
            Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="project-card cursor-pointer relative h-64"
                onClick={() => handleCardFlip(index)}
                onMouseEnter={() => handleCardFlip(index)}
                onMouseLeave={() => handleCardFlip(index)}
              >
                <div 
                  className={`absolute inset-0 transition-transform duration-700 preserve-3d ${
                    flippedCards.has(index) ? 'rotate-y-180' : ''
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front of card */}
                  <div 
                    className="absolute inset-0 backface-hidden flex flex-col items-center justify-center text-center"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="w-16 h-16 mb-6 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full flex items-center justify-center">
                      <div className="icon-rocket text-2xl text-black"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                      Coming Soon
                    </h3>
                    <p className="text-[var(--text-secondary)] text-lg">
                      🚀 Exciting projects in development
                    </p>
                  </div>
                  
                  {/* Back of card */}
                  <div 
                    className="absolute inset-0 backface-hidden flex flex-col items-center justify-center text-center rotate-y-180 bg-gradient-to-br from-[var(--bg-primary)] to-gray-900"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <div className="w-16 h-16 mb-6 bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)] rounded-full flex items-center justify-center">
                      <div className="icon-code text-2xl text-black"></div>
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                      {project.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] mb-4 px-4">
                      {project.description}
                    </p>
                    <span className="px-4 py-2 bg-[var(--secondary-color)] bg-opacity-20 text-[var(--secondary-color)] rounded-full text-sm">
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <p className="text-lg text-[var(--text-secondary)] mb-6">
              Stay tuned for exciting DevOps projects and implementations!
            </p>
            <div className="flex justify-center items-center gap-2">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="w-3 h-3 bg-[var(--primary-color)] rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Projects component error:', error);
    return null;
  }
}