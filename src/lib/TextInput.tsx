import { JSX, mergeProps, splitProps } from 'solid-js'
import { Gravity } from './Gravity'
import { StretchLayout } from './StretchLayout'
import './TextInput.scss'
import { joinClasses, SkelProps, toGetters } from './utility/props'

export type TextInputProps = SkelProps<
  {
    prefix?: JSX.Element
    postfix?: JSX.Element
    prepend?: JSX.Element
    append?: JSX.Element
    onChangeValue?: (value: string) => unknown
  },
  'input'
>

export function TextInput(rawProps: TextInputProps) {
  const [props, inputElementAttrs] = splitProps(rawProps, [
    'class',
    'classList',
    'style',
    'prefix',
    'postfix',
    'prepend',
    'append',
    'onChangeValue',
  ])
  const attrs = mergeProps(
    props,
    toGetters({
      class: () => joinClasses(rawProps, 'skel-TextInput_root', { 'skel-TextInput_disabled': rawProps.disabled }),
    })
  )

  function onInput(event: InputEvent) {
    if (event.target instanceof HTMLInputElement) {
      props.onChangeValue?.(event.target.value)
    }
  }

  return (
    <StretchLayout stretchAt={1} class={attrs.class} classList={attrs.classList} style={attrs.style}>
      <Gravity class="skel-TextInput_prefix">{rawProps.prefix}</Gravity>
      <StretchLayout class="skel-TextInput_inner" stretchAt={1}>
        <Gravity class="skel-TextInput_prepend">{rawProps.prepend}</Gravity>
        <input class="skel-TextInput_input" onInput={onInput} {...inputElementAttrs} />
        <Gravity class="skel-TextInput_append">{rawProps.append}</Gravity>
      </StretchLayout>
      <Gravity class="skel-TextInput_postfix">{rawProps.postfix}</Gravity>
    </StretchLayout>
  )
}
