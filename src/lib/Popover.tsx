import { createSignal, mergeProps, onCleanup, onMount, Show } from 'solid-js'
import './Popover.scss'
import { Slot } from './Slot'
import { EnneaPosition, isInsideOf, toOpposite, toXPercent, toYPercent } from './utility/others'
import { joinClass, joinStyle, prepareProps, SkelProps, SkelSlot, toGetters } from './utility/props'

export type PopoverProps = SkelProps<{
  on?: EnneaPosition
  joint?: EnneaPosition | undefined
  persistent?: boolean
  launcher?: SkelSlot<{ open: () => void; close: () => void; toggle: () => void }>
  children?: SkelSlot<{ open: () => void; close: () => void; toggle: () => void }>
}>

export function Popover(rawProps: PopoverProps) {
  const [props, restProps] = prepareProps(rawProps, {
    on: 'bottom',
    joint: undefined,
    persistent: false,
  })
  const attrs = mergeProps(
    restProps,
    toGetters({
      class: () => joinClass(rawProps.class, 'skel-Popover_root'),
      style: () =>
        joinStyle(rawProps.style, {
          '--skel-Popover_left': toXPercent(props.on),
          '--skel-Popover_top': toYPercent(props.on),
          '--skel-Popover_transform': `translate(-${toXPercent(props.joint ?? toOpposite(props.on))}, -${toYPercent(
            props.joint ?? toOpposite(props.on)
          )})`,
        }),
    })
  )

  const [opened, setOpened] = createSignal(false)

  const open = () => setOpened(true)
  const close = () => setOpened(false)
  const toggle = () => setOpened(!opened())

  let contentElement: HTMLDivElement | undefined = undefined
  let popoverElement: HTMLDivElement | undefined = undefined

  function onClickWindow(event: MouseEvent) {
    if (props.persistent || !opened()) return
    if (contentElement === undefined || popoverElement === undefined) return

    const x = event.clientX
    const y = event.clientY
    const contentRect = contentElement.getBoundingClientRect()
    if (isInsideOf(x, y, contentRect)) return

    const popoverRect = popoverElement.getBoundingClientRect()
    if (isInsideOf(x, y, popoverRect)) return

    close()
  }

  onMount(() => {
    window.addEventListener('click', onClickWindow)

    onCleanup(() => {
      window.removeEventListener('click', onClickWindow)
    })
  })

  return (
    <div {...attrs}>
      <div class="skel-Popover_content-area" ref={contentElement}>
        <Slot content={rawProps.launcher} params={{ open, close, toggle }} />
      </div>
      <Show when={opened()}>
        <div class="skel-Popover_popover-area" ref={popoverElement}>
          <div class="skel-Popover_popover-frame">
            <Slot content={rawProps.children} params={{ open, close, toggle }} />
          </div>
        </div>
      </Show>
    </div>
  )
}
