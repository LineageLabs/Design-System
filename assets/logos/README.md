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
| Border radius | `var(--radius)` (0.875rem) | `var(--radius)` (0.875rem) |
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
  border-radius: var(--radius);
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
  border-radius: var(--radius);
  background: transparent;
  color: var(--brand-highlight-light);
  border: 1px solid var(--brand-highlight-light);
  white-space: nowrap;
}
```

### HTML Usage

```html
<!-- Light background — * wrapped for colour accent -->
<span class="logo-badge">way<span class="logo-badge-asterisk">*</span>ID</span>

<!-- Dark background -->
<span class="logo-badge-dark">way<span class="logo-badge-asterisk">*</span>ID</span>
```

The `.logo-badge-asterisk` span gets `color: var(--brand-offset-lavender)` from CSS automatically. No JS needed for static usage.

### Animated Reveal (GSAP)

Simple reveal + continuous post-reveal asterisk cycle:

1. **Badge fades in** — `scale 0.94→1`, `opacity 0→1`, `back.out(1.7)`, 300ms
2. **`*` color cycle** — after reveal, cycles `--brand-offset-lavender → green → yellow → coral` every 1.4s with a 350ms `power2.inOut` crossfade; re-reads CSS vars each step for live dark/light mode compat

```js
// Animate the badge element directly — no char splitting needed
gsap.fromTo(badgeEl,
  { scale: 0.94, opacity: 0 },
  { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)",
    onComplete() { startAsteriskCycle(badgeEl); }
  }
);
// startAsteriskCycle() targets badgeEl.querySelector(".logo-badge-asterisk")
// and reads --brand-offset-* CSS vars each cycle step
```

---

## Variant 2 — Lineage\*Labs Wordmark

A text wordmark in Lora. Brand blue on light backgrounds; near-white on dark.
The `*` uses the brand offset green as an accent in both modes.

### Spec

| Property | Light Mode | Dark Mode |
|----------|-----------|----------|
| Text color | `var(--brand-highlight-navy)` `#0E1233` | `var(--brand-surface)` `#F0F0F0` |
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
  color: var(--brand-surface); /* #F0F0F0 in light root, resolves to near-white */
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
  color: var(--brand-surface); /* #F0F0F0 when no .dark parent */
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
