# Design Document: Adhil Parokkot Personal Portfolio

**Date:** 2026-11-12  
**Project Root:** `C:\Users\adhil.parokkot\.gemini\antigravity\scratch\adhil-portfolio`  
**Status:** Ready for User Approval

---

## 1. Intent & Why

Adhil Parokkot is an Information Security student (pursuing an Advanced Diploma in Information Security and preparing for the Certified Ethical Hacker / CEH certification) based in Malappuram, Kerala. He wants a flagship personal portfolio website in his own name—not merely a GitHub repo index—that replaces or upgrades his earlier `adhilparokkot.vercel.app` site.

The portfolio serves two specific audiences:
1. **MNC companies & hiring teams** (security recruiters, engineering managers, internship leads) looking for structured engineering thinking, clarity on authorized/ethical security practice, demonstrable code/tools, and verifiable technical depth.
2. **His institute trainer** evaluating how effectively Adhil translates CEH and InfoSec fundamentals (network reconnaissance, phishing analysis, virus/hash triage, Discord server defense, scripting, OWASP Top 10, Linux fundamentals) into working software.

Success means a visitor immediately grasps *who Adhil is*, sees undeniable evidence of disciplined security & software craft, experiences memorable scroll-choreographed polish, and can inspect his flagship projects or reach out effortlessly.

---

## 2. Goals, Non-Goals, and Anti-Goals

### Goals
- Lead with **Adhil Parokkot**'s personal identity, InfoSec/CEH credentials, and engineering mindset—with GitHub repositories presented as proof of craft alongside his background and learning progression.
- Deliver a striking **black, white, and red** visual design with purposeful, 60fps **scroll-triggered animations** (built with GSAP ScrollTrigger).
- Spotlight Adhil's strongest security & systems projects with architectural depth (problem, mechanism, stack, ethical/authorized-use framing, repo link) while also surfacing his broader public GitHub repositories (`adhilx3`).
- Provide clear paths for MNC recruiters and his trainer to reach him (email, LinkedIn, GitHub, TryHackMe, Instagram) and verify his hands-on practice.
- Deploy cleanly as a static single-page web application on Vercel (matching his existing `adhilparokkot.vercel.app` domain/workflow).

### Non-Goals
- Building a backend server, database, CMS, or authentication system.
- Writing a full multi-page blog engine or hosting live interactive attack tools in the browser.
- Automatically scraping private GitHub data or requiring user API tokens at runtime.

### Anti-Goals (What Would Make This a Failure)
- **"Script-kiddie" clichés:** Neon green Matrix rain, anonymous hoodie tropes, fake "hacking terminal" progress bars, or unrestrained glitch effects that undercut MNC professionalism.
- **Invented claims:** Fabricating completed certifications (he is *preparing for* CEH, pursuing an Advanced Diploma in Information Security—never claim he already holds CEH), fake work history, synthetic metrics, or fake testimonials.
- **A generic template skin:** Placing stock Tailwind cards over a dark background and calling it "black, white, and red" without typographic hierarchy, real composition, or scroll craft.
- **Broken or jarring motion:** Scroll animations that hide content (`opacity: 0` stuck), cause layout shift, hijack native scroll painfully, or ignore `prefers-reduced-motion`.

---

## 3. Constraints

- **Palette & Visual Medium:** Strictly anchored in **black, white, and red** (surfaces, ink, and high-contrast red accents). *Our call:* Purely **typographic and graphic with no portrait/photo** (no GitHub avatar), keeping the focus on kinetic typography, structural layout, and interactive project evidence.
- **Motion:** Must feature **scroll-on animations** via GSAP + `ScrollTrigger`, balanced with accessibility (`prefers-reduced-motion: reduce` disables or simplifies transforms so content remains immediately readable).
- **Truthfulness & Ethics:**
  - All security tools (especially `PortScanner-Using-Nmap`) must explicitly preserve authorized/educational-use framing.
  - Only verified facts from Adhil's input and `github.com/adhilx3` / profile README are presented.
  - GitHub API calls (`https://api.github.com/users/adhilx3/repos`) must be backed by curated static fallback data baked into the bundle so GitHub rate limits or offline previews never show empty states.
