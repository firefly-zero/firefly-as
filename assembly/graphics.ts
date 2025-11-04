import * as B from "./bindings";

export enum Color {
  /** No color (100% transparency). */
  None = 0,
  /** Black color: #1A1C2C. */
  Black = 1,
  /** Purple color: #5D275D. */
  Purple = 2,
  /** Red color: #B13E53. */
  Red = 3,
  /** Orange color: #EF7D57. */
  Orange = 4,
  /** Yellow color: #FFCD75. */
  Yellow = 5,
  /** Light green color: #A7F070. */
  LightGreen = 6,
  /** Green color: #38B764. */
  Green = 7,
  /** Dark green color: #257179. */
  DarkGreen = 8,
  /** Dark blue color: #29366F. */
  DarkBlue = 9,
  /** Blue color: #3B5DC9. */
  Blue = 10,
  /** Light blue color: #41A6F6. */
  LightBlue = 11,
  /** Cyan color: #73EFF7. */
  Cyan = 12,
  /** White color: #F4F4F4. */
  White = 13,
  /** Light gray color: #94B0C2. */
  LightGray = 14,
  /** Gray color: #566C86. */
  Gray = 15,
  /** Dark gray color: #333C57. */
  DarkGray = 16,
}

export interface RGB {
  r: i8;
  g: i8;
  b: i8;
}

export interface Point {
  x: i32;
  y: i32;
}

export interface LineStyle {
  color: Color;
  width: i32;
}

export interface Style {
  fill_color: Color;
  stroke_color: Color;
  stroke_width: i32;
}

/** Create a shape style filled with a color and without a stroke. */
export function solid(c: Color): Style {
  return { fill_color: c, stroke_color: Color.None, stroke_width: 0 };
}

/** Create a shape style with a stroke and no fill color (transparent body). */
export function outlined(c: Color, w: i32): Style {
  return { fill_color: Color.None, stroke_color: c, stroke_width: w };
}

export interface Size {
  width: i32;
  height: i32;
}

/** Fill the whole frame with the given color. */
export function clearScreen(c: Color): void {
  B.clear_screen(c);
}

/** Set a color value in the palette. */
export function setColor(c: Color, v: RGB): void {
  B.set_color(c, v.r, v.g, v.b);
}

/** Set a single point (1 pixel if scaling is 1) on the frame. */
export function drawPoint(p: Point, c: Color): void {
  B.draw_point(p.x, p.y, c);
}

/** Draw a straight line from point a to point b. */
export function drawLine(a: Point, b: Point, s: LineStyle): void {
  B.draw_line(a.x, a.y, b.x, b.y, s.color, s.width);
}

/** Draw a rectangle filling the given bounding box. */
export function drawRect(p: Point, b: Size, s: Style): void {
  B.draw_rect(p.x, p.y, b.width, b.height, s.fill_color, s.stroke_color, s.stroke_width);
}

/** Draw a rectangle with rounded corners. */
export function drawRoundedRect(p: Point, b: Size, corner: Size, s: Style): void {
  B.draw_rounded_rect(
    p.x,
    p.y,
    b.width,
    b.height,
    corner.width,
    corner.height,
    s.fill_color,
    s.stroke_color,
    s.stroke_width
  );
}
