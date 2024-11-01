import { Box, styled, Text } from "@ignite-ui/react";

export const IntervalBox = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '$6'
})

export const IntervalsContainer = styled('div', {
  border: '1px solid $gray600',
  borderRadius: '$md',
  marginBottom: '$4'
})

export const IntervalItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$3 $4',

  /* The & stands for the current element we are styling, the + another ampersand means that this styling is only going
  to apply to elements that have one before it*/
  '& + &': {
    borderTop: '1px solid $gray600'
  }
})

export const IntervalDay = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3'
})

export const IntervalInputs = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  'input::-webkit-calendar-picker-indicator': {
    /* Invert 100% is to invert the color, the brigthness is by default 100%, so by setting it to 30% it will add a sort
    of opacity to it, and the saturate works like, for example, we use the saturate as 0 when we want this to be black
    and white, when we're willing to remove the color, here won't have any effect, i'm just setting it for learning
    purposes */
    filter: 'invert(100%) brightness(30%) saturate(0%)'
  }
})

export const FormError = styled(Text, {
  color: '#f75a68',
  marginBottom: '$4'
})