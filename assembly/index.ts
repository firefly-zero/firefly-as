import * as G from "./graphics";
import * as M from "./misc";
import { handleAbort } from "./stubs";

export function boot(): void {
  G.clearScreen(G.Color.Red);
  M.logDebug("hello world!");
}
