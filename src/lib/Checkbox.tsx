import { mergeProps } from 'solid-js'
import './Checkbox.scss'
import { Arrow } from './utility/others'
import { joinClass, joinClassList, prepareProps, SkelProps } from './utility/props'

export type CheckboxProps = SkelProps<
  { checked?: boolean; value?: string | undefined; disabled?: boolean; onChange?: Arrow<[boolean, Event], unknown> },
  'label'
>

export function Checkbox(rawProps: CheckboxProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      checked: false,
      value: undefined as string | undefined,
      disabled: false,
    },
    ['onChange']
  )
  const attrs = mergeProps(restProps, {
    class: joinClass(rawProps.class, 'skel-Checkbox_root'),
    classList: joinClassList(rawProps.classList, { 'skel-Checkbox_disabled': props.disabled }),
  })

  function onChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      props.onChange?.(event.target.checked, event)
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
