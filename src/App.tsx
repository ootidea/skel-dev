import { Route, Router, Routes } from 'solid-app-router'
import { For } from 'solid-js'
import classes from './App.module.scss'
import { Divider } from './lib/Divider'
import { Spinner } from './lib/Spinner'
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
import { SelectComponent } from './page/SelectComponent'
import { SingleSelectToggleButtonsComponent } from './page/SingleSelectToggleButtonsComponent'
import { SpinnerComponent } from './page/SpinnerComponent'
import { StepperComponent } from './page/StepperComponent'
import { StretchLayoutComponent } from './page/StretchLayoutComponent'
import { TextInputComponent } from './page/TextInputComponent'
import { SidebarMenu } from './SidebarMenu'

export function App() {
  const pages = [
    ['Button', ButtonComponent],
    ['IconButton', IconButtonComponent],
    ['SingleSelectToggleButtons', SingleSelectToggleButtonsComponent],
    ['Checkbox', CheckboxComponent],
    ['RadioButton', RadioButtonComponent],
    ['TextInput', TextInputComponent],
    ['AutoSizeTextArea', AutoSizeTextAreaComponent],
    ['Select', SelectComponent],
    ['Icon', IconComponent],
    ['Divider', DividerComponent],
    ['Spinner', SpinnerComponent],
    ['StretchLayout', StretchLayoutComponent],
    ['LayerLayout', LayerLayoutComponent],
    ['Gravity', GravityComponent],
    ['Modal', ModalComponent],
    ['Dropdown', DropdownComponent],
    ['Popover', PopoverComponent],
    ['Foldable', FoldableComponent],
    ['Calendar', CalendarComponent],
    ['DatePicker', DatePickerComponent],
    ['Stepper', StepperComponent],
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
