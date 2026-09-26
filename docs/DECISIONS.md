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

## Template

```
## NNN — Title

**Date:** YYYY-MM-DD
**Decision:** What was decided.

**Rationale:** Why this decision was made.

**Consequences:** What follows from this decision.
```
