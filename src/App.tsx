import { Route, Router, Routes } from 'solid-app-router'
import classes from './App.module.scss'
import { Divider } from './lib/Divider'
import { StretchLayout } from './lib/StretchLayout'
import { DividerComponent } from './page/DividerComponent'
import { SidebarMenu } from './SidebarMenu'

export function App() {
  return (
    <Router>
      <StretchLayout style={{ height: '100%' }} stretchAt={2}>
        <nav class={classes.sidebar}>
          <SidebarMenu componentName="Divider" />
        </nav>
        <Divider direction="vertical" />
        <main class={classes.main}>
          <Routes>
            <Route path="Divider" element={<DividerComponent />} />
          </Routes>
        </main>
      </StretchLayout>
    </Router>
  )
}
