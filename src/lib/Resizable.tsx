import { createSignal, mergeProps, Show } from 'solid-js'
import './Resizable.scss'
import { assertNonUndefined } from './utility/others'
import { joinClass, joinStyle, prepareProps, SkelProps, toGetters } from './utility/props'

export type ResizableProps = SkelProps<{ onChangeWidth?: (width: number) => unknown }>

export function Resizable(rawProps: ResizableProps) {
  const [props, restProps] = prepareProps(rawProps, {}, ['onChangeWidth'])

  const [width, setWidth] = createSignal<number | undefined>(undefined)

  const attrs = mergeProps(
    restProps,
    toGetters({
      class: () => joinClass(rawProps.class, 'skel-Resizable_root'),
      style: () => joinStyle(rawProps.style, { width: width() ? `${width()}px` : 'auto' }),
    })
  )

  let rootElement: HTMLDivElement | undefined = undefined
  let dragState: { deltaX: number } | undefined = undefined

  function onMouseDown(event: MouseEvent) {
    assertNonUndefined(rootElement)
    dragState = { deltaX: event.clientX - rootElement.getBoundingClientRect().right }
    document.body.addEventListener('mousemove', onMouseMove)
  }

  function onMouseMove(event: MouseEvent) {
    // if left mouse button is not pressed
    if ((event.buttons & 1) === 0) {
      dragState = undefined
    }

    if (dragState === undefined) {
      document.body.removeEventListener('mousemove', onMouseMove)
      return
    }

    assertNonUndefined(rootElement)
    const right = event.clientX
    const left = rootElement.getBoundingClientRect().left
    const width = right - left - dragState.deltaX
    props.onChangeWidth?.(width)
    setWidth(width)
  }

  return (
    <div ref={rootElement} {...attrs}>
      <Show when={rawProps.children instanceof Array} fallback={rawProps.children}>
        <div>{rawProps.children}</div>
      </Show>
      <div class="skel-Resizable_resize-handle" onMouseDown={onMouseDown}></div>
    </div>
  )
}
