import { styled, keyframes } from "../../styles";

import * as Checkbox from '@radix-ui/react-checkbox'

export const CheckBoxContainer = styled(Checkbox.Root, {
  /*All unset will remove all the default properties of a checkbox*/
  all: 'unset',
  width: '$6',
  height: '$6',
  backgroundColor: '$gray900',
  borderRadius: '$xs',
  /* lineHeight 0 on a checkbox will tell html to not have a basis size to it, because on html, a button size is determined
  by the size of the line.  */
  lineHeight: 0,
  cursor: "pointer",
  overflow: 'hidden',
  boxSizing: "border-box",
  display: "flex",
  alignItems: 'center',
  justifyContent: 'center',
  /* Setting the border to the same width as the one that will occasionally show on focus or active, is a good practice
  for avoiding changes on the UI, so setting them as the same color as the background, will be a good option.*/
  border: '2px solid $gray900',

  '&[data-state="checked"]': {
    backgroundColor: '$ignite300'
  },

  '&:focus': {
    border: '2px solid $ignite300'
  }
})

const slideIn = keyframes({
  from: {
    transform: 'translateY(-100%)'
  },
  to: {
    transform: 'translateY(0)'
  }
})

const slideOut = keyframes({
  from: {
    transform: 'translateY(0)'
  },
  to: {
    transform: 'translateY(-100%)'
  }
})



export const CheckboxIndicator = styled(Checkbox.Indicator, {
  color: '$white',
  width: '$4',
  height: '$4',

  '&[data-state="checked"]': {
    animation: `${slideIn} 200ms ease-out`
  },

  '&[data-state="unchecked"]': {
    animation: `${slideOut} 200ms ease-out`
  },

})