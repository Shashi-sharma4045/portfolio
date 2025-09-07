function Hero() {
  const [text, setText] = React.useState('');
  const fullText = 'Aspiring DevOps Engineer';
  
  React.useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  try {
    return (
      <section className="min-h-screen flex items-center justify-center animated-gradient relative overflow-hidden" data-name="hero" data-file="components/Hero.js">
        <AnimatedBackground />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent">
              Shashi Kant Sharma
            </h1>
            
            <p className="text-2xl md:text-3xl text-[var(--text-secondary)] mb-2">
              B.Tech CSE Student
            </p>
            
            <p className="text-xl md:text-2xl text-[var(--primary-color)] mb-8">
              <span className="typewriter">{text}</span>
            </p>
            
            <p className="text-lg text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto">
              Amity University Jaipur | Passionate about Cloud Infrastructure & Automation
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="#contact" className="glow-button">
              <div className="icon-download text-lg mr-2 inline-block"></div>
              Download Resume
            </a>
            <a href="#contact" className="glow-button">
              <div className="icon-mail text-lg mr-2 inline-block"></div>
              Get In Touch
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="icon-chevron-down text-[var(--primary-color)] text-2xl"></div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Hero component error:', error);
    return null;
  }
}