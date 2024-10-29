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

 