function Contact() {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const [status, setStatus] = React.useState(''); // '', 'sending', 'success', 'error'
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef(null);

  // Web3Forms API Key Setup
  // Visit https://web3forms.com to get your free access key for shaskantsharma2@gmail.com
  const WEB3FORMS_ACCESS_KEY = "5d541895-af46-4744-b2de-0ed54c1a1630"; 

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
        alert("Developer mode: Please replace 'YOUR_ACCESS_KEY_HERE' in Contact.js with your free Web3Forms access key.");
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
      <section id="contact" ref={ref} data-name="contact" style={{ padding: '110px 0', background: 'var(--bg-secondary)', position: 'relative' }}>
        <div className="section-divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div className={`reveal ${visible ? 'visible' : ''}`}>
            <div style={{ textAlign: 'center', marginBottom: '14px' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '3px', color: '#0ea5e9', textTransform: 'uppercase', opacity: 0.6 }}>// 05. contact</span>
            </div>
            <h2 style={{ textAlign: 'center', marginBottom: '12px', fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 800, color: '#e8e6f0', letterSpacing: '-1px' }}>
              Let's Work Together
            </h2>
            <p style={{ textAlign: 'center', color: '#6b6880', marginBottom: '60px', fontSize: '0.95rem', maxWidth: '460px', margin: '0 auto 60px' }}>
              Open to DevOps internships, collaborations, and exciting infrastructure projects
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '44px', alignItems: 'start' }}>
            {/* Form */}
            <div className={`contact-form-box reveal ${visible ? 'visible' : ''} reveal-delay-1`}>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#e8e6f0', marginBottom: '26px' }}>Send a Message</h3>

              {status === 'success' ? (
                <div className="contact-success">
                  <div style={{ fontSize: '2.5rem', marginBottom: '14px' }}>✨</div>
                  <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>Message Sent Successfully!</p>
                  <p style={{ fontSize: '0.82rem', color: '#6b6880', marginTop: '6px' }}>I'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {[
                    { label: 'Your Name', type: 'text', field: 'name', ph: 'John Doe' },
                    { label: 'Email', type: 'email', field: 'email', ph: 'john@example.com' },
                  ].map(inp => (
                    <div key={inp.field}>
                      <label className="contact-label">{inp.label}</label>
                      <input
                        type={inp.type} required placeholder={inp.ph}
                        value={form[inp.field]}
                        onChange={e => setForm(d => ({ ...d, [inp.field]: e.target.value }))}
                        className="contact-input"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="contact-label">Message</label>
                    <textarea
                      required placeholder="Tell me about your project..."
                      value={form.message} rows={4}
                      onChange={e => setForm(d => ({ ...d, message: e.target.value }))}
                      className="contact-input contact-textarea"
                    />
                  </div>
                  {status === 'error' && (
                     <div style={{ color: '#ff4d4f', fontSize: '0.8rem', marginTop: '-5px' }}>An error occurred. Please try again.</div>
                  )}
                  <button type="submit" className="contact-submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending...' : '✉ Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className={`reveal ${visible ? 'visible' : ''} reveal-delay-2`}>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#e8e6f0', marginBottom: '26px' }}>Connect With Me</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
                {socials.map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="contact-social">
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '10px',
                      background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <div className={`icon-${s.icon}`} style={{ color: '#e8e6f0', fontSize: '1.1rem' }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#c4c0d8' }}>{s.name}</div>
                      <div style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#8a86a0' }}>{s.label}</div>
                    </div>
                    <div className="icon-arrow-right" style={{ marginLeft: 'auto', color: '#4e4a62', fontSize: '0.9rem' }} />
                  </a>
                ))}
              </div>

              {/* Resume card */}
              <div className="contact-resume">
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #0ea5e9, #f5c542)' }} />
                <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>📄</div>
                <h4 style={{ fontWeight: 700, color: '#e8e6f0', marginBottom: '6px', fontSize: '0.95rem' }}>
                  Download My Resume
                </h4>
                <p style={{ color: '#8a86a0', fontSize: '0.8rem', marginBottom: '18px', lineHeight: 1.6 }}>
                  Skills, education, and projects — all in one page
                </p>
                <a href="mailto:shaskantsharma2@gmail.com?subject=Resume%20Request" className="contact-resume-btn">
                  <div className="icon-download" style={{ fontSize: '0.9rem' }} /> Request Resume
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="section-divider" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />

        <style>{`
          .contact-form-box {
            background: rgba(14, 165, 233,0.03); border: 1px solid rgba(14, 165, 233,0.06);
            border-radius: 20px; padding: 34px;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
          }
          .contact-form-box:hover {
            border-color: rgba(14, 165, 233,0.15);
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          }
          .contact-success {
            text-align: center; padding: 36px 20px; color: #f5c542;
            animation: fade-in-up 0.5s ease-out;
          }
          .contact-label {
            display: block; font-size: 0.72rem; font-weight: 600;
            margin-bottom: 7px; letter-spacing: 0.5px; text-transform: uppercase;
            color: #8a86a0;
          }
          .contact-input {
            width: 100%; padding: 11px 14px; border-radius: 10px;
            background: rgba(14, 165, 233,0.04); border: 1px solid rgba(14, 165, 233,0.1);
            color: #e8e6f0; font-size: 0.9rem; outline: none;
            box-sizing: border-box; transition: border-color 0.2s ease, box-shadow 0.2s ease;
          }
          .contact-input:focus {
            border-color: rgba(14, 165, 233,0.4);
            box-shadow: 0 0 15px rgba(14, 165, 233,0.15);
            background: rgba(14, 165, 233,0.06);
          }
          .contact-input::placeholder { color: #4e4a62; }
          .contact-textarea { resize: vertical; }
          .contact-submit {
            padding: 13px; border-radius: 10px; border: none;
            background: linear-gradient(135deg, #0ea5e9, #f5c542);
            color: #0a0a12; font-weight: 700; font-size: 0.9rem; cursor: pointer;
            box-shadow: 0 4px 20px rgba(14, 165, 233,0.25);
            transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s;
          }
          .contact-submit:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(14, 165, 233,0.4);
          }
          .contact-submit:disabled {
            opacity: 0.7; cursor: not-allowed;
          }

          .contact-social {
            display: flex; align-items: center; gap: 14px;
            padding: 14px 16px; border-radius: 12px;
            background: rgba(14, 165, 233,0.03); border: 1px solid rgba(14, 165, 233,0.06);
            text-decoration: none; transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
          }
          .contact-social:hover {
            transform: translateX(4px);
            background: rgba(14, 165, 233,0.06);
            border-color: rgba(14, 165, 233,0.15);
          }

          .contact-resume {
            padding: 24px; border-radius: 16px; text-align: center; position: relative; overflow: hidden;
            background: linear-gradient(135deg, rgba(14, 165, 233,0.06), rgba(245,197,66,0.03));
            border: 1px solid rgba(14, 165, 233,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .contact-resume:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          }
          .contact-resume-btn {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 10px 22px; border-radius: 10px;
            background: linear-gradient(135deg, #0ea5e9, #f5c542); color: #0a0a12;
            font-weight: 700; font-size: 0.82rem; text-decoration: none;
            box-shadow: 0 4px 18px rgba(14, 165, 233,0.25);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .contact-resume-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 30px rgba(14, 165, 233,0.4);
          }
        `}</style>
      </section>
    );
  } catch (error) {
    console.error('Contact component error:', error);
    return null;
  }
}