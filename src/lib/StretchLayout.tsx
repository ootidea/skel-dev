import { ParentProps } from 'solid-js/types/render/component'
import './StretchLayout.scss'
import { BaseProps, joinClasses, joinStyles, prepareProps } from './utility/props'

export function StretchLayout(
  rawProps: ParentProps<
    BaseProps & {
      stretchAt?: number | `${number}`
      direction?: 'horizontal' | 'vertical'
    }
  >
) {
  const [props, restProps] = prepareProps(rawProps, ['class', 'classList', 'style', 'stretchAt', 'direction'], {
    stretchAt: 0,
    direction: 'horizontal',
  })

  return (
    <div
      class={`skel-StretchLayout_root ${joinClasses(props.class, props.classList)}`}
      style={joinStyles(props.style, {
        '--skel-StretchLayout_template': 'auto '.repeat(Number(rawProps.stretchAt)) + 'minmax(0, 1fr)',
      })}
      data-direction={props.direction}
      {...restProps}
    >
      {rawProps.children}
    </div>
  )
}
