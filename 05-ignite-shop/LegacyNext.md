In next we have something called File-system routing, which is as te name says, routing based on files. So if we want to
create a page named domain.com/product we only have to add product into the folder pages named product, and exported the
function as default, in the latest next with the app router, every page inside the app folder is going to be a component

Even though that we have that simple way of defining routes, some routes may receive parameters, for example on the
product route, where we need to get an id or something of that specific product, and if we just pass domain:port/product/1
it will not know that one is a parameter, but it will look for a folder component named 1 inside of it.

If i have a product folder and inside of it, just a test.tsx file, i'm going to reach that page by typing /product/test on the url

if i simply change the name of the file of index to [id].tsx, being id the name of the parameter we want to receive, it is
going to check, ok, there is a file inside the product folder, and by having the brackers around it, it must be any string.
after /product, so we can utilize anything after the / that it should work, is like a wildcard route. then we can retrieve
the value of that parameter simply by adding  const router = useRouter() and using router.paramName. The value will be available
on that case inside router.query, being possible to destructure it with const { id} = router.query

To ensure that our styles are going to be rendered even when the javascript is turned off, we need to, on the head tag of
our document, to add a style tag with the id stitches and a dangerouslySetInnerHtml={{__html: getCssText()}}, the getCssText
from the backend side, when the user loads our page, on the next server it'll mount the page inside the next js (node server)
check what are the necessary css for that page and return in this function, and it will return that css on a style tag, by doing that
we will see that on the head of the pages, in a style tag with the id stitches with all the styles we utilized