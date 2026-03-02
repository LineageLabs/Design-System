# Changelog

All notable changes to this design system are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/). Versions use calendar-based numbering (`YYYY.MM.patch`).

---

## [2026.03.11] — 2026-03-02

### Changed
- **DESIGN-SYSTEM.md §2 — "Font Usage Rules" Rule 1 rewritten.** Removed the screen-type distinction (functional = max 2 families; editorial = up to 3). Replaced with a role-based table: any screen may use all three families when the heading hierarchy calls for it. Rule renamed from "Screen-Type Font Budget" to "Font Family Roles". The ❌ example for "3 families on an app screen" removed; new ❌ examples cover using Poppins/Lora on UI chrome elements instead.
- **DESIGN-SYSTEM.md §2 — Rule 3 heading + intro updated.** Renamed from "Single-Family Hierarchy" to "Hierarchy Within System UI". Opening sentence no longer frames System UI as a constraint — it's guidance for screens that have no h1–h4 headings rather than a restriction on all functional screens.
- **DESIGN-SYSTEM.md §2 — preamble sentence updated.** Removed "Visual hierarchy must be built… not by adding font families" (implied families were always bad); replaced with "Font families are used purposefully by role — not for arbitrary visual contrast."
- **`CLAUDE.md` Cardinal Rule 3 updated.** Added explicit note that all three families may coexist on the same screen when the heading hierarchy warrants it (e.g. landing page with h1 + h2 subheadings).

---

## [2026.03.10] — 2026-03-02

### Added
- **Pitch Deck example (§11) — `example-pitchdeck.html`.** 1280×720 dark-background Series A slide for fictional "Aria" payments startup. Left column: series badge, Lora 700 headline (3.1rem), System UI subtitle, 3-stat row (ARR / MoM / customers), wordmark. Right column: radial glow, decorative ring, large logomark badge. Displayed in index.html in a browser-chrome frame at `scale(0.625)` → 800×450.
- **Landing Page example (§12) — `example-landing.html`.** 1280×800 desktop hero for "Aria". Frosted nav bar (logo + 4 links + CTA button), eyebrow beta badge, Lora 700 italic h1 (3.875rem), subtitle, CTA pair (filled blue + ghost), social proof strip. Radial bloom + grid-line overlay in background. Displayed at `scale(0.625)` → 800×500 in a browser-chrome frame.
- **Customer Review Platform example (§13) — `example-reviews.html`.** 390×780 mobile screen for "Trustflow". App bar, rating summary (4.7 ★, 2,341 reviews, 5-row CSS width breakdown bars), filter chips (All / 5★ / 4★ / Verified / Recent), 2 review cards (name, stars, date, text, helpful CTA, verified badge), write-review input bar pinned to bottom. System UI only — zero web fonts loaded.
- **Nav links** for §11–13 (`#pitchdeck`, `#landing`, `#reviews`) added to site navigation in `index.html`.
- **SvelteKit framework tag** (lavender pill badge) on each of the 3 new "Open standalone" cards, distinguishing them from the plain-HTML mobile example.
- **Svelte component comment skeletons** at the top of all 3 new standalone HTML files.

---

## [2026.03.9] — 2026-03-02

### Added
- **DESIGN-SYSTEM.md §2 — "Font Usage Rules" subsection (5 rules).** New subsection inserted between the CSS Setup code block and §3, defining auditable rules for font minimisation: (1) Screen-Type Font Budget — max 2 families on functional app screens; (2) Poppins Heading-Only Constraint — Poppins only on h2–h4, never on UI chrome; (3) Single-Family Hierarchy — achieve all contrast via weight/size/colour, not font switching; (4) UI Chrome = System UI — whitelist of always-System-UI elements; (5) Web Font Load Justification — omit unused families per page. Each rule includes a ✅/❌ audit example.
- **`index.html` — "Fonts in use on this screen" legend card in the Mobile Example section.** New card (green left-border accent) inserted between "Animation patterns" and "Open standalone" cards. Shows two live font samples (Lora h1 greeting + System UI body weight), per-family annotations, and a footer line "2 FAMILIES · POPPINS NOT LOADED" confirming the reduced font budget.

