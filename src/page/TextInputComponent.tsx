import { createSignal } from 'solid-js'
import { Icon } from '../lib/Icon'
import { Spinner } from '../lib/Spinner'
import { TextInput } from '../lib/TextInput'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function TextInputComponent() {
  const [value, setValue] = createSignal('default value')

  return (
    <article>
      <PageTitle>TextInput</PageTitle>

      <Sample>
        <TextInput />
      </Sample>

      <SectionTitle>Placeholder and default value</SectionTitle>
      <Sample>
        <TextInput placeholder="placeholder" />
        <TextInput value="default value" />
      </Sample>

      <SectionTitle>Bind to signal</SectionTitle>
      <Sample>
        <TextInput value={value()} onChangeValue={setValue} />
        <div>value() === '{value()}'</div>
      </Sample>

      <SectionTitle>Types</SectionTitle>
      <Sample>
        <TextInput type="tel" placeholder="tel" />
        <TextInput type="email" placeholder="email" />
        <TextInput type="password" placeholder="password" />
      </Sample>

      <SectionTitle>Append and prepend</SectionTitle>
      <Sample>
        <TextInput value="valid text" append={<Icon src="/src/check.svg" />} />
        <TextInput placeholder="security number" prepend={<Icon src="/src/alert-outline.svg" />} />
        <TextInput placeholder="Search" append={<Spinner />} />
      </Sample>

      <SectionTitle>Prefix and postfix</SectionTitle>
      <Sample>
        <TextInput placeholder="www.example" prefix="http://" postfix=".com" />
        <TextInput placeholder="Search" postfix={<Icon src="/src/search.svg" />} />
      </Sample>

      <SectionTitle>Disabled</SectionTitle>
      <Sample>
        <TextInput placeholder="placeholder" disabled />
        <TextInput value="default value" disabled />
      </Sample>
    </article>
  )
}
