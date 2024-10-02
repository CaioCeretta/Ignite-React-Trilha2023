
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

If we refresh our page, we will see that every time the css is being applied to our project with zero problems, but if we
go into our inspect and disable the js, we are going to see that the whole css has not been fully applied, only the
traditonal HTML. 

This happens because the vast majority css libraries we use to work with, they are libraries that style our component at
run time, which means that the CSS is going to be applied only on the client browser.
Next work with the concept or SSR, so even if we disable JS, the content of our page is still going to be shown on the
screen.
Different from cases where we use react, and don't have next in its code, the UI code, if we disable the JS, won't even
show up, because the whole code is created in run time.

In Next, when the user accesses our page, in realitym he's accessing a node server, and that node server will create the UI
on the server side for us, and it returns the full HTML to the browser, that's why we can visualize the interface even with
browser's js disabled, because it's not the browser who's creating the interface, is the node server.

To ensure that our styles are going to be rendered even when the javascript is turned off, for the SSR, we need to, on
the head tag ofour document, to add a style tag with the id stitches and a dangerouslySetInnerHtml={{__html: getCssText()}},
the getCssText, which is returned by the stitches initialization function, will, from the backend side, load the page inside
inside the next js (node server), check what is the necessary css for that page and return in this function. It will return
that css on a style tag, by doing that we will see that on the head of the pages, in a style tag with the id stitches with all the styles we utilized

________________________________________________________________________________________________________________________

## Styling

When we were creating our styles with styled-components, we were used to create the styles file and the component file in
the same folder, but as we know, next works differently, if we do it like this, it will understand that the styles is another
file, because of the file routing, so it's common for us, on this cases, create a separate folder, inside our styles folder
, create a pages folder where we will add the specific styling for each page.

So for example, if we will create a specific header styling for our tag header, we will create a component for that Header
and put the desired css into it, then, we are going to use it on the app, similar to styled-components


________________________________________________________________________________________________________________________

## Image 

The way next treat images are similar from the traditional one, in the traditional one, we'll export image that has a specific
format, sizes, and so on. When we export them and bring them into our front-end to apply them on the web, we often need
those images to be loaded in a performatic manner, and for it to happen, there is a lot of places we need to be careful.

For example, if we are loading an image, and that image has a width of 1000px, but we only want to use 400px, why are we
loading an image so large? or why an image that does not have transparency, and i'm using a png in this case knowing that
jpg is smaller and fast to be loaded? This will make us be very careful when exporting those images.

But what next do for us, is that it automatically optimizes every image we use in our application, which means that, if we
import an image that's bigger than what we're using, next will create a version of that image, that will have only the
quantity of pixels we're using. Next can also convert the format of the image, create responsive images from where it is
being used.

To understand it better, the instructor is showing to us a whole figma page being exported, and importing it into the
project.
The image has 600kb and has the dimensions of 1640 * 900.

So at first, we'll utilize the html traditional img tagIf we place that file in our project and assign it to a variable.
By going to the developer tools > network tab, we'll see that the image has been imported with 610kb with the type of png.
But if we now, change the tag <img> to the <Image /> that comes from next/image library.

In the instructor code he used a feature that hasn't been applied yet, but we already have access to it, so for future
knowledge, if it happens when we're coding, we would have to update the next config

With next image, we will notice that if we go to the shame network tab on the developer tools, the image we previously
loaded with 23kb, instead of 610kb, and using a format named webp, which is a more recent format, much more performatic,
more than png or jpg. We will also notice that it diminished the image quality to 75%.

Now if we go to the <Image> tag and pass to it a fixed, even lower, we will see that the imported image is even smaller,
because next creates a version of the image based on the properties we expect from it. 

So if we say to next, to use this image on a container that has 400px width, next will be smart enough to convert this image
to a smaller size which is going to be utilized



#######################################################################################################################


## Server Side Code

### Get Server Side Props

Since we started learning about react, we've learnt that we can make API inside the component to populate a state, makea
a list, or whatever we want to do. 

So as axample we would create a useEffect, some kind of data fetching. We have a list state, that is an array of numbers,
then on the useEffect we have a setList with the array 1, 2, 3.
We can pretend that this is like an api call, it will fill the state with those informations.

The point here is, next has its purpose for why it existed, that is ssr and ssg.

When crawlers, bots, indexators, access our site, it will access it with disabled JS or he will not wait for it to under-
stand that the page content has already been loaded, and if we are developing a page, like for example, an e-commerce that
needs indexation, many times it will be a problem for us. 

Even that list state we populated from useEffect, we won't see it anymore because it only runs on the client side. So
everything we see on the screen is what was created from the NextJS node layer, and if we were on a traditional SPA, such
as a react app, it wouldn't even exist. 

This is one of the reasons why next was created, what next does is, when we access the page for the firt time, it will
create a version of the page, with the whole markup, css, etc. On that layer, BUT,everything that runs only on the client
side, like any hooks, or JS specific libraries, they won't execute.

But, there is still another way for us to tell next that we want this API call to be executed on
the server side, and not only on the front-end side.

