import { globalCss } from ".";

/* 
  Here we use the globalCss function, which comes from our index.ts stitches initialization.

  Here we will create a constant globalStyles which invokes that function, and passes global styling to our code.

  Now, because we are going to load this style, only once in our app, it isn't recommended for us to place any css inside
  the _document, so we'll place in the _app.tsx, which acts like a container for the pages in our app. It's like a component
  that is loaded with every page in our app.

  So every page is that <Component {...pageProps} /> we have inside the file
*/

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0, 
  },

  body: {
    backgroundColor: "$gray-900",
    color: "$gray-100",
    '-webkit-font-smoothing': 'antialiased'    
  },

  'body, input, textarea, button': {
    fontFamily: 'Roboto',
    fontWeight: 400,
  }
})