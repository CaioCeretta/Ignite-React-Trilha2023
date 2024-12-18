## Authentication

Inside of next, we have both the front end and the back end code inside the same codebase, and it brings challenges aswell
as advantages, one of the big advantages and the reason we use a library, such as passport, iron-session, or other libraries,
they have this server side rendering functioning, so inside next is easy for us to access a sensitive data, such as the
authentication, directly from our front end, directly from react, so obtaining the logged in user, or the link for the user
to log in, etc. There are specific authentication libraries in next because this environment where front and backend run
very closely to each other exist. 

In our case, we are using next auth, it's a more interesting one because it automates pratically the whole authentication
process.

One of the benefits is that it integrates with almost all oUath Providers, such as github, google, facebook, and so on.

## Google OAuth

First off, we start by creating an application in the google cloud manager, once we've done that, we go inside the app
and create the client id, where we'll choose a name, the application address on the js authorized origins, and on the
callback we pass the app-address/api/auth/callback/provider-name, in this case, /callback/google, and if we are using some
api such as calendar, we need to activate it on the apis tab.

## Adapters

In our case, we first save on the db the username and the name, that we have on the first step on the register page, and
then afterwards, we would like to also save the information about the user that's returned by google, on the authentication,
so saving this new information about the user, such as the email, avatar, etc, on an existing user.
So we'll have to modify the behavior of the prisma adapter, so we'll create our own adapter from scratch.

So first of all, what is an adapter?

### What is an adapter?

The adapter works as a repository on the backend, he is an intermediary, a connection point between our app backend and
the db, the adapter provides us with several methods to handle data in the db, so our application can call these methods

And next auth requires that we implement all the methods specified in its docs, such as createUser, getUser, updateSession,
deleteSession, and many others, because each of these methods next auth uses to internally work with the db.

### End of brief explanation

 
 ## Next Auth Initialization

 We can initialize the next auth in two ways

 1. Simple Initialization: In the api/auth/[...nextauth].ts, where will create the authOptions object, where we'll pass
  all the informations we need, such as the provider, the adapter, the cb, and more, and then, on the end of the file, we
  export this object as default, e.g.

  export default NextAuth(authOptions);

2. Advanced Initialization -  Instead of exporting the next auth as default, we edxport as default an object that will
  have access to the request and response, e.g

  import type { NextApiRequest, NextApiResponse } from 'next'
  import NextAuth from 'next-auth'

  export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    //Do whatever we want here, before the request is passed down to `NextAuth`

    return await NextAuth(req, res, {

    })
  }

  ## Dealing with numbers on codes.

  Is always a good practice for us to store in our database, only decimal values, this way, we won't have commas between
  the numbers, so by multiplying them by 100, will always give us integer values

  But with dates, we should always try to save them the full date, even if we are dealing with specific times, because
  saving them as so, is way more easier to work with.

  If we won't use the full date, and our application is a bit simpler, and we need to save only the schedule, we should
  convert the time to minutes, by multiplying it by 60, minutes, if we won't deal with seconds on the stored time, is way
  easier to work with than to work with a string like '08:00', a string like this, is more difficult to compare if the
  time is before or after another, whereas if we are working with minutes, is way easier for us to compare something like
  18h being after 8h.

  So before we pass the value to the database, returned from the startTime and endTime, to our backend, we will convert
  it to minutes. The rest of code / explanation will be on the time-intervals.tsx file

  ## Calendar

  The reason why we are not doing it like on the register, is because on the register we had many components and each
  component was a step that updates the row in the form, but in this case the process is easier and faster, the person
  will choose a day and a time, and becauseof that, this decision was made by the instructor.

