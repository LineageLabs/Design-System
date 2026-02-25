# Changelog

All notable changes to this design system are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/). Versions use calendar-based numbering (`YYYY.MM.patch`).

---

## [2026.02.8] — 2026-02-25

### Added
- **Color usage philosophy — 3-tier guideline.** Documented in `DESIGN-SYSTEM.md` (new "Color Usage Philosophy" section with tier table), `tokens/brand-colors.yaml` (new philosophy block), and `CLAUDE.md` (new cardinal rule #8):
  - **Tier 1 — Neutrals (default):** surfaces, greys, `--foreground`, `--muted-foreground`, `--border`. Use for the vast majority of UI.
  - **Tier 2 — Brand greens (purposeful):** may be decorative but must serve a purpose (identity, emphasis, hierarchy).
  - **Tier 3 — Non-brand colors (functional only):** `--destructive` etc. Only when color conveys meaning (errors, warnings). Never decorative.

### Changed
- **`example-mobile.html` updated to follow color guideline:**
  - Priority dots `.p-med`: `--brand-highlight-light-green` → `--muted-foreground` (functional indicator, not brand expression).
  - Priority dots `.p-low`: `--brand-highlight-grass-green` → `--border` (neutral for low priority).
  - "View all" link `.section-hdr-link`: `--brand-highlight-grass-green` → `--muted-foreground` (utility link, not brand accent).
  - Active stat value: removed inline `color:var(--brand-highlight-grass-green)` (stat number, not brand expression).
  - Reports quick-action icon: arbitrary `oklch(0.5 0.15 80)` stroke → `currentColor`; bg `--brand-highlight-light-green` → `--muted-foreground` at 10%.
  - Success toast checkmark: arbitrary `oklch(0.58 0.18 145)` → `var(--brand-highlight-grass-green)`.

---

## [2026.02.7] — 2026-02-25

### Changed
- **Swatch display names updated in `index.html`.** Visible swatch labels in both light and dark highlight sections renamed: "Yellow" → "Light Green", "Blue" → "Grass Green", "Magenta" → "Dark Green" (lines 968–978).
- **Glow card updated in `index.html`.** Text changed from "brand blue" to "brand grass green"; hover glow `rgba(43,195,255,...)` → `rgba(61,198,131,...)` to match `--brand-highlight-grass-green` (#3DC683).
- **Badge list text updated in `index.html`.** Mobile example component list changed from "yellow / blue / magenta / default" to "light green / grass green / dark green / default".

### Fixed
- **Dark-green text visibility in badges.** `.maia-badge-dark-green` text `color` changed from `var(--brand-highlight-dark-green)` (#15552E) to `var(--brand-highlight-grass-green)` (#3DC683) so text remains visible on dark backgrounds.
- **Light-green badge text visibility.** `.maia-badge-light-green` text `color` changed from `var(--brand-highlight-light-green)` (#B9F7CE) to `var(--brand-highlight-grass-green)` (#3DC683) so text remains visible on light backgrounds.
- **Hero accent-dark-green visibility.** `.hero-title .accent-dark-green` `color` changed from `var(--brand-highlight-dark-green)` to `var(--brand-highlight-grass-green)` to ensure readability in dark mode.

---

## [2026.02.6] — 2026-02-25

### Changed
- **Brand highlight palette replaced.** Old yellow/blue/magenta → new green palette, same values for light and dark mode:
  - `--brand-highlight-yellow` (#FFD400 light / #F9DE0A dark) → `--brand-highlight-light-green` (#B9F7CE)
  - `--brand-highlight-blue` (#139CFF light / #2BC3FF dark) → `--brand-highlight-grass-green` (#3DC683)
  - `--brand-highlight-magenta` (#FF68E3 light / #FF68FF dark) → `--brand-highlight-dark-green` (#15552E)
- **Updated files:** `tokens/brand-colors.yaml`, `tokens/colors.css`, `DESIGN-SYSTEM.md`, `components/shadcn-customizations.yaml`, `index.html`, `example-mobile.html`.
- **Tailwind v4 `@theme inline` mapping** updated to reference new variable names in `tokens/colors.css`.
- **Badge CSS classes renamed:** `.maia-badge-yellow` → `.maia-badge-light-green`, `.maia-badge-blue` → `.maia-badge-grass-green`, `.maia-badge-magenta` → `.maia-badge-dark-green`.
- **Dark-green readability fix.** Where `--brand-highlight-dark-green` (#15552E) would be invisible as text on dark backgrounds, `--brand-highlight-grass-green` (#3DC683) is used instead.

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
