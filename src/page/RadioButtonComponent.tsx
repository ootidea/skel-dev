import { RadioButton } from '../lib/RadioButton'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function RadioButtonComponent() {
  return (
    <article>
      <PageTitle>RadioButton</PageTitle>

      <Sample direction="horizontal">
        <RadioButton name="type" value="Dog" />
        <RadioButton name="type" value="Cat" />
      </Sample>

      <Sample direction="horizontal">
        <RadioButton name="GAFA" value="G">
          Google
        </RadioButton>
        <RadioButton name="GAFA" value="A">
          Apple
        </RadioButton>
      </Sample>
    </article>
  )
}
