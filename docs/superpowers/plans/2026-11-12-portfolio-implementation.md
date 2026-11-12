# Adhil Parokkot Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify a black, white, and red personal portfolio web application for Adhil Parokkot (`adhilx3`) using React, TypeScript, Vite, and GSAP ScrollTrigger, ready for Vercel deployment.

**Architecture:** Modular React + TypeScript SPA organized by data (`profile.ts`, `projects.ts`), GitHub API resilience (`services/github.ts`), scroll choreography (`hooks/useScrollReveal.ts`), and focused section components preserving the `#about`, `#projects`, `#skills`, and `#contact` anchors from `adhilparokkot.vercel.app`. Visual design decisions follow the installed `impeccable` skill workflow (`PRODUCT.md`, `concept-seed` / `new-work`, `craft-floor.md`, live visual audit, and `DESIGN.md`).

**Tech Stack:** React 19, TypeScript, Vite, GSAP + ScrollTrigger, Lucide React, Vitest + React Testing Library.

**Spec:** `docs/superpowers/specs/2026-11-12-portfolio-design.md`

## Global Constraints

- Strictly black, white, and red palette (surfaces, ink, and high-contrast red accents); purely typographic and graphic with no portrait/avatar image.
- Scroll-triggered animations via GSAP + `ScrollTrigger` with full `prefers-reduced-motion: reduce` support and clean `gsap.context()` cleanup.
- Zero fabricated credentials, dates, institute names, or synthetic metrics; CEH must be framed strictly as *in preparation* alongside *pursuing Advanced Diploma in Information Security*.
- Explicit authorized/educational-use framing on security tooling (especially `PortScanner-Using-Nmap` and `Phishing-Detector`).
- Live GitHub API fetching (`https://api.github.com/users/adhilx3/repos`) must fall back seamlessly to the curated 10-repo dataset without empty states.
- Preserve section anchor IDs `#about`, `#projects`, `#skills`, and `#contact`.

## Review Focus

- GitHub API rate limit (HTTP 403/429), timeout, or offline environment returning errors: `fetchPublicRepos` must resolve cleanly to `FALLBACK_REPOS` without throwing or rendering an empty grid.
- `prefers-reduced-motion: reduce` enabled in OS/browser: GSAP ScrollTrigger reveals must not leave any section stuck at `opacity: 0`.
- Opening and closing `ProjectDrawer` via keyboard (`Esc`), backdrop click, or close button: focus must return cleanly and body scroll lock must be restored.
- Mobile viewports (`375px` width) and desktop (`1440px` width): zero horizontal overflow, legible typography, and accessible tap targets.
- Clipboard API unavailability in non-HTTPS/restricted contexts: email copy button must fall back gracefully without unhandled rejections.

---

### Task 1: Workspace Initialization, Git Setup & Impeccable Context

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `vitest.config.ts`, `vercel.json`, `.gitignore`, `index.html`, `PRODUCT.md`

- [ ] **Step 1: Initialize Git repository and scaffold Vite React-TS dependencies**
  Run `git init`, create `package.json` with `react`, `react-dom`, `gsap`, `lucide-react`, and devDependencies (`vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`), and run `npm install`.
- [ ] **Step 2: Configure `tsconfig.json`, `vite.config.ts`, `vitest.config.ts`, `vercel.json`, and `.gitignore`**
  Ensure strict TypeScript settings, Vitest `jsdom` environment + `src/test/setup.ts`, and clean SPA `vercel.json` config.
- [ ] **Step 3: Execute `impeccable` context & `init` (`PRODUCT.md`) and resolve the visual world**
  Run `C:\Users\adhil.parokkot\.gemini\config\skills\impeccable\scripts\impeccable.cmd context`, record verified product truth in `PRODUCT.md`, run `concept-seed --scope direction --mode experience`, read `reference/craft-floor.md`, and record the surface brief direction contract.
- [ ] **Step 4: Commit scaffolding and product/design foundation**
  Expected: `npm run test -- --run` exits 0 (with initial smoke check) and `git status` is clean.

---

### Task 2: Verified Profile Data, Flagship Projects & GitHub Service (TDD)

**Files:**
- Create: `src/data/profile.ts`
- Create: `src/data/projects.ts`
- Create: `src/services/github.ts`
- Test: `src/services/github.test.ts`

**Interfaces:**
- Produces:
  - `PROFILE`: verified personal metadata, credentials, learning checklist, skills matrix, and contact links in `src/data/profile.ts`
  - `FLAGSHIP_PROJECTS: FlagshipProject[]` and `FALLBACK_REPOS: GitHubRepo[]` in `src/data/projects.ts`
  - `fetchPublicRepos(username?: string): Promise<{ repos: GitHubRepo[]; source: 'live' | 'cache' | 'fallback' }>` in `src/services/github.ts`

- [ ] **Step 1: Write failing tests in `src/services/github.test.ts`**
  Cover: (a) successful GitHub API response maps fields and caches in `sessionStorage`, (b) cached response skips network fetch, (c) HTTP 403 rate-limit or network rejection falls back cleanly to `FALLBACK_REPOS` with `source: 'fallback'`, (d) malformed non-array JSON falls back cleanly to `FALLBACK_REPOS`.
- [ ] **Step 2: Run tests to verify failure**
  Run: `npx vitest run src/services/github.test.ts`
  Expected: FAIL (`Cannot find module './github'`).
