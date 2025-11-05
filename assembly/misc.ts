import * as B from "./bindings";
import { toUtf8, strAddr, strSize, fromUtf8 } from "./memory";

export function logDebug(t: string): void {
  let utf8 = toUtf8(t);
  B.log_debug(strAddr(utf8), strSize(utf8));
}

export function logError(t: string): void {
  let utf8 = toUtf8(t);
  B.log_error(strAddr(utf8), strSize(utf8));
}

export function setSeed(s: u32): void {
  B.set_seed(s);
}

export function getRandom(): u32 {
  return B.get_random();
}

export function getName(): string {
  let buf = new ArrayBuffer(16);
  let len: u32 = B.get_name(strAddr(buf), strSize(buf));
  let name = buf.slice(0, len);
  return fromUtf8(name);
}

export function quit(): void {
  B.quit();
}
