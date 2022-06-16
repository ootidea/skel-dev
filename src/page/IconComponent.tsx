import { Icon } from '../lib/Icon'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function IconComponent() {
  return (
    <article>
      <PageTitle>Icon</PageTitle>

      <Sample direction="horizontal">
        <Icon src="/src/chevron-left.svg" />
      </Sample>

      <SectionTitle>Size</SectionTitle>
      <Sample direction="horizontal">
        <Icon src="/src/chevron-left.svg" size="1em" />
        <Icon src="/src/chevron-left.svg" size="2rem" />
        <Icon src="/src/chevron-left.svg" size="40px" />
      </Sample>

      <SectionTitle>Color</SectionTitle>
      <Sample direction="horizontal">
        <Icon src="/src/chevron-left.svg" color="red" />
        <Icon src="/src/chevron-left.svg" color="green" />
      </Sample>
    </article>
  )
}
