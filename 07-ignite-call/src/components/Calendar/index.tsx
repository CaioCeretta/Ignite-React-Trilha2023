'use client'

import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useMemo, useState } from 'react'
import { api } from '../../lib/axios'
import { getWeekDays } from '../../utils/get-week-days'
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './style'

interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

interface BlockedDates {
  blockedWeekDays: number[]
}

interface CalendarProps {
  selectedDate?: Date | null
  onDateSelected: (date: Date) => void
}

type CalendarWeeks = CalendarWeek[]

export default function Calendar({
  selectedDate,
  onDateSelected,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    /* Here we are simply creating a new dayjs, which is an object of Date, but setting the day as day one */
    return dayjs().set('date', 1)
  })

  const router = useRouter()

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, 'month')

    setCurrentDate(previousMonthDate)
  }

  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, 'month')

    setCurrentDate(nextMonthDate)
  }

  const shortWeekDays = getWeekDays({ short: true })

  const currentMonth = currentDate.format('MMMM') // Month in full
  const currentYear = currentDate.format('YYYY')
  const username = String(router.query.username)

  const { data: blockedDates, isLoading } = useQuery<BlockedDates>(
    ['blocked-dates', currentDate.get('year'), currentDate.get('months')],
    async () => {
      const response = await api.get(`/users/${username}/blocked-dates`, {
        params: {
          year: currentDate.get('year'),
          month: currentDate.get('months'),
        },
      })

      return response.data
    },
  )

  /* because each month has different week days in different days, we are going to utilize useMemo, to memoize the result
  of this calculation, and only execute again if the month change, not everytime the component renders */
  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, index) => {
      return currentDate.set('date', index + 1)
    })

    const firstWeekDay = currentDate.get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, 'day')
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date,
          disabled:
            date.endOf('day').isBefore(new Date()) ||
            blockedDates?.blockedWeekDays.includes(date.get('day')),
        }
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
    ]

    /* BY doing it like this, with the generic being the type we created, the reduce weeks will know that the return is
    an array of that type

    Reduce Explanation:

      The first reduce argument is the final array we are going to create, usually named accumulator or acc
      The second argument in this case is each one of these dates, we are going to simply set as _
      The third argument is the index of the iteration
      The fourth argument is the original array without modifications
      
      if we hover over weeks we will see that will be of type CalendarWeeks, each iteration of the reduce will modify this
      array and in the end reduce it to a single variable that is our calendarWeeks, so the only information that will be
      modified on each iteration, is the weeks

      The second argument that is the underline, because we won't use it, is each of the days we have in calendarDays, but
      an underline was used in the place of the argument, because no information we have inside that object is important
      for us, because we want to separate the itens and days we have in our calendarDays, so the index is more important
      than the content of the day, we will group by 7 will finish a week and we can continue.

      The original is the original array, we could simply use the calendarDays, but one interesting thing about this parameter
      is that we can handle this variable, in the way we want and it will never change the value of the outer variable, so
      we can separate to another function that do not have the context of the calendarArrays. 
    
    
    */
    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        /* To find if the week has ended, we will check if our index is not divisible by seven, it means that we still haven't
      got to the moment that we "break" the week */
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          weeks.push({
            /* Because the module returns us 0, this will give us the number of the week of the week */
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate, blockedDates])

  /* Explanation of this code on:

  https://chatgpt.com/share/67355507-3804-8008-8e72-481b74467811 */

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth}
          <span>{currentYear}</span>
        </CalendarTitle>
        <CalendarActions>
          <button onClick={handlePreviousMonth} title="Previous Month">
            <CaretLeft />
          </button>
          <button onClick={handleNextMonth} title="Next Month">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr key={week}>
                {days.map(({ date, disabled }) => {
                  return (
                    <td key={date.toString()}>
                      <CalendarDay
                        /*
                          Here we are using the native date from javascript, here we are not using the dayjs library,
                          even though the date is from type of dayjs day, we don't need to strictly use it on the whole
                          code. So when an external component communicates with this component, is interesting that it is
                          able to communicate with native dates from js
                        */
                        onClick={() => onDateSelected(date.toDate())}
                        disabled={disabled}
                      >
                        {date.get('date')}
                      </CalendarDay>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