### Changed
- **`example-mobile.html` — removed Poppins from `.app-bar-logo` and `.stat-value`.** Both rules incorrectly applied `font-family: "Poppins", sans-serif` to UI chrome elements (app bar title and stat card numbers). Properties removed; both elements now inherit System UI from `body`. Visual result is identical — `font-weight: 700` in System UI is sufficient at these sizes. Screen now demonstrates 2-family budget: System UI (all UI) + Lora (h1 greeting).
- **`example-mobile.html` — removed Poppins from Google Fonts `<link>`.** `&family=Poppins:wght@600;700;800` removed from the font URL per Rule 5. No h2–h4 headings appear on the mobile screen, so the Poppins request was unjustified. Font URL now loads Lora only.

---

## [2026.03.8] — 2026-03-02

### Changed
- **way\*ID badge: border-radius back to design system default.** `9999px → var(--radius)` (0.875rem) on `.logo-badge` and `.logo-badge-dark`.
- **way\*ID badge: simplified reveal animation.** Replaced 3-phase char-stagger + glow-pulse with a single `scale 0.94→1 / opacity 0→1, back.out(1.7), 300ms` tween. Removed `splitBadgeChars()` function; asterisk span is now in HTML directly.
- **`*` coloured in all badge instances (static and animated).** `*` is now wrapped in `<span class="logo-badge-asterisk">` in all HTML instances. CSS rule sets `color: var(--brand-offset-lavender)` by default; animated badges still cycle through all 4 offset accents post-reveal. Updated `index.html`, `assets/logos/README.md`.

---

## [2026.03.7] — 2026-03-02

### Changed
- **way\*ID badge redesigned to outline style (Figma update).** Badge is now transparent-background with a solid border instead of a filled pill.
  - Light mode: `background: transparent`, `color: --brand-highlight-navy`, `border: 1.5px solid --brand-highlight-navy`
  - Dark mode: `background: transparent`, `color: --brand-highlight-light`, `border: 1px solid --brand-highlight-light`
  - Border-radius updated `15px → 9999px` (true pill); font-weight `500 → 600`; letter-spacing `-0.05em → -0.08em`
  - Updated in `index.html` (CSS, all demo instances, spec table), `assets/logos/README.md`, `DESIGN-SYSTEM.md`

### Added
- **Asterisk color-cycling animation on way\*ID badge.** After the reveal completes, the `*` character cycles through `--brand-offset-lavender → --brand-offset-green → --brand-offset-yellow → --brand-offset-coral` every 1.4s with a 350ms `power2.inOut` crossfade. CSS variables are re-read each cycle to respect live dark/light mode switches. Reduced motion: static lavender color, no cycling.
  - New `startAsteriskCycle(badgeEl)` function in `index.html`
  - `splitBadgeChars()` updated to add `logo-badge-asterisk` class to the `*` span
  - `resetBadge()` updated to kill any active cycle before reset
  - `playBadgeReveal()` glow colors updated from old green rgba values to navy/light rgba matching new brand

---

## [2026.03.6] — 2026-03-02

### Changed
- **Body font changed from Geist Sans to native system font stack.** All body text, UI, buttons, and inputs now use `system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`. No install required. Updated across `index.html`, `example-mobile.html`, `DESIGN-SYSTEM.md` (removed `npm install geist` step), `CLAUDE.md`, and `components/shadcn-customizations.yaml`.

---

## [2026.03.5] — 2026-03-02

### Changed
- **Navy and dark surface color updated: #1A1E4C → #0E1233.** Affects `--brand-highlight-navy` and `--brand-surface` (dark mode) across all files: `tokens/colors.css`, `tokens/brand-colors.yaml`, `index.html` (CSS vars, swatches, spec table, Get Started snippet), `example-mobile.html` (CSS vars).

---

## [2026.03.4] — 2026-03-02

### Fixed
- **`example-mobile.html` — replaced old green brand tokens with new blue palette.** Updated `:root` and `.dark` brand variable blocks to match `tokens/colors.css` (removed `--brand-highlight-light-green`, `--brand-highlight-grass-green`, `--brand-highlight-dark-green`; added full `--brand-*` set). Badge CSS remapped (lavender tint / blue / navy). Phone-frame and bottom-nav backgrounds → `--brand-surface`. Notification dot, avatar circle → `--brand-highlight-blue`. Toast success icon → `--brand-offset-green`. Added Lora for h1 to match main font rules.
- **`index.html` logo section — replaced hardcoded old green hex values.** `.logo-badge-dark` and `.logo-text-dark` CSS now use `--brand-highlight-light` / `--brand-highlight-navy`. Removed stale grass-green asterisk override; `--brand-highlight-blue` used consistently for `*` in both variants. way\*ID and Lineage\*Labs spec tables updated to show new token names and swatches.

