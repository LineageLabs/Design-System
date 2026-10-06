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

## 003 — Avatar Standing Ring

**Date:** 2026-09-26
**Decision:** Encode a person's standing (proven / curated / member) on an avatar as a `box-shadow` ring — never a border, and never color alone.

**Rationale:**
- way.space's builder directory needed one glanceable mark that travels across a directory, a profile page, and forum cards, so readers learn what "proven" or "curated" means once and recognise it everywhere.
- A `box-shadow` ring with a 2px `--card`-colored gap doesn't shift avatar layout the way a border would, and reuses the existing adaptive brand-offset tokens (green for proven, lavender for curated) instead of adding new color tokens.
- Color is never sufficient on its own (rule 8): the ring must be backed by a `title`/`sr-only` label and a visible badge elsewhere on the surface.

**Consequences:**
- Any avatar carrying a standing signal uses the three ring variants (`proven` / `curated` / `member`) documented in `DESIGN-SYSTEM.md` §11, not a bespoke border treatment.
- The hairline "member" ring is the default/unstated state — it must not be omitted just because it's the least visually loud.

---

## 004 — Action Results Float as Toasts; Standing Conditions Stay Inline

**Date:** 2026-09-30
**Decision:** The result of a user action (success, warning, failure) is shown as a viewport-anchored, transient toast, never as a banner in page flow. Inline messaging is reserved for standing conditions: validation errors beside the inputs they concern, field-level notices, dirty-state bars and read-only notices. Error toasts stay until dismissed, and an Undo is offered wherever an inverse action exists.

**Rationale:**
- An in-flow banner belongs to whatever content is on screen when it renders. After an action that reloads or auto-advances, that content is often a different item. way.space's proposal queue showed "Approved — X" inside the *next* row's pane (way.space #761).
- A floating message survives the post-action data reload and row change without being tied to either.
- Undo is a lighter safeguard than a confirm dialog for reversible actions, and it keeps a queue workflow fast.

**Consequences:**
- Projects mount one toast host per shell and push to it from action handlers. They do not render result markup per page.
- Full conventions (timing, stacking, a11y, style) live in `DESIGN-SYSTEM.md` §6 "Toast (Action Feedback)".
- Decision number 003 is claimed by the open avatar-standing-ring PR (#9).

---

## 005 — Self-Hosted Fonts, and Lora Italic for Display Emphasis

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

## 006 — Header Facts as One Equal-Height Pill Row; Third-Party Logos Always Tiled

**Date:** 2026-10-06
**Decision:** A detail page's headline facts (score, community vote, canonical links) render as one row of pills that share a fixed-height shell and a 32px icon slot. An action that edits a fact (voting) lives inside that fact's pill. Every third-party logo renders inside one always-light, `object-contain`, padded tile, with an in-tile fallback.

**Rationale:**
- way.space's tool page had a score pill and a vote tally at different heights and treatments, a separate vote block further down the page, and outbound links buried in a sidebar. Visitors read the taller element as the more important fact, and the duplicated tally read as two numbers. One shell makes equal weight structural rather than a matter of discipline.
- Scraped logos arrive as square marks, favicons and transparent SVGs. Cropping (`object-cover`) cut off wordmarks. A dark tile in dark mode swallowed dark marks. A single tile fixes both for every surface at once.

**Consequences:**
- New header facts join the row as pills; they don't become freestanding badges.
- Any surface showing a third-party logo uses the tile, at one of four fixed sizes.
- Full conventions: `DESIGN-SYSTEM.md` §6 "Fact Pill Row (Page Header)" and §11 "Third-Party Logo Tile".



## Template

```
## NNN — Title

**Date:** YYYY-MM-DD
**Decision:** What was decided.

**Rationale:** Why this decision was made.

**Consequences:** What follows from this decision.
```
