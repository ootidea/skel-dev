import { mergeProps } from 'solid-js'
import './common.scss'
import './RadioButton.scss'
import { joinClasses, prepareProps, SkelProps, toGetters } from './utility/props'

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
  const attrs = mergeProps(
    restProps,
    toGetters({
      class: () =>
        joinClasses(rawProps, 'skel-RadioButton_root', {
          'skel-RadioButton_disabled': props.disabled,
        }),
    })
  )

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
