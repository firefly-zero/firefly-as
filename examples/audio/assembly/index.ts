import "firefly-as/assembly";
import * as audio from "firefly-as/assembly/audio";

export function boot(): void {
  const gain = audio.OUT.addGain(1);
  gain.addSine(audio.Freq.hz(440), 0);
}
