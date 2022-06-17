import { createSignal, mergeProps, Show } from 'solid-js'
import './Button.scss'
import './common.scss'
import { Gravity } from './Gravity'
import { LayerLayout } from './LayerLayout'
import { Spinner } from './Spinner'
import { Arrow } from './utility/others'
import { joinClass, joinClassList, prepareProps, SkelProps } from './utility/props'

export type ButtonProps = SkelProps<{
  tint?: 'primary' | 'achromatic'
  ghost?: boolean
  rounded?: boolean
  disabled?: boolean
  fullWidth?: boolean
  onClick?: Arrow<[MouseEvent], unknown> | undefined
}>

export function Button(rawProps: ButtonProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      tint: 'primary',
      ghost: false,
      rounded: false,
      disabled: false,
      fullWidth: false,
    },
    ['onClick']
  )
  const attrs = mergeProps(restProps, {
    class: joinClass(rawProps.class, 'skel-Button_root'),
    classList: joinClassList(rawProps.classList, {
      'skel-Button_ghost': props.ghost,
      'skel-Button_rounded': props.rounded,
      'skel-Button_disabled': props.disabled,
      'skel-Button_full-width': props.fullWidth,
    }),
  })

  const [isInProgress, setIsInProgress] = createSignal(false)

  function clickEventHandler(event: MouseEvent) {
    const promise = props.onClick?.(event)
    if (promise instanceof Promise) {
      setIsInProgress(true)
      promise.finally(() => setIsInProgress(false))
    }
  }

  return (
    <button data-tint={props.tint} disabled={props.disabled || isInProgress()} onClick={clickEventHandler} {...attrs}>
      <Show when={isInProgress()} fallback={rawProps.children}>
        <LayerLayout>
          <div class="skel-Button_invisible">{rawProps.children}</div>
          <Gravity>
            <Spinner inverted={!props.ghost} />
          </Gravity>
        </LayerLayout>
      </Show>
    </button>
  )
}
