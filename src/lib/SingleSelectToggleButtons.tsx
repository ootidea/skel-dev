import { createSignal, For, mergeProps, Signal } from 'solid-js'
import './SingleSelectToggleButtons.scss'
import { Slot } from './Slot'
import { ToggleButton } from './ToggleButton'
import { joinClass, joinClassList, prepareProps, SkelProps, SkelSlot, toGetters } from './utility/props'

export type SingleSelectToggleButtonsProps<T extends readonly string[] | readonly number[]> = SkelProps<{
  values: T
  titles?: Partial<Record<string, string>>
  selectedSignal?: Signal<T[number] | undefined>
  defaultSelected?: T[number]
  fullWidth?: boolean
  disableUnselect?: boolean
  children?: SkelSlot<{ value: T[number] }>
  onSelect?: (selected: T[number] | undefined) => unknown
}>

export function SingleSelectToggleButtons<T extends readonly string[] | readonly number[]>(
  rawProps: SingleSelectToggleButtonsProps<T>
) {
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

  const [selected, setSelected] = props.selectedSignal ?? createSignal<T[number] | undefined>(props.defaultSelected)

  function clickEventHandler(value: T[number]) {
    if (value !== selected()) {
      // @ts-ignore May be a TypeScript's bug.
      setSelected(value)
      props.onSelect?.(selected())
    } else if (!props.disableUnselect) {
      setSelected(undefined)
      props.onSelect?.(selected())
    }
  }

  return (
    <div {...attrs}>
      <For each={props.values}>
        {(value: T[number]) => (
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
