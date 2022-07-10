import { createSignal } from 'solid-js'
import { Icon } from '../lib/Icon'
import { ToggleButtonGroup } from '../lib/ToggleButtonGroup'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function ToggleButtonGroupComponent() {
  const [selected1, setSelected1] = createSignal<'en' | 'zh' | undefined>('en')
  const [selected2, setSelected2] = createSignal<Set<'en' | 'zh'>>(new Set(), { equals: false })

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

      <SectionTitle>Default selected</SectionTitle>
      <Sample>
        <ToggleButtonGroup exclusive values={['Male', 'Female']} selected="Male" />
        <ToggleButtonGroup values={['en', 'zh']} selected={new Set(['en', 'zh'])} />
      </Sample>

      <SectionTitle>Bind to signal</SectionTitle>
      <Sample>
        <ToggleButtonGroup exclusive values={['en', 'zh']} selected={selected1()} onChangeSelected={setSelected1} />
        <div>selected1() === {selected1() !== undefined ? `'${selected1()}'` : 'undefined'}</div>
        <ToggleButtonGroup values={['en', 'zh']} selected={selected2()} onChangeSelected={setSelected2} />
        <div>selected2() equals new Set({JSON.stringify([...selected2()])})</div>
      </Sample>

      <SectionTitle>Disable unselect</SectionTitle>
      <Sample>
        <ToggleButtonGroup exclusive values={['Male', 'Female']} disableUnselect />
      </Sample>

      <SectionTitle>Full width</SectionTitle>
      <Sample>
        <ToggleButtonGroup fullWidth values={['Female', 'Male', 'LGBTQQIAAPPO2S']} />
      </Sample>
    </article>
  )
}
