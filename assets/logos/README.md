# Logo Assets

One shared symbol — **the Way mark** — and three wordmark families. All have light/dark mode treatments and
animated GSAP reveals. The Way mark stands in for the `*` in the **Way\*ID** and **Way\*Space** wordmarks;
**Lineage\*Labs** keeps its own Lora text wordmark with a literal green `*`.

---

## The Way mark

The shared brand symbol for **Way\*ID** and **Way\*Space** — a single flat mark built from three brand strokes
(an X crossing plus a descender) topped by one offset-blue point. Five ways meet at a crossing; a verified point
stands at the sixth. It is the brand's asterisk rebuilt as roads, and it replaces the `*` in both wordmarks.

### Geometry

`viewBox 0 0 100 100`, three strokes at `stroke-width 12` with `stroke-linecap="butt"`, and one point (`r 8.5`).
Strokes inherit `currentColor` (so they follow the wordmark text color); the point uses brand offset blue.

### SVG files

| File | Strokes | Point | Use |
|------|---------|-------|-----|
| `svg/way-mark.svg` | `#0E1233` navy | `#006CDB` blue | Brand, light surface |
| `svg/way-mark-dark.svg` | `#FAFAFA` near-white | `#2886E6` blue | Brand, dark surface |
| `svg/way-mark-mono.svg` | `currentColor` | `currentColor` | Single-color (favicons, stamps) |

### Inline usage (as the wordmark asterisk)

The mark is embedded inline in the wordmarks so it scales with the text and inherits its color:

```html
<svg class="way-mark" viewBox="0 0 100 100" aria-hidden="true">
  <g fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="butt">
    <line x1="76" y1="37" x2="24" y2="67"/>
    <line x1="24" y1="37" x2="76" y2="67"/>
    <line x1="50" y1="52" x2="50" y2="82"/>
  </g>
  <circle class="way-mark-dot" cx="50" cy="23" r="8.5"/>
</svg>
```

```css
.way-mark {
  display: inline-block;
  width: 0.92em;              /* scales with the wordmark font-size */
  height: 0.92em;
  vertical-align: -0.15em;    /* fallback for non-flex inline contexts */
  flex-shrink: 0;
}
/* In the wordmark, raise the mark and tighten it to the words.
   Scoped to the badge so a standalone icon keeps its own centering. */
.logo-badge .way-mark,
.logo-badge-dark .way-mark {
  transform: translateY(-0.16em);
  margin: 0 -0.05em;
}
.way-mark .way-mark-dot { fill: var(--brand-offset-blue-light); }        /* #006CDB */
.dark .way-mark .way-mark-dot { fill: var(--brand-offset-blue-dark); }   /* #2886E6 */
.logo-badge-dark .way-mark .way-mark-dot { fill: var(--brand-offset-blue-dark); }
```

Because the wordmark span is `display:inline-flex; align-items:center`, the mark centers against the text line;
the scoped `translateY(-0.16em)` then raises it to sit like an asterisk, and the negative margin snugs it to the words.

### Favicon (solid circle)

For favicons and app icons the mark is reversed out of a **solid navy disc** (`--brand-highlight-navy` `#0E1233`) —
near-white strokes `#FAFAFA`, offset-blue point `#2886E6`. The disc gives the mark a backing shape so it holds
contrast on any browser tab (light or dark) and reads down to 16px; the mark fills ~65% of the disc for margin.

Scalable SVG (`way-mark-favicon.svg`) is the primary; PNG fallbacks cover legacy and app-icon slots:

| File | Size |
|------|------|
| `svg/way-mark-favicon.svg` | scalable — primary |
| `icons/favicon-32.png` | 32×32 |
| `icons/favicon-16.png` | 16×16 |
| `icons/apple-touch-icon.png` | 180×180 |
| `icons/icon-192.png` · `icons/icon-512.png` | PWA |

```html
<link rel="icon" type="image/svg+xml" href="assets/logos/svg/way-mark-favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="assets/logos/icons/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="assets/logos/icons/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="assets/logos/icons/apple-touch-icon.png">
```

The favicon disc is fixed two-color (it does not follow `currentColor`) — the whole point is a stable, high-contrast
icon. To regenerate the PNGs, rasterize `way-mark-favicon.svg` at each size from a large master (e.g. 1024px) and downscale.

---

## Variant 1 — Way\*ID & Way\*Space Wordmarks

Plain text wordmarks — no border, no background. Navy text on light; near-white on dark. The Way mark replaces the
`*`; its strokes follow the text color and its point stays brand offset blue. The two are identical in treatment and
share the same mark — only the trailing word (`ID` / `Space`) differs.

### Spec

| Property | Light Mode | Dark Mode |
|----------|-----------|----------|
| Background | transparent | transparent |
| Text + mark strokes | `--brand-highlight-navy` (`#0E1233`) | `--brand-highlight-light` (`#FAFAFA`) |
| Way mark point | `--brand-offset-blue-light` (`#006CDB`) | `--brand-offset-blue-dark` (`#2886E6`) |
| Font | Poppins, weight 700, `-0.07em` letter-spacing | same |
| Default size | `15px` | same |

### CSS Classes

