import PianoDemo from "../components/PianoDemo";

export default function Page() {
  return (
    <main className="container">
      <header>
        <h1>Web Audio Piano</h1>
        <p>
          This Next.js demo renders a playable piano driven by the{" "}
          <code>web-audio-piano</code> library and <code>usePiano</code> hook.
        </p>
      </header>
      <PianoDemo />
      <section className="info">
        <h2>How it works</h2>
        <p>
          {`Press one of the keys or type the note name (e.g. "C4") to trigger the ADSR
          envelope powered by the Web Audio API. You can tweak the envelope controls to hear how
          each phase affects the sound.`}
        </p>
      </section>
    </main>
  );
}
