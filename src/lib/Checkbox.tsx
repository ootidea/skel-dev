import { mergeProps } from 'solid-js'
import './Checkbox.scss'
import { joinClass, joinClassList, prepareProps, SkelProps, toGetters } from './utility/props'

export type CheckboxProps = SkelProps<
  {
    checked?: boolean
    value?: string | undefined
    disabled?: boolean
    onChangeChecked?: (checked: boolean) => unknown
  },
  'label'
>

export function Checkbox(rawProps: CheckboxProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      checked: false,
      value: undefined,
      disabled: false,
    },
    ['onChangeChecked']
  )
  const attrs = mergeProps(
    restProps,
    toGetters({
      class: () => joinClass(rawProps.class, 'skel-Checkbox_root'),
      classList: () => joinClassList(rawProps.classList, { 'skel-Checkbox_disabled': props.disabled }),
    })
  )

  function onChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      props.onChangeChecked?.(event.target.checked)
    }
  }

  return (
    <label {...attrs}>
      <input
        type="checkbox"
        class="skel-Checkbox_checkbox"
        value={props.value}
        checked={props.checked}
        disabled={props.disabled}
        onChange={onChange}
      />
      <div class="skel-Checkbox_children">{rawProps.children}</div>
    </label>
  )
}
