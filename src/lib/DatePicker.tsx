import dayjs from 'dayjs'
import { createSignal, mergeProps } from 'solid-js'
import { Calendar } from './Calendar'
import './DatePicker.scss'
import { Arrow } from './utility/others'
import { joinClass, prepareProps, SkelProps, toGetters } from './utility/props'

export type DatePickerProps = SkelProps<{
  month?: Date
  selectedDate?: Date | undefined
  onChangeMonth?: (month: Date) => unknown
  onChangeSelectedDate?: Arrow<[Date], unknown>
}>

export function DatePicker(rawProps: DatePickerProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      month: new Date(),
      selectedDate: undefined as Date | undefined,
    },
    ['onChangeSelectedDate', 'onChangeMonth']
  )
  const attrs = mergeProps(
    restProps,
    toGetters({
      class: () => joinClass(rawProps.class, 'skel-DatePicker_root'),
    })
  )

  const [selectedDate, setSelectedDate] = createSignal<Date | undefined>(props.selectedDate)
  function changeSelectedDate(date: Date) {
    setSelectedDate(date)
    props.onChangeSelectedDate?.(date)
  }

  return (
    <Calendar month={props.month} onChangeMonth={props.onChangeMonth} {...attrs}>
      {({ date }) => (
        <div
          class="skel-DatePicker_date-cell"
          classList={{
            'skel-DatePicker_selected': selectedDate() !== undefined && dayjs(date).isSame(selectedDate(), 'date'),
          }}
          onClick={() => changeSelectedDate(date)}
        >
          {date.getDate()}
        </div>
      )}
    </Calendar>
  )
}
