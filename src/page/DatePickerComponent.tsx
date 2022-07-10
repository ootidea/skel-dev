import { createSignal } from 'solid-js'
import { Button } from '../lib/Button'
import { DatePicker } from '../lib/DatePicker'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'
import { SectionTitle } from '../SectionTitle'

export function DatePickerComponent() {
  const [date, setDate] = createSignal(new Date())

  return (
    <article>
      <PageTitle>DatePicker</PageTitle>

      <Sample>
        <DatePicker />
      </Sample>

      <SectionTitle>Specify default month</SectionTitle>
      <Sample>
        <DatePicker month={new Date(1999, 0)} />
      </Sample>

      <SectionTitle>Specify default selected date</SectionTitle>
      <Sample>
        <DatePicker selectedDate={new Date()} />
      </Sample>

      <SectionTitle>Bind to signal</SectionTitle>
      <Sample>
        <DatePicker month={date()} onChangeMonth={setDate} />
        <Button onClick={() => setDate(new Date(2 * date().getTime()))}>Change month</Button>
      </Sample>
    </article>
  )
}
