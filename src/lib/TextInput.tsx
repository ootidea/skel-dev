import { JSX, mergeProps, splitProps } from 'solid-js'
import { Gravity } from './Gravity'
import { StretchLayout } from './StretchLayout'
import './TextInput.scss'
import { joinClass, joinClassList, SkelProps } from './utility/props'

export type TextInputProps = SkelProps<
  {
    prefix?: JSX.Element
    postfix?: JSX.Element
    prepend?: JSX.Element
    append?: JSX.Element
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
  ])
  const attrs = mergeProps(props, {
    class: joinClass(rawProps.class, 'skel-TextInput_root'),
    classList: joinClassList(rawProps.classList, { 'skel-TextInput_disabled': rawProps.disabled }),
  })

  return (
    <StretchLayout stretchAt={1} class={attrs.class} classList={attrs.classList} style={attrs.style}>
      <Gravity class="skel-TextInput_prefix">{rawProps.prefix}</Gravity>
      <StretchLayout class="skel-TextInput_inner" stretchAt={1}>
        <Gravity class="skel-TextInput_prepend">{rawProps.prepend}</Gravity>
        <input class="skel-TextInput_input" {...inputElementAttrs} />
        <Gravity class="skel-TextInput_append">{rawProps.append}</Gravity>
      </StretchLayout>
      <Gravity class="skel-TextInput_postfix">{rawProps.postfix}</Gravity>
    </StretchLayout>
  )
}
