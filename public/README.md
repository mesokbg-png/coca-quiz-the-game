# Public Assets

Static files served as-is from the site root. Reference them with an absolute path, e.g. `/images/logo.png`.

## Structure

- `images/` — logos, backgrounds, icons (PNG, JPG, SVG, WebP)
- `sounds/` — SFX and music (MP3, OGG, WAV)
- `fonts/` — custom font files (WOFF2, WOFF, TTF)

## Usage

```jsx
<img src="/images/logo.png" alt="logo" />
<audio src="/sounds/correct.mp3" />
```

Use `public/` for assets that:
- should keep their exact filename
- are referenced by URL (e.g. favicon, og-image, manifest)
- don't need to be processed/hashed by Vite

For assets imported into components (and hashed at build time), put them in `src/assets/` instead.
