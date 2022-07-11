import closeIcon from '/src/close.svg'
import { createEffect, createSignal, mergeProps, Show } from 'solid-js'
import './common.scss'
import { IconButton } from './IconButton'
import './Modal.scss'
import { Slot } from './Slot'
import { joinClass, prepareProps, SkelProps, SkelSlot, toGetters } from './utility/props'

export type ModalProps = SkelProps<{
  opened?: boolean
  persistent?: boolean
  showCloseButton?: boolean
  onChangeOpened?: (opened: boolean) => unknown
  launcher?: SkelSlot<{ open: () => void; close: () => void; toggle: () => void }>
  children?: SkelSlot<{ open: () => void; close: () => void; toggle: () => void }>
}>

export function Modal(rawProps: ModalProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      persistent: false,
      opened: false,
      showCloseButton: false,
    },
    ['launcher', 'onChangeOpened']
  )
  const attrs = mergeProps(
    restProps,
    toGetters({
      class: () => joinClass(rawProps.class, 'skel-Modal_root'),
    })
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

  function onClickBackdrop(event: Event) {
    if (event.target !== event.currentTarget) return

    if (!props.persistent) {
      close()
    }
  }

  return (
    <>
      <Slot content={rawProps.launcher} params={{ open, close, toggle }} />
      <Show when={opened()}>
        <div onClick={onClickBackdrop} {...attrs}>
          <div class="skel-Modal_frame">
            <Show when={props.showCloseButton}>
              <div class="skel-Modal_header">
                <IconButton src={closeIcon} onClick={close} />
              </div>
            </Show>
            <Slot content={rawProps.children} params={{ open, close, toggle }} />
          </div>
        </div>
      </Show>
    </>
  )
}
