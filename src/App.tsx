import { Route, Router, Routes } from 'solid-app-router'
import { For } from 'solid-js'
import classes from './App.module.scss'
import { Divider } from './lib/Divider'
import { StretchLayout } from './lib/StretchLayout'
import { AutoSizeTextAreaComponent } from './page/AutoSizeTextAreaComponent'
import { ButtonComponent } from './page/ButtonComponent'
import { CalendarComponent } from './page/CalendarComponent'
import { CheckboxComponent } from './page/CheckboxComponent'
import { DatePickerComponent } from './page/DatePickerComponent'
import { DividerComponent } from './page/DividerComponent'
import { DropdownComponent } from './page/DropdownComponent'
import { FoldableComponent } from './page/FoldableComponent'
import { GravityComponent } from './page/GravityComponent'
import { IconButtonComponent } from './page/IconButtonComponent'
import { IconComponent } from './page/IconComponent'
import { LayerLayoutComponent } from './page/LayerLayoutComponent'
import { ModalComponent } from './page/ModalComponent'
import { PopoverComponent } from './page/PopoverComponent'
import { RadioButtonComponent } from './page/RadioButtonComponent'
import { ResizableComponent } from './page/ResizableComponent'
import { SelectComponent } from './page/SelectComponent'
import { SpinnerComponent } from './page/SpinnerComponent'
import { StepperComponent } from './page/StepperComponent'
import { StretchLayoutComponent } from './page/StretchLayoutComponent'
import { TextInputComponent } from './page/TextInputComponent'
import { ToggleButtonGroupComponent } from './page/ToggleButtonGroupComponent'
import { SidebarMenu } from './SidebarMenu'

function getName(component: Function) {
  return component.name.replace(/Component$/, '')
}

export function App() {
  const pages = [
    ButtonComponent,
    IconButtonComponent,
    ToggleButtonGroupComponent,
    CheckboxComponent,
    RadioButtonComponent,
    TextInputComponent,
    AutoSizeTextAreaComponent,
    SelectComponent,
    IconComponent,
    DividerComponent,
    SpinnerComponent,
    StretchLayoutComponent,
    LayerLayoutComponent,
    GravityComponent,
    ModalComponent,
    DropdownComponent,
    PopoverComponent,
    FoldableComponent,
    ResizableComponent,
    CalendarComponent,
    DatePickerComponent,
    StepperComponent,
  ] as const

  return (
    <Router>
      <StretchLayout style={{ height: '100%' }} stretchAt={2}>
        <nav class={classes.sidebar}>
          <For each={pages}>{(component) => <SidebarMenu componentName={getName(component)} />}</For>
        </nav>
        <Divider direction="vertical" />
        <main class={classes.main}>
          <Routes>
            {/* For some reason, it was not displayed using the For component. */}
            {pages.map((component) => (
              <Route path={getName(component)} element={component} />
            ))}
          </Routes>
        </main>
      </StretchLayout>
    </Router>
  )
}
