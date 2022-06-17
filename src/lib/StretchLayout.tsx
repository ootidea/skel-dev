import { mergeProps } from 'solid-js'
import './StretchLayout.scss'
import { joinClass, joinStyle, prepareProps, SkelProps } from './utility/props'

export type StretchLayoutProps = SkelProps<{ stretchAt?: number | `${number}`; direction?: 'horizontal' | 'vertical' }>

export function StretchLayout(rawProps: StretchLayoutProps) {
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
