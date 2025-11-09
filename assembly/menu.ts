import * as B from "./bindings";
import { strAddr, strSize, toUtf8 } from "./memory";

export function addMenuItem(index: u32, text: string): void {
  const utf8 = toUtf8(text);
  B.add_menu_item(index, strAddr(utf8), strSize(utf8));
}

export function removeMenuItem(index: u32): void {
  B.remove_menu_item(index);
}

export function openMenu(): void {
  B.open_menu();
}
