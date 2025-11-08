import { Peer } from "./net";
import * as B from "./bindings";

export class Badge {
  _raw: u8;

  constructor(v: u8) {
    this._raw = v;
  }

  new(v: u8): Badge {
    return new Badge(v);
  }
}

export class Board {
  _raw: u8;

  constructor(v: u8) {
    this._raw = v;
  }

  new(v: u8): Badge {
    return new Badge(v);
  }
}

export class Progress {
  done: u16;
  goal: u16;

  constructor(done_: u16, goal_: u16) {
    this.done = done_;
    this.goal = goal_;
  }

  new(done: u16, goal: u16): Progress {
    return new Progress(done, goal);
  }

  earned(): boolean {
    return this.done >= this.goal;
  }
}

export function getProgress(p: Peer, b: Badge): Progress {
  return addProgress(p, b, 0);
}

export function addProgress(p: Peer, b: Badge, val: i16): Progress {
  const raw = B.add_progress(p._raw, b._raw, val);
  return new Progress(u16(raw >> 16), u16(raw));
}

export function getScore(p: Peer, b: Badge): i16 {
  return addScore(p, b, 0);
}

export function addScore(p: Peer, b: Badge, val: i16): i16 {
  return B.add_score(p._raw, b._raw, val);
}
