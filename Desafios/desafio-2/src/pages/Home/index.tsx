import { CoffeeList } from "../../components/CoffeList";
import { Delivery, Heading, HeroContainer, HeroContent, HeroImage, HomeContainer, Info, Packaging, Receive, Specialties } from "./styles";

import { Clock, Coffee, Package, ShoppingCart } from "phosphor-react";
import imageBanner from '../../assets/Imagem-banner.svg';

export function Home() {
  return (
    <HomeContainer>

      <HeroContainer>

        <HeroContent>

          <Heading>
            <h1>Encontre o café perfeito para qualquer hora do dia</h1>
            <p>Com o Coffe Delivery você recebe seu café onde estiver, a qualquer hora</p>
          </Heading>


          <Specialties>
            <Info>
              <ShoppingCart size={32} weight="fill"/>
              Compra simples e segura
            </Info>
            <Packaging>
              <Package size={32} weight="fill"  />
              Embalagem mantém o café intacto
            </Packaging>
            <Delivery>
              <Clock size={32} weight="fill" />
              Entrega rápida e rastreada
            </Delivery>
            <Receive>
              <Coffee size={32} weight="fill" />
              O café chega fresquinho até você
            </Receive>
          </Specialties>


        </HeroContent>

        <HeroImage src={imageBanner} />

      </HeroContainer>

      <CoffeeList></CoffeeList>


    </HomeContainer >


  )
}