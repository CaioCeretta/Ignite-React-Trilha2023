## Next Api Folder Explanation

inside the api folder, every single file is a route and its extension is ts, because on these routes we won't have a jsx
code, no react components.

the syntax is basically we export a default function, commonly named handler which receives req, res, just like an express
route, and returns a function, the boilerplate is more like

export default function handler(req: NextRequest, res: NextResponse) {
  return res.json({message: 'Ciao Mondo'})
}

now if we access localhost:3000/api/hello the page will have the same return as specified

All the code that runs inside that handler is a server side code, so in there we don't have to worry about sensitive data,
db access, secret keys or whatever we want.

So, continuing the code, we'll use these api routes to make operations that are based on user actions.
We already saw on our app that we can execute with GSSP or GSP, codes that will run on the server side from that node
layer, where we can make sensitive calls for API and much more, but everything inside those codes, will execute only
on the first page load, if we need to execute something from the server side that come from a user action, a button click
or stuff like that, we can't use those methods for it, and in those cases, we need to create these next api routes

  