The badge is `inline-flex` so the mark centers against the text automatically. See **The Way mark → Inline usage**
above for the `.way-mark` / `.way-mark-dot` rules.

```css
/* Light mode */
.logo-badge {
  display: inline-flex;
  align-items: center;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  letter-spacing: -0.07em;
  color: var(--brand-highlight-navy);
  white-space: nowrap;
}

/* Dark mode override (via .dark parent) */
.dark .logo-badge {
  color: var(--brand-highlight-light);
}

/* Forced dark-mode (always-dark surfaces) */
.logo-badge-dark {
  display: inline-flex;
  align-items: center;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  letter-spacing: -0.07em;
  color: var(--brand-highlight-light);
  white-space: nowrap;
}
```

### HTML Usage

The `<svg class="way-mark">…</svg>` below is the mark from **The Way mark → Inline usage** (abbreviated here as `[way-mark svg]`):

```html
<!-- Way*ID — light background -->
<span class="logo-badge">Way[way-mark svg]ID</span>
<!-- Way*ID — dark background -->
<span class="logo-badge-dark">Way[way-mark svg]ID</span>

<!-- Way*Space — same mark, sibling wordmark -->
<span class="logo-badge">Way[way-mark svg]Space</span>
<span class="logo-badge-dark">Way[way-mark svg]Space</span>
```

The mark's strokes inherit the badge text color; `.way-mark-dot` picks up the blue point automatically. No JS needed for static usage.

### Animated Reveal (GSAP)

Simple scale + fade reveal. No post-reveal animation — the mark and its point stay static.

1. **Badge fades in** — `scale 0.94→1`, `opacity 0→1`, `back.out(1.7)`, 300ms

```js
gsap.fromTo(badgeEl,
  { scale: 0.94, opacity: 0 },
  { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
);
```

### Square Social Lockup (1:1)

A three-line, square-format lockup of the Way\*ID wordmark for social media profile avatars
(X, LinkedIn, Instagram, etc.). The wordmark stacks `Way` / `*` / `ID`, centered, with the `*`
on its own line as a pivot and generous clear space so it survives a circular crop.

| Property | Dark | Light |
|----------|------|-------|
| Background | navy `#0E1233` | sand `#E8E5DE` |
| Text color | `#FAFAFA` | `#0E1233` |
| Asterisk (`*`) color | `#2886E6` | `#006CDB` |
| Font | Poppins 700, `-0.07em` tracking | same |
| Asterisk placement | own centered line (pivot), ~1.5× scale | same |

The `*` sits on its own centered line as a blue pivot between `Way` and `ID`. Files:

```
assets/logos/wayID-square-dark.png           # 1024×1024 master
assets/logos/wayID-square-light.png          # 1024×1024 master
assets/logos/png/512/wayID-square-dark.png   # 512×512
assets/logos/png/512/wayID-square-light.png  # 512×512
```

Masters downscale cleanly to any platform avatar size (400×400, 320×320, etc.).

> **Note:** these shipped square PNGs use a literal `*` glyph as the pivot — they predate the Way mark. When
> regenerating them, place the Way mark (`svg/way-mark.svg` / `way-mark-dark.svg`) on the pivot line instead.

### Full wordmark lockup (PNG)

Hard-edge renders of the complete **Way\*ID** wordmark with the Way mark in place of the `*` — for contexts
where inline SVG is not available (email, raster export, slides).

```
assets/logos/wayID-wordmark-transparent.png  # transparent background
assets/logos/wayID-wordmark-white.png        # white background
assets/logos/wayID-wordmark-beige.png        # sand #E8E5DE background
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
| **Mark intact (Way\*ID / Way\*Space)** | The Way mark replaces the `*` — never swap it back for a text `*`, recolor its offset-blue point, or reflow its strokes |
| **Asterisk intact (Lineage\*Labs)** | The Lineage\*Labs `*` and its grass-green color are part of that wordmark — never remove or recolor it |

---

## File Structure

```
assets/logos/
├── svg/
│   ├── way-mark.svg               # Way mark — light surface (navy strokes + blue point)
│   ├── way-mark-dark.svg          # Way mark — dark surface (near-white strokes + blue point)
│   ├── way-mark-mono.svg          # Way mark — single-color (currentColor)
│   ├── way-mark-favicon.svg       # Way mark — favicon (solid navy disc)
│   ├── lineagelabs-wordmark-light.svg   # (planned)
│   └── lineagelabs-wordmark-dark.svg    # (planned)
├── wayID-wordmark-transparent.png # full Way*ID lockup (hard-edge render)
├── wayID-wordmark-white.png
├── wayID-wordmark-beige.png
├── png/
│   ├── 16/
│   ├── 32/
│   ├── 64/
│   ├── 128/
│   ├── 256/
│   └── 512/
│       └── way-mark-favicon.png   # 512 favicon master
└── icons/
    ├── favicon-16.png        # Way mark favicon 16×16
    ├── favicon-32.png        # Way mark favicon 32×32
    ├── apple-touch-icon.png  (180×180)
    ├── icon-192.png          (PWA)
    ├── icon-512.png          (PWA)
    └── og-image.png          (1200×630, Open Graph — planned)
```
