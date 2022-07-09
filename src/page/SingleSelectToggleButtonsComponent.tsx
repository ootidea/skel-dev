import { createSignal } from 'solid-js'
import { SingleSelectToggleButtons } from '../lib/SingleSelectToggleButtons'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function SingleSelectToggleButtonsComponent() {
  const [selected, setSelected] = createSignal<'en' | 'zh' | undefined>('en')
  return (
    <article>
      <PageTitle>SingleSelectToggleButtons</PageTitle>

      <Sample>
        <SingleSelectToggleButtons values={['Male', 'Female']} />
        <SingleSelectToggleButtons values={['Female', 'Male', 'Other']} />
      </Sample>

      <SectionTitle>Titles</SectionTitle>
      <Sample>
        <SingleSelectToggleButtons values={['en', 'zh']} titles={{ en: 'English', zh: 'Chinese' }} />
        <SingleSelectToggleButtons values={['en', 'zh', 'jp']} titles={{ en: 'English', zh: 'Chinese' }} />
      </Sample>

      <SectionTitle>Signal</SectionTitle>
      <Sample>
        <SingleSelectToggleButtons values={['en', 'zh']} selectedSignal={[selected, setSelected]} />
        <div>selected() === {selected() !== undefined ? `'${selected()}'` : 'undefined'}</div>
      </Sample>

      <SectionTitle>Default selected</SectionTitle>
      <Sample>
        <SingleSelectToggleButtons values={['Male', 'Female']} defaultSelected="Male" />
      </Sample>

      <SectionTitle>onSelect</SectionTitle>
      <Sample>
        <SingleSelectToggleButtons values={['Male', 'Female']} onSelect={(value) => alert(value)} />
      </Sample>

      <SectionTitle>Disable unselect</SectionTitle>
      <Sample>
        <SingleSelectToggleButtons values={['Male', 'Female']} disableUnselect />
      </Sample>

      <SectionTitle>Full width</SectionTitle>
      <Sample>
        <SingleSelectToggleButtons fullWidth values={['Female', 'Male', 'LGBTQQIAAPPO2S']} />
      </Sample>
    </article>
  )
}
