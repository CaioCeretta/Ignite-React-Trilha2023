import { stripe } from '@/lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from "next"
import Head from 'next/head'
import Image from "next/image"
import { useRouter } from 'next/router'
import { useState } from 'react'
import Stripe from "stripe"

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  }
}


export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState<boolean>(false)

  async function handleBuyProduct() {
    /*First of all we will start with a try catch because it's recommended for dealing with external
    requests, mainly for actions that comes from an user, try catch is very useful for returning to the
    user if there was an error, or it succeedded*/
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId
      })

      const { checkoutUrl } = response.data;

      /* We use the window, just as we would on js, because we are dealing with an external redirection
      
        For internal pages we use the push from next useRouter
      */
      window.location.href = checkoutUrl

    } catch (err) {
      setIsCreatingCheckoutSession(false)


      alert('Failed redirecting to the checkout')
    }

  }


  /*
    The request for obtaining product data can be made by getting the id from the url param and using `useEffect` to popu-
    late the product and it would work, however, if we do the request for obtaining the product data inside the component,
    this data won't be loaded when an indexator, bot or something like it, come visualize this page. Meaning that if we
    disable the JS, we know that this product content, the request or any code we put inside of the component won't render
    because its client side.

    Thinking on this, the best way for us to load the product data is by some function that run the code on the server side,
    which could be SSR or SSG.
    
    But we need to think: 'Is this data atemporal? They are data that we can store on the cache for a while and they won't
    change all the time?'

    In this case, of the product, the answer is yes, the product data will rarely change.

    Other question is: "The data depend on the execution context of the page? Based on a cookie, logged in user or any other
    real time information?"

    In this case, the answer is also no, so the SSR is the best option for us

  */

  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} alt={product.name} width={520} height={480} />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
            Buy Now!
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )



}


/* From the params we are able to get the variable we sent in the url. based on the dynamic file or folder name, so the
page named [id] will have the param id

Stripe products retrieve expects its parameteter to be a string, but the productId says this is either a string or a string[].
We are able to receive two parameters with the same name on the url, and they're going to be stored into an array, but
in our case we know that there'll be only one.

The best way to deal with it is by passing a generic to it, and say what is going to receive,

the first generic parameter is what types we are going to return from the props, in our case we won't specify it 
the second one is the format of that params object, if we pass an object with {id: string } it will already now that the id 
is a single string.

*/

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  /* Here we can see that the productId is returning an error, this happens because the retrieve method expects the first
  parameter to be a string, but our params can either be a string or an array of string, because we can receive more than
  one parameter with the same name on the url, and then it would be saved in an array.
  
  There would be two options for us to deal with this.

  1. Force this and convert to a string like String(params.id);
  2. We can take advantage that the GetStaticProps receive some generics, that are parameters that type the function, and
  tell it that first generic we can receive inside of it is the return of the method and the second one, is what will be
  the shape of the params object, so if we pass an id as string, params becomes {id: string}
  */
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}

/* Get Static Paths

If we were to simply run it like this it would return us an error saying that getStaticPaths is required for dynamic SSG 
pages and it is missing for our pages.
Because it is saying that the page products/[id], in the [id] it means that we have a parameter, so the page will change
according to the parameter it receives, and for ssg pages that are dynamic, its required for us, to create a method returned
by them that is called getStaticPaths.

If we, for example, changed this GetStaticProps to GetServerSideProps, the error would suddenly stop happening.
This happens because now our page isn't being generated staticly, if 1 million users, access this page in one minute 
interval, it will one million times execute our whole getServerSideProps function, It is possible that it's not a problem
foru us but here in our case it cetainly is, because the product data will hardly change and that's why we are using
static generation. 

// export const getServerSideProps: GetServerSideProps<any, { id: string }> = async ({ params }) => {
//   const productId = params!.id;

//   const product = await stripe.products.retrieve(productId, {
//     expand: ['default_price']
//   })

//   const price = product.default_price as Stripe.Price

//   return {
//     props: {
//       product: {
//         id: product.id,
//         name: product.name,
//         imageUrl: product.images[0],
//         price: new Intl.NumberFormat('en-US', {
//           style: 'currency',
//           currency: 'USD'
//         }).format(price.unit_amount! / 100),
//         description: product.description
//       }
//     }
//   }
// }

Because we need to have one thing in mind that the getServerSideProps runs everytime the user refreshes the page, or some
body accesses this page, and the getStaticProps runs when the page builds or when the revalidate time passes.

And for the dynamic pages, such as the products/[id], we also need to return a getStaticPaths version.

*/

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_QWy75S7LF26bTv' } }
    ],
    fallback: true
  }
}

/**
 * This must return an array, that array needs to have various objects inside of it, and each one if this object, basically
 * returns the product parameters we want to generate this static version, with params: { key: value }
 * 
 * and we also need other property that is called fallback.
 * 
 * When fallback is true, the page is generated on the fly when a user requests a page that wasn't pre-builr, and in this
 * case, product may not be fully populated yet during the initial render, leading to undefined error. So when using this
 * optionm we need to account for the possibility that the product is undefined.
 * 
 * But as soon as we run the build, with that id, to the static paths, ONLY, this dynamic id will return something, otherwise
 * it will run the fallback. So the get static pathhs, we must choose which dynamic path we want to generate a static version
 * of it. So we can tell next that if the id we tried to reach, does not have a static version, we want it to behave in 
 * a specific way, this is where the fallback takes place.
 * 
 * So when generating a static path, we are telling next that when we run the build command, these are the specific params
 * it will utilize when executing the method getStaticProps, so it will run multiple times for each one of these items.
 * 
 * But there are some cases that are a bit complicated, like if we had thousands of products in our store, and besides it
 * we are going to have cases where we have incremental things, let's say we have a e-commerce where each week we add new
 * shirts, it does not make sense for us to keep adding the new paths for these shirts, or generate in a static way, 10
 * shirts and the new one we add will have the next deploy.
 * 
 * We need to understand that even though this method helps us in some ways, it also has to "understand" we might have
 * more products over time.
 * 
 * Let's use as an example this e-commerce with more than 10k products. First of all, everything we pass inside the paths
 * is what is going to be statically created in the build moment, so we need to make sure to keep it as lean as possible*  
 * So in this case we have two option
 * 
 * 1 - We will get the most sold products or more accessed, and pass to these paths only these products.
 * 2 - Fallback: When we pass the fallback as false, when we try to access any page that has not been specified on the paths
 *     it will return 404. 
 *     But if the fallback is true, what is going to happen is, when we access one of these pages that hasn't been specified
 *     to paths, next will TRY to get the id we are trying to access, try to execute the getStaticProps with it, to fetch data
 *     of this new product and then try to generate its static version.
 *     
 *     So next will load our html, without the product information, and run the getStaticProps asynchronously. and after it
 *     finishes fetching the product data, it will fill the html.
 * 
 *     For this to run without a problem, we would have to create a loading state, for this we have several options
 * 
 *     . We could create skeletons for the page while it is loading
 *     . Use the isFallback from the useRouter to add a Loading text when it is happening
 *      
 *     Now even though fallback true is doing what we would expect from it, that is loading the products which haven't been
 *     still loaded. There is another option, that can also be valid if we don't want to create this loading state, which
 *     in most of the times, is the recommended, which is the fallback blocking
 * 
 *      Fallback: blocking will "lock" the page, it won't show anything on screen until there is something to show. And despite
 *      this solves the problem of we don't having to check the fallback, for the end user, is commonly a worse option for the
 *      user.
 * 
 *
 *   
 *     
 * 
 * 
 * 
 * 
 * 
 */



