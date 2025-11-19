"use client";

import type { ChangeEvent } from "react";
import { useCallback, useMemo, useState } from "react";
import type { NoteName, PianoOptions, PlayOptions } from "web-audio-piano";
import { usePiano } from "web-audio-piano";

const NOTE_POOL: NoteName[] = [
  "C3",
  "D3",
  "E3",
  "F3",
  "G3",
  "A3",
  "B3",
  "C4",
  "D4",
  "E4",
  "F4",
  "G4",
  "A4",
  "B4",
  "C5"
];

const defaultADSR: PianoOptions = {
  attack: 0.02,
  decay: 0.25,
  sustain: 0.65,
  release: 0.35
};

export default function PianoDemo() {
  const [envelope, setEnvelope] = useState<PianoOptions>(defaultADSR);
  const [playOptions, setPlayOptions] = useState<PlayOptions>({
    duration: 0.8,
    velocity: 0.9
  });
  const [selectedNote, setSelectedNote] = useState<NoteName>("C4");

  const { play, piano } = usePiano(envelope);

  const handleRange =
    (field: keyof PianoOptions) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = parseFloat(event.target.value);
      setEnvelope((prev) => ({
        ...prev,
        [field]: Number.isNaN(nextValue) ? prev[field] : +(nextValue.toFixed(3))
      }));
    };

  const handlePlayOptions =
    (field: keyof PlayOptions) => (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = parseFloat(event.target.value);
      setPlayOptions((prev) => ({
        ...prev,
        [field]: Number.isNaN(nextValue) ? prev[field] : +(nextValue.toFixed(2))
      }));
    };

  const isReady = Boolean(piano);

  const buttons = useMemo(
    () =>
      NOTE_POOL.map((note) => (
        <button
          key={note}
          type="button"
          className={note === selectedNote ? "key active" : "key"}
          disabled={!isReady}
          onClick={() => {
            setSelectedNote(note);
            play(note, playOptions);
          }}
        >
          {note}
        </button>
      )),
    [isReady, play, playOptions, selectedNote]
  );

  const triggerSelected = useCallback(() => {
    play(selectedNote, playOptions);
  }, [play, playOptions, selectedNote]);

  return (
    <section className="demo-card">
      <h2>Interactive keyboard</h2>
      <div className="keyboard">{buttons}</div>

      <div className="controls">
        <fieldset>
          <legend>ADSR envelope</legend>
          <label>
            Attack ({envelope.attack?.toFixed(2)}s)
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={envelope.attack ?? 0}
              onChange={handleRange("attack")}
            />
          </label>
          <label>
            Decay ({envelope.decay?.toFixed(2)}s)
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={envelope.decay ?? 0}
              onChange={handleRange("decay")}
            />
          </label>
          <label>
            Sustain ({((envelope.sustain ?? 0) * 100).toFixed(0)}%)
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={envelope.sustain ?? 0}
              onChange={handleRange("sustain")}
            />
          </label>
          <label>
            Release ({envelope.release?.toFixed(2)}s)
            <input
              type="range"
              min="0"
              max="2"
              step="0.01"
              value={envelope.release ?? 0}
              onChange={handleRange("release")}
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Performance</legend>
          <label>
            Duration ({playOptions.duration?.toFixed(2)}s)
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.05"
              value={playOptions.duration ?? 0.8}
              onChange={handlePlayOptions("duration")}
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
              onChange={handlePlayOptions("velocity")}
            />
          </label>
          <button type="button" onClick={triggerSelected} disabled={!isReady}>
            Play {selectedNote}
          </button>
        </fieldset>
      </div>
    </section>
  );
}
