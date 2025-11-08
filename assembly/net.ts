import * as B from "./bindings";
import { strAddr, strSize } from "./memory";

export class Peer {
  readonly _raw: u8;

  constructor(v: u8) {
    this._raw = v;
  }

  static combined(): Peer {
    return new Peer(0xff);
  }
}

export class Peers {
  private readonly _raw: u32;

  constructor(v: u32) {
    this._raw = v;
  }

  length(): i32 {
    return popcnt(this._raw);
  }

  contains(peer: Peer): boolean {
    return ((this._raw >> peer._raw) & 1) !== 0;
  }

  toArray(): Peer[] {
    const res = [];
    for (let rawPeer = 0; rawPeer < 32; rawPeer++) {
      let peer = new Peer(rawPeer);
      if (this.contains(peer)) {
        res.push(peer);
      }
    }
    return res;
  }
}

export function getMe(): Peer {
  return new Peer(u8(B.get_me()));
}

export function getPeers(): Peers {
  return new Peers(B.get_peers());
}

export type Stash = ArrayBuffer;

export function saveStash(p: Peer, s: Stash): void {
  B.save_stash(p._raw, strAddr(s), strSize(s));
}

export function loadStash(p: Peer, buf: ArrayBuffer): Stash {
  const size = B.load_stash(p._raw, strAddr(buf), strSize(buf));
  return buf.slice(0, size);
}
