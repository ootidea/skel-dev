import { createEffect, createSignal, mergeProps, onCleanup, onMount } from 'solid-js'
import './Dropdown.scss'
import { Slot } from './Slot'
import { assertNonUndefined, isInsideOf, observeWidth } from './utility/others'
import { joinClasses, joinStyle, prepareProps, SkelProps, SkelSlot, toGetters } from './utility/props'

export type DropdownProps = SkelProps<{
  opened?: boolean
  persistent?: boolean
  onChangeOpened?: (opened: boolean) => unknown
  launcher?: SkelSlot<{ open: () => void; close: () => void; toggle: () => void; opened: boolean }>
  children?: SkelSlot<{ open: () => void; close: () => void; toggle: () => void; opened: boolean }>
}>

export function Dropdown(rawProps: DropdownProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      opened: false,
      persistent: false,
    },
    ['onChangeOpened']
  )

  const [opened, setOpened] = createSignal(props.opened)
  createEffect(() => setOpened(props.opened))

  function changeOpened(opened: boolean) {
    setOpened(opened)
    props.onChangeOpened?.(opened)
  }

  const open = () => changeOpened(true)
  const close = () => changeOpened(false)
  const toggle = () => changeOpened(!opened())

  let contentElement: HTMLDivElement | undefined = undefined
  let dropdownElement: HTMLDivElement | undefined = undefined
  const [contentWidth, setContentWidth] = createSignal(0)
  const [dropdownWidth, setDropdownWidth] = createSignal(0)

  const attrs = mergeProps(
    restProps,
    toGetters({
      class: () => joinClasses(rawProps, 'skel-Dropdown_root'),
      style: () =>
        joinStyle(rawProps.style, {
          '--skel-Dropdown_content-width': `${contentWidth()}px`,
          '--skel-Dropdown_dropdown-width': `${dropdownWidth()}px`,
        }),
    })
  )

  function onClickWindow(event: MouseEvent) {
    if (props.persistent || !opened()) return
    if (contentElement === undefined || dropdownElement === undefined) return

    const x = event.clientX
    const y = event.clientY
    const contentRect = contentElement.getBoundingClientRect()
    if (isInsideOf(x, y, contentRect)) return

    const DropdownRect = dropdownElement.getBoundingClientRect()
    if (isInsideOf(x, y, DropdownRect)) return

    close()
  }

  onMount(() => {
    window.addEventListener('click', onClickWindow)
    onCleanup(() => {
      window.removeEventListener('click', onClickWindow)
    })

    assertNonUndefined(dropdownElement)
    assertNonUndefined(contentElement)
    observeWidth(dropdownElement, setDropdownWidth)
    observeWidth(contentElement, setContentWidth)
  })

  return (
    <div {...attrs}>
      <div class="skel-Dropdown_content-area" ref={contentElement}>
        <Slot content={rawProps.launcher} params={{ open, close, toggle, opened: opened() }} />
      </div>
      <div
        class="skel-Dropdown_dropdown-area"
        classList={{ 'skel-Dropdown_invisible': !opened() }}
        ref={dropdownElement}
      >
        <div class="skel-Dropdown_frame">
          <Slot content={rawProps.children} params={{ open, close, toggle, opened: opened() }} />
        </div>
      </div>
    </div>
  )
}
