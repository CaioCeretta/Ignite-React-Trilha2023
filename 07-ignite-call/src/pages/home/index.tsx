import { Heading, Text } from '@ignite-ui/react'
/* The next image is mainly used on structural images, images that are local images from our application,  it's important
that we use this component because it automatically does an automatic optimization of the images, he can convert our
image to many different sizes, and by doing this, it will load the exact size we need and in the format its best suitable
for us.    */
import Image from 'next/image'
import { Container, Hero, Preview } from './styles'

import previewImg from '../../assets/app-preview.png'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size={'4xl'}>Agendamento descomplicado</Heading>
        <Text size={'xl'}>
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre
        </Text>

        <ClaimUsernameForm />
      </Hero>

      <Preview>
        {/* On the image tag, we specify in the width and the height, the biggest dimensions we may have for this image */}
        <Image
          src={previewImg}
          height={400}
          priority
          quality={100}
          alt="Image calendar example"
        />
      </Preview>
    </Container>
  )
}
