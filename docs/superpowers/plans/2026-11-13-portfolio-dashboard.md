# Portfolio Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dedicated, secure Admin & Progress Dashboard for Adhil Parokkot's portfolio that enables adding new projects, tracking CEH/InfoSec learning milestones, and syncing updates to the live site.

**Architecture:** Client-side SPA route (`/admin`) backed by a dynamic content service with 3-tier persistence (`localStorage` draft cache -> GitHub repository REST API publish -> unbreakable static fallback). Dynamic content hooks automatically feed into the public portfolio views.

**Tech Stack:** React 19, TypeScript, Vite, CSS Modules / Design Tokens, Vitest, Testing Library.

**Spec:** `docs/superpowers/specs/2026-11-13-portfolio-dashboard-design.md`

## Global Constraints

- Must strictly adhere to the Constructivist Black/White/Red Monograph theme (`#070709`, `#F6F5F1`, `#E11D2E`, `#0F0F13`).
- The public portfolio must remain 100% resilient: if no custom data exists or if the network is offline, it must always display the verified static defaults seamlessly.
- All forms must validate required fields before saving or publishing.
- Support instant pre-filling from Adhil's GitHub repos (e.g. `dns-recon` / `Dns-Health-and-Email-Spoofing-Scanner`).

## Review Focus

1. **Unsaved state loss:** If a user closes the tab mid-edit, drafts in progress must not be lost (saved in local draft storage).
2. **Missing required fields:** Project form must validate title, category, summary, mechanism, and repo URL before saving.
3. **Network failure on publish:** GitHub API publish errors must be clearly surfaced with actionable messages, never leaving the user in an ambiguous state.
4. **Public site fallback:** If `public/data/content.json` is missing or invalid JSON, `usePortfolioContent` must fall back to default `FLAGSHIP_PROJECTS` without throwing runtime errors.
5. **Keyboard accessibility:** The admin gate and project modals must support `Esc` to close and keyboard focus navigation.

---

### Task 1: Dynamic Content Schema & Storage Service

**Files:**
- Create: `src/types/content.ts`
- Create: `src/services/contentStorage.ts`
- Create: `src/services/contentStorage.test.ts`

- [ ] Define `DynamicContent`, `RoadmapMilestone`, and `AdminConfig` types.
- [ ] Implement `contentStorage.ts` with `loadContent()`, `saveLocalContent()`, `resetToDefaults()`, and `publishToGitHub()`.
- [ ] Write unit tests in `src/services/contentStorage.test.ts` verifying storage fallback, serialization, and default seed generation.
- [ ] Run `npx vitest run src/services/contentStorage.test.ts` and ensure all tests pass.

---

### Task 2: Dynamic Portfolio Hook & Public Site Integration

**Files:**
- Create: `src/hooks/usePortfolioContent.ts`
- Create: `src/hooks/usePortfolioContent.test.ts`
- Modify: `src/components/FlagshipProjects.tsx`
- Modify: `src/components/AboutSection.tsx`

- [ ] Implement `usePortfolioContent` hook that reads from local storage or cached JSON, falling back to `FLAGSHIP_PROJECTS` and `PROFILE`.
- [ ] Connect `FlagshipProjects.tsx` to render the dynamic list of featured projects.
- [ ] Connect `AboutSection.tsx` to display active roadmap milestones and dynamic stats.
- [ ] Write tests verifying `usePortfolioContent` returns defaults when storage is empty.
- [ ] Run `npx vitest run src/hooks/usePortfolioContent.test.ts`.

---

### Task 3: Admin Auth & Security Gate

**Files:**
- Create: `src/components/admin/AdminGate.tsx`
- Create: `src/components/admin/AdminGate.test.tsx`

- [ ] Implement monospace terminal PIN lock screen (`#070709`, `#E11D2E`) with masked input, error shaking, and session unlock.
- [ ] Write unit tests verifying correct PIN unlocks session and incorrect PIN shows error message.
- [ ] Run `npx vitest run src/components/admin/AdminGate.test.tsx`.

---

### Task 4: Project Studio (Add, Edit, Reorder, GitHub Import)

**Files:**
- Create: `src/components/admin/ProjectStudio.tsx`
- Create: `src/components/admin/ProjectFormModal.tsx`
- Create: `src/components/admin/ProjectStudio.test.tsx`

- [ ] Implement project list view with status chips, reorder buttons, "Featured" toggle, and Edit/Delete controls.
- [ ] Implement `ProjectFormModal` with full fields (Title, Category, Summary, Mechanism, Architecture items, Security Focus, Tech tags, CLI command, Repo/Demo URLs).
- [ ] Add "Import from GitHub" dropdown that fetches repos from `adhilx3` and pre-populates the modal (including `dns-recon`).
- [ ] Write unit tests verifying adding and editing a project updates the content state.
- [ ] Run `npx vitest run src/components/admin/ProjectStudio.test.tsx`.

---

### Task 5: Progress & Roadmap Tracker

**Files:**
- Create: `src/components/admin/RoadmapTracker.tsx`
- Create: `src/components/admin/RoadmapTracker.test.tsx`

- [ ] Implement roadmap management view with CEH certification modules, InfoSec training, and tool development pipelines.
- [ ] Support adding custom milestones, editing progress percentages (0–100%), and toggling statuses (`Completed`, `In Progress`, `Planned`).
- [ ] Write unit tests for adding and updating milestone items.
- [ ] Run `npx vitest run src/components/admin/RoadmapTracker.test.tsx`.

---

### Task 6: Publish Center & Top-Level Dashboard Shell

**Files:**
- Create: `src/components/admin/PublishCenter.tsx`
- Create: `src/components/admin/DashboardApp.tsx`
- Create: `src/components/admin/Dashboard.css`

- [ ] Implement Dashboard shell with navigation tabs: `[Projects]`, `[Roadmap]`, `[Publish & Sync]`.
- [ ] Implement `PublishCenter` with:
  - GitHub Personal Access Token configuration for 1-click live sync.
  - "Download Backup JSON" button.
  - "Copy JSON to Clipboard".
  - "Reset to Defaults" modal safeguard.
- [ ] Add status bar indicating whether there are unsaved local changes vs published state.

---

### Task 7: Routing & Public Console Links

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/ContactFooter.tsx`

- [ ] Add SPA path-based routing in `App.tsx` (`/admin` routes to `DashboardApp`, root routes to public portfolio).
- [ ] Add subtle "Console" link in the footer and keyboard listener for `Ctrl+Shift+A` to easily toggle into the admin dashboard.
- [ ] Add "View Public Portfolio" button in the dashboard to jump back.

---

### Task 8: Build Verification & End-to-End Testing

**Files:**
- All modified and created files

- [ ] Run full test suite: `npx vitest run`.
- [ ] Run TypeScript compilation: `npx tsc -b`.
- [ ] Run Vite production build: `npx vite build`.
- [ ] Verify both public site and `/admin` console render properly.
- [ ] Commit all changes to git and push to GitHub repository.

