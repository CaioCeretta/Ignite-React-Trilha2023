import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).end()
  }

  /*
    Even if we know the shape of the intervals, we usually don't want to import some typing from the front end to the backend,
    because they are two layers that shoudln't talk with each other in this dependency level, server side dependng on an
    information from the front end, like the client side of a form to know the type of information i'll receive.

    So here we'll also utilize a schema from zod. Now, if we use the zod object.parse, by validating it against the defined
    schema. If the data matches the schema, it returns the validated data.

    The parse method does not inherently know anything about the req.body except what we pass to it, it uses the schema
    we've defined to validate the incoming data. So, when we call parse(req.body) we are asserting that req.body should
    conform to the structure defined in timeIntervalBodySchema. IN summary, parse checks whether the incoming data matches
    the defined structure. It only knows about req.boedy because we're explicitly passing it for validation.

    In failure cases, where the request does not match the structure, the parse method will throw an error.

    If we don't want this parse error we could use the safeParse, the safeParse will try to parse, but if it won't throw
    an error
     
  */

  const { intervals } = timeIntervalsBodySchema.parse(req.body)

  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          time_start_in_minutes: interval.startTimeInMinutes,
          time_end_in_minutes: interval.endTimeInMinutes,
          user_id: session.user.id,
        },
      })
    }),
  )

  return res.status(201).end()
}
