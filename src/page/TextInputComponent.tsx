import { Icon } from '../lib/Icon'
import { Spinner } from '../lib/Spinner'
import { TextInput } from '../lib/TextInput'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function TextInputComponent() {
  return (
    <article>
      <PageTitle>TextInput</PageTitle>

      <Sample>
        <TextInput />
      </Sample>

      <SectionTitle>Placeholder and initial value</SectionTitle>
      <Sample>
        <TextInput placeholder="placeholder" />
        <TextInput value="initial value" />
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
        <TextInput placeholder="www.example" prefix="http://" postfix=".com"></TextInput>
        <TextInput placeholder="Search" postfix={<Icon src="/src/search.svg" />}></TextInput>
      </Sample>

      <SectionTitle>Disabled</SectionTitle>
      <Sample>
        <TextInput placeholder="placeholder" disabled />
        <TextInput value="initial value" disabled />
      </Sample>
    </article>
  )
}
