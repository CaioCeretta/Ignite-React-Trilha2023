/*
  Dynamic folder recall

  if we have something like, in this case, an api folder and an auth folder, and a [...nextauth.ts] file

  let's say we have this url, http://localhost:3000/api/auth and when we use the brackets outside of the nextauth, we are
  saying that this is a parameterized route, it means that we can put anything after the auth, such as, banana and this
  file will be targeted with banana being a parameter in that file.

  And when we say [...nextauth] we are basically saying that we can multiple params being passed, and by many parameters
  i'm saying how many parameters we want separated by slash, so http://localhost:3000/api/auth/banana/apple/grape, so it
  doesn't matter how many parameters we pass, it will always redirect us to this file.
*/

import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import { PrismaAdapter } from '../../../lib/auth/prisma-adapter'
import type { NextApiRequest, NextApiResponse, NextPageContext } from 'next'

export function buildNextAuthOptions(
  req: NextApiRequest | NextPageContext['req'],
  res: NextApiResponse | NextPageContext['res'],
): NextAuthOptions {
  return {
    adapter: PrismaAdapter(req, res),

    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        authorization: {
          params: {
            promp: 'consent',
            access_type: 'offline',
            response_type: 'code',
            scope:
              'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar',
          },
        },
        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            name: profile.name,
            username: '',
            email: profile.email,
            avatar_url: profile.picture,
          }
        },
      }),
    ],

    /* Callbacks are many functions that are going to be called in the authentication process, the most common cbs are signIn, redirect, session, jwt */
    callbacks: {
      async signIn({ account }) {
        if (
          !account?.scope?.includes('https://www.googleapis.com/auth/calendar')
        ) {
          return '/register/connect-calendar?error=permissions'
        }

        return true
      },

      /* Here we are adding an information to the return of the next auth session, but internally, next auth doesn't  read
      our code to know that we added a new information to the session, so inside the library, on its typings, the session
      continues not having the user, at least, not with the amount of properties we use, so we'll need to change the
      next.auth.d.ts file */
      async session({ session, user }) {
        return {
          ...session,
          user,
        }
      },
    },
  }
}

/* Advanced Initialization */
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  /* Now, here, we are going to need to pass the cookies all the way down to the prisma adapter. So first of all, instead
  of the authOptions being an object, we'll transform it into a function, and inside the function, return the same object
  we were passing as authOptions, then, on these arguments, pass that buildNextAuth function we've just created with the
  req and res as arguments.

  Now we'll make our prisma adapter to also receive this req and res on its creation.

  Now the last step is to, on the adapter call, inside the adapter call, pass the req and res to it
  
  */

  return NextAuth(req, res, buildNextAuthOptions(req, res))
}
