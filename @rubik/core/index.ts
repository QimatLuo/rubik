export function random(): Raw {
  const array = new Uint8Array(5);
  self.crypto.getRandomValues(array);
  const raw = Object.entries(array)
    .toSorted((a, b) => a[1] - b[1])
    .map((x) => x[0]);
  return verify(raw) ? random() : raw;
}

type Raw = string[];

export function verify(raw: Raw) {
  if (raw[0] !== "0") return false;

  while (raw[1] !== "1") {
    raw = U(raw);
  }
  return raw.join("") === "01234";
}

export function U(raw: Raw) {
  const [a, b, c, d, e] = raw;
  return [a, c, d, e, b] as Raw;
}

export function Up(raw: Raw) {
  const [a, b, c, d, e] = raw;
  return [a, e, b, c, d] as Raw;
}

export function R(raw: Raw) {
  const [a, b, c, d, e] = raw;
  return [b, a, c, d, e] as Raw;
}

export function Rp(raw: Raw) {
  const [a, b, c, d, e] = raw;
  return [b, a, c, d, e] as Raw;
}
