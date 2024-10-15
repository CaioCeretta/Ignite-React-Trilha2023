import { stripe } from "@/lib/stripe"
import { ImageContainer } from "@/styles/pages/success"
import { SuccessContainer } from "@/styles/pages/success"
import type { GetServerSideProps } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import type Stripe from "stripe"

export interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  }
}

export default function Success(props: SuccessProps) {
  return (
    <>
      <Head>
        <title>Purchase Succeeded | Ignite Shop</title>

        {/* With this meta tag of no index, we are asking the crawlers to not indexate this page */}
        <meta name="robots" content="noindex"/>
      </Head>
      <SuccessContainer>
        <h1>Purchase Completed</h1>

        <ImageContainer>
          <Image src={props.product.imageUrl} width={120} height={110} alt="product image" />
        </ImageContainer>

        <p>
          Yay <strong>{props.customerName}</strong>, your <strong>{props.product.name}</strong> it's already in transport to your house!
        </p>

        <Link href="/">
          Return to the catalogue
        </Link>

      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, params }) => {

  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const sessionId = String(query.session_id);



  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })


  const customerName = session.customer_details?.name
  const product = session.line_items?.data[0].price?.product as Stripe.Product

  console.log(product)


  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  }


}