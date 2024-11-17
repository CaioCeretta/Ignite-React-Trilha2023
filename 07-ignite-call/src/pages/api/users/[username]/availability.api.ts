import dayjs from 'dayjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  /* We get the value directly from query, instead of the params object, because query returns both the data sent via
  route params, as well the data sent in query params 
  
  we'll get the values like this because the route will be something like
  http://localhost:3000/api/users/caioceretta/availability?date=2024-12-01
  */
  const username = String(req.query.username)
  const { date } = req.query

  /* And by receiving those parameters we will return all the available dates for the person to make an appointment */

  if (!date) {
    return res.status(400).json({ message: 'Date not provided.' })
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(400).json({ message: 'No user was found' })
  }

  /* Here we are transforming the date we receive from the query, because whenever we receive something from the query param
  we can also receive an array of string, because the get params, the ones sent on the query, can be sent multiple times
  for example ?date=1&date=2 */
  const referenceDate = dayjs(String(date))
  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  if (isPastDate) {
    return res.json({ possibleTimes: [], availableTimes: [] })
  }

  /*  Now we need to make a "cross" of data, between the time intervals the user chose and have availability, with the
  schedulings, so we have to pass through each time interval and validate if there are enough scheduling to cover all
  the intervals the user have, if not, what are the times we don't have an active scheduling */

  /* Here we are looking on the database, if the time interval the user specified to be available where the day of the week
  matches the date b eing looked for  */
  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  })

  if (!userAvailability) {
    return res.json({ possibleTimes: [], availableTimes: [] })
  }

  const { time_start_in_minutes, time_end_in_minutes } = userAvailability

  /* This time divided by 60 only works because we are working with hours, if we had a "broken" time, such as 9:15, this
  wouldn't work */
  const startHour = time_start_in_minutes / 60
  const endHour = time_end_in_minutes / 60

  /* Now we will create an array with all the available dates in this interval, such as [10, 11, 12, 13...] */

  const possibleTimes = Array.from({ length: endHour - startHour }).map(
    (_, i) => {
      return startHour + i
    },
  )

  /* Just as a reminder, the set method in day,js returns a new Day.js objectr with the specified part of the date modi
  fied. It does not mutate the original object because Day.js is immutable
  
  So if we are doing something like

  const originalDate = dayjs('2024-11-15');
  const updatedDate = originalDate.set('hour', 10);

  console.log(originalDate.format()); // still the original date
  console.log(updatedDate.format()); // updated with the hour set to 10

  so to break down this code, when we do 

  referenceDate.set('hour', startHour).toDate();

  This creates a new Day.js object where the hour is set to startHour, and .toDate() converts that object to a native
  JavaScript Date.
  */

  const blockedTimes = await prisma.scheduling.findMany({
    select: {
      date: true,
    },
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate.set('hour', startHour).toDate(),
        lte: referenceDate.set('hour', endHour).toDate(),
      },
    },
  })

  /* And here we are iterating through the available times for the user and filtering, maintaning only the ones that do not
  exist in blockedTimes.some where the dates are equal to the time 
  
  So what here is going is basically that let's say we have this array in possible times [8, 9, 10], here the available times
  will pass through each one of these, and validating that there is no register on the scheduling table where these hours
  match with the appointment time
  */

  const availableTimes = possibleTimes.filter((time) => {
    return !blockedTimes.some(
      (blockedTime) => blockedTime.date.getHours() === time,
    )
  })

  /* Now we need to start checking if any time on our db is already occupied */
  return res.json({ possibleTimes, availableTimes })
}
