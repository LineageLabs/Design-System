# Design System — Master Reference

> **shadcn/ui IS the design system.** This repo documents what we add on top:
> brand colors, GSAP animation presets, component customizations, and logo assets.

---

## 1. Foundation

| Layer | Tool | Reference |
|-------|------|-----------|
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) — Maia style, Gray base color | Install per their CLI docs. Use as-is. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) (v4, OKLCH) | Comes with shadcn. Use their utilities. |
| **Animation** | [GSAP v3](https://gsap.com/docs/v3/) | `npm install gsap`. Use our presets. |
| **Color Format** | OKLCH | Current shadcn/Tailwind v4 standard. |
| **Body Font** | [Geist Sans](https://vercel.com/font) | Default for all body text, UI elements. |
| **Headline Font** | [Poppins](https://fonts.google.com/specimen/Poppins) | Used for h1–h4 headings only. |
| **Icons** | [Hugeicons](https://hugeicons.com/) | Default icon library. |
| **Border Radius** | Large (`--radius: 0.875rem`) | Maia style — soft and rounded. |

### Theme Configuration

Generated from: `shadcn/create`

| Setting | Value |
|---------|-------|
| Base | Radix |
| Style | **Maia** — Soft and rounded, generous spacing |
| Base Color | **Gray** — Blue-tinted neutral (hue ~262 OKLCH) |
| Theme | Gray |
| Font | Geist Sans (body) + **Poppins (headlines)** |
| Icon Library | Hugeicons |
| Radius | Large (`0.875rem`) |
| Menu Accent | Subtle |
| Menu Color | Default |

### Cardinal Rules

1. **shadcn defaults first.** Never replace semantic tokens (`--primary`, `--background`, etc.) with brand colors.
2. **Brand colors are additive.** Apply via `--brand-*` properties only when explicitly specified.
3. **GSAP for motion.** Use presets from `animations/presets.js`. Don't invent new durations/easings.
4. **Respect reduced motion.** Every animation checks `prefers-reduced-motion`.
5. **Never edit shadcn source.** Customise via CSS overrides, Tailwind composition, or wrapper components.
6. **Geist for body, Poppins for headlines.** Apply Poppins only to h1–h4 elements.
7. **Use Hugeicons.** Default icon set for all UI elements and illustrations.

---

## 2. Typography

### Font Stack

| Role | Font Family | Weight Range | Usage |
|------|-------------|-------------|-------|
| **Headlines** (h1–h4) | `"Poppins", sans-serif` | 600–800 | Page titles, section headers, hero text |
| **Body / UI** | `"Geist Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | 400–700 | All body text, buttons, inputs, labels, navigation |
| **Code** | `"Geist Mono", "SF Mono", "Fira Code", Consolas, monospace` | 400 | Code blocks, inline code, terminal |

### Installation

```html
<!-- Google Fonts — Poppins (headlines only) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
```

```bash
# Geist (installed via npm or included with Next.js)
npm install geist
```

### CSS Setup

```css
body {
  font-family: "Geist Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

h1, h2, h3, h4 {
  font-family: "Poppins", sans-serif;
}

code, pre {
  font-family: "Geist Mono", "SF Mono", "Fira Code", Consolas, monospace;
}
```

---

## 3. Brand Colors

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

## 4. shadcn/ui Gray Theme Reference

Source: `shadcn-ui/ui` → `apps/v4/registry/themes.ts` (exact OKLCH values).

The Gray base color uses blue-tinted neutrals (OKLCH hue ~261–265). Key values:

| Token | Light (OKLCH) | Dark (OKLCH) |
|-------|--------------|-------------|
| `--background` | `oklch(1 0 0)` | `oklch(0.13 0.028 261.692)` |
| `--foreground` | `oklch(0.13 0.028 261.692)` | `oklch(0.985 0.002 247.839)` |
| `--primary` | `oklch(0.21 0.034 264.665)` | `oklch(0.928 0.006 264.531)` |
| `--card` | `oklch(1 0 0)` | `oklch(0.21 0.034 264.665)` |
| `--secondary` | `oklch(0.967 0.003 264.542)` | `oklch(0.278 0.033 256.848)` |
| `--muted` | `oklch(0.967 0.003 264.542)` | `oklch(0.278 0.033 256.848)` |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` |
| `--border` | `oklch(0.928 0.006 264.531)` | `oklch(1 0 0 / 10%)` |
| `--input` | `oklch(0.928 0.006 264.531)` | `oklch(1 0 0 / 15%)` |
| `--ring` | `oklch(0.707 0.022 261.325)` | `oklch(0.551 0.027 264.364)` |
| `--radius` | `0.875rem` | `0.875rem` |

**Notable:** Dark mode uses **transparency** for borders (`oklch(1 0 0 / 10%)`) and
inputs (`oklch(1 0 0 / 15%)`). Dark `--card` differs from `--background` (lighter).

**Full list (all 30+ variables):** [`tokens/colors.css`](tokens/colors.css)

---

## 5. Animation & Motion

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

## 6. Component Customizations

> If a component is not listed here, use it exactly as shadcn provides.

### Maia Style Notes

Maia is "soft and rounded, with generous spacing." Source: `style-maia.css` (53.5 KB).

Key characteristics:
- **Border radius**: Large (`--radius: 0.875rem`) — components use `rounded-4xl` (pill) and `rounded-2xl`
- **Spacing**: Generous padding (`gap-6`, `py-6` on cards) — more breathing room
- **Borders**: Cards/dialogs use `ring-1 ring-foreground/10` instead of `border`
- **Inputs**: Pill-shaped (`rounded-4xl`) with tinted background (`bg-input/30`)
- **Aesthetic**: Consumer-friendly, warm, approachable

| Component | Maia Radius | Classic (Vega) |
|-----------|-------------|----------------|
| Button | `rounded-4xl` (pill) | `rounded-md` |
| Input | `rounded-4xl` (pill) | `rounded-md` |
| Card | `rounded-2xl` | `rounded-xl` |
| Dialog | `rounded-4xl` | `rounded-lg` |
| Badge | `rounded-4xl` (pill) | `rounded-md` |
| Accordion | `rounded-2xl` | `rounded-lg` |
| Avatar | `rounded-full` | `rounded-full` |

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

## 7. Icons

### Hugeicons

| Setting | Value |
|---------|-------|
| Library | [Hugeicons](https://hugeicons.com/) |
| Install | `npm install hugeicons-react` |
| Import | `import { IconName } from "hugeicons-react"` |
| Default Size | `20px` (matches shadcn button icon sizing) |
| Default Stroke | `1.5` |

Use Hugeicons for all icons in the UI. Fallback to Lucide only if a specific icon is not available in Hugeicons.

---

## 8. Assets & Logos

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

## 9. File Map

| File | Purpose |
|------|---------|
| `CLAUDE.md` | LLM quick-start — read this first |
| `DESIGN-SYSTEM.md` | This file — complete specification |
| `tokens/colors.css` | Copy-paste CSS variables (shadcn Gray + brand) |
| `tokens/brand-colors.yaml` | Brand color palette with usage rules |
| `tokens/motion.yaml` | Duration, easing, stagger tokens |
| `animations/presets.js` | GSAP animation presets (entrance, exit, hover, scroll, logo) |
| `animations/scroll-triggers.js` | GSAP ScrollTrigger factory functions |
| `animations/transitions.css` | CSS-only transitions for simple interactions |
| `components/shadcn-customizations.yaml` | What we change from shadcn defaults |
| `assets/logos/README.md` | Logo variants, sizes, naming conventions |
| `docs/DECISIONS.md` | Design decision log |
