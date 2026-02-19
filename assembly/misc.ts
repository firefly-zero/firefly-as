import * as B from "./bindings";
import { toUtf8, strAddr, strSize, fromUtf8 } from "./memory";
import { Peer } from "./net";
import { Color } from "./graphics";

export enum Language {
  /** en 🇬🇧 💂 */
  English = 0x656e,
  /** nl 🇳🇱 🧀 */
  Dutch = 0x6e6c,
  /** fr 🇫🇷 🥐 */
  French = 0x6672,
  /** de 🇩🇪 🥨 */
  German = 0x6465,
  /** it 🇮🇹 🍕 */
  Italian = 0x6974,
  /** pl 🇵🇱 🥟 */
  Polish = 0x706c,
  /** ro 🇷🇴 🧛 */
  Romanian = 0x726f,
  /** ru 🇷🇺 🪆 */
  Russian = 0x7275,
  /** es 🇪🇸 🐂 */
  Spanish = 0x6573,
  /** sv 🇸🇪 ❄️ */
  Swedish = 0x7376,
  /** tr 🇹🇷 🕌 */
  Turkish = 0x7472,
  /** uk 🇺🇦 ✊ */
  Ukrainian = 0x756b,
  /** tp 🇨🇦 🙂 */
  TokiPona = 0x7470,
}

export class Theme {
  readonly id: u8;
  // The main color of text and boxes.
  readonly primary: Color;
  // The color of disable options, muted text, etc.
  readonly secondary: Color;
  // The color of important elements, active options, etc.
  readonly accent: Color;
  // The background color, the most contrast color to primary.
  readonly bg: Color;

  constructor(i: u8, p: Color, s: Color, a: Color, b: Color) {
    this.id = i;
    this.primary = p;
    this.secondary = s;
    this.accent = a;
    this.bg = b;
  }
}

export function logDebug(t: string): void {
  const utf8 = toUtf8(t);
  B.log_debug(strAddr(utf8), strSize(utf8));
}

export function logError(t: string): void {
  const utf8 = toUtf8(t);
  B.log_error(strAddr(utf8), strSize(utf8));
}

export function setSeed(s: u32): void {
  B.set_seed(s);
}

export function getRandom(): u32 {
  return B.get_random();
}

export function getName(peer: Peer): string {
  const buf = new ArrayBuffer(16);
  const len: u32 = B.get_name(peer._raw, strAddr(buf));
  const name = buf.slice(0, len);
  return fromUtf8(name);
}

export function quit(): void {
  B.quit();
}
