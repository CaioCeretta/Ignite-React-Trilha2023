import {styled} from '..'

export const ProductContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  /* Align items stretch is going to make the aligned items to stretch vertically*/ 
  alignItems: 'stretch',

  gap: '4rem',
  maxWidth: 1180,
  margin: '0 auto'


})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 576,

  /*Desired height minus the padding top and below*/
  height: '656px',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  display: 'flex', 
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    /* Don't distort the image if i load it with a different resolution */
    objectFit: 'cover'
  }
})

export const ProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  h1: {
    fontSize: '$2xl',
    color: '$gray-300',
  },

    span: {
      marginTop: '1rem',
      display: 'block',
      fontSize: '$2xl',
      color: '$green-300'
    },

    p: {
      marginTop: '1.5rem',
      fontSize: '$md',
      lineHeight: '1.6',
      color: '$gray-300'
    },


    button: {
      marginTop: 'auto',
      backgroundColor: '$green-500',
      border: 0,
      color: '$white',
      borderRadius: 8,
      padding: '1.25rem',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '$md',

      '&:hover': {
        backgroundColor: '$green-300'
      }

    }
  }
)