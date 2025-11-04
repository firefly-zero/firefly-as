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
