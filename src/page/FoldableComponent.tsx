import { Foldable } from '../lib/Foldable'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function FoldableComponent() {
  return (
    <article>
      <PageTitle>Foldable</PageTitle>

      <Sample>
        <Foldable title="Title">content</Foldable>
      </Sample>

      <SectionTitle>Default unfolded</SectionTitle>
      <Sample>
        <Foldable title="Title" defaultUnfolded>
          content
        </Foldable>
      </Sample>

      <SectionTitle>Nested</SectionTitle>
      <Sample>
        <Foldable title="1" defaultUnfolded>
          <Foldable title="1.1">...</Foldable>
          <Foldable title="1.2">...</Foldable>
        </Foldable>
      </Sample>
    </article>
  )
}
