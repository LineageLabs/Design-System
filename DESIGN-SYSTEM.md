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
| **Body Font** | System UI (native font stack) | Default for all body text, UI elements. No install required. |
| **Display / H1 Font** | [Lora](https://fonts.google.com/specimen/Lora) | Serif. Used for h0 and h1 only. |
| **Headline Font** | [Poppins](https://fonts.google.com/specimen/Poppins) | Sans-serif. Used for h2–h4 only. |
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
| Font | System UI (body) + **Lora (h0–h1)** + **Poppins (h2–h4)** |
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
6. **System UI for body, Lora for h0–h1, Poppins for h2–h4.** h0 is Lora 400 (display); h1 is Lora 700. h2–h4 use Poppins 600–800. Body/UI uses the native system font stack — no install required.
7. **Use Hugeicons.** Default icon set for all UI elements and illustrations.

---

## 2. Typography

### Font Stack

| Role | Font Family | Weight Range | Usage |
|------|-------------|-------------|-------|
| **Display** (h0) | `"Lora", Georgia, serif` | 400 | Hero / landing display text — huge, light-weight |
| **H1** | `"Lora", Georgia, serif` | 700 | Page-level titles and hero headings |
| **Headlines** (h2–h4) | `"Poppins", sans-serif` | 600–800 | Section headers, card titles, sub-headings |
| **Body / UI** | `system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"` | 400–700 | All body text, buttons, inputs, labels, navigation |
| **Code** | `"Geist Mono", "SF Mono", "Fira Code", Consolas, monospace` | 400 | Code blocks, inline code, terminal |

### Installation

```html
<!-- Google Fonts — Lora (h0, h1) + Poppins (h2–h4) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
```

### CSS Setup

```css
body {
  font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

h1 {
  font-family: "Lora", Georgia, serif;
  font-weight: 700;
}

h2, h3, h4 {
  font-family: "Poppins", sans-serif;
}

.h0 {
  font-family: "Lora", Georgia, serif;
  font-weight: 400;
  font-size: clamp(3.5rem, 8vw, 6rem);
  line-height: 1.0;
  letter-spacing: -0.03em;
}
```

> **`.h0` is the canonical display-scale class.** A `.hero-title` class was used in earlier project files; as of `[2026.02.19]` it was aligned to identical values as `.h0` and is no longer part of the design system. In all new code, use `.h0` directly.

```css
h1 {
  font-size: clamp(2rem, 4vw, 2.75rem);   /* 32px → 44px */
}

h2 {
  font-size: clamp(1.5rem, 3vw, 1.75rem); /* 24px → 28px */
}

code, pre {
  font-family: "Geist Mono", "SF Mono", "Fira Code", Consolas, monospace;
}
```

### Font Usage Rules

These rules define which elements are permitted to use each font family. Font families are used purposefully by role — not for arbitrary visual contrast. Visual hierarchy within a family is built through weight, size, colour, and spacing.

#### Rule 1 — Font Family Roles

Any screen may use up to all three families when the content hierarchy genuinely requires it. A family enters only when an element in its designated role is present on that screen — it does not appear decoratively. Monospace is always permitted for code elements and is excluded from the count.

| Family | Role | Permitted on |
|--------|------|-------------|
| System UI | Body + UI chrome | Every element not covered by Lora or Poppins |
| Lora | Display + major headline | `h1`, `.h0` only |
| Poppins | Structural subheadings | `h2`, `h3`, `h4` only |

```
✅ System UI only — dashboard with no headings
✅ System UI + Lora — screen with an h1 or .h0, no h2–h4 present
✅ System UI + Lora + Poppins — landing page with h1 hero + h2 section titles
❌ Poppins on a stat value — data display is UI chrome, not a heading
❌ Lora on a nav label — navigation is UI chrome, not a heading
```

#### Rule 2 — Poppins is a Heading Font, Not an Emphasis Tool

Poppins must not be applied to any element that is not a structural heading (`h2`, `h3`, or `h4`). Stat values, app bar titles, button text, badge text, nav labels, kicker text, and all data display are UI chrome — they use System UI. Using Poppins to make a number or label "look bolder" is the canonical anti-pattern this rule prevents.

```
✅ <h3>Quick Actions</h3>                           — Poppins via h3 selector, correct
❌ .stat-value { font-family: "Poppins"; }           — stat numbers are data, not headings
❌ .app-bar-logo { font-family: "Poppins"; }         — app bar title is UI chrome, not a heading
```

#### Rule 3 — Hierarchy Within System UI

On screens where no headings warrant Lora or Poppins, System UI alone covers all hierarchy needs. Achieve full visual contrast through **weight, size, colour, and spacing** — never by pulling in a decorative family for non-heading elements. System UI provides sufficient range: `400` (body), `500` (secondary labels), `600` (section titles, task names, buttons), `700` (strong emphasis, kickers, stat values). `--muted-foreground` colour and `text-transform: uppercase; letter-spacing` carry additional contrast for smaller labels.

```
✅ .stat-value { font-size: 1.5rem; font-weight: 700; }              — size + weight in System UI
❌ .stat-value { font-family: "Poppins"; font-size: 1.5rem; font-weight: 700; }  — adds nothing
```

#### Rule 4 — UI Chrome is Always System UI

The following element categories always use System UI, without exception: app bar / top bar titles and logos, navigation labels (bottom bar, tab bar, sidebar), button text, input text and placeholders, badge text, toast text, stat and data values, kicker and label text, and section headers within functional app screens.

**Only exceptions:** semantic HTML headings (`h2`, `h3`, `h4`) and brand logo elements (`.logo-badge`, `.logo-text`).

```
✅ .app-bar-logo { font-weight: 700; font-size: 1.05rem; }           — inherits body System UI
❌ .app-bar-logo { font-family: "Poppins"; font-weight: 700; }       — UI chrome, not a heading
```

#### Rule 5 — Web Font Loads Must Be Justified

Every font family in the Google Fonts `<link>` (or `next/font` import) must be actively used by at least one visible semantic element on that specific page. If no `h2`–`h4` appears on a standalone screen, omit Poppins from the font load. If no `h1` or `.h0` appears, omit Lora. On the design system reference page (which demonstrates the full type scale), all families may be loaded.

```
✅ example-mobile.html: loads Lora only — h1 greeting present, no h2–h4 on screen
❌ example-mobile.html: loads Poppins even though no h2–h4 appears — wasted network request
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

### Sidebar Tokens

Eight `--sidebar-*` tokens power the shadcn `Sidebar` component. Do not use them as general color tokens outside of sidebar contexts.

| Token | Purpose |
|-------|---------|
| `--sidebar` | Sidebar panel background |
| `--sidebar-foreground` | Sidebar text |
| `--sidebar-primary` | Active nav item background |
| `--sidebar-primary-foreground` | Active nav item text |
| `--sidebar-accent` | Hover state background |
| `--sidebar-accent-foreground` | Hover state text |
| `--sidebar-border` | Sidebar border / divider |
| `--sidebar-ring` | Focus ring inside sidebar |

For page-level layouts that happen to include a sidebar, use the standard `--background`, `--border`, etc. tokens — not `--sidebar-*` unless you are styling the shadcn `Sidebar` component. Exact OKLCH values are in [`tokens/colors.css`](tokens/colors.css).

### Tailwind v4 @theme Block

`tokens/colors.css` includes a commented-out `@theme inline` block (Section 3 of the file). Copy this into your project's root CSS file when using **Tailwind v4** — it maps all CSS variables to Tailwind color utilities (`bg-primary`, `text-muted-foreground`, `border-border`, etc.).

**Note:** The block is commented out because it is framework-specific. Tailwind v3 projects use the `tailwind.config.js` `theme.extend.colors` approach instead.

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

> **Note on 400ms:** The `slideIn*` entrance presets use 400ms (and `slideOut*` exit presets use 300ms). These are intentional intermediate values hardcoded in `animations/presets.js` — they do not map to a named duration token. When referencing these presets' timing, write `400ms` explicitly. All other named tokens above match [`tokens/motion.yaml`](tokens/motion.yaml) exactly.

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
| `slideOutLeft` | `x: 0 → -24, opacity: 0` | 300ms | `power2.in` |
| `slideOutRight` | `x: 0 → 24, opacity: 0` | 300ms | `power2.in` |
| `scaleOut` | `scale: 1 → 0.95, opacity: 0` | 200ms | `power2.in` |

### Hover Presets

| Preset | Effect | Duration |
|--------|--------|----------|
| `lift` | `y: -4` | 200ms |
| `press` | `scale: 0.97` | 100ms |
| `glow` | Brand-colored box-shadow | 200ms |

### CSS Transitions vs. GSAP

**Use CSS transitions** (`animations/transitions.css`) for:
- Simple, reversible hover/focus/active states driven by CSS pseudo-classes
- Effects limited to `transform`, `opacity`, or `box-shadow`
- Anything that does not require sequencing, timelines, or scroll triggers

**Use GSAP** (`animations/presets.js`) for:
- Component mount/unmount (Dialog, Sheet, Toast, Popover)
- Multi-step sequences or timelines (logo reveal, hero entrance)
- Scroll-triggered animations
- Anything requiring JS callbacks, dynamic values, or `ScrollTrigger`

#### CSS Transition Utility Classes

Import `animations/transitions.css` into your global stylesheet:

| Class | Effect | Duration |
|-------|--------|----------|
| `.transition-instant` | Sets `transition-duration` | 100ms |
| `.transition-fast` | Sets `transition-duration` | 150ms |
| `.transition-normal` | Sets `transition-duration` | 300ms |
| `.transition-slow` | Sets `transition-duration` | 500ms |
| `.hover-lift` | `translateY(-4px)` + `shadow-md` on `:hover` | 200ms |
| `.hover-press` | `scale(0.97)` on `:active` | 100ms |
| `.hover-fade` | `opacity: 0.8` on `:hover` | 150ms |
| `.focus-ring` | `box-shadow` ring via `var(--ring)` on `:focus-visible` | 150ms |

All duration utilities apply `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — the same easing as `power2.out`. The `@media (prefers-reduced-motion: reduce)` block in the file sets all durations to `0ms` and removes all transforms.

```html
<!-- Simple card hover → CSS class, no GSAP needed -->
<div class="hover-lift transition-normal">Card content</div>

<!-- Dialog open/close → GSAP preset -->
```

### Scroll-Triggered Presets

| Preset | Trigger | Effect | Scrub |
|--------|---------|--------|-------|
| `revealUp` | `top 85%` | `y: 40 → 0, fade in` | No |
| `revealLeft` | `top 85%` | `x: -40 → 0, fade in` | No |
| `revealRight` | `top 85%` | `x: 40 → 0, fade in` | No |
| `parallax` | `top bottom → bottom top` | `yPercent: -15` | Yes |
| `staggerReveal` | `top 85%` | Stagger `0.08s`, `y: 30, fade in` | No |

**`pinSection(gsap, trigger, pinTarget, options)`** — Pins `pinTarget` in place while the user scrolls through `trigger`. Returns `null` under reduced motion (no pin applied). Use for sticky image / sticky sidebar layouts.

```js
import { pinSection } from "@/design-system/animations/scroll-triggers";
// Pin the sidebar image while the right column scrolls past
pinSection(gsap, ".case-study-section", ".case-study-image");
```

### Reduced Motion

Every animation must respect `prefers-reduced-motion: reduce`. This is an accessibility requirement.

#### GSAP — use `applyPreset()` or check manually

```js
// Option 1 (recommended) — handles reduced motion automatically
import { applyPreset } from "@/design-system/animations/presets";
applyPreset(gsap, ".dialog-content", "scaleIn");

// Option 2 — manual check when writing raw gsap.fromTo()
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const duration = reducedMotion ? 0 : 0.3;
gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration });
```

#### ScrollTrigger — handled internally

All factory functions in `animations/scroll-triggers.js` check reduced motion internally:
- `revealUp()`, `staggerReveal()` — call `gsap.set()` to make elements instantly visible; no scroll effect applied.
- `parallax()` — returns `null`. Element stays in its natural position.
- `pinSection()` — returns `null`. No pin is applied.

You do not need to guard calls to these factory functions — they self-manage.

#### CSS — already handled

All classes in `animations/transitions.css` include a `@media (prefers-reduced-motion: reduce)` block that sets `transition-duration: 0ms` and removes all transforms. No extra work needed.

#### Rules

1. Never use raw `gsap.to()` / `gsap.from()` without a duration guard. Use `applyPreset()` or check `window.matchMedia("(prefers-reduced-motion: reduce)").matches` directly.
2. Never hand-roll scrubbing animations without a reduced-motion guard. Use `parallax()`.
3. Opacity-only fades are permissible at ≤150ms even under reduced motion. All translate and scale transforms must use `duration: 0`.

---

### Logo Animation

Two logo variants — both have light/dark treatments and animated GSAP reveals.
Full spec and CSS classes: [`assets/logos/README.md`](assets/logos/README.md)

#### way\*ID Badge
Outline pill badge. Transparent background; navy border + text in light mode, light border + text in dark mode.

| Property | Light | Dark |
|----------|-------|------|
| Background | transparent | transparent |
| Text | `--brand-highlight-navy` | `--brand-highlight-light` |
| Border | `1.5px solid --brand-highlight-navy` | `1px solid --brand-highlight-light` |
| Radius | `var(--radius)` (0.875rem) | same |
| Font | Poppins 600, `-0.08em` | same |

Animation:
- Reveal: `scale 0.94→1`, `opacity 0→1`, `back.out(1.7)`, 300ms
- Post-reveal: `*` cycles `--brand-offset-lavender → green → yellow → coral` every 1.4s; re-reads CSS vars each step for dark mode compat
- Static badges: `*` shows `--brand-offset-lavender` via CSS (no JS needed)

#### Lineage\*Labs Wordmark
Text wordmark. Poppins 600, `-0.05em`. The `*` is always grass green (`#3DC683`).

| Property | Light | Dark |
|----------|-------|------|
| Text | `#15552E` (dark green) | `#B9F7CE` (light green) |
| Asterisk | `#3DC683` | `#3DC683` |
| Font | Poppins 600, `-0.05em` | same |
| Default size | `36px` / `54px` line-height | same |

Animation — three phases (~1s total):
1. Characters stagger from left: `blur 6px→0`, `x -16→0`, `y 8→0`, 0.04s stagger
2. Asterisk scale pop: `1→1.3→1`, `back.out(3)` then `power2.out`
3. Text-shadow glow pulse: `0→20px→0`, 600ms

Generic icon+wordmark factory function: `createLogoReveal(gsap, options)` in `animations/presets.js`.
- Reduced motion: instant set, no animation on all variants

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

| Component | Entrance | Exit | Hover |
|-----------|----------|------|-------|
| `Dialog` / `AlertDialog` | `scaleIn` | `scaleOut` | — |
| `Sheet` (left) | `slideInLeft` | `slideOutLeft` | — |
| `Sheet` (right) | `slideInRight` | `slideOutRight` | — |
| `DropdownMenu` | `slideInDown` | `fadeOut` | — |
| `Popover` | `scaleIn` | `fadeOut` | — |
| `Tooltip` | `fadeIn` (fast) | `fadeOut` (fast) | — |
| `Toast` | `slideInRight` | `slideOutUp` | — |
| `Accordion` | `expandIn` | reverse `expandIn` | — |
| `Tabs` (panel) | `fadeIn` (fast) | — | — |
| `NavigationMenu` | `fadeIn` | — | — |
| `Card` (interactive) | — | — | `hover-lift` (CSS class) |
| `Button` | — | — | `hover-press` (CSS class) |

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

#### Chart Color Token Reference

| Token | Light | Dark | Data Series Role |
|-------|-------|------|-----------------|
| `--chart-1` | Warm orange | Blue | Primary / first series |
| `--chart-2` | Teal | Green | Secondary series |
| `--chart-3` | Navy | Amber | Tertiary series |
| `--chart-4` | Yellow | Purple | Quaternary series |
| `--chart-5` | Amber | Red | Quinary series |

**Assignment rule:** Assign tokens by series order — `--chart-1` for the first data series, `--chart-2` for the second, and so on. Never skip a token or assign by color preference. Exact OKLCH values are in [`tokens/colors.css`](tokens/colors.css).

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

## 8. Responsive Design

Mobile-first. All default CSS targets mobile screens. Override upward with Tailwind `md:` and `lg:` prefixes.

### Breakpoint Scale

Aligned with Tailwind CSS v4 defaults:

| Token | Min-width | Tailwind | Use |
|-------|-----------|----------|-----|
| `mobile` | 0px | (default) | Base styles — all CSS starts here |
| `sm` | 640px | `sm:` | Large phones landscape — rarely needed |
| `md` | 768px | `md:` | **Primary breakpoint** — tablets / small laptops |
| `lg` | 1024px | `lg:` | Desktop — full multi-column layouts |
| `xl` | 1280px | `xl:` | Wide desktop — optional refinement |

**Primary split: `md:` (768px).** This is where layout shifts from single-column to multi-column.

### Container

| Property | Value | Notes |
|----------|-------|-------|
| Max width | `1100px` | `page-max-width` from spacing tokens |
| Gutter (mobile) | `1.5rem` (24px) | `page-gutter` — below 768px |
| Gutter (desktop) | `2rem` (32px) | `page-gutter-lg` — 768px and above |
| Centering | `margin-inline: auto` | Standard block centering |

```css
.container {
  width: 100%;
  max-width: 1100px;
  margin-inline: auto;
  padding-inline: 1.5rem;      /* page-gutter */
}
@media (min-width: 768px) {
  .container {
    padding-inline: 2rem;      /* page-gutter-lg */
  }
}
```

### Layout Patterns

**Card grid** (default content layout):

| Breakpoint | Columns | Tailwind |
|------------|---------|----------|
| Mobile (default) | 1 | `grid grid-cols-1` |
| `md:` (768px) | 2 | `md:grid-cols-2` |
| `lg:` (1024px) | 3 | `lg:grid-cols-3` |

**Sidebar layout**:

| Breakpoint | Behavior |
|------------|----------|
| Mobile (default) | Sidebar hidden — use `Sheet` (mobile nav drawer) to reveal |
| `md:` (768px) | Side-by-side — sidebar 280px fixed, content fills remaining width |

**Mobile sidebar pattern:** Use a shadcn `Sheet` component (entrance: `slideInLeft`, exit: `slideOutLeft`) triggered by a hamburger button. Sheet width: `min(280px, calc(100vw - 3rem))`. Do not stack the sidebar below content — it pushes critical content below the fold.

### Typography

Use CSS `clamp()` for fluid headline scaling. Do **not** set different `font-size` values at different breakpoints.

| Element | Value | Min → Max |
|---------|-------|-----------|
| `h0` | `clamp(3.5rem, 8vw, 6rem)` | 56px → 96px |
| `h1` | `clamp(2rem, 4vw, 2.75rem)` | 32px → 44px |
| `h2` | `clamp(1.5rem, 3vw, 1.75rem)` | 24px → 28px |
| Body | `1rem` (fixed) | 16px |

```css
/* ✅ Correct — fluid scaling */
.h0 { font-size: clamp(3.5rem, 8vw, 6rem); }
h1  { font-size: clamp(2rem, 4vw, 2.75rem); }
h2  { font-size: clamp(1.5rem, 3vw, 1.75rem); }

/* ❌ Wrong — breakpoint-based sizing */
h1 { font-size: 2rem; }
@media (min-width: 768px) { h1 { font-size: 3rem; } }
```

Body text (`1rem` / 16px) stays fixed across all breakpoints.

### What Changes vs. What Stays Fixed

| Element | Mobile → Desktop | Changes? |
|---------|------------------|----------|
| Component padding (buttons, cards, inputs) | Same | **No** — stays fixed |
| Page gutter | 1.5rem → 2rem | **Yes** — at `md:` |
| Section spacing | May compress one step | **Yes** — below `md:` |
| Grid columns | 1 → 2 → 3 | **Yes** — at `md:` and `lg:` |
| Typography (headlines) | Fluid via `clamp()` | **Fluid** — no breakpoints |
| Typography (body) | 1rem fixed | **No** |
| Touch targets | 44px minimum | **No** — same everywhere |

### Mobile Compaction Rules

Below `md:` (768px), layout-level spacing compresses to keep content tight on small screens. **Component-level spacing never changes.**

#### Section Spacing (below 768px)

Each section spacing token drops one step:

| Token | Desktop | Mobile (< 768px) | Tailwind |
|-------|---------|-------------------|----------|
| `section-xl` | 128px (`py-32`) | 96px (`py-24`) | `py-24 md:py-32` |
| `section-lg` | 96px (`py-24`) | 64px (`py-16`) | `py-16 md:py-24` |
| `section-md` | 64px (`py-16`) | 48px (`py-12`) | `py-12 md:py-16` |
| `section-sm` | 48px (`py-12`) | 32px (`py-8`) | `py-8 md:py-12` |

```css
/* ✅ Section spacing compresses on mobile */
.section { padding-block: 3rem; }                /* 48px — mobile */
@media (min-width: 768px) { .section { padding-block: 4rem; } }  /* 64px — desktop */

/* ❌ Wrong — component padding does NOT compress */
.card { padding: 1rem; }
@media (min-width: 768px) { .card { padding: 1.5rem; } }  /* Never do this */
```

#### Gap Scaling (below 768px)

Large layout gaps (`gap-lg` and above) may compress one step. Small/medium gaps stay fixed.

| Token | Desktop | Mobile (< 768px) | Notes |
|-------|---------|-------------------|-------|
| `gap-xl` | 32px (`gap-8`) | 24px (`gap-6`) | Major content block gap |
| `gap-lg` | 24px (`gap-6`) | 16px (`gap-4`) | Section content, card grids |
| `gap-md` | 16px (`gap-4`) | 16px (`gap-4`) | **Fixed** — default grid gap |
| `gap-sm` | 12px (`gap-3`) | 12px (`gap-3`) | **Fixed** |
| `gap-xs` | 8px (`gap-2`) | 8px (`gap-2`) | **Fixed** |

#### What Compresses vs. What Stays Fixed

| Element | Compresses on mobile? | Rule |
|---------|----------------------|------|
| Section spacing (`section-*`) | **Yes** — one step down | `section-lg` 96px → 64px, etc. |
| Layout gaps (`gap-lg`, `gap-xl`) | **Yes** — one step down | `gap-lg` 24px → 16px, etc. |
| Page gutter | **Yes** — at `md:` | 24px → 32px |
| Grid columns | **Yes** — at `md:` and `lg:` | 1 → 2 → 3 |
| Component padding (cards, buttons, inputs) | **No** — fixed | Cards stay `p-6`, buttons keep their padding |
| Component gaps (`gap-xs`, `gap-sm`, `gap-md`) | **No** — fixed | Form field gap stays `gap-3`, card internal gap stays `gap-4` |
| Border radius | **No** — fixed | `--radius: 0.875rem` everywhere |
| Touch targets | **No** — fixed | 44px minimum everywhere |

### Guidelines

1. **Mobile-first CSS.** Default styles target mobile. Override upward with `md:` and `lg:`. Never write desktop-first CSS.
2. **Layout shifts at `md:`.** Single-column → multi-column. Sidebars appear. Navigation expands.
3. **Fluid typography.** Use `clamp()` for headlines. No breakpoint-based `font-size` changes.
4. **Fixed component padding.** Buttons, cards, inputs keep the same padding at every screen size.
5. **Page gutter widens at `md:`.** `1.5rem` → `2rem`.
6. **Section spacing compresses below `md:`.** Section margins drop one scale step. Component padding stays fixed.
7. **Layout gaps compress below `md:`.** `gap-lg` and `gap-xl` drop one step. Smaller gaps (`gap-xs` through `gap-md`) stay fixed.
8. **Standard grid: 1 → 2 → 3 columns.** `grid-cols-1` → `md:grid-cols-2` → `lg:grid-cols-3`.
9. **Restructure, don't hide.** If content matters on desktop, show it on mobile too. Change layout (stack, reorder), not visibility.
10. **Prevent mobile overflow.** Wrap tables in `.table-scroll` containers. Use safe `minmax(min(Xpx, 100%), 1fr)`. Clamp overlay widths to `calc(100vw - 3rem)`. Apply global resets (`overflow-x: clip` on html, `overflow-wrap: break-word` on body). See "Mobile Content Overflow Prevention" below.
11. **No vertical content clipping.** Never use `height` + `overflow: hidden` on content containers. Use `min-height` so content grows. Slides/carousels must `overflow-y: auto` on mobile. Use `dvh` not `vh`. See "Vertical Content & Fixed-Height Containers" below.

### Mobile Content Overflow Prevention

Minimum supported viewport: **320px** (iPhone SE / compact Android / split-screen). All rules below ensure content remains accessible at this width.

| # | Rule | Implementation |
|---|------|----------------|
| 1 | **Minimum viewport: 320px** | All layouts must be usable at 320px. Test at this width. |
| 2 | **Wrap tables in scroll containers** | Every `<table>` gets a parent `<div>` with `overflow-x: auto`. |
| 3 | **Code blocks scroll horizontally** | `pre, .code-block { overflow-x: auto; }` |
| 4 | **Break long words** | `body { overflow-wrap: break-word; }` |
| 5 | **Safe grid minimums** | Use `minmax(min(Xpx, 100%), 1fr)` — not `minmax(Xpx, 1fr)`. Max safe at 320px: **272px** (320 − 2 × 24px gutter). |
| 6 | **Contain media** | `img, video, svg, canvas, iframe { max-width: 100%; height: auto; }` |
| 7 | **Clamp overlay widths** | Tooltips, toasts, popovers, dropdowns: `max-width: calc(100vw - 3rem)`. |
| 8 | **Collapse inline grids** | Multi-column inline grids → single-column below `sm` (640px). |
| 9 | **Block horizontal page scroll** | `html { overflow-x: clip; }` — safety net (use `clip`, not `hidden`, to preserve `position: sticky`). |

Add this CSS to every project's global stylesheet:

```css
/* Mobile overflow prevention — global resets */
html { overflow-x: clip; }
body { overflow-wrap: break-word; }
img, video, svg, canvas, iframe { max-width: 100%; height: auto; }
pre { overflow-x: auto; }
.table-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
```

Safe grid `minmax()` pattern:

```css
/* ✅ Safe — collapses to 100% on narrow screens */
grid-template-columns: repeat(auto-fill, minmax(min(220px, 100%), 1fr));

/* ❌ Unsafe — overflows at 320px viewport when min > 272px */
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
```

**Full spec:** [`tokens/breakpoints.yaml`](tokens/breakpoints.yaml) → `overflow_prevention`

### Vertical Content & Fixed-Height Containers

Fixed-height containers (`height: 100vh` + `overflow: hidden`) are the most common cause of **vertical content clipping on mobile**. Content that fits on a desktop viewport often doesn't fit on a phone — reduced screen height, larger touch targets, and dynamic browser chrome all eat vertical space.

| # | Rule | Implementation |
|---|------|----------------|
| 1 | **`min-height` not `height`** | Never use `height: 100vh` on content containers. Use `min-height` so content can grow. `height` + `overflow: hidden` = invisible content. |
| 2 | **Slides must scroll on mobile** | Paginated/slide/carousel layouts where each slide is viewport-height must add `overflow-y: auto` on the slide container below `md:`. |
| 3 | **No `overflow: hidden` on content** | Use `overflow: hidden` only on decorative wrappers (border-radius clipping, image crops). For layout containers, use `overflow: visible` (default) or `overflow-y: auto`. |
| 4 | **`dvh` not `vh`** | `100vh` on mobile includes area behind browser chrome. Use `100dvh` (dynamic viewport height). Fallback: `min-height: 100vh; min-height: 100dvh;` |
| 5 | **Reduce density or enable scroll** | If a slide fits 3 cards on desktop but only 2 on mobile, let the content scroll within the slide or show fewer items per slide. Never clip content. |

```css
/* ✅ Section grows with content */
.hero { min-height: 100dvh; }

/* ❌ Section clips content that doesn't fit */
.hero { height: 100vh; overflow: hidden; }

/* ✅ Slide scrolls internally on mobile */
.slide { height: 100dvh; overflow-y: auto; }
@media (min-width: 768px) {
  .slide { overflow-y: visible; }
}

/* ❌ Slide clips content on mobile */
.slide { height: 100vh; overflow: hidden; }

/* ✅ dvh with vh fallback */
.full-screen {
  min-height: 100vh;   /* fallback for older browsers */
  min-height: 100dvh;  /* dynamic — accounts for browser chrome */
}
```

---

## 9. Icons

### Hugeicons

| Setting | Value |
|---------|-------|
| Library | [Hugeicons](https://hugeicons.com/) |
| Install | `npm install hugeicons-react` |
| Import | `import { IconName } from "hugeicons-react"` |
| Default Size | `20px` (matches shadcn button icon sizing) |
| Default Stroke | `1.5` (fallback — see stroke-weight rules below) |

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
6. **Stroke weight by context.** The `1.5` default above is the fallback for uncategorized contexts. When a recognized context applies, it takes precedence: Inline / toolbar — `1.5` standard, `1.75` emphasized. Quick-action tile — `2`. FAB — `2.5`. Navigation bar — `1.5`. Do not mix weights within a single context.

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

## 10. Assets & Logos

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

## 11. File Map

| File | Purpose |
|------|---------|
| `CLAUDE.md` | LLM quick-start — read this first |
| `DESIGN-SYSTEM.md` | This file — complete specification |
| `tokens/colors.css` | Copy-paste CSS variables (shadcn Gray + brand) |
| `tokens/brand-colors.yaml` | Brand color palette with usage rules |
| `tokens/motion.yaml` | Duration, easing, stagger tokens |
| `tokens/spacing.yaml` | Spacing scale, semantic tokens, component spacing, guidelines |
| `tokens/breakpoints.yaml` | Breakpoint scale, responsive rules, container behavior, grid patterns |
| `animations/presets.js` | GSAP animation presets (entrance, exit, hover, scroll, logo) |
| `animations/scroll-triggers.js` | GSAP ScrollTrigger factory functions |
| `animations/transitions.css` | CSS-only transitions for simple interactions |
| `components/shadcn-customizations.yaml` | What we change from shadcn defaults |
| `CHANGELOG.md` | Version history — what changed and when |
| `assets/logos/README.md` | Logo variants, sizes, naming conventions |
| `docs/DECISIONS.md` | Design decision log |
