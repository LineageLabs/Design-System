# Changelog

All notable changes to this design system are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/). Versions use calendar-based numbering (`YYYY.MM.patch`).

---

## [2024.02.5] — 2026-02-24

### Changed
- **Section spacing increased.** All section tokens bumped up one scale step for more generous vertical rhythm:
  - `section-sm`: 32px → 48px (tw `8` → `12`)
  - `section-md`: 48px → 64px (tw `12` → `16`)
  - `section-lg`: 80px → 96px (tw `20` → `24`)
  - `section-xl`: 96px → 128px (tw `24` → `32`)
- **h1 size increased.** Default h1 from `2.25rem` (36px) to `2.75rem` (44px).

### Added
- `32` (8rem / 128px) added to base spacing scale to support new `section-xl`.

---

## [2024.02.4] — 2026-02-24

### Added
- **Spacing tokens** (`tokens/spacing.yaml`) — full 4px-grid scale, semantic tokens, component spacing map, and guidelines.
- Spacing section (Section 7) added to `DESIGN-SYSTEM.md`.
- Spacing reference cards added to `index.html` demo page.

---

## [2024.02.3] — 2026-02-24

### Changed
- **Light-mode background** now uses brand surface `#FAFAFA` (`--brand-surface`) instead of pure white.
- Dark-mode hover box-shadows fixed to be visible against dark backgrounds.

---

## [2024.02.2] — 2026-02-24

### Added
- **Mobile example page** (`example-mobile.html`) — Focus task app demonstrating Maia components at mobile viewport.
- Mobile example embedded as Section 07 in `index.html`.
- Interactive hover states on all Maia component demos (animated color shifts, GSAP physics).

---

## [2024.02.1] — 2026-02-24

### Changed
- **Maia style + Gray theme applied.** OKLCH color values updated to match exact shadcn source.
- Maia component-level details added (border radius, ring borders, pill inputs).
- Typography configured: Geist Sans (body), Poppins (h1–h4), Geist Mono (code).
- Hugeicons set as default icon library.
- Large radius (`--radius: 0.875rem`) applied.

### Added
- `index.html` — full design system showcase page with live component demos and GSAP animations.

---

## [2024.02.0] — 2026-02-24

### Added
- **Initial design system reference bank.**
- `CLAUDE.md` — LLM quick-start guide.
- `DESIGN-SYSTEM.md` — master specification (colors, typography, motion, components, assets).
- `tokens/colors.css` — CSS variables (shadcn Gray theme + brand colors).
- `tokens/brand-colors.yaml` — brand color palette with usage rules.
- `tokens/motion.yaml` — duration, easing, and stagger tokens.
- `animations/presets.js` — GSAP animation presets (entrance, exit, hover, scroll, logo).
- `animations/scroll-triggers.js` — GSAP ScrollTrigger factory functions.
- `animations/transitions.css` — CSS-only transition utilities.
- `components/shadcn-customizations.yaml` — Maia style overrides from shadcn defaults.
- `assets/logos/README.md` — logo variants, sizes, naming conventions.
- `docs/DECISIONS.md` — design decision log.
