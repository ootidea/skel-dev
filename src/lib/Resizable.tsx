import { createSignal, mergeProps } from 'solid-js'
import './Resizable.scss'
import { assertNonUndefined } from './utility/others'
import { joinClass, joinStyle, prepareProps, SkelProps, toGetters } from './utility/props'

export type ResizableProps = SkelProps<{}>

export function Resizable(rawProps: ResizableProps) {
  const [props, restProps] = prepareProps(rawProps, {})

  const [width, setWidth] = createSignal<number | undefined>(undefined)

  const attrs = mergeProps(
    restProps,
    toGetters({
      class: () => joinClass(rawProps.class, 'skel-Resizable_root'),
      style: () => joinStyle(rawProps.style, { width: width() ? `${width()}px` : 'auto' }),
    })
  )

  let rootElement: HTMLDivElement | undefined = undefined
  let dragStartCoordinate: { x: number; y: number } | undefined = undefined

  function onMouseDown(event: MouseEvent) {
    dragStartCoordinate = { x: event.clientX, y: event.clientY }
    document.body.addEventListener('mousemove', onMouseMove)
  }

  function onMouseMove(event: MouseEvent) {
    // if left mouse button is not pressed
    if ((event.buttons & 1) === 0) {
      dragStartCoordinate = undefined
    }

    if (dragStartCoordinate === undefined) {
      document.body.removeEventListener('mousemove', onMouseMove)
      return
    }

    assertNonUndefined(rootElement)
    const right = event.clientX
    const left = rootElement.getBoundingClientRect().left
    setWidth(right - left)
  }

  return (
    <div ref={rootElement} {...attrs}>
      <div>{rawProps.children}</div>
      <div class="skel-Resizable_resize-handle" onMouseDown={onMouseDown}></div>
    </div>
  )
}
