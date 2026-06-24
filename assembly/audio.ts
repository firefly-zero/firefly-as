import * as B from "./_audio_bindings";
import { toUtf8, strAddr, strSize } from "./_memory";

export const SAMPLE_RATE = 44_100;

export class Freq {
  readonly _h: f32;

  constructor(hz: f32) {
    this._h = hz;
  }

  static hz(hz: f32): Freq {
    return new Freq(hz);
  }
}

export class Time {
  readonly _s: u32;

  constructor(s: u32) {
    this._s = s;
  }

  static samples(hz: u32): Time {
    return new Time(hz);
  }

  static seconds(s: u32): Time {
    return new Time(s / SAMPLE_RATE);
  }

  static ms(ms: u32): Time {
    return new Time((ms * 1000) / SAMPLE_RATE);
  }
}

export class SourceNode {
  protected id: u32;

  constructor(id_: u32) {
    this.id = id_;
  }

  /** Reset the node state to how it was when it was just added. */
  reset(): void {
    B.reset(this.id);
  }
}

export class Node extends SourceNode {
  /** Add sine wave oscillator source (`∿`). */
  addSine(f: Freq, phase: f32): Sine {
    let id = B.add_sine(this.id, f._h, phase);
    return new Sine(id);
  }

  /** Add square wave oscillator source (`⎍`). */
  addSquare(f: Freq, phase: f32): Square {
    let id = B.add_square(this.id, f._h, phase);
    return new Square(id);
  }

  /** Add sawtooth wave oscillator source (`╱│`). */
  addSawtooth(f: Freq, phase: f32): Sawtooth {
    let id = B.add_sawtooth(this.id, f._h, phase);
    return new Sawtooth(id);
  }

  /** Add triangle wave oscillator source (`╱╲`). */
  addTriangle(f: Freq, phase: f32): Triangle {
    let id = B.add_triangle(this.id, f._h, phase);
    return new Triangle(id);
  }

  /** Add white noise source (amplitude on each tick is random). */
  addNoise(seed: i32): Noise {
    let id = B.add_noise(this.id, seed);
    return new Noise(id);
  }

  /** Add always stopped source. */
  addEmpty(): Empty {
    let id = B.add_empty(this.id);
    return new Empty(id);
  }

  /** Add silent source producing zeros. */
  addZero(): Zero {
    let id = B.add_zero(this.id);
    return new Zero(id);
  }

  /** Play an audio file from ROM. */
  addFile(path: string): File {
    const utf8 = toUtf8(path);
    let id = B.add_file(this.id, strAddr(utf8), strSize(utf8));
    return new File(id);
  }

  /** Add node simply mixing all inputs. */
  addMix(): Mix {
    let id = B.add_mix(this.id);
    return new Mix(id);
  }

  /** Add mixer node that stops if any of the sources stops. */
  addAllForOne(): AllForOne {
    let id = B.add_all_for_one(this.id);
    return new AllForOne(id);
  }

  /** Add gain control node. */
  addGain(lvl: f32): Gain {
    let id = B.add_gain(this.id, lvl);
    return new Gain(id);
  }

  /** Add a loop node that resets the input if it stops. */
  addLoop(): Loop {
    let id = B.add_loop(this.id);
    return new Loop(id);
  }

  /** Add a node that plays the inputs one after the other, in the order as they added. */
  addConcat(): Concat {
    let id = B.add_concat(this.id);
    return new Concat(id);
  }

  /** Add node panning the audio to the left (0.), right (1.), or something in between. */
  addPan(lvl: f32): Pan {
    let id = B.add_pan(this.id, lvl);
    return new Pan(id);
  }

  /** Add node that can be muted using modulation. */
  addMute(): Mute {
    let id = B.add_mute(this.id);
    return new Mute(id);
  }

  /** Add node that can be paused using modulation. */
  addPause(): Pause {
    let id = B.add_pause(this.id);
    return new Pause(id);
  }

  /** Add node tracking the elapsed playback time. */
  addTrackPosition(): TrackPosition {
    let id = B.add_track_position(this.id);
    return new TrackPosition(id);
  }

  /** Add lowpass filter node. */
  addLowPass(freq: Freq, q: f32): LowPass {
    let id = B.add_low_pass(this.id, freq._h, q);
    return new LowPass(id);
  }

  /** Add highpass filter node. */
  addHighPass(freq: Freq, q: f32): HighPass {
    let id = B.add_high_pass(this.id, freq._h, q);
    return new HighPass(id);
  }

  /** Add node converting stereo to mono by taking the left channel. */
  addTakeLeft(): TakeLeft {
    let id = B.add_take_left(this.id);
    return new TakeLeft(id);
  }

  /** Add node converting stereo to mono by taking the right channel. */
  addTakeRight(): TakeRight {
    let id = B.add_take_right(this.id);
    return new TakeRight(id);
  }

  /** Add node swapping left and right channels of the stereo input. */
  addSwap(): Swap {
    let id = B.add_swap(this.id);
    return new Swap(id);
  }

  /** Add node clamping the input amplitude. Can be used for hard distortion. */
  addClip(low: f32, high: f32): Clip {
    let id = B.add_clip(this.id, low, high);
    return new Clip(id);
  }

  /** Reset the node and all child nodes to the state to how it was when they were just added. */
  resetAll(): void {
    B.reset_all(this.id);
  }

  /** Remove all child nodes.
   *
   * After it is called, you should make sure to discard all references to the old
   * child nodes.
   */
  clear(): void {
    B.clear(this.id);
  }
}

@final
export class Sine extends SourceNode {}
@final
export class Square extends SourceNode {}
@final
export class Sawtooth extends SourceNode {}
@final
export class Triangle extends SourceNode {}
@final
export class Noise extends SourceNode {}
@final
export class Empty extends SourceNode {}
@final
export class Zero extends SourceNode {}
@final
export class File extends SourceNode {}

@final
export class Mix extends Node {}
@final
export class AllForOne extends Node {}
@final
export class Gain extends Node {}
@final
export class Loop extends Node {}
@final
export class Concat extends Node {}
@final
export class Pan extends Node {}
@final
export class Mute extends Node {}
@final
export class Pause extends Node {}
@final
export class TrackPosition extends Node {}
@final
export class LowPass extends Node {}
@final
export class HighPass extends Node {}
@final
export class TakeLeft extends Node {}
@final
export class TakeRight extends Node {}
@final
export class Swap extends Node {}
@final
export class Clip extends Node {}

@final
class Out extends Node {}

/** The root audio node. */
export const OUT = new Out(0);
