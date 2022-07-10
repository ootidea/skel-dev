import { createSignal, For, mergeProps, Signal } from 'solid-js'
import { Slot } from './Slot'
import { ToggleButton } from './ToggleButton'
import './ToggleButtonGroup.scss'
import { call } from './utility/others'
import { joinClass, joinClassList, prepareProps, SkelProps, SkelSlot, toGetters } from './utility/props'

export type ToggleButtonGroupProps<T extends string | number> = SkelProps<
  (
    | {
        exclusive: true
        selectedSignal?: Signal<T | undefined>
        onChange?: (state: T | undefined) => unknown
        defaultSelected?: T
        disableUnselect?: boolean
      }
    | { exclusive?: false; selectedSignal?: Signal<Set<T>>; onChange?: (state: Set<T>) => unknown }
  ) & {
    values: readonly T[]
    titles?: Partial<Record<string, string>>
    fullWidth?: boolean
    children?: SkelSlot<{ value: T }>
    onSelect?: (selected: T) => unknown
    onUnselect?: (selected: T) => unknown
  }
>

export function ToggleButtonGroup<T extends string | number>(rawProps: ToggleButtonGroupProps<T>) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      fullWidth: false,
      disableUnselect: false,
      exclusive: false,
    },
    ['values', 'titles', 'selectedSignal', 'onSelect', 'children']
  )
  const attrs = mergeProps(
    restProps,
    toGetters({
      class: () => joinClass(rawProps.class, 'skel-ToggleButtonGroup_root'),
      classList: () => joinClassList(rawProps.classList, { 'skel-ToggleButtonGroup_full-width': props.fullWidth }),
    })
  )

  const union = call(() => {
    if (rawProps.exclusive) {
      const [selected, setSelected] = rawProps.selectedSignal ?? createSignal<T | undefined>(undefined)
      return { exclusive: true, selected, setSelected, disableUnselect: rawProps.disableUnselect } as const
    } else {
      const [selected, setSelected] = rawProps.selectedSignal ?? createSignal<Set<T>>(new Set(), { equals: false })
      return { exclusive: false, selected, setSelected } as const
    }
  })

  function isSelected(value: T) {
    if (union.exclusive) {
      return union.selected() === value
    } else {
      return union.selected().has(value)
    }
  }

  function clickEventHandler(value: T) {
    if (union.exclusive) {
      if (union.selected() !== value) {
        union.setSelected(value as Exclude<T, Function>)
        props.onSelect?.(value)
      } else if (!union.disableUnselect) {
        union.setSelected(undefined)
        props.onUnselect?.(value)
      }
    } else {
      if (union.selected().has(value)) {
        union.selected().delete(value)
        union.setSelected(union.selected())
        props.onSelect?.(value)
      } else {
        union.selected().add(value)
        union.setSelected(union.selected())
        props.onUnselect?.(value)
      }
    }
  }

  return (
    <div {...attrs}>
      <For each={props.values}>
        {(value: T) => (
          <ToggleButton selected={isSelected(value)} onClick={() => clickEventHandler(value)}>
            <Slot content={props.children} params={{ value }}>
              {props.titles?.[String(value)] ?? value}
            </Slot>
          </ToggleButton>
        )}
      </For>
    </div>
  )
}