---

## [2026.03.3] — 2026-03-02

### Changed
- **Lora (serif) added as display and h1 font.** h0 (`.h0`) and h1 now use `"Lora", Georgia, serif` instead of Poppins. h2–h4 remain on Poppins. Updated `DESIGN-SYSTEM.md` (§2 Font Stack, Installation, CSS Setup, Cardinal Rule 6), `CLAUDE.md` (Theme Configuration table + Rule 3), and `index.html` (Google Fonts link, CSS rules, typography demo, Get Started snippet). Google Fonts URL updated to load `Lora:ital,wght@0,400;0,700;1,400` alongside `Poppins:wght@600;700;800`.
- **Get Started code snippet in `index.html` — brand token values corrected.** Step 5 previously showed stale hex values from before the rebrand; now shows the current correct values matching `tokens/colors.css`.

---

## [2026.03.2] — 2026-03-02

### Changed
- **Brand highlight hex values corrected (tokens/colors.css, tokens/brand-colors.yaml, index.html).**
  - `--brand-highlight-blue`: #4D5EC0 → #4751B0
  - `--brand-highlight-navy`: #1C2155 → #1A1E4C
  - `--brand-highlight-light`: #EEEEFF → #F0F0F0
  - `--brand-surface` (light): #F4F4FA → #F0F0F0
  - `--brand-surface` (dark): #101228 → #1A1E4C
  - `--brand-surface-blue`: #3A4BBA → #4751B0
  - `--brand-surface-grey` (dark): #1E2050 → #252963
- **Offset accents are now mode-dependent.** Light and dark/blue surfaces use different offset values for better contrast. Updated `:root` and `.dark` blocks in both `tokens/colors.css` and `index.html`:
  - `--brand-offset-lavender`: light #A6A1E2 / dark #B4AFE7
  - `--brand-offset-green`: light #A0D246 / dark #D5FD8D
  - `--brand-offset-yellow`: #FFD27D (same across modes)
  - `--brand-offset-coral`: light #F0936B / dark #E99F80
