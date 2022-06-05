import { JSX } from 'solid-js'

export type BaseProps = {
  class?: string
  classList?: Record<string, boolean | undefined>
  style?: JSX.CSSProperties | string
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
