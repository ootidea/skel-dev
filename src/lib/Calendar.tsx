import dayjs from 'dayjs'
import { createSignal, For, mergeProps, Show } from 'solid-js'
import './Calendar.scss'
import { IconButton } from './IconButton'
import { Slot } from './Slot'
import { until } from './utility/others'
import { joinClass, prepareProps, SkelProps, SkelSlot, toGetters } from './utility/props'

export type CalendarProps = SkelProps<{ defaultMonth?: Date; children?: SkelSlot<{ date: Date }> }>

export function Calendar(rawProps: CalendarProps) {
  const [props, restProps] = prepareProps(rawProps, {
    defaultMonth: new Date(),
  })
  const attrs = mergeProps(
    restProps,
    toGetters({
      class: () => joinClass(rawProps.class, 'skel-Calendar_root'),
    })
  )

  const [selectedMonth, setSelectedMonth] = createSignal(dayjs(props.defaultMonth))
  const firstDateOfSelectedMonth = () => selectedMonth().date(1)
  const firstDateOfSelectedCalendar = () => firstDateOfSelectedMonth().subtract(firstDateOfSelectedMonth().day(), 'day')

  // TODO: i18n
  const dayNames = ['日', '月', '火', '水', '木', '金', '土']

  return (
    <div {...attrs}>
      <div class="skel-Calendar_year-month-area">
        <IconButton
          src="src/chevron-left.svg"
          onClick={() => setSelectedMonth(selectedMonth().subtract(1, 'month'))}
          size="1.6em"
        />
        <div class="skel-Calendar_year-month">
          {/* TODO: i18n */}
          <span class="skel-Calendar_year">{selectedMonth().format('YYYY')}年</span>
          <span class="skel-Calendar_month">{selectedMonth().format('M')}月</span>
        </div>
        <IconButton
          src="src/chevron-right.svg"
          onClick={() => setSelectedMonth(selectedMonth().add(1, 'month'))}
          size="1.6em"
        />
      </div>

      <div class="skel-Calendar_grid">
        <div class="skel-Calendar_day-row">
          <For each={dayNames}>
            {(dayName, day) => (
              <div class="skel-Calendar_cell" data-day={day()}>
                {dayName}
              </div>
            )}
          </For>
        </div>

        <For each={until(6)}>
          {(weakIndex) => (
            <div class="skel-Calendar_date-row">
              <For each={dayNames}>
                {(_, day) => {
                  const date = () => firstDateOfSelectedCalendar().add(weakIndex, 'week').add(day(), 'day')
                  return (
                    <div
                      class="skel-Calendar_cell"
                      classList={{
                        'skel-Calendar_other-month':
                          date().isAfter(selectedMonth(), 'month') || date().isBefore(selectedMonth(), 'month'),
                      }}
                      data-day={day()}
                    >
                      <Show when={rawProps.children !== undefined} fallback={date().date()}>
                        <Slot content={rawProps.children} params={{ date: date().toDate() }} />
                      </Show>
                    </div>
                  )
                }}
              </For>
            </div>
          )}
        </For>
      </div>
    </div>
  )
}
