import { styled } from "../../styles";

export const TextInputContainer = styled('div', {
  backgroundColor: '$gray900',
  padding: '$3 $4',
  borderRadius: '$sm',
  boxSizing: 'border-box',
  border: '2px solid $gray900',
  display: 'flex',
  /* Align items baseline, it will align on the cross axis, based on the text, the bottom part of the text, so if the
  text we use for prefix has a smaller font than the input rectangle, there isn't a problem, because they both will be set
  to align at the base of the text */
  alignItems: 'baseline',

  /* Has is a new feature of css, what it does is, if inside, check if inside the container, there is a focused input, so
  basically we can check the states of children components inside a parent component, changing the styling of the parent
  based on his children */
  '&:has(input:focus)': {
    borderColor: '$ignite300'
  },

  '&:has(input:disabled)': {
    opacity: 0.5,
    cursor: 'not-allowed'
  }


})

export const PrefixedInput = styled('span',
  {
    fontFamily: '$default',
    fontSize: '$sm',
    color: '$gray400',
    fontWeight: '$regular'
  }
)

export const Input = styled('input', {
  fontFamily: '$default',
  fontSize: '$sm',
  color: '$white',
  fontWeight: '$regular',
  background: '$transparent',
  border: 0,
  width: '100%',

  '&:focus': {
    outline: 0,
  },

  '&:disabled': {
    cursor: "not-allowed",
  },

  '&:placeholder': {
    color: '$gray400'
  }
  

})