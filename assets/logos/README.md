# Logo Assets

## Required Variants

| Variant | File Pattern | Description |
|---------|-------------|-------------|
| **Primary** | `logo-primary.*` | Full-color logo — default usage |
| **Monochrome Light** | `logo-mono-light.*` | White/light version for dark backgrounds |
| **Monochrome Dark** | `logo-mono-dark.*` | Dark version for light backgrounds |
| **Icon Only** | `logo-icon.*` | Symbol/mark without wordmark |
| **Animated** | See `animations/presets.js` → `createLogoReveal()` | GSAP-powered entrance animation |

## Required Sizes

### Vector (SVG) — Source of Truth

Place all SVG logos in `svg/`:
```
svg/
├── logo-primary.svg
├── logo-mono-light.svg
├── logo-mono-dark.svg
└── logo-icon.svg
```

### Raster (PNG) — Pre-exported Sizes

Export each variant at these sizes into the corresponding `png/` subdirectories:

| Size (px) | Directory | Use Case |
|-----------|-----------|----------|
| 16 | `png/16/` | Favicon (smallest) |
| 32 | `png/32/` | Favicon (standard), browser tab |
| 64 | `png/64/` | Favicon (high-DPI), small UI placements |
| 128 | `png/128/` | App icon (small), thumbnails |
| 256 | `png/256/` | App icon (standard), profile images |
| 512 | `png/512/` | App icon (large), splash screens |

### Icons & Favicons

Place favicon files in `icons/`:
```
icons/
├── favicon.ico          (16 + 32 multi-size)
├── apple-touch-icon.png (180×180)
├── icon-192.png         (192×192, for PWA manifest)
├── icon-512.png         (512×512, for PWA manifest)
└── og-image.png         (1200×630, for social sharing / Open Graph)
```

## Naming Convention

```
logo-{variant}.{ext}
logo-{variant}-{size}.{ext}    (for PNGs if you want size in the name)
```

Examples:
- `logo-primary.svg`
- `logo-icon.svg`
- `logo-mono-light.svg`

## Animated Logo

The animated logo is NOT a file — it's a GSAP timeline defined in `animations/presets.js` via the `createLogoReveal()` function.

Expected DOM structure for the animation:
```html
<div class="logo">
  <span class="logo-icon"><!-- SVG or img of icon mark --></span>
  <span class="logo-wordmark"><!-- SVG or text of wordmark --></span>
</div>
```

The animation: icon scales in with overshoot, then wordmark slides in from the left.

## Adding Logo Files

1. Export SVGs from your design tool (Figma, Illustrator, etc.)
2. Place SVGs in `svg/`
3. Export PNGs at each required size and place in `png/{size}/`
4. Generate favicon files and place in `icons/`
5. Update this README if you add new variants
