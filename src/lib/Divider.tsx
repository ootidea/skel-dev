import { ParentProps } from 'solid-js/types/render/component'
import './Divider.scss'
import { BaseProps, joinClasses, joinStyles, prepareProps } from './utility/props'

export function Divider(
  rawProps: ParentProps<BaseProps & { direction?: 'horizontal' | 'vertical'; thickness?: string; color?: string }>
) {
  const [props, restProps] = prepareProps(
    rawProps,
    ['class', 'classList', 'style', 'direction', 'thickness', 'color'],
    {
      direction: 'horizontal',
      thickness: 'var(--skel-Divider_default-thickness)',
      color: 'var(--skel-Divider_default-color)',
    }
  )

  return (
    <div
      class={joinClasses('skel-Divider_root', props)}
      style={joinStyles(props.style, {
        '--skel-Divider_thickness': props.thickness,
        '--skel-Divider_color': props.color,
      })}
      data-direction={props.direction}
      {...restProps}
    />
  )
}
