# CLAUDE.md — LLM Quick-Start

> Read this file first when working on any project that uses this design system.

## What This Is

A reference bank — NOT a custom design system. **shadcn/ui is the design system.**
This repo documents our brand colors, animation standards (GSAP), component customizations,
and logo assets so every project stays consistent.

## Cardinal Rules

1. **Use shadcn/ui as-is.** Install via their CLI. Use the Neutral base color theme. Do not rebuild components from scratch.
2. **Brand colors are additive.** They do NOT replace `--primary`, `--background`, or any shadcn semantic token. Apply them only when the design explicitly calls for brand colors.
3. **GSAP for animation.** Use the presets in `animations/presets.js`. Do not invent new easing or duration values — use the tokens in `tokens/motion.yaml`.
4. **Respect reduced motion.** Every GSAP animation must check `prefers-reduced-motion` and fall back to instant or no animation.
5. **Never edit shadcn source.** Customise through CSS variable overrides, Tailwind utility composition, or wrapper components.

## Key Files (read in this order)

| Priority | File | What It Contains |
|----------|------|-----------------|
| 1 | `DESIGN-SYSTEM.md` | Full specification — colors, motion, component rules, assets |
| 2 | `tokens/colors.css` | Copy-paste CSS variables (shadcn defaults + brand color block) |
| 3 | `tokens/brand-colors.yaml` | Brand color palette with strict usage rules |
| 4 | `tokens/motion.yaml` | Duration, easing, and stagger tokens |
| 5 | `animations/presets.js` | GSAP animation presets — entrance, exit, hover, scroll, logo |
| 6 | `animations/scroll-triggers.js` | GSAP ScrollTrigger pattern factories |
| 7 | `components/shadcn-customizations.yaml` | What we change from shadcn defaults |
| 8 | `assets/logos/README.md` | Logo variants, sizes, naming conventions |

## Starting a New Project

```bash
# 1. Set up your framework (Next.js, Vite, etc.)
# 2. Install shadcn/ui per https://ui.shadcn.com/docs/installation
# 3. Install GSAP
npm install gsap
# 4. Copy tokens/colors.css into your global stylesheet
# 5. Import animation presets where needed
import { ENTRANCE, EXIT, HOVER } from "@/design-system/animations/presets";
```
