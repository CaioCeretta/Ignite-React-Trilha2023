import { getCssText } from "@/styles";
import { Html, Head, Main, NextScript } from "next/document";

/* 
  In next, one important thing to understand is that everything is a component, even the page HTML as a whole.

  In case of next, our index.html, we are used to see on react, we don't have direct access to that file, for us to be able
  to change things in the global component of HTML, we need to create a file inside of pages folder, named _document.tsx,
  and inside that file we return the HTML, the global page structure.

  In this document file, we don't use traditional html tags, but tags returned by next/document

  here on the document is where we place the fonts we import from google fonts, such as roboto.
  Here the link tag cross origin, it won't accept us to write a property with no value and in the case of react, because
  crossorigin are two words, we will have to rewrite it to crossOrigin="anonymous"

  Inside the body tag, which is the only tag that doesn't come from next/document, we utilize next's Main and NextScript

  Main is just like <div id="root">...

  It's used to indicate next in what place of the html, the page contents should be placed.
  
  And the NextScript is basically in what we place we  want to load our js scripts. k

  And we need to remember, every code we put in here, is going to be loaded in all our pages

*/

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
        <style id="stitches" dangerouslySetInnerHTML={{__html: getCssText()}}/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