- **Performance & Responsiveness:** Fast initial load, responsive across desktop, tablet, and mobile viewports, zero horizontal overflow, verified at desktop and mobile breakpoints.
- **Existing Domain Continuity (`adhilparokkot.vercel.app`):** Verified via recon that the current live site is a single-page HTML layout using section hashes `#about`, `#projects`, `#skills`, and `#contact` (no sub-routes). Preserving those section anchor IDs ensures zero broken hash links while replacing the incumbent look cleanly.
- **Skill Workflow:** Implementation will follow the installed `impeccable` workflow (`PRODUCT.md` initialization, visual world/direction commitment, `craft-floor.md` compliance, visual & responsive audit, and `DESIGN.md` documentation) after plan approval.

---

## 4. Approaches Considered

### Option 1: React + TypeScript + Vite + GSAP ScrollTrigger *(Selected)*
- **Architecture:** Component-driven SPA (`Hero`, `Credentials / About`, `Featured Tool Case Studies` with interactive architecture drawer/modal, `GitHub Repository Explorer` with live GitHub API sync + static fallback + category/language filter, `Skills & Learning Roadmap`, `Contact / Footer`). GSAP + ScrollTrigger drives pinned/scrubbed/staggered scroll choreography with clean React `useGSAP` / `gsap.context()` lifecycle cleanup.
- **Trade-offs:** Requires Node/Vite build step (`npm run build` → `dist/`), slightly larger bundle than vanilla HTML, but gives modular maintainability, rich interactive project deep-dives, resilient GitHub repo filtering, and zero-config Vercel deployment.
- **Why chosen:** Selected by Adhil; best balance of interactive engineering polish for MNC reviewers, smooth scroll animation control, and simple Vercel hosting.

### Option 2: Pure Semantic HTML + CSS + Vanilla JS + GSAP ScrollTrigger
- **Trade-offs:** Zero framework overhead and direct file editing, but interactive state (repo filtering, detailed inspection drawers, state synchronization) becomes brittle as complexity grows.

### Option 3: Astro Static Site + Scroll Islands
- **Trade-offs:** Ideal if publishing a long-form Markdown CTF write-up blog, but adds content-collection boilerplate unnecessary for a focused flagship portfolio.

*(Dropped heavy CMS/database backends as over-engineered for a personal portfolio, and CSS-only scroll animations as too limited for precision scroll choreography.)*

---

## 5. Confirmed Content & Functional Architecture

### Identity & Credentials (Verified Source Data)
- **Name:** Adhil Parokkot (GitHub handle: `adhilx3`, alias on V-Scan: `dazai`)
- **Location:** Malappuram, Kerala, India
- **Headline / Status:** Information Security Student · Aspiring Ethical Hacker & Security Analyst
- **Education & Certification Path:**
  - Pursuing **Advanced Diploma in Information Security**
  - Preparing for **CEH (Certified Ethical Hacker)** certification
  - Open to **internships, junior roles, and security collaboration**
- **Verified Contact & Profiles:**
  - Email: `adhilsaju3551@gmail.com`
  - GitHub: `https://github.com/adhilx3`
  - LinkedIn: `https://www.linkedin.com/in/adhil-parokkot-86b688380/`
  - TryHackMe: `https://tryhackme.com/p/adhil.parokkot`
  - Instagram: `https://instagram.com/adhil.parokkot` (handle `adhil.parokkot`)
  - *Our calls on unprovided assets/details:*
    1. **No Resume/CV button for now** (no CV PDF/link was provided; primary CTAs direct recruiters to Flagship Projects, GitHub/TryHackMe proof, and Contact, with a `public/` PDF link trivial to add later).
    2. **Date-free training status block** (never fabricate an institute name or exam dates; present the verified Advanced Diploma in Information Security, CEH preparation, and README learning milestones accurately).
    3. **Purely typographic/graphic visual direction** (no portrait/avatar image).

