import { stripe } from '@/lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import Stripe from "stripe"

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
  }
}


export default function Product({ product }: ProductProps) {

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

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} alt={product.name} width={520} height={480}/>
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button>
          Buy Now!
        </button>
      </ProductDetails>
    </ProductContainer>
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
        description: product.description
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
    fallback: false
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
 * 
 * 
 */



