import * as B from "./bindings";
import { toUtf8, strAddr, strSize } from "./memory";

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

export function quit(): void {
  B.quit();
}
