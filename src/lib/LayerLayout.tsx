import { For, mergeProps } from 'solid-js'
import './LayerLayout.scss'
import { toArray } from './utility/others'
import { joinClass, SkelProps } from './utility/props'

export type LayerLayoutProps = SkelProps<{}>

export function LayerLayout(rawProps: LayerLayoutProps) {
  const attrs = mergeProps(rawProps, {
    class: joinClass(rawProps.class, 'skel-LayerLayout_root'),
  })

  return (
    <div {...attrs}>
      <For each={toArray(rawProps.children)}>
        {(child, i) => {
          if (i() === 0) {
            return child
          } else {
            return <div class="skel-LayerLayout_non-base-layer">{child}</div>
          }
        }}
      </For>
    </div>
  )
}