- [ ] **Step 3: Create `src/data/profile.ts`, `src/data/projects.ts`, and implement `src/services/github.ts`**
  Populate only verified facts from Adhil's input and GitHub READMEs (`V-Scan-by-dazai`, `Six7-X-Security`, `Phishing-Detector`, `PortScanner-Using-Nmap`, `Jarvis-`, and all 10 public repos).
- [ ] **Step 4: Run tests to verify pass**
  Run: `npx vitest run src/services/github.test.ts`
  Expected: PASS (4/4).
- [ ] **Step 5: Commit Task 2**

---

### Task 3: Design System, Typography & Scroll Animation Hooks

**Files:**
- Create: `index.html`
- Create: `src/index.css`
- Create: `src/hooks/usePrefersReducedMotion.ts`
- Create: `src/hooks/useScrollReveal.ts`

**Interfaces:**
- Produces:
  - CSS custom properties and committed black/white/red visual world tokens in `src/index.css`
  - `usePrefersReducedMotion(): boolean`
  - `useScrollReveal(containerRef: RefObject<HTMLElement | null>): void`

- [ ] **Step 1: Load distinctive display/body/mono fonts in `index.html` and author `src/index.css`**
  Follow `impeccable` `craft-floor.md` and the committed direction contract (black `#070708` / `#0E0E11`, crisp bone/white `#F5F4F0`, high-impact crimson red `#E11D2E` / `#DC2626`, sharp editorial geometry, custom selection, zero generic gradients).
- [ ] **Step 2: Implement `usePrefersReducedMotion.ts` and `useScrollReveal.ts`**
  Use `gsap.registerPlugin(ScrollTrigger)` and `gsap.context()` inside `useEffect` with clean `ctx.revert()` teardown. If `prefersReducedMotion` is true, skip hiding elements or pinning and keep all sections immediately visible.
- [ ] **Step 3: Verify TypeScript compilation (`npx tsc --noEmit`)**
  Expected: 0 errors.
- [ ] **Step 4: Commit Task 3**

---

### Task 4: Portfolio Sections, Interactive Project Drawer & Component Tests (TDD)

**Files:**
- Create: `src/components/Navbar.tsx`
- Create: `src/components/Hero.tsx`
- Create: `src/components/AboutSection.tsx`
- Create: `src/components/FlagshipProjects.tsx`
- Create: `src/components/ProjectDrawer.tsx`
- Create: `src/components/RepoExplorer.tsx`
- Create: `src/components/SkillsSection.tsx`
- Create: `src/components/ContactFooter.tsx`
- Create: `src/App.tsx`
- Create: `src/main.tsx`
- Test: `src/components/App.test.tsx`

**Interfaces:**
- Consumes: `PROFILE`, `FLAGSHIP_PROJECTS`, `FALLBACK_REPOS`, `fetchPublicRepos`, `useScrollReveal`, `usePrefersReducedMotion`.
- Produces: Complete accessible SPA preserving `#about`, `#projects`, `#skills`, and `#contact`.

- [ ] **Step 1: Write failing component & integration tests in `src/components/App.test.tsx`**
  Test:
  1. Renders Adhil Parokkot's name, InfoSec/CEH status (without fabricating CEH completion), and `#about`, `#projects`, `#skills`, `#contact` landmarks.
  2. Clicking a flagship project opens `ProjectDrawer` with architecture details and authorized-use note; pressing `Escape` closes it.
  3. Filtering repositories in `RepoExplorer` by language (`Python`, `JavaScript`, `All`) updates the displayed repos accurately.
  4. Clicking copy email copies `adhilsaju3551@gmail.com` and shows confirmation (and handles clipboard rejection gracefully).
- [ ] **Step 2: Run tests to verify failure**
  Run: `npx vitest run src/components/App.test.tsx`
  Expected: FAIL.
- [ ] **Step 3: Implement all section components, `ProjectDrawer.tsx`, `App.tsx`, and `main.tsx`**
  Build with strong visual hierarchy, interactive GSAP scroll choreography hooks (`data-reveal`, staggered cards, horizontal index ticker/progress rail, scrubbed red accent rule), keyboard accessibility, and clean error/fallback states.
- [ ] **Step 4: Run full test suite & production build**
  Run: `npx vitest run` and `npm run build`
  Expected: All tests PASS and `dist/` builds cleanly with zero TypeScript/Vite errors.
- [ ] **Step 5: Commit Task 4**

---

### Task 5: Live Browser Verification, Visual Critique/Audit & `DESIGN.md`

**Files:**
- Create/Update: `DESIGN.md`
- Modify: any styles/components surfaced during visual inspection

- [ ] **Step 1: Start Vite preview/dev server and inspect rendered app in browser**
  Use the browser subagent to open the live local server, scroll through every section at desktop (`1440x900`) and mobile (`390x844`) viewports, test opening/closing a project drawer, repo filters, and scroll animation visibility.
- [ ] **Step 2: Fix any visual, spacing, contrast, overflow, or scroll-trigger defects found**
- [ ] **Step 3: Re-run full test suite (`npx vitest run`), TypeScript check (`npx tsc --noEmit`), and production build (`npm run build`)**
- [ ] **Step 4: Write `DESIGN.md` documenting the implemented visual system and commit final verified state**

