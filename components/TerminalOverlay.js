function TerminalOverlay({ isOpen, onClose }) {
  const [input, setInput] = React.useState('');
  const [history, setHistory] = React.useState([]);
  const [isTyping, setIsTyping] = React.useState(false);
  const scrollRef = React.useRef(null);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (history.length === 0) {
        setHistory([{
          type: 'startup',
          content: (
            <div className="bg-surface-container-lowest p-6 border-l-2 border-primary-fixed my-4">
              <p className="text-on-surface-variant leading-relaxed">Initializing monolithic kernel... <span className="text-primary-fixed">OK</span></p>
              <p className="text-on-surface-variant leading-relaxed">Mounting digital infrastructure assets... <span className="text-primary-fixed">OK</span></p>
              <p className="text-on-surface-variant leading-relaxed">Loading security protocols: AES-256-GCM... <span className="text-primary-fixed">OK</span></p>
              <p className="text-white mt-4 mt-2">Welcome to Architectural Core_v4.0. Type <span className="text-primary-fixed">help</span> for a list of commands.</p>
            </div>
          )
        }]);
      }
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    let output = null;

    switch (trimmed) {
      case 'help':
        output = (
          <div className="text-on-surface-variant my-2 ml-4 space-y-1">
            <p><span className="text-primary-fixed w-24 md:w-32 inline-block">whoami</span> : Identity matrix query</p>
            <p><span className="text-primary-fixed w-24 md:w-32 inline-block">projects</span> : List active deployments</p>
            <p><span className="text-primary-fixed w-24 md:w-32 inline-block">date</span> : System time synchronization</p>
            <p><span className="text-primary-fixed w-24 md:w-32 inline-block">uptime</span> : System load averages</p>
            <p><span className="text-primary-fixed w-24 md:w-32 inline-block">ping</span> : Local network diagnosis</p>
            <p><span className="text-primary-fixed w-24 md:w-32 inline-block">ls -la</span> : Display directory structure</p>
            <p><span className="text-primary-fixed w-24 md:w-32 inline-block">cat</span> : Read file streams</p>
            <p><span className="text-primary-fixed w-24 md:w-32 inline-block">top</span> : Monitor process threads</p>
            <p><span className="text-primary-fixed w-24 md:w-32 inline-block">neofetch</span> : Render OS telemetry</p>
            <p><span className="text-primary-fixed w-24 md:w-32 inline-block">clear</span> : Flush terminal log</p>
            <p><span className="text-primary-fixed w-24 md:w-32 inline-block">sudo rm -rf /</span> : System override attempt</p>
          </div>
        );
        break;
      case 'date':
        output = <p className="text-white my-2 ml-4">{new Date().toString()}</p>;
        break;
      case 'uptime':
        output = <p className="text-white my-2 ml-4">up 432 days, 12:08, 1 user, load average: 0.15, 0.08, 0.01</p>;
        break;
      case 'cat':
      case 'cat config.js':
      case 'cat .secrets.env':
        output = (
           <div className="text-on-surface-variant my-2 ml-4 font-mono text-sm leading-relaxed whitespace-pre text-yellow-500/80">
{`const ENV = {
  WEB3FORMS_ACCESS_KEY: "[REDACTED_SECURE_TOKEN]",
  API_ENDPOINT: "https://api.monolith.dev/v1",
  MAX_RETRIES: 3,
  DEBUG_MODE: false
};
export default ENV;`}
           </div>
        );
        break;
      case 'top':
      case 'htop':
         output = (
           <div className="text-on-surface-variant my-2 ml-4 font-mono text-sm leading-relaxed whitespace-pre text-lime-400">
{`top - 12:34:56 up 432 days, 12:08,  1 user,  load average: 0.15, 0.08, 0.01
Tasks: 135 total,   1 running, 134 sleeping,   0 stopped,   0 zombie
%Cpu(s):  2.3 us,  1.1 sy,  0.0 ni, 96.5 id,  0.0 wa,  0.0 hi,  0.1 si,  0.0 st
MiB Mem :  64000.0 total,  14039.0 free,  32450.5 used,  17510.5 buff/cache

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
 1042 root      20   0 4810232 234056  89004 S   2.8   0.4 432:08.56 monolith-core
 2031 sks       20   0 3105056 450124 120400 S   1.4   0.7 201:12.33 node
    1 root      20   0  168560  12848   8552 S   0.0   0.0   5:42.10 systemd`}
           </div>
         );
         break;
      case 'ping':
      case 'ping 1.1.1.1':
      case 'ping 8.8.8.8':
        output = (
          <div className="text-on-surface-variant my-2 ml-4 font-mono text-sm leading-relaxed">
            <p>PING {trimmed.split(' ')[1] || '8.8.8.8'} ({trimmed.split(' ')[1] || '8.8.8.8'}) 56(84) bytes of data.</p>
            <p>64 bytes from {trimmed.split(' ')[1] || '8.8.8.8'}: icmp_seq=1 ttl=119 time=12.4 ms</p>
            <p>64 bytes from {trimmed.split(' ')[1] || '8.8.8.8'}: icmp_seq=2 ttl=119 time=11.2 ms</p>
            <p>64 bytes from {trimmed.split(' ')[1] || '8.8.8.8'}: icmp_seq=3 ttl=119 time=10.9 ms</p>
            <p>--- {trimmed.split(' ')[1] || '8.8.8.8'} ping statistics ---</p>
            <p>3 packets transmitted, 3 received, 0% packet loss, time 2003ms</p>
          </div>
        );
        break;
      case 'ls':
      case 'ls -la':
        output = (
          <div className="text-on-surface-variant my-2 ml-4 font-mono text-sm leading-relaxed whitespace-pre">
{`total 48
drwxr-xr-x 1 root root  4096 Apr 26 12:00 .
drwxr-xr-x 1 root root  4096 Apr 26 12:00 ..
-rw-r--r-- 1 root root   220 Apr 26 12:00 .bash_logout
-rw-r--r-- 1 root root  3771 Apr 26 12:00 .bashrc
drwx------ 1 sks  sks   4096 Apr 26 12:05 .cache
drwxr-xr-x 1 sks  sks   4096 Apr 26 12:01 .config
drwxr-xr-x 2 sks  sks   4096 Apr 26 12:20 deployments
drwxr-xr-x 2 sks  sks   4096 Apr 26 12:15 docker-compose
-rw-r--r-- 1 root root   807 Apr 26 12:00 .profile
-rw------- 1 sks  sks     45 Apr 26 12:10 .secrets.env`}
          </div>
        );
        break;
      case 'neofetch':
      case 'sysinfo':
        output = (
          <div className="flex flex-col md:flex-row gap-6 my-4 ml-4 font-mono text-sm leading-relaxed">
            <div className="text-primary-fixed font-bold leading-none whitespace-pre">
{`   .----.
  /   >  \\
 |   >    |
 |  >     |
  \\_ >  _/
     \`-`}
            </div>
            <div className="text-on-surface-variant">
               <p><span className="text-primary-fixed font-bold">OS</span>: Arch Linux x86_64</p>
               <p><span className="text-primary-fixed font-bold">Host</span>: Monolith Gallery 1.0</p>
               <p><span className="text-primary-fixed font-bold">Kernel</span>: 6.8.9-arch1-1</p>
               <p><span className="text-primary-fixed font-bold">Uptime</span>: 432 days, 12 hours, 8 mins</p>
               <p><span className="text-primary-fixed font-bold">Packages</span>: 1042 (pacman)</p>
               <p><span className="text-primary-fixed font-bold">Shell</span>: zsh 5.9</p>
               <p><span className="text-primary-fixed font-bold">Theme</span>: Brutalist-Dark [GTK2/3]</p>
               <p><span className="text-primary-fixed font-bold">Terminal</span>: SKS Architect Overlay</p>
               <p><span className="text-primary-fixed font-bold">CPU</span>: Intel Core i9-14900K (32) @ 5.800GHz</p>
               <p><span className="text-primary-fixed font-bold">Memory</span>: 14039MiB / 64000MiB</p>
            </div>
          </div>
        );
        break;
      case 'whoami':
        output = (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 my-2">
            <div className="p-6 bg-surface-container-low border border-white/5">
              <span className="text-primary-fixed text-[10px] tracking-[0.3em] uppercase block mb-2">Role</span>
              <p className="text-white text-lg font-thin tracking-tight">Lead DevOps Architect</p>
            </div>
            <div className="p-6 bg-surface-container-low border border-white/5">
              <span className="text-primary-fixed text-[10px] tracking-[0.3em] uppercase block mb-2">Tech Stack</span>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-surface-container-highest text-on-surface px-2 py-1 text-[10px] uppercase">Docker</span>
                <span className="bg-surface-container-highest text-on-surface px-2 py-1 text-[10px] uppercase">K8s</span>
                <span className="bg-surface-container-highest text-on-surface px-2 py-1 text-[10px] uppercase">Terraform</span>
              </div>
            </div>
          </div>
        );
        break;
      case 'projects':
        output = (
           <div className="space-y-2 py-2 my-2 w-full md:w-1/2">
             <div className="flex justify-between items-center py-2 border-b border-white/5">
               <span className="text-on-surface-variant font-body">Aurora Pipeline</span>
               <span className="text-primary-fixed text-xs font-mono uppercase">Depl.</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-white/5">
               <span className="text-on-surface-variant font-body">Shadow Mesh Network</span>
               <span className="text-primary-fixed text-xs font-mono uppercase">Depl.</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-white/5">
               <span className="text-on-surface-variant font-body">Titan DB Sharding</span>
               <span className="text-secondary-fixed text-xs font-mono uppercase">Ong.</span>
             </div>
           </div>
        );
        break;
      case 'sudo rm -rf /':
      case 'rm -rf /':
        output = <p className="text-error my-2 ml-4">ACCESS DENIED. This incident will be reported to the Mainframe.</p>;
        break;
      case 'clear':
        setHistory([]);
        return;
      case '':
        break;
      default:
        output = <p className="text-error my-2 ml-4">Command not found: {trimmed}. Type <span className="text-primary-fixed font-bold text-white">help</span> for assistance.</p>;
    }

    if (output) {
      setHistory(prev => [...prev, { type: 'command', cmd: trimmed }, { type: 'output', content: output }]);
    } else if (trimmed !== '') {
      setHistory(prev => [...prev, { type: 'command', cmd: trimmed }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const val = input;
      setInput('');
      processCommand(val);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-[#0a0a0a] flex flex-col font-body selection:bg-primary-fixed selection:text-on-primary-fixed transition-opacity duration-500">
      <style>{`
        .terminal-glow {
            text-shadow: 0 0 10px rgba(188, 255, 0, 0.4);
        }
        .blinking-cursor {
            display: inline-block;
            width: 8px;
            height: 16px;
            background-color: #b6f700;
            animation: blink 1s step-start infinite;
            vertical-align: middle;
            margin-left: 2px;
        }
        @keyframes blink {
            50% { opacity: 0; }
        }
      `}</style>

      {/* Header */}
      <nav className="flex justify-between items-center px-6 md:px-8 h-20 bg-black/80 backdrop-blur-xl border-b border-white/5 shrink-0">
        <div className="flex items-center gap-4">
          <div className="icon-terminal text-lime-400 text-xl" />
          <h1 className="font-headline uppercase tracking-[0.2em] text-sm text-lime-400">TERMINAL ACCESS</h1>
        </div>
        <button onClick={onClose} className="text-white hover:text-lime-400 transition-colors duration-300 p-2">
          <div className="icon-x text-2xl" />
        </button>
      </nav>

      {/* Main Terminal Content */}
      <main className="flex-grow flex flex-col overflow-hidden px-6 md:px-24">
        {/* Connection Metadata */}
        <div className="py-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
          <div>
            <span className="text-primary-fixed font-bold text-xs tracking-tighter uppercase mb-2 block animate-pulse">System Connection Established</span>
            <h2 className="font-display text-4xl md:text-5xl font-thin tracking-tight leading-none text-white">Architectural<br/>Core_v4.0</h2>
          </div>
          <div className="text-left md:text-right font-body text-xs text-on-surface-variant uppercase tracking-widest hidden md:block">
            <p>Location: 52.5200° N, 13.4050° E</p>
            <p>Status: <span className="text-primary-fixed">Encrypted</span></p>
            <p>Uptime: 432:12:08:44</p>
          </div>
        </div>

        {/* History Log */}
        <div ref={scrollRef} className="flex-grow overflow-y-auto py-6 space-y-4 font-body text-sm md:text-base pr-4">
          {history.map((log, i) => (
             <div key={i} className="group">
               {log.type === 'command' && (
                  <p className="text-zinc-500 mb-1">SKS:~$ {log.cmd}</p>
               )}
               {log.type !== 'command' && log.content}
             </div>
          ))}
        </div>

        {/* Terminal Input */}
        <div className="py-6 border-t border-white/5 flex items-center bg-[#0a0a0a] shrink-0">
          <span className="text-primary-fixed font-bold mr-3">SKS:~$</span>
          <div className="flex-grow flex items-center relative">
            <input 
               ref={inputRef}
               type="text" 
               className="w-full bg-transparent border-none outline-none text-white font-body selection:bg-white/20 p-0 m-0 focus:ring-0 shadow-none z-10" 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={handleKeyDown}
               spellCheck="false"
               autoComplete="off"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
