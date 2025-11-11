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

ff.drawQr(
    "https://fireflyzero.com/",
    ff.Point.new(50, 20),
    ff.Color.Black,
    ff.Color.White,
);

const font = ff.must(ff.loadFile("font")).toFont();
ff.drawText(
    "oh hi mark",
    font,
    ff.Point.new(50, 20),
    ff.Color.DarkGray,
);

const img = ff.must(ff.loadFile("cat")).toImage();
ff.drawImage(img, ff.Point.new(50, 20));

const sub = img.sub(ff.Point.new(8, 0), ff.Size.new(8, 8));
ff.drawSubImage(sub, ff.Point.new(50, 20));

const canvas = ff.Canvas.new(ff.Size.new(60, 60));
ff.setCanvas(canvas);
ff.clearScreen(ff.Color.Red);
ff.unsetCanvas();
```

Files:

```ts
if (ff.fileExists("img")) {
    // ...
}

const fileSize = ff.getFileSize("img");


const file = ff.loadFile("img");
if (file !== null) {
    // ...
}

const buf = new Uint8Array(20);
ff.dumpFile("save", buf);

ff.removeFile("save");
```

Multiplayer:

```ts
const peer = ff.getMe();

const peers = getPeers().toArray();
for (const peer in peers) {
    // ...
}

const buf = new Uint8Array(20);
const stash = ff.loadStash(peer, buf);

ff.saveStash(peer, stash);
```

Input:

```ts
const pad = ff.readPad(peer);
if (pad !== null) {
    [pad.x, pad.y];
}

const btns = ff.readButtons(peer);
if (btns.s || btns.w) {
    // ...
}
```

Menu:

```ts
ff.addMenuItem(1, "open inventory");

ff.removeMenuItem(1);

ff.openMenu();
```

Boards (scoreboards) and badges (achievements):

```ts
const BADGE_1: Badge = ff.Badge.new(1);
const BADGE_2: Badge = ff.Badge.new(2);

let progress = ff.getProgress(peer, BADGE_1);
[progress.done, progress.goal];

progress = ff.addProgress(peer, BADGE_1, 100);

const BOARD_1 = 1;
const BOARD_2 = 2;

let bestScore = firefly.getScore(peer, BOARD_1);

bestScore = firefly.addScore(peer, BOARD_1, 10);
```

Misc:

```ts
ff.logDebug("I'm going back to 505");

ff.logError("Something happened!");

ff.setSeed(13);

const randVal = ff.getRandom();

const name = ff.getName(peer);
```

## License

MIT License. You can do whatever you want with the SDK, modify it, embed into any apps and games. Have fun!
