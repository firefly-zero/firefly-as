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
  /** The main color of text and boxes. */
  readonly primary: Color;
  /** The color of disable options, muted text, etc. */
  readonly secondary: Color;
  /** The color of important elements, active options, etc. */
  readonly accent: Color;
  /** The background color, the most contrast color to primary. */
  readonly bg: Color;

  constructor(i: u8, p: Color, s: Color, a: Color, b: Color) {
    this.id = i;
    this.primary = p;
    this.secondary = s;
    this.accent = a;
    this.bg = b;
  }
}

export class Settings {
  /** The preferred color scheme of the player. */
  readonly theme: Theme;

  /** The configured interface language. */
  readonly language: Language;

  /**  If true, the screen is rotated 180 degrees.
   *
   * In other words, the player holds the device upside-down.
   * The touchpad is now on the right and the buttons are on the left.
   */
  readonly rotate_screen: bool;

  /** The player has photosensitivity. The app should avoid any rapid flashes. */
  readonly reduce_flashing: bool;

  /** The player wants increased contrast for colors.
   *
   * If set, the black and white colors in the default
   * palette are adjusted automatically. All other colors
   * in the default palette or all colors in a custom palette
   * should be adjusted by the app.
   */
  readonly contrast: bool;

  /** If true, the player wants to see easter eggs, holiday effects, and weird jokes. */
  readonly easter_eggs: bool;

  constructor(t: Theme, l: Language, rs: bool, rf: bool, c: bool, ee: bool) {
    this.theme = t;
    this.language = l;
    this.rotate_screen = rs;
    this.reduce_flashing = rf;
    this.contrast = c;
    this.easter_eggs = ee;
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

export function getSettings(peer: Peer): Settings {
  const raw = B.get_settings(peer._raw);
  const language: Language = i32(u16(raw));
  const flags = u8(raw >> 16);
  const rawTheme = u32(raw >> 32);
  const theme = new Theme(
    u8(rawTheme),
    _parseColor(rawTheme >> 20),
    _parseColor(rawTheme >> 16),
    _parseColor(rawTheme >> 12),
    _parseColor(rawTheme >> 8),
  );
  return new Settings(
    theme,
    language,
    (flags & 0b0001) != 0,
    (flags & 0b0010) != 0,
    (flags & 0b0100) != 0,
    (flags & 0b1000) != 0,
  );
}

function _parseColor(c: u64): Color {
  return (u8(c) & 0xf) + 1;
}

export function quit(): void {
  B.quit();
}
