import { createSignal, mergeProps } from 'solid-js'
import { Gravity } from './Gravity'
import { Icon } from './Icon'
import './IconButton.scss'
import { Spinner } from './Spinner'
import { calculateActiveColor, calculateHoverColor, toHsl } from './utility/color'
import { Arrow } from './utility/others'
import { joinClass, joinClassList, joinStyle, prepareProps, SkelProps } from './utility/props'

export type IconButtonProps = SkelProps<
  {
    src: string
    size?: string
    iconSize?: string
    iconColor?: string
    backgroundColor?: string
    disabledColor?: string
    onClick?: Arrow<[MouseEvent], unknown>
  },
  'button'
>

export function IconButton(rawProps: IconButtonProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      size: 'var(--skel-IconButton_default-size)',
      iconSize: 'var(--skel-IconButton_icon-default-size)',
      iconColor: 'var(--skel-Icon_default-color)',
      backgroundColor: 'transparent',
      disabledColor: 'var(--skel-IconButton_disabled-default-color)',
    },
    ['src', 'onClick']
  )
  const attrs = mergeProps(restProps, {
    class: joinClass(rawProps.class, 'skel-IconButton_root'),
    classList: joinClassList(rawProps.classList, {
      'skel-IconButton_disabled': rawProps.disabled,
    }),
    style: joinStyle(rawProps.style, {
      '--skel-IconButton_size': props.size,
      '--skel-IconButton_icon-size': props.iconSize,
      '--skel-IconButton_background-color': toHsl(props.backgroundColor),
      '--skel-IconButton_background-hover-color': calculateHoverColor(props.backgroundColor),
      '--skel-IconButton_background-active-color': calculateActiveColor(props.backgroundColor),
    }),
  })

  const [isInProgress, setIsInProgress] = createSignal(false)

  function clickEventHandler(event: MouseEvent) {
    if (isInProgress()) return

    const promise = rawProps.onClick?.(event)
    if (promise instanceof Promise) {
      setIsInProgress(true)
      promise.finally(() => setIsInProgress(false))
    }
  }

  return (
    <button onClick={clickEventHandler} {...attrs}>
      {isInProgress() ? (
        <Gravity>
          <Spinner />
        </Gravity>
      ) : (
        <Icon src={props.src} size={props.iconSize} color={props.disabled ? props.disabledColor : props.iconColor} />
      )}
    </button>
  )
}
