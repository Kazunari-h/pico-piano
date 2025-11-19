import { ADSR, NoteLetter, NoteName, PianoOptions, PlayOptions } from "./types";

const NOTE_NAMES: NoteLetter[] = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B"
];
const OCTAVES = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const DEFAULT_ADSR: ADSR = {
  attack: 0.01,
  decay: 0.2,
  sustain: 0.7,
  release: 0.3
};

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

const createNoteTable = (): Record<NoteName, number> => {
  const table = {} as Record<NoteName, number>;
  NOTE_NAMES.forEach((note, index) => {
    OCTAVES.forEach((octave) => {
      const keyIndex = index + (octave - 4) * 12;
      const freq = 440 * Math.pow(2, (keyIndex - 9) / 12);
      table[`${note}${octave}` as NoteName] = parseFloat(freq.toFixed(4));
    });
  });
  return table;
};

export default class Piano {
  private readonly context: AudioContext;
  private readonly masterGain: GainNode;
  private readonly envelope: ADSR;
  private readonly noteFreq: Record<NoteName, number>;

  constructor(options: PianoOptions = {}) {
    const AudioCtx =
      typeof window !== "undefined"
        ? window.AudioContext || (window as any).webkitAudioContext
        : null;

    if (!options.context && !AudioCtx) {
      throw new Error("Web Audio API is not available in this environment.");
    }

    this.context = options.context ?? new AudioCtx!();
    this.envelope = {
      attack: options.attack ?? DEFAULT_ADSR.attack,
      decay: options.decay ?? DEFAULT_ADSR.decay,
      sustain: options.sustain ?? DEFAULT_ADSR.sustain,
      release: options.release ?? DEFAULT_ADSR.release
    };

    this.masterGain = this.context.createGain();
    const initialVolume = clamp(options.volume ?? 0.8, 0, 1);
    this.masterGain.gain.setValueAtTime(initialVolume, this.context.currentTime);
    this.masterGain.connect(options.destination ?? this.context.destination);

    this.noteFreq = createNoteTable();
  }

  play(noteName: NoteName, options?: PlayOptions): void {
    const freq = this.noteFreq[noteName];
    if (typeof freq !== "number") {
      throw new Error(`Unsupported note "${noteName}".`);
    }
    this.playHz(freq, options);
  }

  playHz(hz: number, options: PlayOptions = {}): void {
    if (hz <= 0) {
      throw new Error("Frequency must be greater than zero.");
    }

    if (this.context.state === "suspended") {
      void this.context.resume();
    }

    const now = this.context.currentTime;
    const { attack, decay, sustain, release } = this.envelope;
    const duration = Math.max(options.duration ?? 0.8, 0);
    const velocity = clamp(options.velocity ?? 1, 0, 1);

    const oscillator = this.context.createOscillator();
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(hz, now);

    const gain = this.context.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(velocity, now + attack);
    gain.gain.linearRampToValueAtTime(velocity * sustain, now + attack + decay);

    const releaseStart = now + Math.max(duration, attack + decay);
    gain.gain.setValueAtTime(velocity * sustain, releaseStart);
    gain.gain.linearRampToValueAtTime(0, releaseStart + release);

    oscillator.connect(gain).connect(this.masterGain);
    oscillator.start(now);
    oscillator.stop(releaseStart + release);
  }
}
