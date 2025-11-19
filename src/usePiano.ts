import { useMemo } from "react";
import Piano from "./piano";
import { NoteName, PianoOptions, PlayOptions, UsePianoValue } from "./types";

const optionsDeps = (options?: PianoOptions) => [
  options?.attack,
  options?.decay,
  options?.sustain,
  options?.release,
  options?.context,
  options?.destination,
  options?.volume
];

export function usePiano(options?: PianoOptions): UsePianoValue<Piano> {
  const piano = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }
    return new Piano(options ?? {});
  }, optionsDeps(options));

  return useMemo(
    () => ({
      piano,
      play: (note: NoteName, playOptions?: PlayOptions) => {
        piano?.play(note, playOptions);
      },
      playHz: (hz: number, playOptions?: PlayOptions) => {
        piano?.playHz(hz, playOptions);
      }
    }),
    [piano]
  );
}

export default usePiano;
