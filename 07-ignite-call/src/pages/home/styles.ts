import { styled, Heading, Text } from "@ignite-ui/react";

export const Container = styled('div', {
  maxWidth: 'calc(100vw - (100vw - 1160px) / 2)',
  height: '100vh',
  display: "flex",
  alignItems: 'center',
  gap: '$20',
  marginLeft: 'auto'
})

/* Hero is a named widely used on landing pages, he is the "call to action", with the slogan of the app.*/ 
export const Hero = styled('div', {
  maxWidth: '480px',
  padding: '0 $10',

  [`> ${Heading}`]: {
    
  },

  [`> ${Text}`]: {
    marginTop: '$2',
    color: "$gray200",
  }


})

export const Preview = styled('div', {
  paddingRight: '$8',
  overflow: 'hidden',

  '@media(max-width: 600px)': {
    display: 'none'
  }
})