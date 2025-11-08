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

export class Buttons {
  s: boolean;
  e: boolean;
  w: boolean;
  n: boolean;
  menu: boolean;

  constructor(raw: u32) {
    this.s = hasBitSet(raw, 0);
    this.e = hasBitSet(raw, 1);
    this.w = hasBitSet(raw, 2);
    this.n = hasBitSet(raw, 3);
    this.menu = hasBitSet(raw, 4);
  }

  anyPressed(): boolean {
    return this.s || this.e || this.w || this.n || this.menu;
  }
}

function hasBitSet(val: u32, bit: u32): boolean {
  return ((val >> bit) & 1) != 0;
}

export function readPad(p: Peer): Pad | null {
  const raw = B.read_pad(p._raw);
  const pressed = raw != 0xffff;
  if (!pressed) {
    return null;
  }
  return new Pad(i16(raw >> 16), i16(raw));
}

export function readButtons(p: Peer): Buttons {
  const raw = B.read_buttons(p._raw);
  return new Buttons(raw);
}
