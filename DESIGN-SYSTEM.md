# Design System — Master Reference

> **shadcn/ui IS the design system.** This repo documents what we add on top:
> brand colors, GSAP animation presets, component customizations, and logo assets.

---

## 1. Foundation

| Layer | Tool | Reference |
|-------|------|-----------|
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) — Neutral theme | Install per their CLI docs. Use as-is. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) (v4, OKLCH) | Comes with shadcn. Use their utilities. |
| **Animation** | [GSAP v3](https://gsap.com/docs/v3/) | `npm install gsap`. Use our presets. |
| **Color Format** | OKLCH | Current shadcn/Tailwind v4 standard. |

### Cardinal Rules

1. **shadcn defaults first.** Never replace semantic tokens (`--primary`, `--background`, etc.) with brand colors.
2. **Brand colors are additive.** Apply via `--brand-*` properties only when explicitly specified.
3. **GSAP for motion.** Use presets from `animations/presets.js`. Don't invent new durations/easings.
4. **Respect reduced motion.** Every animation checks `prefers-reduced-motion`.
5. **Never edit shadcn source.** Customise via CSS overrides, Tailwind composition, or wrapper components.

---

## 2. Brand Colors

> **Rule:** These do NOT replace shadcn tokens. They are additional `--brand-*` CSS
> custom properties used only when a design explicitly calls for brand treatment.

### Surfaces

| Name | Hex | CSS Variable | Context |
|------|-----|-------------|---------|
| Light Background | `#FAFAFA` | `--brand-surface` | Light theme pages |
| Light Grey | `#EAEAEA` | `--brand-surface-grey` | Dividers, secondary cards |
| Dark Background | `#151515` | `--brand-surface` (dark) | Dark theme pages |

### Highlights — Light Backgrounds

| Color | Hex | CSS Variable |
|-------|-----|-------------|
| Yellow | `#FFD400` | `--brand-highlight-yellow` |
| Blue | `#139CFF` | `--brand-highlight-blue` |
| Magenta | `#FF68E3` | `--brand-highlight-magenta` |

### Highlights — Dark Backgrounds

| Color | Hex | CSS Variable |
|-------|-----|-------------|
| Yellow | `#F9DE0A` | `--brand-highlight-yellow` |
| Blue | `#2BC3FF` | `--brand-highlight-blue` |
| Magenta | `#FF68FF` | `--brand-highlight-magenta` |

### When to Use

- Hero sections, marketing pages — brand highlights on headings or CTAs
- Status badges, tags — highlight colors for special emphasis
- Illustrated content — brand palette for custom illustrations
- Gradient accents using brand highlight colors
- Any element the design **explicitly marks** as "brand colored"

### When NOT to Use

- Standard UI components (buttons, inputs, cards) — use shadcn tokens
- Body text — use `--foreground` / `--muted-foreground`
- Borders — use `--border`
- Error states — use `--destructive`
- Anything not explicitly marked as brand-colored in the design

**Full spec:** [`tokens/brand-colors.yaml`](tokens/brand-colors.yaml)
**CSS variables:** [`tokens/colors.css`](tokens/colors.css)

---

## 3. shadcn/ui Default Theme Reference

The default shadcn Neutral theme values are documented in `tokens/colors.css`. Key values:

| Token | Light (OKLCH) | Dark (OKLCH) |
|-------|--------------|-------------|
| `--background` | `oklch(1 0 0)` | `oklch(0.145 0 0)` |
| `--foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `--primary` | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` |
| `--secondary` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` |
| `--muted` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` |
| `--accent` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.396 0.141 25.723)` |
| `--border` | `oklch(0.922 0 0)` | `oklch(0.269 0 0)` |
| `--ring` | `oklch(0.708 0 0)` | `oklch(0.439 0 0)` |
| `--radius` | `0.625rem` | `0.625rem` |

**Full list (all 30+ variables):** [`tokens/colors.css`](tokens/colors.css)

---

## 4. Animation & Motion

Foundation: **GSAP v3**. All presets in [`animations/presets.js`](animations/presets.js).

### Durations

| Token | Value | Use |
|-------|-------|-----|
| `instant` | `100ms` | Active/pressed states |
| `fast` | `150ms` | Hover, toggles, tooltips |
| `normal` | `300ms` | Modals, dropdowns, fades |
| `slow` | `500ms` | Page sections, large reveals |
| `slower` | `700ms` | Staggered sequences |
| `slowest` | `1000ms` | Hero/cinematic, logo reveals |

### Easings

| Name | GSAP | CSS | Use |
|------|------|-----|-----|
| `default` / `out` | `power2.out` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Entrances, general UI |
| `in` | `power2.in` | `cubic-bezier(0.55, 0.06, 0.68, 0.19)` | Exits |
| `in_out` | `power2.inOut` | `cubic-bezier(0.45, 0.05, 0.55, 0.95)` | Layout shifts |
| `overshoot` | `back.out(1.7)` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Modals, playful bounces |
| `spring` | `elastic.out(1, 0.3)` | GSAP only | Springy interactions |
| `bounce` | `bounce.out` | GSAP only | Bounce landings |

### Entrance Presets

| Preset | From → To | Duration | Easing |
|--------|----------|----------|--------|
| `fadeIn` | `opacity: 0 → 1` | 300ms | `power2.out` |
| `slideInUp` | `y: 24, opacity: 0 → 0, 1` | 400ms | `power2.out` |
| `slideInDown` | `y: -24, opacity: 0 → 0, 1` | 400ms | `power2.out` |
| `slideInLeft` | `x: -24, opacity: 0 → 0, 1` | 400ms | `power2.out` |
| `slideInRight` | `x: 24, opacity: 0 → 0, 1` | 400ms | `power2.out` |
| `scaleIn` | `scale: 0.95, opacity: 0 → 1, 1` | 300ms | `back.out(1.7)` |
| `expandIn` | `scaleY: 0, opacity: 0 → 1, 1` | 300ms | `power2.out` |

### Exit Presets

| Preset | From → To | Duration | Easing |
|--------|----------|----------|--------|
| `fadeOut` | `opacity: 1 → 0` | 200ms | `power2.in` |
| `slideOutUp` | `y: 0 → -24, opacity: 0` | 300ms | `power2.in` |
| `slideOutDown` | `y: 0 → 24, opacity: 0` | 300ms | `power2.in` |
| `scaleOut` | `scale: 1 → 0.95, opacity: 0` | 200ms | `power2.in` |

### Hover Presets

| Preset | Effect | Duration |
|--------|--------|----------|
| `lift` | `y: -4` | 200ms |
| `press` | `scale: 0.97` | 100ms |
| `glow` | Brand-colored box-shadow | 200ms |

### Scroll-Triggered Presets

| Preset | Trigger | Effect | Scrub |
|--------|---------|--------|-------|
| `revealUp` | `top 85%` | `y: 40 → 0, fade in` | No |
| `parallax` | `top bottom → bottom top` | `yPercent: -15` | Yes |
| `staggerReveal` | `top 85%` | Stagger `0.08s`, `y: 30, fade in` | No |

### Logo Animation

Factory function: `createLogoReveal(gsap, options)` in `animations/presets.js`.
- Icon scales in with `back.out(1.7)` overshoot
- Wordmark slides in from left with `power2.out`
- Reduced motion: instant set, no animation

**Full motion spec:** [`tokens/motion.yaml`](tokens/motion.yaml)
**ScrollTrigger patterns:** [`animations/scroll-triggers.js`](animations/scroll-triggers.js)
**CSS-only transitions:** [`animations/transitions.css`](animations/transitions.css)

---

## 5. Component Customizations

> If a component is not listed here, use it exactly as shadcn provides.

### Animation Assignments

| Component | Entrance | Exit |
|-----------|----------|------|
| `Dialog` / `AlertDialog` | `scaleIn` | `scaleOut` |
| `Sheet` (left) | `slideInLeft` | `slideOutLeft` |
| `Sheet` (right) | `slideInRight` | `slideOutRight` |
| `DropdownMenu` | `slideInDown` | `fadeOut` |
| `Popover` | `scaleIn` | `fadeOut` |
| `Tooltip` | `fadeIn` (fast) | `fadeOut` (fast) |
| `Toast` | `slideInRight` | `slideOutUp` |
| `Accordion` | `expandIn` | reverse |
| `Tabs` (panel) | `fadeIn` (fast) | — |

### Style Overrides

| Component | What Changes | Value |
|-----------|-------------|-------|
| `Button` | Hover transition | `150ms ease-out` |
| `Button` | Active state | `scale(0.97)` press effect |
| `Card` | Default shadow | `shadow-sm` |
| `Card` (interactive) | Hover | `shadow-md` + `hover-lift` |
| `Input` | Focus ring | `ring-2 ring-offset-2 ring-ring` |
| `Badge` (brand) | Brand variant | `--brand-highlight-*` (only when specified) |

**Full spec:** [`components/shadcn-customizations.yaml`](components/shadcn-customizations.yaml)

---

## 6. Assets & Logos

### Required Logo Variants

| Variant | Pattern | Description |
|---------|---------|-------------|
| Primary | `logo-primary.*` | Full-color, default use |
| Mono Light | `logo-mono-light.*` | White for dark backgrounds |
| Mono Dark | `logo-mono-dark.*` | Dark for light backgrounds |
| Icon Only | `logo-icon.*` | Symbol without wordmark |
| Animated | `createLogoReveal()` | GSAP timeline (not a file) |

### Required Sizes

| Format | Sizes | Location |
|--------|-------|----------|
| SVG | Scalable | `assets/logos/svg/` |
| PNG | 16, 32, 64, 128, 256, 512px | `assets/logos/png/{size}/` |
| Favicon | `.ico` (16+32), apple-touch (180) | `assets/logos/icons/` |
| OG Image | 1200×630 | `assets/logos/icons/og-image.png` |
| PWA | 192, 512 | `assets/logos/icons/` |

**Full guidelines:** [`assets/logos/README.md`](assets/logos/README.md)

---

## 7. File Map

| File | Purpose |
|------|---------|
| `CLAUDE.md` | LLM quick-start — read this first |
| `DESIGN-SYSTEM.md` | This file — complete specification |
| `tokens/colors.css` | Copy-paste CSS variables (shadcn + brand) |
| `tokens/brand-colors.yaml` | Brand color palette with usage rules |
| `tokens/motion.yaml` | Duration, easing, stagger tokens |
| `animations/presets.js` | GSAP animation presets (entrance, exit, hover, scroll, logo) |
| `animations/scroll-triggers.js` | GSAP ScrollTrigger factory functions |
| `animations/transitions.css` | CSS-only transitions for simple interactions |
| `components/shadcn-customizations.yaml` | What we change from shadcn defaults |
| `assets/logos/README.md` | Logo variants, sizes, naming conventions |
| `docs/DECISIONS.md` | Design decision log |
