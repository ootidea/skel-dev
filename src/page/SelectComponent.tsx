import { createSignal } from 'solid-js'
import { Select } from '../lib/Select'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function SelectComponent() {
  const [selected, setSelected] = createSignal<'Female' | 'Male' | 'Other' | undefined>('Female')

  return (
    <article>
      <PageTitle>Select</PageTitle>

      <Sample>
        <Select values={['Female', 'Male', 'Other']} />
      </Sample>

      <SectionTitle>Placeholder</SectionTitle>
      <Sample>
        <Select values={['Female', 'Male', 'Other']} placeholder="placeholder" />
      </Sample>

      <SectionTitle>Disabled</SectionTitle>
      <Sample>
        <Select values={['Female', 'Male', 'Other']} placeholder="placeholder" disabled />
      </Sample>

      <SectionTitle>Signal</SectionTitle>
      <Sample>
        <Select values={['Female', 'Male', 'Other']} selectedSignal={[selected, setSelected]} />
        <div>selected() === {selected() !== undefined ? `'${selected()}'` : 'undefined'}</div>
      </Sample>
    </article>
  )
}
