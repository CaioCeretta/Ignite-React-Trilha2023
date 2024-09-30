import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";


import logoImg from '@/assets/Logo.svg';
import { Container, Header } from "@/styles/pages/app";
import Image from "next/image";

/* This is supposed to stay outside because if we let it inside app, all the pages that we enter will cause a re render 
on that styling, because everything inside the app will be rendered again on each page change */
globalStyles()
 

export default function App({ Component, pageProps }: AppProps) {
  return ( 
    <Container>
      <Header>
        <Image src={logoImg} alt="" width={120} height={120} />
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
