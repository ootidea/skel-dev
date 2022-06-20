import { mergeProps } from 'solid-js'
import './Divider.scss'
import { joinClass, joinStyle, prepareProps, SkelProps, toGetters } from './utility/props'

export type DividerProps = SkelProps<{ direction?: 'horizontal' | 'vertical'; thickness?: string; color?: string }>

export function Divider(rawProps: DividerProps) {
  const [props, restProps] = prepareProps(rawProps, {
    direction: 'horizontal',
    thickness: 'var(--skel-Divider_default-thickness)',
    color: 'var(--skel-Divider_default-color)',
  })
  const attrs = mergeProps(
    restProps,
    toGetters({
      class: () => joinClass(rawProps.class, 'skel-Divider_root'),
      style: () =>
        joinStyle(rawProps.style, {
          '--skel-Divider_thickness': props.thickness,
          '--skel-Divider_color': props.color,
        }),
    })
  )

  return <div data-direction={props.direction} {...attrs} />
}
