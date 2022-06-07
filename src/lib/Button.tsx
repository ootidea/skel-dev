import { createSignal, mergeProps, Show } from 'solid-js'
import './Button.scss'
import { Gravity } from './Gravity'
import { OverlayLayout } from './OverlayLayout'
import { Spinner } from './Spinner'
import { Arrow } from './utility/others'
import { joinClass, joinClassList, prepareProps, SkelProps } from './utility/props'

export function Button(
  rawProps: SkelProps<{
    tint?: 'primary' | 'achromatic'
    ghost?: boolean
    rounded?: boolean
    disabled?: boolean
    fullWidth?: boolean
    onClick?: Arrow<[MouseEvent], unknown> | undefined
  }>
) {
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
    <button data-tint={props.tint} disabled={props.disabled} onClick={clickEventHandler} {...attrs}>
      <Show when={isInProgress()} fallback={rawProps.children}>
        <OverlayLayout
          overlay={
            <Gravity>
              <Spinner inverted={!props.ghost} />
            </Gravity>
          }
        >
          <div class="skel-Button_invisible">{rawProps.children}</div>
        </OverlayLayout>
      </Show>
    </button>
  )
}
