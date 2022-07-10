import { createSignal } from 'solid-js'
import { Button } from '../lib/Button'
import { Calendar } from '../lib/Calendar'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function CalendarComponent() {
  const [date, setDate] = createSignal(new Date(), { equals: false })

  return (
    <article>
      <PageTitle>Calendar</PageTitle>

      <Sample>
        <Calendar />
      </Sample>

      <SectionTitle>Specify default month</SectionTitle>
      <Sample>
        <Calendar month={new Date(1999, 0)} />
      </Sample>

      <SectionTitle>Bind to signal</SectionTitle>
      <Sample>
        <Calendar month={date()} onChangeMonth={setDate} />
        <Button onClick={() => setDate(new Date(2 * date().getTime()))}>Change month</Button>
      </Sample>

      <SectionTitle>Overwrite cell</SectionTitle>
      <Sample>
        <Calendar>{({ date }) => String(date.getDate()).padStart(2, '0')}</Calendar>
      </Sample>
    </article>
  )
}
