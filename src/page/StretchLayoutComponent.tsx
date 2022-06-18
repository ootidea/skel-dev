import { StretchLayout } from '../lib/StretchLayout'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

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

      <SectionTitle>Negative index</SectionTitle>
      <Sample>
        <StretchLayout stretchAt={-1}>
          <div style={{ padding: '3em', border: 'gray 1px solid' }}>area1</div>
          <div style={{ padding: '3em', border: 'gray 1px solid' }}>area2</div>
          <div style={{ padding: '3em', border: 'gray 1px dashed' }}>area3</div>
        </StretchLayout>
      </Sample>
    </article>
  )
}
