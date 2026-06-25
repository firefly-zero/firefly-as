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
    return new Time(s * SAMPLE_RATE);
  }

  static ms(ms: u32): Time {
    return new Time((ms * SAMPLE_RATE) / 1000);
  }
}

/** Modulator can be attached to a node to change a node parameter over time.
 *
 * Modulators include both LFOs (Low-Frequency Oscillator) and envelopes.
 * The difference is that LFOs keep oscillating between values
 * while envelopes go from one value to another and then stop.
 *
 * Internally, modulators only produce values from 0 to 1.
 * Then, to get the final value of the parameter,
 * the value from the modulator is projected on the range
 * between `low` and `high` arguments passed together
 * with the modulator when attaching a modulator to a node.
 * For example, [`Node<Sine>::modulate`] accepts the range of modulated values
 * for the sine wave frequency (which can be used for vibrato effect).
 *
 * Even if a node has multiple parameters that can be modulated,
 * currently  single node may have at most one modulator attached.
 */
export interface Modulator {
  modulate(nodeId: u32, param: u32, low: f32, high: f32): void;
}

/**  Linear (ramp up or down) envelope.
 *
 * It looks like this: `⎽╱⎺` (or `⎺╲⎽` if `low` is bigger than `high`).
 *
 * The value before `start_at` is 0, the value after `end_at` is 1,
 * and the value between `start_at` and `end_at` changes linearly from 0 to 1.
 *
 * Most often used with [`Gain`] for fade in and fade out effect.
 */
@final
export class LinearModulator implements Modulator {
  private startAt: Time;
  private endAt: Time;

  constructor(start: Time, end: Time) {
    this.startAt = start;
    this.endAt = end;
  }

  static new(startAt: Time, endAt: Time): LinearModulator {
    return new LinearModulator(startAt, endAt);
  }

  modulate(nodeId: u32, param: u32, low: f32, high: f32): void {
    B.mod_linear(nodeId, param, low, high, this.startAt._s, this.endAt._s);
  }
}

/** Hold envelope.
 *
 * It looks like this: `⎽│⎺` (or `⎺│⎽` if `low` is bigger than `high`).
 *
 * The value before `time` is 0 and the value after `time` is 1.
 * Equivalent to [`LinearModulator`] with `start_at` being equal to `end_at`.
 */
@final
export class HoldModulator implements Modulator {
  private time: Time;

  constructor(t: Time) {
    this.time = t;
  }

  static new(time: Time): HoldModulator {
    return new HoldModulator(time);
  }

  modulate(nodeId: u32, param: u32, low: f32, high: f32) {
    B.mod_hold(nodeId, param, low, high, this.time._s);
  }
}

/** ADSR envelope.
 *
 * It looks like this: `🭋🭍🬹🬿`
 *
 *  1. Until `attack`, the value goes from 0 to 1;
 *  2. Until `decay`, it goes from 1 to `sustain_level`;
 *  3. Until `sustain`, it holds `sustain_level`;
 *  4. Until `release`, it goes from `sustain_level` to 0;
 *  5. After `release`, it holds 0.
 *
 * Most commonly used with [`Gain`].
 */
@final
export class AdsrModulator implements Modulator {
  /** When the value reaches 1. */
  private attack: Time;
  /** When the value reaches `sustain_level`. */
  private decay: Time;
  /** Until when the value holds `sustain_level`. */
  private sustain: Time;
  /** The value generated from `decay` until `sustain`. */
  private sustain_level: f32;
  /** When the value drops to 0. */
  private release: Time;

  constructor(a: Time, d: Time, s: Time, sl: f32, r: Time) {
    this.attack = a;
    this.decay = d;
    this.sustain = s;
    this.sustain_level = sl;
    this.release = r;
  }

  static new(
    attack: Time,
    decay: Time,
    sustain: Time,
    sustain_level: f32,
    release: Time,
  ): AdsrModulator {
    return new AdsrModulator(attack, decay, sustain, sustain_level, release);
  }

  modulate(nodeId: u32, param: u32, low: f32, high: f32) {
    B.mod_adsr(
      nodeId,
      param,
      low,
      high,
      this.attack._s,
      this.decay._s,
      this.sustain._s,
      this.sustain_level,
      this.release._s,
    );
  }
}

/** Sine wave low-frequency oscillator.
 *
 * It looks like this: `∿`.
 *
 * Most commonly used with [`Sine`] (or another wave generator)
 * to produce vibrato effect.
 */
@final
export class SineModulator implements Modulator {
  private freq: Freq;

  constructor(f: Freq) {
    this.freq = f;
  }

  static new(f: Freq): SineModulator {
    return new SineModulator(f);
  }

  modulate(nodeId: u32, param: u32, low: f32, high: f32) {
    B.mod_sine(nodeId, param, this.freq._h, low, high);
  }
}

/** Square wave low-frequency oscillator.
 *
 * It looks like this: `🭿🭾🭿🭾🭿🭾🭿🭾`.
 */
@final
export class SquareModulator implements Modulator {
  private period: Time;

  constructor(p: Time) {
    this.period = p;
  }

  static new(period: Time): SquareModulator {
    return new SquareModulator(period);
  }

  modulate(nodeId: u32, param: u32, low: f32, high: f32) {
    B.mod_square(nodeId, param, low, high, this.period._s);
  }
}

/** Sawtooth wave low-frequency oscillator.
 *
 * It looks like this: `╱│╱│╱│╱│`.
 */
@final
export class SawtoothModulator implements Modulator {
  private period: Time;

  constructor(p: Time) {
    this.period = p;
  }

  static new(period: Time): SawtoothModulator {
    return new SawtoothModulator(period);
  }

  modulate(nodeId: u32, param: u32, low: f32, high: f32) {
    B.mod_sawtooth(nodeId, param, low, high, this.period._s);
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
export class Gain extends Node {
  modulate(low: f32, high: f32, mod: Modulator): void {
    mod.modulate(this.id, 0, low, high);
  }
}
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
