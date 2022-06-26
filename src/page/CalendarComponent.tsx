import { Calendar } from '../lib/Calendar'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function CalendarComponent() {
  return (
    <article>
      <PageTitle>Calendar</PageTitle>

      <Sample>
        <Calendar />
      </Sample>

      <SectionTitle>Specify month</SectionTitle>
      <Sample>
        <Calendar defaultMonth={new Date(1999, 0)} />
      </Sample>
    </article>
  )
}
