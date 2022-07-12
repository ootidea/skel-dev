import { createEffect, createSignal, For, mergeProps } from 'solid-js'
import { Slot } from './Slot'
import './ToggleButtonGroup.scss'
import { call } from './utility/others'
import { joinClasses, prepareProps, SkelProps, SkelSlot, toGetters } from './utility/props'

export type ToggleButtonGroupProps<T extends string | number> = SkelProps<
  (
    | {
        exclusive: true
        selected?: T | undefined
        onChangeSelected?: (state: T | undefined) => unknown
        disableUnselect?: boolean
      }
    | { exclusive?: false; selected?: Set<T>; onChangeSelected?: (state: Set<T>) => unknown }
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
    ['values', 'titles', 'selected', 'onSelect', 'children']
  )
  const attrs = mergeProps(
    restProps,
    toGetters({
      class: () =>
        joinClasses(rawProps, 'skel-ToggleButtonGroup_root', {
          'skel-ToggleButtonGroup_full-width': props.fullWidth,
          'skel-ToggleButtonGroup_exclusive': props.exclusive,
        }),
    })
  )

  const union = call(() => {
    if (rawProps.exclusive) {
      const [selected, setSelected] = createSignal(rawProps.selected)
      createEffect(() => setSelected(rawProps.selected as Exclude<T, Function>))
      return {
        exclusive: true,
        selected,
        setSelected,
        onChangeSelected: rawProps.onChangeSelected,
        disableUnselect: rawProps.disableUnselect,
      } as const
    } else {
      const [selected, setSelected] = createSignal(rawProps.selected ?? new Set<T>(), { equals: false })
      createEffect(() => setSelected(rawProps.selected ?? new Set<T>()))
      return { exclusive: false, selected, setSelected, onChangeSelected: rawProps.onChangeSelected } as const
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
        union.onChangeSelected?.(value)
        props.onSelect?.(value)
      } else if (!union.disableUnselect) {
        union.setSelected(undefined)
        union.onChangeSelected?.(undefined)
        props.onUnselect?.(value)
      }
    } else {
      if (union.selected().has(value)) {
        union.selected().delete(value)
        union.setSelected(union.selected())
        union.onChangeSelected?.(union.selected())
        props.onUnselect?.(value)
      } else {
        union.selected().add(value)
        union.setSelected(union.selected())
        union.onChangeSelected?.(union.selected())
        props.onSelect?.(value)
      }
    }
  }

  return (
    <div {...attrs}>
      <For each={props.values}>
        {(value: T) => (
          <button
            class="skel-ToggleButtonGroup_button"
            classList={{ 'skel-ToggleButton_selected': isSelected(value) }}
            onClick={() => clickEventHandler(value)}
          >
            <Slot content={props.children} params={{ value }}>
              {props.titles?.[String(value)] ?? value}
            </Slot>
          </button>
        )}
      </For>
    </div>
  )
}
