import { Button } from '../lib/Button'
import { Dropdown } from '../lib/Dropdown'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function DropdownComponent() {
  return (
    <article>
      <PageTitle>Dropdown</PageTitle>

      <Sample>
        <Dropdown launcher={({ toggle }) => <Button onClick={toggle}>Open</Button>}>
          <h1>Title</h1>
          <p>contents</p>
        </Dropdown>
        <Dropdown
          launcher={({ toggle }) => (
            <Button style="width: 100%" onClick={toggle}>
              Open
            </Button>
          )}
        >
          <h1>Title</h1>
          <p>Content that is wider than the button</p>
        </Dropdown>
      </Sample>

      <SectionTitle>Persistent</SectionTitle>
      <Sample>
        <Dropdown persistent launcher={({ toggle }) => <Button onClick={toggle}>Open</Button>}>
          {({ close }) => <Button onClick={close}>Close</Button>}
        </Dropdown>
      </Sample>
    </article>
  )
}
