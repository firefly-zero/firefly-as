import "firefly-as/assembly";
import * as audio from "firefly-as/assembly/audio";

export function boot(): void {
  const gain = audio.OUT.addGain(1);
  const mod = audio.SineModulator.new(audio.Freq.hz(0.5));
  gain.modulate(0, 1, mod);
  gain.addSine(audio.Freq.A4, 0);
}
