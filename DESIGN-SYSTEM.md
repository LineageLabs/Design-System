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

### Highlights — Light & Dark (same values)

| Color | Hex | CSS Variable |
|-------|-----|-------------|
| Light Green | `#B9F7CE` | `--brand-highlight-light-green` |
| Grass Green | `#3DC683` | `--brand-highlight-grass-green` |
| Dark Green | `#15552E` | `--brand-highlight-dark-green` |

### Color Usage Philosophy

> **Keep it minimal.** The UI should be mostly neutral. Color is intentional, not decorative noise.

| Tier | Colors | Rule |
|------|--------|------|
| **1. Neutrals (default)** | `--foreground`, `--muted-foreground`, `--border`, `--background`, surfaces, greys | Use for the vast majority of UI. Text, borders, backgrounds, cards, dividers. |
| **2. Brand greens (purposeful)** | `--brand-highlight-light-green`, `--brand-highlight-grass-green`, `--brand-highlight-dark-green` | May be decorative (avatars, badges, accents) but must still serve a purpose — identity, emphasis, or visual hierarchy. Don't scatter brand color without intent. |
| **3. Non-brand colors (functional only)** | `--destructive` (red), any other non-neutral color | Only when the color itself conveys meaning: errors, warnings, destructive actions, overdue states. Never purely decorative. |

### When to Use Brand Colors

- Hero sections, marketing pages — brand highlights on headings or CTAs
- Status badges, tags — highlight colors for special emphasis
- Illustrated content — brand palette for custom illustrations
- Avatars, branded accents — decorative but purposeful identity touches
- Gradient accents using brand green palette
- Any element the design **explicitly marks** as "brand colored"

### When NOT to Use

- Standard UI components (buttons, inputs, cards) — use shadcn tokens
- Body text — use `--foreground` / `--muted-foreground`
- Borders — use `--border`
- Error states — use `--destructive`
- Functional indicators where color conveys status (e.g. priority levels) — use neutrals or semantic tokens, not brand colors
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
| Card with Image | `rounded-2xl` + `overflow: hidden` | `rounded-xl` |
| Chart | `rounded-2xl` (card shell) | `rounded-xl` |
| Dialog | `rounded-4xl` | `rounded-lg` |
| Badge | `rounded-4xl` (pill) | `rounded-md` |
| Accordion | `rounded-2xl` | `rounded-lg` |
| Avatar | `rounded-full` | `rounded-full` |
| Select | `rounded-4xl` (pill) | `rounded-md` |
| Textarea | `rounded-xl` | `rounded-md` |

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

### Chart

