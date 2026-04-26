function Contact() {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const [status, setStatus] = React.useState(''); // '', 'sending', 'success', 'error'
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef(null);

  // Web3Forms API Key Setup
  // Visit https://web3forms.com to get your free access key for shaskantsharma2@gmail.com
  const WEB3FORMS_ACCESS_KEY = typeof window !== 'undefined' && window.ENV && window.ENV.WEB3FORMS_ACCESS_KEY
    ? window.ENV.WEB3FORMS_ACCESS_KEY
    : (typeof process !== 'undefined' && process.env.WEB3FORMS_ACCESS_KEY ? process.env.WEB3FORMS_ACCESS_KEY : "");

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!WEB3FORMS_ACCESS_KEY) {
      alert("Error: Web3Forms access key is missing from environment variables (.env).");
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
        console.error(result);
      }
    } catch (error) {
      setStatus('error');
      console.error("Form submission error:", error);
    }
  };

  const socials = [
    { name: 'GitHub', icon: 'github', url: 'https://github.com/shashi232', bg: '#1c1b26', label: 'shashi232' },
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/in/shashi-kant-sharma-a338a5318', bg: '#0b4770', label: 'Shashi Kant Sharma' },
    { name: 'Email', icon: 'mail', url: 'mailto:shaskantsharma2@gmail.com', bg: '#60222a', label: 'shaskantsharma2@gmail.com' },
  ];

  try {
    return (
      <section id="contact" ref={ref} data-name="contact" className="px-6 md:px-12 py-32 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-24">
          <div className={`reveal ${visible ? 'visible' : ''}`}>
             <h2 className="font-headline text-[clamp(2.5rem,8vw,6rem)] leading-none font-extralight uppercase tracking-tighter mb-8 text-white">
                 LET'S WORK<br/>TOGETHER
             </h2>
             <p className="font-body text-white/60 max-w-sm tracking-wide mb-12">
                 Inquiry for infrastructure consulting or architectural collaborations. Building the backbone of the next generation.
             </p>
             
             {/* Simple Social Links using minimal aesthetic */}
             <div className="flex flex-col gap-6">
                {socials.map((s, i) => (
                   <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="font-body text-xs tracking-[0.3em] uppercase text-white/40 hover:text-primary-fixed hover:-translate-y-1 transition-all duration-300 flex items-center gap-4">
                     <span className={`icon-${s.icon}`} style={{ fontSize: '1rem' }} /> {s.name}
                   </a>
                ))}
             </div>
          </div>
          
          <div className={`reveal ${visible ? 'visible' : ''} reveal-delay-1`}>
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                 <span className="text-primary-fixed text-6xl mb-6">✓</span>
                 <h3 className="font-headline text-3xl text-white font-light mb-4 tracking-[-0.02em]">TRANSMISSION SUCCESS</h3>
                 <p className="font-body text-white/40 tracking-widest text-xs uppercase">Your message has been added to the queue.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12">
                 <div className="group relative">
                    <label className="font-body text-[10px] tracking-[0.3em] uppercase text-[#c2caad] block mb-2">FULL NAME</label>
                    <input 
                      type="text" required placeholder="A. ARCHITECT"
                      value={form.name}
                      onChange={e => setForm(d => ({ ...d, name: e.target.value }))}
                      className="w-full bg-transparent border-none border-b border-[#424933] focus:border-primary-fixed focus:ring-0 transition-all py-4 text-white font-headline text-xl placeholder-white/20"
                    />
                    <div className="absolute bottom-0 left-0 h-[1px] w-full bg-white/10 group-focus-within:bg-primary-fixed transition-colors"></div>
                 </div>
                 
                 <div className="group relative">
                    <label className="font-body text-[10px] tracking-[0.3em] uppercase text-[#c2caad] block mb-2">EMAIL ADDRESS</label>
                    <input 
                      type="email" required placeholder="CONTACT@STUDIO.IO"
                      value={form.email}
                      onChange={e => setForm(d => ({ ...d, email: e.target.value }))}
                      className="w-full bg-transparent border-none border-b border-[#424933] focus:border-primary-fixed focus:ring-0 transition-all py-4 text-white font-headline text-xl placeholder-white/20"
                    />
                    <div className="absolute bottom-0 left-0 h-[1px] w-full bg-white/10 group-focus-within:bg-primary-fixed transition-colors"></div>
                 </div>
                 
                 <div className="group relative">
                    <label className="font-body text-[10px] tracking-[0.3em] uppercase text-[#c2caad] block mb-2">PROJECT VISION</label>
                    <textarea 
                      required placeholder="DESCRIBE THE SYSTEM..."
                      value={form.message} rows="4"
                      onChange={e => setForm(d => ({ ...d, message: e.target.value }))}
                      className="w-full bg-transparent border-none border-b border-[#424933] focus:border-primary-fixed focus:ring-0 transition-all py-4 text-white font-headline text-xl resize-none placeholder-white/20"
                    />
                    <div className="absolute bottom-0 left-0 h-[1px] w-full bg-white/10 group-focus-within:bg-primary-fixed transition-colors"></div>
                 </div>
                 
                 {status === 'error' && (
                    <div className="text-red-500 font-body text-xs tracking-widest uppercase">CONNECTION FAILED. TRY AGAIN.</div>
                 )}
                 
                 <button type="submit" disabled={status === 'sending'} className="bg-primary-fixed text-[#141f00] font-body font-bold text-xs tracking-[0.4em] uppercase py-6 px-12 hover:bg-white hover:text-black transition-all duration-500 w-full md:w-auto disabled:opacity-50">
                     {status === 'sending' ? 'TRANSMITTING...' : 'TRANSMIT_REQUEST'}
                 </button>
              </form>
            )}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Contact component error:', error);
    return null;
  }
}