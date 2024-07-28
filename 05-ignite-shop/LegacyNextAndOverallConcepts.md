
## Routing
In next we have something called File-system routing, which is as te name says, routing based on files. So if we want to
create a page named domain.com/product we only have to add product into the folder pages named product, and exported the
function as default, in the latest next with the app router, every page inside the app folder is going to be a component

Even though that we have that simple way of defining routes, some routes may receive parameters, for example on the
product route, where we need to get an id or something of that specific product, and if we just pass domain:port/product/1
it will not know that one is a parameter, but it will look for a folder component named 1 inside of it.

If i have a product folder and inside of it, just a test.tsx file, i'm going to reach that page by typing /product/test on the url

## Styling (in this case, with stitches)

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

__________________________________________________________________________________________________________________________

## Image 
The way next treat images are similar from the legacy next to the latest one, it will, for example, get an image of 1000px
if we simply place in our code with a normal img tag, it will take, in this example, 619kb and will maintain the png type
even if we don't use the transparency of a png type

If we change our tag img, that we were using on this image, to a Image imported from next/image, we are going to be able
to see that the same image that was 637kb long, is now using only 23kb, and using the format webp, which is a more recent
format, being faster and more performatic. 

So next create a version of the image based on the properties we expect from that image, like the properties width, height

When we set a next image inside a component, we must inform the width and the height of it, but that width and height does 
not to be exact to what we want that image to have, because of different view ports and responsiveness, but we can say
that the width and height that we pass is the largest width and the biggest height we'll need of the image. because that way 
next image, whenever we import that image using it, it will shrink, and resize the image so we don't import sizes we don't
need

#######################################################################################################################

## Server Side Code

### Get Server Side Props

If we used, as the typical way of creating a component, like, using the  call on an api, fill the array with the api fetch
and this like that it won't work on how the crawlers are actually working in our app, if we disable javascript and try to
load the same page, what javascript is going to show from our page, is just an empty array which should be filled. So basically
what next is doing is when we load the page for the first time it will create a version of that page with the html, css
inside the next.js layer. But everything that we run on the client side like useEffects, libraries, and all of it, those things
are not going to run. 

But in next there is a way we can outcome it, a way we tell next that we want that api call to also run on the next server layer

This is how we do it, inside any file that is under page folder, is by utlizing, after the component (or before), a function
named getServerSideProps, that function can return us a list of properties, for example. in the products page, in something
like

const getServerSideProps = () => {
return {
  props: {
    list: ['product1', 'product2', 'product3']
  }
}
}

and in next js, they can be received as a parameter of the component, so we would be able to access those values just by

export default function ComponentName(props) {
   return (
    <>
    <pre>{JSON.stringify(props.list)}</>
    </>
   )
}

even with the javascript disabled.


There's one important thing to notice, is that we'll never have a loading state, because the page will only load after
the props were loaded. 

One other important thing is that, for example, in the page that load the products, before i was using the getServer function
we had a console log running inside the useEffect, and by using it, in any moment, we won't be able to see it, and if we utilize
a console log inside the return of that function, we'll see it on the next console and not on the browser.

It happens because that code is running on the server side layer of next.

But not all requests are going to be made on that function, because as we can see, that function made our whole page to 
take longer to build, and even though the data came populated right on the beginning, for the user that's using this app,
it can be a little annoying. So in most of the times, we are going to prefer doing these api calls, on the same way we always
did. We are only going to utilize it, when we need page information that we necessarily need them to be available as soon
as the page is available on screen, only crucial information of being on the screen, such as information for indexes,
robots, bots, crawlers or anything of the type. We do not use it for everything

When we run the getServerSideProps instead of the useEffect, to load the products, we are running on a node back end.

So any code that run inside of it, won't be visible to the client user, so one use case of us using it is when we need to make
an api call that needs to be hidden from the client, and one of the cases we are going to run, is one of them.
Because we are going to load the products from stripe, and in stripe we have two types of api keys, the public one and the
secret one, the public, even though it is public and don't hold sensitive data, is a key that don't allow us to fetch data
from stripe. She's a key only used for checkout, and those cases, while the secret key allows us to list products, access
to all stripe functionalities.
This means that the, if we need to use the secret key, it's better for us to run the code on the server side.


Now there's one thing we need to pay attention, if we refresh the page multiple times we are still going to get the same
results in a short period of time, the problem of simply doing that requests like we are doing today, is that, for example,
the products are not changing, and everytime the user access the page we do a stripe call, and it may lead to delay on the
loading, it will consume memory, overall turning the page slower.  because on each refresh it will need to be loaded everything
on the api request, and in next there is another functionality in next, which is the SSG (static site generation)


### SSG (Static Site Generation) : Static Props

When we have a page, that doesn't change frequently, like the products case, where we are able to have a cache of that page
to show to all the users the same version, we should use this concept. code example

```typescript
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(price.unit_amount! / 100)
    }
  })

  return {
    props: {
      products
    }
  }
}
```

Just by doing that, similar to the getServerSideProps, but the main difference of these two is that this one does not run
on every request made to the page, it will only run on the time where next is creating a static version, or a cached version
of the page.

