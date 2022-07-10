import { createSignal } from 'solid-js'
import { AutoSizeTextArea } from '../lib/AutoSizeTextArea'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function AutoSizeTextAreaComponent() {
  const [value, setValue] = createSignal('default value')

  return (
    <article>
      <PageTitle>AutoSizeTextArea</PageTitle>

      <Sample>
        <AutoSizeTextArea />
      </Sample>

      <SectionTitle>Placeholder and default value</SectionTitle>
      <Sample>
        <AutoSizeTextArea placeholder="placeholder" />
        <AutoSizeTextArea defaultValue="default value" />
      </Sample>

      <SectionTitle>Signal</SectionTitle>
      <Sample>
        <AutoSizeTextArea valueSignal={[value, setValue]} />
        <div style={{ 'white-space': 'pre-wrap' }}>{value()}</div>
      </Sample>

      <SectionTitle>Disabled</SectionTitle>
      <Sample>
        <AutoSizeTextArea placeholder="placeholder" disabled />
        <AutoSizeTextArea defaultValue="default value" disabled />
      </Sample>
    </article>
  )
}
