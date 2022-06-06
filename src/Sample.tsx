import { mergeProps } from 'solid-js'
import { ParentProps } from 'solid-js/types/render/component'
import classes from './Sample.module.scss'

export function Sample(rawProps: ParentProps<{ direction?: 'horizontal' | 'vertical' }>) {
  const props = mergeProps({ direction: 'vertical' }, rawProps)
  return (
    <div class={classes.root}>
      <div class={classes.list} data-direction={props.direction}>
        {props.children}
      </div>
    </div>
  )
}
