import { useLocation, useNavigate } from 'solid-app-router'
import { createMemo, VoidProps } from 'solid-js'
import classes from './SidebarMenu.module.scss'

export function SidebarMenu(props: VoidProps<{ componentName: string }>) {
  const href = () => `/${props.componentName}`
  const isActive = createMemo(() => {
    return useLocation().pathname === href()
  })

  const navigator = useNavigate()
  function onClick() {
    navigator(href())
  }

  return (
    <div class={classes.root} classList={{ [classes.active]: isActive() }} onClick={onClick}>
      {props.componentName}
    </div>
  )
}
