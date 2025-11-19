import { useMemo, useState } from "react";
import type { ADSR, NoteName, PianoOptions, PlayOptions } from "pico-piano";
import { usePiano } from "pico-piano";

const NOTES: NoteName[] = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
const ENVELOPE_FIELDS: (keyof ADSR)[] = ["attack", "decay", "sustain", "release"];

export default function App() {
  const [options, setOptions] = useState<PianoOptions>({
    attack: 0.02,
    decay: 0.2,
    sustain: 0.7,
    release: 0.4
  });
  const [playOptions, setPlayOptions] = useState<PlayOptions>({
    duration: 1,
    velocity: 0.8
  });

  const { play } = usePiano(options);

  const buttons = useMemo(
    () =>
      NOTES.map((note) => (
        <button
          key={note}
          className="note-btn"
          onClick={() => play(note, playOptions)}
          type="button"
        >
          {note}
        </button>
      )),
    [play, playOptions]
  );

  return (
    <div className="app">
      <header>
        <h1>Vite Demo</h1>
        <p>Interactively trigger tones using the shared Piano class and hook.</p>
      </header>
      <section className="panel">
        <h2>Keyboard</h2>
        <div className="note-grid">{buttons}</div>
      </section>
      <section className="panel">
        <h2>Envelope</h2>
        <div className="slider-grid">
          {ENVELOPE_FIELDS.map((field) => (
            <label key={field}>
              {field}
              <input
                type="range"
                min={field === "sustain" ? 0 : 0.01}
                max={field === "release" ? 2 : field === "sustain" ? 1 : 1}
                step="0.01"
                value={options[field] ?? 0}
                onChange={(event) =>
                  setOptions((prev) => ({
                    ...prev,
                    [field]: parseFloat(event.target.value)
                  }))
                }
              />
            </label>
          ))}
        </div>
      </section>
      <section className="panel">
        <h2>Playback</h2>
        <label>
          Duration ({playOptions.duration?.toFixed(2)}s)
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.05"
            value={playOptions.duration ?? 1}
            onChange={(event) =>
              setPlayOptions((prev) => ({
                ...prev,
                duration: parseFloat(event.target.value)
              }))
            }
          />
        </label>
        <label>
          Velocity ({((playOptions.velocity ?? 0) * 100).toFixed(0)}%)
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={playOptions.velocity ?? 1}
            onChange={(event) =>
              setPlayOptions((prev) => ({
                ...prev,
                velocity: parseFloat(event.target.value)
              }))
            }
          />
        </label>
      </section>
    </div>
  );
}
