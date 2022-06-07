import { JSX, mergeProps, splitProps } from 'solid-js'
import { ParentProps } from 'solid-js/types/render/component'
import './OverlayLayout.scss'
import { joinClass } from './utility/props'

export function OverlayLayout(rawProps: ParentProps<JSX.HTMLAttributes<HTMLDivElement> & { overlay?: JSX.Element }>) {
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
