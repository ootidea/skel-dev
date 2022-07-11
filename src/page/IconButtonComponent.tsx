import chevronLeft from '/src/chevron-left.svg'
import chevronRight from '/src/chevron-right.svg'
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
        <IconButton src={chevronLeft} />
        <IconButton src={chevronRight} />
      </Sample>

      <SectionTitle>Icon color</SectionTitle>
      <Sample direction="horizontal">
        <IconButton src={chevronLeft} iconColor="#F05A4D" />
        <IconButton src={chevronRight} iconColor="hsl(180, 60%, 40%)" />
      </Sample>

      <SectionTitle>Background color</SectionTitle>
      <Sample direction="horizontal">
        <IconButton src={chevronLeft} backgroundColor="hsl(0 0% 90%)" />
        <IconButton src={chevronRight} backgroundColor="hsl(0 0% 90%)" />
      </Sample>

      <SectionTitle>Button size</SectionTitle>
      <Sample direction="horizontal">
        <IconButton src={chevronLeft} size="40px" />
        <IconButton src={chevronRight} size="1.5em" />
      </Sample>

      <SectionTitle>Icon size (without button size)</SectionTitle>
      <Sample direction="horizontal">
        <IconButton src={chevronLeft} iconSize="50%" />
        <IconButton src={chevronRight} iconSize="100%" />
      </Sample>

      <SectionTitle>onClick function that returns a Promise</SectionTitle>
      <Sample direction="horizontal">
        <IconButton src={chevronLeft} onClick={awaitSomeSeconds} />
        <IconButton src={chevronRight} onClick={awaitSomeSeconds} />
      </Sample>
    </article>
  )
}
