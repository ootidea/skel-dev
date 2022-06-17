import { IconButton } from '../lib/IconButton'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function IconButtonComponent() {
  async function awaitSomeSeconds() {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000)
    })
  }

  return (
    <article>
      <PageTitle>IconButton</PageTitle>

      <Sample direction="horizontal">
        <IconButton src="/src/chevron-left.svg" />
        <IconButton src="/src/chevron-right.svg" />
      </Sample>

      <SectionTitle>Icon color</SectionTitle>
      <Sample direction="horizontal">
        <IconButton src="/src/chevron-left.svg" iconColor="#F05A4D" />
        <IconButton src="/src/chevron-right.svg" iconColor="hsl(180, 60%, 40%)" />
      </Sample>

      <SectionTitle>Button size</SectionTitle>
      <Sample direction="horizontal">
        <IconButton src="/src/chevron-left.svg" size="40px" />
        <IconButton src="/src/chevron-right.svg" size="1.5em" />
      </Sample>

      <SectionTitle>Icon size (without button size)</SectionTitle>
      <Sample direction="horizontal">
        <IconButton src="/src/chevron-left.svg" iconSize="50%" />
        <IconButton src="/src/chevron-right.svg" iconSize="100%" />
      </Sample>

      <SectionTitle>onClick function that returns a Promise</SectionTitle>
      <Sample direction="horizontal">
        <IconButton src="/src/chevron-left.svg" onClick={awaitSomeSeconds} />
        <IconButton src="/src/chevron-right.svg" onClick={awaitSomeSeconds} />
      </Sample>
    </article>
  )
}
