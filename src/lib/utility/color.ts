// @ts-ignore
import Color from 'colorjs.io'

export function toHsl(color: string): string {
  return new Color(color).to('hsl').toString()
}

const MIDDLE_LIGHTNESS = 0.75

export function calculateHoverColor(baseColor: string): string {
  const color = new Color(baseColor)
  if (color.alpha === 0) {
    return new Color('oklch', [MIDDLE_LIGHTNESS, 0, 0, 0.2]).to('hsl').toString()
  }

  color.alpha = Math.min(1, color.alpha * 1.5)

  if (color.oklch.lightness > MIDDLE_LIGHTNESS) {
    color.oklch.lightness = Math.max(MIDDLE_LIGHTNESS, color.oklch.lightness * 0.96)
  } else {
    color.oklch.lightness = Math.min(MIDDLE_LIGHTNESS, color.oklch.lightness / 0.96)
  }

  return color.to('hsl').toString()
}

export function calculateActiveColor(baseColor: string): string {
  const color = new Color(baseColor)
  if (color.alpha === 0) {
    return new Color('oklch', [MIDDLE_LIGHTNESS, 0, 0, 0.3]).to('hsl').toString()
  }

  color.alpha = Math.min(1, color.alpha * 2)

  if (color.oklch.lightness > MIDDLE_LIGHTNESS) {
    color.oklch.lightness = Math.max(MIDDLE_LIGHTNESS, color.oklch.lightness * 0.92)
  } else {
    color.oklch.lightness = Math.min(MIDDLE_LIGHTNESS, color.oklch.lightness / 0.92)
  }

  return color.to('hsl').toString()
}
