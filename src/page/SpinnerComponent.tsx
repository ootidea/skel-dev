import { Spinner } from '../lib/Spinner'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function SpinnerComponent() {
  return (
    <article>
      <PageTitle>Spinner</PageTitle>

      <Sample direction="horizontal">
        <Spinner />
      </Sample>

      <SectionTitle>Size</SectionTitle>
      <Sample direction="horizontal">
        <Spinner size="10px" />
        <Spinner size="1em" />
        <Spinner size="2rem" />
      </Sample>

      <SectionTitle>Frequency</SectionTitle>
      <Sample direction="horizontal">
        <Spinner frequency={0.7} />
        <Spinner frequency={1.4} />
        <Spinner frequency={2.1} />
        <Spinner frequency={2.8} />
      </Sample>

      <SectionTitle>Thickness</SectionTitle>
      <Sample direction="horizontal">
        <Spinner thickness={10} />
        <Spinner thickness={25} />
        <Spinner thickness={50} />
        <Spinner thickness={80} />
      </Sample>
    </article>
  )
}
