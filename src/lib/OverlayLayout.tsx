import { JSX, mergeProps, splitProps } from 'solid-js'
import './OverlayLayout.scss'
import { joinClass, SkelProps } from './utility/props'

export type OverlayLayoutProps = SkelProps<{ overlay?: JSX.Element }>

export function OverlayLayout(rawProps: OverlayLayoutProps) {
  const [props, restProps] = splitProps(rawProps, ['overlay'])
  const attrs = mergeProps(restProps, {
    class: joinClass(rawProps.class, 'skel-OverlayLayout_root'),
  })

  return (
    <div {...attrs}>
      {rawProps.children}
      <div class="skel-OverlayLayout_overlay">{props.overlay}</div>
    </div>
  )
}
