

import { HomeContainer, Product } from '@/styles/pages/home'
import tshirt1 from '../assets/tshirt-1.png'
import tshirt2 from '../assets/tshirt-2.png'
import tshirt3 from '../assets/tshirt-3.png'
import Image from 'next/image'

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


  

*/

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={tshirt1}
          alt="tshirt1"
          width={520}
          height={520}
        />

        <footer>
          <strong>Shirt X</strong>
          <span>$ 50.00</span>
        </footer>
      </Product>

      <Product>
        <Image src={tshirt2}
          alt="tshirt2"
          width={520}
          height={520}
        />

        <footer>
          <strong>Shirt XI</strong>
          <span>$ 50.00</span>
        </footer>
      </Product>


    </HomeContainer>
  )
}