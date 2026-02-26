# CLAUDE.md — LLM Quick-Start

> Read this file first when working on any project that uses this design system.

## What This Is

A reference bank — NOT a custom design system. **shadcn/ui is the design system.**
This repo documents our brand colors, animation standards (GSAP), component customizations,
and logo assets so every project stays consistent.

## Theme Configuration

| Setting | Value |
|---------|-------|
| **Style** | Maia — Soft and rounded, generous spacing |
| **Base Color** | Gray — Blue-tinted neutrals |
| **Radius** | Large (`--radius: 0.875rem`) |
| **Body Font** | Geist Sans |
| **Headline Font** | Poppins (h1–h4 only) |
| **Icons** | Hugeicons |

## Cardinal Rules

1. **Use shadcn/ui as-is.** Install via their CLI. Use the **Gray** base color theme with **Maia** style. Do not rebuild components from scratch.
2. **Brand colors are additive.** They do NOT replace `--primary`, `--background`, or any shadcn semantic token. Apply them only when the design explicitly calls for brand colors.
3. **Geist for body, Poppins for headlines.** Apply `font-family: "Poppins"` to h0–h4 elements only. h0 is a utility class (`.h0`) at weight 400 for display/hero text; h1–h4 use weights 600–800. Everything else uses Geist Sans.
4. **Hugeicons for icons.** Use `hugeicons-react` as the default icon library. Fallback to Lucide only if unavailable.
5. **GSAP for animation.** Use the presets in `animations/presets.js`. Do not invent new easing or duration values — use the tokens in `tokens/motion.yaml`.
6. **Respect reduced motion.** Every GSAP animation must check `prefers-reduced-motion` and fall back to instant or no animation.
7. **Never edit shadcn source.** Customise through CSS variable overrides, Tailwind utility composition, or wrapper components.
8. **Minimal color by default.** Use surfaces, greys, and neutrals (`--foreground`, `--muted-foreground`, `--border`) for the majority of the UI. Non-brand colors (e.g. red) should only appear when they add functional value (errors, warnings, destructive actions). Brand greens may be decorative but must still be purposeful — don't scatter color without intent.
9. **Prevent mobile overflow.** Minimum supported viewport: 320px. Apply global resets (`html { overflow-x: clip }`, `body { overflow-wrap: break-word }`, `img/video/svg { max-width: 100% }`). Wrap all tables in `.table-scroll` containers. Use `minmax(min(Xpx, 100%), 1fr)` for auto-fill grids. Clamp overlay widths (tooltips, toasts, popovers) to `calc(100vw - 3rem)`.

## Key Files (read in this order)

| Priority | File | What It Contains |
|----------|------|-----------------|
| 1 | `DESIGN-SYSTEM.md` | Full specification — colors, typography, motion, component rules, assets |
| 2 | `tokens/colors.css` | Copy-paste CSS variables (shadcn Gray theme + brand color block) |
| 3 | `tokens/brand-colors.yaml` | Brand color palette with strict usage rules |
| 4 | `tokens/motion.yaml` | Duration, easing, and stagger tokens |
| 5 | `tokens/spacing.yaml` | Spacing scale, semantic tokens, component spacing, guidelines |
| 6 | `tokens/breakpoints.yaml` | Breakpoint scale, responsive rules, container behavior, grid patterns |
| 7 | `animations/presets.js` | GSAP animation presets — entrance, exit, hover, scroll, logo |
| 8 | `animations/scroll-triggers.js` | GSAP ScrollTrigger pattern factories |
| 9 | `components/shadcn-customizations.yaml` | What we change from shadcn defaults |
| 10 | `assets/logos/README.md` | Logo variants, sizes, naming conventions |
| 11 | `CHANGELOG.md` | Version history — what changed and when |

## Changelog Rule

**Every change to this design system must be logged in `CHANGELOG.md`.**

When you modify any file in this repo (tokens, animations, components, docs, assets, demo pages), you must also update `CHANGELOG.md` following this process:

1. **Determine the version.** Versions use `YYYY.MM.patch` format. Increment the patch number from the latest entry (e.g. if the last version is `2024.02.5`, the next is `2024.02.6`). If the month has changed, reset the patch to `0`.
2. **Add a new entry at the top** (below the header, above the previous entry) with this format:
   ```markdown
   ## [YYYY.MM.patch] — YYYY-MM-DD

   ### Added / Changed / Removed
   - **Brief title.** Specific details of what changed, including old → new values where applicable.
   ```
3. **Categorize entries** using [Keep a Changelog](https://keepachangelog.com/) sections: `Added`, `Changed`, `Removed`, `Fixed`.
4. **Be specific.** Include token names, file paths, old vs new values. Someone scanning the log should understand exactly what changed without reading diffs.
5. **One entry per commit.** Each commit that touches design system files gets its own changelog version entry.

## Starting a New Project

```bash
# 1. Set up your framework (Next.js, Vite, etc.)
# 2. Install shadcn/ui with Gray base color, Maia style
npx shadcn@latest init  # Choose: Gray base color, Maia style
# 3. Install dependencies
npm install gsap hugeicons-react
# 4. Add Poppins for headlines
#    (via Google Fonts link or next/font)
# 5. Copy tokens/colors.css into your global stylesheet
# 6. Set font-family: "Poppins" on h1-h4 in your CSS
# 7. Import animation presets where needed
import { ENTRANCE, EXIT, HOVER } from "@/design-system/animations/presets";
```
