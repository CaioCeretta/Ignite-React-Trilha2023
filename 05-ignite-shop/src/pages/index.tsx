// File: /pages/home.js

import { styled } from "@/styles";
import { HomeContainer, Product } from "@/styles/pages/home";
import { useEffect, useRef } from "react";
import KeenSlider from "keen-slider";
import "keen-slider/keen-slider.min.css";

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

import shirt1 from '@/assets/tshirt-1.png';
import shirt2 from '@/assets/tshirt-2.png';
import shirt3 from '@/assets/tshirt-3.png';

import { Roboto } from "next/font/google";
import Image from "next/image";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export default function Home() {
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


  }, [sliderRef]);

  return (
    <>
      <HomeContainer ref={sliderRef} className="keen-slider">
        <Product className="keen-slider__slide">
          <Image src={shirt3} width={520} height={400} alt="shirt image 1" />
          <footer>
            <strong>Shirt X</strong>
            <span>R$ 79,90</span>
          </footer>
        </Product>

        <Product className="keen-slider__slide">
          <Image src={shirt2} width={520} height={400} alt="shirt image 2" />
          <footer>
            <strong>Shirt X</strong>
            <span>R$ 79,90</span>
          </footer>
        </Product>
        <Product className="keen-slider__slide">
          <Image src={shirt1} width={520} height={400} alt="shirt image 3" />
          <footer>
            <strong>Shirt X</strong>
            <span>R$ 79,90</span>
          </footer>
        </Product>
        <Product className="keen-slider__slide">
          <Image src={shirt1} width={520} height={400} alt="shirt image - 1" />
          <footer>
            <strong>Shirt X</strong>
            <span>R$ 79,90</span>
          </footer>
        </Product>
      </HomeContainer>
    </>
  );
}