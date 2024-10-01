

import { HomeContainer, Product } from '@/styles/pages/home'

import Image from 'next/image'

import { stripe } from '@/lib/stripe'
import { useKeenSlider } from 'keen-slider/react'
import { GetStaticProps } from 'next'
import Stripe from 'stripe'
import Link from 'next/link'

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[]
}


/*
  The styling comments will be present on the styles file  

  First we are starting with static code, created styles for the HomeContainer
  Then, we are creating a Product, which also is a styled div coming from the styles, it's a container for the product

  When using the next/image, we need to pass a width and a height for the image, it does not need to have the exact dimensions
  the image will have, so let's say we put this number based on the bigger height and bigger width this image will
  have. This way, next image, will, when it imports the image, it will resize this image so we don't import it too big.
  If we don't tell the height and the width, and the image has way more than we are going to use, the whole image will be
  imported.

  Now, for the product details, we are going to use the footer, it normally is the best element for us to use in these
  cases.

  For the carousel using keenslider, we import the useKeenSlider from keen-slider/react, call the function and assign to
  the first item of the returned array, the reference of where in our code we'll place this slider. Then, in the div the
  wraps the items we use this ref and a className of keen-slider and on each item we set the clasName as keen-slider__slide


  

*/

export default function Home({ products }: HomeProps) {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (


    <HomeContainer ref={sliderRef} className='keen-slider'>

      {products.map(product => {
        return (

          <Link key={product.id}
            href={`/product/${product.id}`}>
            <Product
              className="keen-slider__slide"
            >
              <Image src={product.imageUrl}
                alt="tshirt3"
                width={520}
                height={520}
              />

              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product></Link>

        )
      })}



    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price | undefined; // Allow price to be undefined
    return {

      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price?.unit_amount
        ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(price.unit_amount / 100)
        : 'N/A'

    }
  })


  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}