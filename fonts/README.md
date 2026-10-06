# Self-hosted web fonts

The system's web fonts are served from the consuming app's own origin, never from
Google Fonts. A Google Fonts `<link>` sends every visitor's IP address and user agent
to Google before any consent (held to breach the GDPR in LG München I, 20 January 2022,
3 O 17493/20), adds two render-blocking third-party connections, and — because browsers
partition caches per site — gives no shared-cache benefit back. All three families are
licensed under the SIL Open Font License 1.1, which permits redistribution; the licence
text ships next to the files (`LICENSE-*.txt`) as the OFL requires.

| File                                          | Family        | Style  | Weights                           | Subset    |
| --------------------------------------------- | ------------- | ------ | --------------------------------- | --------- |
| `lora-latin-normal.woff2`                     | Lora          | normal | variable 400–700                  | latin     |
| `lora-latin-ext-normal.woff2`                 | Lora          | normal | variable 400–700                  | latin-ext |
| `lora-latin-italic.woff2`                     | Lora          | italic | variable 400–700                  | latin     |
| `lora-latin-ext-italic.woff2`                 | Lora          | italic | variable 400–700                  | latin-ext |
| `poppins-latin-{300,600,700,800}-normal.woff2`     | Poppins       | normal | one static file per weight        | latin     |
| `poppins-latin-ext-{300,600,700,800}-normal.woff2` | Poppins       | normal | one static file per weight        | latin-ext |
| `jetbrains-mono-latin.woff2`                  | JetBrains Mono | normal | variable 100–800 (module uses 400, 500) | latin     |
| `jetbrains-mono-latin-ext.woff2`              | JetBrains Mono | normal | variable 100–800                  | latin-ext |

Two stylesheets declare them:

- **`fonts.css`** — Lora + Poppins, the core typography (§2). Every app imports it.
- **`fonts-blueprint.css`** — JetBrains Mono, used only by the optional
  `components/blueprint.css` accent module. Import it only with that module.

## Using them

Import from the app's global stylesheet, before the component CSS:

```css
@import './design-system/fonts/fonts.css';
@import './design-system/fonts/fonts-blueprint.css'; /* only with components/blueprint.css */
@import './design-system/tokens/colors.css';
@import './design-system/components/components.css';
```

The `url()`s are relative to the stylesheet, so Vite / Next hash the `.woff2` files into
the immutable asset directory, which already carries long-lived cache headers. Preload
the one or two files the first viewport needs (typically the Lora upright and italic latin
files behind the hero headline) with `<link rel="preload" as="font" type="font/woff2"
crossorigin>`; SvelteKit apps can do this from the `preload` option of `resolve()` in
`hooks.server.ts`, which sees the hashed paths.

Static HTML (the demo pages in this repo) links the stylesheets directly:

```html
<link rel="stylesheet" href="fonts/fonts.css" />
```

## Provenance and regeneration

The files are the woff2 instances Google Fonts serves (Lora v37, Poppins v24, JetBrains
Mono v24 at the time of writing), fetched from the `css2` API with a modern Chrome user
agent so it returns per-subset woff2 with `unicode-range`. Only the `latin` and `latin-ext`
subsets are kept. Lora and JetBrains Mono come back as variable fonts — the css2 API serves
the same file for every requested weight — so they are stored once per subset and style and
declared with a `font-weight` range; Poppins has no variable version. The `unicode-range`
values in the CSS are Google's standard latin / latin-ext ranges.

To refresh (a new upstream version, or an added subset): request
`https://fonts.googleapis.com/css2?family=<Family>:<axes>&display=swap` with a Chrome UA,
download each `latin` / `latin-ext` `src` URL, drop the files in here under the names above,
and update the version numbers in this paragraph. Do not add a weight or subset an app does
not render — DS §2 Rule 5 applies to self-hosted declarations too.

## Licences

- Lora — Copyright 2011 The Lora Project Authors, OFL 1.1 (`LICENSE-lora.txt`)
- Poppins — Copyright 2014–2019 Indian Type Foundry, OFL 1.1 (`LICENSE-poppins.txt`)
- JetBrains Mono — Copyright 2020 The JetBrains Mono Project Authors, OFL 1.1
  (`LICENSE-jetbrains-mono.txt`)
