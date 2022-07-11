import chevronLeft from '/src/chevron-left.svg'
import chevronRight from '/src/chevron-right.svg'
import search from '/src/search.svg'
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
          <IconButton src={search} size="3em" />
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
            <IconButton src={chevronLeft} size="2em" iconColor="white" backgroundColor="hsl(0 0% 40% 0.5)" />
            <IconButton src={chevronRight} size="2em" iconColor="white" backgroundColor="hsl(0 0% 40% 0.5)" />
          </div>
        </LayerLayout>
      </Sample>
    </article>
  )
}
