import { defer, map, merge } from "rxjs";
import { U, Up, R } from "@rubik/core";
import { fromElementIdEvent } from "../rxjs";

export const click$ = defer(() =>
  merge(
    fromElementIdEvent("U", "click").pipe(map(() => U)),
    fromElementIdEvent("Up", "click").pipe(map(() => Up)),
    fromElementIdEvent("temp", "click").pipe(map(() => R)),
  ),
);
