import { ReactNode } from 'react';
import { portfolioData } from '@/data/portfolio';

interface CommandResult {
  output?: ReactNode;
  isError?: boolean;
  clear?: boolean;
}

type CommandHandler = (args: string[]) => CommandResult;

// Simulated filesystem
const filesystem: Record<string, string[]> = {
  '~': ['about/', 'projects/', 'skills/', 'documents/', 'resume.pdf', 'contact.txt', '.bashrc', '.ssh/'],
  '~/about': ['bio.txt', 'location.txt', 'status.txt'],
  '~/projects': ['security-scanner/', 'auth-system/', 'network-monitor/', 'cli-portfolio/'],
  '~/skills': ['languages.txt', 'frontend.txt', 'backend.txt', 'security.txt', 'devops.txt'],
  '~/documents': ['notes.md', 'ideas.txt', 'todo.txt'],
  '~/.ssh': ['id_rsa', 'id_rsa.pub', 'known_hosts', 'config'],
};

const fileContents: Record<string, string> = {
  'bio.txt': portfolioData.about.bio,
  'contact.txt': `Email: ${portfolioData.contact.email}\nLocation: ${portfolioData.about.location}`,
  '.bashrc': '# ~/.bashrc\nexport PS1="\\u@portfolio:\\w$ "\nalias ll="ls -la"\nalias cls="clear"',
  'notes.md': '# Project Notes\n\n- Finish CLI portfolio\n- Update resume\n- Practice CTF challenges',
  'todo.txt': '[ ] Update LinkedIn\n[ ] Push code to GitHub\n[x] Build portfolio site',
  'id_rsa.pub': 'ssh-rsa AAAA[SIMULATED_KEY_DATA]... mbilal@portfolio',
};