- **Swatch section in index.html** split into "Offset Accents — Light surface" and "Highlights + Offsets — Dark / Blue surface" panels showing both offset tone sets.
- **tokens/brand-colors.yaml** updated with dual `hex_light`/`hex_dark` fields for all offset tokens, corrected surface hex values, added `dark_grey` surface entry (#252963).

---

## [2026.03.1] — 2026-03-02

### Changed
- **Brand color palette replaced — green → blue/indigo (§4, tokens/brand-colors.yaml, tokens/colors.css).**
  Full rebrand from a green-based palette to a blue/indigo palette across all three files.
  - `--brand-highlight-grass-green` (#3DC683) → `--brand-highlight-blue` (#4D5EC0)
  - `--brand-highlight-light-green` (#B9F7CE) → `--brand-highlight-light` (#EEEEFF)
  - `--brand-highlight-dark-green` (#15552E) → `--brand-highlight-navy` (#1C2155)
  - `--brand-surface` (light) #FAFAFA → #F4F4FA
  - `--brand-surface` (dark) #151515 → #101228
  - `--brand-surface-grey` #EAEAEA → #E4E4EE (light) / #1E2050 (dark)
- **Added `--brand-surface-blue` (#3A4BBA).** New token for blue-mode marketing/hero section backgrounds. No equivalent previously existed.
- **Added four offset accent tokens.** New supplementary palette consistent across all modes:
  - `--brand-offset-lavender`: #9C91C8
  - `--brand-offset-green`: #8DC540
  - `--brand-offset-yellow`: #F3C438
  - `--brand-offset-coral`: #E05840
- **All brand variable references in `index.html` renamed** to match new token names (bulk replace, 106 occurrences). Swatch display section, code snippets, and CSS all updated.
- **`tokens/brand-colors.yaml` rewritten** with new palette structure: highlights (blue/navy/light), surfaces (light/grey/blue/dark), offsets (lavender/green/yellow/coral), updated usage philosophy adding Tier 3 offset rules and new contrast warnings.

---

## [2026.03.0] — 2026-03-02

### Added
- **CSS Transitions subsection (§5).** Documents `animations/transitions.css` utility classes (`.transition-*`, `.hover-lift`, `.hover-press`, `.hover-fade`, `.focus-ring`), when to use CSS vs. GSAP, and how the built-in reduced-motion block works.
- **Reduced Motion implementation guide (§5).** Code examples for `prefersReducedMotion()` and `applyPreset()` named exports from `animations/presets.js`; documents internal reduced-motion handling in all `animations/scroll-triggers.js` factory functions.
- **`revealLeft`, `revealRight`, `pinSection()` in scroll presets table (§5).** Previously undocumented exports now included with trigger/effect/scrub values and a usage example for `pinSection()`.
- **Hover column in Animation Assignments table (§6).** Adds Hover column to component animation table: `Card` (interactive) → `hover-lift`, `Button` → `hover-press`. Added `NavigationMenu` → `fadeIn` row. Fixed `Accordion` exit from `reverse` → `reverse expandIn`.
- **Chart Color Token Reference table (§6).** Maps `--chart-1` through `--chart-5` to data series roles (primary → quinary) with light/dark color descriptions and series-order assignment rule.
- **Sidebar Tokens subsection (§4).** Documents all 8 `--sidebar-*` tokens from `tokens/colors.css` with purpose descriptions and usage guidance.
- **Tailwind v4 @theme block note (§4).** Explains the commented-out `@theme inline` block in `tokens/colors.css` and when to copy it into a project.

### Fixed
- **Icon stroke weight contradiction (§9).** Clarified that `1.5` is the fallback for uncategorized contexts; per-context rules now take explicit precedence. Renamed "Stroke weight consistency" to "Stroke weight by context".
- **Mobile sidebar collapse pattern (§8).** Replaced vague "Stacked — sidebar below or hidden" with specific `Sheet` component guidance and `min(280px, calc(100vw - 3rem))` width rule.
- **400ms duration note (§5).** Explains why `slideIn*` presets use 400ms (intentional intermediate, not a named token) and links to `tokens/motion.yaml` as the authoritative token list.
- **h0 vs .hero-title ambiguity (§2).** Added blockquote note that `.hero-title` was deprecated in `[2026.02.19]` and `.h0` is the canonical display-scale class.
- **Parallax effect value (§5).** Corrected `yPercent: -15` value in scroll presets table to match actual `parallax()` factory function default in `animations/scroll-triggers.js`.

---

## [2026.02.24] — 2026-02-26

### Added
- **Vertical content clipping prevention rules.** New "Vertical Content & Fixed-Height Containers" subsection in `DESIGN-SYSTEM.md` § 8 with 5 rules: `min-height` not `height` for sections, slides must scroll on mobile (`overflow-y: auto` below `md:`), no `overflow: hidden` on content containers, `dvh` not `vh` for viewport units, reduce density or enable inner scroll. Includes CSS do/don't code examples with `vh` fallback pattern.
- **`tokens/breakpoints.yaml` vertical overflow rules.** Five new rules (18–22) covering `min-height`, slide scroll, `overflow: hidden` restriction, `dvh` vs `vh`, and content density. New `vertical_overflow` block in `overflow_prevention` section.
- **`components/shadcn-customizations.yaml` vertical overflow entries.** New `vertical` block in `overflow_rules` with section height, viewport unit, `overflow: hidden`, and carousel slide guidance.
- **`index.html` vertical content subsection.** New "Vertical Content & Fixed Heights" subsection in responsive section with 5-rule reference table, CSS code block (min-height/dvh/slide scroll patterns), and 3 guideline cards.

### Changed
- **`DESIGN-SYSTEM.md` § 8 guidelines.** Expanded from 10 to 11 guidelines (added "No vertical content clipping" at #11).
- **`CLAUDE.md` cardinal rule 9.** Appended vertical overflow guidance: `min-height` over `height`, `overflow-y: auto` for slides, `dvh` over `vh`.

---

## [2026.02.23] — 2026-02-26

### Added
- **Mobile content overflow prevention rules.** New "Mobile Content Overflow Prevention" subsection in `DESIGN-SYSTEM.md` § 8 with 9 numbered rules: minimum viewport (320px), table scroll wrappers, code block overflow, long text wrapping (`overflow-wrap: break-word`), safe grid minimums (`minmax(min(Xpx, 100%), 1fr)`), media containment (`max-width: 100%`), overlay viewport clamping (`calc(100vw - 3rem)`), inline grid collapse, horizontal scroll blocking (`overflow-x: clip` on html). Includes CSS code block for global resets and safe grid pattern example. § 8 guidelines expanded from 9 to 10.
- **`tokens/breakpoints.yaml` overflow prevention block.** New `overflow_prevention` section with minimum viewport (320px), global CSS rules, grid safe minimum calculations at 320px/360px/375px viewports, safe pattern, and overlay max-width spec. Nine new rules (9–17) added to `rules:` section covering minimum viewport, table scroll, code overflow, long text, safe grids, media containment, overlay clamping, inline grid collapse, and `overflow-x: clip`.
- **`components/shadcn-customizations.yaml` overflow rules.** New `overflow_rules` section with global CSS rules and `overlay_components` block adding `max-width: calc(100vw - 3rem)` to Toast, Tooltip, Popover, and DropdownMenu.
- **`index.html` overflow prevention CSS.** Global `overflow-x: clip` on html, `overflow-wrap: break-word` on body, `max-width: 100%; height: auto` on media elements, `.table-scroll` class. Toast `max-width: calc(100vw - 3rem)` added.
- **`index.html` table scroll wrappers.** All 9 `.token-table`/`.comp-table` instances wrapped in `<div class="table-scroll">` for horizontal scrolling on narrow viewports.
- **`index.html` responsive section documentation.** New "Mobile Overflow Prevention" subsection with 9-rule reference table, global CSS reset code block, and safe grid pattern code block.
- **`CLAUDE.md` cardinal rule 9.** "Prevent mobile overflow" — global resets, table wrappers, safe `minmax()`, overlay clamping, 320px minimum.

### Changed
- **`index.html` grid patterns.** All `minmax(Xpx, 1fr)` patterns updated to `minmax(min(Xpx, 100%), 1fr)`: `.card-grid` (220px), and inline grids at 200px, 220px, 240px, 280px. Prevents horizontal overflow on viewports narrower than the minimum value.
- **`index.html` mobile media query.** Expanded `@media (max-width: 640px)` to collapse all inline multi-column grids in `.comp-demo-section` to single-column.
- **`DESIGN-SYSTEM.md` § 8 guidelines.** Expanded from 9 to 10 guidelines (added "Prevent mobile overflow" at #10).

---

## [2026.02.22] — 2026-02-26

### Added
- **Fluid typography `clamp()` values for h1 and h2.** `h1: clamp(2rem, 4vw, 2.75rem)` (32px → 44px), `h2: clamp(1.5rem, 3vw, 1.75rem)` (24px → 28px). Previously only `h0` had a fluid value. Added to `DESIGN-SYSTEM.md` CSS setup, responsive typography table, and `index.html` (global CSS rules, typography preview, responsive section fluid typography table). `tokens/breakpoints.yaml` rule `3_fluid_typography` updated with all four values.
- **Mobile compaction rules.** New "Mobile Compaction Rules" subsection in `DESIGN-SYSTEM.md` § 8 documenting: section spacing drops one step below `md:` (e.g. `section-lg` 96px → 64px), layout gaps `gap-lg`/`gap-xl` drop one step, and explicit "compresses vs. stays fixed" reference table. Component padding, small/medium gaps, border radius, and touch targets explicitly marked as fixed.
- **`tokens/breakpoints.yaml` mobile compaction section.** New `mobile_compaction` block with `section_spacing` (all four tiers with desktop/mobile/tailwind values), `gap_scaling` (five gap tokens with compress flags), and `never_compresses` list. New rule `8_restructure_not_hide`.
- **`tokens/spacing.yaml` responsive annotations.** Section spacing tokens (`section-sm` through `section-xl`) now include `mobile` and `tailwind_responsive` values. Gap tokens `gap-lg`/`gap-xl` now include `mobile` and `tailwind_responsive` values. `responsive` guideline expanded with full compaction rules.
- **`index.html` responsive section updates.** Fluid typography reference table, mobile compaction spacing table, "compresses vs. stays fixed" comparison cards, and updated guideline cards (added "restructure, don't hide" and merged spacing compression rules).

### Changed
- **`DESIGN-SYSTEM.md` § 8 guidelines.** Expanded from 7 to 9 guidelines: added gap compression rule (7) and "restructure, don't hide" rule (9).
- **`index.html` typography preview.** h1 and h2 now use global `clamp()` rules instead of inline `font-size` overrides.

---

## [2026.02.21] — 2026-02-26

### Added
- **Responsive design rules and breakpoints.** New `tokens/breakpoints.yaml` with Tailwind-aligned breakpoint scale (mobile/sm/md/lg/xl), mobile-first philosophy, container behavior, grid patterns, and 7 responsive guidelines. `md:` (768px) designated as the primary layout shift breakpoint.
- **§8 Responsive section in `DESIGN-SYSTEM.md`.** Breakpoint reference table, container CSS, layout patterns (card grid, sidebar), typography rules (clamp over breakpoints), "what changes vs. stays fixed" table, and 7 numbered guidelines. Sections §8–§10 renumbered to §9–§11. `tokens/breakpoints.yaml` added to §11 File Map.
- **Responsive section in `index.html`.** Live breakpoint reference table, responsive grid demo (1→2→3 columns on resize with live breakpoint indicator), container/gutter visualization, "what changes" table, and guideline cards. Nav link added. Sections 05–09 renumbered to 06–10.
- **`tokens/breakpoints.yaml` added to `CLAUDE.md` Key Files table** at priority 6. Subsequent priorities shifted +1.

---

## [2026.02.20] — 2026-02-25

### Fixed
- **Radius conflict in `components/shadcn-customizations.yaml`.** Header comment and `general_rules` both incorrectly stated `0.75rem`. Corrected to `0.875rem` in both places to match `DESIGN-SYSTEM.md`, the Maia style spec, and `--radius` token value.
- **`HOVER.glow` wrong color in `animations/presets.js`.** Glow color was `rgba(43, 195, 255, …)` (blue — not a brand color). Corrected to `rgba(61, 198, 131, 0.35)` (grass green, `#3DC683`).

### Changed
- **`assets/logos/README.md` fully rewritten.** Previous content described generic placeholder SVG file slots. Now documents both actual logo variants with full CSS, HTML usage examples, animated reveal specs, size table, and usage rules: `way*ID` badge (pill, light/dark invert) and `Lineage*Labs` wordmark (Poppins 600, grass-green asterisk).
- **`DESIGN-SYSTEM.md` exit presets table.** Added missing `slideOutLeft` and `slideOutRight` rows — both existed in `animations/presets.js` and were assigned to Sheet animations but were absent from the documentation table.
- **`DESIGN-SYSTEM.md` logo animation section.** Replaced generic `createLogoReveal()` description with actual logo specs: `way*ID` badge (color tokens, 3-phase animation) and `Lineage*Labs` wordmark (color tokens, 3-phase animation). Generic factory still documented below.

---

## [2026.02.19] — 2026-02-25

### Changed
- **Hero title now uses h0 display style.** `.hero-title` changed from `font-weight: 800` / `clamp(2.5rem, 6vw, 4rem)` / `line-height: 1.05` / `letter-spacing: -0.02em` → `font-weight: 400` / `clamp(3.5rem, 8vw, 6rem)` / `line-height: 1.0` / `letter-spacing: -0.03em`. Matches the `.h0` utility class spec (Poppins 400, display scale). Mobile breakpoint updated from fixed `2rem` to `clamp(2rem, 8vw, 3.5rem)` for smoother scaling.

---

## [2026.02.18] — 2026-02-25

### Added
- **Lineage\*Labs text wordmark logo variant.** New logo type alongside existing way\*ID badge. Poppins 600, `font-size: 36px`, `line-height: 54px`, `letter-spacing: -0.05em`. Light mode: `#15552E` text. Dark mode: `#B9F7CE` text. Asterisk uses grass green (`#3DC683`) as accent color in both modes.
- **`.logo-text` and `.logo-text-dark` CSS classes.** Styles for Lineage\*Labs wordmark with automatic light/dark mode switching. `.logo-asterisk` class for the accent-colored `*` character.
- **Lineage\*Labs light/dark static panels.** Three sizes each (36px, 24px, 16px) on light and forced-dark backgrounds.
- **Lineage\*Labs animated reveal (light + dark).** Three-phase GSAP animation: Phase 1 — characters stagger from left with `blur(6px)→0` + `x:-16→0` + `y:8→0` (0.04s stagger, 400ms, `power2.out`). Phase 2 — asterisk scale pop `1→1.3→1` with `back.out(3)`. Phase 3 — text-shadow glow pulse `0→20px→0`. Added `splitWordmarkChars()` helper that preserves `.logo-asterisk` span while splitting surrounding text into individual `<span class="logo-char">` elements.
- **Lineage\*Labs spec reference table.** Text color, asterisk color, font, default size, and animation breakdown.

### Changed
- **Logo section reorganized with sub-headings.** Section now has "way\*ID Badge" and "Lineage\*Labs Wordmark" sub-sections, each with light/dark static panels and animated reveals, separated by a divider. Updated section description to reference both variants.
- **Spec table split into two.** Separate spec reference tables for way\*ID Badge and Lineage\*Labs Wordmark.

---

## [2026.02.17] — 2026-02-25

### Changed
- **Removed "Lineage HQ" wordmark from entire Logo section.** All panels (light mode, dark mode, animated reveal) now show badge-only at three sizes (22px, 15px, 12px). Simplified light/dark panels to single-row badge displays. Removed replay buttons and scroll-triggered animations from static size panels (only the animated reveal demos have those).
- **Logo animated reveal is a badge-only 3-phase GSAP sequence.** Phase 1 — pill materializes from `scale:0.9` with `back.out(1.7)` overshoot + `blur(8px)→0` dissolve (450ms). Phase 2 — characters stagger from center outward (radiating from the `*`) with `blur(4px)→0` + `y:6→0`, `power2.out`, 0.05s stagger, 300ms each. Phase 3 — dual-layer glow pulse (tight 16px + wide 40px) in brand green, `power2.out`→`power2.in`, 650ms. Total ~1s.
- **Split-character rendering for animated badges.** `splitBadgeChars()` wraps each character in `<span class="logo-char">` with `will-change: filter, opacity, transform` for GPU acceleration.

### Removed
- **All "Lineage HQ" wordmarks from Logo section.** Removed from light mode panel, dark mode panel, and animated reveal demos. Removed associated `wireReplay` calls, scroll-trigger entries, and wordmark-specific CSS classes from logo demos.

---

## [2026.02.15] — 2026-02-25

### Added
- **Logo section in `index.html` (Section 02).** New dedicated logo page section with: light mode variants (large, default, small, badge-only), dark mode variants (same four sizes on forced-dark panel), side-by-side animated reveal demo (light + dark), usage rules (clear space, minimum size, no modifications, mode matching), and full spec reference table (colors, borders, radius, fonts, animation).
- **`.logo-badge-dark` CSS class.** Hardcoded dark-mode logo badge variant (`#B9F7CE` bg, `#15552E` text/border) for use in always-dark preview panels independent of theme toggle.
- **GSAP scroll-triggered logo reveals.** Four `ScrollTrigger.create()` instances auto-play logo animations when light-large, dark-large, anim-light, and anim-dark demos enter viewport. Refactored existing logo reveal into reusable `playReveal()` / `wireReplay()` helpers.
- **Logo nav link.** Added "Logo" to site header navigation.

### Changed
- **Section numbering.** Renumbered sections: Logo is now Section 02; Brand Colors → 03, Spacing → 04, Motion → 05, Animations → 06, Components → 07, Get Started → 08, Mobile Example → 09.

---

## [2026.02.14] — 2026-02-25

### Added
- **h0 display headline.** New `.h0` utility class: Poppins weight 400, `clamp(3.5rem, 8vw, 6rem)`, line-height 1.0, letter-spacing -0.03em. For hero/landing display text. Added to `index.html` (CSS + typography preview), `DESIGN-SYSTEM.md` (font stack table, CSS setup, cardinal rule), `shadcn-customizations.yaml` (typography block), and `CLAUDE.md` (cardinal rule 3).
- **Poppins 400 weight in Google Fonts import.** Added `400` to `wght` axis in `index.html` and `DESIGN-SYSTEM.md` font link examples.

---

## [2026.02.13] — 2026-02-25

### Changed
- **Logo updated to way\*ID pill badge in `index.html`.** Replaced placeholder grid-square icon (`.logo-icon`) with new `.logo-badge` pill. Light mode: dark green bg (#15552E), light green text (#B9F7CE). Dark mode: light green bg (#B9F7CE), dark green text + border (#15552E). Poppins 500, 15px, -0.05em letter-spacing, `border-radius: 15px`. Applied to both header logo and Logo Reveal animation demo.

---

## [2026.02.12] — 2026-02-25

### Added
- **Icon hover, focus-visible, and active states in `index.html`.** New `.icon-btn` (toolbar), `.icon-tile` (quick-action), and `.nav-icon` (navigation) CSS classes with `:hover` (muted background), `:focus-visible` (`--ring` outline), and `:active` (scale 0.95) states. Replaces inline JS `onmouseenter`/`onmouseleave` handlers with proper CSS. All three icon demo sections now keyboard-accessible via Tab.

### Fixed
- **Feature badge (`.anim-tag`) dark mode contrast.** In dark mode, text color changed from `--brand-highlight-grass-green` (#3DC683) → `--brand-highlight-light-green` (#B9F7CE), background opacity raised 12% → 18%, border opacity raised 30% → 40%.
- **`.maia-badge-light-green` dark mode contrast.** Text was `--brand-highlight-dark-green` (#15552E) on a translucent light-green bg — nearly invisible on dark backgrounds. Now uses `--brand-highlight-light-green` text on a 50% dark-green tinted bg with 35% grass-green border.

---

## [2026.02.11] — 2026-02-25

### Added
- **Chart component spec.** New `Chart` entry in `DESIGN-SYSTEM.md` § 6 and `shadcn-customizations.yaml`. Defines Recharts-backed chart in Maia card shell, `--chart-1..5` tokens, bar radius, grid/axis/tooltip/legend styling, and 5 rules.
- **Card with Image variant.** New `CardImage` entry in `DESIGN-SYSTEM.md` § 6 and `shadcn-customizations.yaml`. Image-top card with `aspect-ratio: 16/9` default, `overflow: hidden`, `bg-muted` fallback, `1.25rem 1.5rem 1.5rem` body padding.
- **Field component spec.** New `Field` entry in `DESIGN-SYSTEM.md` § 6 and `shadcn-customizations.yaml`. Wrapper pattern for label + input + description + error. Includes select (pill-shaped) and textarea (`rounded-xl`) sub-variants, error ring at 25% destructive.
- **Icons demo section in `index.html`.** Live demos for all three icon contexts (inline/toolbar, quick-action tile, navigation) with dark mode callout box explaining `currentColor` behavior.
- **Icon dark mode guidelines in `DESIGN-SYSTEM.md` § 8.** New "Dark Mode" subsection with do/don't table, explanation of why `currentColor` works across modes, and common dark mode icon bugs.
- **Demo sections in `index.html`.** Added live Chart (bar chart + color reference), Card with Image (3 variants), and Field (email, password/error, select, textarea) demos to the Maia Components section.
- **Dark mode shadow overrides.** Added `.dark` box-shadow rules for `.maia-chart`, `.maia-card-image`, `.maia-field-select:focus`, `.maia-field-textarea:focus`.

### Changed
- **Maia radius table.** Added Card with Image, Chart, Select, and Textarea rows.
- **Component spacing table.** Added Chart, Card (image), Field, and Textarea rows.

---

## [2026.02.10] — 2026-02-25

### Added
- **Icon color & background guide.** New subsection in `DESIGN-SYSTEM.md` § 8 (Icons) documenting four icon contexts (inline/toolbar, quick-action tile, primary FAB, navigation) with prescribed color, background, size, and stroke-weight for each. Six rules: one treatment per context, `currentColor` by default, neutral backgrounds for containers, brand only by explicit design, consistent sizing, consistent stroke weight.

### Changed
- **`example-mobile.html` quick-action icons standardized.** All four icons (Add Task, Schedule, Focus, Reports) now use the same treatment:
  - Background: `color-mix(in srgb, var(--muted-foreground) 10%, transparent)` (was mixed: `--primary` 10%, `--brand-highlight-grass-green` 12%, `--brand-highlight-dark-green` 12%, `--muted-foreground` 10%).
  - Stroke: `currentColor` (was mixed: `currentColor`, `var(--brand-highlight-grass-green)`, `var(--brand-highlight-grass-green)`, `currentColor`).
  - Stroke-width: all `2` (was mixed: `2.2`, `2`, `2`, `2`).

---

## [2026.02.9] — 2026-02-25

### Changed
- **Brand badge variants — increased visual distinction.** The three brand badge tiers (light-green, grass-green, dark-green) were nearly identical; now form a clear soft → mid → bold progression.
  - `maia-badge-light-green`: bg `15%` → `25%` light-green, text `--brand-highlight-grass-green` → `--brand-highlight-dark-green`, border `30%` → `40%`.
  - `maia-badge-grass-green`: unchanged (mid tier baseline).
  - `maia-badge-dark-green`: bg `15% dark-green` → solid `--brand-highlight-dark-green`, text `--brand-highlight-grass-green` → `--brand-highlight-light-green`, border solid.
- Updated in `index.html`, `example-mobile.html`, and `components/shadcn-customizations.yaml`.

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
