import { Box, styled } from "@ignite-ui/react";

export const Form = styled(Box, {
  /* This is a form grid where we have an input and a button, so here we are telling css to make the input to be flexible
  and the button to have its size based on its content*/
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '$2',
  marginTop: '$4',
  padding: '$4',

  '@media(max-width: 600px)': {
    gridTemplateColumns: '1fr',
  }
})