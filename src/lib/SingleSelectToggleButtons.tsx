import { createSignal, For, mergeProps, Signal } from 'solid-js'
import './SingleSelectToggleButtons.scss'
import { Slot } from './Slot'
import { ToggleButton } from './ToggleButton'
import { joinClass, joinClassList, prepareProps, SkelProps, SkelSlot, toGetters } from './utility/props'

export type SingleSelectToggleButtonsProps<T extends string | number> = SkelProps<{
  values: readonly T[]
  titles?: Partial<Record<string, string>>
  selectedSignal?: Signal<T | undefined>
  defaultSelected?: T
  fullWidth?: boolean
  disableUnselect?: boolean
  children?: SkelSlot<{ value: T }>
  onSelect?: (selected: T | undefined) => unknown
}>

export function SingleSelectToggleButtons<T extends string | number>(rawProps: SingleSelectToggleButtonsProps<T>) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      fullWidth: false,
      disableUnselect: false,
    },
    ['values', 'titles', 'selectedSignal', 'defaultSelected', 'onSelect', 'children']
  )
  const attrs = mergeProps(
    restProps,
    toGetters({
      class: () => joinClass(rawProps.class, 'skel-SingleSelectToggleButtons_root'),
      classList: () =>
        joinClassList(rawProps.classList, { 'skel-SingleSelectToggleButtons_full-width': props.fullWidth }),
    })
  )

  const [selected, setSelected] = props.selectedSignal ?? createSignal<T | undefined>(props.defaultSelected)

  function clickEventHandler(value: T) {
    if (value !== selected()) {
      setSelected(value as Exclude<T, Function>)
      props.onSelect?.(selected())
    } else if (!props.disableUnselect) {
      setSelected(undefined)
      props.onSelect?.(selected())
    }
  }

  return (
    <div {...attrs}>
      <For each={props.values}>
        {(value: T) => (
          <ToggleButton selected={selected() === value} onClick={() => clickEventHandler(value)}>
            <Slot content={props.children} params={{ value }}>
              {props.titles?.[String(value)] ?? value}
            </Slot>
          </ToggleButton>
        )}
      </For>
    </div>
  )
}
