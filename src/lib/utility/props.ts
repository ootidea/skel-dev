import { ComponentProps, JSX, mergeProps, splitProps } from 'solid-js'
import { Component } from 'solid-js/types/render/component'
import { objectKeys } from './others'

export type SkelProps<T, Base extends keyof JSX.IntrinsicElements | Component<any> = 'div'> = Omit<
  ComponentProps<Base>,
  keyof T
> &
  T

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

/**
 * Set default value to props, and split props into two parts.
 * The first part is for direct use within the component.
 * The second part is for transport to DOM element as attributes.
 *
 * @example
 * prepareProps({ tint: 'red', tabindex: '0' }, { size: '1em' }, ['tint'])
 * is the same value as
 * [{ tint: 'red', size: '1em' }, { tabindex: '0' }]
 */
export function prepareProps<T, U extends AtLeastOneProperty<DefaultValues<T>>>(
  rawProps: T,
  defaultValues: U,
  otherKnownKeys: (keyof T)[] = []
): [U & T, {}] {
  // Difficult to type accurately because keyof T equals string | number | Symbol but Object.keys returns string[]
  const keys = objectKeys(defaultValues) as any
  return splitProps(mergeProps(defaultValues, rawProps), otherKnownKeys.concat(keys)) as any
}

export function joinClass(injectedClass: string | undefined, baseClass: string): string {
  if (injectedClass === undefined) return baseClass

  return `${baseClass} ${injectedClass}`
}

export function joinClassList(
  injectedClassList: Record<string, boolean | undefined> | undefined,
  classList: Record<string, boolean | undefined>
): Record<string, boolean | undefined> {
  if (injectedClassList === undefined) return classList

  return Object.assign({}, classList, injectedClassList)
}

export function joinStyle(injectedStyle: JSX.CSSProperties | string | undefined, baseStyle: JSX.CSSProperties): string {
  const stylesAsString = Object.entries(baseStyle)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ')

  if (injectedStyle === undefined) return stylesAsString

  if (typeof injectedStyle === 'string') {
    if (injectedStyle.trim().endsWith(';')) {
      return `${injectedStyle} ${stylesAsString}`
    }
    return `${injectedStyle}; ${stylesAsString}`
  }

  const styleAsString = Object.entries(injectedStyle)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ')
  return `${styleAsString}; ${stylesAsString}`
}
