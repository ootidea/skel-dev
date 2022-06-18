import { Button } from '../lib/Button'
import { Modal } from '../lib/Modal'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function ModalComponent() {
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
    </article>
  )
}
