import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import router, { useRouter } from "next/router"

export default function Product() {
  const { query } = useRouter()



  return (
    <ProductContainer>
      <ImageContainer>

      </ImageContainer>

      <ProductDetails>
        <h1>Shirt X</h1>
        <span>$ 79,90</span>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque voluptas explicabo architecto, quasi
          optio possimus, nostrum rerum perspiciatis vitae, autem facere! Eaque dolorem inventore saepe corporis, ducimus
          sapiente repellat voluptatem!</p>

        <button>
          Buy now
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}