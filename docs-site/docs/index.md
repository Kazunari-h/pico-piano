# Web Audio Piano

Lightweight Web Audio toolkit that exposes a `Piano` class, a frequency-aware `playHz` API, and a batteries-included React hook. Use it to scaffold accessible, musical interfaces in a few minutes.

```ts
import Piano, { usePiano } from "pico-piano";

const piano = new Piano({ attack: 0.02 });
piano.play("C4", { duration: 1.2 });
```

- 🧠 TypeScript-first with rich note-name typings
- 🎛️ Built-in ADSR envelope and velocity control
- ⚛️ React hook mirrors the imperative API
- 🧩 Works in both plain Web Audio and framework projects

<div class="actions">
  <a class="vp-button" href="/guide/getting-started">Get started</a>
  <a class="vp-button secondary" href="https://github.com/Kazunari-h/pico-piano">View on GitHub</a>
</div>
