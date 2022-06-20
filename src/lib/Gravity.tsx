import { mergeProps } from 'solid-js'
import './Gravity.scss'
import { EnneaPosition, toHorizontalPosition, toVerticalPosition } from './utility/others'
import { joinClass, prepareProps, SkelProps, toGetters } from './utility/props'

export type GravityProps = SkelProps<{ to?: EnneaPosition }>

export function Gravity(rawProps: GravityProps) {
  const [props, restProps] = prepareProps(rawProps, {
    to: 'center',
  })
  const attrs = mergeProps(
    restProps,
    toGetters({
      class: () => joinClass(rawProps.class, 'skel-Gravity_root'),
    })
  )
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
