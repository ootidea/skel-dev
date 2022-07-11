import chevronLeft from '/src/chevron-left.svg'
import { Icon } from '../lib/Icon'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function IconComponent() {
  return (
    <article>
      <PageTitle>Icon</PageTitle>

      <Sample direction="horizontal">
        <Icon src={chevronLeft} />
      </Sample>

      <SectionTitle>Size</SectionTitle>
      <Sample direction="horizontal">
        <Icon src={chevronLeft} size="1em" />
        <Icon src={chevronLeft} size="2rem" />
        <Icon src={chevronLeft} size="40px" />
      </Sample>

      <SectionTitle>Color</SectionTitle>
      <Sample direction="horizontal">
        <Icon src={chevronLeft} color="red" />
        <Icon src={chevronLeft} color="green" />
      </Sample>
    </article>
  )
}
