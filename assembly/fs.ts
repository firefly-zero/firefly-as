import * as B from "./bindings";
import { Font, Image } from "./graphics";
import { toUtf8, strAddr, strSize, fromUtf8, UTF8 } from "./memory";

export type Path = string;

export class File {
  private raw: ArrayBuffer;

  constructor(raw_: ArrayBuffer) {
    this.raw = raw_;
  }

  toArrayBuffer(): ArrayBuffer {
    return this.raw;
  }

  toImage(): Image {
    return Image.fromFile(this);
  }

  toFont(): Font {
    return Font.fromFile(this);
  }
}

export function getFileSize(path: Path): u32 {
  const utf8 = toUtf8(path);
  return B.get_file_size(strAddr(utf8), strSize(utf8));
}

export function loadFile(path: Path, buf?: ArrayBuffer): File {
  const utf8 = toUtf8(path);
  if (!buf) {
    const size = B.get_file_size(strAddr(utf8), strSize(utf8));
    buf = new ArrayBuffer(size);
  }
  const size = B.load_file(strAddr(utf8), strSize(utf8), strAddr(buf), strSize(buf));
  return new File(buf.slice(0, size));
}

export function dumpFile(path: Path, raw: ArrayBuffer): void {
  const utf8 = toUtf8(path);
  B.dump_file(strAddr(utf8), strSize(utf8), strAddr(raw), strSize(raw));
}

export function removeFile(path: Path): void {
  const utf8 = toUtf8(path);
  B.remove_file(strAddr(utf8), strSize(utf8));
}
