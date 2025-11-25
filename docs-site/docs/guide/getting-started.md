# Getting Started

Install the library alongside React (when building hooks) or by itself for plain Web Audio usage.

```bash
npm install pico-piano
```

```ts
import Piano from "pico-piano";

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
import { usePiano } from "pico-piano";

const Keyboard = () => {
  const { play } = usePiano({ sustain: 0.8 });

  return <button onClick={() => play("A4")}>Play A4</button>;
};
```

## Demos

- Vite demo (`apps/vite-demo`) — the primary interactive demo (deployed on Vercel).

The demo depends on the local workspace package so you can tinker with UI frameworks before wiring up your own project. To run the demo locally:

```bash
npm --prefix apps/vite-demo install
npm --prefix apps/vite-demo run dev
```
