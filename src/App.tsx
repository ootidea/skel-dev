import { Route, Router, Routes } from 'solid-app-router'
import { For } from 'solid-js'
import classes from './App.module.scss'
import { Divider } from './lib/Divider'
import { Spinner } from './lib/Spinner'
import { StretchLayout } from './lib/StretchLayout'
import { ButtonComponent } from './page/ButtonComponent'
import { CheckboxComponent } from './page/CheckboxComponent'
import { DividerComponent } from './page/DividerComponent'
import { GravityComponent } from './page/GravityComponent'
import { SpinnerComponent } from './page/SpinnerComponent'
import { StretchLayoutComponent } from './page/StretchLayoutComponent'
import { SidebarMenu } from './SidebarMenu'

export function App() {
  const pages = [
    ['Button', ButtonComponent],
    ['Checkbox', CheckboxComponent],
    ['Divider', DividerComponent],
    ['Spinner', SpinnerComponent],
    ['StretchLayout', StretchLayoutComponent],
    ['Gravity', GravityComponent],
  ] as const

  return (
    <Router>
      <StretchLayout style={{ height: '100%' }} stretchAt={2}>
        <nav class={classes.sidebar}>
          <For each={pages}>{([name]) => <SidebarMenu componentName={name} />}</For>
        </nav>
        <Divider direction="vertical" />
        <main class={classes.main}>
          <Routes>
            {/* For some reason, it was not displayed using the For component. */}
            {pages.map(([name, component]) => (
              <Route path={name} element={component} />
            ))}
          </Routes>
        </main>
      </StretchLayout>
    </Router>
  )
}
