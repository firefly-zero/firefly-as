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

  // TODO(@orsinium): For some reason, AS compiler defines a global variable
  // for every constant below and wasmopt keeps it. This adds 3kb to every binary
  // that imports audio (20 bytes each constant). The same is if these are defined
  // as global constants instead of static fields on class. Find a way to fix it.

  static readonly ZERO: Freq = new Freq(0);

  /** C0, MIDI note #12 */
  static readonly C0: Freq = new Freq(16.351);
  static readonly CS0: Freq = new Freq(17.324);
  static readonly D0: Freq = new Freq(18.354);
  static readonly DS0: Freq = new Freq(19.445);
  static readonly E0: Freq = new Freq(20.601);
  static readonly F0: Freq = new Freq(21.827);
  static readonly FS0: Freq = new Freq(23.124);
  static readonly G0: Freq = new Freq(24.499);
  static readonly GS0: Freq = new Freq(25.956);
  /** A0, the lowest note of a piano */
  static readonly A0: Freq = new Freq(27.5);
  static readonly AS0: Freq = new Freq(29.135);
  /** B0, the lowest note of a 5 string bass */
  static readonly B0: Freq = new Freq(30.868);
  /** C1, the lowest note of double bass with C extension */
  static readonly C1: Freq = new Freq(32.703);
  static readonly CS1: Freq = new Freq(34.648);
  static readonly D1: Freq = new Freq(36.708);
  static readonly DS1: Freq = new Freq(38.891);
  /** E1, the lowest note of a bass */
  static readonly E1: Freq = new Freq(41.203);
  static readonly F1: Freq = new Freq(43.654);
  static readonly FS1: Freq = new Freq(46.249);
  static readonly G1: Freq = new Freq(48.999);
  static readonly GS1: Freq = new Freq(51.913);
  static readonly A1: Freq = new Freq(55);
  static readonly AS1: Freq = new Freq(58.27);
  static readonly B1: Freq = new Freq(61.735);
  static readonly C2: Freq = new Freq(65.406);
  static readonly CS2: Freq = new Freq(69.296);
  static readonly D2: Freq = new Freq(73.416);
  static readonly DS2: Freq = new Freq(77.782);
  /** E2, the lowest note of a guitar. */
  static readonly E2: Freq = new Freq(82.407);
  static readonly F2: Freq = new Freq(87.307);
  static readonly FS2: Freq = new Freq(92.499);
  static readonly G2: Freq = new Freq(97.999);
  static readonly GS2: Freq = new Freq(103.826);
  static readonly A2: Freq = new Freq(110);
  static readonly AS2: Freq = new Freq(116.541);
  static readonly B2: Freq = new Freq(123.471);
  static readonly C3: Freq = new Freq(130.813);
  static readonly CS3: Freq = new Freq(138.591);
  static readonly D3: Freq = new Freq(146.832);
  static readonly DS3: Freq = new Freq(155.563);
  static readonly E3: Freq = new Freq(164.814);
  static readonly F3: Freq = new Freq(174.614);
  static readonly FS3: Freq = new Freq(184.997);
  /** G3, the lowest note of a violin. */
  static readonly G3: Freq = new Freq(195.998);
  static readonly GS3: Freq = new Freq(207.652);
  static readonly A3: Freq = new Freq(220);
  static readonly AS3: Freq = new Freq(233.082);
  static readonly B3: Freq = new Freq(246.942);
  /** C4, the "middle C". */
  static readonly C4: Freq = new Freq(261.626);
  static readonly CS4: Freq = new Freq(277.183);
  static readonly D4: Freq = new Freq(293.665);
  static readonly DS4: Freq = new Freq(311.127);
  static readonly E4: Freq = new Freq(329.628);
  static readonly F4: Freq = new Freq(349.228);
  static readonly FS4: Freq = new Freq(369.994);
  static readonly G4: Freq = new Freq(391.995);
  static readonly GS4: Freq = new Freq(415.305);
  /** A4, the tuning reference note. */
  static readonly A4: Freq = new Freq(440);
  static readonly AS4: Freq = new Freq(466.164);
  static readonly B4: Freq = new Freq(493.883);
  static readonly C5: Freq = new Freq(523.251);
  static readonly CS5: Freq = new Freq(554.365);
  static readonly D5: Freq = new Freq(587.33);
  static readonly DS5: Freq = new Freq(622.254);
  static readonly E5: Freq = new Freq(659.255);
  static readonly F5: Freq = new Freq(698.456);
  static readonly FS5: Freq = new Freq(739.989);
  static readonly G5: Freq = new Freq(783.991);
  static readonly GS5: Freq = new Freq(830.609);
  static readonly A5: Freq = new Freq(880);
  static readonly AS5: Freq = new Freq(932.328);
  static readonly B5: Freq = new Freq(987.767);
  static readonly C6: Freq = new Freq(1046.502);
  static readonly CS6: Freq = new Freq(1108.731);
  static readonly D6: Freq = new Freq(1174.659);
  static readonly DS6: Freq = new Freq(1244.508);
  static readonly E6: Freq = new Freq(1318.51);
  static readonly F6: Freq = new Freq(1396.913);
  static readonly FS6: Freq = new Freq(1479.978);
  static readonly G6: Freq = new Freq(1567.982);
  static readonly GS6: Freq = new Freq(1661.219);
  static readonly A6: Freq = new Freq(1760);
  static readonly AS6: Freq = new Freq(1864.655);
  static readonly B6: Freq = new Freq(1975.533);
  static readonly C7: Freq = new Freq(2093.005);
  static readonly CS7: Freq = new Freq(2217.461);
  static readonly D7: Freq = new Freq(2349.318);
  static readonly DS7: Freq = new Freq(2489.016);
  static readonly E7: Freq = new Freq(2637.021);
  static readonly F7: Freq = new Freq(2793.826);
  static readonly FS7: Freq = new Freq(2959.955);
  static readonly G7: Freq = new Freq(3135.964);
  static readonly GS7: Freq = new Freq(3322.438);
  static readonly A7: Freq = new Freq(3520);
  static readonly AS7: Freq = new Freq(3729.31);
  static readonly B7: Freq = new Freq(3951.066);
  /** C8, the highest note of a piano. */
  static readonly C8: Freq = new Freq(4186.009);
  static readonly CS8: Freq = new Freq(4434.922);
  static readonly D8: Freq = new Freq(4698.636);
  static readonly DS8: Freq = new Freq(4978.032);
  static readonly E8: Freq = new Freq(5274.042);
  static readonly F8: Freq = new Freq(5587.652);
  static readonly FS8: Freq = new Freq(5919.91);
  static readonly G8: Freq = new Freq(6271.928);
  static readonly GS8: Freq = new Freq(6644.876);
  static readonly A8: Freq = new Freq(7040);
  static readonly AS8: Freq = new Freq(7458.62);
  static readonly B8: Freq = new Freq(7902.132);
  static readonly C9: Freq = new Freq(8372.018);
  static readonly CS9: Freq = new Freq(8869.844);
  static readonly D9: Freq = new Freq(9397.272);
  static readonly DS9: Freq = new Freq(9956.064);
  static readonly E9: Freq = new Freq(10548.084);
  static readonly F9: Freq = new Freq(11175.304);
  static readonly FS9: Freq = new Freq(11839.82);
  static readonly G9: Freq = new Freq(12543.856);
  /** G#9, MIDI note #128, the top of the MIDI tuning range. */
  static readonly GS9: Freq = new Freq(13289.752);
  static readonly A9: Freq = new Freq(14080);
  static readonly AS9: Freq = new Freq(14917.24);
  /** B9. For most of adults, it is already beyond the hearing range. */
  static readonly B9: Freq = new Freq(15804.264);
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

  modulate(nodeId: u32, param: u32, low: f32, high: f32): void {
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

  modulate(nodeId: u32, param: u32, low: f32, high: f32): void {
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

  modulate(nodeId: u32, param: u32, low: f32, high: f32): void {
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

  modulate(nodeId: u32, param: u32, low: f32, high: f32): void {
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

  modulate(nodeId: u32, param: u32, low: f32, high: f32): void {
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
export class Sine extends SourceNode {
  modulate(low: Freq, high: Freq, mod: Modulator): void {
    mod.modulate(this.id, 0, low._h, high._h);
  }

  set(val: Freq): void {
    B.set_param(this.id, 0, val._h);
  }
}

@final
export class Square extends SourceNode {
  modulate(low: Freq, high: Freq, mod: Modulator): void {
    mod.modulate(this.id, 0, low._h, high._h);
  }

  set(val: Freq): void {
    B.set_param(this.id, 0, val._h);
  }
}

@final
export class Sawtooth extends SourceNode {
  modulate(low: Freq, high: Freq, mod: Modulator): void {
    mod.modulate(this.id, 0, low._h, high._h);
  }

  set(val: Freq): void {
    B.set_param(this.id, 0, val._h);
  }
}

@final
export class Triangle extends SourceNode {
  modulate(low: Freq, high: Freq, mod: Modulator): void {
    mod.modulate(this.id, 0, low._h, high._h);
  }

  set(val: Freq): void {
    B.set_param(this.id, 0, val._h);
  }
}

@final
export class Noise extends SourceNode {}

@final
export class Empty extends SourceNode {}

@final
export class Zero extends SourceNode {}

@final
export class File extends SourceNode {
  seek(val: Time): void {
    B.set_param(this.id, 0, val._s);
  }
}

@final
export class Mix extends Node {}

@final
export class AllForOne extends Node {}

@final
export class Gain extends Node {
  modulate(low: f32, high: f32, mod: Modulator): void {
    mod.modulate(this.id, 0, low, high);
  }

  set(val: f32): void {
    B.set_param(this.id, 0, val);
  }
}

@final
export class Loop extends Node {}

@final
export class Concat extends Node {}

@final
export class Pan extends Node {
  modulate(low: f32, high: f32, mod: Modulator): void {
    mod.modulate(this.id, 0, low, high);
  }

  set(val: f32): void {
    B.set_param(this.id, 0, val);
  }
}

@final
export class Mute extends Node {
  modulate(low: f32, high: f32, mod: Modulator): void {
    mod.modulate(this.id, 0, low, high);
  }

  mute(): void {
    B.set_param(this.id, 0, 0);
  }

  unmute(): void {
    B.set_param(this.id, 0, 1);
  }
}

@final
export class Pause extends Node {
  modulate(low: f32, high: f32, mod: Modulator): void {
    mod.modulate(this.id, 0, low, high);
  }

  pause(): void {
    B.set_param(this.id, 0, 0);
  }

  play(): void {
    B.set_param(this.id, 0, 1);
  }
}

@final
export class TrackPosition extends Node {}

@final
export class LowPass extends Node {
  modulateFreq(low: Freq, high: Freq, mod: Modulator): void {
    mod.modulate(this.id, 0, low._h, high._h);
  }

  setFreq(val: Freq): void {
    B.set_param(this.id, 0, val._h);
  }
}

@final
export class HighPass extends Node {
  modulateFreq(low: Freq, high: Freq, mod: Modulator): void {
    mod.modulate(this.id, 0, low._h, high._h);
  }

  setFreq(val: Freq): void {
    B.set_param(this.id, 0, val._h);
  }
}

@final
export class TakeLeft extends Node {}

@final
export class TakeRight extends Node {}

@final
export class Swap extends Node {}

@final
export class Clip extends Node {
  modulateBoth(low: f32, high: f32, mod: Modulator): void {
    mod.modulate(this.id, 0, low, high);
  }

  setBoth(val: f32): void {
    B.set_param(this.id, 0, val);
  }

  modulateLow(low: f32, high: f32, mod: Modulator): void {
    mod.modulate(this.id, 1, low, high);
  }

  setLow(val: f32): void {
    B.set_param(this.id, 1, val);
  }

  modulateHigh(low: f32, high: f32, mod: Modulator): void {
    mod.modulate(this.id, 2, low, high);
  }

  setHigh(val: f32): void {
    B.set_param(this.id, 2, val);
  }
}

@final
class Out extends Node {}

/** The root audio node. */
export const OUT = new Out(0);
