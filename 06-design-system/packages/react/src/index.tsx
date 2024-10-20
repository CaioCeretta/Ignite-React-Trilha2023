import { ComponentProps } from 'react'

import { styled } from './styles'

/*
  Stitches have an internal behavior which is called variance, so every place we use a style in it, be a button, or anything
  else, we have something called variants, and it will be like the example below.

  And for these variants to be used inside the story book, we pass it inside the object, the name of the variant and its name.
*/

/* Here we need to pass as the generic typeof Button because Button is a js property, and we need to pass to a ts typing. */
export type ButtonProps = ComponentProps<typeof Button>

export const Button = styled('button', {
  fontFamily: '$default',
  backgroundColor: '$ignite300',
  borderRadius: '$sm',
  border: 0,
  fontWeight: 'bold',
  color: '$white',

  variants: {
    size: {
      small: {
        fontSize: 14,
        padding: '$2 $4',
      },
      big: {
        fontSize: 16,
        padding: '$3 $6',
      },
    },
  },

  defaultVariants: {
    size: 'big',
  },
})
