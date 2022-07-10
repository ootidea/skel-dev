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
        <AutoSizeTextArea value="default value" />
      </Sample>

      <SectionTitle>Bind to signal</SectionTitle>
      <Sample>
        <AutoSizeTextArea value={value()} onChangeValue={setValue} />
        <div style={{ 'white-space': 'pre-wrap' }}>{value()}</div>
      </Sample>

      <SectionTitle>Disabled</SectionTitle>
      <Sample>
        <AutoSizeTextArea placeholder="placeholder" disabled />
        <AutoSizeTextArea value="default value" disabled />
      </Sample>
    </article>
  )
}
