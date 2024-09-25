import "./style.css";
import { map, merge, scan, startWith, withLatestFrom } from "rxjs";
import { random, verify } from "@rubik/core";
import { keyup$ } from "./feature/keyboard";
import { click$ } from "./feature/click";
import { fromElementIdEvent, getElementById } from "./rxjs";

const changed$ = merge(keyup$, click$).pipe(
  startWith((x) => x),
  scan((s, f) => f(s), random()),
);
const temp$ = changed$.pipe(map(([x]) => x));
const slots$ = changed$.pipe(map(([, ...xs]) => xs));

fromElementIdEvent("temp", "click")
  .pipe(map((x) => x.currentTarget as HTMLButtonElement))
  .subscribe((dom) => {
    dom.classList.toggle("err");
  });

temp$.pipe(withLatestFrom(getElementById("temp"))).subscribe(([x, dom]) => {
  dom.textContent = x;
});

slots$.pipe(withLatestFrom(getElementById("slots"))).subscribe(([xs, dom]) => {
  xs.forEach((x, i) => {
    dom.children[i].textContent = x;
  });
});

changed$
  .pipe(
    map(verify),
    withLatestFrom(getElementById("slots")),
    map(([bool, dom]) =>
      bool
        ? (x: string) => dom.classList.add(x)
        : (x: string) => dom.classList.remove(x),
    ),
  )
  .subscribe((f) => {
    f("pass");
  });
