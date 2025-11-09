import * as B from "./bindings";
import { File } from "./fs";
import { strAddr, strSize, toUtf8 } from "./memory";

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

export class RGB {
  r: i8;
  g: i8;
  b: i8;

  constructor(r_: i8, g_: i8, b_: i8) {
    this.r = r_;
    this.g = g_;
    this.b = b_;
  }

  static new(r: i8, g: i8, b: i8): RGB {
    return new RGB(r, g, b);
  }
}

export class Point {
  x: i32;
  y: i32;

  constructor(x_: i32, y_: i32) {
    this.x = x_;
    this.y = y_;
  }

  static new(x: i32, y: i32): Point {
    return new Point(x, y);
  }
}

export class LineStyle {
  color: Color;
  width: i32;

  constructor(c: Color, w: i32) {
    this.color = c;
    this.width = w;
  }

  static new(c: Color, w: i32): LineStyle {
    return new LineStyle(c, w);
  }
}

export class Style {
  fill_color: Color;
  stroke_color: Color;
  stroke_width: i32;

  constructor(fc: Color, sc: Color, w: i32) {
    this.fill_color = fc;
    this.stroke_color = sc;
    this.stroke_width = w;
  }

  /** Create a shape style filled with a color and without a stroke. */
  static solid(c: Color): Style {
    return new Style(c, Color.None, 0);
  }

  /** Create a shape style with a stroke and no fill color (transparent body). */
  static outlined(c: Color, w: i32): Style {
    return new Style(Color.None, c, w);
  }

  static new(fill: Color, stroke: Color, stroke_width: i32): Style {
    return new Style(fill, stroke, stroke_width);
  }
}

export class Size {
  width: i32;
  height: i32;

  constructor(w: i32, h: i32) {
    this.width = w;
    this.height = h;
  }

  static new(w: i32, h: i32): Size {
    return new Size(w, h);
  }
}

export class Angle {
  private r: f32;

  constructor(r: f32) {
    this.r = r;
  }

  /** Make an angle in radians where TAU (doubled PI) is the full circle. */
  static fromRadians(r: f32): Angle {
    return new Angle(r);
  }

  /** Make an angle in degrees where 360.0 is the full circle. */
  static fromDegrees(d: f32): Angle {
    const r = (d * f32(Math.PI)) / 180.0;
    return new Angle(r);
  }

  radians(): f32 {
    return this.r;
  }

  degrees(): f32 {
    return (this.r * 180.0) / f32(Math.PI);
  }
}

export class Image {
  readonly _raw: ArrayBuffer;

  constructor(raw: ArrayBuffer) {
    this._raw = raw;
  }

  static fromFile(file: File): Image {
    return new Image(file.toArrayBuffer());
  }
}

export class SubImage {
  readonly _raw: ArrayBuffer;
  point: Point;
  size: Size;

  constructor(r: ArrayBuffer, p: Point, s: Size) {
    this._raw = r;
    this.point = p;
    this.size = s;
  }
}

export class Font {
  readonly _raw: ArrayBuffer;

  constructor(raw: ArrayBuffer) {
    this._raw = raw;
  }

  static fromFile(file: File): Font {
    return new Font(file.toArrayBuffer());
  }

  sub(p: Point, s: Size): SubImage {
    return new SubImage(this._raw, p, s);
  }
}

export class Canvas {
  private readonly _raw: ArrayBuffer;

  constructor(s: Size) {
    const headerSize = 5 + 8;
    const bodySize = (s.width * s.height) / 2;
    const raw = new Uint8Array(headerSize + bodySize);
    raw[0] = 0x21; // magic number
    raw[1] = 4; // BPP
    raw[2] = u8(s.width); // width
    raw[3] = u8(s.width >> 8); // width
    raw[4] = 255; // transparency

    // color swaps
    for (let i: u8 = 0; i < u8(8); i++) {
      raw[5 + i] = ((i * 2) << 4) | (i * 2 + 1);
    }
    this._raw = raw;
  }

  static new(s: Size): Canvas {
    return new Canvas(s);
  }

  toArrayBuffer(): ArrayBuffer {
    return this._raw;
  }

  toImage(): Image {
    return new Image(this._raw);
  }
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

/** Draw a circle with the given diameter. */
export function drawCircle(p: Point, d: i32, s: Style): void {
  B.draw_circle(p.x, p.y, d, s.fill_color, s.stroke_color, s.stroke_width);
}

/** Draw an ellipse (oval). */
export function drawEllipse(p: Point, b: Size, s: Style): void {
  B.draw_ellipse(
    p.x,
    p.y,
    b.width,
    b.height,
    s.fill_color,
    s.stroke_color,
    s.stroke_width
  );
}

/** Draw a triangle. */
export function drawTriangle(a: Point, b: Point, c: Point, s: Style): void {
  B.draw_triangle(
    a.x,
    a.y,
    b.x,
    b.y,
    c.x,
    c.y,
    s.fill_color,
    s.stroke_color,
    s.stroke_width
  );
}

/** Draw an arc. */
export function drawArc(p: Point, d: i32, start: Angle, sweep: Angle, s: Style): void {
  B.draw_arc(
    p.x,
    p.y,
    d,
    start.radians(),
    sweep.radians(),
    s.fill_color,
    s.stroke_color,
    s.stroke_width
  );
}

/** Draw a sector. */
export function drawSector(p: Point, d: i32, start: Angle, sweep: Angle, s: Style): void {
  B.draw_sector(
    p.x,
    p.y,
    d,
    start.radians(),
    sweep.radians(),
    s.fill_color,
    s.stroke_color,
    s.stroke_width
  );
}

export function drawText(t: string, f: Font, p: Point, c: Color): void {
  let utf8 = toUtf8(t);
  B.draw_text(
    strAddr(utf8),
    strSize(utf8),
    strAddr(f._raw),
    strSize(f._raw),
    p.x,
    p.y,
    c
  );
}

/** Render an image at the given point. */
export function drawImage(i: Image, p: Point): void {
  let buf = i._raw;
  B.draw_image(strAddr(buf), strSize(buf), p.x, p.y);
}

export function drawSubImage(i: SubImage, p: Point): void {
  B.draw_sub_image(
    strAddr(i._raw),
    strSize(i._raw),
    p.x,
    p.y,
    i.point.x,
    i.point.y,
    i.size.width,
    i.size.height
  );
}

/** Render a QR code for the given text. */
export function drawQr(t: string, p: Point, black: Color, white: Color): void {
  let utf8 = toUtf8(t);
  B.draw_qr(strAddr(utf8), strSize(utf8), p.x, p.y, black, white);
}

/** Set the target image for all subsequent drawing operations. */
export function setCanvas(c: Canvas): void {
  const buf = c.toArrayBuffer();
  B.set_canvas(strAddr(buf), strSize(buf));
}

/** Make all subsequent drawing operations target the screen instead of a canvas.
 *
 * Cancels the effect of setCanvas.
 */
export function unsetCanvas(): void {
  B.unset_canvas();
}
