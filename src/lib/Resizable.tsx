import { createSignal, mergeProps } from 'solid-js'
import './Resizable.scss'
import { assertNonNull } from './utility/others'
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

  function onDragStart(event: DragEvent) {
    // Hide drag image
    const img = document.createElement('img')
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    event.dataTransfer?.setDragImage(img, 0, 0)
  }

  function onDrag(event: DragEvent) {
    if (event.target instanceof HTMLElement) {
      assertNonNull(event.target.parentElement)
      const right = event.clientX
      const left = event.target.parentElement.getBoundingClientRect().left
      if (right - left >= 0) {
        setWidth(right - left)
      }
    }
  }

  return (
    <div {...attrs}>
      <div>{rawProps.children}</div>
      <div class="skel-Resizable_resize-handle" draggable={true} onDragStart={onDragStart} onDrag={onDrag}></div>
    </div>
  )
}
