# React Hook

`usePiano` creates and memoizes the shared `Piano` instance so multiple components can trigger notes safely.

```tsx
import { useState } from "react";
import { usePiano, type PlayOptions } from "pico-piano";

export function Sequencer() {
  const [velocity, setVelocity] = useState(0.8);
  const { play } = usePiano({ sustain: 0.7 });

  const trigger = (note: "C4" | "E4" | "G4") => {
    const options: PlayOptions = { duration: 0.6, velocity };
    play(note, options);
  };

  return (
    <div>
      <button onClick={() => trigger("C4")}>C</button>
      <button onClick={() => trigger("E4")}>E</button>
      <button onClick={() => trigger("G4")}>G</button>
      <input
        type="range"
        min="0.1"
        max="1"
        step="0.05"
        value={velocity}
        onChange={(event) => setVelocity(parseFloat(event.target.value))}
      />
    </div>
  );
}
```

The hook:

- Resumes a suspended `AudioContext` automatically.
- Accepts the same ADSR options as the class constructor.
- Exposes imperative helpers (`play`, `playHz`) that forward `PlayOptions`.

When rendering on the server, the hook returns `{ piano: null }` until it reaches the client, so guard against `null` before touching the raw context.
