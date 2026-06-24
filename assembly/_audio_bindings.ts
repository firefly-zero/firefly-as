// generators

// @ts-ignore: decorator
@external("audio", "add_sine")
export declare function add_sine(parent_id: u32, freq: f32, phase: f32): u32;
// @ts-ignore: decorator
@external("audio", "add_square")
export declare function add_square(parent_id: u32, freq: f32, phase: f32): u32;
// @ts-ignore: decorator
@external("audio", "add_sawtooth")
export declare function add_sawtooth(parent_id: u32, freq: f32, phase: f32): u32;
// @ts-ignore: decorator
@external("audio", "add_triangle")
export declare function add_triangle(parent_id: u32, freq: f32, phase: f32): u32;
// @ts-ignore: decorator
@external("audio", "add_noise")
export declare function add_noise(parent_id: u32, seed: i32): u32;
// @ts-ignore: decorator
@external("audio", "add_empty")
export declare function add_empty(parent_id: u32): u32;
// @ts-ignore: decorator
@external("audio", "add_zero")
export declare function add_zero(parent_id: u32): u32;
// @ts-ignore: decorator
@external("audio", "add_file")
export declare function add_file(parent: u32, ptr: u32, len: u32): u32;

// nodes

// @ts-ignore: decorator
@external("audio", "add_mix")
export declare function add_mix(parent_id: u32): u32;
// @ts-ignore: decorator
@external("audio", "add_all_for_one")
export declare function add_all_for_one(parent_id: u32): u32;
// @ts-ignore: decorator
@external("audio", "add_gain")
export declare function add_gain(parent_id: u32, lvl: f32): u32;
// @ts-ignore: decorator
@external("audio", "add_loop")
export declare function add_loop(parent_id: u32): u32;
// @ts-ignore: decorator
@external("audio", "add_concat")
export declare function add_concat(parent_id: u32): u32;
// @ts-ignore: decorator
@external("audio", "add_pan")
export declare function add_pan(parent_id: u32, lvl: f32): u32;
// @ts-ignore: decorator
@external("audio", "add_mute")
export declare function add_mute(parent_id: u32): u32;
// @ts-ignore: decorator
@external("audio", "add_pause")
export declare function add_pause(parent_id: u32): u32;
// @ts-ignore: decorator
@external("audio", "add_track_position")
export declare function add_track_position(parent_id: u32): u32;
// @ts-ignore: decorator
@external("audio", "add_low_pass")
export declare function add_low_pass(parent_id: u32, freq: f32, q: f32): u32;
// @ts-ignore: decorator
@external("audio", "add_high_pass")
export declare function add_high_pass(parent_id: u32, freq: f32, q: f32): u32;
// @ts-ignore: decorator
@external("audio", "add_take_left")
export declare function add_take_left(parent_id: u32): u32;
// @ts-ignore: decorator
@external("audio", "add_take_right")
export declare function add_take_right(parent_id: u32): u32;
// @ts-ignore: decorator
@external("audio", "add_swap")
export declare function add_swap(parent_id: u32): u32;
// @ts-ignore: decorator
@external("audio", "add_clip")
export declare function add_clip(parent_id: u32, low: f32, high: f32): u32;

// node actions

// @ts-ignore: decorator
@external("audio", "reset")
export declare function reset(node_id: u32): void;
// @ts-ignore: decorator
@external("audio", "reset_all")
export declare function reset_all(node_id: u32): void;
// @ts-ignore: decorator
@external("audio", "clear")
export declare function clear(node_id: u32): void;
// @ts-ignore: decorator
@external("audio", "set_param")
export declare function set_param(node_id: u32, param: u32, val: f32): void;

// modulators

// @ts-ignore: decorator
@external("audio", "mod_linear")
export declare function mod_linear(node_id: u32,param: u32,start: f32,end: f32,start_at: u32,end_at: u32        ): void;
// @ts-ignore: decorator
@external("audio", "mod_hold")
export declare function mod_hold(id: u32, param: u32, low: f32, high: f32, time: u32): void;
// @ts-ignore: decorator
@external("audio", "mod_sine")
export declare function mod_sine(id: u32, param: u32, freq: f32, low: f32, high: f32): void;
// @ts-ignore: decorator
@external("audio", "mod_square")
export declare function mod_square(id: u32, param: u32, low: f32, high: f32, period: u32): void;
// @ts-ignore: decorator
@external("audio", "mod_sawtooth")
export declare function mod_sawtooth(id: u32, param: u32, low: f32, high: f32, period: u32): void;
// @ts-ignore: decorator
@external("audio", "mod_adsr")
export declare function mod_adsr(id: u32,param: u32,low: f32,high: f32,attack: u32,decay: u32,sustain: u32,sustain_level: f32,release: u32        ): void;
