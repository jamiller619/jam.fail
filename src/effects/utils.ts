export function getRandomNumber(min: number, max: number) {
  if (min > max) [min, max] = [max, min]

  const range = max - min
  const array = new Uint32Array(1)
  crypto.getRandomValues(array)

  const randomFraction = array[0] / 0xffffffff
  return min + randomFraction * range
}

export function map(x: number, a: number, b: number, c: number, d: number) {
  return ((x - a) * (d - c)) / (b - a) + c
}

export function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b
}
