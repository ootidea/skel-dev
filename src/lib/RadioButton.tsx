import { mergeProps } from 'solid-js'
import './common.scss'
import './RadioButton.scss'
import { joinClass, joinClassList, prepareProps, SkelProps } from './utility/props'

export type RadioButtonProps = SkelProps<{
  value?: string | undefined
  name?: string | undefined
  disabled?: boolean
}>

export function RadioButton(rawProps: RadioButtonProps) {
  const [props, restProps] = prepareProps(rawProps, {
    value: undefined,
    name: undefined,
    disabled: false,
  })
  const attrs = mergeProps(restProps, {
    class: joinClass(rawProps.class, 'skel-RadioButton_root'),
    classList: joinClassList(rawProps.classList, {
      'skel-RadioButton_disabled': props.disabled,
    }),
  })

  return (
    <label {...attrs}>
      <input
        type="radio"
        class="skel-RadioButton_radio"
        value={props.value}
        name={props.name}
        disabled={props.disabled}
      />
      {rawProps.children ?? props.value}
    </label>
  )
}
