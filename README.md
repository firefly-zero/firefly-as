# firefly-as

The [AssemblyScript](https://www.assemblyscript.org/) SDK for making [Firefly Zero](https://fireflyzero.com/) games.

* [▶️ getting started](https://docs.fireflyzero.com/dev/getting-started/)
* [🐙 github](https://github.com/firefly-zero/firefly-as)

## Installation

```bash
npm install --save firefly-as
```

## Examples

Callbacks:

```ts
export function boot(): void {
    // ...
}

export function update(): void {
    // ...
}

export function render(): void {
    // ...
}

export function handle_menu(i: i32): void {
    // ...
}

export function cheat(cmd: i32, val: i32): i32 {
    // ...
}
```

## License

MIT License. You can do whatever you want with the SDK, modify it, embed into any apps and games. Have fun!
