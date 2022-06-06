import { StretchLayout } from '../lib/StretchLayout'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function StretchLayoutComponent() {
  return (
    <article>
      <PageTitle>StretchLayout</PageTitle>
      <Sample>
        <StretchLayout>
          <div style={{ padding: '3em', border: 'gray 1px dashed' }}>area1</div>
          <div style={{ padding: '3em', border: 'gray 1px solid' }}>area2</div>
        </StretchLayout>
      </Sample>
    </article>
  )
}
