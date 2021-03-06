import { createSignal, Index } from 'solid-js'
import { Button } from '../lib/Button'
import { Modal } from '../lib/Modal'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function ModalComponent() {
  const [opened, setOpened] = createSignal(false)

  return (
    <article>
      <PageTitle>Modal</PageTitle>

      <Sample>
        <Modal launcher={({ open }) => <Button onClick={open}>Open</Button>}>
          <div style="padding: 1em">This is sample text for Modal component.</div>
        </Modal>
      </Sample>

      <SectionTitle>Persistent</SectionTitle>
      <Sample>
        <Modal persistent launcher={({ open }) => <Button onClick={open}>Open</Button>}>
          {({ close }) => <Button onClick={close}>Close</Button>}
        </Modal>
      </Sample>

      <SectionTitle>Bind to signal</SectionTitle>
      <Sample>
        <Button onClick={() => setOpened(true)}>Open</Button>
        opened() === {String(opened())}
        <Modal opened={opened()} onChangeOpened={setOpened}>
          <Button onClick={() => setOpened(false)}>Close</Button>
        </Modal>
      </Sample>

      <SectionTitle>Close button</SectionTitle>
      <Sample>
        <Modal showCloseButton launcher={({ open }) => <Button onClick={open}>Open</Button>}>
          <div style="padding: 1em">This is sample text for Modal component.</div>
        </Modal>
      </Sample>

      <SectionTitle>Title</SectionTitle>
      <Sample>
        <Modal title="Title" launcher={({ open }) => <Button onClick={open}>Open</Button>}>
          <div style="padding: 1em">
            This is sample text for Modal component.
            <Index each={new Array(30)}>{(item, index) => <p>{index}</p>}</Index>
          </div>
        </Modal>
      </Sample>
    </article>
  )
}
