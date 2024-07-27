// File: /pages/home.js

import { styled } from "@/styles";
import { HomeContainer, Product } from "@/styles/pages/home";
import KeenSlider from "keen-slider";
import "keen-slider/keen-slider.min.css";
import { useEffect, useRef } from "react";

const Button = styled('button', {
  backgroundColor: "$green-500",
  borderRadius: 4,
  border: 0,
  padding: '4px 8px',

  span: {
    fontWeight: 'bold'
  },

  '&:hover': {
    filter: 'brightness(0.8)'
  }
})


import { stripe } from "@/lib/stripe";
import { GetStaticProps } from "next";
import { Roboto } from "next/font/google";
import Image from "next/image";
import Stripe from "stripe";
import Link from "next/link";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

interface HomeProps {
  products: {
    id: string,
    name: string,
    imageUrl: string,
    url: string,
    price: number,
  }[]
}

export default function Home({ products }: HomeProps) {

  const sliderRef = useRef(null);

  useEffect(() => {

    if (sliderRef.current) {
      const slider = new KeenSlider(sliderRef.current, {
        slides: { perView: 3, spacing: 48 },
      });


      return () => {
        slider.destroy();
      };
    }


  }, []);

  return (
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => (
          <Link href={`/product/${product.id}`} key={product.id}>
          <Product
            className="keen-slider__slide"
          >
            <Image src={product.imageUrl} width={520} height={400} alt={product.name} />
            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
          </Link>
        ))}
      </HomeContainer>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   /* If we do something like this, our whole page would take 2 seconds to load, and just after this data loaded, only then,
//   the page was available, and that is one thing important to know */
//   // await new Promise(resolve => setTimeout(resolve, 2000))

//   // console.log('Runned')

//   const response = await stripe.products.list({
//     /*When it is a list it comes from the property data inside of it, and if it was only one product we could expand directly
//     the default price */
//     expand: ['data.default_price']
//   })

//   /* Now we need to transform this response.data so we get only the data we want from it */



//   const products = response.data.map((product) => {
//     /* By doing this, i'm forcing the default price to be understood as a number with that type*/
//     const price = product.default_price as Stripe.Price

//     /* the price.unit_amount returns us the price, and it will come in cents, that is one good tip to always save prices
//     as cents, because then we won't have problems with commas, float problems and that kind of thing, we just multiply
//     it by 100, and when we are working with that number, we just divide it by 100
//     */

//     return {
//       id: product.id,
//       name: product.name,
//       imageUrl: product.images[0],
//       url: product.url,
//       price: new Intl.NumberFormat('en-US', {
//         style: 'currency',
//         currency: 'USD'
//       }).format(price.unit_amount! / 100)
//     }
//   })


//   return {
//     props: {
//       products
//     }
//   }
// }

export const getStaticProps: GetStaticProps = async () => {

  /* The defaut price is used by stripe to "expand" certain attributes that, by default, are returned just as identifiers
  or partial objcets. by using expand, we are requesting stripe api to include the complete details of the related resources
  dyring the request.
  
  In our case, we are expanding the default_price of each product. Without expanding it, stripe would return only the price
  id related to each product. WIth expand, stripe includes the complete price object inside the product, providing us details
  such as the unit_amount, currency, etc. 
  */
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
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}