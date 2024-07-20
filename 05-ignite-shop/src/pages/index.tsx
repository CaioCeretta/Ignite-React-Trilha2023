import { styled } from "@/styles";

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

import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });


export default function Home() {
  return (
    <>
      <Button><span>Test</span>Send</Button>
      
    </>
  );
}
