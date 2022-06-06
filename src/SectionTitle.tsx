import { ParentProps } from 'solid-js/types/render/component'
import classes from './SectionTitle.module.scss'

export function SectionTitle(props: ParentProps) {
  return <h2 class={classes.root}>{props.children}</h2>
}
