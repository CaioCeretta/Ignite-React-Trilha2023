import { Box, styled, Text } from '@ignite-ui/react'

export const Container = styled(Box, {
  margin: '$6 auto 0',
  padding: 0,
  display: 'grid',
  maxWidth: '100%',
  position: 'relative',

  /* We'll notice if it we keep this way, the cells are going to be too big because our table is too big, and this happens
  because on the container we are using display grid and not determining the grid columns size, so to fix this we'll do it
  as follows, now every calendar day will take 1fr of the width, and because of the aspect ratio 1 / 1, it will also dimish
  the height */

  variants: {
    /* In stitches we can create variants, which means that are properties this component can change the styling based on
    props it receives */
    isTimePickerOpen: {
      true: {
        gridTemplateColumns: '1fr 280px',

        'media(max-width: 900px)': {
          /* This means that if the screen reduces too much, we'll make the calendar and the day picker to be one on top
          of the other */
          gridTemplateColumns: '1fr',
        },
      },
      false: {
        width: 540,
        gridTemplateColumns: '1fr',
      },
    },
  },
})

export const TimePicker = styled('div', {
  borderLeft: '1px solid $gray600',
  padding: '$6 $6 0',
  overflowY: 'scroll',
  /* if we did it something like this, it would expand the divs height if the height of the content is bigger than 100%
   height: '100%', so we are going to do this hack, by defining the position as absolute, we can make that the size of our
   time picker be the exact same size as the calendar content.

   By doing this, it will define the height completely based on the rest of the content of the div
   */
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  width: '280px',
})

export const TimePickerHeader = styled(Text, {
  fontWeight: '$medium',

  span: {
    color: '$gray200',
  },
})

export const TimePickerList = styled('div', {
  marginTop: '$3',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$2',

  '@media(max-width: 900px)': {
    gridTemplateColumns: '2fr',
  },
})

export const TimePickerItem = styled('button', {
  border: 0,
  backgroundColor: '$gray600',
  padding: '$2 0',
  cursor: 'pointer',
  color: '$gray100',
  borderRadius: '$sm',
  lineHeight: '$base',

  '&:last-child': {
    marginBottom: '$6',
  },

  '&:disabled': {
    background: 'none',
    cursor: 'default',
  },

  '&:not(:disabled):hover': {
    background: '$gray500',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },
})
