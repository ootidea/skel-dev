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
        <DatePicker defaultMonth={new Date(1999, 0)} />
      </Sample>

      <SectionTitle>Month signal</SectionTitle>
      <Sample>
        <DatePicker monthSignal={[date, setDate]} />
        <Button onClick={() => setDate(new Date(2 * date().getTime()))}>Change month</Button>
      </Sample>
    </article>
  )
}
