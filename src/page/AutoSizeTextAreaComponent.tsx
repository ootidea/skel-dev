import { AutoSizeTextArea } from '../lib/AutoSizeTextArea'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function AutoSizeTextAreaComponent() {
  return (
    <article>
      <PageTitle>AutoSizeTextArea</PageTitle>

      <Sample>
        <AutoSizeTextArea />
      </Sample>

      <SectionTitle>Placeholder and initial value</SectionTitle>
      <Sample>
        <AutoSizeTextArea placeholder="placeholder" />
        <AutoSizeTextArea value="initial value" />
      </Sample>

      <SectionTitle>Disabled</SectionTitle>
      <Sample>
        <AutoSizeTextArea placeholder="placeholder" disabled />
        <AutoSizeTextArea value="initial value" disabled />
      </Sample>
    </article>
  )
}
