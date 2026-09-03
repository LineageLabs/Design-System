# Design System — Components

Svelte 5 shadcn primitives, vendored into each app at `src/lib/design-system/`
via `git subtree` (same as `tokens/`). Tailwind v4's Vite plugin auto-scans them.

## Peer requirement: `$lib/utils`

Components import `cn` and bits-ui helper types from `$lib/utils.js`. Each
consuming app MUST expose `src/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]): string { return twMerge(clsx(inputs)); }
export type {
	WithElementRef, WithoutChild, WithoutChildren, WithoutChildrenOrChild
} from 'bits-ui';
```

## CSS

App `app.css` must `@import` (in order): `tokens/colors.css`,
`animations/transitions.css` (provides `.hover-press`), then
`components/components.css`. Each app keeps its own `@theme inline` block
(the one in `colors.css` is commented-out documentation).

## Deps

`bits-ui`, `clsx`, `tailwind-merge`, `tailwind-variants`, and `@lucide/svelte`
(the icon set — see DESIGN-SYSTEM.md §9; `dropdown-menu`, not yet promoted,
already relies on it). Add `simple-icons` too if the app renders brand logos.

## Layering: core vs. optional accent modules

Component CSS is split so apps share the core while opting into per-product
visual variations:

- **`components.css` — core (always import).** Type scale, `.btn-surface-default`,
  focus ring, resets. Both way.je and way.space import this.
- **`blueprint.css` — optional accent module (opt-in).** way.space's "technical
  blueprint" motif: monospace eyebrows (`.mono-label`, used for numbered section
  eyebrows like `01 / Featured`), inline code (`.mono-code`), dot-grid backgrounds
  (`.hex-dots`), ruler-tick separators (`.hex-rule`), corner crosshairs
  (`.hex-plus`). **way.space imports it; way.je does not.**

To give a product a distinct look, add a new optional module here and import it
only in that app — do not redefine classes ad-hoc in an app's `app.css`.
