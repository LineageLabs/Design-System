# Logo Assets

Two logo variants are in use. Both have light/dark mode treatments and animated GSAP reveals.

---

## Variant 1 — Way\*ID Badge

Plain text wordmark — no border, no background. Navy text on light; near-white on dark. The `*` uses brand offset blue.

### Spec

| Property | Light Mode | Dark Mode |
|----------|-----------|----------|
| Background | transparent | transparent |
| Text color | `--brand-highlight-navy` (`#0E1233`) | `--brand-highlight-light` (`#FAFAFA`) |
| Asterisk (`*`) color | `--brand-offset-blue-light` (`#006CDB`) | `--brand-offset-blue-dark` (`#2886E6`) |
| Font | Poppins, weight 700, `-0.07em` letter-spacing | same |
| Default size | `15px` | same |

### CSS Classes

```css
/* Light mode */
.logo-badge {
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  letter-spacing: -0.07em;
  color: var(--brand-highlight-navy);
  white-space: nowrap;
}
.logo-badge .logo-badge-asterisk {
  color: var(--brand-offset-blue-light); /* #006CDB */
}

/* Dark mode override (via .dark parent) */
.dark .logo-badge {
  color: var(--brand-highlight-light);
}
.dark .logo-badge .logo-badge-asterisk {
  color: var(--brand-offset-blue-dark); /* #2886E6 */
}

/* Forced dark-mode (always-dark surfaces) */
.logo-badge-dark {
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  letter-spacing: -0.07em;
  color: var(--brand-highlight-light);
  white-space: nowrap;
}
.logo-badge-dark .logo-badge-asterisk {
  color: var(--brand-offset-blue-dark); /* #2886E6 */
}
```

### HTML Usage

```html
<!-- Light background — * wrapped for colour accent -->
<span class="logo-badge">Way<span class="logo-badge-asterisk">*</span>ID</span>

<!-- Dark background -->
<span class="logo-badge-dark">Way<span class="logo-badge-asterisk">*</span>ID</span>
```

The `.logo-badge-asterisk` span gets `color: var(--brand-offset-lavender)` from CSS automatically. No JS needed for static usage.

### Animated Reveal (GSAP)

Simple scale + fade reveal. No post-reveal animation — the `*` stays static blue.

1. **Badge fades in** — `scale 0.94→1`, `opacity 0→1`, `back.out(1.7)`, 300ms

```js
gsap.fromTo(badgeEl,
  { scale: 0.94, opacity: 0 },
  { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
);
```

---

## Variant 2 — Lineage\*Labs Wordmark

A text wordmark in Lora. Brand blue on light backgrounds; near-white on dark.
The `*` uses the brand offset green as an accent in both modes.

### Spec

| Property | Light Mode | Dark Mode |
|----------|-----------|----------|
| Text color | `var(--brand-highlight-navy)` `#0E1233` | `var(--brand-surface)` `#FAFAFA` |
| Asterisk (`*`) color | `var(--brand-offset-green)` `#A0D246` | `#D5FD8D` (dark value of `--brand-offset-green`, hardcoded on `.logo-text-dark`) |
| Font | Lora, weight **400**, `-0.03em` letter-spacing | Lora, weight **400**, `-0.03em` letter-spacing |
| Default size | `64px` / line-height `82px` | `64px` / line-height `82px` |

### CSS Classes

```css
/* Light mode wordmark */
.logo-text {
  font-family: "Lora", Georgia, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 64px;
  line-height: 82px;
  letter-spacing: -0.03em;
  color: var(--brand-highlight-navy); /* #0E1233 */
  white-space: nowrap;
}
.logo-text .logo-asterisk {
  color: var(--brand-offset-green); /* #A0D246 */
}

/* Dark mode override (via .dark parent) */
.dark .logo-text {
  color: var(--brand-surface); /* #FAFAFA in light root, resolves to near-white */
}
.dark .logo-text .logo-asterisk {
  color: var(--brand-offset-green); /* #D5FD8D in dark mode */
}

/* Forced dark-mode wordmark (always-dark surfaces) */
.logo-text-dark {
  font-family: "Lora", Georgia, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 64px;
  line-height: 82px;
  letter-spacing: -0.03em;
  color: var(--brand-surface); /* #FAFAFA when no .dark parent */
  white-space: nowrap;
}
.logo-text-dark .logo-asterisk {
  color: #D5FD8D; /* --brand-offset-green dark value — hardcoded because no .dark ancestor */
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
| `64px` | Default / hero / large placements |
| `36px` | Medium placements |
| `24px` | Small / compact placements |
| `16px` | Minimum readable size |
| `22px` | Badge default (Way\*ID) |
| `15px` | Badge standard (Way\*ID) |
| `12px` | Badge minimum — never smaller |

---

## Usage Rules

| Rule | Detail |
|------|--------|
| **Clear space** | Maintain at least 1× the logo height as clear space on all sides |
| **Minimum size** | `Way*ID` badge: `12px` minimum. `Lineage*Labs`: `16px` minimum |
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
