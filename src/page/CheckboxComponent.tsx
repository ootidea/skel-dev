import { createSignal } from 'solid-js'
import { Checkbox } from '../lib/Checkbox'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function CheckboxComponent() {
  const [checked, setChecked] = createSignal(true)

  return (
    <article>
      <PageTitle>Checkbox</PageTitle>

      <Sample>
        <Checkbox>Agree</Checkbox>
        <Checkbox>Accept</Checkbox>
      </Sample>

      <SectionTitle>Default checked</SectionTitle>
      <Sample>
        <Checkbox checked>Agree</Checkbox>
      </Sample>

      <SectionTitle>Bind to signal</SectionTitle>
      <Sample>
        <Checkbox checked={checked()} onChangeChecked={setChecked}>
          Agree
        </Checkbox>
        <div>checked() === {String(checked())}</div>
      </Sample>

      <SectionTitle>Disabled</SectionTitle>
      <Sample>
        <Checkbox disabled>Agree</Checkbox>
        <Checkbox checked disabled>
          Accept
        </Checkbox>
      </Sample>
    </article>
  )
}
