# Pico Piano

[![Live Demo](https://img.shields.io/badge/demo-vercel-000000?logo=vercel&style=flat)](https://pico-piano-vite-demo.vercel.app/)

TypeScript-first Web Audio toolkit with a piano synth class, ADSR envelope, note-name helpers, and a zero-config React hook. This repository also hosts ready-to-run demos built with Next.js and Vite plus a VitePress documentation site.

## Features

- 🔊 `Piano` class with `play(note)` + `playHz(frequency)` helpers
- 🎚️ Configurable ADSR envelope & velocity control
- 🎹 Full note-name mapping (`C0` → `B8`)
- ⚛️ `usePiano` hook for React/Next.js/Vite apps
- 📘 VitePress documentation site
- ✅ GitHub Actions CI builds the library, demos, and docs

## Installation

```bash
npm install pico-piano
```

Or install directly from the GitHub repository (useful before publishing to npm):

```bash
# install latest from the default branch
npm install github:Kazunari-h/pico-piano

# or via full git URL
npm install git+https://github.com/Kazunari-h/pico-piano.git

# install a specific branch, tag or commit
npm install github:Kazunari-h/pico-piano#main
```

Notes:
- The package includes a `prepare` script that runs `npm run build` when installing from git, so the `dist/` artifacts are built automatically during installation.
- Ensure you use Node.js 20+ as required by the `engines` field.
 - Ensure you use Node.js 20+ as required by the `engines` field. Use a modern npm (npm v9+ bundled with Node 20) for best results.

```ts
import Piano from "pico-piano";

const piano = new Piano({ sustain: 0.7 });
piano.play("C4", { duration: 1.2 });
```

### React hook

```tsx
import { usePiano } from "pico-piano";

const App = () => {
  const { play } = usePiano({ attack: 0.02 });
  return <button onClick={() => play("A4")}>Play A4</button>;
};
```

## Monorepo layout

- `src/` – published library source
- `apps/vite-demo` – Vite + React demo (live: https://pico-piano-vite-demo.vercel.app/)
- `docs-site/` – VitePress documentation

Root `package.json` exposes handy scripts:

| Command | Description |
| --- | --- |
| `npm run build` | Compile the library (emits `dist/`) |
| `npm run build:vite` | Build the Vite demo |
| `npm run build:docs` | Generate the documentation site |
| `npm run build:all` | Run *all* builds sequentially |
| `npm run dev:next` / `dev:vite` / `dev:docs` | Launch each workspace dev server |

> The demos & docs consume the local workspace version of the library so changes are reflected instantly.

## GitHub Actions

`.github/workflows/ci.yml` installs dependencies and runs all build targets on push & pull requests. Keep demos and docs compiling to ensure CI stays green.

Vercel: to avoid triggering Vercel builds when the `gh-pages` branch is pushed, set an Ignored Build Step in your Vercel Project Settings to:

```bash
npm run vercel:ignore
```

The repository includes `scripts/vercel-ignore.js` which returns success (causes Vercel to skip the build) when the branch is `gh-pages`.
## Docs

The VitePress site lives inside `docs-site/docs`. Start it locally:

```bash
npm run dev:docs
```

Deploy the static output from `docs-site/docs/.vitepress/dist`.

## License

License: MIT
