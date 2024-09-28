Every code that runs inside the api witch on the pages folder, will run serverside, so we don't have to worry about sensitive
data, secret keys, etc

On our pages we notice that we can call methods like getStaticProps or getServerProps, which are methods that are going
to run on the server side, however, both of these functions only execute on the first load of the page, and if we need
to run something on the server-side, on a user interaction, or something, it won't be possible for us to execute those
methods.
In this case we are going to need to use this type of functions that on next environment we call api routes.