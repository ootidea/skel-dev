/**
 * A utility for abbreviating function types.
 * @example
 * Arrow<[number], boolean> is equivalent to (value: number) => boolean
 * Arrow<[string, Date], void> is equivalent to (value1: string, value2: Date) => void
 */
export type Arrow<Tuple extends unknown[], Return> = (...args: Tuple) => Return
