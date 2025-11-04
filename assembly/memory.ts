type UTF8 = ArrayBuffer;

export function toUtf8(s: string): UTF8 {
  return String.UTF8.encode(s);
}

export function fromUtf8(s: UTF8): string {
  return String.UTF8.decode(s);
}

export function strAddr(s: UTF8): usize {
  return changetype<usize>(s);
}

export function strSize(s: UTF8): usize {
  return s.byteLength;
}
