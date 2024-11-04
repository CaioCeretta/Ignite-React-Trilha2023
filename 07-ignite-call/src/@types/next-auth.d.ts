import NextAuth from "next-auth";

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    avatar_url: string;
  }

  /* When we declare interfaces inside the module, we are not overriding the original user and the Session interface, because
  by default, interfaces in ts, they always have an extension behavior, so if we declare two interfaces with the same name,
  the second one, won't override the first, but extend */
  interface Session {
    user: User
  }
}