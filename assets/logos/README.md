# Logo Assets

Two logo variants are in use. Both have light/dark mode treatments and animated GSAP reveals.

---

## Variant 1 — way\*ID Badge

An outline pill badge. Transparent background with navy border + text in light mode; light border + text in dark mode.

### Spec

| Property | Light Mode | Dark Mode |
|----------|-----------|----------|
| Background | transparent | transparent |
| Text color | `--brand-highlight-navy` (`#0E1233`) | `--brand-highlight-light` (`#F0F0F0`) |
| Border | `1.5px solid --brand-highlight-navy` | `1px solid --brand-highlight-light` |
| Border radius | `9999px` (pill) | `9999px` (pill) |
| Font | Poppins, weight 600, `-0.08em` letter-spacing | same |
| Default size | `15px` | same |

### CSS Classes

```css
/* Light mode badge */
.logo-badge {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  letter-spacing: -0.08em;
  padding: 0.125rem 0.7rem;
  border-radius: 9999px;
  background: transparent;
  color: var(--brand-highlight-navy);
  border: 1.5px solid var(--brand-highlight-navy);
  white-space: nowrap;
}

/* Dark mode override (via .dark parent) */
.dark .logo-badge {
  background: transparent;
  color: var(--brand-highlight-light);
  border: 1px solid var(--brand-highlight-light);
}

/* Forced dark-mode badge (always-dark surfaces) */
.logo-badge-dark {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  letter-spacing: -0.08em;
  padding: 0.125rem 0.7rem;
  border-radius: 9999px;
  background: transparent;
  color: var(--brand-highlight-light);
  border: 1px solid var(--brand-highlight-light);
  white-space: nowrap;
}
```

### HTML Usage

```html
<!-- Light background -->
<span class="logo-badge">way*ID</span>

<!-- Dark background -->
<span class="logo-badge-dark">way*ID</span>
```

### Animated Reveal (GSAP)

Three-phase reveal (~1s total) + continuous post-reveal asterisk cycle:

1. **Pill materialises** — `scale 0.9→1`, `blur 8px→0`, `back.out(1.7)`, 450ms
2. **Characters stagger** from center outward (radiates from the `*`) — `blur 4px→0`, `y 6→0`, `power2.out`, 300ms, 0.05s stagger
3. **Dual-layer glow pulse** — tight (`rgba(14,18,51,0.25)` light / `rgba(240,240,240,0.35)` dark) + wide diffuse layer, 650ms total
4. **`*` color cycle** — post-reveal, the `*` span (`class="logo-badge-asterisk"`) cycles through `--brand-offset-lavender → green → yellow → coral` every 1.4s, re-reading CSS variables each cycle to respect live dark/light mode switches

```js
// Split badge text into per-character spans with class="logo-char"
// The * span also gets class="logo-badge-asterisk" for the cycle target
// then run a GSAP timeline:

const tl = gsap.timeline();
tl.fromTo(badgeEl,
  { scale: 0.9, opacity: 0, filter: "blur(8px)" },
  { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.45, ease: "back.out(1.7)" }
).fromTo(chars,
  { opacity: 0, filter: "blur(4px)", y: 6 },
  { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.3, ease: "power2.out",
    stagger: { each: 0.05, from: "center" } },
  "-=0.15"
).call(() => startAsteriskCycle(badgeEl));
// startAsteriskCycle() reads --brand-offset-* CSS vars each step for dark mode compat
```

---

## Variant 2 — Lineage\*Labs Wordmark

A text wordmark in Poppins 600. Dark green on light, light green on dark.
The `*` uses grass green as an accent in both modes.

### Spec

| Property | Light Mode | Dark Mode |
|----------|-----------|----------|
| Text color | `#15552E` (dark green) | `#B9F7CE` (light green) |
| Asterisk (`*`) color | `#3DC683` (grass green) | `#3DC683` (grass green) |
| Font | Poppins, weight **600**, `-0.05em` letter-spacing | same |
| Default size | `36px` / line-height `54px` | same |

### CSS Classes

```css
/* Light mode wordmark */
.logo-text {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 36px;
  line-height: 54px;
  letter-spacing: -0.05em;
  color: #15552E;
  white-space: nowrap;
}

/* Forced dark-mode wordmark (always-dark surfaces) */
.logo-text-dark {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 36px;
  line-height: 54px;
  letter-spacing: -0.05em;
  color: #B9F7CE;
  white-space: nowrap;
}

/* Accent asterisk — same color in both modes */
.logo-text .logo-asterisk,
.logo-text-dark .logo-asterisk {
  color: #3DC683;
}
```

### HTML Usage

```html
<!-- Light background -->
<span class="logo-text">Lineage<span class="logo-asterisk">*</span>Labs</span>

<!-- Dark background -->
<span class="logo-text-dark">Lineage<span class="logo-asterisk">*</span>Labs</span>
```

### Animated Reveal (GSAP)

Three-phase sequence (~1s total):

1. **Characters stagger from left** — `blur 6px→0`, `x -16→0`, `y 8→0`, `power2.out`, 400ms, 0.04s stagger per character
2. **Asterisk scale pop** — `scale 1→1.3→1`, `back.out(3)` then `power2.out`, 450ms (triggers after the asterisk's natural stagger position)
3. **Text-shadow glow pulse** — `0→20px→0`, `power2.out→in`, 600ms

```js
// Split surrounding text into per-character spans (.logo-char),
// preserving the .logo-asterisk span as-is.

const tl = gsap.timeline();
tl.set(el, { opacity: 1 })
  .fromTo(chars,
    { opacity: 0, filter: "blur(6px)", x: -16, y: 8 },
    { opacity: 1, filter: "blur(0px)", x: 0, y: 0, duration: 0.4,
      ease: "power2.out", stagger: 0.04 }
  )
  .fromTo(asteriskEl,
    { scale: 1 },
    { scale: 1.3, duration: 0.2, ease: "back.out(3)" },
    asteriskStaggerOffset + 0.25
  )
  .to(asteriskEl, { scale: 1, duration: 0.25, ease: "power2.out" });
```

---

## Sizes

Both variants scale with font-size. Documented sizes in use:

| Size | Context |
|------|---------|
| `36px` | Default / hero / large placements |
| `24px` | Medium placements |
| `16px` | Small / compact placements |
| `22px` | Badge default (way\*ID) |
| `15px` | Badge standard (way\*ID) |
| `12px` | Badge minimum — never smaller |

---

## Usage Rules

| Rule | Detail |
|------|--------|
| **Clear space** | Maintain at least 1× the logo height as clear space on all sides |
| **Minimum size** | `way*ID` badge: `12px` minimum. `Lineage*Labs`: `16px` minimum |
| **No modifications** | Never rotate, stretch, recolor, add shadows, or apply effects |
| **Mode matching** | Always use the light variant on light backgrounds and dark on dark. Never mix |
| **Asterisk intact** | The `*` character and its grass green color is part of the brand — never remove or recolor it |

---

## File Structure (when SVG/PNG assets are added)

```
assets/logos/
├── svg/
│   ├── wayid-badge-light.svg
│   ├── wayid-badge-dark.svg
│   ├── lineagelabs-wordmark-light.svg
│   └── lineagelabs-wordmark-dark.svg
├── png/
│   ├── 16/
│   ├── 32/
│   ├── 64/
│   ├── 128/
│   ├── 256/
│   └── 512/
└── icons/
    ├── favicon.ico
    ├── apple-touch-icon.png  (180×180)
    ├── icon-192.png          (PWA)
    ├── icon-512.png          (PWA)
    └── og-image.png          (1200×630, Open Graph)
```
