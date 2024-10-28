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

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope:
          'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar',        }
      },

    }),
  ],
  /*Callbacks are many functions that are going to be called in the authentication process, the most common cbs are signIn, redirect, session, jwt */ 
  callbacks: {
    async signIn({account }) {
      if(!account?.scope?.includes('https://www.googleapis.com/auth/calendar')) {
        console.log(account);
        return '/register/connect-calendar/?error=permissions'
      }

      return true;
    }
  }
};

export default NextAuth(authOptions);