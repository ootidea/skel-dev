import { createSignal } from 'solid-js'
import { Icon } from '../lib/Icon'
import { ToggleButtonGroup } from '../lib/ToggleButtonGroup'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function ToggleButtonGroupComponent() {
  const [selected, setSelected] = createSignal<'en' | 'zh' | undefined>('en')
  return (
    <article>
      <PageTitle>ToggleButtonGroup</PageTitle>

      <Sample>
        <ToggleButtonGroup values={['Male', 'Female']} />
        <ToggleButtonGroup values={['Female', 'Male', 'Other']} />
      </Sample>

      <SectionTitle>Exclusive (single select)</SectionTitle>
      <Sample>
        <ToggleButtonGroup exclusive values={['Male', 'Female']} />
        <ToggleButtonGroup exclusive values={['Female', 'Male', 'Other']} />
      </Sample>

      <SectionTitle>Titles</SectionTitle>
      <Sample>
        <ToggleButtonGroup values={['en', 'zh']} titles={{ en: 'English', zh: 'Chinese' }} />
        <ToggleButtonGroup values={['en', 'zh', 'jp']} titles={{ en: 'English', zh: 'Chinese' }} />
      </Sample>

      <SectionTitle>Icons</SectionTitle>
      <Sample>
        <ToggleButtonGroup values={['left', 'right']}>
          {({ value }) => <Icon src={`src/format-align-${value}.svg`} />}
        </ToggleButtonGroup>
      </Sample>

      <SectionTitle>Signal</SectionTitle>
      <Sample>
        <ToggleButtonGroup exclusive values={['en', 'zh']} selectedSignal={[selected, setSelected]} />
        <div>selected() === {selected() !== undefined ? `'${selected()}'` : 'undefined'}</div>
      </Sample>

      <SectionTitle>Default selected</SectionTitle>
      <Sample>
        <ToggleButtonGroup exclusive values={['Male', 'Female']} defaultSelected="Male" />
      </Sample>

      <SectionTitle>onSelect</SectionTitle>
      <Sample>
        <ToggleButtonGroup values={['Male', 'Female']} onSelect={(value) => alert(value)} />
      </Sample>

      <SectionTitle>Disable unselect</SectionTitle>
      <Sample>
        <ToggleButtonGroup values={['Male', 'Female']} disableUnselect />
      </Sample>

      <SectionTitle>Full width</SectionTitle>
      <Sample>
        <ToggleButtonGroup fullWidth values={['Female', 'Male', 'LGBTQQIAAPPO2S']} />
      </Sample>
    </article>
  )
}