### Page Narrative & Sections
1. **Hero (First Viewport):** Bold black/white/red editorial-technical typographic & graphic introduction in Adhil Parokkot's name—positioning him clearly as an InfoSec student & CEH candidate, with immediate paths to inspect his flagship work or get in touch (no CV button, no portrait).
2. **About & Training Progression (Trainer & Recruiter Proof):** Concise bio ("understanding how systems break so I can help defend them"), date-free Advanced Diploma & CEH preparation status, and his verified learning checklist from his README (Python/C++/JS fundamentals, TCP/IP/DNS/HTTP/firewalls, Linux privilege escalation basics, OWASP Top 10 & TryHackMe CTFs). *(Note: supersedes the old `adhilparokkot.vercel.app` `nmap` terminal box with a sharper, original presentation—our call to impress MNC engineers without cliché tropes.)*
3. **Flagship Security & Engineering Breakdowns (Interactive Case Studies):** Curated deep-dives for his top repositories with an interactive inspection drawer/modal showing architecture, security concepts applied, tech stack, and direct GitHub links:
   - **V-Scan (`V-Scan-by-dazai`)**: Windows desktop file/URL integrity checker using SHA-256 hash lookups and VirusTotal API v3 (Python, CustomTkinter, Requests, PyInstaller); privacy-first hash-only check before optional upload, non-blocking background scans, color-coded verdicts.
   - **Six7 Security (`Six7-X-Security`)**: Modular Discord anti-nuke & moderation bot (`discord.py`) with Auto-Mod pipeline, Anti-Raid join-velocity lockdown, persistent button verification, audit logging, and slash-command configuration.
   - **Port Scanner (`PortScanner-Using-Nmap`)**: Python + `python-nmap` reconnaissance script running service/version detection (`-sV`) and default script scans (`-sC`), presented with explicit authorized/legal-use notice.
   - **Phishing Detector (`Phishing-Detector`)**: Standalone Python/Windows heuristic URL analyzer (`phishing_detector.py` / `PhishingDetector.exe`) scoring URLs `0–100` (`LOW`, `MEDIUM`, `HIGH` risk) across 12 indicators including raw IPs, `@` destination obfuscation, missing HTTPS, high-risk TLDs, URL shorteners, typosquatting, and Punycode/IDN homographs, supporting single-URL, batch `--file`, and interactive modes.
   - **Jarvis (`Jarvis-`)**: Phase 1 text-core personal AI assistant demonstrating modular intent classification (`core/brain.py`), provider-agnostic routing (`core/router.py` supporting Claude & Gemini SDKs), and skill handlers (`system_control`, `coding_assistant`).
4. **All GitHub Repositories Explorer:** Live-synced grid/list pulling public repos for `adhilx3` (with static fallback covering all 10 repos including `PassWord-Generator`, `Calculator-Using-Flutter`, etc.), filterable by language/focus, displaying accurate language, description, stars/forks, and repo link.
5. **Technical Arsenal & Labs:** Organized capability matrix across Languages (`Python`, `C++`, `JavaScript`), Security Tooling (`Kali Linux`, `Nmap`, `Burp Suite`, `VirusTotal API`), and Core Domains (`Network Scanning`, `Web Security / OWASP Top 10`, `Phishing Detection`, `Scripting & Automation`), paired with his TryHackMe profile CTA.
6. **Contact & Footer:** Direct email copy/mailto action, LinkedIn, GitHub, TryHackMe, and Instagram links, closing with his README ethos: *"The only way to learn security is to practice it, legally and ethically."*

---

## 6. What Is Left to the Builder

1. **Workspace & Project Scaffolding:** Initialize Vite + React + TypeScript project in `C:\Users\adhil.parokkot\.gemini\antigravity\scratch\adhil-portfolio`, install `gsap` (and icon library such as `lucide-react` if needed), configure fonts and Vercel-compatible static build (`vite build`).
2. **Impeccable Design Workflow Execution:**
   - Initialize `PRODUCT.md` and resolve the visual world / layout direction (`impeccable` `new-work` / `concept-seed` / `craft-floor` discipline) within the pinned black/white/red palette.
   - Choose distinctive typography (avoiding generic AI defaults) and commit a cohesive, memorable layout & scroll motion grammar.
3. **Interactive Details & Polish:**
   - Implement GSAP `ScrollTrigger` animations across sections with clean React lifecycle cleanup (`gsap.context()` / `@gsap/react` or `useEffect` cleanup) and `prefers-reduced-motion` handling.
   - Implement resilient GitHub API fetching (`sessionStorage` cache + static fallback dataset so there is zero flash of missing content).
   - Build an accessible project inspection drawer/modal (keyboard `Esc` close, focus management) and quick email copy feedback.
4. **Verification & Documentation:**
   - Run `npm run build` and inspect the live rendered app in a real browser across desktop and mobile viewports (including scroll states and reduced-motion/overflow checks).
   - Produce `DESIGN.md` reflecting the built visual system.

