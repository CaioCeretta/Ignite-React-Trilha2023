import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";

import logoImg from '@/assets/Logo.svg';
import { Container, Header } from "@/styles/pages/app";

/* This is supposed to stay outside because if we let it inside app, all the pages that we enter will cause a re render 
on that styling, because everything inside the app will be rendered again on each page change */
globalStyles()


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <img src={logoImg.src} />
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
