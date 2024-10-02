import {styled} from '..'

export const ProductContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  /*Will cause both grid columns to stretch and occupy the same vertical size*/
  alignItems: 'stretch',
  gap: '4rem',

  maxWidth: 1180,
  margin: '0 auto'


})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 576,
  /* In figma we have the height of the container as 656px, but we are making minus 0.5rem because of the padding y.
  This could also be done with box-sizing border-box (which is what we are going to do) */
  height: 656,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    /*Won't disort the image when it's loaded with a resolution a bit different from expected. */
    objectFit: 'cover'
  }
})

export const ProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',


  h1: {
    fontSize: '$2xl',
    color: '$gray-300'
  },

  span: {
    marginTop: '1rem',
    display:  'block',
    fontSize: '$2xl',
    color: '$green-300'
  },

  p: {
    marginTop: '2.5rem',
    lineHeight: 1.6,
    
    fontSize: '$md',
    color: '$gray-300'
  },

  button: {
    /* marginTop auto is the same as the ml-auto, in the mt auto it will take the element as for down as possible within
    its container, it will take up all the rest of the remaining space and add up to its margin */
    marginTop: 'auto',
    padding: '1.25rem',
    borderRadius: 8,
    border: 0,

    color: '$white',
    backgroundColor: '$green-500',

    fontWeight: 'bold',
    fontSize: '$md',

    cursor: 'pointer',


    '&:hover': {
      backgroundColor: '$green-300'
    }

  }
  }

)