import { filter, fromEvent, of, switchMap } from "rxjs";

export function getElementById(elementId: string) {
  return of(document.getElementById(elementId)).pipe(filter(Boolean));
}

export function fromElementIdEvent(elementId: string, eventName: string) {
  return getElementById(elementId).pipe(
    switchMap((dom) => fromEvent(dom, eventName)),
  );
}
