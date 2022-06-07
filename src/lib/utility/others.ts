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

/**
 * Object.keys with improved type.
 * @example
 * keys({ alice: 'female', 123: null, [Symbol()]: true })
 * is equivalent to
 * Object.keys({ alice: 'female', 123: null, [Symbol()]: true }) as ('alice' | '123')[]
 */
export function objectKeys<T>(object: T): ObjectKeys<T> {
  return Object.keys(object) as any
}

export type ObjectKeys<T, K extends keyof any = keyof T> = (K extends symbol ? never : K extends number ? `${K}` : K)[]

export type EnneaPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'center'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'

export type HorizontalPosition = 'left' | 'center' | 'right'
export type VerticalPosition = 'top' | 'center' | 'bottom'

export function toOpposite(position: EnneaPosition) {
  switch (position) {
    case 'top':
      return 'bottom'
    case 'bottom':
      return 'top'
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    case 'center':
      return 'center'
    case 'top left':
      return 'bottom right'
    case 'top right':
      return 'bottom left'
    case 'bottom left':
      return 'top right'
    case 'bottom right':
      return 'top left'
  }
}

export function toHorizontalPosition(position: EnneaPosition): HorizontalPosition {
  const mapping = {
    'top left': 'left',
    left: 'left',
    'bottom left': 'left',
    top: 'center',
    center: 'center',
    bottom: 'center',
    'top right': 'right',
    right: 'right',
    'bottom right': 'right',
  } as const
  return mapping[position]
}

export function toVerticalPosition(position: EnneaPosition): VerticalPosition {
  const mapping = {
    'top left': 'top',
    top: 'top',
    'top right': 'top',
    left: 'center',
    center: 'center',
    right: 'center',
    'bottom left': 'bottom',
    bottom: 'bottom',
    'bottom right': 'bottom',
  } as const
  return mapping[position]
}

export function toXPercent(position: EnneaPosition): `${number}%` {
  const mapping = { left: '0%', center: '50%', right: '100%' } as const
  return mapping[toHorizontalPosition(position)]
}

export function toYPercent(position: EnneaPosition): `${number}%` {
  const mapping = { top: '0%', center: '50%', bottom: '100%' } as const
  return mapping[toVerticalPosition(position)]
}
