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



