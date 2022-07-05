import dayjs from 'dayjs'
import { createSignal, mergeProps, Signal } from 'solid-js'
import { Calendar } from './Calendar'
import './DatePicker.scss'
import { Arrow } from './utility/others'
import { joinClass, prepareProps, SkelProps, toGetters } from './utility/props'

export type DatePickerProps = SkelProps<{
  defaultMonth?: Date
  monthSignal?: Signal<Date>
  dateSignal?: Signal<Date | undefined>
  onSelect?: Arrow<[Date], unknown>
}>

export function DatePicker(rawProps: DatePickerProps) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      defaultMonth: rawProps.monthSignal?.[0]?.() ?? new Date(),
    },
    ['monthSignal', 'onSelect']
  )
  const attrs = mergeProps(
    restProps,
    toGetters({
      class: () => joinClass(rawProps.class, 'skel-DatePicker_root'),
    })
  )

  const [selectedMonth, setSelectedMonth] = props.monthSignal ?? createSignal(props.defaultMonth)
  const [selectedDate, setSelectedDate] = props.dateSignal ?? createSignal(undefined)

  function onClickDate(date: Date) {
    setSelectedDate(date)
    props.onSelect?.(date)
  }

  return (
    <Calendar monthSignal={[selectedMonth, setSelectedMonth]} {...attrs}>
      {({ date }) => (
        <div
          class="skel-DatePicker_date-cell"
          classList={{
            'skel-DatePicker_selected': dayjs(date).isSame(selectedDate(), 'date'),
          }}
          onClick={() => onClickDate(date)}
        >
          {date.getDate()}
        </div>
      )}
    </Calendar>
  )
}
