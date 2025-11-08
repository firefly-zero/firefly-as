// https://www.assemblyscript.org/concepts.html#special-imports
export function handleAbort(
  message: usize,
  fileName: usize,
  line: u32,
  column: u32
): void {
  unreachable();
}
