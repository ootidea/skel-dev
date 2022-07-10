import { createSignal } from 'solid-js'
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
          <h1>Title</h1>
          <p>contents</p>
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
    </article>
  )
}
