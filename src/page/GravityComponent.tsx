import { Gravity } from '../lib/Gravity'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function GravityComponent() {
  return (
    <article>
      <PageTitle>Gravity</PageTitle>
      <Sample>
        <div style={{ width: '100%', height: '123px' }}>
          <Gravity>center</Gravity>
        </div>
      </Sample>
    </article>
  )
}
