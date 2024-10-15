import { ImageContainer } from "@/styles/pages/success"
import { SuccessContainer } from "@/styles/pages/success"
import Link from "next/link"

export interface SuccessProps { }

export const Success = (props: SuccessProps) => {
  return (
    <SuccessContainer>
      <h1>Purchase Completed</h1>

      <ImageContainer>

      </ImageContainer>

      <p>
        Yay <strong>Caio Ceretta</strong>, your <strong>Camiseta Beyong the Limits</strong> it's already in transport to your house!
      </p>

      <Link href="/">
        Return to the catalogue
      </Link>

    </SuccessContainer>
  )
}


export default Success