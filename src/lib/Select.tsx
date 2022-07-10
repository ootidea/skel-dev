import { createSignal, For, mergeProps, Show, Signal } from 'solid-js'
import { Divider } from './Divider'
import { Dropdown } from './Dropdown'
import { Icon } from './Icon'
import './Select.scss'
import { StretchLayout } from './StretchLayout'
import { joinClass, joinClassList, prepareProps, SkelProps, toGetters } from './utility/props'

export type SelectProps<T extends string> = SkelProps<{
  values: readonly T[]
  titles?: Partial<Record<string, string>>
  selectedSignal?: Signal<T | undefined>
  placeholder?: string
  disabled?: boolean
}>

export function Select<T extends string>(rawProps: SelectProps<T>) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      titles: {},
      placeholder: '',
      disabled: false,
    },
    ['values', 'selectedSignal']
  )

  function getText(value: string): string {
    return props.titles?.[value] ?? value
  }

  const [opened, setOpened] = createSignal(false)
  const [selected, setSelected] = props.selectedSignal ?? createSignal<T | undefined>(undefined)

  const attrs = mergeProps(
    restProps,
    toGetters({
      class: () => joinClass(rawProps.class, 'skel-Select_root'),
      classList: () =>
        joinClassList(rawProps.classList, { 'skel-Select_disabled': props.disabled, 'skel-Select_opened': opened() }),
    })
  )

  return (
    <Dropdown
      openedSignal={[opened, setOpened]}
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
          <Icon class="skel-Select_icon" src="/src/chevron-down.svg" />
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
                    setSelected(value as Exclude<T, Function>)
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
