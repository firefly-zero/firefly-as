// -- GRAPHICS -- //

// @ts-ignore: decorator
@external("graphics", "clear_screen")
export declare function clear_screen(color: i32): void

// @ts-ignore: decorator
@external("graphics", "set_color")
export declare function set_color(index: i32, r: i32, g: i32, b: i32): void

// @ts-ignore: decorator
@external("graphics", "draw_point")
export declare function draw_point(x: i32, y: i32, color: i32): void

// @ts-ignore: decorator
@external("graphics", "draw_line")
export declare function draw_line(
    p1_x: i32,
    p1_y: i32,
    p2_x: i32,
    p2_y: i32,
    color: i32,
    stroke_width: i32,
): void

// @ts-ignore: decorator
@external("graphics", "draw_rect")
export declare function draw_rect(
    x: i32,
    y: i32,
    width: i32,
    height: i32,
    fill_color: i32,
    stroke_color: i32,
    stroke_width: i32,
): void

// @ts-ignore: decorator
@external("graphics", "draw_rounded_rect")
export declare function draw_rounded_rect(
    x: i32,
    y: i32,
    width: i32,
    height: i32,
    corner_width: i32,
    corner_height: i32,
    fill_color: i32,
    stroke_color: i32,
    stroke_width: i32,
): void

// @ts-ignore: decorator
@external("graphics", "draw_circle")
export declare function draw_circle(
    x: i32,
    y: i32,
    diameter: i32,
    fill_color: i32,
    stroke_color: i32,
    stroke_width: i32,
): void

// @ts-ignore: decorator
@external("graphics", "draw_ellipse")
export declare function draw_ellipse(
    x: i32,
    y: i32,
    width: i32,
    height: i32,
    fill_color: i32,
    stroke_color: i32,
    stroke_width: i32,
): void

// @ts-ignore: decorator
@external("graphics", "draw_triangle")
export declare function draw_triangle(
    p1_x: i32,
    p1_y: i32,
    p2_x: i32,
    p2_y: i32,
    p3_x: i32,
    p3_y: i32,
    fill_color: i32,
    stroke_color: i32,
    stroke_width: i32,
): void

// @ts-ignore: decorator
@external("graphics", "draw_arc")
export declare function draw_arc(
    x: i32,
    y: i32,
    diameter: i32,
    angle_start: f32,
    angle_sweep: f32,
    fill_color: i32,
    stroke_color: i32,
    stroke_width: i32,
): void

// @ts-ignore: decorator
@external("graphics", "draw_sector")
export declare function draw_sector(
    x: i32,
    y: i32,
    diameter: i32,
    angle_start: f32,
    angle_sweep: f32,
    fill_color: i32,
    stroke_color: i32,
    stroke_width: i32,
): void

// @ts-ignore: decorator
@external("graphics", "draw_text")
export declare function draw_text(
    text_ptr: u32,
    text_len: u32,
    font_ptr: u32,
    font_len: u32,
    x: i32,
    y: i32,
    color: i32,
): void

// @ts-ignore: decorator
@external("graphics", "draw_qr")
export declare function draw_qr(ptr: u32, len: u32, x: i32, y: i32, black: i32, white: i32): void

// @ts-ignore: decorator
@external("graphics", "draw_sub_image")
export declare function draw_sub_image(
    ptr: u32,
    len: u32,
    x: i32,
    y: i32,
    sub_x: i32,
    sub_y: i32,
    sub_width: i32,
    sub_height: i32,
): void

// @ts-ignore: decorator
@external("graphics", "draw_image")
export declare function draw_image(ptr: u32, len: u32, x: i32, y: i32): void

// @ts-ignore: decorator
@external("graphics", "set_canvas")
export declare function set_canvas(ptr: u32, len: u32): void

// @ts-ignore: decorator
@external("graphics", "unset_canvas")
export declare function unset_canvas(): void

// -- INPUT -- //

// @ts-ignore: decorator
@external("input", "read_pad")
export declare function read_pad(peer: u32) : u32

// @ts-ignore: decorator
@external("input", "read_buttons")
export declare function read_buttons(peer: u32) : u32

// -- NET -- //

// @ts-ignore: decorator
@external("net", "get_me")
export declare function get_me() : u32;

// @ts-ignore: decorator
@external("net", "get_peers")
export declare function get_peers() : u32;

// @ts-ignore: decorator
@external("net", "save_stash")
export declare function save_stash(peer: u32, ptr: u32, len: u32): void;

// @ts-ignore: decorator
@external("net", "load_stash")
export declare function load_stash(peer: u32, ptr: u32, len: u32): u32;

// -- MENU -- //

// @ts-ignore: decorator
@external("menu", "add_menu_item")
export declare function add_menu_item(index: u32, text_ptr: u32, text_len: u32): void

// @ts-ignore: decorator
@external("menu", "remove_menu_item")
export declare function remove_menu_item(index: u32): void

// @ts-ignore: decorator
@external("menu", "open_menu")
export declare function open_menu(): void

// -- STATS -- //

// @ts-ignore: decorator
@external("stats", "add_progress")
export declare function add_progress(peer_id: u32, badge_id: u32, val: i32) : u32;

// @ts-ignore: decorator
@external("stats", "add_score")
export declare function add_score(peer_id: u32, board_id: u32, new_score: i32) : i32;

// -- MISC -- //

// @ts-ignore: decorator
@external("misc", "log_debug")
export declare function log_debug(ptr: u32, len: u32): void;

// @ts-ignore: decorator
@external("misc", "log_error")
export declare function log_error(ptr: u32, len: u32): void;

// @ts-ignore: decorator
@external("misc", "set_seed")
export declare function set_seed(seed: u32): void;

// @ts-ignore: decorator
@external("misc", "get_random")
export declare function get_random() : u32;

// @ts-ignore: decorator
@external("misc", "get_name")
export declare function get_name(idx: u32, ptr: u32) : u32;

// @ts-ignore: decorator
@external("misc", "quit")
export declare function quit(): void;
