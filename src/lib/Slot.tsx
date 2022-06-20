import { ParentProps } from 'solid-js/types/render/component'
import { SkelSlot } from './utility/props'

export type SlotProps<T> = ParentProps<{ content: SkelSlot<T> | undefined; params: T }>

export function Slot<T>(props: SlotProps<T>) {
  if (props.content instanceof Function) {
    return props.content(props.params)
  } else {
    return props.content ?? props.children
  }
}