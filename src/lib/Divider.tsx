import { JSX, mergeProps } from 'solid-js'
import { ParentProps } from 'solid-js/types/render/component'
import './Divider.scss'
import { joinClass, joinStyle, prepareProps } from './utility/props'

export function Divider(
  rawProps: ParentProps<
    JSX.HTMLAttributes<HTMLDivElement> & { direction?: 'horizontal' | 'vertical'; thickness?: string; color?: string }
  >
) {
  const [props, restProps] = prepareProps(rawProps, {
    direction: 'horizontal',
    thickness: 'var(--skel-Divider_default-thickness)',
    color: 'var(--skel-Divider_default-color)',
  })
  const attrs = mergeProps(restProps, {
    class: joinClass(rawProps.class, 'skel-Divider_root'),
    style: joinStyle(rawProps.style, {
      '--skel-Divider_thickness': props.thickness,
      '--skel-Divider_color': props.color,
    }),
  })

  return <div data-direction={props.direction} {...attrs} />
}
