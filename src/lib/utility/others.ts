/**
 * A utility for abbreviating function types.
 * @example
 * Arrow<[number], boolean> is equivalent to (value: number) => boolean
 * Arrow<[string, Date], void> is equivalent to (value1: string, value2: Date) => void
 */
export type Arrow<Tuple extends unknown[], Return> = (...args: Tuple) => Return

/**
 * Clone given array, and remove all undefined.
 * @example
 * filterNonUndefined([123, undefined, 456, undefined])
 * is equivalent to
 * [123, 456]
 */
export function filterNonUndefined<T>(array: (T | undefined)[]): T[] {
  return array.filter((value) => value !== undefined) as T[]
}

/** Like undefined functor */
export function mapUndefined<T, U>(value: T | undefined, f: Arrow<[T], U>): U | undefined {
  return value === undefined ? undefined : f(value)
}
