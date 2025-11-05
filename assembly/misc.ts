import * as B from "./bindings";
import { toUtf8, strAddr, strSize } from "./memory";

export function logDebug(t: string): void {
  let utf8 = toUtf8(t);
  B.log_debug(strAddr(utf8), strSize(utf8));
}
