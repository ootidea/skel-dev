import { mergeProps } from 'solid-js'
import './StretchLayout.scss'
import { toArray } from './utility/others'
import { joinClass, joinStyle, prepareProps, SkelProps, toGetters } from './utility/props'

export type StretchLayoutProps = SkelProps<{ stretchAt?: number | `${number}`; direction?: 'horizontal' | 'vertical' }>

export function StretchLayout(rawProps: StretchLayoutProps) {
  const [props, restProps] = prepareProps(rawProps, {
    stretchAt: 0,
    direction: 'horizontal',
  })
  const attrs = mergeProps(
    restProps,
    toGetters({
      class: () => joinClass(rawProps.class, 'skel-StretchLayout_root'),
      style: () =>
        joinStyle(rawProps.style, {
          '--skel-StretchLayout_template': 'auto '.repeat(normalizeIndex(Number(props.stretchAt))) + 'minmax(0, 1fr)',
        }),
    })
  )

  function normalizeIndex(index: number) {
    if (index >= 0) {
      return index
    }

    return toArray(rawProps.children).length + index
  }

  return (
    <div data-direction={props.direction} {...attrs}>
      {rawProps.children}
    </div>
  )
}
