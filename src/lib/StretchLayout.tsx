import { mergeProps, splitProps } from 'solid-js'
import { ParentProps } from 'solid-js/types/render/component'
import './StretchLayout.scss'
import { BaseProps, joinClasses, joinStyles } from './utility/props'

export function StretchLayout(
  rawProps: ParentProps<
    BaseProps & {
      stretchAt?: number | `${number}`
      direction?: 'horizontal' | 'vertical'
    }
  >
) {
  const [props, restProps] = splitProps(mergeProps(rawProps, { stretchAt: 0, direction: 'horizontal' }), [
    'class',
    'classList',
    'style',
    'stretchAt',
    'direction',
  ])

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
