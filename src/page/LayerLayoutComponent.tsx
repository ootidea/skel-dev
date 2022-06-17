import { Gravity } from '../lib/Gravity'
import { IconButton } from '../lib/IconButton'
import { LayerLayout } from '../lib/LayerLayout'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function LayerLayoutComponent() {
  return (
    <article>
      <PageTitle>LayerLayout</PageTitle>

      <SectionTitle>Badge</SectionTitle>
      <Sample>
        <LayerLayout>
          <IconButton src="/src/chevron-left.svg" size="3em" />
          <Gravity to="top right">
            <Gravity
              style={{
                width: '1.4em',
                height: '1.4em',
                'border-radius': '50%',
                background: 'crimson',
                color: 'white',
                'font-size': '13px',
              }}
            >
              2
            </Gravity>
          </Gravity>
        </LayerLayout>
      </Sample>

      <SectionTitle>Control buttons</SectionTitle>
      <Sample>
        <LayerLayout>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Polar_Bear_ANWR_1.jpg/320px-Polar_Bear_ANWR_1.jpg"
            alt="polar bear"
          />
          <div
            style={{
              display: 'flex',
              'align-items': 'center',
              'justify-content': 'space-between',
              height: '100%',
              'pointer-events': 'auto',
            }}
          >
            <IconButton src="/src/chevron-left.svg" size="2.5em" />
            <IconButton src="/src/chevron-right.svg" size="2.5em" />
          </div>
        </LayerLayout>
      </Sample>
    </article>
  )
}
