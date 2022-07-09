import { mergeProps } from 'solid-js'
import { Slot } from './Slot'
import './ToggleButton.scss'
import { joinClass, joinClassList, prepareProps, SkelProps, SkelSlot, toGetters } from './utility/props'

export type ToggleButtonProps = SkelProps<{
  selected?: boolean
  children: SkelSlot<{ selected: boolean }>
}>

export function ToggleButton(rawProps: ToggleButtonProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      selected: false,
    },
    ['children']
  )

  const attrs = mergeProps(
    restProps,
    toGetters({
      class: () => joinClass(rawProps.class, 'skel-ToggleButton_root'),
      classList: () => joinClassList(rawProps.classList, { 'skel-ToggleButton_selected': props.selected }),
    })
  )

  return (
    <div {...attrs}>
      <Slot content={props.children} params={{ selected: props.selected }} />
    </div>
  )
}
