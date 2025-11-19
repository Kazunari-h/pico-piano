export type NoteLetter =
  | "C"
  | "C#"
  | "D"
  | "D#"
  | "E"
  | "F"
  | "F#"
  | "G"
  | "G#"
  | "A"
  | "A#"
  | "B";

export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type NoteName = `${NoteLetter}${Octave}`;

export interface ADSR {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

export interface PianoOptions extends Partial<ADSR> {
  /**
   * Provide an existing AudioContext. A new one is created if omitted.
   */
  context?: AudioContext;
  /**
   * Override the final destination node (defaults to context.destination).
   */
  destination?: AudioNode;
  /**
   * Volume of the instrument (0 - 1).
   */
  volume?: number;
}

export interface PlayOptions {
  /**
   * Duration of the sustain phase before release in seconds.
   */
  duration?: number;
  /**
   * Velocity multiplier that scales the envelope peak (0 - 1).
   */
  velocity?: number;
}

export interface UsePianoValue<TPiano> {
  piano: TPiano | null;
  play(note: NoteName, options?: PlayOptions): void;
  playHz(hz: number, options?: PlayOptions): void;
}
