import { Divider } from '../lib/Divider'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function DividerComponent() {
  return (
    <article>
      <PageTitle>Divider</PageTitle>

      <Sample>
        <Divider />
      </Sample>

      <SectionTitle>Vertical divider</SectionTitle>
      <Sample>
        <div style="height: 100px; width: 100%; display: flex; justify-content: space-between;">
          <Divider direction="vertical" />
          <Divider direction="vertical" />
          <Divider direction="vertical" />
        </div>
      </Sample>

      <SectionTitle>Color</SectionTitle>
      <Sample>
        <Divider color="green" />
        <Divider color="hsl(0 0% 0%)" />
        <Divider color="linear-gradient(to right, red, blue)" />
      </Sample>

      <SectionTitle>Thickness</SectionTitle>
      <Sample>
        <Divider thickness="1px" />
        <Divider thickness="0.2em" />
        <Divider thickness="0.5rem" />
      </Sample>
    </article>
  )
}
