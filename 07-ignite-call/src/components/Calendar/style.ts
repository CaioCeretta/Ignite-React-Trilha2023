import { styled, Text } from '@ignite-ui/react'

export const CalendarContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
})

export const CalendarHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const CalendarTitle = styled(Text, {
  fontWeight: '$medium',

  span: {
    color: '$gray200',
  },
})

export const CalendarActions = styled('div', {
  display: 'flex',
  gap: '$2',
  color: '$gray200',

  button: {
    /* This is a css property where it will take away all the properties from the button */
    all: 'unset',
    cursor: 'pointer',
    lineHeight: 0,
    borderRadius: '$sm',

    svg: {
      width: '$5',
      height: '$5',
    },

    '&:hover': {
      color: '$gray100',
    },

    '&:focus': {
      boxShadow: '0 0 0 2px $colors$gray100',
    },
  },
})

export const CalendarBody = styled('table', {
  width: '100%',
  /* In html, the tables don't inherit the default font family of the page */
  fontFamily: '$default',
  borderSpacing: '0.25rem',
  /* Table layout is the algorithm used to calculate the size of the columns, and fixed determines that all cells from the
  table are going to have the same size, so if the container size increases or decreases the sizes are going to reflect
  this */
  tableLayout: 'fixed',

  'thead th': {
    color: '$gray200',
    fontWeight: '$medium',
    fontSize: '$sm',
  },

  /* This is also useful because between the first row and the thead, there is a space between them and in display table
  we can't program a margin between them, so a hack is to place another element before the tbody, with the desired space
  and use its color the same as the background */
  'tbody:before': {
    content: '.',
    lineHeight: '0.75rem',
    display: 'block',
    color: '$gray800',
  },

  'tbody td': {
    justifyContent: '',
    boxSizing: 'border-box',
  },
})

export const CalendarDay = styled('button', {
  all: 'unset',
  width: '100%',
  /* This aspect ratio property will is useful because we want each of the cells to have the same width and same height,
  and there is no way for us to define the width and height, because if the user decreases the size of the screen, the
  width of the table will also decrease and with this, the height will be fixed.
  
  So when we set the width as 100% and the aspect ratio for 1 / 1, it will force the button to have the exact same height
  and width, and because the width is defined based on the parent component, the height will also be defined in relation
  to this value
  */
  aspectRatio: '1 / 1',
  background: '$gray600',
  textAlign: 'center',
  cursor: 'pointer',
  borderRadius: '$sm',

  '&:disabled': {
    background: 'none',
    cursor: 'default',
    opacity: 0.4,
  },

  '$:not(:disabled):hover': {
    background: '$gray500',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray200',
  },
})
