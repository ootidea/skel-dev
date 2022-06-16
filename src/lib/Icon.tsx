import { mergeProps } from 'solid-js'
import './Icon.scss'
import { joinClass, joinStyle, prepareProps, SkelProps } from './utility/props'

export function Icon(rawProps: SkelProps<{ src: string; size?: string; color?: string }>) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      size: 'var(--skel-Icon_default-size)',
      color: 'var(--skel-Icon_default-color)',
    },
    ['src']
  )
  const attrs = mergeProps(restProps, {
    class: joinClass(rawProps.class, 'skel-Icon_root'),
    style: joinStyle(rawProps.style, {
      '--skel-Icon_url': `url('${props.src}')`,
      '--skel-Icon_size': props.size,
      '--skel-Icon_color': props.color,
    }),
  })
  return <div {...attrs} />
}
