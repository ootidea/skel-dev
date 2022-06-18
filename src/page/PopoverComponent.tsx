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
        <Popover persistent launcher={({ toggle }) => <Button onClick={toggle}>Open</Button>}>
          {({ close }) => <Button onClick={close}>Close</Button>}
        </Popover>
      </Sample>

      <SectionTitle>Position</SectionTitle>
      <Sample>
        <Popover on="top right" launcher={({ open }) => <Button onClick={open}>Open</Button>}>
          <div style="padding: 0.5em 1em">Pop up text</div>
        </Popover>
      </Sample>

      <SectionTitle>Position in detail</SectionTitle>
      <Sample>
        <Popover
          on="bottom right"
          joint="bottom right"
          launcher={({ toggle }) => (
            <div style="width: 20rem; height: 10rem; background-color: aliceblue">
              <Button onClick={toggle}>Open in right bottom</Button>
            </div>
          )}
        >
          <div style="padding: 0.2em 0.4em">Pop up text</div>
        </Popover>
      </Sample>
    </article>
  )
}
