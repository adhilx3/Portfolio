export interface LearningMilestone {
  topic: string;
  status: 'completed' | 'in-progress';
  detail: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
  summary: string;
}

export const PROFILE = {
  name: 'Adhil Parokkot',
  firstName: 'Adhil',
  lastName: 'Parokkot',
  handle: 'adhilx3',
  role: 'Information Security Student',
  subtitle: 'Aspiring Ethical Hacker & Security Analyst',
  location: 'Malappuram, Kerala, India',
  availability: 'Open to internships, junior security roles, and technical collaboration',
  bio: "I'm an Information Security student pursuing an Advanced Diploma in Information Security and preparing for the Certified Ethical Hacker (CEH) certification. I build security tools, automation scripts, and defensive utilities because the clearest way to defend a system is to understand how it breaks.",
  ethicsQuote: 'The only way to learn security is to practice it, legally and ethically.',
  ethicsNote:
    'Every security utility in this portfolio is built strictly for educational study and authorized testing in environments you own or have explicit permission to assess.',
  credentials: [
    {
      title: 'Advanced Diploma in Information Security',
      state: 'Currently Studying',
      note: 'Core coursework across network defense, operating systems, web security, and offensive fundamentals.',
    },
    {
      title: 'Certified Ethical Hacker (CEH)',
      state: 'In Preparation',
      note: 'Preparing for CEH certification alongside practical reconnaissance, enumeration, and defensive scripting.',
    },
    {
      title: 'TryHackMe Hands-On Labs',
      state: 'Active Practice',
      note: 'Applying networking, privilege escalation, and web vulnerability concepts in legal lab environments.',
      url: 'https://tryhackme.com/p/adhil.parokkot',
    },
  ],
  learningRoadmap: [
    {
      topic: 'Python, C++ & JavaScript Fundamentals',
      status: 'completed',
      detail: 'Building desktop scanners, bots, CLI security utilities, and web interfaces.',
    },
    {
      topic: 'Networking (TCP/IP, DNS, HTTP, Firewalls)',
      status: 'completed',
      detail: 'Packet behavior, port states, service fingerprinting, and perimeter controls.',
    },
    {
      topic: 'Linux Privilege Escalation Basics',
      status: 'completed',
      detail: 'Permissions, enumeration, and host hardening fundamentals.',
    },
    {
      topic: 'CEH Exam Preparation',
      status: 'in-progress',
      detail: 'Structured study across ethical hacking methodologies and countermeasures.',
    },
    {
      topic: 'OWASP Top 10 & Web Application Security',
      status: 'in-progress',
      detail: 'Request tampering and inspection with Burp Suite and secure coding patterns.',
    },
    {
      topic: 'CTFs & Practical Labs on TryHackMe',
      status: 'in-progress',
      detail: 'Timed offensive/defensive challenge labs under legal, isolated scopes.',
    },
  ] satisfies LearningMilestone[],
  skills: [
    {
      category: 'Languages',
      items: ['Python', 'C++', 'JavaScript', 'TypeScript'],
      summary: 'Scripting security automation, API integrations, Discord bots, and web tooling.',
    },
    {
      category: 'Security Tooling',
      items: ['Kali Linux', 'Nmap', 'Burp Suite', 'VirusTotal API v3'],
      summary: 'Network reconnaissance, HTTP proxy inspection, and multi-engine hash intelligence.',
    },
    {
      category: 'Focus Domains',
      items: [
        'Network Scanning',
        'Web Security Basics',
        'Phishing Detection',
        'Scripting & Automation',
      ],
      summary: 'Translating foundational security concepts into repeatable, auditable tools.',
    },
  ] satisfies SkillGroup[],
  contact: {
    email: 'adhilsaju3551@gmail.com',
    github: 'https://github.com/adhilx3',
    linkedin: 'https://www.linkedin.com/in/adhil-parokkot-86b688380/',
    tryhackme: 'https://tryhackme.com/p/adhil.parokkot',
    instagram: 'https://www.instagram.com/adhil.parokkot/',
    instagramHandle: '@adhil.parokkot',
  },
} as const;
