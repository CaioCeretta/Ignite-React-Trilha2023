'use client'

import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Calendar from '../../../../../components/Calendar'
import { api } from '../../../../../lib/axios'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const router = useRouter()

  const username = String(router.query.username)

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

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null
  /* The first array value is the key of the useQuery, that is way for us to identify this query, and is important that
  in this key we have all the possible params of this query because it will be cached and isn't good if we give the same
  name if it's going to be dinamic with a parameter
  
  The second parameter is the function which will be executed, the fetch that we'll run

  and the third parameter is an option called enabled, which means we only want this function to execute if there is a 
  selectedDate
  */
  const { data: availability, isLoading } = useQuery<Availability>(
    ['availability', selectedDateWithoutTime],
    async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })

      return response.data
    },
    {
      enabled: !!selectedDate,
    },
  )

  // useEffect(() => {
  //   if (!selectedDate) {
  //     return
  //   }

  // }, [selectedDate, username])

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
            {availability?.possibleTimes?.map((hour) => (
              <TimePickerItem
                key="hour"
                disabled={!availability.availableTimes.includes(hour)}
              >
                {String(hour).padStart(2, '0')}:00h
              </TimePickerItem>
            ))}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
