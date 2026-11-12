# Design System — Adhil Parokkot Portfolio

## Visual World

**Constructivist Security Monograph** (`seed:460de6b664c97334`): an editorial-technical system anchored in stark polarity shifts between **Obsidian Black** (`#070709`) and **Paper White** (`#F6F5F1`), punctuated solely by **Signal Red** (`#E11D2E`) and crisp `1px` hairline structural rules.

## Color Tokens

- `--bg-obsidian`: `#070709` (primary dark canvas: Hero, Flagship Monograph, Contact Footer)
- `--bg-elevated`: `#0F0F13` (GitHub Repository Explorer surface)
- `--bg-paper`: `#F6F5F1` (polarity-inverted white bands: Discipline & Training `#about`, Technical Arsenal `#skills`, Inspection Drawer)
- `--bg-paper-alt`: `#ECEAE3` (subordinate panel ground on paper bands)
- `--ink-light`: `#F6F5F1` / `--ink-light-muted`: `rgba(246, 245, 241, 0.78)`
- `--ink-dark`: `#070709` / `--ink-dark-muted`: `rgba(7, 7, 9, 0.74)`
- `--red-signal`: `#E11D2E` / `--red-deep`: `#B31222`
- `--rule-dark`: `rgba(246, 245, 241, 0.2)` / `--rule-light`: `rgba(7, 7, 9, 0.2)`

## Typography

- **Display (`--font-display`):** `Barlow Condensed` (weights 600, 700, 800) — uppercase architectural headings with tight leading (`0.88–0.95`) and `-0.02em` to `-0.025em` tracking.
- **Body (`--font-body`):** `Work Sans` (weights 400, 500, 600) — clean humanist readability (`1rem` base, `1.65` line-height, `60–68ch` measure).
- **Technical / Tabular (`--font-mono`):** `JetBrains Mono` (weights 400, 500) — reserved strictly for command signatures, language filters, status labels, and `tabular-nums` repository counts.

## Motion Grammar

- **Scroll Progress Spine:** Continuous `3px` left-rail red progress fill scrubbed via GSAP `ScrollTrigger`.
- **Hero Entry & Scrub:** Sequenced upward line reveal, exponential-out red rule sweep (`scaleX`), and subtle scrubbed vertical parallax on the background barcode bar field.
- **Section Choreography:** Polarity-banded editorial reveals (`[data-reveal]`), alternating lateral dossier row entrances (`[data-dossier-row]`), and staggered capability matrix columns (`[data-skill-col]`).
- **Accessibility:** `usePrefersReducedMotion` bypasses GSAP animations completely when `prefers-reduced-motion: reduce` is active, keeping all sections immediately visible at full opacity.

## Browser Surfaces & Accessibility

- Custom `::selection` in Signal Red with bone-white text, themed thin scrollbar, `#E11D2E` caret and `:focus-visible` rings, `44px+` minimum interactive target heights, and keyboard-accessible `ProjectDrawer` (`Esc` close, backdrop dismissal, focus restoration, and body scroll lock).
