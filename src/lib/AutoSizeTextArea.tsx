import { createEffect, createSignal, mergeProps } from 'solid-js'
import './AutoSizeTextArea.scss'
import { joinClass, prepareProps, SkelProps, toGetters } from './utility/props'

export type AutoSizeTextAreaProps = SkelProps<
  { value?: string; onChangeValue?: (value: string) => unknown },
  'textarea'
>

export function AutoSizeTextArea(rawProps: AutoSizeTextAreaProps) {
  const [props, restProps] = prepareProps(rawProps, {}, ['value', 'onChangeValue'])
  const attrs = mergeProps(
    restProps,
    toGetters({
      class: () => joinClass(rawProps.class, 'skel-AutoSizeTextArea_text-area'),
    })
  )
  const [value, setValue] = createSignal(rawProps.value)
  createEffect(() => setValue(rawProps.value))

  function onChangeValue(value: string) {
    setValue(value)
    props.onChangeValue?.(value)
  }

  function onInput(event: InputEvent) {
    if (event.target instanceof HTMLTextAreaElement) {
      onChangeValue(event.target.value)
    }
  }

  const ZERO_WIDTH_SPACE = '\u200B'

  return (
    <div class="skel-AutoSizeTextArea_root" classList={{ 'skel-AutoSizeTextArea_disabled': props.disabled }}>
      <div class="skel-AutoSizeTextArea_dummy" aria-hidden="true">
        {value() ? value() : rawProps.placeholder}
        {ZERO_WIDTH_SPACE}
      </div>
      <textarea value={value()} onInput={onInput} {...attrs} />
    </div>
  )
}
