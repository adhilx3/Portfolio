# Design Spec — Adhil Parokkot Portfolio Management Dashboard

## 1. Executive Summary & Intent

Adhil Parokkot creates new security tools (e.g. `dns-recon` / DNS Health & Email Spoofing Scanner) and advances through his CEH/InfoSec training. Currently, the flagship projects and roadmap on `adhilparokkot.vercel.app` are static TypeScript definitions.

This specification defines a dedicated **Portfolio Management & Progress Dashboard** (`/admin`) that allows Adhil to:
1. Add, edit, reorder, and feature new security projects with full architectural dossiers.
2. Track CEH certification modules, InfoSec diploma progress, and active lab milestones with real-time status updates.
3. Automatically sync and publish changes to the live portfolio via GitHub API or local JSON export, with resilient fallback.

---

## 2. Platform, Stack & Boundaries

- **Platform:** Web application integrated into the portfolio codebase at `/admin` (SPA route supported by `vercel.json`).
- **Stack:** React 19, TypeScript, Vite, CSS Modules / Design Tokens (`#070709`, `#F6F5F1`, `#E11D2E`, `#0F0F13`), Lucide icons / SVG glyphs.
- **Data Persistence:**
  - **Local Layer:** Browser `localStorage` for instant zero-latency editing, draft saving, and offline capability.
  - **Live Publish Layer:** GitHub REST API integration committing `public/data/content.json` directly to `adhilx3/Portfolio` using a personal access token (saved only in the user's browser `localStorage`).
  - **Runtime Consumer:** `usePortfolioContent` hook on the public portfolio that prioritizes dynamic content while keeping the vetted static `FLAGSHIP_PROJECTS` and `PROFILE` as an unbreakable fallback.

---

## 3. Goals, Non-Goals & Anti-Goals

### Goals
- **Project Studio:** Add, edit, delete, reorder, and feature projects with complete security metadata (Title, Category, Summary, Mechanism, Architecture bullets, Security Focus, Tech tags, CLI command hints, Legal note, Repo URL, Live Demo URL).
- **One-Click GitHub Import:** Option to fetch public repositories from `adhilx3` and pre-fill project details.
- **Progress Tracker:** Visual tracking of CEH domains, TryHackMe practice, and tools in active development with customizable progress bars and status badges (`Completed`, `In Progress`, `Planned`).
- **Dynamic Portfolio Integration:** The public portfolio's `#projects`, `#about`, and drawer automatically render any new projects or updated progress.
- **PIN Protection:** Simple PIN/Passphrase barrier to prevent casual visitors from tampering with local admin state.

### Non-Goals
- Multi-user authentication system with roles and permissions (Adhil is the sole owner).
- Heavy external database dependencies (e.g. complex SQL setup) that require monthly billing or break when unmaintained.

### Anti-Goals
- Fragile cloud dependencies that could take down the public portfolio if an external service has an outage. The public portfolio must remain 100% functional even if GitHub API or storage fails.

---

## 4. User Experience & Layout

### 4.1 Access Point
- Direct URL navigation: `/admin`
- Subtle discreet footer link ("Console") and keyboard shortcut (`Ctrl+Shift+A`).

### 4.2 Security Gate
- Clean monospace terminal PIN prompt.
- Default PIN initialized with option for user to set/change their own PIN.
- Failed attempts show rate-limiting feedback.

### 4.3 Dashboard Workspaces
1. **Header & Status Bar:** Displays current sync state (Unsaved changes / Synced with GitHub), quick link to "View Public Site", and Logout button.
2. **Tab 1: Project Studio:**
   - Active Flagship list with drag/reorder controls, "Featured" toggle, and "Edit" / "Delete" actions.
   - "New Project" modal or drawer with fields matching `FlagshipProject`.
   - "Import from GitHub" button: lists user's GitHub repos (e.g., `Dns-Health-and-Email-Spoofing-Scanner`, `V-Scan-by-dazai`) and generates starter template.
3. **Tab 2: Progress & Roadmap:**
   - CEH Exam Preparation Tracker: Progress bar + domain checklist (Network Security, Vulnerability Analysis, Web App Pentesting, Cryptography, etc.).
   - Tool Development Pipeline: Lists upcoming and active projects with status badges (`Active Development`, `Research`, `Complete`).
4. **Tab 3: Sync & Publish:**
   - GitHub Token configuration for 1-click live deploy to `adhilx3/Portfolio`.
   - "Download content.json" backup button.
   - "Copy JSON to Clipboard".
   - "Reset to Factory Defaults" safeguard.

---

## 5. Architectural Data Schema

```typescript
export interface DynamicContent {
  lastUpdated: string;
  flagshipProjects: FlagshipProject[];
  roadmap: RoadmapMilestone[];
  stats: {
    toolsBuilt: number;
    labsCompleted: number;
    domainsMastered: number;
  };
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  category: 'CEH' | 'InfoSec' | 'Tooling' | 'Labs';
  status: 'completed' | 'in-progress' | 'planned';
  progressPercent: number;
  details: string;
  targetDate?: string;
}
```

---

## 6. Verification & Test Strategy
- Unit tests for `usePortfolioContent` hook (localStorage fallback, network fetch, error handling).
- Unit tests for content validation (ensuring required project fields exist before publishing).
- Component tests for PIN gate and project CRUD actions.
- Vitest suite integration with existing tests.
