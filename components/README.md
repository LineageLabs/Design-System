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

`bits-ui`, `clsx`, `tailwind-merge`, `tailwind-variants`. `dropdown-menu`
(not yet promoted) additionally needs `@lucide/svelte`.
