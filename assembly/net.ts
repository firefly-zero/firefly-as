import * as B from "./bindings";

export class Peer {
  val: u8;

  constructor(v: u8) {
    this.val = v;
  }

  static combined(): Peer {
    return new Peer(0xff);
  }
}

export function getMe(): Peer {
  return new Peer(B.get_me());
}