const commands: Record<string, CommandHandler> = {
  help: () => ({
    output: (
      <div>
        <div className="text-terminal-cyan text-lg mb-3 text-glow">Available Commands</div>
        <div className="grid gap-2">
          {[
            { cmd: 'about', desc: 'Learn more about me' },
            { cmd: 'skills', desc: 'View my technical skills' },
            { cmd: 'projects', desc: 'Browse my projects' },
            { cmd: 'resume', desc: 'View my resume/experience' },
            { cmd: 'contact', desc: 'Get my contact information' },
            { cmd: 'social', desc: 'Find me on social media' },
            { cmd: 'clear', desc: 'Clear the terminal' },
          ].map((item) => (
            <div key={item.cmd} className="flex">
              <span className="text-terminal-cyan w-24 font-semibold">{item.cmd}</span>
              <span className="text-terminal-green-dim">- {item.desc}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-terminal-green-dim text-sm">
          <span className="text-amber-400">Tip:</span> Scroll down to see all available commands including Linux commands!
        </div>
      </div>
    ),
  }),

  // Portfolio commands
  about: () => ({
    output: (
      <div>
        <div className="text-terminal-cyan text-lg mb-3 text-glow">About Me</div>
        <div className="space-y-3">
          <p className="text-terminal-green">{portfolioData.about.greeting}</p>
          <p className="text-terminal-green-dim whitespace-pre-line">{portfolioData.about.bio}</p>
          <div className="mt-4 pt-4 border-t border-terminal-border">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-terminal-cyan">Location:</span>{' '}
                <span className="text-terminal-green-dim">{portfolioData.about.location}</span>
              </div>
              <div>
                <span className="text-terminal-cyan">Status:</span>{' '}
                <span className="text-green-400">{portfolioData.about.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  }),

  skills: () => ({
    output: (
      <div>
        <div className="text-terminal-cyan text-lg mb-4 text-glow">Technical Skills</div>
        <div className="space-y-4">
          {portfolioData.skills.map((category) => (
            <div key={category.category}>
              <div className="text-amber-400 mb-2 font-semibold">{category.category}</div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-terminal-gray border border-terminal-green/30 rounded text-sm text-terminal-green hover:border-terminal-green/60 hover:text-glow transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  }),

  projects: () => ({
    output: (
      <div>
        <div className="text-terminal-cyan text-lg mb-4 text-glow">Projects</div>
        <div className="space-y-4">
          {portfolioData.projects.map((project, index) => (
            <div
              key={project.name}
              className="p-4 border border-terminal-green/20 rounded-lg hover:border-terminal-green/40 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-terminal-cyan font-bold">[{index + 1}]</span>{' '}
                  <span className="text-terminal-green font-semibold">{project.name}</span>
                </div>
                {project.featured && (
                  <span className="px-2 py-0.5 text-xs bg-amber-500/20 text-amber-400 rounded">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-terminal-green-dim text-sm mt-2">{project.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-0.5 bg-terminal-dark border border-terminal-border rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-3 text-sm">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="terminal-link">
                    [GitHub]
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="terminal-link">
                    [Live Demo]
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  }),

  resume: () => ({
    output: (
      <div>
        <div className="text-terminal-cyan text-lg mb-4 text-glow">Resume / Experience</div>
        <div className="mb-6">
          <div className="text-amber-400 mb-3 font-semibold">Work Experience</div>
          <div className="space-y-4">
            {portfolioData.experience.map((exp) => (
              <div key={exp.company} className="border-l-2 border-terminal-green/30 pl-4">
                <div className="text-terminal-green font-semibold">{exp.title}</div>
                <div className="text-terminal-cyan text-sm">{exp.company}</div>
                <div className="text-terminal-green-dim text-xs mb-2">{exp.period}</div>
                <ul className="list-disc list-inside text-sm text-terminal-green-dim space-y-1">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-amber-400 mb-3 font-semibold">Education</div>
          <div className="space-y-3">
            {portfolioData.education.map((edu) => (
              <div key={edu.school} className="border-l-2 border-terminal-cyan/30 pl-4">
                <div className="text-terminal-green font-semibold">{edu.degree}</div>
                <div className="text-terminal-cyan text-sm">{edu.school}</div>
                <div className="text-terminal-green-dim text-xs">{edu.period}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-terminal-border">
          <a href={portfolioData.resumeUrl} target="_blank" rel="noopener noreferrer" className="terminal-link text-terminal-cyan">
            [Download Full Resume PDF]
          </a>
        </div>
      </div>
    ),
  }),

  contact: () => ({
    output: (
      <div>
        <div className="text-terminal-cyan text-lg mb-4 text-glow">Contact Information</div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-amber-400 w-20">Email:</span>
            <a href={`mailto:${portfolioData.contact.email}`} className="terminal-link">
              {portfolioData.contact.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-amber-400 w-20">Location:</span>
            <span className="text-terminal-green-dim">{portfolioData.about.location}</span>
          </div>
        </div>
        <div className="mt-4 p-3 bg-terminal-dark border border-terminal-green/20 rounded">
          <p className="text-terminal-green-dim text-sm">
            Feel free to reach out! I&apos;m always open to discussing new opportunities,
            collaborations, or just having a chat about technology and security.
          </p>
        </div>
      </div>
    ),
  }),

  social: () => ({
    output: (
      <div>
        <div className="text-terminal-cyan text-lg mb-4 text-glow">Social Links</div>
        <div className="grid gap-3">
          {portfolioData.social.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 border border-terminal-green/20 rounded hover:border-terminal-green/50 hover:bg-terminal-gray/50 transition-all group"
            >
              <span className="text-terminal-cyan">[{link.icon}]</span>
              <span className="text-terminal-green group-hover:text-glow">{link.name}</span>
              <span className="text-terminal-green-dim text-sm ml-auto">→</span>
            </a>
          ))}
        </div>
      </div>
    ),
  }),

  // Linux filesystem commands
  ls: (args) => {
    const showAll = args.includes('-a') || args.includes('-la') || args.includes('-al');
    const showLong = args.includes('-l') || args.includes('-la') || args.includes('-al');
    const path = args.find(a => !a.startsWith('-')) || '~';
    const contents = filesystem[path] || filesystem['~'];

    if (showLong) {
      return {
        output: (
          <div className="text-terminal-green font-mono text-sm">
            <div className="text-terminal-cyan mb-2">total {contents.length}</div>
            {showAll && (
              <>
                <div>drwxr-xr-x  2 mbilal users 4096 Jan 01 00:00 <span className="text-blue-400">.</span></div>
                <div>drwxr-xr-x  3 mbilal users 4096 Jan 01 00:00 <span className="text-blue-400">..</span></div>
              </>
            )}
            {contents.map((item, i) => {
              const isDir = item.endsWith('/');
              const isHidden = item.startsWith('.');
              if (isHidden && !showAll) return null;
              return (
                <div key={i}>
                  {isDir ? 'drwxr-xr-x' : '-rw-r--r--'}  1 mbilal users {isDir ? '4096' : ' 256'} Jan 01 00:0{i} {' '}
                  <span className={isDir ? 'text-blue-400' : 'text-terminal-green'}>{item.replace('/', '')}</span>
                </div>
              );
            })}
          </div>
        ),
      };
    }

    return {
      output: (
        <div className="text-terminal-green">
          <div className="text-terminal-cyan mb-2">Contents of {path}:</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {contents.map((item, i) => {
              const isHidden = item.startsWith('.');
              if (isHidden && !showAll) return null;
              return (
                <span key={i} className={item.endsWith('/') ? 'text-blue-400' : 'text-terminal-green'}>
                  {item}
                </span>
              );
            })}
          </div>
        </div>
      ),
    };
  },

  cat: (args) => {
    const filename = args[0];
    if (!filename) {
      return { output: <div className="text-red-400">cat: missing file operand</div>, isError: true };
    }
    const content = fileContents[filename];
    if (content) {
      return { output: <pre className="text-terminal-green whitespace-pre-wrap">{content}</pre> };
    }
    if (filename === 'about' || filename === 'projects' || filename === 'skills') {
      return { output: <div className="text-terminal-green-dim">Try running the &apos;{filename}&apos; command directly!</div> };
    }
    return { output: <div className="text-red-400">cat: {filename}: No such file or directory</div>, isError: true };
  },

  pwd: () => ({
    output: <div className="text-terminal-green">/home/mbilal/portfolio</div>,
  }),

  cd: (args) => {
    const dir = args[0] || '~';
    if (filesystem[dir] || filesystem[`~/${dir}`] || dir === '~' || dir === '..') {
      return { output: <div className="text-terminal-green-dim">Changed directory to {dir}</div> };
    }
    return { output: <div className="text-red-400">cd: {dir}: No such directory</div>, isError: true };
  },

  mkdir: (args) => {
    const dir = args[0];
    if (!dir) {
      return { output: <div className="text-red-400">mkdir: missing operand</div>, isError: true };
    }
    return { output: <div className="text-terminal-green">mkdir: created directory &apos;{dir}&apos;</div> };
  },

  touch: (args) => {
    const file = args[0];
    if (!file) {
      return { output: <div className="text-red-400">touch: missing file operand</div>, isError: true };
    }
    return { output: <div className="text-terminal-green">touch: created file &apos;{file}&apos;</div> };
  },

  rm: (args) => {
    if (args.includes('-rf') && (args.includes('/') || args.includes('~') || args.includes('*'))) {
      return {
        output: (
          <div className="text-red-400">
            <div className="mb-2">[ PERMISSION DENIED ]</div>
            <div className="text-terminal-green-dim text-sm">Nice try! This is a simulated filesystem.</div>
          </div>
        ),
        isError: true,
      };
    }
    const file = args.find(a => !a.startsWith('-'));
    if (!file) {
      return { output: <div className="text-red-400">rm: missing operand</div>, isError: true };
    }
    return { output: <div className="text-terminal-green">rm: removed &apos;{file}&apos;</div> };
  },

  cp: (args) => {
    if (args.length < 2) {
      return { output: <div className="text-red-400">cp: missing destination file operand</div>, isError: true };
    }
    return { output: <div className="text-terminal-green">cp: copied &apos;{args[0]}&apos; to &apos;{args[1]}&apos;</div> };
  },

  mv: (args) => {
    if (args.length < 2) {
      return { output: <div className="text-red-400">mv: missing destination file operand</div>, isError: true };
    }
    return { output: <div className="text-terminal-green">mv: moved &apos;{args[0]}&apos; to &apos;{args[1]}&apos;</div> };
  },

  grep: (args) => {
    const pattern = args[0];
    const file = args[1];
    if (!pattern) {
      return { output: <div className="text-red-400">grep: missing pattern</div>, isError: true };
    }
    if (pattern.toLowerCase() === 'security' || pattern.toLowerCase() === 'cyber') {
      return {
        output: (
          <div className="text-terminal-green">
            <div className="text-terminal-cyan">Searching for &apos;{pattern}&apos;...</div>
            <div className="mt-2">skills.txt: <span className="text-amber-400">Cybersecurity</span>, Penetration Testing, Network <span className="text-amber-400">Security</span></div>
            <div>about.txt: ...passion for <span className="text-amber-400">Cybersecurity</span>...</div>
            <div>projects.txt: <span className="text-amber-400">Security</span> Scanner, Secure Auth System</div>
          </div>
        ),
      };
    }
    return {
      output: (
        <div className="text-terminal-green">
          <div className="text-terminal-cyan">grep: searching for &apos;{pattern}&apos;{file ? ` in ${file}` : ''}...</div>
          <div className="text-terminal-green-dim mt-1">No matches found</div>
        </div>
      ),
    };
  },

  find: (args) => {
    const name = args.includes('-name') ? args[args.indexOf('-name') + 1] : args[0];
    return {
      output: (
        <div className="text-terminal-green">
          <div className="text-terminal-cyan">find: searching for &apos;{name || '*'}&apos;...</div>
          <div className="mt-2">
            ./portfolio/about.txt<br/>
            ./portfolio/projects/<br/>
            ./portfolio/skills.txt<br/>
            ./portfolio/resume.pdf<br/>
            ./portfolio/contact.txt
          </div>
        </div>
      ),
    };
  },

  head: (args) => {
    const file = args.find(a => !a.startsWith('-'));
    const lines = args.includes('-n') ? parseInt(args[args.indexOf('-n') + 1]) || 10 : 10;
    return {
      output: (
        <div className="text-terminal-green">
          <div className="text-terminal-cyan">head: showing first {lines} lines of {file || 'stdin'}:</div>
          <pre className="mt-2 text-terminal-green-dim">
{`Muhammad Bilal
Software Engineer | Cybersecurity Enthusiast
Location: United States
Email: [see contact command]
Status: Open to opportunities
---
Skills: TypeScript, Python, React, Node.js
Focus: Security, Full Stack Development`}
          </pre>
        </div>
      ),
    };
  },

  tail: (args) => {
    const file = args.find(a => !a.startsWith('-'));
    const lines = args.includes('-n') ? parseInt(args[args.indexOf('-n') + 1]) || 10 : 10;
    return {
      output: (
        <div className="text-terminal-green">
          <div className="text-terminal-cyan">tail: showing last {lines} lines of {file || 'stdin'}:</div>
          <pre className="mt-2 text-terminal-green-dim">
{`[SIMULATED LOG DATA]
[----] System initialized
[----] Loading portfolio data...
[----] Terminal ready
[----] Waiting for input...
[----] User connected
[----] Session started`}
          </pre>
        </div>
      ),
    };
  },

  wc: (args) => {
    const file = args.find(a => !a.startsWith('-')) || 'portfolio';
    return {
      output: (
        <div className="text-terminal-green font-mono">
          <div className="grid grid-cols-4 gap-4">
            <span>42</span><span>256</span><span>2048</span><span>{file}</span>
          </div>
          <div className="text-terminal-green-dim text-xs mt-1">lines  words  bytes  file</div>
        </div>
      ),
    };
  },

  cut: () => ({
    output: (
      <div className="text-terminal-green">
        <div className="text-terminal-cyan">cut: extracting fields...</div>
        <div className="mt-2">mbilal:x:1000:1000:Muhammad Bilal:/home/mbilal:/bin/bash</div>
      </div>
    ),
  }),

  chmod: (args) => {
    const perms = args[0];
    const file = args[1];
    if (!perms || !file) {
      return { output: <div className="text-red-400">chmod: missing operand</div>, isError: true };
    }
    return { output: <div className="text-terminal-green">chmod: mode of &apos;{file}&apos; changed to {perms}</div> };
  },

  chown: () => ({
    output: <div className="text-red-400">chown: operation not permitted (simulated filesystem)</div>,
    isError: true,
  }),

  // System commands
  whoami: () => ({
    output: (
      <div className="text-terminal-green">
        <span className="text-terminal-cyan">mbilal</span>@portfolio-terminal
        <div className="text-terminal-green-dim text-sm mt-1">
          Muhammad Bilal | SWE | Cybersecurity Enthusiast
        </div>
      </div>
    ),
  }),

  uname: (args) => {
    if (args.includes('-a')) {
      return {
        output: <div className="text-terminal-green">PortfolioOS 1.0.0-simulated #1 SMP x86_64 GNU/Linux</div>,
      };
    }
    return { output: <div className="text-terminal-green">PortfolioOS</div> };
  },

  date: () => ({
    output: (
      <div className="text-terminal-green">
        {new Date().toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short',
        })}
      </div>
    ),
  }),

  uptime: () => ({
    output: (
      <div className="text-terminal-green">
        {new Date().toLocaleTimeString()} up [SIMULATED], 1 user, load average: 0.00, 0.00, 0.00
      </div>
    ),
  }),

  ps: () => ({
    output: (
      <div className="text-terminal-green font-mono text-sm">
        <div className="text-terminal-cyan">  PID TTY          TIME CMD</div>
        <div> [SIM] pts/0    00:00:00 bash</div>
        <div> [SIM] pts/0    00:00:00 node</div>
        <div> [SIM] pts/0    00:00:00 portfolio</div>
        <div> [SIM] pts/0    00:00:00 ps</div>
      </div>
    ),
  }),

  top: () => ({
    output: (
      <div className="text-terminal-green font-mono text-xs">
        <div className="text-terminal-cyan">top - {new Date().toLocaleTimeString()} [SIMULATED OUTPUT]</div>
        <div className="text-terminal-cyan">Tasks: [SIM] total, 1 running</div>
        <div className="text-terminal-cyan">%Cpu(s): [SIMULATED]</div>
        <div className="text-terminal-cyan mb-2">MiB Mem: [SIMULATED]</div>
        <div className="grid grid-cols-6 gap-2 text-amber-400">
          <span>PID</span><span>USER</span><span>%CPU</span><span>%MEM</span><span>TIME+</span><span>COMMAND</span>
        </div>
        <div className="grid grid-cols-6 gap-2">
          <span>[S]</span><span>mbilal</span><span>0.0</span><span>0.0</span><span>0:00.00</span><span>portfolio</span>
        </div>
      </div>
    ),
  }),

  kill: (args) => {
    const pid = args.find(a => !a.startsWith('-'));
    if (!pid) {
      return { output: <div className="text-red-400">kill: missing pid</div>, isError: true };
    }
    return { output: <div className="text-terminal-green">kill: [SIMULATED] sent signal to process {pid}</div> };
  },

  df: () => ({
    output: (
      <div className="text-terminal-green font-mono text-sm">
        <div className="text-terminal-cyan mb-1">[SIMULATED DISK USAGE]</div>
        <div className="grid grid-cols-6 gap-2 text-terminal-cyan">
          <span>Filesystem</span><span>Size</span><span>Used</span><span>Avail</span><span>Use%</span><span>Mounted</span>
        </div>
        <div className="grid grid-cols-6 gap-2">
          <span>/dev/sim0</span><span>∞</span><span>0</span><span>∞</span><span>0%</span><span>/</span>
        </div>
      </div>
    ),
  }),

  du: () => ({
    output: (
      <div className="text-terminal-green font-mono text-sm">
        <div className="text-terminal-cyan mb-1">[SIMULATED]</div>
        <div>4.0K    ./about</div>
        <div>12K     ./projects</div>
        <div>8.0K    ./skills</div>
        <div>24K     total</div>
      </div>
    ),
  }),

  free: () => ({
    output: (
      <div className="text-terminal-green font-mono text-sm">
        <div className="text-terminal-cyan mb-1">[SIMULATED MEMORY]</div>
        <div className="grid grid-cols-7 gap-2 text-terminal-cyan">
          <span></span><span>total</span><span>used</span><span>free</span><span>shared</span><span>buff</span><span>available</span>
        </div>
        <div className="grid grid-cols-7 gap-2">
          <span>Mem:</span><span>∞</span><span>0</span><span>∞</span><span>0</span><span>0</span><span>∞</span>
        </div>
      </div>
    ),
  }),

  ifconfig: () => ({
    output: (
      <div className="text-terminal-green font-mono text-sm">
        <div className="text-terminal-cyan">[SIMULATED NETWORK - NOT REAL DATA]</div>
        <div className="text-terminal-cyan mt-2">eth0: flags=4163&lt;UP,BROADCAST,RUNNING,MULTICAST&gt;</div>
        <div className="ml-4">inet [SIMULATED]  netmask [SIMULATED]</div>
        <div className="ml-4">inet6 [SIMULATED]</div>
        <div className="ml-4">ether [SIMULATED]</div>
        <div className="ml-4 text-terminal-green-dim">RX/TX: [SIMULATED]</div>
      </div>
    ),
  }),

  ping: (args) => {
    const host = args[0] || 'localhost';
    return {
      output: (
        <div className="text-terminal-green font-mono text-sm">
          <div className="text-terminal-cyan">[SIMULATED PING - NOT REAL]</div>
          <div>PING {host} ([SIMULATED]) 56 bytes of data.</div>
          <div>64 bytes from {host}: icmp_seq=1 ttl=64 time=[SIM] ms</div>
          <div>64 bytes from {host}: icmp_seq=2 ttl=64 time=[SIM] ms</div>
          <div className="mt-2 text-terminal-cyan">--- {host} ping statistics ---</div>
          <div>2 packets transmitted, 2 received, 0% packet loss</div>
        </div>
      ),
    };
  },

  curl: (args) => {
    const url = args.find(a => !a.startsWith('-')) || '';
    return {
      output: (
        <div className="text-terminal-green">
          <div className="text-terminal-cyan">[SIMULATED CURL - NOT REAL]</div>
          <div className="mt-1">Fetching {url || '(empty)'}...</div>
          <div className="text-terminal-green-dim mt-1">HTTP/1.1 200 OK [SIMULATED]</div>
        </div>
      ),
    };
  },

  wget: (args) => {
    const url = args[0];
    if (!url) {
      return { output: <div className="text-red-400">wget: missing URL</div>, isError: true };
    }
    return {
      output: (
        <div className="text-terminal-green">
          <div className="text-terminal-cyan">[SIMULATED WGET - NOT REAL]</div>
          <div>Connecting to {url}... [SIMULATED]</div>
          <div className="text-terminal-cyan">Saved to: &apos;index.html&apos; [SIMULATED]</div>
        </div>
      ),
    };
  },

  ssh: (args) => ({
    output: (
      <div className="text-amber-400">
        <div>[SIMULATED] ssh: Connection to {args[0] || 'host'} - not a real connection</div>
        <div className="text-terminal-green-dim text-sm mt-1">
          This is a simulated terminal for portfolio purposes only.
        </div>
      </div>
    ),
  }),

  history: () => ({
    output: (
      <div className="text-terminal-green font-mono text-sm">
        <div>    1  help</div>
        <div>    2  about</div>
        <div>    3  ls -la</div>
        <div>    4  skills</div>
        <div>    5  projects</div>
        <div>    6  contact</div>
        <div>    7  neofetch</div>
        <div>    8  history</div>
      </div>
    ),
  }),

  alias: (args) => {
    if (args.length === 0) {
      return {
        output: (
          <div className="text-terminal-green font-mono text-sm">
            <div>alias ll=&apos;ls -la&apos;</div>
            <div>alias cls=&apos;clear&apos;</div>
          </div>
        ),
      };
    }
    return { output: <div className="text-terminal-green">alias: {args.join(' ')}</div> };
  },

  export: (args) => {
    if (args.length === 0) {
      return { output: <div className="text-terminal-green-dim">export: usage: export VAR=value</div> };
    }
    return { output: <div className="text-terminal-green">export: {args.join(' ')}</div> };
  },

  env: () => ({
    output: (
      <div className="text-terminal-green font-mono text-sm">
        <div className="text-terminal-cyan mb-1">[SIMULATED ENVIRONMENT]</div>
        <div>USER=mbilal</div>
        <div>HOME=/home/mbilal</div>
        <div>SHELL=/bin/bash</div>
        <div>TERM=xterm-256color</div>
        <div>PORTFOLIO=true</div>
      </div>
    ),
  }),

  echo: (args) => ({
    output: <div className="text-terminal-green">{args.join(' ') || ''}</div>,
  }),

  clear: () => ({
    clear: true,
  }),

  man: (args) => {
    const cmd = args[0];
    if (!cmd) {
      return { output: <div className="text-red-400">What manual page do you want?</div>, isError: true };
    }
    const manPages: Record<string, string> = {
      ls: 'ls - list directory contents\n\nSYNOPSIS: ls [OPTION]... [FILE]...\n\nOPTIONS:\n  -a    show hidden files\n  -l    long listing format',
      grep: 'grep - search for patterns in files\n\nSYNOPSIS: grep [PATTERN] [FILE]...\n\nSearches for PATTERN in each FILE.',
      cat: 'cat - concatenate and print files\n\nSYNOPSIS: cat [FILE]...\n\nPrints file contents to stdout.',
      help: 'help - display available commands\n\nType "help" to see portfolio commands.',
    };
    return {
      output: (
        <div className="text-terminal-green">
          <div className="text-terminal-cyan text-lg mb-2">MANUAL: {cmd.toUpperCase()}(1)</div>
          <pre className="whitespace-pre-wrap text-sm">{manPages[cmd] || `No manual entry for ${cmd}`}</pre>
        </div>
      ),
    };
  },

  apt: () => ({
    output: (
      <div className="text-red-400">
        E: [SIMULATED] Could not open lock file - permission denied
        <div className="text-terminal-green-dim text-sm mt-1">This is a simulated terminal.</div>
      </div>
    ),
    isError: true,
  }),

  sudo: () => ({
    output: (
      <div className="text-red-400">
        [sudo] password for mbilal: ********
        <div className="mt-1">[SIMULATED] Sorry, user mbilal is not in the sudoers file.</div>
        <div className="text-terminal-green-dim text-sm mt-2">Nice try! This is a portfolio terminal.</div>
      </div>
    ),
    isError: true,
  }),

  // Easter eggs
  neofetch: () => ({
    output: (
      <div className="text-terminal-green font-mono">
        <pre className="text-xs leading-tight">
{`
       .--.          mbilal@portfolio
      |o_o |         -----------------
      |:_/ |         OS: PortfolioOS 1.0.0
     //   \\ \\        Host: Next.js 14
    (|     | )       Kernel: React 18.3
   /'\\_   _/\`\\       Shell: Interactive CLI
   \\___)=(___/       Theme: Hacker Green
                     Terminal: Web-based
        ████████     [SIMULATED SYSTEM]
        ████████
`}
        </pre>
      </div>
    ),
  }),

  matrix: () => ({
    output: (
      <div className="text-green-400">
        <pre className="text-sm animate-pulse">
{`
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
 Wake up, Neo...
 The Matrix has you...
 Follow the white rabbit.

 Knock, knock.
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
`}
        </pre>
      </div>
    ),
  }),

  hack: () => ({
    output: (
      <div className="text-red-400">
        <pre className="text-xs animate-pulse mb-2">
{`
[■■■■■■■■■■] ACCESSING MAINFRAME...
[■■■■■■■■■■] BYPASSING FIREWALL...
[■■■■■■■■■■] DECRYPTING PASSWORDS...
[■■■■□□□□□□] ACCESS DENIED
`}
        </pre>
        <div className="text-terminal-green-dim text-sm">
          Just kidding! This is just a portfolio. Nice try though!
        </div>
      </div>
    ),
  }),

  vim: () => ({
    output: (
      <div className="text-terminal-green">
        <div className="text-terminal-cyan mb-2">VIM - Vi IMproved</div>
        <div className="text-terminal-green-dim">
          Hint: To exit vim, type :q! and press Enter
          <br />
          (Just kidding, this is a web terminal)
        </div>
      </div>
    ),
  }),

  nano: () => ({
    output: <div className="text-terminal-green-dim">nano: command not found. Try &apos;vim&apos; instead (just kidding)</div>,
  }),

  exit: () => ({
    output: (
      <div className="text-terminal-green">
        <div className="text-amber-400">logout</div>
        <div className="text-terminal-green-dim text-sm mt-1">
          Thanks for visiting! Feel free to come back anytime.
          <br />
          (Refresh the page to &quot;log back in&quot;)
        </div>
      </div>
    ),
  }),

  reboot: () => ({
    output: (
      <div className="text-amber-400">
        [SIMULATED] System is going down for reboot NOW!
        <div className="text-terminal-green-dim text-sm mt-1">(Refresh the page to see the boot sequence again)</div>
      </div>
    ),
  }),

  sl: () => ({
    output: (
      <pre className="text-terminal-green text-xs">
{`
      ====        ________                ___________
  _D _|  |_______/        \\__I_I_____===__|_________|
   |(_)---  |   H\\________/ |   |        =|___ ___|
   /     |  |   H  |  |     |   |         ||_| |_||
  |      |  |   H  |__--------------------| [___] |
  | ________|___H__/__|_____/[][]~\\_______|       |
  |/ |   |-----------I_____I [][] []  D   |=======|__

You meant 'ls', didn't you?
`}
      </pre>
    ),
  }),
};

export function processCommand(input: string): CommandResult {
  const parts = input.trim().split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  if (commands[cmd]) {
    return commands[cmd](args);
  }

  return {
    output: (
      <div>
        <span className="text-red-400">Command not found: </span>
        <span className="text-terminal-green">{cmd}</span>
        <div className="text-terminal-green-dim text-sm mt-1">
          Type <span className="text-terminal-cyan">help</span> or scroll down for available commands.
        </div>
      </div>
    ),
    isError: true,
  };
}
