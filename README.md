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

Graphics:

```ts
import * as ff from "firefly-as/assembly";

ff.clearScreen(ff.Color.White);

ff.setColor(ff.Color.White, ff.RGB.new(255, 0, 0));

ff.drawPoint(ff.Point.new(10, 20), ff.Color.Red);

ff.drawLine(
    ff.Point.new(10, 20),
    ff.Point.new(30, 40),
    ff.LineStyle.new(ff.Color.Black, 1)
);

ff.drawRect(
    ff.Point.new(10, 20),
    ff.Size.new(30, 40),
    ff.Style.solid(ff.Color.Blue)
);

ff.drawRoundedRect(
    ff.Point.new(10, 20),
    ff.Size.new(30, 40),
    ff.Size.new(4, 4),
    ff.Style.outlined(ff.Color.Blue, 1)
);

ff.drawCircle(
    ff.Point.new(10, 20),
    30,
    ff.Style.new(ff.Color.LightBlue, ff.Color.Black, 1)
);

ff.drawEllipse(
    ff.Point.new(10, 20),
    ff.Size.New(30, 40),
    ff.Style.solid(ff.Color.Gray)
);

ff.drawTriangle(
    ff.Point.new(50, 20),
    ff.Point.new(30, 50),
    ff.Point.new(70, 50),
    ff.Style.new(ff.Color.LightBlue, ff.Color.DarkBlue, 1)
);

ff.drawArc(
    ff.Point.new(50, 20),
    20,
    ff.Angle.fromRadians(0),
    ff.Angle.fromDegrees(90),
    ff.Style.new(ff.Color.LightBlue, ff.Color.DarkBlue, 1)
);

ff.drawSector(
    ff.Point.new(50, 20),
    20,
    ff.Angle.fromRadians(0),
    ff.Angle.fromDegrees(90),
    ff.Style.new(ff.Color.LightBlue, ff.Color.DarkBlue, 1)
);

const font = ff.must(ff.loadFile("font")).toFont();
ff.drawText(
    "oh hi mark",
    font,
    ff.Point.new(50, 20),
    ff.Color.DarkGray,
);

// ...
```

## License

MIT License. You can do whatever you want with the SDK, modify it, embed into any apps and games. Have fun!
