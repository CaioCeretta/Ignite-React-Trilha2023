import type { Adapter } from "next-auth/adapters"
import { prisma } from "../prisma"
import type { NextApiRequest, NextApiResponse } from "next"
import { destroyCookie, parseCookies } from "nookies"

export function PrismaAdapter(req: NextApiRequest, res: NextApiResponse): Adapter {
  return {
    async createUser(user: any) {
      /* For creating a user and appending the value that was already informed with the google info, we will, first get
      the value saved on our cookies, and inside the id, fill the information that come from this object user, which are
      the values passed in the signIn() from next-auth.
      The problem is that prisma adapter does not have access to the browser cookies, the only place where we will have 
      access to the them, on the server side, is through the req and res parameter
      inside req we have the cookies and from res we can modify the cookies

      Now after the modifications inside the nextauth file, we are able to access the cookies
      */

      const { '@ignitecall:userId': userIdOnCookies  } = parseCookies({req})

      if(!userIdOnCookies) {
        throw new Error('User ID not found on cookies')
      }

      const prismaUser = await prisma.user.update({
        where: {
          id: userIdOnCookies
        },
        data: {
          fullname: user.fullname,
          email: user.email,
          avatar_url: user.avatar_url
        }
      })
      
      destroyCookie({ res }, '@ignitecall:userId', {
        path: '/'
      })

      return {
        id: prismaUser.id,
        fullname: prismaUser.fullname,
        username: prismaUser.username,
        email: prismaUser.email!,
        avatar_url: prismaUser.avatar_url!,
        emailVerified: null,
      }      

    },
    async getUser(id) {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id
        }
      })

      return {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email!,
        avatar_url: user.avatar_url!,
        emailVerified: null,


      }
    },
    async getUserByEmail(email) {

      const user = await prisma.user.findUniqueOrThrow({
        where: {
          email
        }
      })

      return {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email!,
        avatar_url: user.avatar_url!,
        emailVerified: null,


      }

    },
    async getUserByAccount({ providerAccountId, provider }) {
      const { user } = await prisma.account.findUniqueOrThrow({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId
          }
        },
        include: {
          user: true
        }


      })

      return {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email!,
        avatar_url: user.avatar_url!,
        emailVerified: null,


      }
    },
    async updateUser(user) {
      const prismaUser = await prisma.user.update({
        where: {
          id: user.id!
        },
        data: {
          fullname: user.fullname,
          email: user.email,
          avatar_url: user.avatar_url
        }
      })

      return {
        id: prismaUser.id,
        fullname: prismaUser.fullname,
        username: prismaUser.username,
        email: prismaUser.email!,
        emailVerified: null,
        avatar_url: prismaUser.avatar_url!,


      }
    },
    async linkAccount(account: any) {
      /* This method is returned when a user logs in with a provider, for example, he already has an account with google
      and now he is loggin in with a new one, such as github.*/

      await prisma.account.create({
        data: {
          user_id: account.user_id,
          provider_type: account.provider_type,
          provider: account.provider,
          provider_account_id: account.provider_account_id,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          access_token_expires: account.access_token_expires,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state
        }
      })

      return
    },
    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          user_id: userId,
          expires,
          session_token: sessionToken,
        },
      })

      return {
        userId,
        sessionToken,
        expires
      }
    },


    async getSessionAndUser(sessionToken) {
      const prismaSession = await prisma.session.findUniqueOrThrow({
        where: {
          session_token: sessionToken
        },
        include: {
          user: true
        }
      })

      if(!prismaSession) {
        return null
      }

      const {user, ...session} = prismaSession

      return {
        session: {
          userId: session.user_id,
          expires: session.expires,
          sessionToken: session.session_token
        },
        user: {
          id: user.id,
          fullname: user.fullname,
          username: user.username,
          email: user.email!,
          emailVerified: null,
          avatar_url: user.avatar_url!,
        }
      }
    },

    async updateSession({ sessionToken, userId, expires }) {
      const prismaSession = await prisma.session.update({
        where: {
          session_token: sessionToken
        },
        data: {
          expires,
          user_id: userId
        }
      })

      return {
        sessionToken,
        userId: prismaSession.user_id,
        expires: prismaSession.expires
      }
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          session_token: sessionToken
        }
      })
    }
  }
}