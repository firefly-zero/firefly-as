import * as B from "./bindings";

export class Peer {
  raw: u8;

  constructor(v: u8) {
    this.raw = v;
  }

  static combined(): Peer {
    return new Peer(0xff);
  }
}

export class Peers {
  raw: u32;

  constructor(v: u32) {
    this.raw = v;
  }

  length(): i32 {
    return popcnt(this.raw);
  }

  contains(peer: Peer): boolean {
    return ((this.raw >> peer.raw) & 1) !== 0;
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
