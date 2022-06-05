import { JSX, mergeProps, splitProps } from 'solid-js'

export type BaseProps = {
  class?: string
  classList?: Record<string, boolean | undefined>
  style?: JSX.CSSProperties | string
}

/**
 * Return string literal union type that is keys of optional properties.
 * @example
 * OptionalKeys<{ a?: string; b?: number; c: string | undefined; d: string | null }>
 * is equivalent to
 * 'a' | 'b'
 */
export type OptionalKeys<T> = { [K in keyof T]-?: T extends Record<K, any> ? never : K }[keyof T]

/**
 * Pick all optional properties and make it required.
 * @example
 * DefaultValues<{ a?: string; b: string; c: string | undefined; d: string | null }>
 * is equivalent to
 * { a: string }
 */
type DefaultValues<T> = Pick<Required<T>, OptionalKeys<T>>

/**
 * Splits given object type into single property and returns its union type.
 * @example
 * AtLeastOne<{ a: number, b: boolean, c: string }>
 * is equivalent to
 * { a: number } | { b: boolean } | { c: string }
 */
export type AtLeastOneProperty<T, K extends keyof T = keyof T> = K extends K ? Record<K, T[K]> : never

/** Combination of mergeProps and splitProps */
export function prepareProps<T, U extends AtLeastOneProperty<DefaultValues<T>>>(
  props: T,
  knownKeys: (keyof T)[],
  defaultValues: U
): [U & T, {}] {
  return splitProps(mergeProps(defaultValues, props), knownKeys) as any
}

export function joinClasses(klass: string | undefined, classes: Record<string, unknown> | undefined): string {
  const conditionalClasses = Object.entries(classes ?? {})
    .filter(([, value]) => Boolean(value))
    .map(([key]) => key)
    .join(' ')
  if (klass === undefined) {
    return conditionalClasses
  }
  return `${klass} ${conditionalClasses}`
}

export function joinStyles(style: JSX.CSSProperties | string | undefined, styles: JSX.CSSProperties): string {
  const stylesAsString = Object.entries(styles)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ')

  if (style === undefined) return stylesAsString

  if (typeof style === 'string') {
    if (style.trim().endsWith(';')) {
      return `${style} ${stylesAsString}`
    }
    return `${style}; ${stylesAsString}`
  }

  const styleAsString = Object.entries(style)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ')
  return `${styleAsString}; ${stylesAsString}`
}