The only this function runs is when next is creating the static page, when we run the build of our application, when we put our app
into production, next will look into every page that need to be static, and generate a static version of them.


### Get Static Paths

Get static paths is necessary for the SSG pages, different from the serverSideProps, it is needed on a static page that
receive parameters to it, like the id in a dynamic product page. It's a method that return those ids (in this example),
this method should return an array, which needs various objects inside it, and each object basically returns the product
parameters i want to generate the static version, like this

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_QWy75S7LF26bTv'} }
    ],
    fallback: false
  }
}

now by adding this static path, by building the project, and accessing the page of this product, it will run normally, but
for the specific route that was generated the path, for any product that do not have that id, next won't generate a static page.

However, for example, if we are in an e-commerce with thousands of products, we are not going to generate a static version
for each one of them by id,  because run build would take too long. So this static paths, even though we want to create
static versions in the moment of build, we can say to it something like, if there are other products that i didn't pass to
it, we want it to behave in a different manner.


##### SSG Fallback

When we send a fallback to the getStaticPaths, in the build, we are telling that those are the parameters that must be utilized
in the time of executing the getStaticProps, and there are cases that it won't be possible, for example, cases where there's
going to be new shirts every week. It won't make sense for us to generate new shirts at every momennt, or for example, generating
ten shirts and the new one that was inserted has to wait for the next deploy, it's a bit complex for us, tldr, isn't productive

Let's think in the case that we have 10k+ products and we don't have a route for each one.
Everything we pass on the paths is what is going to be generated a static page. So in this case we are going to create one for
each most sold product / more accessed, so when we run the deploy it'll be better for the users

and for the rest of the products, it's going to return a 404, and here's where the fallback function takes place.

if we pass the fallback: false, when we try to access any page that is not one of the static paths, it will throws a 404,
with the fallback:true what happens when we access a page where we did not pass into the paths, and next will try to get
that product id and execute.

If we simply say that the fallback is true, when we try to build or render any other page, it will retur, in our case, that
we cannot read properties of imageUrl, this happens, because we need to know that next will show the html of the page and
try to load the product data, under the hood, and when it finished loading the product data, it'll show it on the screen.
However, if we try to log the products, and we go on the terminal, we will see that the product is undefined, because next
will load our page without the product information and execute the getStaticProps asynchronously, so we need to create a
loading state for this page. Now for us to detec if a loading is happening we utilize the isFallback from the useRouter
function. For example

  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>Loading...</p>
  }

  now it will load the pages that aren't part from the ones specified on the staticPaths. Even though the fallback true does
  what we expect from it, and load the products which weren't specified on the paths, there's another option, which was 
  introduced in next versions and can also be valid for us, for when we don't create the loading state, which in many times
  isn't recommended, there is the fallback: blocking, that won't show anything on screen, until there is something to show,
  so we won't get the same error as we got from the imageUrl. However for the user it might be a worse experience. It usually
  prefers to watch a screen loading that not seeing anything.



## Project build

by building the project we will observe a few things.

filled circle = Prerendered as static content (uses 'getStaticProps')
empty circle = Prerendered as static html

in this case, the only filled circle, which represents the ssg, is on the home page, where we added the function.

it automatically generated an html page and json file. The json file contains the props we are returning, which are
generated by the getStaticProps. The other pages, represented by empty circles, are also prerendered by next.js,
but without any json or additional information. This is because they do not use `getStaticProps`. Next creates an optimized
version of these pages in the cache for those pages without the JSON or any API response

Now, on the production environment, if we visit the home page, it will load in about 20ms, because no API calls are being
made, the `getStaticProps`function is not executed again, unless we redeploy the site. However, if we include a `revalidate`
property in the `getStaticProps` function's return object, we can specify number of seconds after which the page should be
revalidated. For example, if we set revalidate to 10, the page will revalidate 10 seconds after it is accessed. During
this time, all users will receive the cached version of the page that was generated from a previous user's visit.

When we run the `npm build`command, we won't have access to anything like logged-in user information, request, cookies, etc., 
because this is just a build step. If at any point an API request requires a cookie or information about the logged-in user,
the page cannot be static, because static pages are the same for all users. Therefore, if our page contains dynamic information
that depends on the user ID or any other details about the logged-in user, it cannot be a static page.

## Links Prefetch

Another next feature which is interesting, but at the same time it can be dangerous, is the link prefetching which happens
automatically. This means that, for example, if we access and inspect the ntwork tab of the developer tools, we will see
that besides loading the home, it made three calls for loading each product with the id shown on page, and as we hover over
the products, we will see that next make another call to the same route which ends with json, making a prefetch of that page.

so for next,  everytime we have a link on the screen, like the product page one, when it finds that link and understands it
is on the screen, it makes a "intersection observer", which is a browser api that allows us to observe when elements show
on the screen, when next sees one link, it will do a prefetch of that page, so when the user clicks, it is already loaded.

While it can be goood for the user, that speed on loading, it can also be bad, because if we have many links on the screen,
under the hood next is making the requests, if we want to stop it, on the link we must say that the prefetch is false, so
if the link is on the page, it won't load automatically, but if we hover on it, yes





