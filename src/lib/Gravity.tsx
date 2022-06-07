import { JSX, mergeProps } from 'solid-js'
import { ParentProps } from 'solid-js/types/render/component'
import './Gravity.scss'
import { EnneaPosition, toHorizontalPosition, toVerticalPosition } from './utility/others'
import { joinClass, prepareProps } from './utility/props'

export function Gravity(rawProps: ParentProps<JSX.HTMLAttributes<HTMLDivElement> & { to?: EnneaPosition }>) {
  const [props, restProps] = prepareProps(rawProps, {
    to: 'center',
  } as const)
  const attrs = mergeProps(restProps, {
    class: joinClass(rawProps.class, 'skel-Gravity_root'),
  })
  return (
    <div
      data-horizontal-position={toHorizontalPosition(props.to)}
      data-vertical-position={toVerticalPosition(props.to)}
      {...attrs}
    >
      {rawProps.children}
    </div>
  )
}
