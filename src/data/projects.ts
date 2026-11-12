export interface FlagshipProject {
  id: string;
  repoName: string;
  title: string;
  category: string;
  summary: string;
  mechanism: string;
  architecture: string[];
  securityFocus: string;
  tech: string[];
  commandHint: string;
  legalNote?: string;
  repoUrl: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  forks: number;
  topics: string[];
  updatedAt: string;
}

export const FLAGSHIP_PROJECTS: FlagshipProject[] = [
  {
    id: 'v-scan',
    repoName: 'V-Scan-by-dazai',
    title: 'V-Scan',
    category: 'Malware & File Integrity Triage',
    summary:
      'Windows desktop application that inspects files and URLs against VirusTotal’s 70+ antivirus engines with instant color-coded verdicts and a detection gauge.',
    mechanism:
      'Computes a local SHA-256 hash first so sensitive files are checked by hash without uploading, falling back to optional upload (up to 650 MB) only when explicitly requested.',
    architecture: [
      'Non-blocking worker threads keep the CustomTkinter interface responsive during API lookups.',
      'Classifies responses into Clean (0 flags), Suspicious (1–4 flags), and Dangerous (5+ flags) with per-engine breakdowns.',
      'Includes PyInstaller build pipeline (`build.py`) supporting standalone distribution without leaking API keys.',
    ],
    securityFocus: 'Privacy-first hash triage, threat intelligence integration, local key isolation.',
    tech: ['Python', 'CustomTkinter', 'VirusTotal API v3', 'Requests', 'PyInstaller'],
    commandHint: 'SHA-256 lookup -> VirusTotal v3 -> Verdict Engine',
    legalNote: 'Front-end for VirusTotal public API; designed as one verification layer alongside safe handling practices.',
    repoUrl: 'https://github.com/adhilx3/V-Scan-by-dazai',
  },
  {
    id: 'six7-security',
    repoName: 'Six7-X-Security',
    title: 'Six7 Security',
    category: 'Automated Server Defense & Anti-Raid',
    summary:
      'Modular anti-nuke and moderation bot for Discord communities built with slash-command configuration and persistent security controls.',
    mechanism:
      'Combines a multi-stage Auto-Mod filter pipeline with in-memory join-velocity tracking that triggers automated raid lockdown and verification-level escalation.',
    architecture: [
      'Auto-Mod cog checks banned words, invite links, mass mentions, excessive caps, and spam rate-limits with 10-minute auto-timeout.',
      'Anti-Raid cog tracks join timestamps per guild, flags young accounts, and initiates lockdown mode with configurable Kick/Ban/Log actions.',
      'Persistent Discord UI verification button survives restarts via custom IDs; all events route to a central audit log channel.',
    ],
    securityFocus: 'Rate-limiting, raid anomaly thresholds, role-hierarchy permission boundaries, audit logging.',
    tech: ['Python', 'discord.py', 'Slash Commands', 'Guild Config JSON'],
    commandHint: '/antiraid-toggle -> /set-join-threshold -> /lockdown',
    repoUrl: 'https://github.com/adhilx3/Six7-X-Security',
  },
  {
    id: 'phishing-detector',
    repoName: 'Phishing-Detector',
    title: 'Phishing Link Detector',
    category: 'Heuristic URL Analysis',
    summary:
      'Standalone Windows CLI and Python analyzer that scores suspicious URLs from 0 to 100 across 12 phishing indicators before a user clicks.',
    mechanism:
      'Inspects lexical and structural anomalies—raw IP hosts, `@` destination masking, missing HTTPS, high-risk TLDs, shorteners, typosquatting, and Punycode/IDN homographs—to emit a transparent finding list.',
    architecture: [
      'Outputs deterministic risk tiers: LOW RISK (0–29), MEDIUM RISK (30–59), and HIGH RISK (60–100).',
      'Supports single-URL inspection, batch file scanning (`--file urls.txt`), and an interactive terminal prompt.',
      'Explains every triggered heuristic rule so analysts and users understand why a link was flagged.',
    ],
    securityFocus: 'Phishing surface analysis, IDN homograph awareness, transparent heuristic scoring.',
    tech: ['Python', 'PyInstaller', 'CLI Architecture', 'URL Heuristics'],
    commandHint: 'PhishingDetector.exe --file urls.txt',
    legalNote: 'Heuristic triage signal intended to complement browser protections and manual verification.',
    repoUrl: 'https://github.com/adhilx3/Phishing-Detector',
  },
  {
    id: 'port-scanner',
    repoName: 'PortScanner-Using-Nmap',
    title: 'Port Scanner',
    category: 'Network Reconnaissance Automation',
    summary:
      'Python reconnaissance wrapper around `python-nmap` that automates host state checks, open port enumeration, and service version fingerprinting.',
    mechanism:
      'Invokes Nmap service/version detection (`-sV`) and default script enumeration (`-sC`) across target hosts and formats TCP protocol state tables cleanly.',
    architecture: [
      'Wraps Nmap’s binary output via `python-nmap` for structured host, protocol, and port-state reporting.',
      'Documents privilege elevation requirements (`sudo` / Administrator) for raw packet inspection and OS/service probes.',
      'Built as an inspectable foundation for learning TCP/IP reconnaissance workflows in lab environments.',
    ],
    securityFocus: 'TCP/IP port enumeration, service/version fingerprinting, Nmap NSE script basics.',
    tech: ['Python', 'Nmap', 'python-nmap', 'TCP/IP'],
    commandHint: 'nmap -sV -sC -> Host / Protocol / State Matrix',
    legalNote: 'Strictly for networks and hosts you own or have explicit written authorization to assess.',
    repoUrl: 'https://github.com/adhilx3/PortScanner-Using-Nmap',
  },
  {
    id: 'jarvis',
    repoName: 'Jarvis-',
    title: 'Jarvis Core',
    category: 'Modular AI Intent Router',
    summary:
      'Phase 1 text-core personal assistant framework demonstrating clean separation between LLM intent classification and local skill execution.',
    mechanism:
      'Classifies natural-language requests through `core/brain.py` and dispatches structured parameters via a provider-agnostic `core/router.py` supporting both Anthropic Claude and Google Gemini.',
    architecture: [
      'Swappable LLM brain layer (`LLM_PROVIDER=claude|gemini`) keeps downstream skill handlers independent of the model vendor.',
      'Built-in handlers cover OS app launching, system status, Python/Bash/JS execution (with 30s timeout), file explanation, and `git status`.',
      'Falls back seamlessly to conversational output when an input matches `general_chat` rather than failing stiffly.',
    ],
    securityFocus: 'Sandboxed 30-second script execution timeout, clean separation of intent parsing vs. OS actions.',
    tech: ['Python', 'Anthropic SDK', 'Google GenAI SDK', 'Intent Routing'],
    commandHint: 'REPL -> core/brain.py -> core/router.py -> skills/*',
    repoUrl: 'https://github.com/adhilx3/Jarvis-',
  },
];

