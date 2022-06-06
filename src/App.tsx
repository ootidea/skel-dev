import { Route, Router, Routes } from 'solid-app-router'
import classes from './App.module.scss'
import { Divider } from './lib/Divider'
import { StretchLayout } from './lib/StretchLayout'
import { DividerComponent } from './page/DividerComponent'
import { StretchLayoutComponent } from './page/StretchLayoutComponent'
import { SidebarMenu } from './SidebarMenu'

export function App() {
  return (
    <Router>
      <StretchLayout style={{ height: '100%' }} stretchAt={2}>
        <nav class={classes.sidebar}>
          <SidebarMenu componentName="Divider" />
          <SidebarMenu componentName="StretchLayout" />
        </nav>
        <Divider direction="vertical" />
        <main class={classes.main}>
          <Routes>
            <Route path="Divider" element={<DividerComponent />} />
            <Route path="StretchLayout" element={<StretchLayoutComponent />} />
          </Routes>
        </main>
      </StretchLayout>
    </Router>
  )
}