In any file that is inside the pages folder, we can export a constant named getServerSideProps where we obtain properties
from the server side. In other words, the next js node layer. That function can return some properties, such as the list
we were using, that contains an array with 1, 2, 3, the basic syntax is 

export const getServerSideProps = () => {
  return {
    props: {
      list: [1, 2, 3]
    }
  }
}

that code is commonly used at the end of the file.

As the name says, we are returning props, and in react we know that properties can be received from the parameters, so as
soon as we write props on the arguments, the props in this case, is going to be an object containing the list property, so
a JSON.stringify of these props would return us {"list":[1,2,3]}

When we were using the useEffect, we could see that the page would be rendered by complete, except with our list information
that would come after one second (based on the setInterval).

But now, as we are getting the serverSideProps, even if we use a setTimeout on this functionm, we'll notice that the timeout
will happen, but in this case, our page as whole will take 2 seconds to show up, the nodejs will return us the complete page,
different from the useEffect that will show the page and then wait the timeout 

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
as the page loads, only crucial information of being on the screen, for indexers, robots, bots, crawlers or anything of
the type. We do not use it for everything

When we run the getServerSideProps instead of the useEffect, to load the products, we are running on a node back end.


# Stripe Call

So any code that run inside of it, won't be visible to the client user, so one use case of us using it is when we need to make
an api call that needs to be hidden from the client, and one of the cases we are going to run, is one of them.
Because we are going to load the products from stripe, and in stripe we have two types of api keys, the public one and the
secret one, the public, even though it is public and don't hold sensitive data, is a key that don't allow us to fetch data
from stripe. She's a key only used for checkout, and those cases, while the secret key allows us to list products, access
to all stripe functionalities.
This means that if we need to use the secret key, it's better for us to run the code on the server side.

when using getServerSidePops  another good thing to do is to type the function, such as

export const getServerSideProps: GetServerSideProps = async () => {}

Another tip is, because we don't want all of the data being returned by stripe, we can transform those datas, by transforming
we're talking about creating a new object with only the properties we want, like the below...

One thing we need to know about this function is that stripe doesn't return to us the price, he works with something called
"expanding responses", that is basically we "expand" a relationship inside a response, so if we list all the products,

we can see that the product has a default_price which is expandable, and it returns to us, the price is a relationship
with the product, so it will return to us the id of the price with the product, but we can expand this and it will return
us the whole price object, not just the id so in the list fetch we'll pass a configuration object with a option named
expand.


because when it is a list, it comes from an object data, if it was a unique data, we could access it with expand: 'default_price'

one thing we need to be careful is, we utilize it like this and pass as property the price: product.default_price, ts won't
know if we are talking about an id of the price, or the object returned by default price, so what we need to do is, where
we map over the products, create a constant casting it as a Price, which would be

const price = product.default_price as Stripe.Price

 

Because we are dealing with a list of products it will have to be deta.default_price

the final code will be as follows

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

    const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {

      props: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount
      }
    }
  })

  return {
    props: {
      products
    }
  }
}


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

The first time this function runs is when when we run the build of our application, when we put our app into production,
next will look into every page that need to be static,that has the getStaticProps, and generate a static version of them.

on build, we are going to see every page being builded, if it is static, if it uses ssg, if it use isr (uses revalidate
on getStaticProps), or f, which is dynamic, meaning that server is rendered on demand.

A SSG, in addition to receiving the props, we can also set a property named revalidate, which is how many seconds we want
this page to be recreated, so if, for example, we have a revalidate of five seconds, this page, will generate a static
version on build time, but now, every five seconds, a person accesses this page, next under the hood, will generate a new
version of this page for us.

So every user that accesses the page, will receive the same static version. 

One thing to be aware of, is that when we use GetStaticProps, different from GetServerSideProps, we don't get access to
the request context, neither req, nor res.
This means that when we use GetStaticProps, we can't, inside of the function, get access to information of the logged
user, cookies, or anything like this.
Because this function is executed in the build moment, and when we run the build, there is nothing happening.
So if in any moment, this API request, need any cookie, or information about the user, we are not going to create a static
version of it, because static pages, are pages that are going to be equal for any user that access it, so any dynamic content
won't work.


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

Another next feature which is interesting, but at the same time it can be dangerous, is the link prefetching which next
does automatically, if we, for a example, access the homepage, besides loading home, the app will also make a call for
each product item that is appearing on the screen, and if we hover over it, next will make another prefetch call, he already
has the response of the products.

Next has an "Intersection Observer", which is basically an API from the browser that allows us to observe when elements are
shown on the screen, and there is a probability of the user clicking on the link, next prefetches the page, for when the
user clicks, it has already been loaded, even if it's not a page with was set on the getStaticPaths.

This is good but it also can be problematic, but if we have many links on the screen, next will try to load each one of
them, even if the user don't click on a prefetched link.

So the solution for us to control it, is on the link, to utilize a property named prefetch, which by default is true, but
if we pass the value of the false, next will ignore it until it's clicked.

Now if we run build, go to the home page, no link is being loaded until is hovered over.

## 





