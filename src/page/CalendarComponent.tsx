import { createSignal } from 'solid-js'
import { Button } from '../lib/Button'
import { Calendar } from '../lib/Calendar'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function CalendarComponent() {
  const [date, setDate] = createSignal(new Date())

  return (
    <article>
      <PageTitle>Calendar</PageTitle>

      <Sample>
        <Calendar />
      </Sample>

      <SectionTitle>Specify default month</SectionTitle>
      <Sample>
        <Calendar defaultMonth={new Date(1999, 0)} />
      </Sample>

      <SectionTitle>Month signal</SectionTitle>
      <Sample>
        <Calendar monthSignal={[date, setDate]} />
        <Button onClick={() => setDate(new Date(date().getTime() * 2))}>Change date</Button>
      </Sample>

      <SectionTitle>Overwrite cell</SectionTitle>
      <Sample>
        <Calendar>{({ date }) => String(date.getDate()).padStart(2, '0')}</Calendar>
      </Sample>
    </article>
  )
}
