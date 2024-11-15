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
    return res.json({ availability: [] })
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
    return res.json({ availability: [] })
  }

  const { time_start_in_minutes, time_end_in_minutes } = userAvailability

  const startHour = time_start_in_minutes / 60
  const endHour = time_end_in_minutes / 60

  /* Now we will create an array with all the available dates in this interval, such as [10, 11, 12, 13...] */

  const possibleTimes = Array.from({ length: endHour - startHour }).map(
    (_, i) => {
      return startHour + i
    },
  )

  /* Now we need to start checking if any time on our db is already occupied */
}
