import { filter, fromEvent, map, merge } from "rxjs";
import { U, Up, R } from "@rubik/core";

const keyUp$ = fromEvent<KeyboardEvent>(document, "keyup");

const arrowDown$ = keyUp$.pipe(filter((x) => x.key === "ArrowDown"));
const arrowLeft$ = keyUp$.pipe(filter((x) => x.key === "ArrowLeft"));
const arrowRight$ = keyUp$.pipe(filter((x) => x.key === "ArrowRight"));
const arrowUp$ = keyUp$.pipe(filter((x) => x.key === "ArrowUp"));

export const keyup$ = merge(
  arrowDown$.pipe(map(() => R)),
  arrowLeft$.pipe(map(() => U)),
  arrowRight$.pipe(map(() => Up)),
  arrowUp$.pipe(map(() => R)),
).pipe();
