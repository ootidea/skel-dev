import { createSignal, mergeProps, Show, Signal } from 'solid-js'
import './common.scss'
import './Modal.scss'
import { deploySlot, joinClass, prepareProps, SkelProps, SkelSlot } from './utility/props'

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
  const attrs = mergeProps(restProps, {
    class: joinClass(rawProps.class, 'skel-Modal_root'),
  })

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
      {deploySlot(rawProps.launcher, { open, close, toggle })}
      <Show when={opened()}>
        <div onClick={onClickBackdrop} {...attrs}>
          <div class="skel-Modal_frame">{deploySlot(rawProps.children, { open, close, toggle })}</div>
        </div>
      </Show>
    </>
  )
}
