import chevronDown from '/src/chevron-down.svg'
import { createEffect, createSignal, For, mergeProps, Show } from 'solid-js'
import { Divider } from './Divider'
import { Dropdown } from './Dropdown'
import { Icon } from './Icon'
import './Select.scss'
import { StretchLayout } from './StretchLayout'
import { joinClasses, prepareProps, SkelProps, toGetters } from './utility/props'

export type SelectProps<T extends string> = SkelProps<{
  values: readonly T[]
  titles?: Partial<Record<string, string>>
  selected?: T | undefined
  placeholder?: string
  disabled?: boolean
  onChangeSelected?: (selected: T | undefined) => unknown
}>

export function Select<T extends string>(rawProps: SelectProps<T>) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      titles: {},
      placeholder: '',
      disabled: false,
    },
    ['values', 'selected', 'onChangeSelected']
  )

  function getText(value: string): string {
    return props.titles?.[value] ?? value
  }

  const [opened, setOpened] = createSignal(false)
  const [selected, setSelected] = createSignal(props.selected)
  createEffect(() => setSelected(props.selected as Exclude<T, Function>))

  const attrs = mergeProps(
    restProps,
    toGetters({
      class: () =>
        joinClasses(rawProps, 'skel-Select_root', {
          'skel-Select_disabled': props.disabled,
          'skel-Select_opened': opened(),
        }),
    })
  )

  function changeSelected(selected: T | undefined) {
    setSelected(selected as Exclude<T, Function>)
    props.onChangeSelected?.(selected)
  }

  return (
    <Dropdown
      opened={opened()}
      onChangeOpened={setOpened}
      launcher={({ toggle }) => (
        <StretchLayout onClick={() => props.disabled || toggle()} {...attrs}>
          <div class="skel-Select_preview-area">
            <For each={props.values}>
              {(value) => (
                <div class="skel-Select_selected-value" classList={{ 'skel-Select_invisible': selected() !== value }}>
                  {getText(value)}
                </div>
              )}
            </For>
            <div class="skel-Select_placeholder" classList={{ 'skel-Select_invisible': selected() !== undefined }}>
              {props.placeholder}
            </div>
          </div>
          <Icon class="skel-Select_icon" src={chevronDown} />
        </StretchLayout>
      )}
    >
      {({ toggle }) => (
        <div class="skel-Select_dropdown" classList={{ 'skel-Select_no-selected-option': selected() === undefined }}>
          <For each={props.values}>
            {(value, i) => (
              <>
                <Show when={i() > 0}>
                  <Divider />
                </Show>
                <div
                  class="skel-Select_option"
                  classList={{ 'skel-Select_selected': selected() === value }}
                  onClick={() => {
                    changeSelected(value)
                    toggle()
                  }}
                >
                  {getText(value)}
                </div>
              </>
            )}
          </For>
        </div>
      )}
    </Dropdown>
  )
}
