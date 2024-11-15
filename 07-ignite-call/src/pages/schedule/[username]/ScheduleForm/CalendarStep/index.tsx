'use client'

import dayjs from 'dayjs'
import { useState } from 'react'
import Calendar from '../../../../../components/Calendar'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const isDateSelected = !!selectedDate

  /* dddd is the week day */
  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null

  /* On this described data, which is a function from dayjs, we will get the selectedDate, stored on the state, format it
  with the format function from dayjs and on this example we will do as follows
  'DD[ de ]   we are saying that we want the date of the month (DD), and what is behind brackects, will be scaped and the
  month in full is MMMM

  */
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  return (
    /* To determine whetever the calendar is expanded or not, we change using the child component, which calls the calendar
    and then, update its styling, not the parent one */
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            Terça Feira - <span>{describedDate}</span>
          </TimePickerHeader>
          <TimePickerList>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>09:00h</TimePickerItem>
            <TimePickerItem>10:00h</TimePickerItem>
            <TimePickerItem>11:00h</TimePickerItem>
            <TimePickerItem>12:00h</TimePickerItem>
            <TimePickerItem>13:00h</TimePickerItem>
            <TimePickerItem>14:00h</TimePickerItem>
            <TimePickerItem>15:00h</TimePickerItem>
            <TimePickerItem>16:00h</TimePickerItem>
            <TimePickerItem>17:00h</TimePickerItem>
            <TimePickerItem>18:00h</TimePickerItem>
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
