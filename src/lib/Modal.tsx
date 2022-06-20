import { createSignal, mergeProps, Show, Signal } from 'solid-js'
import './common.scss'
import './Modal.scss'
import { Slot } from './Slot'
import { joinClass, prepareProps, SkelProps, SkelSlot, toGetters } from './utility/props'

export type ModalProps = SkelProps<{
  openedSignal?: Signal<boolean>
  persistent?: boolean
  launcher?: SkelSlot<{ open: () => void; close: () => void; toggle: () => void }>
  children?: SkelSlot<{ open: () => void; close: () => void; toggle: () => void }>
}>

export function Modal(rawProps: ModalProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      persistent: false,
      openedSignal: createSignal(false),
    },
    ['launcher']
  )
  const attrs = mergeProps(
    restProps,
    toGetters({
      class: () => joinClass(rawProps.class, 'skel-Modal_root'),
    })
  )

  const [opened, setOpened] = props.openedSignal

  const open = () => setOpened(true)
  const close = () => setOpened(false)
  const toggle = () => setOpened(!opened())

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
            <Slot content={rawProps.children} params={{ open, close, toggle }} />
          </div>
        </div>
      </Show>
    </>
  )
}
