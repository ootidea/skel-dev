import { createSignal, mergeProps, Signal } from 'solid-js'
import './AutoSizeTextArea.scss'
import { joinClass, prepareProps, SkelProps, toGetters } from './utility/props'

export type AutoSizeTextAreaProps = SkelProps<{ valueSignal?: Signal<string> }, 'textarea'>

export function AutoSizeTextArea(rawProps: AutoSizeTextAreaProps) {
  const [props, restProps] = prepareProps(rawProps, {})
  const attrs = mergeProps(
    restProps,
    toGetters({
      class: () => joinClass(rawProps.class, 'skel-AutoSizeTextArea_text-area'),
    })
  )
  const [value, setValue] = rawProps.valueSignal ?? createSignal('')

  function onInput(event: InputEvent) {
    if (event.target instanceof HTMLTextAreaElement) {
      setValue(event.target.value)
    }
  }

  const ZERO_WIDTH_SPACE = '\u200B'

  return (
    <div class="skel-AutoSizeTextArea_root" classList={{ 'skel-AutoSizeTextArea_disabled': props.disabled }}>
      <div class="skel-AutoSizeTextArea_dummy" aria-hidden="true">
        {value() ? value() : rawProps.placeholder}
        {ZERO_WIDTH_SPACE}
      </div>
      <textarea onInput={onInput} {...attrs} />
    </div>
  )
}
