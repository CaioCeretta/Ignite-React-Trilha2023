import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import router, { useRouter } from "next/router"
import { stripe } from '@/lib/stripe'
import Stripe from "stripe"
import Image from "next/image"


export default function Product({ product }: ProductProps) {

  const { query } = useRouter();


  /*
    The request for obtaining product data can be made by getting the id from the url param and using `useEffect`
    to populate the product. However, we previously learned that if we do it this way, the data will not be loaded when
    an indexer, a bot, or any non-js environment, accesses this page.

    Therefore, the best approach is to use a server-side function to load this product data. We can
    utilize SSR and SSG for this purpose. The answer to whether we can cache the loaded data and prevent it from being 
    frequently reloaded is YES, because product information does not change often.
    
    Another question is whether the data loading depends on any context-specific information, such as cookies,
    logged-in user information or any real time data. The answer to data question is NO, because our product page does
    not depend on such contextual data. Therefore, there is no issue with caching this page for a while. Using SSR is the
    best approach in this scenario
  */

  return (
    <ProductContainer>
      <ImageContainer>

      </ImageContainer>

      <ProductDetails>
        <h1>Shirt X</h1>
        <span>$ 79,90</span>

        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque consectetur tempore iure culpa iste sit
          fugit recusandae qui rerum in, similique ipsa. Mollitia sed provident assumenda esse dolore vitae iure.</p>

        <button>
          Buy Now!
        </button>
      </ProductDetails>
    </ProductContainer>
  )



}


/* From the params we are able to get the variable we sent in the url.

Stripe products retrieve expects its parameteter to be a string, but the productId says this is either a string or a string[].
We are able to receive two parameters with the same name on the url, and they're going to be stored into an array, but
in our case we know that there'll be only one.

The best way to deal with it is by passing a generic to it, and say what is going to receive,

the first generic parameter is what types we are going to return from the props, in our case we won't specify it 
the second one is the format of that params object, if we pass an object with {id: string } it will already now that the id 
is a single string.

If we were to simply run it like this it would return us an error saying that getStaticPaths is required for SSG pages and
is missing.
Because if in the moment of the build, i'm trying to run the static version of all the pages in our app that contains a
getStaticProps. In our home, it would work just fine, because it don't have any parameter, it just have to run this method,
without passing any information and this code will work, but in the product page we have a parameter coming. And when i'm
executing the build, it doesn't know where this id is coming from.
When it tries to build the static page, it's impossible for it to know the id. and it needs a getStaticPaths
*/

/* Get Static Paths */

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_QWy75S7LF26bTv' } }
    ],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
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




/* If we were to change the getStaticProps to a getServerSideProps method, like this, we would not need the getStaticPaths
because our page wasn't generated statically, if 1 million people access this page during a 1 min interval, it would 1 million
times execute this same code because this data would hardly change and that's why we are using static generation. and this
method will run everytime a user refreshes this. every time someone enters this page this method would run, while the getStaticProps
run again based on the revalidate, and it also runs during build */


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