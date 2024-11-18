/*
  This function will be used for us to fetch the accessToken of the user, but there is a possibility that this token has
  already expired, that the expires_at date has already passed, then we will have to update the token using the refresh
  token and return the new valid one
*/

import dayjs from 'dayjs'
import { google } from 'googleapis'
import { prisma } from './prisma'

export async function getGoogleOAuthToken(userId: string) {
  const account = await prisma.account.findFirstOrThrow({
    where: {
      provider_id: 'google',
      user_id: userId,
    },
  })

  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  )

  console.log('OAuth Token:', await getGoogleOAuthToken(userId))

  auth.setCredentials({
    access_token: account.access_token,
    refresh_token: account.refresh_token,
    expiry_date: account.access_token_expires,
  })

  if (!account.access_token_expires) {
    return auth
  }

  const isTokenExpired = dayjs(account.access_token_expires * 1000).isBefore(
    new Date(),
  )

  if (isTokenExpired) {
    const { credentials } = await auth.refreshAccessToken()

    const {
      access_token,
      expiry_date,
      id_token,
      refresh_token,
      scope,
      token_type,
    } = credentials

    await prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        access_token,
        access_token_expires: expiry_date
          ? Math.floor(expiry_date / 1000)
          : null,
        refresh_token,
      },
    })

    auth.setCredentials({
      access_token,
      expiry_date: expiry_date ? Math.floor(expiry_date / 1000) : null,
      refresh_token,
    })
  }
}
