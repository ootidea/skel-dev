import chevronDown from '/src/chevron-down.svg'
import { createSignal, mergeProps, Show } from 'solid-js'
import { Divider } from './Divider'
import './Foldable.scss'
import { Gravity } from './Gravity'
import { Icon } from './Icon'
import { Slot } from './Slot'
import { StretchLayout } from './StretchLayout'
import { Arrow } from './utility/others'
import { joinClasses, joinStyle, prepareProps, SkelProps, SkelSlot, toGetters } from './utility/props'

export type FoldableProps = SkelProps<{
  defaultUnfolded?: boolean
  title?: SkelSlot<{ fold: () => void; unfold: () => void; toggle: () => void; unfolded: boolean }>
  icon?: SkelSlot<{ fold: () => void; unfold: () => void; toggle: () => void; unfolded: boolean }>
  children?: SkelSlot<{ fold: () => void; unfold: () => void; toggle: () => void }>
  headerBackgroundColor?: string
  borderColor?: string
  onUnfold?: Arrow<[], unknown>
}>

export function Foldable(rawProps: FoldableProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      defaultUnfolded: false,
      headerBackgroundColor: 'var(--skel-Foldable_header-background-default-color)',
      borderColor: 'var(--skel-Foldable_border-default-color)',
    },
    ['title', 'icon', 'onUnfold']
  )

  const [unfolded, setUnfolded] = createSignal(props.defaultUnfolded)

  const fold = () => setUnfolded(false)
  const unfold = () => setUnfolded(true)
  const toggle = () => setUnfolded(!unfolded())

  const attrs = mergeProps(
    restProps,
    toGetters({
      class: () => joinClasses(rawProps, 'skel-Foldable_root'),
      style: () =>
        joinStyle(rawProps.style, {
          '--skel-Foldable_header-background-color': props.headerBackgroundColor,
          '--skel-Foldable_border-color': props.borderColor,
        }),
      'data-unfolded': unfolded,
    })
  )

  return (
    <div {...attrs}>
      <StretchLayout class="skel-Foldable_header" direction="horizontal" onClick={toggle}>
        <div class="skel-Foldable_title">
          <Slot content={rawProps.title} params={{ fold, unfold, toggle, unfolded: unfolded() }} />
        </div>
        <Gravity>
          <Slot content={rawProps.icon} params={{ fold, unfold, toggle, unfolded: unfolded() }}>
            <Icon class="skel-Foldable_icon" src={chevronDown} />
          </Slot>
        </Gravity>
      </StretchLayout>
      <Show when={unfolded()}>
        <Divider color="var(--skel-Foldable_border-color)" />
        <div class="skel-Foldable_content-area">
          <Slot content={rawProps.children} params={{ fold, unfold, toggle }} />
        </div>
      </Show>
    </div>
  )
}
