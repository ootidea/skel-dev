import { createSignal, mergeProps } from 'solid-js'
import { Gravity } from './Gravity'
import { Icon } from './Icon'
import './IconButton.scss'
import { Spinner } from './Spinner'
import { Arrow } from './utility/others'
import { joinClass, joinClassList, joinStyle, prepareProps, SkelProps } from './utility/props'

export function IconButton(
  rawProps: SkelProps<
    {
      src: string
      size?: string
      iconSize?: string
      iconColor?: string
      disabledColor?: string
      onClick?: Arrow<[MouseEvent], unknown>
    },
    'button'
  >
) {
  const [isInProgress, setIsInProgress] = createSignal(false)

  function clickEventHandler(event: MouseEvent) {
    if (isInProgress()) return

    const promise = rawProps.onClick?.(event)
    if (promise instanceof Promise) {
      setIsInProgress(true)
      promise.finally(() => setIsInProgress(false))
    }
  }

  const [props, restProps] = prepareProps(
    rawProps,
    {
      size: 'var(--skel-IconButton_default-size)',
      iconSize: 'var(--skel-IconButton_icon-default-size)',
      iconColor: 'var(--skel-Icon_default-color)',
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
    }),
  })
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
