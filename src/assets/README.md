# Source Assets

Assets imported directly into components. Vite will hash, optimize, and bundle these at build time.

## Structure

- `images/` — UI images imported in JSX (`import logo from './assets/images/logo.png'`)
- `sounds/` — sound effects imported in JS
- `icons/` — inline SVG icons

## Usage

```jsx
import logo from '../assets/images/logo.png';

<img src={logo} alt="logo" />
```

Use `src/assets/` for assets that:
- are imported by components
- should be fingerprinted for long-term caching
- benefit from Vite's optimization pipeline

For assets referenced by URL (favicon, manifest icons, etc.), use `public/` instead.
