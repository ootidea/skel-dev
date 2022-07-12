import { createMemo, mergeProps } from 'solid-js'
import './common.scss'
import './Spinner.scss'
import { joinClasses, joinStyle, prepareProps, SkelProps, toGetters } from './utility/props'

export type SpinnerProps = SkelProps<{
  size?: string
  thickness?: number
  frequency?: number
  inverted?: boolean
}>

export function Spinner(rawProps: SpinnerProps) {
  const [props, restProps] = prepareProps(rawProps, {
    size: 'var(--skel-Spinner_default-size)',
    thickness: 25,
    frequency: 1.4,
    inverted: false,
  })

  const svgUrl = createMemo(
    () =>
      `url('data:image/svg+xml;utf8,<svg width="200mm" height="200mm" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="${
        100 - props.thickness / 2
      }" fill="none" stroke="black" stroke-width="${props.thickness}" /></svg>')`
  )

  const attrs = mergeProps(
    restProps,
    toGetters({
      class: () => joinClasses(rawProps, 'skel-Spinner_root'),
      style: () =>
        joinStyle(rawProps.style, {
          '--skel-Spinner_size': props.size,
          '--skel-Spinner_svg-url': svgUrl(),
          '--skel-Spinner_period': `${1 / props.frequency}s`,
          '--skel-Spinner_color': props.inverted ? 'var(--skel-inverted-text-color)' : 'var(--skel-primary-color)',
        }),
    })
  )

  return <div {...attrs} />
}
