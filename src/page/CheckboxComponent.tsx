import { createSignal } from 'solid-js'
import { Checkbox } from '../lib/Checkbox'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function CheckboxComponent() {
  const [get, set] = createSignal(true)
  return (
    <article>
      <PageTitle>Checkbox</PageTitle>
      <Sample>
        <Checkbox checked={get()} onChange={set}>
          Agree
        </Checkbox>
        <Checkbox checked={get()} onChange={set}>
          Agree
        </Checkbox>
      </Sample>
    </article>
  )
}
