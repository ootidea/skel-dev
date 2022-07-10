import { Resizable } from '../lib/Resizable'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function ResizableComponent() {
  return (
    <article>
      <PageTitle>Resizable</PageTitle>

      <Sample>
        <Resizable>
          <div style={{ border: 'gray 1px dashed', padding: '1em' }}>area area area area area area</div>
        </Resizable>
      </Sample>
    </article>
  )
}
