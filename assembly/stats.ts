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
