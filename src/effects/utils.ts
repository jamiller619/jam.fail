import imagesLoaded from 'imagesloaded'

export function preloadImages(els: NodeListOf<Element>) {
  return new Promise((resolve) => {
    imagesLoaded(els, { background: true }, resolve)
  })
}

export function getRandomNumber(min: number, max: number) {
  if (min > max) [min, max] = [max, min]

  const range = max - min
  const array = new Uint32Array(1)
  crypto.getRandomValues(array)

  const randomFraction = array[0] / 0xffffffff
  return min + randomFraction * range
}

/**
 * Maps a number `x` from one range `[a, b]` to another range `[c, d]`.
 *
 * @param x - The input value to be mapped.
 * @param a - The lower bound of the input range.
 * @param b - The upper bound of the input range.
 * @param c - The lower bound of the target range.
 * @param d - The upper bound of the target range.
 * @returns The value of `x` mapped from range `[a, b]` to range `[c, d]`.
 *
 * @example
 * map(5, 0, 10, 0, 100) // returns 50
 */
export function map(x: number, a: number, b: number, c: number, d: number) {
  return ((x - a) * (d - c)) / (b - a) + c
}

/**
 * Linearly interpolates between two values `a` and `b` by a factor of `n`.
 *
 * @param a - The start value.
 * @param b - The end value.
 * @param n - The interpolation factor (typically between 0 and 1).
 *           When n = 0, returns `a`. When n = 1, returns `b`.
 * @returns The interpolated value between `a` and `b`.
 */
export function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b
}