export const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: 'V-Scan-by-dazai',
    description:
      'Windows desktop app to scan files and URLs with VirusTotal: SHA-256 hash checks, instant verdicts, detection gauge, and one-click full reports.',
    url: 'https://github.com/adhilx3/V-Scan-by-dazai',
    language: 'Python',
    stars: 0,
    forks: 0,
    topics: ['virustotal', 'infosec', 'customtkinter', 'malware-analysis'],
    updatedAt: '2026-11-12T00:00:00Z',
  },
  {
    id: 2,
    name: 'Six7-X-Security',
    description:
      'Modular anti-nuke Discord security bot with Auto-Mod filtering, Anti-Raid lockdown triggers, persistent verification, and audit logging.',
    url: 'https://github.com/adhilx3/Six7-X-Security',
    language: 'Python',
    stars: 0,
    forks: 0,
    topics: ['discord-bot', 'anti-raid', 'security'],
    updatedAt: '2026-11-10T00:00:00Z',
  },
  {
    id: 3,
    name: 'Phishing-Detector',
    description:
      'Standalone heuristic URL analyzer scoring suspicious links (0–100) across 12 phishing indicators including typosquatting and Punycode homographs.',
    url: 'https://github.com/adhilx3/Phishing-Detector',
    language: 'Python',
    stars: 0,
    forks: 0,
    topics: ['phishing-detection', 'heuristics', 'infosec'],
    updatedAt: '2026-11-08T00:00:00Z',
  },
  {
    id: 4,
    name: 'PortScanner-Using-Nmap',
    description:
      'Python + python-nmap port scanner running service/version detection (-sV) and default script scans (-sC) for authorized lab reconnaissance.',
    url: 'https://github.com/adhilx3/PortScanner-Using-Nmap',
    language: 'Python',
    stars: 0,
    forks: 0,
    topics: ['nmap', 'networking', 'reconnaissance'],
    updatedAt: '2026-11-06T00:00:00Z',
  },
  {
    id: 5,
    name: 'Jarvis-',
    description:
      'Phase 1 text-core AI assistant routing natural-language commands to system-control and coding skills via Claude or Gemini.',
    url: 'https://github.com/adhilx3/Jarvis-',
    language: 'Python',
    stars: 0,
    forks: 0,
    topics: ['ai-assistant', 'automation', 'python'],
    updatedAt: '2026-11-05T00:00:00Z',
  },
  {
    id: 6,
    name: 'PassWord-Generator',
    description:
      'Configurable Python password generator supporting custom lengths across letters, digits, and symbols.',
    url: 'https://github.com/adhilx3/PassWord-Generator',
    language: 'Python',
    stars: 0,
    forks: 0,
    topics: ['python', 'utility'],
    updatedAt: '2026-11-04T00:00:00Z',
  },
  {
    id: 7,
    name: 'Portfolio',
    description: 'Previous web portfolio repository showcasing personal projects.',
    url: 'https://github.com/adhilx3/Portfolio',
    language: 'CSS',
    stars: 0,
    forks: 0,
    topics: ['portfolio', 'web'],
    updatedAt: '2026-11-03T00:00:00Z',
  },
  {
    id: 8,
    name: 'Some',
    description: 'JavaScript web experiments and learning repository.',
    url: 'https://github.com/adhilx3/Some',
    language: 'JavaScript',
    stars: 0,
    forks: 0,
    topics: ['javascript'],
    updatedAt: '2026-11-02T00:00:00Z',
  },
  {
    id: 9,
    name: 'Calculator-Using-Flutter',
    description: 'Cross-platform calculator built while exploring Flutter UI.',
    url: 'https://github.com/adhilx3/Calculator-Using-Flutter',
    language: 'Dart',
    stars: 0,
    forks: 0,
    topics: ['flutter'],
    updatedAt: '2026-10-20T00:00:00Z',
  },
  {
    id: 10,
    name: 'adhilx3',
    description: 'GitHub profile README documenting CEH preparation, InfoSec tools, and TryHackMe labs.',
    url: 'https://github.com/adhilx3/adhilx3',
    language: 'Markdown',
    stars: 0,
    forks: 0,
    topics: ['profile', 'ceh', 'infosec'],
    updatedAt: '2026-11-12T00:00:00Z',
  },
];
