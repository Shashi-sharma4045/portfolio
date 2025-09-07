function Experience() {
  const [visibleItems, setVisibleItems] = React.useState(new Set());
  
  const timelineData = [
    {
      year: '2023 - Present',
      title: 'B.Tech Computer Science Engineering',
      organization: 'Amity University Jaipur',
      description: 'Pursuing Bachelor of Technology with focus on software engineering, data structures, and system design.',
      type: 'education'
    },
    {
      year: '2024',
      title: 'AWS Cloud Practitioner',
      organization: 'Amazon Web Services',
      description: 'Foundational understanding of AWS cloud services and architecture principles.',
      type: 'certification'
    },
    {
      year: '2024',
      title: 'Docker & Containerization',
      organization: 'Self-Learning',
      description: 'Hands-on experience with containerization technologies and orchestration tools.',
      type: 'learning'
    },
    {
      year: '2023',
      title: 'Linux System Administration',
      organization: 'Online Courses',
      description: 'Comprehensive understanding of Linux systems, shell scripting, and server management.',
      type: 'learning'
    }
  ];

  React.useEffect(() => {
    const observers = timelineData.map((_, index) => {
      return new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, index]));
          }
        },
        { threshold: 0.3 }
      );
    });

    const elements = document.querySelectorAll('.timeline-item');
    elements.forEach((element, index) => {
      if (observers[index]) {
        observers[index].observe(element);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'education': return 'graduation-cap';
      case 'certification': return 'award';
      case 'learning': return 'book-open';
      default: return 'circle';
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'education': return 'var(--primary-color)';
      case 'certification': return 'var(--secondary-color)';
      case 'learning': return 'var(--accent-color)';
      default: return 'var(--primary-color)';
    }
  };

  try {
    return (
      <section className="py-20 bg-[var(--bg-primary)]" data-name="experience" data-file="components/Experience.js">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[var(--primary-color)]">
            Experience & Learning
          </h2>
          
          <div className="max-w-4xl mx-auto">
            {timelineData.map((item, index) => (
              <div 
                key={index}
                className={`timeline-item transition-all duration-1000 ${
                  visibleItems.has(index) 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <div 
                  className="timeline-dot"
                  style={{ backgroundColor: getColor(item.type) }}
                >
                  <div 
                    className={`icon-${getIcon(item.type)} text-xs text-black absolute inset-0 flex items-center justify-center`}
                  ></div>
                </div>
                
                <div className="bg-[var(--bg-secondary)] rounded-lg p-6 border border-gray-700 hover:border-opacity-50 transition-all duration-300"
                     style={{ borderColor: getColor(item.type) + '40' }}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 md:mb-0">
                      {item.title}
                    </h3>
                    <span 
                      className="text-sm px-3 py-1 rounded-full"
                      style={{ 
                        backgroundColor: getColor(item.type) + '20',
                        color: getColor(item.type)
                      }}
                    >
                      {item.year}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-3" style={{ color: getColor(item.type) }}>
                    {item.organization}
                  </h4>
                  
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-[var(--bg-secondary)] rounded-full border border-gray-700">
              <div className="w-3 h-3 bg-[var(--primary-color)] rounded-full animate-pulse"></div>
              <span className="text-[var(--text-secondary)]">Building My DevOps Journey</span>
              <div className="w-3 h-3 bg-[var(--secondary-color)] rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Experience component error:', error);
    return null;
  }
}
