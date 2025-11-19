# Getting Started

Install the library alongside React (when building hooks) or by itself for plain Web Audio usage.

```bash
npm install web-audio-piano
```

```ts
import Piano from "web-audio-piano";

const piano = new Piano({
  attack: 0.01,
  decay: 0.2,
  sustain: 0.6,
  release: 0.3
});

piano.play("C4");
piano.playHz(523.25, { duration: 2, velocity: 0.7 });
```

## React hook

```tsx
import { usePiano } from "web-audio-piano";

const Keyboard = () => {
  const { play } = usePiano({ sustain: 0.8 });

  return <button onClick={() => play("A4")}>Play A4</button>;
};
```

## Demos

- Next.js demo (`apps/next-demo`)
- Vite demo (`apps/vite-demo`)

Each demo depends on the published package via workspaces so you can tinker with UI frameworks before wiring up your own project.