shadcn/ui includes a `Chart` component backed by [Recharts](https://recharts.org/). Use the five semantic chart color tokens (`--chart-1` through `--chart-5`) defined in the Gray theme.

| Setting | Value |
|---------|-------|
| Library | Recharts (via `npx shadcn@latest add chart`) |
| Container | `rounded-2xl` card shell (`ring-1 ring-foreground/10`) |
| Padding | `1.5rem` (p-6) |
| Color tokens | `--chart-1`, `--chart-2`, `--chart-3`, `--chart-4`, `--chart-5` |
| Grid lines | `var(--border)` — thin, 1px |
| Axis text | `var(--muted-foreground)` at `0.75rem` |
| Tooltip | Same card style: `rounded-xl`, `shadow-md`, `bg-card` |
| Legend | Below chart, `0.75rem` text, colored dot (8px, `border-radius: 2px`) + label |
| Border radius (bars) | `0.375rem` top corners (flat bottom) |

**Rules:**
1. Always use `--chart-*` tokens — never hardcode colors or use brand colors in charts.
2. Wrap in the same Maia card shell (rounded-2xl + ring) for visual consistency.
3. Include a chart header (title + optional description) and a legend below the chart body.
4. Keep grid lines subtle — `var(--border)` at 1px. No heavy visual chrome.
5. Tooltip follows the Maia card aesthetic — rounded, subtle shadow, card background.

### Card with Image

An image-top variant of the standard Card. The image area sits flush with the card's top edge, with content padded below.

| Setting | Value |
|---------|-------|
| Container | `rounded-2xl` + `overflow: hidden` + `ring-1 ring-foreground/10` |
| Image area | `aspect-ratio: 16/9` (default), `bg-muted` placeholder |
| Image fit | `object-cover` on `<img>`, fills the area without distortion |
| Body padding | `1.25rem 1.5rem 1.5rem` — slightly tighter top to close the gap to the image |
| Interactive | Same `hover-lift` + `shadow-md` escalation as standard Card |

**Rules:**
1. Default aspect ratio is `16:9`. Override per-card with `4:3` or `1:1` where appropriate.
2. The image area must always have a `bg-muted` fallback visible while loading or if the image fails.
3. `overflow: hidden` on the container ensures the image respects the card's border-radius — do not add border-radius to the image element itself.
4. Body spacing follows standard Maia card padding, not the image area.

### Field (Form Field)

A wrapper pattern that composes label + input + description + error message into a consistent form field. This is not a shadcn component — it is a thin layout wrapper.

| Setting | Value |
|---------|-------|
| Layout | `flex-col`, `gap: 0.375rem` (6px) between elements |
| Label | `0.875rem`, weight `600`, `var(--foreground)` |
| Description | `0.8rem`, `var(--muted-foreground)` — below input |
| Error | `0.8rem`, weight `500`, `var(--destructive)` — replaces description |
| Error ring | `ring-2` using `--destructive` at 25% opacity on the input |
| Select | Pill-shaped (`rounded-4xl`), `bg-input/30`, chevron via inline SVG `background-image` |
| Textarea | `rounded-xl` (not pill), `bg-input/30`, `min-height: 80px`, `resize: vertical` |

**Rules:**
1. Every input in a form must be wrapped in a Field. Bare inputs without labels are not allowed.
2. Description text goes below the input, not between label and input.
3. Error state replaces the description — never show both simultaneously.
4. Select uses the same pill styling as Input. Textarea uses `rounded-xl` (softer rectangle) because pill-shaped textareas look distorted.
5. Use `htmlFor` / `id` to link label to input for accessibility.

**Full spec:** [`components/shadcn-customizations.yaml`](components/shadcn-customizations.yaml)

---

## 7. Spacing

Foundation: **4px grid** (0.25rem). Maia style = "generous spacing" — when in doubt, size up.

### Base Scale

| Token | rem | px | Tailwind |
|-------|-----|----|----------|
| `0` | `0` | 0 | `0` |
| `0.5` | `0.125rem` | 2 | `0.5` |
| `1` | `0.25rem` | 4 | `1` |
| `1.5` | `0.375rem` | 6 | `1.5` |
| `2` | `0.5rem` | 8 | `2` |
| `3` | `0.75rem` | 12 | `3` |
| `4` | `1rem` | 16 | `4` |
| `5` | `1.25rem` | 20 | `5` |
| `6` | `1.5rem` | 24 | `6` |
| `8` | `2rem` | 32 | `8` |
| `10` | `2.5rem` | 40 | `10` |
| `12` | `3rem` | 48 | `12` |
| `16` | `4rem` | 64 | `16` |
| `20` | `5rem` | 80 | `20` |
| `24` | `6rem` | 96 | `24` |
| `32` | `8rem` | 128 | `32` |

### Semantic Tokens

| Token | Value | Tailwind | Use |
|-------|-------|----------|-----|
| `inline-xs` | 4px | `1` | Icon-to-label gap |
| `inline-sm` | 8px | `2` | Button icon gap, badge padding |
| `inline-md` | 12px | `3` | Nav link gap, input group spacing |
| `component-xs` | 6px | `1.5` | Small button, compact badge |
| `component-sm` | 10px | `2.5` | Button/input vertical padding |
| `component-md` | 16px | `4` | Card padding (compact), dropdown items |
| `component-lg` | 24px | `6` | Card padding (Maia default), dialog |
| `component-xl` | 32px | `8` | Large dialog/sheet, hero card |
| `gap-xs` | 8px | `2` | Tight list items, badge groups |
| `gap-sm` | 12px | `3` | Form fields, compact card grids |
| `gap-md` | 16px | `4` | Default card grid, list gap |
| `gap-lg` | 24px | `6` | Section content, generous card grids |
| `gap-xl` | 32px | `8` | Major content block gap |
| `section-sm` | 48px | `12` | Compact section margin |
| `section-md` | 64px | `16` | Default section break |
| `section-lg` | 96px | `24` | Major page section separation |
| `section-xl` | 128px | `32` | Hero / footer breathing room |
| `page-gutter` | 24px | `6` | Page horizontal padding (mobile) |
| `page-gutter-lg` | 32px | `8` | Page horizontal padding (desktop) |
| `page-max-width` | 1100px | `max-w-6xl` | Maximum content width |

### Component Spacing

| Component | Padding | Gap / Notes |
|-----------|---------|-------------|
| **Button** | `0.625rem 1.25rem` | Icon gap: `0.5rem` |
| **Button sm** | `0.375rem 1rem` | — |
| **Button lg** | `0.875rem 2rem` | — |
| **Input** | `0.625rem 1.25rem` | Label gap: `0.5rem` |
| **Card** | `1.5rem` (p-6) | Internal gap: `1rem` |
| **Dialog** | `2rem` (p-8) | Action gap: `0.75rem` |
| **Sheet** | `1.5rem` (p-6) | — |
| **Dropdown** | `0.375rem` chrome | Item: `0.5rem 0.75rem` |
| **Toast** | `1rem 1.25rem` | — |
| **Accordion** | Trigger: `1rem 0.75rem` | Content: `1rem` |
| **Badge** | `0.2rem 0.625rem` | — |
| **Tabs** | Trigger: `0.5rem 0.875rem` | List gap: `0.25rem` |
| **Chart** | `1.5rem` (p-6) | Header-to-body: `1rem`, legend border-top: `0.75rem` |
| **Card (image)** | Body: `1.25rem 1.5rem 1.5rem` | Image: flush (no padding) |
| **Field** | — | Element gap: `0.375rem` |
| **Textarea** | `0.75rem 1.25rem` | Min-height: `80px` |

### Guidelines

1. **4px grid.** All spacing must be a multiple of 4px (0.25rem).
2. **Generous by default.** Cards get `p-6` not `p-4`. Sections get `mb-24` not `mb-16`.
3. **Use semantic tokens.** Prefer `component-lg` / `gap-md` / `section-lg` over raw values.
4. **Gap over margin.** Use flexbox/grid `gap` for layout spacing, not margin.
5. **Don't shrink on mobile.** Component padding stays fixed. Only `page-gutter` and section spacing may compress by one step under 640px.
6. **44px touch targets.** Interactive elements must be at least 44×44px. Use padding or `min-height`/`min-width` to reach this.
7. **No arbitrary values.** Never use off-grid values like `0.3rem` or `7px`.

**Full spec:** [`tokens/spacing.yaml`](tokens/spacing.yaml)

---

## 8. Icons

### Hugeicons

| Setting | Value |
|---------|-------|
| Library | [Hugeicons](https://hugeicons.com/) |
| Install | `npm install hugeicons-react` |
| Import | `import { IconName } from "hugeicons-react"` |
| Default Size | `20px` (matches shadcn button icon sizing) |
| Default Stroke | `1.5` |

Use Hugeicons for all icons in the UI. Fallback to Lucide only if a specific icon is not available in Hugeicons.

### Icon Color & Background Guide

> **Icons follow the same "minimal color" principle as everything else.**
> Default to neutral. Only add color when it serves a clear purpose.

#### Contexts

| Context | Icon Color | Background | Size | Examples |
|---------|-----------|------------|------|----------|
| **Inline / toolbar** | `currentColor` (inherits `--foreground`) | None (transparent) | 18–20px | App bar actions, nav icons, close buttons |
| **Quick action tile** | `currentColor` (inherits `--foreground`) | `color-mix(in srgb, var(--muted-foreground) 10%, transparent)` | 18px | Feature grid tiles (Add, Schedule, Focus, Reports) |
| **Primary action (FAB)** | `currentColor` (inherits `--primary-foreground`) | `var(--primary)` solid | 20–22px | Floating action button |
| **Navigation (bottom bar)** | `currentColor` (inherits parent color) | None | 20px | Bottom tab bar icons |

#### Rules

1. **One treatment per context.** All icons in the same context (e.g. a quick-action grid) must use the same color and background. Do not mix brand, primary, and neutral tints across sibling icons.
2. **`currentColor` by default.** Icons should inherit their color from the parent element, not set an explicit stroke/fill color. This ensures they adapt to light/dark mode and state changes (hover, active, disabled) automatically.
3. **Neutral backgrounds for icon containers.** When an icon sits inside a tinted container (e.g. a quick-action tile), use `--muted-foreground` at 10% opacity. Do not use brand colors or `--primary` for icon container backgrounds — keep them uniform.
4. **Brand-colored icons only by explicit design decision.** If a design marks a specific icon as brand-colored, apply brand color to the icon stroke *and* use a matching brand tint for the container (e.g. `--brand-highlight-grass-green` at 12% bg + `--brand-highlight-grass-green` stroke). But this is the exception, not the default.
5. **Consistent sizing.** Within a row or grid of icons, all icons must use the same width/height and viewBox. Don't mix 18px and 20px icons in the same context.
6. **Stroke weight consistency.** Toolbar and inline icons use `stroke-width: 1.5–1.75`. Quick action tile icons use `stroke-width: 2`. FAB icons use `stroke-width: 2.5`. Don't mix weights within a context.

#### Dark Mode

Icons adapt automatically when using `currentColor` — no additional work required. But follow these rules to avoid breakage:

| Do | Don't |
|----|-------|
| `stroke="currentColor"` | `stroke="#333"` or `stroke="black"` |
| `fill="currentColor"` (for filled icons) | `fill="#000"` or `fill="rgb(51,51,51)"` |
| Container bg via `color-mix()` with semantic tokens | Container bg with hardcoded hex/rgb values |
| Active nav: `color: var(--foreground)` | Active nav: `color: #1a1a1a` |
| Inactive nav: `color: var(--muted-foreground)` | Inactive nav: `color: #888` or `color: gray` |

**Why `currentColor` works in dark mode:**
- `--foreground` flips from near-black (`oklch(0.13…)`) to near-white (`oklch(0.985…)`)
- `--muted-foreground` flips from mid-gray to lighter gray
- `color-mix()` containers using these tokens automatically adjust their tint
- Result: zero dark-mode-specific icon CSS needed

**Common dark mode icon bugs:**
1. Hardcoded `stroke="#333"` — invisible on dark backgrounds. Fix: use `currentColor`.
2. Hardcoded container `background: rgba(0,0,0,0.1)` — invisible in dark mode. Fix: use `color-mix(in srgb, var(--muted-foreground) 10%, transparent)`.
3. Brand color icons that don't change — `--brand-highlight-grass-green` (#3DC683) is the same in both modes by design, so it remains visible on both light and dark. No fix needed.

---

## 9. Assets & Logos

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

## 10. File Map

| File | Purpose |
|------|---------|
| `CLAUDE.md` | LLM quick-start — read this first |
| `DESIGN-SYSTEM.md` | This file — complete specification |
| `tokens/colors.css` | Copy-paste CSS variables (shadcn Gray + brand) |
| `tokens/brand-colors.yaml` | Brand color palette with usage rules |
| `tokens/motion.yaml` | Duration, easing, stagger tokens |
| `tokens/spacing.yaml` | Spacing scale, semantic tokens, component spacing, guidelines |
| `animations/presets.js` | GSAP animation presets (entrance, exit, hover, scroll, logo) |
| `animations/scroll-triggers.js` | GSAP ScrollTrigger factory functions |
| `animations/transitions.css` | CSS-only transitions for simple interactions |
| `components/shadcn-customizations.yaml` | What we change from shadcn defaults |
| `CHANGELOG.md` | Version history — what changed and when |
| `assets/logos/README.md` | Logo variants, sizes, naming conventions |
| `docs/DECISIONS.md` | Design decision log |
