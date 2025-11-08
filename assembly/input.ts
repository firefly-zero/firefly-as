import * as B from "./bindings";
import { Peer } from "./net";

export class Pad {
  x: i16;
  y: i16;

  constructor(x_: i16, y_: i16) {
    this.x = x_;
    this.y = y_;
  }
}

export function readPad(p: Peer): Pad | null {
  const raw = B.read_pad(p.raw);
  const pressed = raw != 0xffff;
  if (!pressed) {
    return null;
  }
  return new Pad(i16(raw >> 16), i16(raw));
}
