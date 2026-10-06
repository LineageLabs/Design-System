# Design Decisions Log

Record significant design decisions here so future contributors (human or LLM) understand the reasoning.

---

## 001 — Foundation: shadcn/ui + GSAP

**Date:** 2026-02-24
**Decision:** Use shadcn/ui (Neutral theme) as the UI component system and GSAP v3 for all animations and transitions.

**Rationale:**
- shadcn/ui provides accessible, well-structured components built on Radix UI primitives with Tailwind CSS styling. Components are copy-pasted into projects (not imported from a package), giving full control without vendor lock-in.
- GSAP v3 is the industry standard for web animation — handles complex timelines, ScrollTrigger, and physics-based easing that CSS alone cannot match.
- The Neutral base color theme was chosen for maximum versatility across different project types.

**Consequences:**
- All projects must install shadcn/ui via their CLI and GSAP via npm.
- Brand colors are layered on TOP of shadcn defaults — never replacing semantic tokens.
- CSS-only transitions (transitions.css) are provided for simple hover/focus cases where GSAP would be overkill.

---

## 002 — Brand Colors as Additive Overrides

**Date:** 2026-02-24
**Decision:** Brand colors (#FAFAFA, #EAEAEA, #151515, and the highlight yellows/blues/magentas) are defined as separate `--brand-*` CSS custom properties and are NEVER used to override shadcn's `--primary`, `--background`, etc.

**Rationale:**
- Keeps the shadcn component system working predictably out of the box.
- Brand colors serve a different purpose (marketing, emphasis, illustrations) than semantic UI colors.
- Prevents accidental breakage when shadcn components expect their default tokens.

**Consequences:**
- Every use of a brand color must be an explicit, intentional choice.
- Standard UI remains consistent across all projects even if brand colors evolve.

---

## 004 — Self-Hosted Fonts, and Lora Italic for Display Emphasis

**Date:** 2026-10-06
**Decision:** Web fonts (Lora, Poppins, JetBrains Mono) are redistributed from this repo's `fonts/` directory and served from each app's own origin. No app loads anything from `fonts.googleapis.com` / `fonts.gstatic.com`. At the same time the "Lora is never italic" rule is replaced: display headlines stay upright, but a word or two of `<em>` emphasis inside them is set in the real Lora italic face, which `fonts/fonts.css` now ships.

**Rationale:**
- A Google Fonts `<link>` sends every visitor's IP address and user agent to Google before any consent; LG München I held that to breach the GDPR (20 January 2022, 3 O 17493/20). Both products position themselves as needing no cookie banner, and their privacy policies have to describe third parties truthfully.
- Browsers partition HTTP caches per top-level site, so the shared-CDN argument for Google Fonts no longer holds; self-hosting removes two third-party connections and a render-blocking stylesheet.
- All three families are OFL 1.1, which permits redistribution with the licence text alongside.
- Italic emphasis in Lora hero headlines was already the house style in way.space and way.je ("Agent tools you can *actually trust.*"). Only upright Lora was loaded, so browsers synthesised the slant — the one thing worse than either real italic or no italic. Self-hosting is the moment to ship the real face.
- JetBrains Mono stays (way.space decision on #847): the blueprint module's eyebrows and install one-liners are a deliberate product signature, and the variable file is one request.

**Consequences:**
- Apps `@import` `fonts/fonts.css` (and `fonts/fonts-blueprint.css` with the blueprint module) from their global stylesheet and let the bundler hash the files; they preload the one or two files the first viewport needs.
- Rule 5 (justified font loads) now reads on what a page renders rather than on a `<link>` query; new Rule 6 forbids the Google Fonts load outright.
- Lora italic is `<em>` inside `.h0` / `h1` only — never a whole headline, never Poppins. `components.css` carries the explicit `.h0 em, h1 em` rule.
- Refreshing a font version is a repo change (`fonts/README.md` recipe), not a CDN drift.

---

## Template

```
## NNN — Title

**Date:** YYYY-MM-DD
**Decision:** What was decided.

**Rationale:** Why this decision was made.

**Consequences:** What follows from this decision.
```
