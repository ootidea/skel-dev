import { Button } from '../lib/Button'
import { Popover } from '../lib/Popover'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function PopoverComponent() {
  return (
    <article>
      <PageTitle>Popover</PageTitle>

      <Sample>
        <Popover launcher={({ open }) => <Button onClick={open}>Open</Button>}>
          <h1>Title</h1>
          <p>contents</p>
        </Popover>
      </Sample>

      <SectionTitle>Persistent</SectionTitle>
      <Sample>
        <Popover persistent launcher={({ open }) => <Button onClick={open}>Open</Button>}>
          {({ close }) => <Button onClick={close}>Close</Button>}
        </Popover>
      </Sample>
    </article>
  )
}
