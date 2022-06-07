import { JSX, mergeProps } from 'solid-js'
import { ParentProps } from 'solid-js/types/render/component'
import './StretchLayout.scss'
import { joinClass, joinStyle, prepareProps } from './utility/props'

export function StretchLayout(
  rawProps: ParentProps<
    JSX.HTMLAttributes<HTMLDivElement> & { stretchAt?: number | `${number}`; direction?: 'horizontal' | 'vertical' }
  >
) {
  const [props, restProps] = prepareProps(rawProps, {
    stretchAt: 0,
    direction: 'horizontal',
  })
  const attrs = mergeProps(restProps, {
    class: joinClass(rawProps.class, 'skel-StretchLayout_root'),
    style: joinStyle(rawProps.style, {
      '--skel-StretchLayout_template': 'auto '.repeat(Number(props.stretchAt)) + 'minmax(0, 1fr)',
    }),
  })

  return (
    <div data-direction={props.direction} {...attrs}>
      {rawProps.children}
    </div>
  )
}
